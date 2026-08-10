import { DialogNode } from '../../types';

/**
 * B28 — Organ System Coordination
 * Big Idea 28: "How Do Body Systems Work Together?"
 */
export function getB28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `When you sprint, your heart pounds, your lungs gasp, and your muscles burn. All of these responses happen instantly and in perfect sync. How do separate organ systems coordinate like a single machine?\n\n**Visual legend:**\n- **Organ nodes**: Circles for lungs, heart, muscles, brain — the cooperating systems.\n- **Flow arrows**: Show information and resource flow between organs.\n- **Coordination indicator**: Shows how well the systems are synchronized.\n\n**Key words:**\n- **Organ system**: A group of organs that work together for one major function (e.g., circulatory = heart + blood vessels + blood).\n- **Integration**: Combining inputs from multiple systems to produce a coordinated output.\n- **Homeostasis**: Keeping internal conditions (temperature, pH, glucose) stable despite external changes.\n- **Negative feedback**: A control loop where the output reduces the original stimulus — like a thermostat turning off the heater.\n- **Cascading response**: When one system's change triggers responses in several other systems — a chain reaction.\n\nWhich is more important for keeping you alive — your circulatory system or your respiratory system?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'both_answer', label: 'Neither works without the other — they depend on each other.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'heart_answer', label: 'The circulatory system, because without blood flow everything stops.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `The heart is vital, but stop and think: what is the blood **carrying**? Oxygen — and oxygen comes from the lungs. Without the respiratory system, the circulatory system pumps oxygen-depleted blood. Without the circulatory system, the lungs have no way to deliver oxygen to distant cells. They are **interdependent** — each one is useless without the other. This is the core insight of organ system coordination: no system works alone.`,
            options: [
                { id: 'cont', label: 'They form a team — each system needs the others.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly! Organ coordination depends on **two key variables**:\n\n1. **Respiratory rate** — How fast the lungs bring in oxygen. More breathing = more O₂ available for the blood to carry.\n2. **Heart rate** — How fast the heart pumps blood. Higher rate = faster delivery of O₂ to muscles and faster removal of CO₂.\n\nThese two systems are linked: when muscles demand more oxygen, the brain increases **both** breathing and heart rate simultaneously. The coordination score rises when the two systems are balanced — too much of one without the other creates a bottleneck.\n\nLet's explore the cascade.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me the coordination cascade.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Organ coordination — step by step (sprinting example):**\n\n1. **Muscles** start working hard → consume O₂ rapidly → produce CO₂ as waste.\n2. **Blood CO₂ rises** → chemoreceptors in the brain detect the change.\n3. **Brain** sends nerve signals → increases breathing rate (respiratory system).\n4. **Brain** simultaneously sends signals → increases heart rate (circulatory system).\n5. **Lungs** take in more O₂ and expel more CO₂ (gas exchange accelerates).\n6. **Heart** pumps oxygenated blood faster to muscles.\n7. **Muscles** receive O₂, continue working, CO₂ is carried away.\n8. **Feedback**: As CO₂ drops back to normal, the brain reduces both rates.\n\n**Key principle:** The **brain** acts as the coordinator, and **blood** is the communication highway. Chemical signals (CO₂, O₂, hormones) are the messages.\n\n**Try it:** Adjust respiratory rate and heart rate to see how organ coordination changes!\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** During exercise, what happens if your heart rate increases but your breathing rate stays the same?`,
            options: [
                { id: 'right', label: 'Blood circulates fast but carries less oxygen — muscles still starve because the lungs can\'t keep up.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'The heart compensates by extracting more oxygen from each breath.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Not quite. The heart doesn't extract oxygen — the **lungs** do. The heart is just a pump that moves blood. If breathing rate stays low, each liter of blood passing through the lungs picks up **the same limited amount** of oxygen. Pumping that under-oxygenated blood faster doesn't help — it just circulates oxygen-poor blood more quickly. This is why coordination matters: **both** systems must ramp up together for effective oxygen delivery. One system can't compensate for the other's limitation.`,
            options: [
                { id: 'retry', label: 'I see — faster pumping without more breathing creates an oxygen bottleneck.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Right! This illustrates the **bottleneck principle** — the weakest link limits the whole chain. If lungs can't supply enough O₂, faster circulation just moves low-oxygen blood around. If the heart can't pump fast enough, perfectly oxygenated blood sits in the lungs instead of reaching muscles.\n\nThis is why the brain coordinates **both** simultaneously — it avoids creating bottlenecks in either direction.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Connect all the pieces.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** Your body is a network of interdependent systems.\n\n- **Respiratory rate** controls oxygen supply to the blood\n- **Heart rate** controls oxygen delivery speed to tissues\n- **The brain** coordinates both through nerve signals and chemical feedback\n- **Blood** serves as the transport highway AND the communication medium (carrying O₂, CO₂, hormones)\n- **Negative feedback** ensures the system self-corrects — no overshoot\n- **Balance** between systems matters more than any single system's performance\n\nEvery major body function — digestion, immunity, movement, thinking — depends on multiple organ systems working in concert. The body isn't a collection of parts; it's an integrated network.`,
            options: [
                { id: 'done', label: 'Complete B28', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 28 Complete — How Do Body Systems Work Together?**\n\n- **Physics (P28):** Flow & Pressure — heart rate and vessel diameter create the physics of blood transport\n- **Chemistry (C28):** Chemical Signaling — hormones and receptors create tunable communication\n- **Biology (B28):** Organ Coordination — respiratory, circulatory, and nervous systems integrate as one network\n\n**Summary Table:**\n| System | Variable | Role in Coordination |\n| --- | --- | --- |\n| Respiratory | Breathing rate | Controls O₂ input |\n| Circulatory | Heart rate | Controls O₂ delivery speed |\n| Nervous | Brain signals | Coordinates both systems |\n| Chemical | Hormones, CO₂ | Carries feedback messages |\n\n**Key takeaways:**\n- No organ system works alone — they are all interdependent\n- The brain coordinates systems via nerve signals, blood carries chemical feedback\n- Bottleneck principle: the weakest link limits the whole chain\n- Negative feedback keeps everything stable (homeostasis)\n\n✅ **Lesson B28 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
