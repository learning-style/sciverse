# Copilot Instructions (Repository)

## Purpose
Use this file as persistent project memory for Sciverse implementation patterns, especially when adding or updating lesson labs.


## Current Curriculum Scope
- Sciverse currently spans Big Ideas 1-55 (Level 1 planned; 1-25 canonical, 26-55 expansion).
- Big Ideas 21–25 are canonical and must not be replaced or renumbered in future expansions. Always preserve their vetted topics and lesson titles.
- The full, up-to-date Big Ideas 1–55 table is maintained in `src/Artifacts/A11-Sciverse-Level1-BigIdeas-16-55.md` (includes all lesson seeds).
- Expected counts: 165 lessons (55 x Physics/Chemistry/Biology) and 55 assessments at full Level 1 buildout.

## Persistent Project Memory & Context Amnesia
- This file is the authoritative memory for curriculum structure, lesson/lab conventions, and expansion process. Any new Big Idea, lesson, or process pattern must be recorded here to prevent context loss.
- When adding or updating Big Ideas, always update both this file and `A11-Sciverse-Level1-BigIdeas-16-55.md` in the same commit.


## Approved Curriculum Progression Strategy
- Level 1 (Grades 3-8): broad-first coverage across 50 Big Ideas.
- Level 2 (Grades 9-12): deeper lessons for the same 50 Big Ideas.
- Level 3 (Advanced): further depth and synthesis on the same 50 Big Ideas.
- Big Ideas 16-55 catalog for Level 1 is maintained in:
   - `src/Artifacts/A11-Sciverse-Level1-BigIdeas-16-55.md`

## Stack and Core Commands
- Stack: Vite + React + TypeScript.
- Validate TypeScript: `npx tsc --noEmit`.
- Run dev server: `npm run dev`.
- Build production: `npm run build`.

## Sciverse Architecture Conventions
- Lesson route shell: `src/features/sciverse/modules/LessonShell.tsx`.
- Lesson metadata/script registry: `src/features/sciverse/content/lessons/index.ts`.
- Lab components: `src/features/sciverse/components/visuals/*Lab.tsx`.
- Visual labs receive `state` and optionally `onStateChange`.
- Script-driven updates come from dialog `SET_VISUAL` actions and are merged into `visualState`.

## Interactive Lab Pattern (Use This)
When adding interactive controls to a visual lab:

1. Accept `onStateChange` and keep it optional.
2. Add a small helper:
   - `const setStateValue = (key, value) => onStateChange?.(key, value);`
3. Do not let guidance overlays cover canvas content.
   - Guided walkthrough UI belongs in `LessonShell` as a docked panel, not on-canvas.
4. Keep control overlays optional and non-blocking.
   - `LessonShell` now provides a global `Controls: On/Off` switch.
   - Default expectation is unobstructed visual content when controls are off.
5. Enforce contrast explicitly.
   - Use solid control panel backgrounds (`bg-white`) and dark text in light panels.
   - Do not rely on translucent backgrounds over dynamic canvases for readability.
6. Ensure controls update only visual keys and do not mutate script data.
7. Keep controls low-risk:
   - `select` for phase/scenario
   - `checkbox` for booleans
   - `range` for numeric knobs
8. Preserve script compatibility:
   - Manual controls must not break `SET_VISUAL` transitions.

## LessonShell UI Contract
- `LessonShell` owns cross-lesson walkthrough guidance (`getWalkthroughGuide` + `LessonWalkthroughCard`).
- Walkthrough must be rendered in layout flow above the visual panel (not absolutely positioned over canvas).
- Visual host uses `sciverse-visual-host` + `controls-hidden|controls-visible` classes.
- CSS rule in `LessonShell` hides overlays tagged with `data-lab-controls="true"` when controls are off.


## Expansion Checklist (Critical)
When adding a new Big Idea or lesson set, update all of the following in one cycle (and always update this file and A11):

1. `src/features/sciverse/content/lessons/index.ts`
   - Add script imports.
   - Add `LESSON_SCRIPTS` map entries.
   - Add `LESSON_REGISTRY` metadata entries with cross-links.
2. `src/features/sciverse/modules/LessonShell.tsx`
   - Add visual component imports.
   - Add lesson rendering switch branches.
   - Update `LESSONS_WITH_NATIVE_CONTROLS` if the labs include custom controls.
3. `src/features/sciverse/modules/LessonHub.tsx`
   - Update Big Idea range list.
   - Update lesson count label and hero copy.
   - Ensure color list length matches Big Idea count.
4. `src/features/sciverse/content/assessments/index.ts`
   - Register new `bigIdeaNAssessment` files in imports and map.
5. Add missing content files:
   - lesson scripts under `content/lessons/`
   - assessment files under `content/assessments/`
   - visual labs under `components/visuals/`

If any item above is skipped, routing or lesson discovery will silently degrade.

## Large Expansion Execution Rule
- For large curriculum additions (e.g., +40 Big Ideas), implement in stable batches of 5 Big Ideas (15 lessons) per cycle.
- For each batch, complete full wiring + assessment + TypeScript validation before starting the next batch.

## Lab Control Attribute Contract
- Any in-lab control panel MUST include `data-lab-controls="true"` on its root control container.
- This is required for global show/hide control toggling to work consistently.
- Do not depend on positional classes (`bottom-*`, `top-*`) for toggle behavior.

## Big Idea 10 Interactive Coverage
- `P10EnergyLab`: scenario selector + pollution/night/calm/reveal toggles.
- `C10PollutionLab`: scenario selector + checkpoint correctness toggle.
- `B10EcosystemsLab`: scenario selector + checkpoint correctness toggle.

## Assessment UI Rule
- Choice text should not include explanatory suffixes in option labels.
- In `AssessmentShell`, render formatted choice labels that strip trailing explanation after dash separators.

## Process Guardrails for Future Cycles
- Before adding new lesson content, verify whether a matching lab exists and can be made interactive.
- If you touch lessons or labs, update `src/Artifacts/A6-Development-and-Testing-Guide.md` with QA notes.
- If architecture/process expectations change, update this file in the same cycle.
- Prefer additive changes and avoid rewriting entire lesson scripts unless required.
- When fixing overlap bugs, prefer shell-level layout contracts first, then per-lab adjustments only when needed.
- After any curriculum expansion, always run `npx tsc --noEmit` and verify:
   - every new lesson route loads,
   - controls toggle works,
   - each Big Idea assessment route resolves.
