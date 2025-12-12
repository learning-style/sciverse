# Artifact A6: Development and Testing Guide
# Date Created: C0
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Standard procedure for running, debugging, and testing the application.
- **Tags:** documentation, testing, workflow, cycle 0

## 1. Purpose

This guide documents how to run and test the **Citizen Architect Portfolio** locally.

## 2. Development Workflow

### Start the Server
```bash
npm run dev
```
This starts the Vite development server. It is extremely fast and supports Hot Module Replacement (HMR). Changes to files will be reflected in the browser almost instantly.

### Build for Production
To test a production-like build locally:
```bash
npm run build
npm run preview
```
This compiles the TypeScript and assets into the `dist/` folder and starts a local server to preview that static build.

## 3. Debugging

### Browser Console
-   Use `console.log` in your React components to trace data.
-   React Developer Tools (Browser Extension) is highly recommended for inspecting the component tree and state.

### VS Code Debugging
-   You can debug directly in VS Code by setting breakpoints in the source files if you configure a `.vscode/launch.json` for Chrome/Edge debugging.

## 4. Testing

(Note: Initial setup may not include a comprehensive test suite, but as the project grows, Vitest or Jest can be added.)

To run tests (if configured):
```bash
npm run test