import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ["src/index.ts", "src/findEnvFiles.ts"],
    outDir: "dist",
    format: ["esm"],
    target: "node18",
    splitting: false,
    clean: true,
    dts: false,
    minify: false,
    sourcemap: false,
    treeshake: true,
    bundle: false,
    banner: {
        js: "#!/usr/bin/env node",
    },
});
