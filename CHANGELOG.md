# dotenvx-interactive-cli

## [1.3.3](https://github.com/Maxiviper117/dotenvx-interactive-cli/compare/dotenvx-interactive-cli-v1.3.2...dotenvx-interactive-cli-v1.3.3) (2026-06-01)


### Bug Fixes

* remove package manager pin ([#17](https://github.com/Maxiviper117/dotenvx-interactive-cli/issues/17)) ([77db92d](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/77db92d962c23a04059497a7888e5ae69cd4c15b))

## [1.3.2](https://github.com/Maxiviper117/dotenvx-interactive-cli/compare/dotenvx-interactive-cli-v1.3.1...dotenvx-interactive-cli-v1.3.2) (2026-06-01)


### Bug Fixes

* Fix Effect package alignment ([#15](https://github.com/Maxiviper117/dotenvx-interactive-cli/issues/15)) ([b08033c](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/b08033c188cdd1fcee1773b68e2f53f585c7abed))

## [1.3.1](https://github.com/Maxiviper117/dotenvx-interactive-cli/compare/dotenvx-interactive-cli-v1.3.0...dotenvx-interactive-cli-v1.3.1) (2026-05-28)


### Bug Fixes

* update pnpm/action-setup version to ensure compatibility ([49d8a0b](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/49d8a0b0996ed6bc7b3128faf99e323465b241c6))

## [1.3.0](https://github.com/Maxiviper117/dotenvx-interactive-cli/compare/dotenvx-interactive-cli-v1.2.0...dotenvx-interactive-cli-v1.3.0) (2026-05-28)


### Features

* add changeset for major update to use Effect CLI library ([2ca0557](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/2ca055781b7d372560eb8e5b4e9a3a3a825ec9d8))
* add initial Changesets configuration and README files ([371f3f1](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/371f3f153353bf66dbaeee103b7732d8a44df846))
* add interactive encrypt/decrypt/precommit CLI for dotenvx ([bed3a2c](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/bed3a2c2211e3d9a61fbcea83d2a888b64bf3968))


### Bug Fixes

* add prechangeset:publish script to ensure build before publishing changeset ([8757153](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/875715370b955344e6ef5d2845242e0b77116e4d))
* add shebang to index.ts for proper execution in CLI environment ([4077cb8](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/4077cb88b611de4160d77c3e3c0f37b8ee221296))
* add zx as a dependency in package.json and update pnpm-lock.yaml ([00e2332](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/00e233273b674b0e2426d99ef5a9ee0d7a473620))
* **ci:** remove invalid cache: false from setup-node ([a6aad79](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/a6aad7988ce6f5c80d06fa693da612300ea2780a))
* **ci:** update npm before staging for 11.15+ support ([b90b9f7](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/b90b9f7cb2e0c81c8b38509ba13f45df8aacdc7c))
* **ci:** use --ignore-scripts for pnpm install ([d1c8762](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/d1c8762a2961a1b22d199b79831d30d53bf53d32))
* clean up code formatting and improve error handling messages in main workflow ([8b61ffe](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/8b61ffe8e876a754d4a5ddc6604f52f7a2e716f2))
* correct argument handling in executeCommand and update help display behavior in main ([9925451](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/99254515662ec5cca070631b5974ea8d44115551))
* correct npx command in README to use full package name ([1b890b1](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/1b890b1c32305a484295c884d1920058f31e154a))
* enhance dotenvx installation check and improve .env.keys file validation ([aff2874](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/aff28744136a088faf897dfb1b7787dc07ed62de))
* improve command execution logging and error handling in executeCommand ([d6cbda7](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/d6cbda7fe24d5f84e823a2b4fe155fc20f8947c5))
* improve error handling in main function by logging errors before exiting ([2a06f4d](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/2a06f4d689f34914708927c0c8a4520e70382185))
* improve README formatting for usage instructions ([56232c4](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/56232c4cc023fd920487ca7648719c303d42c71a))
* improve user instructions and feedback in interactive prompts ([08333e2](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/08333e2753aa938a9e3fd110ac250b7f462e3bb2))
* **release:** bump manifest to 1.2.0 to avoid re-publishing 1.1.1 ([06bc00e](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/06bc00ee0b5a0ac16cacf72b8f3d7ec4de305676))
* replace changesets with release-please and npm staged publishing ([#8](https://github.com/Maxiviper117/dotenvx-interactive-cli/issues/8)) ([10254b3](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/10254b38160a32ab92af13d1268f41b2591cad1b))
* streamline permissions and fix output variable in release-please.yml ([89060e0](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/89060e07eff5f3fad9da96c167766ac768724f58))
* update .npmignore to include .github directory ([8007cb3](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/8007cb3aaf9e62c8f4abc9c28f92b591a34cad2c))
* update findEnvFiles function to use glob for improved file searching ([6c97a29](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/6c97a299e345bdf3b14de498d1c9fafda9e1a060))
* update npx command in README for correct usage ([233178a](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/233178a795181273e8c1e4b572726ab6bc25fbe6))
* update prechangeset:publish script to use pnpm instead of npm ([521a851](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/521a85176b7a694ee2efb75cff00efaa1fe1774d))

## [1.1.1](https://github.com/Maxiviper117/dotenvx-interactive-cli/compare/dotenvx-interactive-cli-v1.1.0...dotenvx-interactive-cli-v1.1.1) (2026-05-28)


### Bug Fixes

* **ci:** remove invalid cache: false from setup-node ([a6aad79](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/a6aad7988ce6f5c80d06fa693da612300ea2780a))
* **ci:** update npm before staging for 11.15+ support ([b90b9f7](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/b90b9f7cb2e0c81c8b38509ba13f45df8aacdc7c))
* **ci:** use --ignore-scripts for pnpm install ([d1c8762](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/d1c8762a2961a1b22d199b79831d30d53bf53d32))

## [1.1.0](https://github.com/Maxiviper117/dotenvx-interactive-cli/compare/dotenvx-interactive-cli-v1.0.0...dotenvx-interactive-cli-v1.1.0) (2026-05-28)


### Features

* add changeset for major update to use Effect CLI library ([2ca0557](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/2ca055781b7d372560eb8e5b4e9a3a3a825ec9d8))
* add initial Changesets configuration and README files ([371f3f1](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/371f3f153353bf66dbaeee103b7732d8a44df846))
* add interactive encrypt/decrypt/precommit CLI for dotenvx ([bed3a2c](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/bed3a2c2211e3d9a61fbcea83d2a888b64bf3968))


### Bug Fixes

* add prechangeset:publish script to ensure build before publishing changeset ([8757153](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/875715370b955344e6ef5d2845242e0b77116e4d))
* add shebang to index.ts for proper execution in CLI environment ([4077cb8](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/4077cb88b611de4160d77c3e3c0f37b8ee221296))
* add zx as a dependency in package.json and update pnpm-lock.yaml ([00e2332](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/00e233273b674b0e2426d99ef5a9ee0d7a473620))
* clean up code formatting and improve error handling messages in main workflow ([8b61ffe](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/8b61ffe8e876a754d4a5ddc6604f52f7a2e716f2))
* correct argument handling in executeCommand and update help display behavior in main ([9925451](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/99254515662ec5cca070631b5974ea8d44115551))
* correct npx command in README to use full package name ([1b890b1](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/1b890b1c32305a484295c884d1920058f31e154a))
* enhance dotenvx installation check and improve .env.keys file validation ([aff2874](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/aff28744136a088faf897dfb1b7787dc07ed62de))
* improve command execution logging and error handling in executeCommand ([d6cbda7](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/d6cbda7fe24d5f84e823a2b4fe155fc20f8947c5))
* improve error handling in main function by logging errors before exiting ([2a06f4d](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/2a06f4d689f34914708927c0c8a4520e70382185))
* improve README formatting for usage instructions ([56232c4](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/56232c4cc023fd920487ca7648719c303d42c71a))
* improve user instructions and feedback in interactive prompts ([08333e2](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/08333e2753aa938a9e3fd110ac250b7f462e3bb2))
* replace changesets with release-please and npm staged publishing ([#8](https://github.com/Maxiviper117/dotenvx-interactive-cli/issues/8)) ([10254b3](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/10254b38160a32ab92af13d1268f41b2591cad1b))
* update .npmignore to include .github directory ([8007cb3](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/8007cb3aaf9e62c8f4abc9c28f92b591a34cad2c))
* update findEnvFiles function to use glob for improved file searching ([6c97a29](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/6c97a299e345bdf3b14de498d1c9fafda9e1a060))
* update npx command in README for correct usage ([233178a](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/233178a795181273e8c1e4b572726ab6bc25fbe6))
* update prechangeset:publish script to use pnpm instead of npm ([521a851](https://github.com/Maxiviper117/dotenvx-interactive-cli/commit/521a85176b7a694ee2efb75cff00efaa1fe1774d))

## 1.0.0

### Major Changes

- 2ca0557: Updated to use Effect CLI library

## 0.4.0

### Minor Changes

- remove zx - too slow

## 0.3.2

### Patch Changes

- fix cli call

## 0.3.1

### Patch Changes

- fix zx dep

## 0.3.0

### Minor Changes

- improve perf and switch to tsup bundler

## 0.2.3

### Patch Changes

- Fix typo in readme

## 0.2.2

### Patch Changes

- fix README

## 0.2.1

### Patch Changes

- fix README

## 0.2.0

### Minor Changes

- removed bun $ shell for child_process

## 0.1.1

### Patch Changes

- First Release
