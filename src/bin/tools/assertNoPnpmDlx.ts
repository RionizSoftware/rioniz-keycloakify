import { sep as pathSep } from "path";
import chalk from "chalk";

export function assertNoPnpmDlx() {
    if (__dirname.includes(`${pathSep}pnpm${pathSep}dlx${pathSep}`)) {
        console.log(
            [
                chalk.red(
                    "Please don't use `pnpm dlx rionizkeycloakify` (download and execute)"
                ),
                "\nUse `npx rionizkeycloakify` or `pnpm exec rionizkeycloakify` instead since you want to use the rionizkeycloakify",
                "version that is installed in your project and not download and run the latest NPM version of rionizkeycloakify."
            ].join(" ")
        );
        process.exit(1);
    }
}
