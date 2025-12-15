# Artifact A9: Sciverse Curriculum & Technical Roadmap
# Date Created: C4
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A comprehensive roadmap mapping AP Physics 1 standards to Sciverse technical implementation phases.
- **Tags:** documentation, roadmap, curriculum, physics, sciverse

## 1. Overview & Pedagogical Strategy

This document outlines the curriculum roadmap for **Sciverse**, ensuring alignment with **AP Physics 1 / NGSS standards**. The pedagogical approach is **Adaptive Experiential Learning (AEL)**, utilizing a "Predict-Observe-Explain" cycle driven by a Socratic Dialog Engine.

### Core Philosophy
1.  **Visual First:** Concepts (Vectors, Graphs) must be visually represented in real-time.
2.  **Inquiry Driven:** Students manipulate variables to discover laws, rather than verifying them.
3.  **Misconception Targeted:** Specific labs are designed to trigger and correct common misconceptions (e.g., "Force is needed to sustain motion").

## 2. Curriculum Modules & Phased Implementation

The curriculum is divided into three sequential modules. Implementation will follow this sequence to build technical complexity incrementally.

### Phase 1: Kinematics (The Language of Motion)
**Goal:** Establish the simulation engine, vector visualization, and graphing capabilities.

*   **Topic 1.1: 1D Motion & Graphing**
    *   **Concept:** Position ($x$), Velocity ($v$), Acceleration ($a$).
    *   **Lab:** "The Graph Matcher". User controls a car to match a target $v-t$ graph.
    *   **Tech Requirement:** Real-time charting ($x(t), v(t)$), Matter.js bodies constrained to 1 axis.
    
*   **Topic 1.2: 2D Motion & Vectors**
    *   **Concept:** Vector decomposition, independence of $x$ and $y$ axes.
    *   **Lab:** "The Projectile Cannon".
    *   **Learning Obj:** Adjust angle/velocity to hit a target. Observe that $v_x$ is constant while $v_y$ changes due to gravity.
    *   **Tech Requirement:** Vector overlays (arrows showing components), Trail rendering.

### Phase 2: Dynamics (The Cause of Motion)
**Goal:** Implement Force interactions, Friction models, and Free Body Diagrams (FBD).

*   **Topic 2.1: Newton's Second Law ($F=ma$)**
    *   **Concept:** Net Force, Mass, Inertia.
    *   **Lab:** "The Sliding Crate" (Module 01 MVP).
    *   **Learning Obj:** Discover that $a \propto F$ and $a \propto 1/m$.
    *   **Tech Requirement:** Variable mass, clickable forces, real-time FBD overlay.

*   **Topic 2.2: Friction ($\mu_s$ vs $\mu_k$)**
    *   **Concept:** Static vs. Kinetic friction thresholds.
    *   **Lab:** "The Sticky Floor".
    *   **Learning Obj:** Observe that $F_{applied}$ must exceed $\mu_s N$ to start motion, then drops to $\mu_k N$.
    *   **Tech Requirement:** Custom friction logic in Matter.js loop (Matter.js default friction is simplified; may need custom constraint).

### Phase 3: Conservation Laws (System Rules)
**Goal:** Implement multi-body interactions and global system state tracking.

*   **Topic 3.1: Linear Momentum & Collisions**
    *   **Concept:** Conservation of Momentum ($p$), Elasticity ($e$).
    *   **Lab:** "Collision Carts".
    *   **Learning Obj:** Verify $\Sigma p_i = \Sigma p_f$ in elastic and inelastic collisions.
    *   **Tech Requirement:** Multi-body collision handling, restitution control ($e=0$ to $1$).

## 3. Technical Deliverables Timeline

| Phase | Technical Feature | Pedagogical Deliverable |
| :--- | :--- | :--- |
| **P1** | **Matter.js Integration**<br>SimState Abstraction Layer (SSAL)<br>Vector Arrow Components<br>Real-time Graphing | **Kinematics Lab**<br>Interactive Graphing Activity |
| **P2** | **Force Interactors**<br>Click-and-drag force application<br>Free Body Diagram (FBD) Overlay<br>Friction State Logic | **Dynamics Lab**<br>Force & Motion Dialog Script |
| **P3** | **Global State Tracking**<br>System-wide Energy/Momentum calculation<br>Restitution (Bounciness) Sliders | **Collision Lab**<br>Momentum Conservation Dialog |

## 4. Assessment Strategy (The Socratic Engine)

The **Dialog Engine** will act as the "Verification Layer". It does not simply check if an answer is "Correct".

1.  **Input:** User answers a multiple-choice question OR alters the simulation state (e.g., "Set friction to 0").
2.  **Context:** The engine reads the `SSAL` (e.g., `SimState.current.friction`).
3.  **Response:**
    *   *If Correct:* "Excellent. You observed the velocity remained constant." -> Unlocks next tool.
    *   *If Incorrect:* "Not quite. Look at the Velocity Graph. Is the slope changing?" -> Highlights the graph.