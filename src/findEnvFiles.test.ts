import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Effect } from "effect";
import { findEnvFiles } from "./findEnvFiles.js";

describe("findEnvFiles", () => {
    let dir: string;

    beforeAll(async () => {
        dir = await mkdtemp(join(tmpdir(), "dotenvx-cli-test-"));
        await mkdir(join(dir, "nested"), { recursive: true });
        await writeFile(join(dir, ".env"), "FOO=1\n");
        await writeFile(join(dir, ".env.production"), "BAR=2\n");
        await writeFile(join(dir, ".env.development"), "BAZ=3\n");
        await writeFile(join(dir, ".env.keys"), "DOTENV_PRIVATE_KEY=abc\n");
        await writeFile(join(dir, ".env.vault"), "VAULT=xyz\n");
        await writeFile(join(dir, "nested", ".env"), "NESTED=1\n");
        await writeFile(join(dir, "not-env.txt"), "ignore me\n");
    });

    afterAll(async () => {
        await rm(dir, { recursive: true, force: true });
    });

    it("returns only .env* files in the given directory", async () => {
        const files = await Effect.runPromise(findEnvFiles(dir));
        expect(files).toEqual([".env", ".env.development", ".env.production"]);
    });

    it("excludes .env.keys and .env.vault", async () => {
        const files = await Effect.runPromise(findEnvFiles(dir));
        expect(files.some((f) => f.endsWith(".keys"))).toBe(false);
        expect(files.some((f) => f.endsWith(".vault"))).toBe(false);
    });

    it("excludes non-env files", async () => {
        const files = await Effect.runPromise(findEnvFiles(dir));
        expect(files).not.toContain("not-env.txt");
    });

    it("returns results sorted alphabetically", async () => {
        const files = await Effect.runPromise(findEnvFiles(dir));
        const sorted = [...files].sort();
        expect(files).toEqual(sorted);
    });

    it("does not recurse into subdirectories (nodir)", async () => {
        const files = await Effect.runPromise(findEnvFiles(dir));
        expect(files.some((f) => f.startsWith("nested"))).toBe(false);
    });

    it("returns empty array for empty directory", async () => {
        const empty = await mkdtemp(join(tmpdir(), "dotenvx-cli-empty-"));
        try {
            const files = await Effect.runPromise(findEnvFiles(empty));
            expect(files).toEqual([]);
        } finally {
            await rm(empty, { recursive: true, force: true });
        }
    });
});
