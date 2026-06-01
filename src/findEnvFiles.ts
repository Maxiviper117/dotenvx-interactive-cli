import { Effect } from "effect";
import { glob } from "glob";

/**
 * Finds all .env files in the given directory using Effect.
 * Excludes .env.keys, .env.keys.json, and *.vault files.
 * Results are sorted alphabetically for deterministic ordering.
 *
 * @param dir - Directory to search (defaults to cwd)
 * @returns Effect<string[]> Array of found .env file paths
 */
export const findEnvFiles = (
    dir: string = process.cwd()
): Effect.Effect<string[], Error> =>
    Effect.tryPromise({
        try: async () => {
            const files = await glob(".env*", {
                cwd: dir,
                ignore: [".env.keys", ".env.keys.json", "*.vault"],
                nodir: true,
            });
            return files
                .filter(
                    (file) => !file.endsWith(".keys") && !file.endsWith(".vault")
                )
                .sort();
        },
        catch: (error) => new Error(`Failed to find env files: ${error}`)
    });
