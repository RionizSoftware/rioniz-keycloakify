import { join as pathJoin, relative as pathRelative, sep as pathSep } from "path";
import type { Plugin } from "vite";
import { assert } from "tsafe/assert";
import * as fs from "fs";
import { resolvedViteConfigJsonBasename, nameOfTheGlobal, basenameOfTheKeycloakifyResourcesDir, keycloak_resources } from "../bin/constants";
import type { ResolvedViteConfig } from "../bin/keycloakify/buildOptions/resolvedViteConfig";
import { getCacheDirPath } from "../bin/keycloakify/buildOptions/getCacheDirPath";
import { replaceAll } from "../bin/tools/String.prototype.replaceAll";
import { id } from "tsafe/id";
import { rm } from "../bin/tools/fs.rm";
import { copyKeycloakResourcesToPublic } from "../bin/copy-keycloak-resources-to-public";

export function keycloakify(): Plugin {
    let reactAppRootDirPath: string | undefined = undefined;
    let urlPathname: string | undefined = undefined;
    let buildDirPath: string | undefined = undefined;

    return {
        "name": "keycloakify",
        "apply": "build",
        "configResolved": async resolvedConfig => {
            reactAppRootDirPath = resolvedConfig.root;
            urlPathname = (() => {
                let out = resolvedConfig.env.BASE_URL;

                if (out === undefined) {
                    return undefined;
                }

                if (!out.startsWith("/")) {
                    out = "/" + out;
                }

                if (!out.endsWith("/")) {
                    out += "/";
                }

                return out;
            })();

            buildDirPath = pathJoin(reactAppRootDirPath, resolvedConfig.build.outDir);

            const { cacheDirPath } = getCacheDirPath({
                reactAppRootDirPath
            });

            if (!fs.existsSync(cacheDirPath)) {
                fs.mkdirSync(cacheDirPath, { "recursive": true });
            }

            fs.writeFileSync(
                pathJoin(cacheDirPath, resolvedViteConfigJsonBasename),
                Buffer.from(
                    JSON.stringify(
                        id<ResolvedViteConfig>({
                            "publicDir": pathRelative(reactAppRootDirPath, resolvedConfig.publicDir),
                            "assetsDir": resolvedConfig.build.assetsDir,
                            "buildDir": resolvedConfig.build.outDir,
                            urlPathname
                        }),
                        null,
                        2
                    ),
                    "utf8"
                )
            );

            await copyKeycloakResourcesToPublic({
                "processArgv": ["--project", reactAppRootDirPath]
            });
        },
        "transform": (code, id) => {
            assert(reactAppRootDirPath !== undefined);

            let transformedCode: string | undefined = undefined;

            replace_import_meta_env_base_url_in_source_code: {
                {
                    const isWithinSourceDirectory = id.startsWith(pathJoin(reactAppRootDirPath, "src") + pathSep);

                    if (!isWithinSourceDirectory) {
                        break replace_import_meta_env_base_url_in_source_code;
                    }
                }

                const isJavascriptFile = id.endsWith(".js") || id.endsWith(".jsx");

                {
                    const isTypeScriptFile = id.endsWith(".ts") || id.endsWith(".tsx");

                    if (!isTypeScriptFile && !isJavascriptFile) {
                        break replace_import_meta_env_base_url_in_source_code;
                    }
                }

                const windowToken = isJavascriptFile ? "window" : "(window as any)";

                if (transformedCode === undefined) {
                    transformedCode = code;
                }

                transformedCode = replaceAll(
                    transformedCode,
                    "import.meta.env.BASE_URL",
                    [
                        `(`,
                        `(${windowToken}.${nameOfTheGlobal} === undefined || import.meta.env.MODE === "development") ?`,
                        `    "${urlPathname ?? "/"}" :`,
                        `    \`\${${windowToken}.${nameOfTheGlobal}.url.resourcesPath}/${basenameOfTheKeycloakifyResourcesDir}/\``,
                        `)`
                    ].join("")
                );
            }

            if (transformedCode === undefined) {
                return;
            }

            return {
                "code": transformedCode
            };
        },
        "buildEnd": async () => {
            assert(buildDirPath !== undefined);

            await rm(pathJoin(buildDirPath, keycloak_resources), { "recursive": true, "force": true });
        }
    };
}
