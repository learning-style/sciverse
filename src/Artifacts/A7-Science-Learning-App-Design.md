# Artifact A7: Sciverse Design & Architecture
# Date Created: C2
# Author: AI Model & Curator
# Updated on: C3 (Rebrand to Sciverse, Focus on Physics Dialogs)

- **Key/Value for A0:**
- **Description:** Design and architecture for "Sciverse," a Socratic physics learning environment.
- **Tags:** documentation, design, sciverse, physics, cycle 3

## 1. Project Overview

**Project Name:** Sciverse
**Concept:** A physics learning environment inspired by the Socratic method. Unlike traditional learning apps that "tell" and then "test," Sciverse "converses" and "experiments."

**Core Loop:**
1.  **Prompt:** The "Mentor" (AI/Script) poses a problem or asks for a prediction.
2.  **Activity:** The user interacts with a simulation (e.g., applies force to a block).
3.  **Observation:** The user observes the outcome (e.g., the block slows down).
4.  **Dialogue:** The Mentor asks "Why?" offering options that guide the user to deduce the physical law (e.g., Friction).

## 2. Educational Mechanics

### Mechanic A: The Socratic Dialog Engine
A chat-based interface where the system plays the role of a curious lab partner or mentor.
-   **Structure:** Directed Graph (Nodes and Edges).
-   **Interaction:** Users select responses from pre-defined options.
-   **Feedback:** Wrong answers lead to "Correction Branches" where the Mentor offers a hint or a counter-example, rather than a red "X".

### Mechanic B: The "Lab Bench" (Simulation)
A visual area where physics concepts come to life.
-   **Tech:** HTML5 Canvas or CSS-based animations for the MVP.
-   **Input:** Sliders (Force, Mass, Friction), Buttons (Push, Reset).
-   **Feedback:** Real-time visual updates (velocity vectors, movement).

### Mechanic C: Integrated Assessment
Quizzes are not separate "tests" but part of the conversation.
-   **Checkpoint:** "So, if we double the mass, what happens to acceleration?"
-   **Reward:** Correctly deducing a concept unlocks the next module or simulation tool.

## 3. MVP Scope: "Module 01 - Forces & Motion"

The initial build will focus on **Newton's Second Law and Friction**.

### The Layout
The screen is split into two primary panes (responsive: stacked on mobile, side-by-side on desktop):
1.  **Left/Top:** The **Simulation Viewport**. Shows the object, vectors, and controls.
2.  **Right/Bottom:** The **Dialog Terminal**. Shows the conversation history and user response options.

## 4. Technical Architecture

### 4.1. Data Models

**The Dialog Node:**
```typescript
interface DialogNode {
    id: string;
    speaker: 'MENTOR' | 'SYSTEM';
    text: string; // The query or statement
    options: {
        text: string; // The user's potential reply
        nextNodeId: string; // Where this reply leads
        action?: string; // Optional: Trigger a simulation event (e.g., 'ENABLE_SLIDER_MASS')
    }[];
}
```

**The Simulation State:**
```typescript
interface SimState {
    isRunning: boolean;
    objects: {
        id: string;
        mass: number;
        velocity: number;
        frictionCoeff: number;
    }[];
    // Flags to unlock UI elements based on dialog progress
    controlsUnlocked: {
        forceSlider: boolean;
        frictionSlider: boolean;
    };
}
```

### 4.2. State Management
We will use a central `SciverseStore` (Context or Zustand) to bridge the two worlds.
-   The **Dialog Engine** reads the `SimState` to validate answers (e.g., "Did the user actually run the experiment?").
-   The **Dialog Engine** dispatches actions to update `SimState` (e.g., "Unlock the Friction Slider").

## 5. Visual Identity
-   **Theme:** "Quantum Dark". Deep slate backgrounds, neon cyan/purple accents.
-   **Typography:** Monospaced fonts for data/dialogue (JetBrains Mono/Fira Code), Sans-serif for headers.
-   **Motion:** Smooth, physics-based transitions.