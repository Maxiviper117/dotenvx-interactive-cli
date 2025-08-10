# dotenvx-interactive-cli

A powerful CLI tool for managing your .env files with dotenvx. Built with [@effect/cli](https://www.npmjs.com/package/@effect/cli), this tool provides both command-line and interactive interfaces for encrypting and decrypting environment files, as well as setting up precommit hooks.

## Why?

This tool was created to simplify the process of working with dotenvx encryption and decryption. Whether you prefer command-line efficiency or interactive guidance, you can quickly:

- Encrypt or decrypt .env files via direct commands or interactive menus
- Work with all files at once or target specific .env files
- Avoid typing lengthy dotenvx commands manually
- Set up precommit hooks with a single command
- Integrate seamlessly into CI/CD pipelines and scripts

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
npx dotenvx-interactive-cli
```

## Features

- 🔒 **Encrypt .env files** - Command-line or interactive file selection
- 🔓 **Decrypt .env files** - Batch or targeted decryption  
- 🪝 **Precommit hook installation** - One-command setup
- ⚡ **Built on @effect/cli** - Modern, type-safe CLI framework
- 🎯 **Hybrid interface** - Direct commands, interactive selection, wizard, or help-guided
- 🗂️ **Interactive file selection** - Beautiful checkbox interface when no files specified
- 🔍 **Smart file detection** - Automatically finds .env files (excludes .keys and .vault)
- ✨ **Professional CLI features** - Help, version, completions, and more
- 🛡️ **Robust error handling** - Clear error messages and graceful failures

## Usage

### Command Line Interface

Navigate to your project directory and use any of these commands:

#### Quick Actions
```bash
# Encrypt all .env files
dotenvx-interactive-cli encrypt

# Decrypt all .env files  
dotenvx-interactive-cli decrypt

# Install precommit hook
dotenvx-interactive-cli precommit
```

#### Target Specific Files
```bash
# Encrypt specific files
dotenvx-interactive-cli encrypt .env .env.production

# Decrypt specific files
dotenvx-interactive-cli decrypt .env.development
```

#### Interactive File Selection
```bash
# Run without file arguments to get an interactive selection menu
dotenvx-interactive-cli encrypt    # Shows checkbox menu to select files
dotenvx-interactive-cli decrypt    # Interactive selection for decryption

# The interactive menu allows you to:
# - Select individual files with spacebar
# - Choose "All files" option to select everything
# - Navigate with arrow keys
# - Confirm with Enter
# - Cancel with Ctrl+C
```

#### Get Help and Information
```bash
# Show main help
dotenvx-interactive-cli --help

# Show command-specific help
dotenvx-interactive-cli encrypt --help

# Show version
dotenvx-interactive-cli --version
```

#### Interactive Mode
```bash
# Launch wizard mode for guided command building
dotenvx-interactive-cli --wizard

# Run without arguments to see available commands
dotenvx-interactive-cli
```

#### Shell Completions
```bash
# Generate completions for your shell
dotenvx-interactive-cli --completions bash   # for bash
dotenvx-interactive-cli --completions zsh    # for zsh
dotenvx-interactive-cli --completions fish   # for fish

# Install completions (example for bash)
source <(dotenvx-interactive-cli --completions bash)
```

### NPX Usage

All commands work with npx as well:

```bash
npx dotenvx-interactive-cli encrypt .env
npx dotenvx-interactive-cli --wizard
npx dotenvx-interactive-cli --help
```

### Requirements

- A `.env.keys` file must be present in your project directory
- dotenvx must be installed globally

## Examples

### Basic Workflow
```bash
# 1. Interactive encryption with file selection
dotenvx-interactive-cli encrypt
# ✨ Shows a checkbox menu to select which .env files to encrypt

# 2. Set up precommit hook to auto-encrypt on commits
dotenvx-interactive-cli precommit

# 3. Later, interactive decryption for development
dotenvx-interactive-cli decrypt
# ✨ Interactive menu to choose which files to decrypt
```

### Quick Commands (No Interaction)
```bash
# Direct file specification (no prompts)
dotenvx-interactive-cli encrypt .env .env.production
dotenvx-interactive-cli decrypt .env.development
```

### CI/CD Integration
```bash
# In your CI/CD pipeline
npx dotenvx-interactive-cli decrypt .env.production
```

### Development Workflow
```bash
# Start with wizard mode if unsure
dotenvx-interactive-cli --wizard

# Or get help for specific commands
dotenvx-interactive-cli encrypt --help
```

## Migration from v0.3.x

If you're upgrading from the previous interactive-only version:

- **Old**: `dotenvx-interactive-cli` (interactive menu only)
- **New**: `dotenvx-interactive-cli [command]` (direct commands with fallback to guidance)

The tool now supports both approaches - you can use direct commands for scripting or run without arguments to see available options.

## License

MIT

## Contributing

Contributions, issues, and feature requests are welcome!
