# Artifact A3: Implementation Roadmap
# Date Created: C0
# Author: AI Model & Curator
# Updated on: C15 (Pivot Lesson 1 to Text-First Socratic Flow)

- **Key/Value for A0:**
- **Description:** A step-by-step roadmap for implementing the portfolio.
- **Tags:** documentation, roadmap, planning, cycle 15

## 1. Overview & Goal

This document provides a clear, step-by-step roadmap for the implementation of the **Citizen Architect Portfolio**. The goal is to build the application incrementally, ensuring a stable foundation at each stage.

## 2. Implementation Steps

### Step 1: Foundational Setup & Theme (Completed C1)

-   **Outcome:** A navigating skeleton of the website with the correct styling foundation.

### Step 2: Content Pages & Showcase Data (Completed C2)

-   **Outcome:** The portfolio is data-driven and ready to host the new app.

### Step 3: Sciverse - Phase 1: Kinematics Engine (Active C7-C15)

*Refined based on User Feedback regarding visual sync issues.*

-   **Goal:** Establish the Matter.js physics core while ensuring the educational content is resilient to visual rendering bugs.
-   **Tasks:**
    1.  **Physics Core:** Install `matter-js` and create the `PhysicsEngine` component. (Completed)
    2.  **SSAL:** Implement the `SimState` hook. (Completed)
    3.  **Visualization:** Build the `VectorOverlay` and Graphing components. (Completed)
    4.  **Lesson 1 (Stabilization):** Pivot the **"Kinematics Socratic Lesson"** to a text-driven flow. Remove tight coupling between dialogue nodes and physics markers to ensure a smooth learning experience. (Active C15)
    5.  **Interactive Debugging:** Address the "Blank White Screen" and race conditions between React mount and Matter.js init in isolation from the curriculum. (Pending)
-   **Outcome:** A stable, playable Socratic lesson that introduces motion concepts reliably.

### Step 4: Sciverse - Phase 2: Dynamics & Dialog (Upcoming)

-   **Goal:** Implement the "Forces & Motion" module.
-   **Tasks:**
    1.  **Interactors:** Create UI controls for Mass, Applied Force, and Friction.
    2.  **Dialog Engine:** Refine the engine to support both purely conceptual and simulator-active nodes.
    3.  **Integration:** Use the "Lab" mode for experimentation and "Lesson" mode for guided conceptual work.
-   **Outcome:** The MVP "Module 01" is complete and playable.

### Step 5: Contact & Polish