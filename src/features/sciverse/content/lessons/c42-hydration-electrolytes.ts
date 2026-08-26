import { DialogNode } from '../../types';

export function getC42Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "After a long game you are dripping with sweat and very thirsty. You drink a huge amount of plain water -- and you still feel weak and headachy.\n\nYou replaced the water. So why does your body still feel wrong?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Sweat is not just water -- it carries salts out too, and those need replacing as well.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "You simply did not drink enough water. More water would fix it.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Drinking more plain water can actually make it **worse**!\n\nTaste your sweat -- it is salty. That is because sweat carries dissolved salts out of your body, not just water. Scientists call these dissolved salts **electrolytes**, and your muscles and nerves cannot work properly without them.\n\nIf you replace only the water, you top the liquid back up while the salts stay low. Your body ends up **more watered down than before**, which is why you can feel weak, dizzy or crampy even with a full stomach of water.",
            options: [
                { id: 'cont', label: "So drinking only water can dilute me even further?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Your body needs the right **balance** of water and **electrolytes**:\n\n1. **Sweat** carries out water **and** salts\n2. **Electrolytes** are the dissolved salts your nerves and muscles rely on\n3. Plain water replaces only half of what you lost\n4. Too little salt causes cramps, weakness and headaches\n5. Too much salt makes you thirsty and can upset your stomach\n\nThat is why sports drinks exist. They are mostly water with a small, carefully chosen amount of salt -- roughly what sweat takes out.\n\nSweat takes out roughly **1 gram of salt in every litre** of water, so a good sports drink puts about the same amount back. That is the number the slider is set in: **grams per litre**.\n\nIn the picture, the **body balance bar** shows how close you are to that ideal, and the arrow marks where your drink sits. The green band in the middle is the healthy zone -- a **balanced** body.\n\nSlide **Drink Saltiness** and find the balance!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me find the right saltiness!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A runner finishes a hot two-hour race and drinks four litres of plain water very quickly.\n\nWhat is the danger?",
            options: [
                { id: 'right', label: "Her salts get watered down even further, which can cause serious cramps and confusion.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "No danger at all -- you can never drink too much water.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "You genuinely **can** drink too much water, and after heavy sweating it is a real medical risk.\n\nShe has already lost a lot of **electrolytes** in her sweat. Pouring in four litres of plain water spreads the remaining salts through far more liquid, so the concentration drops even lower.\n\nMuscles and nerves need those salts to send signals. When the level falls far enough, people get cramps, then confusion, and in severe cases it becomes dangerous. Athletes are taught to drink steadily and to include some salt.\n\nBalance matters more than volume.",
            options: [
                { id: 'retry', label: "Oh -- more water alone can make the balance worse!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **It is the balance that matters, not the amount.**\n\n- **Sweat** removes water **and** electrolytes\n- Plain water refills only the water\n- A little salt with your drink restores both\n- Too much salt is also a problem -- there is a healthy middle\n\nYour body works hard to hold this balance steady, which is exactly the kind of self-regulating system you met in **B5 Homeostasis**.\n\nIn B42 you will see what happens to your muscles *after* the game -- and why resting is part of training!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Balance beats volume!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered why water alone is not enough!**\n\n- **Sweat** carries out water **and** dissolved salts\n- Those salts are called **electrolytes**\n- Nerves and muscles cannot work without them\n- Plain water replaces only half of what is lost\n- Drinking a lot of plain water can **dilute** you further\n- The healthy zone is a **balance**, not a maximum\n\nNext in B42: why muscles grow while you rest, not while you train!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "I need to replace salts as well as water!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C42 Complete -- Sweat and Salt!**\n\nRehydrating is a chemistry problem, not just a thirst problem.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Sweat is salty | It removes **electrolytes** too | Water alone is half a fix |\n| Nerves need those salts | Signals depend on them | Cramps and weakness |\n| Too much water dilutes you | Balance, not volume | A real risk for athletes |\n| A little salt restores both | Why sports drinks exist | Steady sipping works best |\n\n**Up next:** B42 (Rest and Rebuild) -- why muscles grow on your days off!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
