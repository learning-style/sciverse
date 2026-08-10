# Artifact A10: Sciverse Cross-Discipline Sprint — 15-Lesson Plan
# Date Created: C16
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A sprint plan for 15 interconnected lessons (5 Physics, 5 Chemistry, 5 Biology) targeting ages 8–12, organized around 5 cross-cutting "Big Ideas."
- **Tags:** documentation, content, sciverse, physics, chemistry, biology, sprint, curriculum, cycle 16

---

## 1. Sprint Philosophy

### 1.1. Target Audience Pivot

The existing Sciverse curriculum (A8, A9) targets AP Physics 1 / high school. This sprint pivots to **ages 8–12** — an audience that learns best through:

- **Concrete, everyday scenarios** (kitchens, playgrounds, their own bodies) — not abstract notation.
- **Cause-and-effect discovery** — "What happens if I change THIS?"
- **Short feedback loops** — see the result within seconds of acting.
- **Language at ~5th-grade reading level** — mentor talks like a curious older friend, not a professor.

### 1.2. Cross-Cutting Structure

Instead of teaching Physics, Chemistry, and Biology as isolated silos, every lesson is anchored to one of **5 Big Ideas** that genuinely span all three disciplines. Each Big Idea produces a **triplet** — one Physics lesson, one Chemistry lesson, one Biology lesson — that share vocabulary, reference each other's simulations, and build a unified mental model.

```
Big Idea ─┬─ Physics Lesson   (P#)
           ├─ Chemistry Lesson (C#)
           └─ Biology Lesson   (B#)
```

### 1.3. Pedagogical Approach (Retained from A7/A9)

Every lesson follows the **Predict → Observe → Explain** cycle driven by the Socratic Dialog Engine. Nodes still use the DFA structure from A7 (DialogNode graph), with three interaction modes:

| Mode | Description | Example |
|:---|:---|:---|
| **Conversational** | Mentor asks, learner picks from options. Wrong answers branch to correction/hint nodes. | "Why do you think the ice melted?" |
| **Sim-Active** | Learner manipulates a slider/toggle and observes the simulation change. | "Drag the Heat slider to 80°C." |
| **Checkpoint** | A prediction question BEFORE the learner runs the experiment. Locks the "Run" button until they commit to a hypothesis. | "Will the ball go faster or slower? Lock in your prediction." |

### 1.4. Misconception-First Design

Each lesson identifies **1–2 target misconceptions** common in the age group. The script is deliberately written to surface these misconceptions early (via tempting wrong-answer options), then guide the learner through the evidence that disproves them. This is the most pedagogically valuable part of each lesson.

---

## 2. The 5 Big Ideas & 15 Lessons

---

### Big Idea 1: "Why Do Things Move?"
**Core Thread:** Forces cause changes in motion — whether it's a crate on a factory floor, molecules in boiling water, or muscles pulling on bones. The same principle (push/pull → movement) appears everywhere.

---

#### P1 — Push, Pull, and Slide
**Scenario:** "The Stubborn Crate" (adapted from A8 for younger audience)
**Sim Objects:** A wooden crate on a warehouse floor.

| Property | Value |
|:---|:---|
| Target Misconception | "Heavy things are harder to move *because* they're heavy" (conflating weight with friction/inertia) |
| Unlockable Controls | Force Slider, Friction Toggle (smooth floor / rough floor) |
| Graph Monitor | Speed vs. Time |

**Phase 1 — The Still Crate**
- **Context:** Crate sits motionless.
- **Mentor:** "This crate weighs 10 kg and it's just sitting there. Why isn't it moving?"
- **Options:**
  1. "Nothing is pushing it." → **Correct path** (Node 2)
  2. "Because it's too heavy to move." → **Misconception branch**: "Hmm, I've seen people push heavy things and they still move. Let me show you something…" → mini-demo of someone pushing a heavy crate successfully → returns to Node 2.
  3. "Gravity holds it down." → **Partial truth branch**: "Gravity *does* pull it down, but the floor pushes back up equally hard. Those forces cancel out. So what's missing to make it slide sideways?" → returns to Node 2.

**Phase 2 — The Push**
- **Action:** Unlock Force Slider (0–100 N).
- **Mentor:** "Try giving it a push. Slide the force up to 50."
- **Checkpoint (before running):** "Predict: when you let go of the push, will the crate keep sliding forever, slow down, or speed up?"
  1. "Keep sliding forever." → Recorded. Run experiment.
  2. "Slow down and stop." → Recorded. Run experiment.
  3. "Speed up." → Recorded. Run experiment.
- **After experiment:** Crate slides, then stops.
- **Mentor:** "It stopped! But you predicted [X]. The reason it stopped is a sneaky force called **friction** — the floor was fighting the slide the whole time."

**Phase 3 — The Frictionless Floor**
- **Action:** Unlock Friction Toggle → set to "Smooth (ice)".
- **Mentor:** "Now push it again on the smooth floor. Watch the Speed graph."
- **Observation:** Crate slides and never stops (constant velocity line on graph).
- **Explain:** "No friction = nothing to slow it down. Objects keep moving until something stops them. That's Newton's First Law — and you just discovered it!"

**Cross-link hint:** "You know what else moves faster when there's less friction? Tiny particles! We'll see that in the Chemistry lab…"

---

#### C1 — Particles on the Move
**Scenario:** "Why Does Hot Chocolate Steam?"
**Sim Objects:** A container of colored particles (dots) representing water molecules, with a thermometer.

| Property | Value |
|:---|:---|
| Target Misconception | "Heat makes things *grow*" (confusing expansion with particles getting bigger) |
| Unlockable Controls | Temperature Slider (0°C – 100°C) |
| Graph Monitor | Average Particle Speed vs. Temperature |

**Phase 1 — Cold and Still**
- **Context:** Particles barely jiggling in a container. Temperature = 10°C.
- **Mentor:** "See these tiny dots? They represent water molecules — way too small to see in real life. Notice how they jiggle a little."
- **Options:**
  1. "Why are they moving at all?" → "Great question! Particles are *always* moving, even in cold water. They just move slowly."
  2. "They seem pretty chill." → "Exactly — cool temperature, slow movement. But what if we heat things up?"

**Phase 2 — Crank the Heat**
- **Action:** Unlock Temperature Slider.
- **Checkpoint:** "If I raise the temperature to 80°C, what do you think happens to the particles?"
  1. "They get bigger." → **Target misconception.** Recorded.
  2. "They move faster." → Recorded.
  3. "They change color." → Recorded.
- **After experiment:** Particles visibly bounce faster and spread apart. Size stays the same.
- **Mentor (if picked "get bigger"):** "Look carefully — are the dots any bigger? Nope! Same size, but they're *zooming* around. When something 'expands' with heat, it's because the particles push each other farther apart by bouncing harder. The particles themselves don't grow."

**Phase 3 — Boiling Point**
- **Mentor:** "Push it to 100°C. Watch what happens at the top of the container."
- **Observation:** Particles at the surface escape upward (evaporation → steam).
- **Explain:** "When particles move fast enough, they break free from the liquid entirely. That's steam! That's why your hot chocolate sends up little wisps of white."

**Cross-link:** "In Physics (P1), friction slowed the crate down. Here, 'friction' between particles is what keeps them stuck together as a liquid. Add enough energy and they break free — just like the crate sliding on ice!"

---

#### B1 — Muscles, Bones, and Levers
**Scenario:** "How Does Your Arm Lift a Backpack?"
**Sim Objects:** A simplified arm — upper arm bone, forearm bone, bicep muscle (elastic band), and a backpack hanging from the hand.

| Property | Value |
|:---|:---|
| Target Misconception | "Muscles push bones" (muscles can only pull/contract) |
| Unlockable Controls | "Flex" button (contracts bicep), Backpack Weight Slider |
| Graph Monitor | Muscle Force vs. Backpack Weight |

**Phase 1 — The Arm at Rest**
- **Context:** Arm is straight, backpack hanging loose.
- **Mentor:** "Here's a model of your arm. The red band? That's your bicep muscle. The gray rods are bones. The elbow is the hinge. How do YOU think the arm lifts the backpack?"
- **Options:**
  1. "The muscle pushes the bone up." → **Misconception branch:** "Try this — press your hand on a table and 'push' your forearm up with just your bicep. Feel that? It's pulling, not pushing! Muscles can ONLY pull."
  2. "The muscle pulls the forearm up." → **Correct.** "Exactly! Muscles can only shorten — pull. They can never push."
  3. "The brain sends a signal." → **True but incomplete:** "Right, the brain tells the muscle to contract. But the *mechanical* action is a PULL."

**Phase 2 — Flex!**
- **Action:** Unlock "Flex" button.
- **Mentor:** "Hit Flex and watch what happens."
- **Observation:** Bicep shortens, forearm rotates up at elbow, backpack rises. Force arrow appears on muscle.
- **Mentor:** "See how the muscle got shorter? It PULLED the forearm bone, which pivoted at the elbow — just like a lever! Your elbow is the fulcrum."

**Phase 3 — Heavy Backpack**
- **Action:** Unlock Backpack Weight Slider (1 kg – 10 kg).
- **Checkpoint:** "If I double the backpack weight, will the muscle need to pull with the same force, double force, or half force?"
- **After experiment:** Graph shows force scales with weight.
- **Explain:** "More weight = more pull needed. This is just like the Physics crate — more mass needs more force. Your body obeys the same rules as that sliding box!"

**Cross-link:** "Force in Physics (P1), energy from heat in Chemistry (C1), and force from muscles here — it's all the same idea: **something has to push or pull to make things move.**"

---

### Big Idea 2: "What Is Everything Made Of?"
**Core Thread:** Everything — rocks, water, air, YOU — is made of tiny building blocks. Physics looks at how those blocks behave; Chemistry at what they are and how they combine; Biology at how they organize into living things.

---

#### P2 — Solid, Liquid, Gas: Same Stuff, Different Rules
**Scenario:** "The Three States Challenge"
**Sim Objects:** A zoom-in container showing particles. Three preset states: ice (tight grid), water (loose cluster), steam (fast & scattered).

| Property | Value |
|:---|:---|
| Target Misconception | "Steam and smoke are the same thing" / "Gas is lighter than liquid because the atoms weigh less" |
| Unlockable Controls | State Toggle (Solid / Liquid / Gas), Squeeze Piston |
| Graph Monitor | Particle Spacing vs. State |

**Phase 1 — The Solid**
- **Context:** Particles in a tight, vibrating grid (solid).
- **Mentor:** "These particles are locked in a pattern. They vibrate but don't wander. What everyday thing behaves like this?"
- **Options:**
  1. "Ice!" → "Yes!"
  2. "A rock." → "Also yes! All solids have particles locked in place."

**Phase 2 — Toggle to Liquid**
- **Action:** Switch to Liquid.
- **Observation:** Same particles, now sliding past each other, filling bottom of container.
- **Mentor:** "Same particles, same size, same weight. But now they slide around. What changed?"
- **Checkpoint:** "Did the particles shrink, grow, or stay the same size?"
  - If "shrink" or "grow" → "Look closely — count the dots. Same number, same size. They just have more ROOM to move."
- **Key insight delivered:** "The particles didn't change. The **energy** changed. More energy → more movement → different state."

**Phase 3 — Gas & the Piston**
- **Action:** Toggle to Gas. Unlock Squeeze Piston.
- **Mentor:** "Particles are zooming everywhere. Now try squeezing the piston."
- **Observation:** Particles compress into smaller space, bounce off walls harder.
- **Explain:** "Gas fills whatever space it's in. Squeeze it and particles hit the walls more often — that's **pressure**. This is how a bike pump works!"

**Cross-link:** "In Chemistry (C2) you'll see what makes each particle different from others. And in Biology (B2), you'll see containers WAY smaller than this one — the cells in your body."

---

#### C2 — Atoms & Molecules: Nature's LEGO
**Scenario:** "Build-a-Molecule Workshop"
**Sim Objects:** Draggable atom circles — Hydrogen (small, white), Oxygen (medium, red), Carbon (medium, black), Nitrogen (medium, blue). Snapping zones show valid bonds.

| Property | Value |
|:---|:---|
| Target Misconception | "Atoms and molecules are the same thing" |
| Unlockable Controls | Atom palette, Bond Snap tool, Break-Apart button |
| Graph Monitor | Molecule info card (name, formula, properties) |

**Phase 1 — Meet the Atoms**
- **Context:** Four atom types floating in the palette.
- **Mentor:** "These are atoms — the smallest building blocks of matter. Think of them as LEGO bricks. A single brick isn't very useful, but connect them…"
- **Options:**
  1. "So molecules are like LEGO builds?" → "Exactly! A molecule is atoms connected together."
  2. "Is everything made of these four?" → "Not just these! There are over 100 types of atoms. But SO much of your world is made from just these four — Hydrogen, Oxygen, Carbon, and Nitrogen."

**Phase 2 — Build Water**
- **Action:** Unlock Atom Palette.
- **Mentor:** "Challenge: build a water molecule. Drag atoms to the workspace."
- **Hint system:** If learner drags 2 Oxygens → "Hmm, that's not water. Water is H₂O — can you figure out what atoms that means?"
- **On success (2 H + 1 O snap together):** Molecule card appears: "Water | H₂O | Liquid at room temperature. Essential for life."
- **Mentor:** "Two hydrogens + one oxygen = water. The SAME atoms in different arrangements make completely different stuff."

**Phase 3 — Build CO₂ vs. O₂**
- **Mentor:** "Now build what you breathe OUT (carbon dioxide) and what you breathe IN (oxygen)."
- **On building O₂:** "Two oxygens bonded. This is what your lungs need."
- **On building CO₂:** "One carbon + two oxygens. This is what your body discards. Same oxygen atoms, different molecule, **completely** different job."
- **Explain:** "The arrangement isn't random — atoms 'prefer' certain partners. Chemistry is the study of who bonds with whom."

**Cross-link:** "In Physics (P2) you saw particles acting differently based on energy. Now you see they're not all the same kind of particle. And in Biology (B2), you'll see how living things build HUGE molecules from these tiny bricks."

---

#### B2 — Cells: The Tiny Factories
**Scenario:** "Zooming Into Your Skin"
**Sim Objects:** An interactive zoom sequence: skin surface → individual cell → organelles inside (nucleus, mitochondria, membrane).

| Property | Value |
|:---|:---|
| Target Misconception | "Cells are like tiny blobs of jelly with nothing inside" |
| Unlockable Controls | Zoom Slider (1x → 1000x → 10,000x), Organelle labels toggle |
| Graph Monitor | Cell Activity meter (energy level) |

**Phase 1 — Zoom In**
- **Context:** A patch of skin shown at normal view.
- **Mentor:** "Your skin looks smooth, right? Let's zoom in. Drag the Zoom slider."
- **At 1000x:** Grid of cells visible.
- **Mentor:** "WHOA. Your skin is made of millions of tiny boxes — **cells**. Each one is alive."
- **Options:**
  1. "They look like bricks!" → "They do! Just like a wall is made of bricks, your body is made of cells. But unlike bricks, these are ALIVE."
  2. "What's inside them?" → jumps to Phase 2.

**Phase 2 — Inside the Cell**
- **Action:** Zoom to 10,000x. Single cell fills viewport.
- **Mentor:** "This is ONE cell. See all that stuff inside? It's not empty jelly."
- **Action:** Unlock Organelle Labels toggle.
- **Observation:** Labels appear — Nucleus ("The Brain"), Mitochondria ("The Power Plant"), Membrane ("The Security Gate").
- **Mentor:** "The Nucleus holds the instructions (DNA). The Mitochondria turns food into energy. The Membrane controls what enters and exits."
- **Checkpoint:** "Which organelle do you think uses the molecules from your lunch to make energy?"
  1. "The Nucleus." → "Close! The Nucleus holds the instructions, but the power conversion happens elsewhere."
  2. "The Mitochondria." → "Yes! The Mitochondria is literally the power plant of the cell."
  3. "The Membrane." → "The Membrane lets the food IN, but doesn't do the conversion."

**Phase 3 — Energy Connection**
- **Mentor:** "Remember the molecules from Chemistry (C2)? Glucose (a sugar molecule, C₆H₁₂O₆) enters the cell. The Mitochondria breaks it apart and releases energy. That's why you need to eat!"
- **Explain:** "Physics (P2) showed you that particles behave differently with different energy. Chemistry (C2) showed you molecules. Now Biology shows you tiny *machines* that run on those molecules."

**Cross-link:** "Atoms → Molecules → Cells. Each level is built from the one below it. That's the most powerful pattern in all of science."

---

### Big Idea 3: "Where Does Energy Come From?"
**Core Thread:** Energy is never created or destroyed — it changes form. A battery powers a light. Food powers a body. Sunlight powers a plant. The SAME energy just keeps transforming.

---

#### P3 — Energy Transformations: The Ramp Experiment
**Scenario:** "The Roller Coaster Ball"
**Sim Objects:** A ball on a configurable ramp/track with height markers.

| Property | Value |
|:---|:---|
| Target Misconception | "Energy gets used up" (confusing dissipation with disappearance) |
| Unlockable Controls | Ramp Height Slider, Friction Toggle, Loop-the-loop Toggle |
| Graph Monitor | Potential Energy (PE) vs. Kinetic Energy (KE) bar chart — live |

**Phase 1 — The High Ramp**
- **Context:** Ball at top of a ramp, motionless.
- **Mentor:** "This ball is sitting at the top of a ramp. It's not moving, but it HAS energy. We call it **Potential Energy** — energy from its height."
- **Options:**
  1. "How can it have energy if it's not moving?" → "Think of it as stored energy, like a stretched rubber band. The height IS the storage. Let it go and watch what happens."
  2. "Let it roll!" → proceed.

**Phase 2 — The Roll**
- **Action:** Release ball (auto or button).
- **Observation:** Ball rolls down. PE bar shrinks, KE bar grows. At bottom, KE is maximum, PE is near zero.
- **Mentor:** "Watch the energy bars! The blue (Potential) is shrinking and the orange (Kinetic — movement energy) is growing. The total stays the same."
- **Checkpoint:** "If I make the ramp taller, will the ball move faster or slower at the bottom?"
  1. "Faster." → **Correct.**
  2. "Same speed." → "Think about it — more height = more stored energy to convert."
  3. "Slower." → "Hmm, if there's MORE energy stored up high, would it have less at the bottom?"

**Phase 3 — Where Did the Energy Go?**
- **Action:** Turn on Friction. Ball doesn't reach the same height on the other side.
- **Mentor:** "Uh oh — the ball didn't make it back to the same height. But we said energy can't disappear. So where did it go?"
- **Options:**
  1. "It got used up." → **Target misconception.** "Energy NEVER gets used up. But it CAN change into a form that's harder to use. Feel the ramp — it's slightly warm! The energy became HEAT."
  2. "Friction turned it into heat." → "You nailed it."
- **Explain:** "Energy transforms. Height → Speed → Heat. It's never destroyed, just changed."

**Cross-link:** "In Chemistry (C3), you'll see energy stored in *chemical bonds* instead of height. In Biology (B3), you'll see how YOUR body is an energy-transformation machine."

---

#### C3 — Chemical Reactions: Energy In, Energy Out
**Scenario:** "The Kitchen Scientist"
**Sim Objects:** Two reaction chambers side by side — one Exothermic (baking soda + vinegar), one Endothermic (cold pack).

| Property | Value |
|:---|:---|
| Target Misconception | "All chemical reactions are explosions / produce heat" |
| Unlockable Controls | "Mix" button for each chamber, Thermometer Readout |
| Graph Monitor | Temperature vs. Time for each chamber |

**Phase 1 — The Fizzy Reaction**
- **Context:** Chamber A has baking soda and vinegar, separated.
- **Mentor:** "One beaker has baking soda, the other has vinegar. What happens when they mix? You've probably done this at home…"
- **Options:**
  1. "It fizzes up!" → "Right! Let's watch the molecules."
  2. "No idea." → "Let's find out. Hit Mix."

**Phase 2 — Mix & Measure**
- **Action:** Hit "Mix" on Chamber A.
- **Observation:** Fizzing animation. Gas bubbles (CO₂) rise. Thermometer drops slightly.
- **Mentor:** "Fizzy! The baking soda (NaHCO₃) and vinegar (acetic acid) rearranged their atoms to make water, a salt, and CO₂ gas — those bubbles! But check the temperature…"
- **Checkpoint:** "The temperature went DOWN. That means the reaction…"
  1. "Released energy." → "Actually, if it released energy, the temperature would go UP. This one ABSORBED energy from the surroundings."
  2. "Absorbed energy." → **Correct.** "Yes! This is called **endothermic** — it sucks heat IN."
  3. "Didn't involve energy." → "Every reaction involves energy. Look at the thermometer change!"

**Phase 3 — The Hot Reaction**
- **Action:** Chamber B: iron + oxygen (rust, but accelerated sim). Hit "Mix."
- **Observation:** Temperature rises. Glow animation.
- **Mentor:** "This one got HOT. It released energy as heat. That's **exothermic** — energy goes OUT."
- **Explain:** "In Physics (P3), energy was stored as height. Here, energy is stored in **chemical bonds**. Breaking and making bonds either absorbs or releases energy. Every campfire and every cold pack is this."

**Cross-link:** "Your body runs exothermic reactions constantly — that's why you're warm! Biology (B3) will show you exactly how."

---

#### B3 — Food Chains: You Are Solar Powered
**Scenario:** "Tracing Your Lunch Back to the Sun"
**Sim Objects:** An interactive food chain: Sun → Grass → Cow → You. Each link is clickable and shows energy flow.

| Property | Value |
|:---|:---|
| Target Misconception | "Plants get food from soil" (confusing water/mineral absorption with energy source) |
| Unlockable Controls | "Trace Energy" button (highlights energy path), Sunlight Toggle |
| Graph Monitor | Energy Amount at each link (diminishing bar chart) |

**Phase 1 — Your Hamburger**
- **Context:** A hamburger on a plate.
- **Mentor:** "You just ate a burger. You now have energy to run, think, and grow. But where did that energy COME from?"
- **Options:**
  1. "From the burger." → "True, but where did the BURGER get its energy?"
  2. "From the cow." → "And where did the cow get it?"
  3. "From the Sun." → "Jumping ahead! Let's trace the chain."

**Phase 2 — Trace the Chain**
- **Action:** Click "Trace Energy." Chain illuminates link by link: Sun → Grass → Cow → You.
- **Mentor:** "Sunlight hits grass. Grass uses **photosynthesis** — a chemical reaction! — to turn sunlight + CO₂ + water into **glucose** (sugar). That's the plant's food."
- **Checkpoint:** "So where does the grass get its food?"
  1. "From the soil." → **Target misconception.** "Soil gives minerals and water, but the ENERGY comes from SUNLIGHT. The grass literally eats light using Chemistry."
  2. "From sunlight." → "Yes! Photosynthesis is the reaction: light energy → chemical energy (glucose)."

**Phase 3 — Energy Shrinks at Every Step**
- **Action:** Toggle "Energy Amount" graph.
- **Observation:** Sun delivers 100 units → Grass stores 10 → Cow stores 1 → You get 0.1.
- **Mentor:** "Only about 10% transfers each step. Where does the other 90% go?"
- **Options:**
  1. "It disappears." → "Remember P3? Energy never disappears! It becomes HEAT — the cow's body warmth, its movement, its digestion."
  2. "It becomes heat." → "Exactly — same rule as the ramp. Energy transforms, not vanishes."
- **Explain:** "The sun is the ultimate energy source for almost all life. Photosynthesis (Chemistry C3) captures it, your cells (Biology B2) burn it. Physics (P3) told you the rule: energy transforms, never disappears."

---

### Big Idea 4: "How Do We Sense the World?"
**Core Thread:** Information travels as waves and signals — sound through air, light through space, nerve impulses through your body. Different sciences study different parts of the same communication chain.

---

#### P4 — Sound Waves: Seeing the Invisible
**Scenario:** "The Vibrating Speaker"
**Sim Objects:** A speaker cone, air particles in a tube (visualized as a row of dots), and a microphone at the far end.

| Property | Value |
|:---|:---|
| Target Misconception | "Sound travels as wind / air moves from speaker to ear" |
| Unlockable Controls | Frequency Slider (pitch), Amplitude Slider (volume) |
| Graph Monitor | Wave visualization (compression/rarefaction pattern) |

**Phase 1 — The Bump Chain**
- **Context:** Speaker off. Particles evenly spaced.
- **Mentor:** "I'm going to tap this speaker cone ONCE. Watch the particles."
- **Action:** Single pulse. First particle bumps second, second bumps third, wave propagates.
- **Mentor:** "See that? Each particle bumped its neighbor, but NO particle traveled from the speaker to the microphone. The ENERGY traveled, not the air."
- **Options:**
  1. "Like dominoes!" → "Perfect analogy. The wave carries energy, but each domino stays in its spot."
  2. "So sound isn't wind?" → "Exactly. Wind moves air. Sound moves THROUGH air without carrying it along."

**Phase 2 — Pitch**
- **Action:** Unlock Frequency Slider. Continuous tone.
- **Observation:** Low frequency = slow compressions, wide spacing. High frequency = fast compressions, tight spacing.
- **Checkpoint:** "A higher pitch means the particles are bunching together more [frequently/less frequently]?"
  - "More frequently." → **Correct.** "Frequency = how many wave peaks per second. More peaks = higher pitch."
  - "Less frequently." → "Watch again as I increase the slider — the bunches come faster, right?"

**Phase 3 — Volume**
- **Action:** Unlock Amplitude Slider.
- **Observation:** Higher amplitude = particles push neighbors farther (bigger compression).
- **Mentor:** "Louder sound = particles pushing harder. Same frequency, bigger pushes."
- **Explain:** "Sound is a pressure wave. Frequency → pitch. Amplitude → volume. The particles themselves are just jiggling back and forth in place."

**Cross-link:** "In Chemistry (C4), you'll see that LIGHT works differently — it doesn't need particles at all. And in Biology (B4), you'll discover how your ear turns these pressure bumps into something your brain understands."

---

#### C4 — Light & Color: Why Is the Sky Blue?
**Scenario:** "The Prism Lab"
**Sim Objects:** A white light beam, a glass prism, a colored object (red apple), and a sky gradient background.

| Property | Value |
|:---|:---|
| Target Misconception | "Objects are colored because they are painted/dyed that specific color inherently" (no concept of absorption/reflection) |
| Unlockable Controls | Prism Toggle, Object Color picker, Light Color filter |
| Graph Monitor | Wavelength spectrum bar |

**Phase 1 — White Light Isn't White**
- **Context:** White beam enters prism.
- **Mentor:** "This looks like plain white light. But watch what happens when it enters the prism."
- **Observation:** Rainbow spectrum fans out on the other side.
- **Mentor:** "White light is actually ALL colors mixed together! The prism separates them by wavelength."
- **Options:**
  1. "Like a rainbow after rain!" → "Exactly — raindrops act like tiny prisms."
  2. "What's wavelength?" → "Each color has a different wave size. Red = long waves. Violet = short waves. Think about P4 — frequency was pitch for sound. For light, frequency is COLOR."

**Phase 2 — Why Is the Apple Red?**
- **Action:** Shine white light on a red apple.
- **Observation:** Apple absorbs all colors EXCEPT red, which bounces back.
- **Mentor:** "The apple isn't 'red.' It absorbs every color except red and reflects that one back to your eyes!"
- **Checkpoint:** "If I shine ONLY blue light on the apple, what color will it look?"
  1. "Red." → "There's no red light to reflect! Try it."
  2. "Blue." → "Hmm, does the apple reflect blue?"
  3. "Black/dark." → **Correct.** "Yes — the apple absorbs blue and has no red to reflect. It looks almost black!"
- **Action:** Demo with blue-only filter confirms.

**Phase 3 — Why Is the Sky Blue?**
- **Mentor:** "Bonus riddle: the sky has no paint. Sunlight enters the atmosphere and tiny gas molecules scatter short wavelengths (blue/violet) in every direction. Your eyes see blue scattered everywhere."
- **Explain:** "Color isn't a property of the object alone — it's about which wavelengths of light reach your eyes. That's an interaction between the light SOURCE and the MATERIAL."

**Cross-link:** "Sound (P4) needed particles to travel. Light doesn't — it's an electromagnetic wave. But both carry energy and information. Biology (B4) will show you the incredible detectors your body built for both."

---

#### B4 — Eyes, Ears, and Nerves: Your Body's Sensors
**Scenario:** "Signal Relay Race"
**Sim Objects:** A simplified ear → nerve → brain pathway (left side) and eye → nerve → brain pathway (right side). A "signal" dot travels the path when triggered.

| Property | Value |
|:---|:---|
| Target Misconception | "You see with your eyes / hear with your ears" (ignoring the brain's role — the eyes and ears are just sensors) |
| Unlockable Controls | Sound trigger, Light trigger, "Block Nerve" button |
| Graph Monitor | Signal Travel Time bar |

**Phase 1 — Hear a Sound**
- **Context:** Both pathways visible but inactive.
- **Action:** Trigger a sound. A wave reaches the ear → eardrum vibrates → signal dot travels along nerve → reaches brain → "HEARD!" label appears.
- **Mentor:** "The sound wave (P4) vibrated your eardrum. That vibration was turned into an **electrical signal** that raced along a nerve to your brain. You didn't HEAR with your ear — you heard with your BRAIN. The ear was just the microphone."

**Phase 2 — See a Light**
- **Action:** Trigger a light flash. Light reaches eye → lens focuses → retina converts → signal dot travels along optic nerve → brain → "SEEN!" label.
- **Mentor:** "Same idea. The eye is a camera. The lens focuses light (C4) onto the retina, which converts it to an electrical signal. Your brain does the actual 'seeing.'"
- **Checkpoint:** "If the nerve between your eye and brain was blocked, what would happen?"
  1. "You'd see nothing." → **Correct.**
  2. "Your eye would still see but you wouldn't know." → "Interesting thought — the eye still detects, but 'seeing' requires the brain to receive the signal."
- **Demo:** Press "Block Nerve." Signal stops mid-path. "SEEN!" never appears.

**Phase 3 — Speed of Thought**
- **Mentor:** "Notice the signal travel time. Nerve signals move at about 100 meters per second. That's fast — but not instant! That's why you sometimes flinch AFTER you feel pain."
- **Explain:** "Physics gave us waves (P4). Chemistry gave us light and color (C4). Biology built detectors (ears, eyes) and wiring (nerves) to translate those waves into experience. All three sciences explain the single act of 'hearing a bird sing.'"

---

### Big Idea 5: "Why Does Everything Stay in Balance?"
**Core Thread:** Natural systems tend toward equilibrium. Forces balance on a seesaw. Dissolved sugar reaches a limit. Your body temperature holds at 37°C. The concept of balance appears everywhere as **equilibrium**.

---

#### P5 — Levers & Balance: How a Kid Can Lift a Car
**Scenario:** "The Playground Seesaw"
**Sim Objects:** A seesaw (plank on a triangular fulcrum). Two characters of adjustable weight at adjustable distance.

| Property | Value |
|:---|:---|
| Target Misconception | "The heavier person always goes down" (ignoring distance from fulcrum) |
| Unlockable Controls | Weight Sliders (each character), Position Sliders (distance from fulcrum) |
| Graph Monitor | Torque Left vs. Torque Right (balance indicator) |

**Phase 1 — Equal Weights**
- **Context:** Two equal-weight characters at equal distance. Seesaw balanced.
- **Mentor:** "The seesaw is balanced. Both sides weigh the same, both sit the same distance from the middle. But what if one friend weighs MORE?"

**Phase 2 — Unequal Weights**
- **Action:** Increase left character's weight. Seesaw tilts left.
- **Checkpoint:** "Can the lighter person fix this WITHOUT gaining weight?"
  1. "No, the heavy person always wins." → **Target misconception.** "Are you sure? Try moving the lighter person farther from the center."
  2. "Move farther from the middle." → **Correct.** "Try it!"
- **After experiment:** Lighter person moves farther out → seesaw balances.
- **Mentor:** "It's not just about weight — it's weight × distance. That product is called **torque**. Equal torques = balance."

**Phase 3 — Lift a Car**
- **Mentor:** "A car weighs 1,500 kg. If the fulcrum is just 5 cm from the car, and you push down on a bar 3 meters long on the other side… you could lift it! That's how a jack works."
- **Explain:** "Levers trade force for distance. Small force × long distance = big force × short distance. Balance is NOT just about weight — it's about the whole arrangement."

**Cross-link:** "In Chemistry (C5), balance means a reaction reaching a point where it stops changing. In Biology (B5), balance means your body holding itself steady — temperature, water, sugar. Same concept, very different systems."

---

#### C5 — Dissolving & Saturation: Fizz or Flat?
**Scenario:** "The Soda Factory"
**Sim Objects:** A transparent beaker of water with CO₂ molecules being injected, a pressure cap, and a temperature control.

| Property | Value |
|:---|:---|
| Target Misconception | "You can dissolve unlimited amounts of stuff in water" |
| Unlockable Controls | CO₂ injection rate, Pressure Cap (on/off), Temperature Slider |
| Graph Monitor | CO₂ Dissolved vs. Time (saturation curve) |

**Phase 1 — Inject the Fizz**
- **Context:** Pure water in a sealed beaker.
- **Action:** Start injecting CO₂. Bubbles dissolve into water, disappearing.
- **Mentor:** "I'm pumping CO₂ into the water. The gas molecules are mixing in — dissolved! This is literally how soda is made."

**Phase 2 — The Limit**
- **Observation:** After a certain point, new CO₂ bubbles stop dissolving and float upward.
- **Mentor:** "The water can't hold any more! This is called **saturation** — the solution is full."
- **Checkpoint:** "I said the water is 'full.' But what if I increase the pressure?"
  1. "More will dissolve." → **Correct.** "Try it."
  2. "Same amount." → "Hmm, pressure forces molecules closer together. Think about what that means."
- **Action:** Turn on Pressure Cap. More CO₂ dissolves.
- **Mentor:** "Higher pressure = more gas forced in. That's why soda is sealed under pressure."

**Phase 3 — Pop the Cap**
- **Action:** Remove Pressure Cap.
- **Observation:** FIZZ! CO₂ escapes rapidly.
- **Mentor:** "When you open a soda bottle, the pressure drops. The water can't hold all that CO₂ any more, so it escapes as bubbles — FIZZ!"
- **Action:** Raise Temperature slider.
- **Observation:** Even more gas escapes.
- **Explain:** "Higher temperature = less gas can stay dissolved. That's why warm soda goes flat faster. Equilibrium shifted — the balance changed."

**Cross-link:** "Physics (P5) showed balance of forces. Here, balance means 'how much can dissolve before it pushes back.' Biology (B5) uses the same idea — your body balances sugar, water, and temperature constantly."

---

#### B5 — Homeostasis: Your Body's Thermostat
**Scenario:** "The Body Temperature Challenge"
**Sim Objects:** A simplified human body outline with internal thermometer. External environment (temperature-adjustable background). Sweat glands, blood vessels, and shiver indicators.

| Property | Value |
|:---|:---|
| Target Misconception | "Your body temperature is always exactly 37°C" (no concept of active regulation) |
| Unlockable Controls | External Temperature Slider (0°C – 45°C) |
| Graph Monitor | Internal Body Temp vs. Time (with 37°C target line) |

**Phase 1 — The Baseline**
- **Context:** External temp = 22°C (comfortable). Body shows 37°C internally.
- **Mentor:** "Your body right now is 37°C inside — no matter what it's like outside. That's called **homeostasis** — your body actively works to stay balanced."
- **Options:**
  1. "What if it gets really hot outside?" → proceed.
  2. "Is 37 special?" → "Yes — your enzymes (tiny molecular machines from B2) work best at 37°C. Too hot or too cold and they stop working."

**Phase 2 — Heat Wave**
- **Action:** Slide external temp to 40°C.
- **Observation:** Body temp starts creeping up. Then sweat glands activate (animation). Blood vessels near skin expand (turn red). Temp stabilizes near 37°C.
- **Mentor:** "Your body FOUGHT the heat! Sweat evaporates and cools the skin. Blood vessels expand to release heat. This is a **feedback loop** — the body detects change and REACTS to cancel it."
- **Checkpoint:** "Is sweating a random thing, or is it a response to a specific trigger?"
  1. "A response to heat." → **Correct.** "Exactly — it's automatic. Your body has its own thermostat."
  2. "Random." → "Notice it only started when the temperature rose. The body measures temperature and responds."

**Phase 3 — Cold Snap**
- **Action:** Slide to 5°C.
- **Observation:** Sweat stops. Blood vessels constrict (narrow). Shiver animation starts. Temp holds.
- **Mentor:** "Now your body is conserving heat. Shivering generates heat from muscle movement (remember B1 — muscles need energy!). Blood vessels narrow to keep warm blood INSIDE."
- **Explain:** "Your body is a system in equilibrium — just like the seesaw (P5) and the soda (C5). When something pushes it off balance, it pushes back. If it couldn't, you'd be in serious trouble."

**Cross-link:** "Equilibrium everywhere: forces on a seesaw (P5), CO₂ in a soda (C5), temperature in your body (B5). Balance isn't just sitting still — it's ACTIVE work against constant change."

---

## 3. Cross-Reference Matrix

This table captures how each lesson triplet shares concepts and vocabulary, ensuring the learner builds connections:

| Big Idea | Physics | Chemistry | Biology | Shared Vocabulary |
|:---|:---|:---|:---|:---|
| 1. Why Things Move | P1: Push, Pull & Slide | C1: Particles on the Move | B1: Muscles, Bones & Levers | Force, friction, energy, speed |
| 2. Building Blocks | P2: Solid, Liquid, Gas | C2: Atoms & Molecules | B2: Cells: Tiny Factories | Particles, structure, building blocks, arrangement |
| 3. Energy | P3: Ramp Experiment | C3: Kitchen Reactions | B3: Food Chains | Energy, transfer, transform, conservation |
| 4. Sensing the World | P4: Sound Waves | C4: Light & Color | B4: Eyes, Ears & Nerves | Waves, signals, frequency, detection |
| 5. Balance | P5: Levers & Balance | C5: Dissolving & Saturation | B5: Homeostasis | Equilibrium, balance, feedback, threshold |

---

## 4. Recommended Lesson Sequencing

Lessons should be presented in **Big Idea order**, with all three disciplines per idea completed before moving to the next. This maximizes cross-referencing while the shared vocabulary is fresh.

```
Sprint Sequence:
 ┌─────────────────────────────────────────────────────────────────┐
 │ Week 1: Big Idea 1 — "Why Do Things Move?"                     │
 │   Day 1: P1 (Push & Pull) → Day 2: C1 (Particles) → Day 3: B1 │
 ├─────────────────────────────────────────────────────────────────┤
 │ Week 2: Big Idea 2 — "What Is Everything Made Of?"              │
 │   Day 1: P2 (States) → Day 2: C2 (Atoms) → Day 3: B2 (Cells) │
 ├─────────────────────────────────────────────────────────────────┤
 │ Week 3: Big Idea 3 — "Where Does Energy Come From?"            │
 │   Day 1: P3 (Ramp) → Day 2: C3 (Reactions) → Day 3: B3 (Food)│
 ├─────────────────────────────────────────────────────────────────┤
 │ Week 4: Big Idea 4 — "How Do We Sense the World?"              │
 │   Day 1: P4 (Sound) → Day 2: C4 (Light) → Day 3: B4 (Senses) │
 ├─────────────────────────────────────────────────────────────────┤
 │ Week 5: Big Idea 5 — "Why Does Everything Stay in Balance?"    │
 │   Day 1: P5 (Levers) → Day 2: C5 (Dissolving) → Day 3: B5    │
 └─────────────────────────────────────────────────────────────────┘
```

---

## 5. Dialog Engine Notes (For Implementation)

Each lesson maps directly to the existing `DialogNode` DFA structure from A7:

- **Every "Phase"** is a sub-graph of nodes.
- **Every "Options" list** maps to `DialogNode.options[]` with `nextNodeId` and optional `simAction`.
- **Every "Checkpoint"** is a node that sets `requiresPrediction: true`, locking the simulation run button until the learner commits.
- **Every "Cross-link hint"** is a terminal node with `type: 'CROSSLINK'` referencing the target lesson ID.
- **Misconception branches** follow the A8 pattern: tempting wrong answer → correction sub-graph → return to main flow.

Sim object definitions will need per-lesson config files (similar to `physicsConfig.ts`) defining:
- Objects, their properties, and spawn positions
- Unlockable controls and their ranges
- Graph monitor data sources

---

## 6. Open Questions

1. **Sim Complexity:** Lessons like C2 (drag-and-drop molecule building) and B2 (zoom levels) require interaction patterns beyond the existing Force Slider paradigm. Should these use a distinct "Sandbox" mode vs. the current "Lab" mode?
2. **Persistence:** Should lesson completion state and predictions persist across sessions (localStorage or account-based)?
3. **Difficulty Scaling:** The current plan targets the middle of the 8–12 range (~10 yr old). Should we add an optional "Deep Dive" section per lesson for advanced learners (closer to A9 AP-level detail)?
4. **Art & Tone:** The existing "Quantum Dark" theme (A7) suits older students. Should the 8–12 audience get a lighter, more colorful palette? Suggested: keep dark canvas for the simulation (focus/contrast) but use a brighter, warmer UI shell.
5. **Chemistry & Biology Engine:** Physics uses Matter.js. Chemistry sims (particle behavior, molecule snapping) and Biology sims (zoom, cell animation) may need a different rendering approach (pure Canvas 2D or SVG) rather than a physics engine. Should these live under a common `SimEngine` interface with pluggable backends?

---

## 7. Implementation Status (Sprint Delivery)

### 7.1. Delivered Artifacts

All 15 interactive lesson scripts have been implemented as TypeScript dialog scripts using the Socratic Dialog Engine (DFA `DialogNode` graphs). Each lesson is fully playable end-to-end via the `SocraticChat` component.

| # | Lesson ID | File | Status |
|:--|:----------|:-----|:-------|
| 1 | P1 | `src/features/sciverse/content/lessons/p1-push-pull-slide.ts` | ✅ Complete |
| 2 | C1 | `src/features/sciverse/content/lessons/c1-particles-move.ts` | ✅ Complete |
| 3 | B1 | `src/features/sciverse/content/lessons/b1-muscles-bones.ts` | ✅ Complete |
| 4 | P2 | `src/features/sciverse/content/lessons/p2-states-of-matter.ts` | ✅ Complete |
| 5 | C2 | `src/features/sciverse/content/lessons/c2-atoms-molecules.ts` | ✅ Complete |
| 6 | B2 | `src/features/sciverse/content/lessons/b2-cells.ts` | ✅ Complete |
| 7 | P3 | `src/features/sciverse/content/lessons/p3-energy-ramp.ts` | ✅ Complete |
| 8 | C3 | `src/features/sciverse/content/lessons/c3-chemical-reactions.ts` | ✅ Complete |
| 9 | B3 | `src/features/sciverse/content/lessons/b3-food-chains.ts` | ✅ Complete |
| 10 | P4 | `src/features/sciverse/content/lessons/p4-sound-waves.ts` | ✅ Complete |
| 11 | C4 | `src/features/sciverse/content/lessons/c4-light-color.ts` | ✅ Complete |
| 12 | B4 | `src/features/sciverse/content/lessons/b4-senses.ts` | ✅ Complete |
| 13 | P5 | `src/features/sciverse/content/lessons/p5-levers-balance.ts` | ✅ Complete |
| 14 | C5 | `src/features/sciverse/content/lessons/c5-dissolving.ts` | ✅ Complete |
| 15 | B5 | `src/features/sciverse/content/lessons/b5-homeostasis.ts` | ✅ Complete |

### 7.2. Infrastructure Delivered

| Component | File | Description |
|:----------|:-----|:------------|
| Lesson Registry | `src/features/sciverse/content/lessons/index.ts` | Exports `LESSON_SCRIPTS` map and `LESSON_REGISTRY` metadata array for all 15 lessons |
| LessonShell | `src/features/sciverse/modules/LessonShell.tsx` | Generic lesson viewer: visual panel + SocraticChat, handles `SET_VISUAL` actions |
| LessonHub | `src/features/sciverse/modules/LessonHub.tsx` | Navigation page showing 5 Big Ideas × 3 lessons with discipline badges |
| Routing | `src/App.tsx` | `/projects/science-lab` → LessonHub, `/projects/science-lab/lesson/:lessonId` → LessonShell |
| Types | `src/features/sciverse/types.ts` | Added `SET_VISUAL` SimAction, `Discipline` type, `LessonMeta` interface |

### 7.3. Architecture Decisions Made

1. **`SET_VISUAL` Action Type:** Chemistry and Biology lessons don't need Matter.js. A new `SET_VISUAL` SimAction type was added that passes arbitrary visual state (`Record<string, unknown>`) to the LessonShell's VisualPanel. This decouples non-physics lessons from the physics engine.

2. **LessonShell vs. KinematicsLesson:** The existing `KinematicsLesson` module (which uses `PhysicsViewport` + Matter.js) is preserved at `/projects/science-lab/kinematics`. The new 15 lessons use the lighter `LessonShell` component.

3. **Lesson Hub replaces ScienceLab:** The `/projects/science-lab` route now shows the LessonHub (all 15 lessons). The original kinematics demo is accessible via a "Bonus" link at the bottom.

### 7.4. Build Verification

- `tsc` — **PASS** (zero type errors)
- `vite build` — **PASS** (production bundle generated)

### 7.5. What's Next (Future Sprints)

1. **Rich Visual Panels:** Current VisualPanel renders state as key/value pairs. Each lesson needs custom visual renderers (animated SVG, Canvas 2D, or WebGL) to bring the simulations to life.
2. **Progress Persistence:** Add localStorage or account-based completion tracking so learners see which lessons they've finished.
3. **Cross-Link Navigation:** When a lesson mentions "See C4: Light & Color", make it a clickable link that navigates to that lesson.
4. **Accessibility:** Ensure screen reader support, keyboard navigation, and WCAG AA contrast ratios.
5. **Code Splitting:** The 15 lesson scripts add ~30KB gzipped. Dynamic `import()` per lesson would reduce initial bundle size.
