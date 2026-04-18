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

To run the current test command:
```bash
npm run test
```

To run TypeScript validation (recommended for every cycle touching Sciverse):
```bash
npx tsc --noEmit
```

## 5. Interactive Lab QA Checklist

When working on lesson visuals, use this checklist before closing a cycle:

1. Open the lesson route and verify the canvas renders on desktop and mobile widths.
2. Confirm lesson-script driven `SET_VISUAL` transitions still change the visual state.
3. If the lab has user controls, confirm each control updates the visual immediately.
4. Confirm no guidance or control UI blocks core lesson visuals, graph labels, or scales.
5. Run `npx tsc --noEmit` before commit/merge.

## 6. Overlay and Readability Policy

To prevent hidden content and ensure accessibility across lessons:

1. Guided walkthrough content is docked in `LessonShell` (non-overlay) and must not sit on top of canvas visuals.
2. On-canvas control overlays are user-toggleable from the lesson top bar (`Controls: On/Off`).
3. Default lesson mode should prioritize unobstructed visuals (`Controls: Off`).
4. Control panels must use high-contrast styling (solid `bg-white` + dark text in light panels).
5. Any new overlay must be tested at common desktop sizes to confirm labels/scales are fully visible.

## 7. Big Idea 10 Interactive Controls (Added C?)

The following labs now support direct learner controls in the visual panel:

- `P10EnergyLab` (`p10`): scenario selector + toggles (`showPollution`, `showNight`, `showCalm`, `reveal` hydro)
- `C10PollutionLab` (`c10`): pollution scenario selector + checkpoint correctness toggle
- `B10EcosystemsLab` (`b10`): ecosystem scenario selector + checkpoint correctness toggle

These controls are intentionally lightweight overlays so they complement, not replace, script-based lesson flow.

## 8. Route Compatibility Notes (Added C?)

Sciverse now uses the lesson hub as the primary entry route:

- `/projects/science-lab` -> `LessonHub`

Backward-compatible aliases were added to reduce breakage from older links:

- `/projects/sciverse` -> `LessonHub`
- `/projects/science-lab/kinematics` -> `ScienceLab`
- `/projects/science-lab/lab` -> `ScienceLab`
- `/projects/science-lab/classic` -> `ScienceLab`

When changing route behavior in future cycles, keep legacy aliases for at least one release cycle unless a hard deprecation is intentional.

## 9. CI Deploy Safety Notes (Added C?)

The deploy workflow in `.github/workflows/deploy.yml` is hardened to avoid noisy failures:

1. Preview deploys are skipped for PRs from forks.
2. Preview/production deploy steps run only when all required Vercel secrets are present:
	- `VERCEL_TOKEN`
	- `VERCEL_ORG_ID`
	- `VERCEL_PROJECT_ID`

This keeps type-check/build/test signals valid even when deploy credentials are unavailable.
