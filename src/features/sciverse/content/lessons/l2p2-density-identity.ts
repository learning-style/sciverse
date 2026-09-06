import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P2 "States of Matter".
 *
 * P2's key insight was that the particles do not change between states -- only
 * their spacing does. This lesson puts a number on that spacing: density.
 *
 * Deliberately framed around IDENTIFYING a substance rather than predicting
 * whether it floats. Big Idea 6 is "Why Do Things Float or Sink?" and owns
 * buoyancy; if both used density for the same job the two would read as one
 * lesson written twice.
 */
export function getL2P2Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In P2 you found something easy to miss. When ice melts into water, the particles do **not** change. Same particles, same number, same size. Only their **spacing** changes.\n\nSo here is a question that sounds impossible.\n\nSomeone hands you a small grey block. No label. You may not cut it, scratch it or melt it. You have a balance and a measuring jug.\n\n**What is it made of?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Weigh it, measure the space it takes up, and compare those two numbers -- how tightly packed it is should be a clue to what it is.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "You cannot tell. Mass depends on how big the block is, so a big piece of a light material could weigh the same as a small piece of a heavy one.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Everything in that objection is true, and it is exactly the problem worth solving.\n\nA plank of oak really can outweigh a bolt of iron. Mass on its own tells you **how much stuff is there**, not **what the stuff is**.\n\nBut you have met this shape of problem before. In L2C1 a bathtub and a cup of water had wildly different heat capacities, and the fix was to divide the size out and quote a value **per gram**. In L2P49 the total energy of a mine told you nothing until it was divided by the metal produced.\n\nSame move here. Mass alone is useless and volume alone is useless, because both depend on how big your lump happens to be.\n\n**Divide one by the other and the size cancels.** What is left describes the material itself.",
            options: [
                { id: 'cont', label: "So divide the mass by the volume?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Exactly. That ratio is called **density**:\n\n**density = mass / volume**, usually written **ρ = m/V**\n\n**ρ** is the Greek letter *rho*. Mass is in **grams (g)**, volume in **cubic centimetres (cm³)**, so density comes out in **grams per cubic centimetre (g/cm³)**.\n\nIt answers one question: **how much mass is packed into each cubic centimetre?**\n\nAnd here is why it identifies a material. Take any pure substance, cut it into pieces of any size you like, and every piece has the **same density**. A gold ring and a gold bar both come to 19.3 g/cm³. Double the volume and you double the mass, so the ratio never moves.\n\nDensity is a **property of the substance**, not of the lump. That is precisely what a fingerprint needs to be.\n\nSome to recognise:\n\n| Material | Density (g/cm³) |\n| --- | --- |\n| Oak | 0.75 |\n| Ice | 0.92 |\n| Water | 1.00 |\n| Aluminium | 2.70 |\n| Iron | 7.87 |\n| Lead | 11.34 |\n| Gold | 19.30 |",
            options: [
                { id: 'cont', label: "What does this have to do with P2's particles?", nextNodeId: 'packing' }
            ]
        },
        packing: {
            id: 'packing',
            speaker: 'AI',
            content: "Everything, and it explains why the number differs at all.\n\nP2 told you the particles stay the same. So if two lumps of the same size have different masses, the difference must come from **how many particles are crammed into that space** -- and how heavy each particle is.\n\nThat is what density measures: **packing**.\n\nWatch it across the three states of the very same substance:\n\n- **Ice: 0.92 g/cm³** -- particles locked in a pattern\n- **Liquid water: 1.00 g/cm³** -- particles touching, but sliding\n- **Steam at 100 °C: 0.0006 g/cm³** -- particles flying apart\n\nIdentical particles in all three. Only the spacing changes, exactly as P2 said.\n\nAnd look at the size of that last jump. Water is about **1,700 times** denser than steam, which means the same particles are spread through 1,700 times the volume. Almost all of a gas is empty space.\n\nOne oddity worth noticing while it is in front of you. **Ice is less dense than liquid water** -- 0.92 against 1.00 -- so water is one of very few substances that expands when it freezes. Nearly everything else contracts. That single fact is why pipes burst in winter, and Big Idea 6 will come back to what it means for a pond.",
            options: [
                { id: 'try', label: "Let me identify something.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A block has a mass of **216 g**. Lowered into a measuring jug, it raises the water level by **80 cm³**, so that is its volume.\n\nWhat is its density, and what is the block most likely made of?",
            options: [
                { id: 'right', label: "2.70 g/cm³, so it is almost certainly aluminium. 216 / 80 = 2.70.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'inverted', label: "0.37 g/cm³, from 80 / 216, so it is lighter than water.", nextNodeId: 'math_wrong' },
                { id: 'multiplied', label: "17,280 g/cm³, from 216 x 80.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both mistakes are caught by the same habit: **read the unit before you calculate.**\n\nDensity is measured in **grams per cubic centimetre**. The word **per** is an instruction -- it means *divided by*, and it tells you which quantity goes in the numerator and which in the denominator. **Grams** per **cubic centimetre**: grams on top, cm³ underneath.\n\n**0.37** is 80 / 216, which is cm³ per gram. That is a real quantity, but it answers a different question -- how much room each gram takes up -- and it is not what the table lists.\n\n**17,280** comes from multiplying, which no unit anywhere supports. It is also worth a sense check: it would make the block nearly a thousand times denser than gold.\n\n216 g / 80 cm³ = **2.70 g/cm³**, which matches **aluminium** exactly.\n\nThat is the whole method, and it is genuinely how a material gets identified: measure a mass, measure a volume, divide, and look the answer up.",
            options: [
                { id: 'retry', label: "\"Per\" means divided by -- grams on top.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, and between them they let you test any lump you like.\n\n**Mass** is what the balance reads, in grams.\n**Volume** is the space it takes up, in cubic centimetres.\n\nThe lab divides one by the other and tells you which material on the table it matches.\n\nTry this deliberately. Pick a density -- say aluminium's 2.70 -- and then find **several different pairs** of mass and volume that give it. 27 g in 10 cm³. 270 g in 100 cm³. 54 g in 20 cm³.\n\nAll different lumps. All the same material. **That is what makes density usable as a fingerprint** -- the size cancels, so the answer describes the substance and nothing else.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Same density, different lumps. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A dealer offers you a bar he says is **solid gold**.\n\nYou weigh it: **500 g**. You measure its volume by displacement: **40 cm³**.\n\nGold's density is **19.30 g/cm³**.\n\nWhat can you conclude?",
            options: [
                { id: 'right', label: "It is not solid gold. Its density is 500 / 40 = 12.5 g/cm³, far below gold's 19.30, so it must be something else or gold mixed with a lighter metal.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It could still be solid gold -- 500 g is a perfectly reasonable mass for a small gold bar.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "500 g **is** a reasonable mass for a gold bar. That is exactly what makes the trick work -- the mass alone raises no suspicion at all.\n\nBut you were given two numbers, and the second one settles it.\n\n500 g / 40 cm³ = **12.5 g/cm³**\n\nGold is **19.30 g/cm³**. Not close. And density does not depend on the size of the piece, so \"it is only a small bar\" cannot rescue it -- a small bar of gold has exactly the same density as a large one.\n\nSo whatever this is, it is not solid gold. At 12.5 g/cm³ it is denser than lead's 11.34 and much lighter than gold, which is what you would expect from gold mixed with a cheaper metal, or from a gold-plated core of something else.\n\nWork out what the true volume of 500 g of gold would be: 500 / 19.30 = **25.9 cm³**. The bar is 40 cm³. It is **half as big again** as real gold of that mass -- visibly, measurably too large.\n\nThis is not a made-up puzzle. It is essentially what Archimedes was asked to do about a crown, and it remains a standard test today, because **density is very hard to fake**. You would have to match both the mass and the volume at once.",
            options: [
                { id: 'retry', label: "The volume gives it away -- it is too big for its mass.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Density identifies a material because dividing removes the size.**\n\nThat is the third time you have seen this move, and it is worth naming as a technique rather than a trick:\n\n- **L2C1:** energy per gram per °C, so a bathtub and a cup could be compared\n- **L2P49:** energy per kilogram of metal, so a rich mine and a poor one could be compared\n- **L2P2:** mass per cubic centimetre, so a ring and a bar can be compared\n\n**Whenever a quantity depends on how much of something you happen to have, divide by the amount and the answer starts describing the substance instead.**\n\nDensity also connects straight back to P2's particle picture. A high density means heavy particles, tightly packed, or both. Steam is barely there because its particles are 1,700 times more spread out than the same particles in water.\n\nNext, C2 asks the obvious follow-up. If density depends partly on **how heavy each particle is** -- what does one atom actually weigh?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Divide by the amount and you describe the substance!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You turned two measurements into an identification.**\n\n- Mass alone tells you how much; volume alone tells you how big\n- **density = mass / volume**, **ρ = m/V**, in **g/cm³**\n- **Per** means divided by, and names the numerator and denominator for you\n- Density is a property of the **substance**, not of the lump -- the size cancels\n- Every piece of pure gold is **19.30 g/cm³**, ring or bar\n- Measure a mass, measure a volume, divide, look it up\n- Density measures **packing**: how much mass sits in each cubic centimetre\n- Same particles, different spacing: **ice 0.92**, **water 1.00**, **steam 0.0006 g/cm³**\n- Water is about **1,700 times** denser than steam -- a gas is nearly all empty space\n- Ice is **less** dense than water, which is why pipes burst\n- A 500 g bar in 40 cm³ is 12.5 g/cm³, so it is not gold\n\nNext in C2: what a single atom weighs, and how to add them up.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "ρ = m/V, and the size cancels!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- What Is It Made Of?**\n\nP2 said the particles stay the same and only the spacing changes. Density is the number that measures that spacing -- and it turns out to be a fingerprint.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Mass alone is not enough | oak plank vs iron bolt | It depends on how big the piece is |\n| Density | **ρ = m/V**, in **g/cm³** | Mass packed into each cm³ |\n| \"Per\" is an instruction | grams **per** cm³ | Grams on top, cm³ underneath |\n| Size cancels | ring = bar = 19.30 | A property of the **substance** |\n| Identifying | measure, divide, look up | 216 g in 80 cm³ is aluminium |\n| Packing across states | 0.92, 1.00, 0.0006 | Same particles, different spacing |\n| A gas is mostly nothing | water is **1,700x** steam | Almost all empty space |\n| Spotting a fake | 500 g in 40 cm³ = 12.5 | Gold is 19.30, so it is not gold |\n\n**The one line to remember:** divide by the amount you happen to have, and what is left describes the substance itself.\n\n**Up next:** C2 -- what a single atom weighs, and why a molecule's mass is just addition."
        }
    };
}
