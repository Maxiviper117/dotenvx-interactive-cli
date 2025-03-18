await Bun.build({
    entrypoints: ["./src/index.ts"],
    outdir: "./dist",
    external: ["bun"], // Exclude the built-in "bun" module from bundling
    target: "node", // Set target to node so Node.js builtins are allowed
    sourcemap: 'none',
    // sourcemap: "inline", // Optional: include inline sourcemaps for debugging
    minify: {                   // Enable granular minification
        whitespace: true,
        identifiers: true,
        syntax: true,
    },
})
    .then((result) => {
        if (!result.success) {
            console.error("Build failed with the following logs:");
            for (const log of result.logs) {
                console.error(log);
            }
            process.exit(1);
        }
        console.log("Build succeeded!");
    })
    .catch((err) => {
        console.error("Unexpected error during build:", err);
        process.exit(1);
    });
