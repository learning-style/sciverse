import { DialogNode } from '../../types';

/**
 * C28 — Chemical Signaling & Home Chemistry
 * Big Idea 28: "How Do Body Systems Work Together?"
 */
export function getC28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `How does your brain tell your heart to beat faster, or your pancreas know to release insulin? The answer is **chemical signaling**.\n\n**Visual legend:**\n- **Molecule icon**: A hormone or neurotransmitter — the chemical messenger.\n- **Receptor lock**: The target cell's receptor — only the right molecule fits.\n- **Signal strength bar**: Shows how concentration and receptor sensitivity affect the response.\n\n**Key words:**\n- **Hormone**: A chemical messenger released into the blood by a gland. Travels slowly but affects distant organs.\n- **Neurotransmitter**: A chemical released at nerve endings. Acts fast and locally across the synapse.\n- **Receptor**: A protein on a cell's surface that binds a specific signaling molecule — like a lock for one key.\n- **Concentration**: The amount of signaling molecule present. More molecules = stronger signal.\n- **Feedback inhibition**: When the product of a signal tells the sender to stop releasing more — a built-in off switch.\n\nWhy does your body use chemicals instead of just electrical signals for everything?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'chem_answer', label: 'Chemicals can travel through blood to reach every cell and produce graded, long-lasting responses.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'simple_answer', label: 'Electrical signals are too fast and chemicals slow things down on purpose.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Speed isn't the only consideration. Nerves are fast but can only reach cells they're physically wired to. **Hormones** travel through the blood and can reach **every cell in the body** simultaneously. They also produce **graded responses** — a little insulin causes a small effect, a lot causes a big one. And hormones can last **minutes to hours**, while nerve signals last milliseconds. The body uses both systems together: nerves for fast, precise signals; hormones for broad, sustained coordination.`,
            options: [
                { id: 'cont', label: 'So chemical signals complement electrical ones — each has strengths.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly! Chemical signaling works through **two key variables**:\n\n1. **Signal concentration** — More hormone molecules in the blood = stronger activation of target cells. The pancreas releases insulin proportional to blood glucose level — a beautifully graded response.\n2. **Receptor sensitivity** — Cells can increase or decrease the number of receptors on their surface. More receptors = amplified response. Fewer receptors = dampened response (**desensitization**).\n\nThese two variables create a **tunable communication system** — the body adjusts both the volume of the signal AND the sensitivity of the listener.\n\nLet's explore the main signaling pathways.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me how signaling pathways work.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Chemical signaling — step by step:**\n\n1. **Stimulus**: Blood glucose rises after a meal.\n2. **Detection**: Beta cells in the pancreas sense the glucose concentration.\n3. **Signal release**: Pancreas secretes **insulin** into the blood.\n4. **Transport**: Blood carries insulin to every cell in the body (takes ~1-2 minutes).\n5. **Receptor binding**: Insulin binds to **insulin receptors** on muscle and fat cells — like a key fitting a lock.\n6. **Cell response**: Cells open glucose channels, absorbing glucose from blood. Blood sugar drops.\n7. **Feedback**: As glucose falls, the pancreas reduces insulin release. The signal self-regulates.\n\n**Other examples:**\n- **Adrenaline** (fight-or-flight): Heart rate ↑, pupils dilate, muscles get more blood\n- **Thyroid hormone**: Sets metabolic rate for every cell\n- **Melatonin**: Signals darkness, triggers sleepiness\n\n**Try it:** Adjust signal concentration and receptor sensitivity to see how the response changes!\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** If a cell reduces the number of receptors on its surface, what happens to its response to a hormone?`,
            options: [
                { id: 'right', label: 'The response decreases — fewer receptors means less signal is captured.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'The response increases because each receptor works harder.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Not quite. Each receptor can only bind one molecule at a time and trigger one response — they don't "work harder." If you remove receptors, fewer hormone molecules get captured, and the overall signal reaching the cell interior is **weaker**. This is called **downregulation** and it's how cells protect themselves from overstimulation. It's like removing antennas from a radio — each remaining antenna works normally, but total reception drops.`,
            options: [
                { id: 'retry', label: 'Got it — fewer receptors means a weaker response, not a stronger one.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct! Cells regulate their sensitivity by changing **receptor count**. This is a fundamental principle in pharmacology too — chronic exposure to a drug causes cells to downregulate receptors, which is why you develop **tolerance**.\n\nThe combination of signal concentration (controlled by the sender) and receptor sensitivity (controlled by the receiver) gives the body incredibly fine-tuned control over every process.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Let\'s connect it all.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** Chemical signaling is the body's coordination language.\n\n- **Concentration** controls signal strength from the sender side\n- **Receptor sensitivity** controls response strength from the receiver side\n- **Feedback inhibition** prevents overshoot — signals self-regulate\n- **Hormones** provide slow, broadcast coordination; **neurotransmitters** provide fast, targeted signals\n- Every body system — digestion, circulation, immunity, growth — depends on chemical messages\n\nChemistry is the universal language that lets organs "talk" to each other across the entire body.`,
            options: [
                { id: 'done', label: 'Complete C28', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 28 Complete — How Do Body Systems Work Together?**\n\n- **Physics (P28):** Flow & Pressure — heart rate, vessel diameter, and resistance govern blood transport\n- **Chemistry (C28):** Chemical Signaling — hormones and receptors create tunable, self-regulating communication\n- **Biology (B28):** Organ Coordination — respiratory, circulatory, nervous, and endocrine systems integrate as one\n\n**Summary Table:**\n| Signal Type | Speed | Range | Duration | Example |\n| --- | --- | --- | --- | --- |\n| Neurotransmitter | ms | Local (synapse) | Brief | Muscle contraction |\n| Hormone | min | Whole body (blood) | Hours | Insulin, adrenaline |\n| Both combined | Variable | Targeted + broadcast | Layered | Fight-or-flight |\n\n**Key takeaways:**\n- Signal strength = concentration × receptor count\n- Feedback inhibition prevents overshoot\n- Cells tune their own sensitivity via receptor regulation\n- Hormones and nerves complement each other\n\n✅ **Lesson C28 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
