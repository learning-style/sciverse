# Artifact A3: Implementation Roadmap
# Date Created: C0
# Author: AI Model & Curator
# Updated on: C7 (Add Socratic Lesson Step)

- **Key/Value for A0:**
- **Description:** A step-by-step roadmap for implementing the portfolio.
- **Tags:** documentation, roadmap, planning, cycle 0, cycle 1, cycle 2, cycle 4, cycle 6, cycle 7

## 1. Overview & Goal

This document provides a clear, step-by-step roadmap for the implementation of the **Citizen Architect Portfolio**. The goal is to build the application incrementally, ensuring a stable foundation at each stage.

## 2. Implementation Steps

### Step 1: Foundational Setup & Theme (Completed C1)

-   **Goal:** Initialize the project and establish the visual language.
-   **Outcome:** A navigating skeleton of the website with the correct styling foundation. (Completed)

### Step 2: Content Pages & Showcase Data (Completed C2)

-   **Goal:** Implement the informational sections and the project data layer.
-   **Outcome:** The portfolio is data-driven and ready to host the new app. (Completed)

### Step 3: Sciverse - Phase 1: Kinematics Engine (Active C7)

*Refined based on Artifact A9 and A10.*

-   **Goal:** Establish the Matter.js physics core, SSAL, and testing infrastructure.
-   **Tasks:**
    1.  **Physics Core:** Install `matter-js` and create the `PhysicsEngine` component. (Completed)
    2.  **SSAL:** Implement the `SimState` hook. (Completed)
    3.  **Visualization:** Build the `VectorOverlay` and Graphing components. (Completed)
    4.  **Lesson 1:** Build the **"Kinematics Socratic Lesson"** (Interactive Concept Explainer). (Active)
    5.  **Lab 1:** Build "The Projectile Cannon" (Sandbox Lab). (Pending Integration)
-   **Outcome:** A functioning physics playground with a guided lesson module.

### Step 4: Sciverse - Phase 2: Dynamics & Dialog (Upcoming)

-   **Goal:** Implement the "Forces & Motion" module with the Socratic Guide.
-   **Tasks:**
    1.  **Interactors:** Create UI controls for Mass, Applied Force, and Friction.
    2.  **Dialog Engine:** Enhance the engine for non-linear branching.
    3.  **Integration:** Connect Dialog Engine to SSAL triggers.
    4.  **Content:** Port the "Forces & Motion" script (A8) into the system.
-   **Outcome:** The MVP "Module 01" is complete and playable.

### Step 5: Contact & Polish

-   **Goal:** Finalize the user journey and prepare for launch.
-   **Tasks:**
    1.  **Contact Page:** Implement links and/or a functional form.
    2.  **Animations:** Add subtle hover effects and page transitions.
    3.  **Review:** Check for broken links, spelling errors, and visual bugs.
-   **Outcome:** A complete, professional portfolio ready for deployment.