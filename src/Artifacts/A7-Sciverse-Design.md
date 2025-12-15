# Artifact A7: Sciverse Design - Physics Dialog Series
# Date Created: C3
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Design and architecture for "Sciverse", a Socratic dialog-based science learning environment.
- **Tags:** documentation, design, sciverse, physics, cycle 3

## 1. Project Overview

**Project Name:** Sciverse
**Concept:** A "Scientific Metaverse" of micro-learning modules. Sciverse moves beyond static text or video lectures by using a **Socratic Dialog Engine**. The system acts as a tutor (inspired by Khanmigo), guiding the user through physics concepts using questions, predictions, and interactive experiments.

**Core Philosophy:** "Don't tell me the answer; help me find it."

## 2. The Learning Experience (User Journey)

### Phase 1: The Hook (Context)
The user enters a specific "Universe" (Module), e.g., **Newton's Playground**.
-   **Visual:** A car sitting on a flat track.
-   **Dialog:** "Welcome to the lab. Look at this car. If I give it a quick push and let go, what will happen to its speed as it rolls along this frictionless track?"

### Phase 2: The Prediction (Hypothesis)
The user must commit to an answer before seeing the result.
-   **Interaction:** User selects from options:
    A) It will slow down.
    B) It will speed up.
    C) It will stay the same speed.
-   **Socratic Response (if wrong):** If user picks A: "Interesting intuition. usually, things do slow down. But what usually causes things to slow down in the real world?" -> (Friction). "Exactly. But this track is *frictionless*."

### Phase 3: The Experiment (Validation)
The dialog unlocks a simulation control.
-   **Action:** "Go ahead. Push the 'Apply Force' button and watch the velocity graph."
-   **Observation:** The car moves at a constant speed. The graph is a flat horizontal line.

### Phase 4: The Synthesis (Conclusion)
The system asks the user to formulate the rule.
-   **Dialog:** "So, if no forces are acting on it (friction or push), what does the motion do?"
-   **User Input:** "It stays constant."
-   **System:** "Precisely. This is Newton's First Law."

## 3. Technical Architecture

### 3.1. The Layout
The screen is split into two primary panes (mobile-responsive):
1.  **The "Lab Bench" (Left/Top):** The visual simulation area. Contains the canvas/SVG elements and interactive controls (sliders, buttons).
2.  **The "Comms Link" (Right/Bottom):** The chat interface. Displays the history of the conversation and the current input options.

### 3.2. The Dialog Engine (Data Structure)
The conversation is a directed graph.

```typescript
// See src/features/sciverse/types.ts for full implementation
interface DialogNode {
    id: string;
    speaker: 'AI' | 'User';
    content: string; // The text to display
    options?: DialogOption[]; // If it's a question
    action?: string; // Trigger a simulation event (e.g., 'START_SIMULATION')
}
```

### 3.3. The Physics Engine
For "Newton's Playground", we need a simple 1D kinematic engine.
-   **State:** `position (x)`, `velocity (v)`, `acceleration (a)`, `time (t)`.
-   **Loop:** A standard `useAnimationFrame` loop updating state based on $\Delta t$.
-   **Interactivity:** User inputs modify `a` (Force) or `v` (Initial Push).

## 4. Content Syllabus: Module 1 - Newton's Playground

### Topic 1.1: Inertia (The Hovercraft)
-   **Scenario:** A hovercraft on ice.
-   **Goal:** Understand that $F_{net} = 0 \implies \Delta v = 0$.
-   **Activity:** Try to make the hovercraft stop without using brakes (impossible on infinite ice).

### Topic 1.2: Acceleration (The Rocket Car)
-   **Scenario:** A car with a rocket booster.
-   **Goal:** Understand that Constant Force $\implies$ Constant Acceleration $\neq$ Constant Velocity.
-   **Activity:** User controls the throttle. They must reach a target distance and stop. (Teaches that you must decelerate to stop).

## 5. Visual Identity
-   **Theme:** "Hard Sci-Fi Interface".
-   **Colors:** Deep Space Blue (`slate-950`), Holographic Cyan (`cyan-400`), Warning Orange (`orange-500`).
-   **Typography:** Monospace headers (data), Sans-serif body (dialog).