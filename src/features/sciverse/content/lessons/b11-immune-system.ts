import { DialogNode } from '../../types';

/**
 * B11 — The Body's Army
 * Big Idea 11: "How Do We Stay Healthy?"
 * Scenario: Immune system responding to bacterial invaders
 * Target Misconception: "Avoiding all germs makes you healthier"
 */
export const getB11Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Immunology Lab! 🦠\n\nIn the simulation, you can see bacteria (the spiky shapes) entering the bloodstream. Your body encounters thousands of microbes every day.\n\nDo you think the best strategy for staying healthy is to avoid **all** contact with microbes?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', bacteriaCount: 5, immuneActive: false } },
        options: [
            { id: 'avoid_all', label: "Yes — keep germs away and stay clean!", nextNodeId: 'misconception_sterile', sentiment: 'negative' },
            { id: 'some_ok', label: "No — some exposure actually trains your immune system.", nextNodeId: 'correct_exposure', sentiment: 'positive' },
            { id: 'unsure', label: "I'm not sure — some might be OK?", nextNodeId: 'hint_exposure', sentiment: 'neutral' }
        ]
    },

    'misconception_sterile': {
        id: 'misconception_sterile',
        speaker: 'AI',
        content: "This is actually a common misconception called the **hygiene hypothesis**! 🤔\n\nStudies show children who grow up with pets, play in dirt, and have regular germ exposure develop **stronger immune systems** and fewer allergies.\n\nYour immune system is like a muscle — it needs practice fighting small threats to be ready for big ones. Without training, it can overreact by attacking harmless things (that's what allergies are!).",
        options: [
            { id: 'makes_sense', label: "So some germ exposure is actually good?", nextNodeId: 'correct_exposure' }
        ]
    },

    'hint_exposure': {
        id: 'hint_exposure',
        speaker: 'AI',
        content: "Your gut feeling is right! 😊\n\nYou have about **38 trillion bacteria** living inside your gut right now — that's more cells than your own body! They help digest food, make vitamins, and train your immune system.\n\nThe goal isn't zero germs — it's a well-trained immune system that can tell friends from foes.",
        options: [
            { id: 'understood', label: "The immune system needs practice to learn!", nextNodeId: 'correct_exposure' }
        ]
    },

    'correct_exposure': {
        id: 'correct_exposure',
        speaker: 'AI',
        content: "Exactly! The immune system is a **learning system**. 🎓\n\nIt learns to recognize pathogens through exposure — either from real infection or from **vaccines** (weakened/dead pathogens).\n\nWatch the sim: when bacteria invade, the first defenders that rush in are called **neutrophils** (white blood cells). Let's trigger the immune response!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'invasion', immuneActive: true, showNeutrophils: true } },
        options: [
            { id: 'saw_response', label: "I see white cells are swarming the bacteria!", nextNodeId: 'two_layers' }
        ]
    },

    'two_layers': {
        id: 'two_layers',
        speaker: 'AI',
        content: "Great observation! The immune system has **two layers**:\n\n🛡️ **Innate (fast, general):** Responds in minutes. Neutrophils, macrophages — they eat anything that looks foreign.\n\n🎯 **Adaptive (slow, specific):** Takes 1-2 weeks the first time. B-cells make antibodies specifically shaped to match ONE type of pathogen.\n\nThe diagram shows both. Which layer do you think vaccines train?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'two_layers', showBothLayers: true } },
        options: [
            { id: 'adaptive', label: "The adaptive layer — making specific antibodies.", nextNodeId: 'antibodies' },
            { id: 'innate', label: "The innate layer — general defense.", nextNodeId: 'vaccine_hint' }
        ]
    },

    'vaccine_hint': {
        id: 'vaccine_hint',
        speaker: 'AI',
        content: "The innate system is already fast — it doesn't need much training! What makes vaccines special is that they **teach the adaptive system** to make perfect antibodies *before* a real infection. 💉",
        options: [
            { id: 'got_it', label: "So vaccines give your adaptive immune system a practice run!", nextNodeId: 'antibodies' }
        ]
    },

    'antibodies': {
        id: 'antibodies',
        speaker: 'AI',
        content: "Exactly! Here's the magic: after fighting off a pathogen (or getting a vaccine), **memory B-cells** stick around for *years*. 🧠\n\nNext time the same virus shows up, these memory cells recognize it instantly and flood your blood with antibodies before you even feel sick. That's **immunity**!\n\nTry the **Second Exposure** button — watch how much faster the response is!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'memory_cells', showMemoryCells: true } },
        options: [
            { id: 'tested', label: "The second response was 10x faster!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Immune System Mastery:**\n\n✅ Exposure trains the immune system (not all germs are harmful)\n✅ Innate immunity = fast, general defense\n✅ Adaptive immunity = slow but specific, creates memory cells\n✅ Vaccines use this memory system for protection without illness\n✅ Antibodies are custom-shaped proteins that lock onto specific pathogens\n\n**Fun fact:** The cells in this sim are drawn at roughly 1,000,000× magnification! 🔬",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [
            { id: 'done', label: "I understand the immune system! Let's keep exploring.", nextNodeId: 'done' }
        ]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "🔗 **Big Idea 11 Complete — How Do We Stay Healthy?**\n\n- Physics (P11): The Pumping Heart — blood pressure and flow dynamics keep nutrients moving\n- Chemistry (C11): Acids, Bases & pH — chemical balance keeps enzymes and cells functioning\n- Biology (B11): Immune Defense — your body identifies and destroys invaders with layered defenses\n\nIn all three: **health depends on balanced pressure, balanced chemistry, and a vigilant immune army!** 🫀🧪🛡️\n\n✅ **Lesson B11 Complete!**",
        options: []
    }
});
