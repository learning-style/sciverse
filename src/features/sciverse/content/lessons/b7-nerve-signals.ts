import { DialogNode } from '../../types';

/**
 * B7 — Nerve Signals: Bioelectricity & Neurons
 * Big Idea 7: "How Does Electricity Work?"
 * Scenario: "The Lightning Reflex"
 * Target Misconception: "Nerves work like wires carrying electricity"
 */
export const getB7Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to **The Lightning Reflex!** ⚡🖐️\n\nImagine you accidentally touch a hot pan on the stove. OUCH! You pull your hand away *instantly*.\n\nBut how did your brain know your finger was in danger? **How fast did that signal travel from your fingertip to your brain?**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
        options: [
            { id: 'wire', label: "Nerves are like electrical wires, right?", nextNodeId: 'misconception_wire', sentiment: 'negative' },
            { id: 'fast', label: "Super fast — like the speed of light?", nextNodeId: 'speed_guess', sentiment: 'neutral' },
            { id: 'brain', label: "The brain sends signals somehow!", nextNodeId: 'touch_hot', sentiment: 'positive' }
        ]
    },

    'misconception_wire': {
        id: 'misconception_wire',
        speaker: 'AI',
        content: "That's what most people think — but it's not quite right! 🤔\n\nIn copper wires (like in P7 Circuits), **free electrons** zoom through metal. But your body isn't made of metal!\n\nNerves seem similar to wires — signals flow along a path — but the way they work is completely different. Let's touch that hot pan and find out!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'touch_hot' } },
        options: [
            { id: 'how', label: "So what carries the signal if not electrons?", nextNodeId: 'neuron_anatomy' }
        ]
    },

    'speed_guess': {
        id: 'speed_guess',
        speaker: 'AI',
        content: "Good guess, but nerve signals are actually WAY slower than light or electricity in wires! 🐌⚡\n\nElectricity in a copper wire: ~**300,000 km/s**\nNerve signal in your body: ~**100 m/s** (about 360 km/h)\n\nThat's millions of times slower! Still fast enough to pull your hand away — but it shows nerves DON'T work like wires. Something different is happening...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'touch_hot', showSpeed: true } },
        options: [
            { id: 'why', label: "Why is it so much slower?", nextNodeId: 'why_slower' },
            { id: 'what', label: "What makes it different from wires?", nextNodeId: 'neuron_anatomy' }
        ]
    },

    'why_slower': {
        id: 'why_slower',
        speaker: 'AI',
        content: "Nerves are slower because they use **chemistry**, not pure electricity! ⚗️⚡\n\nIn a copper wire, electrons zoom freely through metal. But in your body, the signal works by **ions** (charged atoms like sodium and potassium) flowing in and out of the nerve cell through tiny gates.\n\nOpening and closing these gates takes TIME — like passing a baton in a relay race instead of throwing it directly.\n\nLet's look at the nerve cell to see how this works!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'neuron_anatomy' } },
        options: [
            { id: 'see_neuron', label: "Show me the neuron!", nextNodeId: 'neuron_anatomy' }
        ]
    },

    'touch_hot': {
        id: 'touch_hot',
        speaker: 'AI',
        content: "You touch the hot pan! 🔥🖐️\n\nWatch the signal race from your fingertip, up your arm, to your brain — then a \"PULL AWAY!\" signal races back down.\n\nThis all takes about **0.02 seconds** (20 milliseconds). But instead of electricity flowing through metal, the signal is carried by special cells called **neurons**.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'touch_hot' } },
        options: [
            { id: 'neuron', label: "What's a neuron?", nextNodeId: 'neuron_anatomy' },
            { id: 'how', label: "How do neurons carry a signal?", nextNodeId: 'signal_mechanism' }
        ]
    },

    'signal_mechanism': {
        id: 'signal_mechanism',
        speaker: 'AI',
        content: "Neurons carry signals using a clever mix of **chemistry and electricity**! ⚡🧪\n\nInstead of electrons flowing through a wire, neurons use **ions** — tiny charged atoms like sodium (Na⁺) and potassium (K⁺). These ions rush in and out of the cell through special gates, creating a wave of electrical charge that ripples down the nerve.\n\nTo understand this, let's first look at the neuron's structure — each part has a special job!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'neuron_anatomy' } },
        options: [
            { id: 'see_parts', label: "Show me the parts!", nextNodeId: 'neuron_anatomy' }
        ]
    },

    'neuron_anatomy': {
        id: 'neuron_anatomy',
        speaker: 'AI',
        content: "Let's zoom in on a **neuron** — the nerve cell! 🔬\n\nA neuron has special parts:\n- 🟣 **Cell body** — the control centre (with a nucleus inside)\n- 🌿 **Dendrites** — branching \"antennae\" that receive signals\n- 📏 **Axon** — a long cable that carries the signal forward\n- 🟡 **Myelin sheath** — sausage-shaped insulation wrapped around the axon\n- 🔴 **Synapse** — a tiny gap where one neuron talks to the next\n\nLook at the diagram — see how it's like a biological wire? But the signal works differently!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'neuron_anatomy' } },
        options: [
            { id: 'signal', label: "How does the signal actually travel?", nextNodeId: 'action_potential' },
            { id: 'myelin', label: "What does the myelin sheath do?", nextNodeId: 'myelin_intro' }
        ]
    },

    'myelin_intro': {
        id: 'myelin_intro',
        speaker: 'AI',
        content: "Great question! The **myelin sheath** is like insulation on an electrical wire! 🟡\n\nIt's a fatty coating wrapped around the **axon** in sausage-shaped segments. Here's what it does:\n\n1. **Speeds up the signal** — without myelin, signals travel ~2 m/s. With myelin, they zoom at **120 m/s!** That's 60× faster! 🏎️\n2. **Saves energy** — the signal \"jumps\" between gaps in the myelin (called **Nodes of Ranvier**) instead of activating every single ion channel\n3. **Protects the axon** — like the rubber coating on a wire\n\nThis jumping is called **saltatory conduction** — like skipping stones across a pond instead of swimming!\n\nBut HOW does the signal itself work? That's where chemistry meets electricity...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'neuron_anatomy' } },
        options: [
            { id: 'how', label: "How does the signal work?", nextNodeId: 'action_potential' },
            { id: 'disease', label: "What if myelin is damaged?", nextNodeId: 'myelin_damage' }
        ]
    },

    'myelin_damage': {
        id: 'myelin_damage',
        speaker: 'AI',
        content: "Really important question! 🩺\n\nWhen myelin gets damaged, the signal **slows down or stops completely** — like a wire losing its insulation!\n\nThis actually happens in a disease called **Multiple Sclerosis (MS)**:\n- The body's immune system mistakenly **attacks** the myelin sheath\n- Signals that used to zoom at 120 m/s slow to a crawl\n- This can cause **numbness, weakness, and difficulty moving**\n\nThink of it this way: imagine your phone charger cable with the rubber coating peeling off — the wire inside still works, but the signal leaks and gets weaker! ⚡💔\n\nScientists are working on ways to help the body **rebuild myelin** — it's one of the biggest goals in neuroscience research!\n\nNow let's see how the signal itself actually works inside the axon...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'neuron_anatomy' } },
        options: [
            { id: 'how', label: "How does the signal work inside the axon?", nextNodeId: 'action_potential' },
            { id: 'synapse', label: "What happens at the end of a neuron?", nextNodeId: 'synapse' }
        ]
    },

    'action_potential': {
        id: 'action_potential',
        speaker: 'AI',
        content: "Here's where it gets amazing — and where **chemistry meets electricity!** ⚡🧪\n\nThe signal is called an **action potential**. Here's how it works:\n\n1. Tiny gates called **ion channels** open in the axon wall\n2. **Na⁺ (sodium)** ions rush IN → this creates a tiny electrical pulse!\n3. Then **K⁺ (potassium)** ions rush OUT → resetting the cell\n4. This triggers the NEXT set of channels to open... like a wave of dominos!\n\nRemember batteries from C7? Ions create chemical energy there too! Your neurons are like **tiny biological batteries** firing in sequence!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'action_potential' } },
        options: [
            { id: 'speed', label: "Why does myelin make it faster?", nextNodeId: 'signal_speed' },
            { id: 'circuit', label: "It's like a circuit! (P7 link)", nextNodeId: 'signal_speed' }
        ]
    },

    'signal_speed': {
        id: 'signal_speed',
        speaker: 'AI',
        content: "Great connection to P7! 🔗 Neurons ARE like a circuit:\n- Signal follows a **pathway** (like current in a circuit)\n- It only goes in **one direction** (like a diode!)\n- Many neurons chain together to form the full path\n\nNow, the **myelin sheath** is the speed booster! 🏎️\n\nWithout myelin, the signal has to activate EVERY ion channel — slow!\nWith myelin, the signal **jumps** between gaps in the sheath (called Nodes of Ranvier). It's like skipping stones across a pond instead of swimming!\n\nThis makes signals travel **10× faster!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'signal_speed' } },
        options: [
            { id: 'synapse', label: "What happens when the signal reaches the end?", nextNodeId: 'synapse' },
            { id: 'damage', label: "What if myelin is damaged?", nextNodeId: 'myelin_damage' }
        ]
    },

    'synapse': {
        id: 'synapse',
        speaker: 'AI',
        content: "When the signal reaches the end of one neuron, there's a tiny **gap** — the **synapse**! 🔴\n\nThe electrical signal CAN'T jump across. So the neuron uses CHEMISTRY:\n\n1. The signal arrives at the **axon terminal** (the end)\n2. Tiny bubbles release **neurotransmitter** molecules into the gap\n3. These molecules float across and land on the next neuron's **dendrites**\n4. This triggers a NEW electrical signal in the next neuron!\n\nIt's like a relay race — the baton (neurotransmitter) is passed from one runner (neuron) to the next!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'synapse' } },
        options: [
            { id: 'checkpoint', label: "I think I get it! Test me!", nextNodeId: 'checkpoint' },
            { id: 'c7link', label: "So ions AND molecules — lots of chemistry!", nextNodeId: 'chemistry_link' }
        ]
    },

    'chemistry_link': {
        id: 'chemistry_link',
        speaker: 'AI',
        content: "Exactly! The C7 connection is powerful: 🔋🧪\n\n**Batteries (C7):** Chemical reactions move ions → electrical energy\n**Neurons (B7):** Ion channels move Na⁺/K⁺ → electrical signal\n\nBoth convert **chemical energy into electrical energy!** Your brain runs on chemistry, not plugged-in electricity.\n\nYou eat food → cells break it down → ions get pumped → neurons fire. It's a biological battery!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'synapse', showC7Link: true } },
        options: [
            { id: 'checkpoint', label: "Ready for the checkpoint!", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint Question!**\n\nSome diseases damage the **myelin sheath** around neurons. Patients find their movements become slow and uncoordinated.\n\n**Why does losing myelin make signals slower?**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'correct', label: "Without myelin, signals can't jump — they must travel through every ion channel, which is slower!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'wrong1', label: "Myelin carries the electricity, so without it there's no signal", nextNodeId: 'checkpoint_wrong1', sentiment: 'negative' },
            { id: 'wrong2', label: "Myelin is the fuel for the signal, so it runs out of energy", nextNodeId: 'checkpoint_wrong2', sentiment: 'negative' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ **Brilliant!** That's exactly right!\n\nMyelin lets the signal **jump** between nodes (saltatory conduction). Without it, the action potential has to activate ion channels one by one along the entire axon — much, much slower.\n\nIt's like the difference between express trains (skipping stations) and local trains (stopping everywhere)! 🚄 vs 🚂",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', correct: true } },
        options: [
            { id: 'discovery', label: "Let's see everything we learned!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong1': {
        id: 'checkpoint_wrong1',
        speaker: 'AI',
        content: "Not quite! Myelin doesn't carry the signal itself — the **ion channels** do that. 🤔\n\nMyelin is **insulation** — it wraps around the axon and forces the signal to jump between gaps (Nodes of Ranvier). This skipping is what makes it fast!\n\nWithout myelin, the signal still travels, but it goes through every single ion channel — much slower, like walking instead of hopping!",
        options: [
            { id: 'retry', label: "So it's the jumping that makes it fast!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' }
        ]
    },

    'checkpoint_wrong2': {
        id: 'checkpoint_wrong2',
        speaker: 'AI',
        content: "Interesting idea, but myelin isn't fuel! 🔋\n\nThe energy comes from **ions** (Na⁺ and K⁺) being pumped by the cell. Myelin is just an insulating wrapper — like the plastic coating on an electrical wire.\n\nIts job is to make the signal **skip** along the axon. Without myelin, no skipping — so the signal crawls slowly through every section.",
        options: [
            { id: 'retry', label: "Oh, myelin is insulation that makes signals jump!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Big Discovery!**\n\n⚡ **How Nerve Signals Work:**\n1. Neurons are biological \"wires\" but use **ions**, not electrons\n2. Na⁺ rushes in, K⁺ rushes out → **action potential** (electrical pulse)\n3. **Myelin** insulation lets signals jump fast along the axon\n4. At the **synapse**, neurotransmitter molecules carry the signal across a gap\n5. It takes only **0.02 seconds** for a signal to go from finger to brain!\n\n**Misconception busted:** Nerves DON'T carry electricity like metal wires — they use ion chemistry to create electrical pulses!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'complete', label: "My brain is electric! ⚡🧠", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 7 Complete — How Does Electricity Work?**\n\n- Physics (P7): Circuits carry current through conductors (electrons in wires)\n- Chemistry (C7): Batteries convert chemical energy into electrical energy (ions!)\n- Biology (B7): Neurons fire using ion channels — biological circuits powered by chemistry!\n\nIn all three: **moving charged particles** = electricity! Whether it's electrons in copper, ions in a battery, or Na⁺/K⁺ in your neurons. ⚡\n\n✅ **Lesson B7 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

