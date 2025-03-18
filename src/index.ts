import { $ } from "bun";
import chalk from "chalk";
import inquirer from "inquirer";

async function checkDotenvxInstallation() {
    try {
        const { exitCode } = await $`dotenvx --version`;
        return exitCode === 0;
    } catch {
        return false;
    }
}

async function main() {
    const isDotenvxInstalled = await checkDotenvxInstallation();
    
    if (!isDotenvxInstalled) {
        console.log(chalk.red('❌ dotenvx is not installed on your system.'));
        console.log(chalk.yellow('Please install it using: npm install -g @dotenvx/dotenvx'));
        process.exit(1);
    }

    console.log(chalk.green('✓ dotenvx is installed'));
    
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                { name: 'Encrypt .env files', value: 'encrypt' },
                { name: 'Decrypt .env files', value: 'decrypt' },
                { name: 'Install precommit hook', value: 'precommit' },
                { name: 'Exit', value: 'exit' }
            ]
        }
    ]);

    switch (answers.action) {
        case 'encrypt':
            try {
                await $`dotenvx encrypt`;
                console.log(chalk.green('✓ Files encrypted successfully'));
            } catch (error) {
                console.error(chalk.red('Error encrypting files:'), error);
            }
            break;
        case 'decrypt':
            try {
                await $`dotenvx decrypt`;
                console.log(chalk.green('✓ Files decrypted successfully'));
            } catch (error) {
                console.error(chalk.red('Error decrypting files:'), error);
            }
            break;
        case 'precommit':
            try {
                await $`dotenvx ext precommit --install`;
                console.log(chalk.green('✓ Precommit hook installed successfully'));
            } catch (error) {
                console.error(chalk.red('Error installing precommit hook:'), error);
            }
            break;
        case 'exit':
            process.exit(0);
    }
}

main().catch(console.error);


