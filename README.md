<p align="center">
    <img alt="Logo" src="assets/logo.svg" width=100/>
</p>
<h1 align="center" style="border-bottom: none; margin-top: -8px;">@emingy/core</h1>
<h6 align="center">A modern React UI component library with TypeScript support, comprehensive testing, and Storybook documentation.</h6>
<p align="center">
  <a href="https://www.npmjs.com/package/@emingy/configs">
    <img alt="npm version" src="https://img.shields.io/npm/v/@emingy/core?logo=npm">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release">
  </a>
  <a href="LICENSE">
    <img alt="License" src="https://img.shields.io/npm/l/@emingy/core">
  </a>
</p>

---

## ✨ Features

- 🎨 Modern React UI components with TypeScript support
- 📚 Interactive documentation via [Storybook](https://emingy.github.io/core/)
- 🧪 Unit, snapshot, and visual regression tests (Playwright)
- 🔍 Strict code quality checks: ESLint, Stylelint, Prettier, circular deps, dead code

---

## 📦 Installation

Install the package with peer dependencies:

```bash
npm install @emingy/core react react-dom react-router-dom classnames
# or
yarn add @emingy/core react react-dom react-router-dom classnames
# or
pnpm add @emingy/core react react-dom react-router-dom classnames
```

### Peer Dependencies

- `react` ^19.2.0
- `react-dom` ^19.2.0
- `react-router-dom` ^6.30.3
- `classnames` ^2.5.1

---

## 📚 Documentation

Full component documentation and interactive examples are available at:

**[https://emingy.github.io/core/](https://emingy.github.io/core/)**

---

## 🛠️ Development

### Prerequisites

- Node.js >=22
- pnpm 10

### Commands

```bash
# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Run tests
pnpm test

# Build library
pnpm build

# Lint & format
pnpm lint:fix
pnpm format:fix
```

---

## ✅ Checks

### Unit tests

```bash
pnpm test
```

Runs component unit and snapshot tests via [rstest](https://rstest.rs/) (vitest-compatible API). Coverage thresholds: 90% lines / functions.

### Playwright (interactive & visual)

```bash
pnpm pw:docker        # run in Docker (matches CI environment)
pnpm pw:docker:update # update visual snapshots
```

Interactive and visual regression tests run via [Playwright](https://playwright.dev/) inside a Docker container. Snapshots are Linux-specific and must be updated inside Docker to stay consistent with CI.

### Linting

```bash
pnpm lint             # ESLint
pnpm lint:scss        # Stylelint (SCSS files)
pnpm format           # Prettier (check only)
```

### Circular dependencies

```bash
pnpm check-circular-dependency
```

Detects circular imports across all TypeScript source files using [dpdm](https://github.com/acrazing/dpdm). Exits with code 1 if any cycle is found.

### Dead code

```bash
pnpm knip
```

Finds unused exports, files, and dependencies with [Knip](https://knip.dev/).

### TypeScript coverage

```bash
pnpm coverage:ts
```

Measures the percentage of typed values in the codebase using [type-coverage](https://github.com/plantain-00/type-coverage).

### LLM context bundle

```bash
pnpm llms:check   # validate (runs in pre-commit)
pnpm llms:gen     # regenerate llms.txt + every module's llms.md
```

Every component, provider, hook, util, and styles module has a generated `llms.md` (props/signature/variables). `llms.txt` at the repo root indexes them all by category — the entry point for an LLM agent to load context for the whole kit. The check fails if any file is out of date.

---

## 📄 License

ISC © [Emingy](https://github.com/emingy)
