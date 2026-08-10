import { DialogNode } from '../../types';

/**
 * P28 — Flow, Pressure & Transport Mechanics
 * Big Idea 28: "How Do Body Systems Work Together?"
 */
export function getP28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `Your heart pumps blood through **~100,000 km** of blood vessels — enough to circle the Earth twice. How does physics keep everything flowing?\n\n**Visual legend:**\n- **Pump icon**: The heart generating pressure to drive blood flow.\n- **Tube with flowing particles**: Blood vessels carrying oxygen and nutrients.\n- **Pressure gauge**: Shows how vessel diameter and heart rate change flow pressure.\n\n**Key words:**\n- **Blood pressure**: The force blood exerts on vessel walls. Measured in mmHg (e.g., 120/80).\n- **Flow rate**: Volume of blood passing a point per unit time. Depends on pressure difference and resistance.\n- **Resistance**: Opposition to flow, mainly from vessel diameter. Narrow vessels = high resistance.\n- **Heart rate**: Beats per minute — each beat creates a pressure pulse that drives flow.\n- **Viscosity**: Blood thickness. Higher viscosity = more resistance to flow.\n\nWhat do you think determines how fast blood reaches your fingertips?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'physics_answer', label: 'The heart creates pressure, and vessel diameter controls resistance — together they set flow rate.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'simple_answer', label: 'The heart just pushes blood and gravity does the rest.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Gravity plays a small role, but the real driver is **pressure**. Your heart creates a pressure difference — higher at the arteries, lower at the veins — and blood flows down this gradient. The key insight: **vessel diameter** matters enormously. A tiny decrease in radius causes a huge increase in resistance (it scales with the **fourth power** of radius — Poiseuille's law). That's why clogged arteries are so dangerous: a 50% narrowing doesn't cut flow in half — it reduces it by **~94%**.`,
            options: [
                { id: 'cont', label: 'So pressure and vessel size are the main physics controls.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly! Circulatory physics depends on **three interacting variables**:\n\n1. **Heart rate** — More beats per minute = more pressure pulses = higher average flow. At rest: ~70 bpm. During exercise: up to 180 bpm.\n2. **Vessel diameter** — Arteries can dilate (widen) or constrict (narrow). Dilation drops resistance and increases flow. Constriction raises resistance and blood pressure.\n3. **Blood pressure** — The net result of heart output vs. vessel resistance. Too high = vessel damage. Too low = organs don't get enough oxygen.\n\nThese three create a **feedback system**: when you exercise, your heart rate rises, vessels in muscles dilate, and blood pressure adjusts to match demand.\n\nLet's trace the physics step by step.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Walk me through flow mechanics.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Circulatory flow mechanics — step by step:**\n\n1. **Heart contraction (systole)**: The left ventricle squeezes, creating ~120 mmHg of pressure. Blood surges into the aorta.\n2. **Elastic arteries**: Large arteries stretch to absorb the pressure pulse, then recoil — smoothing flow. This is why you feel a pulse.\n3. **Arterioles (flow control)**: Tiny muscular vessels that dilate or constrict. They're the main site of **resistance regulation**.\n4. **Capillaries**: Walls one cell thick. Pressure drops to ~30 mmHg. Nutrients and oxygen diffuse out; waste diffuses in.\n5. **Veins (return)**: Low pressure (~5 mmHg). One-way **valves** prevent backflow. Muscle contractions squeeze veins to push blood back to the heart.\n6. **Feedback**: Sensors in arteries detect pressure changes and signal the brain to adjust heart rate and vessel diameter.\n\n**Try it:** Increase heart rate and watch pressure rise. Then widen vessels and see how flow changes!\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Yes, let\'s check my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** If blood vessels constrict (get narrower), what happens to blood pressure?`,
            options: [
                { id: 'right', label: 'Blood pressure increases because resistance rises.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'Blood pressure decreases because less blood can flow.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Close thinking, but not quite. When vessels narrow, **resistance increases** — the heart is still pumping the same volume, but now it's being pushed through a tighter space. Think of squeezing a garden hose: the water doesn't slow down — the **pressure goes up**. Blood pressure = cardiac output × resistance. If resistance rises and output stays the same, pressure must increase. This is exactly why chronic vasoconstriction leads to **hypertension** (high blood pressure).`,
            options: [
                { id: 'retry', label: 'Got it — narrower vessels mean higher pressure, not lower flow.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct! **Blood pressure = cardiac output × total peripheral resistance.** When vessels constrict, resistance goes up, and pressure rises proportionally. Your body uses this relationship constantly — constricting skin vessels when cold (to conserve heat) and dilating muscle vessels during exercise (to deliver more oxygen).\n\nThis is the same physics as any fluid system: flow through a pipe depends on the pressure difference divided by resistance.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Let\'s see the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** The circulatory system is a pressure-driven flow network governed by basic physics.\n\n- **Heart rate** sets the pump output\n- **Vessel diameter** controls resistance (and scales by the 4th power of radius!)\n- **Blood pressure** is the net result of output vs. resistance\n- **Feedback sensors** constantly adjust the balance\n- The same fluid dynamics equations (Poiseuille's law) apply to blood as to water in pipes\n\nPhysics provides the transport engine that every other body system depends on.`,
            options: [
                { id: 'done', label: 'Complete P28', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 28 Complete — How Do Body Systems Work Together?**\n\n- **Physics (P28):** Flow & Pressure — heart rate, vessel diameter, and resistance govern blood transport\n- **Chemistry (C28):** Chemical Signaling — hormones and neurotransmitters coordinate organ responses\n- **Biology (B28):** Organ Coordination — respiratory, circulatory, nervous, and endocrine systems integrate into one unified body\n\n**Summary Table:**\n| Variable | Low Value | High Value | Effect |\n| --- | --- | --- | --- |\n| Heart Rate | Low flow, resting | High flow, active | Controls pump output |\n| Vessel Diameter | High resistance, high BP | Low resistance, high flow | Main resistance control |\n| Blood Pressure | Organs undersupplied | Vessel stress risk | Net system balance |\n\n**Key takeaways:**\n- Blood pressure = cardiac output × resistance\n- Vessel diameter is the strongest flow control lever\n- Feedback loops maintain homeostasis automatically\n- The same fluid physics governs all transport systems\n\n✅ **Lesson P28 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
