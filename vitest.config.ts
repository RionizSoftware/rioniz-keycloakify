import { defineConfig } from "vitest/config";
import { resolve as pathResolve } from "path";

export default defineConfig({
    test: {
        alias: {
            rionizkeycloakify: pathResolve(__dirname, "./src")
        },
        watchExclude: ["**/node_modules/**", "**/dist/**", "**/sample_react_project/**"]
    }
});
