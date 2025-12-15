# Artifact A7: Sciverse Design & Architecture
# Date Created: C2
# Author: AI Model & Curator
# Updated on: C4 (Integrate Matter.js and SSAL Architecture)

- **Key/Value for A0:**
- **Description:** Design and architecture for "Sciverse," a Socratic physics learning environment.
- **Tags:** documentation, design, sciverse, physics, architecture, cycle 4

## 1. Project Overview

**Project Name:** Sciverse
**Concept:** An interactive, browser-based physics learning environment aligned with AP Physics 1. It combines high-fidelity simulation with a "Socratic Dialog Engine" that guides students through inquiry-based learning.

**Core Loop:**
1.  **Prompt:** Mentor AI poses a scenario (e.g., "How does mass affect acceleration?").
2.  **Predict:** Student makes a hypothesis.
3.  **Experiment:** Student manipulates the simulation (Sim).
4.  **Observe:** Student analyzes real-time data (Graphs/Vectors).
5.  **Explain:** Student concludes the rule, verified by the Mentor.

## 2. Technical Architecture

The system is composed of three distinct layers: The **Physics Engine**, the **Abstraction Layer**, and the **Dialog Engine**.

### 2.1. Layer 1: The Physics Engine (Matter.js)
We will use **Matter.js** as the core physics kernel. It provides robust 2D rigid body dynamics, collision detection, and constraint solving.
-   **Why Matter.js?** Standardizing on a library ensures accurate handling of collisions and forces, preventing "home-brewed physics" errors that could confuse learners.
-   **Rendering:** We will use a custom React-based renderer (drawing to HTML5 Canvas) to allow for educational overlays (vectors, labels) on top of the Matter.js world.

### 2.2. Layer 2: SimState Abstraction Layer (SSAL)
The SSAL is the critical bridge between the high-frequency physics loop (60fps) and the low-frequency UI/Dialog logic.

**Responsibility:**
1.  **Extraction:** Runs every frame to extract `position`, `velocity`, `force` from Matter.js bodies.
2.  **Normalization:** Converts engine units to "Educational Units" (e.g., pixels to meters).
3.  **Exposure:** Provides a stable `useSimState()` hook for React components (UI overlays, graphs).
4.  **Snapshot:** Generates a JSON payload of the *current state* when requested by the Dialog Engine.

**SSAL Data Structure:**
```typescript
interface SimStateSnapshot {
    timestamp: number;
    objects: {
        id: string;
        mass: number;
        velocity: Vector2D;
        acceleration: Vector2D;
        netForce: Vector2D;
    }[];
    system: {
        totalKineticEnergy: number;
        totalMomentum: Vector2D;
        frictionCoeff: number;
        isPaused: boolean;
    };
}
```

### 2.3. Layer 3: The Dialog Engine (Scripted Socratic Logic)
For the Portfolio MVP, we will implement a **Deterministic Finite Automaton (DFA)** (a Directed Graph of script nodes) that mimics the behavior of an AI tutor.

-   **Why Scripted?** Ensures 100% pedagogical accuracy and allows the project to be hosted statically (no backend required).
-   **AI-Ready:** The architecture is designed such that the "Script Interpreter" can be replaced by an "LLM Client" in the future without changing the UI or Physics layers. The script nodes effectively act as a pre-cached "Chain of Thought".

## 3. User Interface Design

### 3.1. The "Lab Bench" (Simulation View)
-   **Canvas:** The main play area.
-   **Vector Overlay:** A transparent layer rendering arrows for $\vec{v}$ (Green), $\vec{a}$ (Yellow), and $\vec{F}_{net}$ (Red).
-   **Control Panel:** Sliders for Input Variables (Mass, Force, Friction).
-   **Graphing Monitor:** A draggable/minimizable window showing $x-t$ or $v-t$ charts.

### 3.2. The "Comms Link" (Dialog View)
-   A chat interface resembling a messaging app.
-   Displays text, images, and "Choice Chips" for user responses.
-   **Interactivity:** Some choices trigger Simulation Actions (e.g., "Let me run the test" -> Unlocks the 'Play' button).

## 4. Implementation Strategy (Aligned with A9)

1.  **Phase 1 (Kinematics):** Build the Matter.js wrapper and the Vector Overlay system.
2.  **Phase 2 (Dynamics):** Implement the Force interactors and the Friction logic.
3.  **Phase 3 (Content):** Encode the "Forces & Motion" script (A8) into the Dialog Engine format.