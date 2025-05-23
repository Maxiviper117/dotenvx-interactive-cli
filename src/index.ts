import chalk from "chalk";
import inquirer from "inquirer";
import { promises as fs } from "fs";
import { spawn, spawnSync } from "child_process";
import { glob } from "glob";

/**
 * Executes a shell command with proper argument handling using child_process.spawn
 * @param cmd - The command to execute
 * @param args - Additional arguments to pass to the command
 * @returns Object containing stdout, stderr, and exit code
 */
async function executeCommand(
    cmd: string,
    ...args: string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    return new Promise((resolve) => {
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
            resolve({
                stdout,
                stderr,
                exitCode: code ?? 0,
            });
        });
    });
}

/**
 * Fast check for dotenvx CLI in PATH (using which/where)
 * @returns Promise<boolean>
 */
async function checkDotenvxInstallation(): Promise<boolean> {
    try {
        const cmd = process.platform === "win32" ? "where" : "which";
        const result = spawnSync(cmd, ["dotenvx"], { encoding: "utf8" });
        return result.status === 0;
    } catch {
        return false;
    }
}

/**
 * Checks for the existence of .env.keys file
 * @returns Promise<boolean> true if .env.keys exists, false otherwise
 */
async function checkEnvKeysFile(): Promise<boolean> {
    try {
        await fs.access(".env.keys");
        return true;
    } catch {
        return false;
    }
}

/**
 * Finds all .env files in the current directory, excluding .env.keys and .vault files
 * @returns Promise<string[]> Array of found .env file paths
 */
async function findEnvFiles(): Promise<string[]> {
    const files = await glob(".env*", {
        ignore: [".env.keys", ".env.keys.json", "*.vault"],
        nodir: true,
    });
    return files.filter(
        (file) => !file.endsWith(".keys") && !file.endsWith(".vault")
    );
}

/**
 * Displays an interactive prompt for selecting .env files
 * @param files - Array of .env files to choose from
 * @param action - The action to perform on selected files (encrypt/decrypt)
 * @returns Promise<string[]> Array of selected file paths
 */
async function selectFiles(files: string[], action: string): Promise<string[]> {
    if (files.length === 0) {
        console.log(
            chalk.yellow("No .env files found in the current directory.")
        );
        return [];
    }

    const { selectedFiles } = await inquirer.prompt({
        type: "checkbox",
        name: "selectedFiles",
        message: `Select .env files to ${action}:\n`,
        // instructions: chalk.dim("(Press Space to select, Enter to confirm)"),
        instructions: `${chalk.dim("(Press ")} ${chalk.blue(
            "Space"
        )} ${chalk.dim("to select, ")}${chalk.blue("Enter")} ${chalk.dim(
            "to confirm, "
        )}${chalk.blue("Ctrl/Cmd + C")} ${chalk.dim("to exit)")} `,
        choices: [
            {
                name: `All files ${chalk.dim("← Select all .env files")}`,
                value: "ALL",
                short: "All files",
            },
            new inquirer.Separator(),
            ...files.map((file) => ({
                name: `${file} ${chalk.dim("← Press Space to select")}`,
                value: file,
                short: file,
            })),
        ],
        pageSize: 10,
        loop: false,
        prefix: chalk.blue("?"),
        validate: (answer: any) => {
            if (answer.length === 0) {
                return "Please select at least one file to proceed";
            }
            return true;
        },
    });

    // If "ALL" is selected, return all files
    if (selectedFiles.includes("ALL")) {
        return files;
    }

    return selectedFiles;
}

/**
 * Main application function that handles the interactive CLI workflow
 * Optimized for performance: checks for dotenvx and .env.keys in parallel
 */
async function main() {
    console.log(chalk.bold("dotenvx-interactive-cli"));

    // Help flag support
    if (process.argv.includes("--help") || process.argv.includes("-h")) {
        console.log(`\n${chalk.bold("dotenvx-interactive-cli")}
Usage: dotenvx-interactive [options]\n
Options:
  --help, -h     Show this help message\n`);
        process.exit(0);
    }

    // Run both checks in parallel
    const [isDotenvxInstalled, isEnvKeysFilePresent] = await Promise.all([
        checkDotenvxInstallation(),
        checkEnvKeysFile(),
    ]);

    if (!isDotenvxInstalled) {
        console.log(chalk.red("❌ dotenvx is not installed on your system."));
        console.log(
            chalk.yellow(
                "Please install it using: npm install -g @dotenvx/dotenvx"
            )
        );
        throw new Error("dotenvx not installed");
    }

    if (!isEnvKeysFilePresent) {
        console.log(
            chalk.yellow(
                "No .env.keys file found. Please create one to proceed."
            )
        );
        throw new Error(".env.keys file not found");
    }

    console.log(chalk.green("👌 dotenvx is installed"));
    console.log();

    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                { name: "Encrypt .env files", value: "encrypt" },
                { name: "Decrypt .env files", value: "decrypt" },
                { name: "Install precommit hook", value: "precommit" },
                { name: "Exit", value: "exit" },
            ],
        },
    ]);

    console.log();

    switch (answers.action) {
        case "encrypt":
            try {
                const files = await findEnvFiles();
                const selectedFiles = await selectFiles(files, "encrypt");
                if (selectedFiles.length > 0) {
                    await executeCommand(
                        "dotenvx",
                        "encrypt",
                        "-f",
                        ...selectedFiles
                    );
                    console.log(chalk.green("✓ Files encrypted successfully"));
                } else {
                    console.log(
                        chalk.yellow("No files selected for encryption")
                    );
                }
            } catch (error) {
                console.error(chalk.red("Error encrypting files:"), error);
                throw error;
            }
            break;
        case "decrypt":
            try {
                const files = await findEnvFiles();
                const selectedFiles = await selectFiles(files, "decrypt");
                if (selectedFiles.length > 0) {
                    const execResult = await executeCommand(
                        "dotenvx",
                        "decrypt",
                        "-f",
                        ...selectedFiles
                    );
                    if (execResult.exitCode === 0) {
                        console.log(
                            chalk.green("✓ Files decrypted successfully")
                        );
                    } else {
                        console.error(
                            chalk.red("❌ Failed to decrypt files:"),
                            execResult.stderr
                        );
                    }
                } else {
                    console.log(
                        chalk.yellow("No files selected for decryption")
                    );
                }
            } catch (error) {
                console.error(chalk.red("Error decrypting files:"), error);
                throw error;
            }
            break;
        case "precommit":
            try {
                await executeCommand(
                    "dotenvx",
                    "ext",
                    "precommit",
                    "--install"
                );
                console.log(
                    chalk.green("👍 Precommit hook installed successfully")
                );
            } catch (error) {
                console.error(
                    chalk.red("Error installing precommit hook:"),
                    error
                );
                throw error;
            }
            break;
        case "exit":
            throw new Error("User exited");
    }
}

process.on("SIGINT", () => {
    console.log("\n👋 Exiting gracefully. Until next time!");
    process.exit(0);
});

process.on("uncaughtException", (error) => {
    if (
        (error instanceof Error && error.name === "ExitPromptError") ||
        (typeof error === "object" && error && (error as any).isTtyError)
    ) {
        console.log("👋 Prompt exited. Until next time!");
        process.exit(0);
    } else {
        console.error(chalk.red("Unexpected error:"), error);
        process.exit(1);
    }
});

main().catch((err) => {
    if (
        (err instanceof Error && err.name === "ExitPromptError") ||
        (typeof err === "object" && err && (err as any).isTtyError)
    ) {
        console.log("👋 Prompt exited. Until next time!");
        process.exit(0);
    }
    console.error(chalk.red("❌ An error occurred:"), err);
    process.exit(1);
});
