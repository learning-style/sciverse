# Artifact A3: Implementation Roadmap
# Date Created: C0
# Author: AI Model & Curator
# Updated on: C2 (Add Science App steps)

- **Key/Value for A0:**
- **Description:** A step-by-step roadmap for implementing the portfolio.
- **Tags:** documentation, roadmap, planning, cycle 0, cycle 1, cycle 2

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

### Step 2: Content Pages & Showcase Data (Active C2)

-   **Goal:** Implement the informational sections and the project data layer.
-   **Tasks:**
    1.  **Home & About:** (Completed C1)
    2.  **Project Data:** Create `projectsData.ts` to store portfolio entries.
    3.  **Project Card:** Refactor the Showcase page to use reusable card components.
    4.  **Routing:** Add a sub-route for the Science App (`/projects/science-lab`).
-   **Outcome:** The portfolio is data-driven and ready to host the new app.

### Step 3: "The Inquiry Engine" (Science App)

-   **Goal:** Build the interactive science learning environment.
-   **Tasks:**
    1.  **Layout:** Create the "Lab Dashboard" layout (sidebar, main view, console).
    2.  **Engine:** Build the State Machine hook to handle Question -> Response -> Branching logic.
    3.  **Content:** Write the JSON scenario for "The Cell Lab".
    4.  **UI:** Implement the visual components for the "Inquiry Terminal".
-   **Outcome:** A fully functional, embedded educational app within the portfolio.

### Step 4: Contact & Polish

-   **Goal:** Finalize the user journey and prepare for launch.
-   **Tasks:**
    1.  **Contact Page:** Implement links and/or a functional form.
    2.  **Animations:** Add subtle hover effects and page transitions.
    3.  **Review:** Check for broken links, spelling errors, and visual bugs.
-   **Outcome:** A complete, professional portfolio ready for deployment.