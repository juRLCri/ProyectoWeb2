import { defineConfig } from "vite";
import path, { resolve } from "node:path";
import { globSync } from "glob";

function obtenerHtmlFiles() {
    return Object.fromEntries(
        globSync(
            './**/*.html',
            {
                ignore: [
                    './dist/**',
                    './node_modules/**'
                ]
            }
        ).map((file) => {
            return [
                file.replace(/\.html$/, ""),
                resolve(__dirname, file)
            ];
        })
    );
}

export default defineConfig({
    appType: 'mpa',
    base: process.env.DEPLOY_BASE_URL ?? '/PROYECTOWEB2/',

    build: {
        cssCodeSplit: false,
        rollupOptions: {
            input: obtenerHtmlFiles(),
        }
    },

    css: {
        preprocessorOptions: {
            less: {
                additionalData: `@import "${resolve(__dirname, 'styles/variables.less')}";`
            }
        }
    },

    plugins: []
});