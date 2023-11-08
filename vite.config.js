import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./', import.meta.url)) },
        ],
    },
});