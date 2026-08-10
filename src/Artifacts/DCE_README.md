# Artifact A72: DCE - README for Artifacts
# Date Created: C72
# Author: AI Model & Curator
# Updated on: 1.8.0 C8 (Agentic-era rewrite — Activate Agent, harnesses, Ascentia Cloud)
# Status: 🟢 ACTIVE — still the literal source prompt.service.ts writes as DCE_README.md for every new project's onboarding. Reviewed in A412 Sweep 1 (C89, 2026-07-18).

- **Key/Value for A0:**
- **Description:** The content for the `DCE_README.md` file that is automatically created in a new project's `src/Artifacts` directory, explaining the purpose of the extension and the artifact-driven workflow.
- **Tags:** documentation, onboarding, readme, source of truth

# Welcome!

You have successfully initialized the **Data Curation Environment (DCE)**.

This folder (`src/Artifacts`) is the "long-term memory" for your project. The files here are **Artifacts** — living documents that define your project's vision, architecture, and plans. Your agent reads them every cycle and updates them as the project evolves; they are the source of truth the code follows.

## How the DCE works

Work happens in **cycles**. Each cycle you write what you want in the **Cycle Context**, click **Activate Agent**, and the DCE:

1. **Baselines** — commits the previous cycle's surviving work so the new cycle's changes are reviewable as clean git colors.
2. **Generates `agent.md`** — the full cycle context (history, project scope, your selected files) for your agent to read top-down.
3. **Activates your harness** — hands the cycle to the agent you picked with the plug button (see below).
4. **Ingests the response** — when the agent finishes, its structured summary appears in the cycle's response tab automatically.

You review the uncommitted changes (the git colors ARE the review UI), then write the next cycle.

## Next Steps

### 1. Review the Generated Artifacts
The agent generated a set of starter artifacts for you (e.g., `A1. Project Vision`, `A3. Technical Scaffolding`). Open them to see the plan — and edit them; they steer every future cycle.

### 2. Pick your Agent Harness (the plug button 🔌)
In the **DCE Parallel Co-Pilot** panel header:
*   **Claude Code** — Activate Agent opens a Claude Code tab pre-filled with the bootstrap; you press Enter. Model/thinking stay your choice.
*   **Hermes (embedded)** — runs inside the DCE's Cognitive Commons. Choose your connection:
    *   **Ascentia Cloud (managed)** — free tier; the DCE services the best model currently available. Sign in with GitHub in DCE Settings once — your key is fetched automatically.
    *   **Custom Endpoint** — point at your own OpenAI-compatible URL (vLLM, LM Studio, Ollama). The model is chosen automatically from what your endpoint serves.
*   **Clipboard** — copies the bootstrap for any other harness (Cursor, Codex, a terminal).

### 3. Run Cycle 1
You are now in **Cycle 1**. Describe what you want in the Cycle Context and click **Activate Agent (Cycle 1)**. Watch the agent work — Hermes streams into the Cognitive Commons Local panel; Claude Code runs in its own tab.

### 4. Git Repository Initialized
The DCE initialized a git repository and created a feature branch from your project scope (e.g., `feat/my-project-scope`).
*   **Action:** Click **"Publish to GitHub"** in the Onboarding view (optional) to publish the branch.

### 5. The "Baseline" Workflow
After a cycle completes, the changed files sit **uncommitted** for your review:
1.  **Review** the diffs (colored files in the tree; the diff viewer shows exactly what changed).
2.  **Test** the result.
3.  Start the next cycle — the DCE baselines (commits) the surviving work automatically at Activate-click. If something broke, **Restore Baseline** reverts to the last good state.

Happy Curating!
