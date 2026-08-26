import { DialogNode } from '../../types';

export function getC41Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Two chemicals sit in a beaker, touching each other, and **nothing happens**. Warm them up and suddenly they react.\n\nThe molecules were already bumping into each other billions of times a second before you added heat. So why did those bumps do nothing?\n\nWhat do you think a collision needs in order to actually cause a reaction?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Enough energy in the bump, and the right parts of the molecules meeting -- most collisions have neither.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Every collision causes a reaction, so warming it up just makes more collisions happen.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "There really are more collisions when you heat things -- but that is only a small part of the story.\n\nHere is the surprise: **almost every collision does nothing at all**. In a typical reaction, fewer than **one in a million** bumps actually causes a change. The rest just bounce apart, completely unaffected.\n\nA collision only works if two things happen at once: the molecules must hit **hard enough** to break their existing bonds, and they must hit at the **right angle** so the reacting parts actually meet. Miss either condition and it is a wasted bump.",
            options: [
                { id: 'cont', label: "So most collisions are just wasted bumps?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! A reaction is a **numbers game** -- and this is P41's law of large numbers doing chemistry:\n\n1. Molecules collide **constantly**, billions of times a second\n2. Each collision has a **small chance** of working\n3. Warming the mixture gives molecules more energy, so **more collisions clear the bar**\n4. With so many collisions happening, even a tiny chance adds up to a steady, predictable rate\n\nThat is why a reaction rate is so reliable even though every single collision is a matter of luck. You cannot predict one bump, but you can predict a beaker full of them.\n\nIn the picture each circle is a molecule. **Grey** means it bounced off unchanged. **Red** means that collision had enough energy to react.\n\nSlide **Temperature** and watch the red ones multiply!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me heat it up and watch the lucky collisions!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Milk kept on a warm counter spoils in a day. The same milk in a fridge lasts a week.\n\nWhat is the fridge really doing?",
            options: [
                { id: 'right', label: "Cooling the milk means fewer collisions have enough energy to work, so the spoiling reactions run far more slowly.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The fridge stops the reactions completely, which is why cold milk never spoils.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Cold milk **does** spoil -- just slowly. Leave it in the fridge for a month and you will find out!\n\nCooling does not switch reactions off. It lowers the energy of the molecules, so a **smaller share** of collisions manage to clear the bar. The reactions carry on; they simply happen far less often.\n\nThis is why freezing preserves food even better, and why a chemistry teacher warms a flask to speed a reaction up. Temperature is really a dial on **how many collisions succeed**.",
            options: [
                { id: 'retry', label: "Oh -- cold slows reactions down, it does not stop them!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Temperature is a probability dial.**\n\n- **Warmer** -- molecules move faster, so more collisions clear the energy bar\n- **Cooler** -- fewer collisions succeed, so everything slows down\n- Reactions never truly stop; they just become very rare\n\nThis single idea explains cooking, fridges, freezers, and why your body keeps itself at a steady temperature -- its chemistry is tuned to that exact rate.\n\nIn B41 you will see probability decide something even more personal: which traits get passed on!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Temperature changes the odds, not the rules!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered why reactions need luck!**\n\n- Molecules collide **billions** of times a second\n- Almost every collision does **nothing**\n- A collision must have enough **energy** and the right **angle**\n- Fewer than one in a million bumps may succeed\n- **Warming** raises the share that succeed; **cooling** lowers it\n- Tiny chances add up to a reliable rate -- P41's rule again\n\nNext in B41: how chance decides which traits you inherit!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Reactions are millions of lucky bumps adding up!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C41 Complete -- Lucky Collisions!**\n\nEvery reaction is a huge number of unlikely events adding up to a dependable result.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Most collisions do nothing | They bounce off unchanged | Reactions need luck |\n| A bump needs energy and angle | Both conditions at once | Explains why rates are slow |\n| Warmer means more successes | Temperature is a **probability dial** | Cooking and fridges |\n| Tiny chances still add up | Billions of tries per second | Rates stay predictable |\n\n**Up next:** B41 (Chance and Inheritance) -- how probability decides which traits get passed on!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
