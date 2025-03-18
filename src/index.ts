#!/usr/bin/env node
import { $ } from "bun";
import chalk from "chalk";
import inquirer from "inquirer";
import { glob } from "glob";

async function checkDotenvxInstallation() {
    try {
        await $`echo "dotenvx version"`;
        const { exitCode } = await $`dotenvx --version`;
        return exitCode === 0;
    } catch {
        return false;
    }
}

async function checkEnvKeysFile() {
    const files = await glob(".env.keys", { nodir: true });
    return files.length > 0;
}

async function findEnvFiles(): Promise<string[]> {
    const files = await glob(".env*", {
        ignore: [".env.keys", ".env.keys.json", "*.vault"],
        nodir: true,
    });
    return files.filter(
        (file) => !file.endsWith(".keys") && !file.endsWith(".vault")
    );
}

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
        message: `Select .env files to ${action}:\n  ${chalk.dim(
            "(Use arrow keys to move, Space to select, A to toggle all, I to invert)"
        )}`,
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

async function main() {
    const isDotenvxInstalled = await checkDotenvxInstallation();
    
    if (!isDotenvxInstalled) {
        console.log(chalk.red("❌ dotenvx is not installed on your system."));
        console.log(
            chalk.yellow(
                "Please install it using: npm install -g @dotenvx/dotenvx"
            )
        );
        process.exit(1);
    }

    const isEnvKeysFilePresent = await checkEnvKeysFile();

    if (!isEnvKeysFilePresent) {
        console.log(
            chalk.yellow(
                "No .env.keys file found. Please create one to proceed."
            )
        );
        process.exit(1);
    }

    console.log(chalk.green("✓ dotenvx is installed"));

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

    switch (answers.action) {
        case "encrypt":
            try {
                const files = await findEnvFiles();
                const selectedFiles = await selectFiles(files, "encrypt");

                if (selectedFiles.length > 0) {
                    const fileArgs = `-f ${selectedFiles.join(" ")}`;
                    await $`dotenvx encrypt ${{ raw: fileArgs }}`;
                    console.log(chalk.green("✓ Files encrypted successfully"));
                } else {
                    console.log(
                        chalk.yellow("No files selected for encryption")
                    );
                }
            } catch (error) {
                console.error(chalk.red("Error encrypting files:"), error);
            }
            break;
        case "decrypt":
            try {
                const files = await findEnvFiles();
                const selectedFiles = await selectFiles(files, "decrypt");

                if (selectedFiles.length > 0) {
                    const fileArgs = `-f ${selectedFiles.join(" ")}`;
                    await $`dotenvx decrypt ${{ raw: fileArgs }}`;
                    console.log(chalk.green("✓ Files decrypted successfully"));
                } else {
                    console.log(
                        chalk.yellow("No files selected for decryption")
                    );
                }
            } catch (error) {
                console.error(chalk.red("Error decrypting files:"), error);
            }
            break;
        case "precommit":
            try {
                await $`dotenvx ext precommit --install`;
                console.log(
                    chalk.green("✓ Precommit hook installed successfully")
                );
            } catch (error) {
                console.error(
                    chalk.red("Error installing precommit hook:"),
                    error
                );
            }
            break;
        case "exit":
            process.exit(0);
    }
}

main().catch(console.error);
