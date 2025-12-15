# Artifact A3: Implementation Roadmap
# Date Created: C0
# Author: AI Model & Curator
# Updated on: C3 (Align with Sciverse Plan)

- **Key/Value for A0:**
- **Description:** A step-by-step roadmap for implementing the portfolio.
- **Tags:** documentation, roadmap, planning, cycle 0, cycle 1, cycle 2, cycle 3

## 1. Overview & Goal

This document provides a clear, step-by-step roadmap for the implementation of the **Citizen Architect Portfolio**. The goal is to build the application incrementally, ensuring a stable foundation at each stage.

## 2. Implementation Steps

### Step 1: Foundational Setup & Theme (Completed C1)

-   **Goal:** Initialize the project and establish the visual language.
-   **Tasks:**
    1.  **Scaffolding:** Initialize Vite + React + TypeScript project. (Completed)
    2.  **Tailwind Setup:** Configure Tailwind CSS with the specific color palette (Dark Mode focus). (Completed)
    3.  **Routing:** Set up React Router with placeholders for Home, About, Showcase, and Contact. (Completed)
    4.  **Layout:** Create the global `Layout` component containing the Navigation Bar and Footer. (Completed)
-   **Outcome:** A navigating skeleton of the website with the correct styling foundation.

### Step 2: Content Pages & Showcase Data (Completed C2)

-   **Goal:** Implement the informational sections and the project data layer.
-   **Tasks:**
    1.  **Home & About:** (Completed C1)
    2.  **Project Data:** Create `projectsData.ts` to store portfolio entries. (Completed)
    3.  **Project Card:** Refactor the Showcase page to use reusable card components. (Completed)
    4.  **Routing:** Add a sub-route for the Science App (`/projects/science-lab`). (Completed)
-   **Outcome:** The portfolio is data-driven and ready to host the new app.

### Step 3: "Sciverse" (Physics Dialog Series) (Active C3)

-   **Goal:** Build the interactive Socratic physics environment.
-   **Tasks:**
    1.  **Architecture:** Design the `DialogEngine` hook and `SimStore`.
    2.  **Layout:** Implement the Split-Screen layout (Simulation vs. Dialog).
    3.  **Content:** Implement the "Forces & Motion" script (Artifact A8) as a JSON structure.
    4.  **Components:** Build `ChatMessage`, `ChoiceContainer`, and `PhysicsCanvas`.
    5.  **Integration:** Wire the "Push" button in the canvas to trigger the next node in the dialog.
-   **Outcome:** A functional MVP of the Sciverse Physics module.

### Step 4: Contact & Polish

-   **Goal:** Finalize the user journey and prepare for launch.
-   **Tasks:**
    1.  **Contact Page:** Implement links and/or a functional form.
    2.  **Animations:** Add subtle hover effects and page transitions.
    3.  **Review:** Check for broken links, spelling errors, and visual bugs.
-   **Outcome:** A complete, professional portfolio ready for deployment.