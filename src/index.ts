import { Args, Command } from "@effect/cli";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { Console, Effect, Option } from "effect";
import { promises as fs } from "fs";
import { spawn, spawnSync } from "child_process";
import { glob } from "glob";
import { checkbox } from "@inquirer/prompts";

/**
 * Executes a shell command using Effect system
 * @param cmd - The command to execute
 * @param args - Additional arguments to pass to the command
 * @returns Effect containing stdout, stderr, and exit code
 */
const executeCommand = (
    cmd: string,
    ...args: string[]
): Effect.Effect<{ stdout: string; stderr: string; exitCode: number }, Error> =>
    Effect.async<{ stdout: string; stderr: string; exitCode: number }, Error>((resume) => {
        const child = spawn(cmd, args, { shell: true });
        let stdout = "";
        let stderr = "";
        
        child.stdout?.on("data", (data: Buffer) => {
            process.stdout.write(data);
            stdout += data.toString();
        });
        
        child.stderr?.on("data", (data: Buffer) => {
            process.stderr.write(data);
            stderr += data.toString();
        });
        
        child.on("close", (code: number) => {
            resume(Effect.succeed({
                stdout,
                stderr,
                exitCode: code ?? 0,
            }));
        });
        
        child.on("error", (error) => {
            resume(Effect.fail(error));
        });
    });

/**
 * Fast check for dotenvx CLI in PATH using Effect
 * @returns Effect<boolean>
 */
const checkDotenvxInstallation = (): Effect.Effect<boolean, never> =>
    Effect.sync(() => {
        try {
            const cmd = process.platform === "win32" ? "where" : "which";
            const result = spawnSync(cmd, ["dotenvx"], { encoding: "utf8" });
            return result.status === 0;
        } catch {
            return false;
        }
    });

/**
 * Checks for the existence of .env.keys file using Effect
 * @returns Effect<boolean> true if .env.keys exists, false otherwise
 */
const checkEnvKeysFile = (): Effect.Effect<boolean, never> =>
    Effect.tryPromise({
        try: () => fs.access(".env.keys"),
        catch: () => new Error("File not found")
    })
    .pipe(
        Effect.map(() => true),
        Effect.catchAll(() => Effect.succeed(false))
    );

/**
 * Finds all .env files in the current directory using Effect
 * @returns Effect<string[]> Array of found .env file paths
 */
const findEnvFiles = (): Effect.Effect<string[], Error> =>
    Effect.tryPromise({
        try: async () => {
            const files = await glob(".env*", {
                ignore: [".env.keys", ".env.keys.json", "*.vault"],
                nodir: true,
            });
            return files.filter(
                (file) => !file.endsWith(".keys") && !file.endsWith(".vault")
            );
        },
        catch: (error) => new Error(`Failed to find env files: ${error}`)
    });

/**
 * Interactive file selection using inquirer prompts wrapped in Effect
 * @param files - Array of .env files to choose from
 * @param action - The action to perform on selected files (encrypt/decrypt)
 * @returns Effect<string[]> Array of selected file paths
 */
const selectFilesInteractively = (
    files: string[], 
    action: string
): Effect.Effect<string[], Error> =>
    Effect.tryPromise({
        try: async () => {
            if (files.length === 0) {
                return [];
            }

            const choices = [
                {
                    name: `🗂️  All files (${files.length} files)`,
                    value: "ALL",
                    short: "All files",
                },
                ...files.map((file) => ({
                    name: `📄 ${file}`,
                    value: file,
                    short: file,
                })),
            ];

            const selectedFiles = await checkbox({
                message: `Select .env files to ${action}:`,
                choices,
                instructions: "Press Space to select, Enter to confirm, Ctrl+C to cancel",
            });

            // If "ALL" is selected, return all files
            if (selectedFiles.includes("ALL")) {
                return files;
            }

            return selectedFiles;
        },
        catch: (error) => {
            // Handle user cancellation (Ctrl+C) gracefully
            if (error instanceof Error && error.name === "ExitPromptError") {
                return new Error("User cancelled selection");
            }
            return new Error(`Interactive selection failed: ${error}`)
        }
    });

/**
 * Validates that dotenvx is installed and .env.keys file exists
 */
const validatePrerequisites = Effect.gen(function* () {
    yield* Console.log("dotenvx-interactive-cli");
    
    // Run both checks in parallel
    const [isDotenvxInstalled, isEnvKeysFilePresent] = yield* Effect.all([
        checkDotenvxInstallation(),
        checkEnvKeysFile(),
    ]);

    if (!isDotenvxInstalled) {
        yield* Console.log("❌ dotenvx is not installed on your system.");
        yield* Console.log("Please install it using: npm install -g @dotenvx/dotenvx");
        return yield* Effect.fail(new Error("dotenvx not installed"));
    }

    if (!isEnvKeysFilePresent) {
        yield* Console.log("No .env.keys file found. Please create one to proceed.");
        return yield* Effect.fail(new Error(".env.keys file not found"));
    }

    yield* Console.log("👌 dotenvx is installed");
    return true;
});

// Arguments for file selection
const files = Args.text({ name: "files" }).pipe(Args.repeated, Args.optional);

// dotenvx-interactive-cli encrypt [-f files...]
const encryptCommand = Command.make(
    "encrypt",
    { files },
    ({ files }) =>
        Effect.gen(function* () {
            yield* validatePrerequisites;
            
            const envFiles = yield* findEnvFiles();
            
            if (envFiles.length === 0) {
                yield* Console.log("No .env files found in the current directory.");
                return;
            }
            
            // Determine files to encrypt
            let filesToEncrypt: string[];
            
            if (Option.isSome(files) && files.value.length > 0) {
                // Use provided files directly
                filesToEncrypt = files.value;
            } else {
                // Show interactive selection
                yield* Console.log("");
                
                const result = yield* Effect.either(selectFilesInteractively(envFiles, "encrypt"));
                
                if (result._tag === "Left") {
                    if (result.left.message === "User cancelled selection") {
                        yield* Console.log("👋 Selection cancelled. Until next time!");
                        return;
                    } else {
                        return yield* Effect.fail(result.left);
                    }
                }
                
                filesToEncrypt = result.right;
                
                if (filesToEncrypt.length === 0) {
                    yield* Console.log("No files selected for encryption");
                    return;
                }
            }
            
            yield* Console.log(`Encrypting files: ${filesToEncrypt.join(", ")}`);
            const result = yield* executeCommand("dotenvx", "encrypt", "-f", ...filesToEncrypt);
            
            if (result.exitCode === 0) {
                yield* Console.log("✓ Files encrypted successfully");
            } else {
                yield* Console.error(`❌ Failed to encrypt files: ${result.stderr}`);
                return yield* Effect.fail(new Error("Encryption failed"));
            }
        })
);

// dotenvx-interactive-cli decrypt [-f files...]
const decryptCommand = Command.make(
    "decrypt",
    { files },
    ({ files }) =>
        Effect.gen(function* () {
            yield* validatePrerequisites;
            
            const envFiles = yield* findEnvFiles();
            
            if (envFiles.length === 0) {
                yield* Console.log("No .env files found in the current directory.");
                return;
            }
            
            // Determine files to decrypt
            let filesToDecrypt: string[];
            
            if (Option.isSome(files) && files.value.length > 0) {
                // Use provided files directly
                filesToDecrypt = files.value;
            } else {
                // Show interactive selection
                yield* Console.log("");
                
                const result = yield* Effect.either(selectFilesInteractively(envFiles, "decrypt"));
                
                if (result._tag === "Left") {
                    if (result.left.message === "User cancelled selection") {
                        yield* Console.log("👋 Selection cancelled. Until next time!");
                        return;
                    } else {
                        return yield* Effect.fail(result.left);
                    }
                }
                
                filesToDecrypt = result.right;
                
                if (filesToDecrypt.length === 0) {
                    yield* Console.log("No files selected for decryption");
                    return;
                }
            }
            
            yield* Console.log(`Decrypting files: ${filesToDecrypt.join(", ")}`);
            const result = yield* executeCommand("dotenvx", "decrypt", "-f", ...filesToDecrypt);
            
            if (result.exitCode === 0) {
                yield* Console.log("✓ Files decrypted successfully");
            } else {
                yield* Console.error(`❌ Failed to decrypt files: ${result.stderr}`);
                return yield* Effect.fail(new Error("Decryption failed"));
            }
        })
);

// dotenvx-interactive-cli precommit
const precommitCommand = Command.make(
    "precommit",
    {},
    () =>
        Effect.gen(function* () {
            yield* validatePrerequisites;
            yield* Console.log("Installing precommit hook...");
            const result = yield* executeCommand("dotenvx", "ext", "precommit", "--install");
            
            if (result.exitCode === 0) {
                yield* Console.log("👍 Precommit hook installed successfully");
            } else {
                yield* Console.error(`❌ Failed to install precommit hook: ${result.stderr}`);
                return yield* Effect.fail(new Error("Precommit installation failed"));
            }
        })
);

// Main command - if no subcommand is provided, show interactive menu
const mainCommand = Command.make(
    "dotenvx-interactive-cli",
    {},
    () =>
        Effect.gen(function* () {
            yield* validatePrerequisites;
            yield* Console.log("");
            yield* Console.log("Available commands:");
            yield* Console.log("  encrypt    - Encrypt .env files");
            yield* Console.log("  decrypt    - Decrypt .env files");
            yield* Console.log("  precommit  - Install precommit hook");
            yield* Console.log("");
            yield* Console.log("Use --help with any command for more information.");
        })
);

// Combine all commands
const cli = mainCommand.pipe(
    Command.withSubcommands([encryptCommand, decryptCommand, precommitCommand])
);

// Set up the CLI application
const app = Command.run(cli, {
    name: "dotenvx-interactive-cli",
    version: "0.4.0",
});

// Handle graceful exit
process.on("SIGINT", () => {
    console.log("\n👋 Exiting gracefully. Until next time!");
    process.exit(0);
});

// Run the application
Effect.suspend(() => app(process.argv))
    .pipe(
        Effect.provide(NodeContext.layer),
        Effect.catchAll((error) =>
            Console.error(`❌ An error occurred: ${error}`)
        )
    )
    .pipe(NodeRuntime.runMain);
