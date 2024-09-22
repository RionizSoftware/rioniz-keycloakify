import { parse as urlParse } from "url";
import {
    join as pathJoin,
    sep as pathSep,
    relative as pathRelative,
    resolve as pathResolve,
    dirname as pathDirname
} from "path";
import { getAbsoluteAndInOsFormatPath } from "../tools/getAbsoluteAndInOsFormatPath";
import type { CliCommandOptions } from "../main";
import { z } from "zod";
import * as fs from "fs";
import { assert, type Equals } from "tsafe/assert";
import * as child_process from "child_process";
import {
    VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES,
    BUILD_FOR_KEYCLOAK_MAJOR_VERSION_ENV_NAME
} from "./constants";
import type { KeycloakVersionRange } from "./KeycloakVersionRange";
import { exclude } from "tsafe";
import { crawl } from "../tools/crawl";
import { THEME_TYPES } from "./constants";
import { objectEntries } from "tsafe/objectEntries";
import { type ThemeType } from "./constants";
import { id } from "tsafe/id";
import chalk from "chalk";
import { getProxyFetchOptions, type ProxyFetchOptions } from "../tools/fetchProxyOptions";

export type BuildContext = {
    themeVersion: string;
    themeNames: [string, ...string[]];
    extraThemeProperties: string[] | undefined;
    groupId: string;
    artifactId: string;
    projectDirPath: string;
    projectBuildDirPath: string;
    /** Directory that rionizkeycloakify outputs to. Defaults to {cwd}/build_keycloak */
    keycloakifyBuildDirPath: string;
    publicDirPath: string;
    cacheDirPath: string;
    /** If your app is hosted under a subpath, it's the case in CRA if you have "homepage": "https://example.com/my-app" in your package.json
     * In this case the urlPathname will be "/my-app/" */
    urlPathname: string | undefined;
    assetsDirPath: string;
    fetchOptions: ProxyFetchOptions;
    kcContextExclusionsFtlCode: string | undefined;
    environmentVariables: { name: string; default: string }[];
    themeSrcDirPath: string;
    implementedThemeTypes: {
        login: { isImplemented: boolean };
        email: { isImplemented: boolean };
        account:
            | { isImplemented: false }
            | { isImplemented: true; type: "Single-Page" | "Multi-Page" };
    };
    packageJsonFilePath: string;
    bundler: "vite" | "webpack";
    jarTargets: {
        keycloakVersionRange: KeycloakVersionRange;
        jarFileBasename: string;
    }[];
    startKeycloakOptions: {
        dockerImage:
            | {
                  reference: string;
                  tag: string;
              }
            | undefined;
        dockerExtraArgs: string[];
        keycloakExtraArgs: string[];
        extensionJars: ({ type: "path"; path: string } | { type: "url"; url: string })[];
        realmJsonFilePath: string | undefined;
        port: number | undefined;
    };
};

assert<Equals<keyof BuildContext["implementedThemeTypes"], ThemeType | "email">>();

export type BuildOptions = {
    themeName?: string | string[];
    themeVersion?: string;
    environmentVariables?: { name: string; default: string }[];
    extraThemeProperties?: string[];
    artifactId?: string;
    groupId?: string;
    keycloakifyBuildDirPath?: string;
    kcContextExclusionsFtl?: string;
    startKeycloakOptions?: {
        dockerImage?: string;
        dockerExtraArgs?: string[];
        keycloakExtraArgs?: string[];
        extensionJars?: string[];
        realmJsonFilePath?: string;
        port?: number;
    };
} & BuildOptions.AccountThemeImplAndKeycloakVersionTargets;

export namespace BuildOptions {
    export type AccountThemeImplAndKeycloakVersionTargets =
        | AccountThemeImplAndKeycloakVersionTargets.MultiPageApp
        | AccountThemeImplAndKeycloakVersionTargets.SinglePageAppOrNone;

    export namespace AccountThemeImplAndKeycloakVersionTargets {
        export type MultiPageApp = {
            accountThemeImplementation: "Multi-Page";
            keycloakVersionTargets?: Record<
                KeycloakVersionRange.WithAccountV1Theme,
                string | boolean
            >;
        };

        export type SinglePageAppOrNone = {
            accountThemeImplementation: "Single-Page" | "none";
            keycloakVersionTargets?: Record<
                KeycloakVersionRange.WithoutAccountV1Theme,
                string | boolean
            >;
        };
    }
}

export type ResolvedViteConfig = {
    buildDir: string;
    publicDir: string;
    assetsDir: string;
    urlPathname: string | undefined;
    buildOptions: BuildOptions;
};

export function getBuildContext(params: {
    cliCommandOptions: CliCommandOptions;
}): BuildContext {
    const { cliCommandOptions } = params;

    const projectDirPath =
        cliCommandOptions.projectDirPath !== undefined
            ? getAbsoluteAndInOsFormatPath({
                  pathIsh: cliCommandOptions.projectDirPath,
                  cwd: process.cwd()
              })
            : process.cwd();

    const { themeSrcDirPath } = (() => {
        const srcDirPath = pathJoin(projectDirPath, "src");

        const themeSrcDirPath: string | undefined = crawl({
            dirPath: srcDirPath,
            returnedPathsType: "relative to dirPath"
        })
            .map(fileRelativePath => {
                for (const themeSrcDirBasename of ["keycloak-theme", "keycloak_theme"]) {
                    const split = fileRelativePath.split(themeSrcDirBasename);
                    if (split.length === 2) {
                        return pathJoin(srcDirPath, split[0] + themeSrcDirBasename);
                    }
                }
                return undefined;
            })
            .filter(exclude(undefined))[0];

        if (themeSrcDirPath !== undefined) {
            return { themeSrcDirPath };
        }

        for (const themeType of [...THEME_TYPES, "email"]) {
            if (!fs.existsSync(pathJoin(srcDirPath, themeType))) {
                continue;
            }
            return { themeSrcDirPath: srcDirPath };
        }

        console.log(
            chalk.red(
                [
                    `Can't locate your Keycloak theme source directory in .${pathSep}${pathRelative(process.cwd(), srcDirPath)}`,
                    `Make sure to either use the rionizkeycloakify CLI in the root of your rionizkeycloakify project or use the --project CLI option`,
                    `If you are collocating your Keycloak theme with your app you must have a directory named 'keycloak-theme' or 'keycloak_theme' in your 'src' directory`
                ].join("\n")
            )
        );

        process.exit(1);
    })();

    const { resolvedViteConfig } = (() => {
        if (
            fs
                .readdirSync(projectDirPath)
                .find(fileBasename => fileBasename.startsWith("vite.config")) ===
            undefined
        ) {
            return { resolvedViteConfig: undefined };
        }

        const output = child_process
            .execSync("npx vite", {
                cwd: projectDirPath,
                env: {
                    ...process.env,
                    [VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RESOLVE_VITE_CONFIG]: "true"
                }
            })
            .toString("utf8");

        assert(
            output.includes(VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RESOLVE_VITE_CONFIG),
            "Seems like the rionizkeycloakify's Vite plugin is not installed."
        );

        const resolvedViteConfigStr = output
            .split(VITE_PLUGIN_SUB_SCRIPTS_ENV_NAMES.RESOLVE_VITE_CONFIG)
            .reverse()[0];

        const resolvedViteConfig: ResolvedViteConfig = JSON.parse(resolvedViteConfigStr);

        return { resolvedViteConfig };
    })();

    const packageJsonFilePath = (function getPackageJSonDirPath(upCount: number): string {
        const dirPath = pathResolve(
            pathJoin(...[projectDirPath, ...Array(upCount).fill("..")])
        );

        assert(dirPath !== pathSep, "Root package.json not found");

        success: {
            const packageJsonFilePath = pathJoin(dirPath, "package.json");

            if (!fs.existsSync(packageJsonFilePath)) {
                break success;
            }

            const parsedPackageJson = z
                .object({
                    name: z.string().optional(),
                    dependencies: z.record(z.string()).optional(),
                    devDependencies: z.record(z.string()).optional()
                })
                .parse(JSON.parse(fs.readFileSync(packageJsonFilePath).toString("utf8")));

            if (
                parsedPackageJson.dependencies?.rionizkeycloakify === undefined &&
                parsedPackageJson.devDependencies?.rionizkeycloakify === undefined &&
                parsedPackageJson.name !== "rionizkeycloakify" // NOTE: For local storybook build
            ) {
                break success;
            }

            return packageJsonFilePath;
        }

        return getPackageJSonDirPath(upCount + 1);
    })(0);

    const parsedPackageJson = (() => {
        type BuildOptions_packageJson = BuildOptions & {
            projectBuildDirPath?: string;
            staticDirPathInProjectBuildDirPath?: string;
            publicDirPath?: string;
        };

        type ParsedPackageJson = {
            name?: string;
            version?: string;
            homepage?: string;
            rionizkeycloakify?: BuildOptions_packageJson;
        };

        const zMultiPageApp = (() => {
            type TargetType =
                BuildOptions.AccountThemeImplAndKeycloakVersionTargets.MultiPageApp;

            const zTargetType = z.object({
                accountThemeImplementation: z.literal("Multi-Page"),
                keycloakVersionTargets: z
                    .object({
                        "21-and-below": z.union([z.boolean(), z.string()]),
                        "23": z.union([z.boolean(), z.string()]),
                        "24": z.union([z.boolean(), z.string()]),
                        "25-and-above": z.union([z.boolean(), z.string()])
                    })
                    .optional()
            });

            assert<Equals<z.infer<typeof zTargetType>, TargetType>>();

            return id<z.ZodType<TargetType>>(zTargetType);
        })();

        const zSinglePageApp = (() => {
            type TargetType =
                BuildOptions.AccountThemeImplAndKeycloakVersionTargets.SinglePageAppOrNone;

            const zTargetType = z.object({
                accountThemeImplementation: z.union([
                    z.literal("Single-Page"),
                    z.literal("none")
                ]),
                keycloakVersionTargets: z
                    .object({
                        "21-and-below": z.union([z.boolean(), z.string()]),
                        "22-and-above": z.union([z.boolean(), z.string()])
                    })
                    .optional()
            });

            assert<Equals<z.infer<typeof zTargetType>, TargetType>>();

            return id<z.ZodType<TargetType>>(zTargetType);
        })();

        const zAccountThemeImplAndKeycloakVersionTargets = (() => {
            type TargetType = BuildOptions.AccountThemeImplAndKeycloakVersionTargets;

            const zTargetType = z.union([zMultiPageApp, zSinglePageApp]);

            assert<Equals<z.infer<typeof zTargetType>, TargetType>>();

            return id<z.ZodType<TargetType>>(zTargetType);
        })();

        const zStartKeycloakOptions = (() => {
            type TargetType = NonNullable<BuildOptions["startKeycloakOptions"]>;

            const zTargetType = z.object({
                dockerImage: z.string().optional(),
                extensionJars: z.array(z.string()).optional(),
                realmJsonFilePath: z.string().optional(),
                dockerExtraArgs: z.array(z.string()).optional(),
                keycloakExtraArgs: z.array(z.string()).optional(),
                port: z.number().optional()
            });

            assert<Equals<z.infer<typeof zTargetType>, TargetType>>();

            return id<z.ZodType<TargetType>>(zTargetType);
        })();

        const zBuildOptions = (() => {
            type TargetType = BuildOptions;

            const zTargetType = z.intersection(
                z.object({
                    themeName: z.union([z.string(), z.array(z.string())]).optional(),
                    themeVersion: z.string().optional(),
                    environmentVariables: z
                        .array(
                            z.object({
                                name: z.string(),
                                default: z.string()
                            })
                        )
                        .optional(),
                    extraThemeProperties: z.array(z.string()).optional(),
                    artifactId: z.string().optional(),
                    groupId: z.string().optional(),
                    keycloakifyBuildDirPath: z.string().optional(),
                    kcContextExclusionsFtl: z.string().optional(),
                    startKeycloakOptions: zStartKeycloakOptions.optional()
                }),
                zAccountThemeImplAndKeycloakVersionTargets
            );

            assert<Equals<z.infer<typeof zTargetType>, TargetType>>();

            return id<z.ZodType<TargetType>>(zTargetType);
        })();

        const zBuildOptions_packageJson = (() => {
            type TargetType = BuildOptions_packageJson;

            const zTargetType = z.intersection(
                zBuildOptions,
                z.object({
                    projectBuildDirPath: z.string().optional(),
                    staticDirPathInProjectBuildDirPath: z.string().optional(),
                    publicDirPath: z.string().optional()
                })
            );

            assert<Equals<z.infer<typeof zTargetType>, TargetType>>();

            return id<z.ZodType<TargetType>>(zTargetType);
        })();

        const zParsedPackageJson = (() => {
            type TargetType = ParsedPackageJson;

            const zTargetType = z.object({
                name: z.string().optional(),
                version: z.string().optional(),
                homepage: z.string().optional(),
                rionizkeycloakify: zBuildOptions_packageJson.optional()
            });

            assert<Equals<z.infer<typeof zTargetType>, TargetType>>();

            return id<z.ZodType<TargetType>>(zTargetType);
        })();

        const configurationPackageJsonFilePath = (() => {
            const rootPackageJsonFilePath = pathJoin(projectDirPath, "package.json");

            return fs.existsSync(rootPackageJsonFilePath)
                ? rootPackageJsonFilePath
                : packageJsonFilePath;
        })();

        return zParsedPackageJson.parse(
            JSON.parse(fs.readFileSync(configurationPackageJsonFilePath).toString("utf8"))
        );
    })();

    const bundler = resolvedViteConfig !== undefined ? "vite" : "webpack";

    if (bundler === "vite" && parsedPackageJson.rionizkeycloakify !== undefined) {
        console.error(
            chalk.red(
                `In vite projects, provide your rionizkeycloakify options in vite.config.ts, not in package.json`
            )
        );
        process.exit(-1);
    }

    const buildOptions: BuildOptions = (() => {
        switch (bundler) {
            case "vite":
                assert(resolvedViteConfig !== undefined);
                return resolvedViteConfig.buildOptions;
            case "webpack":
                assert(parsedPackageJson.rionizkeycloakify !== undefined);
                return parsedPackageJson.rionizkeycloakify;
        }
        assert<Equals<typeof bundler, never>>(false);
    })();

    const implementedThemeTypes: BuildContext["implementedThemeTypes"] = {
        login: {
            isImplemented: fs.existsSync(pathJoin(themeSrcDirPath, "login"))
        },
        email: {
            isImplemented: fs.existsSync(pathJoin(themeSrcDirPath, "email"))
        },
        account: (() => {
            if (buildOptions.accountThemeImplementation === "none") {
                return { isImplemented: false };
            }

            return {
                isImplemented: true,
                type: buildOptions.accountThemeImplementation
            };
        })()
    };

    if (
        implementedThemeTypes.account.isImplemented &&
        !fs.existsSync(pathJoin(themeSrcDirPath, "account"))
    ) {
        console.error(
            chalk.red(
                [
                    `You have set 'accountThemeImplementation' to '${implementedThemeTypes.account.type}'`,
                    `but the 'account' directory is missing in your theme source directory`,
                    "Use the `npx rionizkeycloakify initialize-account-theme` command to create it"
                ].join(" ")
            )
        );
        process.exit(-1);
    }

    const themeNames = ((): [string, ...string[]] => {
        if (buildOptions.themeName === undefined) {
            return parsedPackageJson.name === undefined
                ? ["rionizkeycloakify"]
                : [
                      parsedPackageJson.name
                          .replace(/^@(.*)/, "$1")
                          .split("/")
                          .join("-")
                  ];
        }

        if (typeof buildOptions.themeName === "string") {
            return [buildOptions.themeName];
        }

        const [mainThemeName, ...themeVariantNames] = buildOptions.themeName;

        assert(mainThemeName !== undefined);

        return [mainThemeName, ...themeVariantNames];
    })();

    const projectBuildDirPath = (() => {
        webpack: {
            if (bundler !== "webpack") {
                break webpack;
            }

            assert(parsedPackageJson.rionizkeycloakify !== undefined);

            if (parsedPackageJson.rionizkeycloakify.projectBuildDirPath !== undefined) {
                return getAbsoluteAndInOsFormatPath({
                    pathIsh: parsedPackageJson.rionizkeycloakify.projectBuildDirPath,
                    cwd: projectDirPath
                });
            }

            return pathJoin(projectDirPath, "build");
        }

        assert(bundler === "vite");
        assert(resolvedViteConfig !== undefined);

        return pathJoin(projectDirPath, resolvedViteConfig.buildDir);
    })();

    return {
        bundler,
        packageJsonFilePath,
        themeVersion: buildOptions.themeVersion ?? parsedPackageJson.version ?? "0.0.0",
        themeNames,
        extraThemeProperties: buildOptions.extraThemeProperties,
        groupId: (() => {
            const fallbackGroupId = `${themeNames[0]}.keycloak`;

            return (
                process.env.KEYCLOAKIFY_GROUP_ID ??
                buildOptions.groupId ??
                (parsedPackageJson.homepage === undefined
                    ? fallbackGroupId
                    : urlParse(parsedPackageJson.homepage)
                          .host?.replace(/:[0-9]+$/, "")
                          ?.split(".")
                          .reverse()
                          .join(".") ?? fallbackGroupId) + ".keycloak"
            );
        })(),
        artifactId:
            process.env.KEYCLOAKIFY_ARTIFACT_ID ??
            buildOptions.artifactId ??
            `${themeNames[0]}-keycloak-theme`,
        projectDirPath,
        projectBuildDirPath,
        keycloakifyBuildDirPath: (() => {
            if (buildOptions.keycloakifyBuildDirPath !== undefined) {
                return getAbsoluteAndInOsFormatPath({
                    pathIsh: buildOptions.keycloakifyBuildDirPath,
                    cwd: projectDirPath
                });
            }

            return pathJoin(
                projectDirPath,
                resolvedViteConfig?.buildDir === undefined
                    ? "build_keycloak"
                    : `${resolvedViteConfig.buildDir}_keycloak`
            );
        })(),
        publicDirPath: (() => {
            if (process.env.PUBLIC_DIR_PATH !== undefined) {
                return getAbsoluteAndInOsFormatPath({
                    pathIsh: process.env.PUBLIC_DIR_PATH,
                    cwd: projectDirPath
                });
            }

            webpack: {
                if (bundler !== "webpack") {
                    break webpack;
                }

                assert(parsedPackageJson.rionizkeycloakify !== undefined);

                if (parsedPackageJson.rionizkeycloakify.publicDirPath !== undefined) {
                    return getAbsoluteAndInOsFormatPath({
                        pathIsh: parsedPackageJson.rionizkeycloakify.publicDirPath,
                        cwd: projectDirPath
                    });
                }

                return pathJoin(projectDirPath, "public");
            }

            assert(bundler === "vite");
            assert(resolvedViteConfig !== undefined);

            return pathJoin(projectDirPath, resolvedViteConfig.publicDir);
        })(),
        cacheDirPath: pathJoin(
            (() => {
                if (process.env.XDG_CACHE_HOME !== undefined) {
                    return getAbsoluteAndInOsFormatPath({
                        pathIsh: process.env.XDG_CACHE_HOME,
                        cwd: process.cwd()
                    });
                }

                return pathJoin(
                    pathDirname(packageJsonFilePath),
                    "node_modules",
                    ".cache"
                );
            })(),
            "rionizkeycloakify"
        ),
        urlPathname: (() => {
            webpack: {
                if (bundler !== "webpack") {
                    break webpack;
                }

                const { homepage } = parsedPackageJson;

                let url: URL | undefined = undefined;

                if (homepage !== undefined) {
                    url = new URL(homepage);
                }

                if (url === undefined) {
                    return undefined;
                }

                const out = url.pathname.replace(/([^/])$/, "$1/");
                return out === "/" ? undefined : out;
            }

            assert(bundler === "vite");
            assert(resolvedViteConfig !== undefined);

            return resolvedViteConfig.urlPathname;
        })(),
        assetsDirPath: (() => {
            webpack: {
                if (bundler !== "webpack") {
                    break webpack;
                }

                assert(parsedPackageJson.rionizkeycloakify !== undefined);

                if (
                    parsedPackageJson.rionizkeycloakify
                        .staticDirPathInProjectBuildDirPath !== undefined
                ) {
                    getAbsoluteAndInOsFormatPath({
                        pathIsh:
                            parsedPackageJson.rionizkeycloakify
                                .staticDirPathInProjectBuildDirPath,
                        cwd: projectBuildDirPath
                    });
                }

                return pathJoin(projectBuildDirPath, "static");
            }
            assert(bundler === "vite");
            assert(resolvedViteConfig !== undefined);

            return pathJoin(projectBuildDirPath, resolvedViteConfig.assetsDir);
        })(),
        kcContextExclusionsFtlCode: (() => {
            if (buildOptions.kcContextExclusionsFtl === undefined) {
                return undefined;
            }

            if (buildOptions.kcContextExclusionsFtl.endsWith(".ftl")) {
                const kcContextExclusionsFtlPath = getAbsoluteAndInOsFormatPath({
                    pathIsh: buildOptions.kcContextExclusionsFtl,
                    cwd: projectDirPath
                });

                return fs.readFileSync(kcContextExclusionsFtlPath).toString("utf8");
            }

            return buildOptions.kcContextExclusionsFtl;
        })(),
        environmentVariables: buildOptions.environmentVariables ?? [],
        implementedThemeTypes,
        themeSrcDirPath,
        fetchOptions: getProxyFetchOptions({
            npmConfigGetCwd: (function callee(upCount: number): string {
                const dirPath = pathResolve(
                    pathJoin(...[projectDirPath, ...Array(upCount).fill("..")])
                );

                assert(
                    dirPath !== pathSep,
                    "Couldn't find a place to run 'npm config get'"
                );

                try {
                    child_process.execSync("npm config get", {
                        cwd: dirPath,
                        stdio: "pipe"
                    });
                } catch (error) {
                    if (String(error).includes("ENOWORKSPACES")) {
                        return callee(upCount + 1);
                    }

                    throw error;
                }

                return dirPath;
            })(0)
        }),
        jarTargets: (() => {
            const getDefaultJarFileBasename = (range: string) =>
                `keycloak-theme-for-kc-${range}.jar`;

            build_for_specific_keycloak_major_version: {
                const buildForKeycloakMajorVersionNumber = (() => {
                    const envValue =
                        process.env[BUILD_FOR_KEYCLOAK_MAJOR_VERSION_ENV_NAME];

                    if (envValue === undefined) {
                        return undefined;
                    }

                    const major = parseInt(envValue);

                    assert(!isNaN(major));

                    return major;
                })();

                if (buildForKeycloakMajorVersionNumber === undefined) {
                    break build_for_specific_keycloak_major_version;
                }

                const keycloakVersionRange: KeycloakVersionRange = (() => {
                    if (
                        implementedThemeTypes.account.isImplemented &&
                        implementedThemeTypes.account.type === "Multi-Page"
                    ) {
                        const keycloakVersionRange = (() => {
                            if (buildForKeycloakMajorVersionNumber <= 21) {
                                return "21-and-below" as const;
                            }

                            assert(buildForKeycloakMajorVersionNumber !== 22);

                            if (buildForKeycloakMajorVersionNumber === 23) {
                                return "23" as const;
                            }

                            if (buildForKeycloakMajorVersionNumber === 24) {
                                return "24" as const;
                            }

                            return "25-and-above" as const;
                        })();

                        assert<
                            Equals<
                                typeof keycloakVersionRange,
                                KeycloakVersionRange.WithAccountV1Theme
                            >
                        >();

                        return keycloakVersionRange;
                    } else {
                        const keycloakVersionRange = (() => {
                            if (buildForKeycloakMajorVersionNumber <= 21) {
                                return "21-and-below" as const;
                            }

                            return "22-and-above" as const;
                        })();

                        assert<
                            Equals<
                                typeof keycloakVersionRange,
                                KeycloakVersionRange.WithoutAccountV1Theme
                            >
                        >();

                        return keycloakVersionRange;
                    }
                })();

                const jarFileBasename = (() => {
                    use_custom_jar_basename: {
                        const { keycloakVersionTargets } = buildOptions;

                        if (keycloakVersionTargets === undefined) {
                            break use_custom_jar_basename;
                        }

                        const entry = objectEntries(keycloakVersionTargets).find(
                            ([keycloakVersionRange_entry]) =>
                                keycloakVersionRange_entry === keycloakVersionRange
                        );

                        if (entry === undefined) {
                            break use_custom_jar_basename;
                        }

                        const maybeJarFileBasename = entry[1];

                        if (typeof maybeJarFileBasename !== "string") {
                            break use_custom_jar_basename;
                        }

                        return maybeJarFileBasename;
                    }

                    return getDefaultJarFileBasename(keycloakVersionRange);
                })();

                return [
                    {
                        keycloakVersionRange,
                        jarFileBasename
                    }
                ];
            }

            const jarTargets_default = (() => {
                const jarTargets: BuildContext["jarTargets"] = [];

                if (
                    implementedThemeTypes.account.isImplemented &&
                    implementedThemeTypes.account.type === "Multi-Page"
                ) {
                    for (const keycloakVersionRange of [
                        "21-and-below",
                        "23",
                        "24",
                        "25-and-above"
                    ] as const) {
                        assert<
                            Equals<
                                typeof keycloakVersionRange,
                                KeycloakVersionRange.WithAccountV1Theme
                            >
                        >(true);
                        jarTargets.push({
                            keycloakVersionRange,
                            jarFileBasename:
                                getDefaultJarFileBasename(keycloakVersionRange)
                        });
                    }
                } else {
                    for (const keycloakVersionRange of [
                        "21-and-below",
                        "22-and-above"
                    ] as const) {
                        assert<
                            Equals<
                                typeof keycloakVersionRange,
                                KeycloakVersionRange.WithoutAccountV1Theme
                            >
                        >(true);
                        jarTargets.push({
                            keycloakVersionRange,
                            jarFileBasename:
                                getDefaultJarFileBasename(keycloakVersionRange)
                        });
                    }
                }

                return jarTargets;
            })();

            if (buildOptions.keycloakVersionTargets === undefined) {
                return jarTargets_default;
            }

            const jarTargets: BuildContext["jarTargets"] = [];

            for (const [keycloakVersionRange, jarNameOrBoolean] of objectEntries(
                buildOptions.keycloakVersionTargets
            )) {
                if (jarNameOrBoolean === false) {
                    continue;
                }

                if (jarNameOrBoolean === true) {
                    jarTargets.push({
                        keycloakVersionRange: keycloakVersionRange,
                        jarFileBasename: getDefaultJarFileBasename(keycloakVersionRange)
                    });
                    continue;
                }

                const jarFileBasename = jarNameOrBoolean;

                if (!jarFileBasename.endsWith(".jar")) {
                    console.log(
                        chalk.red(`Bad ${jarFileBasename} should end with '.jar'\n`)
                    );
                    process.exit(1);
                }

                if (jarFileBasename.includes("/") || jarFileBasename.includes("\\")) {
                    console.log(
                        chalk.red(
                            [
                                `Invalid ${jarFileBasename}. It's not supposed to be a path,`,
                                `Only the basename of the jar file is expected.`,
                                `Example: keycloak-theme.jar`
                            ].join(" ")
                        )
                    );
                    process.exit(1);
                }

                jarTargets.push({
                    keycloakVersionRange: keycloakVersionRange,
                    jarFileBasename: jarNameOrBoolean
                });
            }

            if (jarTargets.length === 0) {
                console.log(
                    chalk.red(
                        "All jar targets are disabled. Please enable at least one jar target."
                    )
                );
                process.exit(1);
            }

            return jarTargets;
        })(),
        startKeycloakOptions: {
            dockerImage: (() => {
                if (buildOptions.startKeycloakOptions?.dockerImage === undefined) {
                    return undefined;
                }

                const [reference, tag, ...rest] =
                    buildOptions.startKeycloakOptions.dockerImage.split(":");

                assert(
                    reference !== undefined && tag !== undefined && rest.length === 0,
                    `Invalid docker image: ${buildOptions.startKeycloakOptions.dockerImage}`
                );

                return { reference, tag };
            })(),
            dockerExtraArgs: buildOptions.startKeycloakOptions?.dockerExtraArgs ?? [],
            keycloakExtraArgs: buildOptions.startKeycloakOptions?.keycloakExtraArgs ?? [],
            extensionJars: (buildOptions.startKeycloakOptions?.extensionJars ?? []).map(
                urlOrPath => {
                    if (/^https?:\/\//.test(urlOrPath)) {
                        return { type: "url", url: urlOrPath };
                    }

                    return {
                        type: "path",
                        path: getAbsoluteAndInOsFormatPath({
                            pathIsh: urlOrPath,
                            cwd: projectDirPath
                        })
                    };
                }
            ),
            realmJsonFilePath:
                buildOptions.startKeycloakOptions?.realmJsonFilePath === undefined
                    ? undefined
                    : getAbsoluteAndInOsFormatPath({
                          pathIsh: buildOptions.startKeycloakOptions.realmJsonFilePath,
                          cwd: projectDirPath
                      }),
            port: buildOptions.startKeycloakOptions?.port
        }
    };
}
