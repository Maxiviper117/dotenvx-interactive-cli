# dotenvx-interactive-cli

An interactive CLI tool for managing your .env files with dotenvx. This tool provides a user-friendly interface for encrypting and decrypting environment files, as well as setting up precommit hooks.

## Why?

This tool was created to simplify the process of working with dotenvx encryption and decryption. Instead of typing long commands or remembering specific syntax, you can quickly:

- Select which .env files to encrypt or decrypt through an interactive menu
- Avoid typing lengthy dotenvx commands manually
- Selectively encrypt or decrypt specific files when working with multiple .env files
- Set up precommit hooks with a single command

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [dotenvx](https://github.com/dotenvx/dotenvx) must be installed globally (`npm install -g @dotenvx/dotenvx`)

## Installation

You can install this package globally:

```bash
npm install -g dotenvx-interactive-cli
```

Or use it directly with npx:

```bash
npx dotenvx-interactive
```

## Features

- 🔒 Interactive encryption of .env files
- 🔓 Interactive decryption of .env files
- 🪝 Easy precommit hook installation
- ✨ User-friendly selection interface for multiple .env files
- 🔍 Automatic .env file detection
- ⚡ Validation of dotenvx installation and required files

## Usage

1. Navigate to your project directory where your .env files are located
2. Run the CLI tool:

When installed globally:
```bash
dotenvx-interactive
```
or use npx:
```bash
npx dotenvx-interactive-cli
```
1. Choose from the available options:
   - Encrypt .env files
   - Decrypt .env files
   - Install precommit hook
   - Exit

### Requirements

- A `.env.keys` file must be present in your project directory
- dotenvx must be installed globally

## License

MIT

## Contributing

Contributions, issues, and feature requests are welcome!
