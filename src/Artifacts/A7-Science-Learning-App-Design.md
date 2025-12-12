# Artifact A7: Science Learning App Design - "The Inquiry Engine"
# Date Created: C2
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Design and architecture for the science learning environment project.
- **Tags:** documentation, design, science-app, cycle 2

## 1. Project Overview

**Project Name:** The Inquiry Engine
**Concept:** A gamified, interactive science learning environment that moves beyond rote memorization. It focuses on **directional thinking**—guiding the learner from observation to hypothesis to conclusion using a digital Socratic method.

## 2. Educational Mechanics (Ways to "Prompt Directional Thinking")

To address your goal of prompting directional thinking, we will implement the following mechanics:

### Mechanic A: The Socratic Branching Logic
Instead of a simple "Correct/Incorrect" feedback loop, the app uses a decision tree.
-   **Scenario:** A plant is wilting.
-   **User Action:** User selects "Add more water."
-   **System Response:** (If incorrect) "The soil is already damp. If the roots are wet but the leaves are dry, what part of the plant might be blocked?"
-   **Directional Gain:** Forces the user to trace the path of water transport (Xylem) rather than guessing inputs.

### Mechanic B: Predict-Observe-Explain (POE)
This is a classic science education model adapted for the web.
1.  **Predict:** The user adjusts sliders on a simulation (e.g., "Gravity: 2x") and predicts the trajectory of a ball.
2.  **Observe:** The user hits "Run Experiment". The simulation plays out.
3.  **Explain:** The user must select the principle that explains the difference between their prediction and the observation.

### Mechanic C: Concept Mapping (The "Knowledge Node" System)
Users build the logic themselves.
-   **Interface:** A canvas with drifting nodes (terms like "Photosynthesis", "Sunlight", "Glucose").
-   **Action:** User connects nodes with directional arrows.
-   **Validation:** The system validates the *relationship* (e.g., "Sunlight" -> [provides energy for] -> "Photosynthesis").

## 3. Selected MVP Feature: "The Cell Lab"

For the initial build, we will focus on **Mechanic A (Socratic Logic)** within a **Cell Biology** context.

-   **Goal:** Diagnose why a virtual cell is failing to produce energy.
-   **Environment:** A dark-mode dashboard representing a microscope view and a data hud.
-   **Interaction:**
    1.  **Alert:** "Energy levels dropping."
    2.  **Inquiry:** User clicks on organelles to inspect.
    3.  **Dialogue:** "Mitochondria inspection: Structure looks folded, but raw materials are missing."
    4.  **Decision:** User must direct "Glucose" or "Oxygen" to the organelle.

## 4. Technical Architecture

### State Management (The Game Loop)
We will use a finite state machine (using `useReducer` or similar) to manage the learning flow.

```typescript
type GameState = 'OBSERVING' | 'HYPOTHESIZING' | 'EXPERIMENTING' | 'ANALYZING' | 'COMPLETE';
```

### Data Structure (The Scenario)
Scenarios will be defined as JSON objects to allow easy creation of new "levels".

```typescript
interface Scenario {
    id: string;
    title: string;
    initialState: string; // Description of the problem
    nodes: {
        id: string;
        prompt: string;
        options: {
            label: string;
            nextNodeId: string;
            feedback: string; // The "directional thinking" hint
        }[];
    }[];
}
```

## 5. UI/UX Design

-   **Aesthetic:** "Futuristic Lab Interface." Dark slate backgrounds, neon blue/green accents (Tailwind `cyan-500`, `emerald-500`).
-   **Layout:**
    -   **Left Panel:** Visual simulation / Image.
    -   **Right Panel:** The "Inquiry Terminal" (Chat/Prompt interface).
    -   **Bottom Bar:** Inventory/Tools.