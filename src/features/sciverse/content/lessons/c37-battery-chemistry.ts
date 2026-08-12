import { DialogNode } from '../../types';

export function getC37Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A phone battery is smaller than a chocolate bar, yet it can run a screen, a camera, and a radio all day. **P37** needed an entire mountain lake to store energy -- how does a battery do it in your pocket?\n\nThe secret is that a battery does not store electricity at all. It stores a **chemical reaction** that has not happened yet.\n\nWhat do you think is actually inside a charged battery?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'chemicals', label: "Chemicals that are desperate to react with each other, held apart until you switch the device on.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'electricity', label: "A tank of electricity, filled up when you charge it and emptied as you use it.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It really does feel like filling a tank -- but there is no electricity inside a battery at all!\n\nInside are two different materials that would love to react with each other. The battery keeps them apart, so the reaction cannot happen. It is like holding two magnets apart -- the pull is stored up and ready.\n\nWhen you connect a device, you open the only path they can take. **Electrons** rush from one side to the other **through your device**, and that flow *is* the electricity. Charging pushes them back to where they started.",
            options: [
                { id: 'cont', label: "So the battery stores a reaction, not electricity?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Every battery has the same three parts:\n\n1. **Negative side (anode)** -- the material that gives away **electrons**\n2. **Positive side (cathode)** -- the material that wants to accept them\n3. **Electrolyte** -- a paste or liquid between them that lets charged **ions** cross, but blocks electrons\n\nThat third part is the clever bit. Electrons are **forced to take the long way around** -- out through your phone, doing useful work, and back in the other side. If they could cut straight across, the battery would just heat up and be wasted.\n\nA **rechargeable** battery is one where charging can run the whole reaction **backwards**. A single-use battery cannot -- its reaction only goes one way.\n\nSlide **Battery Charge** and watch the electrons and ions move!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me watch the battery charge and discharge!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Someone leaves their phone in a hot car all summer. By autumn the battery dies twice as fast as it used to, even after a full charge.\n\nWhy did heat damage it?",
            options: [
                { id: 'right', label: "Heat speeds up unwanted side reactions inside, permanently using up some of the chemicals that stored the energy.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The heat melted some of the electricity that was being stored inside the battery.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "There is no electricity inside to melt -- but heat causes real damage in a different way.\n\nHeat makes **all** chemical reactions faster, including the ones you do not want. Inside a hot battery, small amounts of the **electrolyte** break down and crusty deposits build up on the **electrodes**. Those chemicals are used up permanently and can never store energy again.\n\nThis is why the battery still charges but holds less. Some of its chemistry is simply gone. It is also why phones warn you when they overheat, and why electric cars actively **cool** their battery packs.\n\nCold is the opposite problem: it slows the reaction down, so a battery seems weak in winter -- but it recovers once warm.",
            options: [
                { id: 'retry', label: "Oh -- heat permanently uses up the chemicals!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! A battery is chemistry, so **anything that changes chemistry changes the battery**:\n\n- **Heat** speeds up damaging side reactions -- permanent capacity loss\n- **Cold** slows the useful reaction -- temporary weakness only\n- Every charge cycle wears the **electrodes** a tiny bit\n- After a few thousand cycles, the chemistry is worn out\n\nCompare that with **P37 Save It for Later** -- a pumped hydro lake still works perfectly after 50 years, because water and gravity never wear out. Batteries are portable but mortal; mountains are huge but eternal.\n\nYour body faced this same storage problem long ago. See its solution in B37!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A battery is chemistry, so heat wears it out!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered what is really inside a battery!**\n\n- A battery stores a **chemical reaction**, not electricity\n- The **anode** gives up **electrons**; the **cathode** accepts them\n- The **electrolyte** lets **ions** pass but forces electrons through your device\n- That forced detour is what powers your phone\n- **Rechargeable** batteries can run the reaction backwards\n- **Heat** causes permanent damage; **cold** causes temporary weakness\n\nNext in B37: how your own body stores energy for later!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Batteries store reactions waiting to happen!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C37 Complete -- Inside a Battery!**\n\nA battery is a chemical reaction held back until you need it.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| No electricity is stored inside | A **reaction** is stored | Chemistry, not a tank |\n| Electrons take the long way | The **electrolyte** blocks shortcuts | That detour powers devices |\n| Recharging reverses the reaction | Not all batteries can do it | Single-use goes one way |\n| Heat wears batteries out | Side reactions consume chemicals | Never leave phones in hot cars |\n\n**Up next:** B37 (Your Body's Battery) -- how you store energy for later!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
