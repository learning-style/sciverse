import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B6 "How Fish Breathe". The synthesis lesson.
 *
 * B6 followed dissolved oxygen through the gills. This lesson asks the Big
 * Idea's own question of the fish: its body is denser than water, yet it can
 * hover. A swim bladder adds volume without mass, so
 * average density = total mass / total volume -- L2C6's formula again -- and
 * L2P6's balance tells it when it hovers.
 *
 * Condition stated: gas mass counted as zero. Held fixed on purpose, and named
 * at the end: the bladder's size at depth. Gas squashes under pressure, which is
 * Level 3's question.
 */
export function getL2B6Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In B6 you found how fish breathe: their **gills** take the oxygen dissolved in water into their blood.\n\nNow a puzzle that P6 can help with. A fish's muscle and bone have a density of about **1.07 g/cm³**. Fresh water is **1.00 g/cm³**.\n\nBy P6's rule, a fish should sink. Yet many fish can hang perfectly still in the water, neither sinking nor rising, hardly moving a fin.\n\nHow?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "They carry a pocket of gas inside them. Gas adds a lot of volume but almost no mass, which brings the whole fish's density down to match the water's.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "They swim all the time to stay up. A fish that stopped moving would sink to the bottom.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Some fish do work that way. Many **sharks** are a little denser than the water, and slowly sink if they stop swimming.\n\nBut a goldfish in a tank can hang in one spot, fins barely stirring, for minutes on end. Swimming cannot be the whole answer.\n\nThe answer is an organ that B6 did not show: the **swim bladder**. It is a thin bag of **gas** inside the fish's body, just below its backbone.",
            options: [
                { id: 'cont', label: "How does a bag of gas help?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "The swim bladder works through **average density**.\n\nA fish is not made of one material. It is muscle and bone, which are dense, plus a bag of gas, which has hardly any mass at all. What decides whether the **whole fish** floats or sinks is its **average density**: the density of the whole object, from L2P6. It uses the same total-mass-over-total-volume as L2C6's salt water:\n\n**average density = total mass / total volume**\n\nThe condition belongs here: **we count the gas's mass as zero.** That is fair -- a cubic centimetre of gas has a mass of only about 0.001 g. So adding gas **adds volume without adding mass**, and the average density falls.\n\nFrom L2P6, an object whose average density **equals** the water's pushes aside exactly its own weight of water when it is fully under the surface. The forces balance wherever it is in the water, so it **hovers**. Hovering like this is called **neutral buoyancy**.",
            options: [
                { id: 'cont', label: "How much gas does a fish need?", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Take a **1,000 g** fish in **fresh water**, at 1.00 g/cm³.\n\n**Step 1: the volume of its body without any gas.**\nvolume = mass / density = 1,000 / 1.07 = **935 cm³**\n\n**Step 2: the total volume it needs to hover.** For an average density of 1.00 g/cm³:\ntotal volume = 1,000 / 1.00 = **1,000 cm³**\n\n**Step 3: the gas that makes up the difference.**\nswim bladder = 1,000 − 935 = **65 cm³**\n\nThat is **6.5%** of the fish's total volume -- a bag of gas a little bigger than a golf ball.\n\nCheck: average density = 1,000 g / (935 + 65) cm³ = 1,000 / 1,000 = **1.00 g/cm³**. The same as the water, so it hovers.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A **500 g** fish lives in **fresh water**, 1.00 g/cm³. Without gas, its body has a density of **1.07 g/cm³**.\n\nHow much gas must its swim bladder hold for it to hover?",
            options: [
                { id: 'right', label: "About 33 cm³. Its body takes up 500 / 1.07 = 467 cm³; it needs 500 / 1.00 = 500 cm³ in total; 500 − 467 = 33 cm³.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'body', label: "About 467 cm³, because 500 / 1.07 = 467.", nextNodeId: 'math_wrong' },
                { id: 'times', label: "About 35 cm³, because 500 x 1.07 = 535, and 535 − 500 = 35.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**467 cm³** is the volume of the fish's **body**, not of the gas. It is the first step, not the answer. The gas is whatever makes up the difference between the body's volume and the total volume needed.\n\n**35 cm³** is close, but by luck. It multiplied mass by density, and **volume is mass divided by density** (L2P2). A denser body packs its mass into **less** space, so its volume must be less than 500 cm³ -- not 535. Try the same mistake on a much denser body and the luck runs out.\n\nbody volume = 500 / 1.07 = 467 cm³\ntotal needed = 500 / 1.00 = 500 cm³\nswim bladder = 500 − 467 = **33 cm³**",
            options: [
                { id: 'retry', label: "Volume is mass divided by density.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Bladder Volume** is the gas in the swim bladder, in cm³, for a **1,000 g** fish whose body has a density of 1.07 g/cm³. **Water Density** is the density of the water it swims in, in g/cm³ -- from fresh water, **1.000**, to seawater, **1.025**.\n\nThe lab works out the fish's average density and shows whether it **sinks**, **rises** or **hovers**. It counts the fish as hovering when the two densities are within 0.002 g/cm³ of each other.\n\nTry this:\n\n- In fresh water, find the bladder volume that makes it hover -- about **65 cm³**\n- Switch to **seawater** without changing the bladder, and watch what happens\n- Then find the bladder volume that makes it hover in seawater",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Seawater needs less gas. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A 1,000 g fish hovers in the **sea** (1.025 g/cm³) with **41 cm³** of gas in its swim bladder. It swims up a river into **fresh water** (1.000 g/cm³), and its swim bladder stays the same size.\n\nWhat happens to it, and what must it do?",
            options: [
                { id: 'right', label: "It sinks. Its average density is still 1,000 / 976 = 1.025 g/cm³, now more than the river's 1.000. It needs about 24 cm³ more gas -- 65 cm³ in all.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It rises. Fresh water is lighter than seawater, so the fish is pushed up more easily.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "It is the other way round, and L2P6 already showed why: **denser liquid holds things higher**. Fresh water is **less** dense than seawater, so it holds the fish **lower**.\n\n| Water | Density | Fish's average density, 41 cm³ of gas | What it does |\n| --- | --- | --- | --- |\n| Sea | 1.025 g/cm³ | 1,000 / (935 + 41) = 1.025 g/cm³ | **hovers** |\n| River | 1.000 g/cm³ | 1.025 g/cm³ -- unchanged | **sinks** |\n\nThe fish's average density did not change. The **water's** did. To hover in the river, it needs 1,000 − 935 = **65 cm³** of gas: about **24 cm³ more**.",
            options: [
                { id: 'retry', label: "Less dense water, so more gas needed.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A fish hovers by matching its average density to the water's -- and fresh water needs more gas than the sea.**\n\nIts own blood can supply it. A small **gas gland** beside the swim bladder moves gas out of the blood and into the bladder -- the same blood that B6's gills fill with oxygen.\n\nThat completes Big Idea 6 at Level 2, and all three lessons turn on one comparison:\n\n- **L2P6** -- **fraction under water = object density / liquid density**: denser liquid holds things higher\n- **L2C6** -- **density of a solution = total mass / measured volume**: salt makes water denser, up to 1.20 g/cm³\n- **L2B6** -- **average density = total mass / total volume**: gas adds volume without mass, so a fish can match the water\n\n**Why do things float or sink? Because of the average density of the whole object, compared with the density of the liquid around it.**\n\nOne thing this lesson held fixed: the swim bladder stayed the same size whatever the depth. But gas **squashes** when it is pressed, and deeper water presses harder. What that does to a hovering fish is a question for Level 3.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Average density, matched to the water!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found how a fish hovers.**\n\n- A fish's muscle and bone are denser than water, about **1.07 g/cm³**\n- The **swim bladder** is a bag of gas inside the fish\n- **average density = total mass / total volume**\n- Gas adds volume without adding mass (its mass counts as zero)\n- Average density equal to the water's gives **neutral buoyancy**: the fish hovers\n- A 1,000 g fish in fresh water needs **65 cm³** of gas, 6.5% of its volume\n- A 500 g fish in fresh water needs **33 cm³**\n- In seawater (1.025 g/cm³) the 1,000 g fish needs only **41 cm³**\n- A sea fish entering a river **sinks** unless it adds gas\n- A **gas gland** moves gas from the blood into the swim bladder\n- Held fixed at this level: the swim bladder's size at every depth\n\nBig Idea 6 is complete at Level 2.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Gas for volume, no mass!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How a Fish Hovers!**\n\nB6 followed oxygen through a fish's gills. Level 2 asks this Big Idea's question of the fish itself.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Fish body | about 1.07 g/cm³ | Denser than water on its own |\n| Swim bladder | a bag of gas | Volume without mass |\n| Average density | **total mass / total volume** | The whole fish counts |\n| Neutral buoyancy | average density = water density | It hovers |\n| Fresh water | 1,000 − 935 = **65 cm³** | For a 1,000 g fish |\n| Seawater | 975.6 − 935 = **41 cm³** | Denser water, less gas |\n| Sea to river | 1.025 in 1.000 | It sinks unless it adds gas |\n| Big Idea 6 at Level 2 | average density against liquid density | Floating, sorting, hovering |\n\n**The one line to remember:** a fish hovers when its average density matches the water's -- and a bag of gas lets it add volume without adding mass.\n\n**Big Idea 6 is complete at Level 2.**"
        }
    };
}
