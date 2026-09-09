# Artifact A8: Sciverse Content Script - Module 01
# Date Created: C3
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** The script and logic flow for Sciverse Module 01: Forces & Motion.
- **Tags:** documentation, content, sciverse, physics, cycle 3

## Module: Forces & Motion
**Scenario:** "The Mystery of the Sliding Crate"

## Phase 1: The Inertia Check

**Context:** A crate sits on a factory floor.
**Simulation:** A simple box. Velocity = 0.

**Node 1 (Start):**
*   **Mentor:** "Welcome to the Lab. We have a standard 10kg shipping crate here. It's sitting perfectly still. Why?"
*   **Options:**
    1.  "Because it's heavy." -> Jump to Node 1A (Misconception)
    2.  "Because no unbalanced forces are acting on it." -> Jump to Node 2 (Correct)
    3.  "Gravity is pulling it down." -> Jump to Node 1B (Partial Truth)

**Node 1A (Correction):**
*   **Mentor:** "Weight matters, but even heavy things can move if pushed. If I were to push it gently, and you pushed back equally hard, would it move?"
*   **Options:**
    1.  "No." -> Jump to Node 2

**Node 2 (Action):**
*   **Mentor:** "Exactly. Forces are balanced. Now, give it a shove. Use the **Force Slider** to apply 50 Newtons."
*   **Action:** Unlock `ForceSlider`.

## Phase 2: Friction & Motion

**Context:** User applies force. The box moves, then stops when force is removed.

**Node 3 (Observation):**
*   **Mentor:** "You saw it move, but then it slowed down and stopped. Newton's First Law says objects in motion stay in motion... unless acted upon by an outside force. What was that force?"
*   **Options:**
    1.  "It ran out of energy." -> Jump to Node 3A (Misconception)
    2.  "Friction." -> Jump to Node 4 (Correct)
    3.  "Air resistance." -> Jump to Node 3B (Minor factor)

**Node 4 (The Reveal):**
*   **Mentor:** "Precisely. Friction acts between the crate and the floor, opposing the motion. Now, let's see if we can reduce that friction."
*   **Action:** Unlock `FrictionSlider`.

## Phase 3: The Prediction (Quiz)

**Context:** User can now control Friction.

**Node 5 (Hypothesis):**
*   **Mentor:** "If you set the Friction to ZERO and give it a push, what will happen?"
*   **Options:**
    1.  "It will eventually stop."
    2.  "It will slide forever at a constant speed." (Correct)
    3.  "It will keep speeding up forever."

**Node 6 (Experiment):**
*   **Mentor:** "Test your hypothesis. Set Friction to 0 and Push."

*(Script continues through Acceleration (F=ma) concepts)*