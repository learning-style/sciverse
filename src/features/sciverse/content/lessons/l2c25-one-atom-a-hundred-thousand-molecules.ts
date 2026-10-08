import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 25, chemistry.
 *
 * C25 said that chain reactions multiply effects through propagation steps, with
 * amplification, thresholds and inhibitors, and never counted anything. The number
 * it is missing is the one the whole idea turns on:
 *
 *   chain length = 1 / (chance of being stopped each cycle)
 *   molecules destroyed = carriers x chain length
 *
 * A chain reaction here means the precise thing: the reactive piece that does the
 * damage is HANDED BACK at the end of each cycle, so it can do it again. One
 * chlorine atom in the stratosphere destroys of order 100,000 ozone molecules before
 * something locks it away -- stated as an order-of-magnitude figure, because that is
 * what it is.
 *
 * The shape is a RECIPROCAL, which is where the Big Idea's question is answered: a
 * carrier that is a little harder to stop is a lot more destructive, and a trace of
 * gas at parts per trillion reaches a planetary layer because the effect is
 * multiplied by the chain length rather than added to.
 *
 * This chains to L2P25: there an error was multiplied by 2 many times, here a
 * carrier does its job many times, and in both the NUMBER of times decides the size
 * of the effect rather than the size of each step.
 *
 * Frame of reference stated: a cycle is one pass in which the carrier destroys one
 * ozone molecule and is handed back, and the chance of being stopped is per cycle.
 *
 * Boundary with other Big Ideas: the chain length is 25's business. How much of a
 * pollutant is in the air, and what it does to breathing, belong to Big Ideas 10
 * and 32.
 *
 * Still standing: the chance of being stopped is treated as a fixed property of the
 * carrier, when it really depends on what else is up there -- so the chain length is
 * not a constant. L3C25 removes that, and finds a threshold hiding behind it.
 */
export function getL2C25Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C25 used the words **chain reaction**, **propagation** and **amplification**, and never counted a single thing. So here is the count, because this is one of those ideas that means nothing until you have the number.\n\nFirst, what makes a reaction a **chain reaction**. It is not just that one thing leads to another. It is that the reactive piece doing the damage is **handed back at the end**, unchanged, ready to do exactly the same thing again. That piece is called the **carrier**.\n\nThe example worth knowing is happening above you. High up, in the layer called the **stratosphere**, there is **ozone** -- a molecule of three oxygen atoms joined together -- and it absorbs **ultraviolet** light, the part of sunlight that burns skin.\n\nA single **chlorine** atom up there does this:\n\n1. it takes one oxygen atom off an ozone molecule, wrecking it\n2. it hands that oxygen on to something else\n3. **and it is chlorine again**, exactly as it started\n\nSo it goes round. And round. One **cycle** is one pass: one ozone molecule destroyed, one carrier handed back.\n\nIt only stops when the carrier is **terminated** -- locked up in a stable molecule that will not let it go. That does not happen on a schedule; it happens by chance, and rarely.\n\nYour two dials are the two things that decide the damage.\n\n- **Chance of Being Stopped** -- how often a cycle ends with the carrier terminated instead of handed back, written as *1 in so many cycles*.\n- **Chlorine Atoms** -- how many carriers there are to begin with.\n\nSo, before any arithmetic. Suppose a carrier is stopped on just **1 cycle in 100,000**. How many ozone molecules does one chlorine atom wreck?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'one', label: "One. It is one atom, so it wrecks one molecule.", nextNodeId: 'misconception' },
                { id: 'many', label: "About 100,000 -- it keeps going until it is stopped.", nextNodeId: 'defining', sentiment: 'positive' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is the right answer for almost every reaction you have met, and it is exactly the thing a chain reaction breaks.\n\nIn an ordinary reaction, the pieces are **used up**. Burn a gram of magnesium and you have a gram of magnesium's worth of ash and no magnesium left. One atom in, one atom's worth of product out. The books balance.\n\nIn a chain reaction the carrier is **not used up**. Look again at step 3: *it is chlorine again, exactly as it started*. Nothing has been spent. The ozone molecule is gone, and the chlorine atom is standing there ready to go again.\n\nSo the question *how much damage does one atom do?* has a completely different kind of answer. It is not set by how many atoms there are. **It is set by how long each one lasts**, and if it is only stopped once in 100,000 cycles, then on average it gets 100,000 cycles.\n\n**One atom, a hundred thousand molecules.** And that is why a gas present at a few parts in a trillion can reach a layer of the whole planet.",
            options: [
                { id: 'cont', label: "So how do I work out how long it lasts?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "The **chain length** is how many cycles a carrier gets through before it is terminated, and it is the reciprocal of the chance of being stopped:\n\n**chain length = 1 / (chance of being stopped each cycle)**\n\nIf the carrier is stopped on 1 cycle in 100,000, the chain length is **100,000**. If it is stopped on 1 cycle in 100, the chain length is **100**.\n\nIt is worth seeing why that is a division rather than anything cleverer. If a thing happens once in every 100,000 tries, then you expect to wait about 100,000 tries for it -- the same reason a dice that comes up six once in six rolls takes about six rolls. **A rare event's waiting time is one over how rare it is.**\n\nThis holds while the chance stays the **same on every cycle**, which is what *by chance, and rarely* means. A carrier that got steadily more fragile as it worked would need different arithmetic.\n\nThen the total damage is just that, times how many carriers you have:\n\n**ozone destroyed = carriers x chain length**\n\nAnd now look at the shape of the first formula, because this is the part that answers the Big Idea's question. The chain length is **one over** the stopping chance. So making a carrier **a little** harder to stop makes it **a lot** more destructive: halve the chance of stopping it and you **double** the damage. A reciprocal turns a small change into a large one, which is exactly what we came here to understand.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me it on real numbers.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A worked example.** A chlorine atom is terminated on about **1 cycle in 100,000**.\n\nThe chain length:\n\n1 / (1 in 100,000) = **100,000 cycles**\n\nSo one atom destroys about **100,000 ozone molecules**. That figure is a rough one -- the real estimate is somewhere around a hundred thousand, and nobody can give you three decimal places on it, so this lesson will keep saying *about*.\n\nNow put in a realistic number of carriers. Suppose a patch of stratosphere has picked up **1000** chlorine atoms from a **chlorofluorocarbon (CFC)** -- the gas that used to be in fridges and spray cans, and which breaks apart up there to release its chlorine.\n\n1000 x 100,000 = **100,000,000 ozone molecules**\n\nA hundred million, from a thousand atoms.\n\n**Now the reciprocal, and why it matters.** Suppose the chlorine were only terminated on 1 cycle in **200,000** -- half as likely to be stopped:\n\nchain length = **200,000**, and 1000 atoms destroy **200,000,000**\n\n**Halving the chance of stopping it doubled the damage.** Nothing about the amount of CFC changed, nothing about the number of atoms changed. The only change was how easily the carrier is stopped, and the damage doubled -- which is why chemists care so much about the termination step, a step that destroys nothing and makes nothing.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. A carrier is terminated on **1 cycle in 1000**, and there are **500** carriers.\n\nHow many ozone molecules are destroyed?",
            options: [
                { id: 'fivehundredk', label: "500,000", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'fivehundred', label: "500", nextNodeId: 'math_wrong' },
                { id: 'half', label: "0.5 — because 500 divided by 1000", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two steps, and the first one is the one that catches people.\n\n- the chain length: 1 / (1 in 1000) = **1000 cycles**\n- the damage: 500 carriers x 1000 = **500,000 molecules**\n\n500 is the answer you get if each carrier wrecks one molecule, which is the ordinary-reaction answer -- and the whole point is that a carrier is **handed back**, so it does not wreck one and stop.\n\nAnd 0.5 is the stopping chance being used as a **multiplier** instead of being turned upside down. That one is worth being careful about, because it goes wrong in a way that looks plausible: it gives an answer smaller than the number of carriers, when a chain reaction can only ever give you **more** damage than carriers. **If your chain answer is smaller than the number of carriers, you divided the wrong way round.**",
            options: [
                { id: 'retry', label: "Turn the chance upside down first.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. One carrier is drawn going round its cycle, with the ozone it has wrecked counted up beside it.\n\nThings worth doing:\n\n- Put **Chance of Being Stopped** at 1 in 100 and watch the count. Now move it one step, to 1 in 1000. The count goes up **ten times** for one step of the dial -- that is the reciprocal doing its work.\n- Walk it all the way to 1 in 1,000,000 with a single carrier. **One atom, a million molecules.**\n- Now try to get the same damage by adding carriers instead. With the chance at 1 in 100, how many carriers do you need to match **one** carrier at 1 in 1,000,000? Ten thousand of them. **Making the carrier harder to stop beats having more carriers, every time.**\n- Put both dials at their smallest. Even then one carrier stopped once in a hundred cycles wrecks a hundred molecules, which is still a hundred times the ordinary-reaction answer.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "In the 1980s, countries had to decide what to do about the ozone layer. Two proposals:\n\n**A.** Release something into the stratosphere that **mops up chlorine atoms** -- cutting the chain length by terminating carriers sooner.\n\n**B.** **Stop making CFCs**, so that no new chlorine arrives.\n\nBoth would help. The world chose **B**, and wrote it into the Montreal Protocol. Using this lesson's arithmetic, what is the strongest argument for B over A?\n\n(Both dials are in the formula, so this is not a trick -- it is about which one you can actually move far.)",
            options: [
                { id: 'carriers', label: "Carriers can be cut to nearly zero, while the chain length can only ever be cut by a factor you can achieve — and each atom already does 100,000 molecules of damage before you start.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'chain', label: "A is better — the reciprocal means a small change in the stopping chance has a huge effect.", nextNodeId: 'checkpoint_wrong' },
                { id: 'same', label: "They are identical, because the two numbers are multiplied together.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The two dials are multiplied, so the formula alone does treat them the same. The difference is **how far each one can actually be moved**, and that is not in the formula.\n\n**Carriers** can go to nearly **zero**. Stop manufacturing CFCs and in time almost no new chlorine arrives at all -- the whole first factor collapses, and the chain length no longer matters because there is nothing to multiply.\n\n**Chain length** cannot be collapsed that way. To halve the damage you would have to make every carrier **twice** as easy to terminate, everywhere in the stratosphere, and even if you managed it each atom would still wreck 50,000 molecules. You would be fighting a reciprocal from the wrong end: the chain length is already enormous, and cutting a huge number in half leaves a huge number.\n\nSo the second answer gets the reciprocal right and points it the wrong way. A small change in the stopping chance does have a large effect -- which is exactly why you should be alarmed that it is 100,000 rather than hopeful that you can fix it.\n\n**When an effect is a product of two factors, attack the one you can take to zero.**",
            options: [
                { id: 'retry', label: "Attack the factor you can zero.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly, and that is the reasoning behind a treaty.**\n\nThe damage is **carriers x chain length**. The chain length was handed to us by chemistry at about 100,000 and is not really ours to change. The number of carriers was entirely ours -- it was coming out of factories -- so that is the factor that could be taken to nearly zero.\n\nAnd it worked. CFC production was stopped, and the ozone layer is slowly recovering, which is one of the few environmental problems humanity has genuinely turned around.\n\nIt is also worth seeing what this lesson shares with **L2P25**. There, an error was multiplied by 2, over and over, and what decided the size of the disaster was **how many times**. Here a carrier does its job over and over, and what decides the size of the damage is again **how many times**. Neither answer had anything to do with how big one step was.\n\n**A tiny cause becomes a big effect by being multiplied repeatedly -- so the question is always how many repeats, not how big the cause.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "How many repeats, not how big!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You counted a chain reaction.**\n\n- A **chain reaction** is one where the **carrier** -- the reactive piece doing the damage -- is **handed back** unchanged at the end of each **cycle**, so it is never used up\n- That breaks the ordinary one-atom-one-molecule bookkeeping completely. The damage is set by **how long each carrier lasts**, not by how many there are\n- **chain length = 1 / (chance of being stopped each cycle)**, while that chance is the same on every cycle. A rare event's waiting time is **one over how rare it is**\n- Stopped on 1 cycle in 100,000, a chlorine atom destroys about **100,000** ozone molecules. An order-of-magnitude figure, and the lesson says so\n- **ozone destroyed = carriers x chain length.** A thousand atoms wreck about **100,000,000** molecules\n- The chain length is a **reciprocal**, so **halving** the chance of stopping a carrier **doubles** the damage. A small change in the hardest step to notice makes a large change in the outcome\n- Which is why a gas at **a few parts in a trillion** can reach a layer of the whole planet. The effect is **multiplied**, not added\n- If your chain answer is **smaller** than the number of carriers, you divided the wrong way round -- a chain can only ever give you more\n- **Making the carrier harder to stop beats having more carriers**: one carrier at 1 in a million matches ten thousand carriers at 1 in a hundred\n- And the decision that followed: the damage is a **product of two factors**, and the world attacked the one it could take to **zero**. CFCs were stopped rather than chlorine mopped up, and the ozone layer is recovering\n- **Same shape as L2P25.** There an error was doubled many times; here a carrier works many times. In both, the size of the effect came from **how many repeats**, and not from how big one step was\n- **Still standing:** the chance of being stopped was treated as a fixed property of the carrier. It is not -- it depends on what else is up there to terminate it, so the chain length changes with conditions rather than being a constant. And nothing here asks what happens if a cycle hands back **more than one** carrier. **L3C25 removes both, and there is a threshold hiding behind the second one.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2C25", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Chemistry Complete -- How Can Tiny Changes Cause Big Effects?**\n\nC25 said a chain reaction amplifies. This says by how much, and the answer turned out to be a reciprocal.\n\n**Summary Table:**\n| | C25 said | L2C25 says |\n| --- | --- | --- |\n| What makes it a chain | propagation steps | the **carrier is handed back**, never used up |\n| The formula | -- | **chain length = 1 / stopping chance** |\n| The damage | amplification | **carriers x chain length** |\n| One chlorine atom | -- | about **100,000** ozone molecules |\n| A thousand atoms | -- | about **100,000,000** molecules |\n| The shape | -- | a **reciprocal**: halve the stopping chance, double the damage |\n| Why a trace gas matters | -- | the effect is **multiplied**, not added |\n| Which factor to attack | thresholds and inhibitors | the one you can take to **zero** -- so stop the CFCs |\n| Against L2P25 | -- | both are **repeated multiplication**: how many repeats, not how big |\n\n**The one line to remember:** a carrier that is handed back does its damage once per cycle for as many cycles as it survives, so the chain length is one over the chance of stopping it -- and that reciprocal is how a few parts in a trillion reach a layer of the whole sky.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
