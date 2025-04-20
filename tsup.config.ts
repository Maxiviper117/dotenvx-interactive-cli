import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm"],
    target: "node18",
    splitting: false, // No code splitting for single entry
    clean: true,
    dts: false, // Disable type definitions for faster builds
    minify: false, // Disable minification for faster builds
    sourcemap: false,
    treeshake: true, // Enable tree-shaking
    banner: {
        js: "#!/usr/bin/env zx",
    },
});
