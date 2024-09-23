import * as child_process from "child_process";
import { startRebuildOnSrcChange } from "./shared/startRebuildOnSrcChange";

(async () => {
    run("npm run build");

    {
        const child = child_process.spawn("npx", ["start-storybook", "-p", "6006"], {
            shell: true
        });

        child.stdout.on("data", data => process.stdout.write(data));

        child.stderr.on("data", data => process.stderr.write(data));

        child.on("exit", process.exit.bind(process));
    }

    startRebuildOnSrcChange();
})();

function run(command: string, options?: { env?: NodeJS.ProcessEnv }) {
    console.log(`$ ${command}`);

    child_process.execSync(command, { stdio: "inherit", ...options });
}
