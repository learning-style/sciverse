import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P6 "Density & Buoyancy".
 *
 * P6 gave the float-or-sink rule and named Archimedes' principle. This lesson
 * turns the balance of weight (down) and buoyant force (up) into
 * fraction under water = object density / liquid density.
 *
 * Conditions stated where the formula is built: floating still, whole-object
 * density, liquid density the same all the way down. It also corrects P6's
 * Dead Sea figure: 1.03 g/cm3 is ordinary seawater; the Dead Sea is about 1.24.
 */
export function getL2P6Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In P6 a steel marble sank, a wooden block floated with part of it under water, and a beach ball barely dipped in. The rule was: an object floats if its **density** is less than the liquid's.\n\nBut P6 never said **how much** of a floating object sits under water.\n\nHere is a famous case. An **iceberg** is a huge block of frozen fresh water, floating in the sea. People say you only ever see \"the tip of the iceberg\".\n\nRoughly how much of an iceberg is hidden under the water?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Most of it -- about nine tenths. Ice is only a little less dense than seawater, so it has to sink almost all the way before the water can hold it up.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "About half. Anything that floats sits half in and half out of the water.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Half in, half out is true of only one kind of object: one whose density is exactly **half** the liquid's.\n\nThink back to P6. The beach ball, at 0.05 g/cm³, barely dipped in. The wooden block, at 0.6 g/cm³, sank more than half way. A floating object sinks **until the water can hold it up**, and how far that is depends on how its density compares with the liquid's.\n\nIce is **0.917 g/cm³** -- only a little less dense than seawater, at **1.025 g/cm³**. So an iceberg has to sink almost all the way before the sea can hold it up.\n\nTo find out exactly how far, you need the forces.",
            options: [
                { id: 'cont', label: "Show me the forces.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two forces act on a floating object, and each has a direction.\n\n- **Weight** pulls it **down**. Weight is the pull of gravity: **weight = mass x 9.8 N/kg**, in newtons (N). A 1 kg object weighs 9.8 N.\n- The **buoyant force** pushes it **up**. It is the push of the liquid from below, which you met in P6.\n\nP6 also named **Archimedes' principle**:\n\n**buoyant force = weight of the liquid pushed aside**\n\nThe liquid **pushed aside** -- or **displaced** -- is the liquid that used to fill the space where the object now sits below the surface. Its volume is the object's **volume under water**.\n\nAn object floating **still** is not speeding up or slowing down. From L2P1, that means the forces on it balance:\n\n**buoyant force (up) = weight (down)**\n\nThat is the key idea of this lesson. **A floating object sinks until it has pushed aside its own weight of liquid -- and then it stops.**",
            options: [
                { id: 'cont', label: "Turn that balance into a formula.", nextNodeId: 'formula' }
            ]
        },
        formula: {
            id: 'formula',
            speaker: 'AI',
            content: "Write both weights using density, since **mass = density x volume** (L2P2):\n\n- weight of the object = **object density x whole volume** x 9.8\n- weight of the liquid pushed aside = **liquid density x volume under water** x 9.8\n\nFloating still, these are equal. The 9.8 appears on both sides, so it cancels:\n\nliquid density x volume under water = object density x whole volume\n\nNow divide both sides by the whole volume, and by the liquid density:\n\n**fraction under water = object density / liquid density**\n\nThe **fraction under water** is the volume under water divided by the whole volume. 0.5 means half; 0.9 means nine tenths.\n\nThe conditions belong here. **This is for an object floating still.** The **object density** is the density of the **whole** object, air spaces included -- like a ship's hollow hull. And it treats the **liquid's density as the same all the way down**.",
            options: [
                { id: 'cont', label: "Use it on the block and the iceberg.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**P6's wooden block**: density **0.6 g/cm³**, in fresh water at **1.0 g/cm³**.\n\nfraction under water = 0.6 / 1.0 = **0.6**\n\nSo 60% of the block is under water, and 40% is above.\n\nCheck it another way. Take a block of **1,000 cm³**. Its mass is 0.6 x 1,000 = **600 g**. The part under water is 0.6 x 1,000 = 600 cm³, and 600 cm³ of water has a mass of **600 g**. The block has pushed aside exactly its own mass of water -- so exactly its own weight.\n\n**The iceberg**: ice at **0.917 g/cm³**, in seawater at **1.025 g/cm³**.\n\nfraction under water = 0.917 / 1.025 = **0.89**\n\nAbout **89%** of an iceberg is hidden, and only about **11%** shows -- close to one ninth. The saying is right.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** P6's mystery cube had a density of **0.83 g/cm³**. It floats in fresh water, at **1.0 g/cm³**.\n\nWhat fraction of the cube is under water?",
            options: [
                { id: 'right', label: "0.83 -- that is, 83% under water, because 0.83 / 1.0 = 0.83.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'above', label: "0.17 -- 17% under water, because 1.0 − 0.83 = 0.17.", nextNodeId: 'math_wrong' },
                { id: 'flipped', label: "1.2, because 1.0 / 0.83 = 1.2.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**0.17** is the fraction **above** the water. The formula gives the fraction **under** it: object density / liquid density = 0.83. What is left over, 1 − 0.83 = 0.17, is the part that shows.\n\n**1.2** turned the fraction upside down. A fraction under water can never be more than 1 -- you cannot have more than all of the cube below the surface. **Object density goes in the numerator; liquid density goes in the denominator.**\n\nfraction under water = 0.83 / 1.0 = **0.83**, so **83%** of the cube is under water.",
            options: [
                { id: 'retry', label: "Object density over liquid density.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, both in **g/cm³**.\n\n**Object Density** is the density of the whole floating object. **Liquid Density** is the density of the liquid it sits in.\n\nThe lab floats a block, draws the water line, and works out the fraction under water. It also draws the two forces: the **weight** pulling down and the **buoyant force** pushing up.\n\nTry these liquids:\n\n- Vegetable **oil**, about **0.92 g/cm³**\n- Fresh **water**, **1.00 g/cm³**\n- **Seawater**, **1.025 g/cm³**\n- The **Dead Sea**, about **1.24 g/cm³**\n\nOne correction to P6. It gave salt water as 1.03 g/cm³ when it mentioned floating in the Dead Sea. That is **ordinary seawater**. The Dead Sea is so salty that its density is about **1.24 g/cm³** -- which is why people float so high in it.\n\nFinally, push **Object Density** above **Liquid Density**, and watch what happens.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Denser liquid, higher float. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A ship floats with **8.0 m** of its hull under water in a river of fresh water, **1.000 g/cm³**. It sails out into the sea, **1.025 g/cm³**. Nothing is loaded or unloaded.\n\nTreat the hull as having straight sides, so the depth under water is in proportion to the fraction under water. What happens?",
            options: [
                { id: 'right', label: "It rises a little, to about 7.8 m under water. Its weight is unchanged, so it must push aside the same weight of liquid, and denser seawater needs less volume: 8.0 x 1.000 / 1.025 = 7.8 m.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It sinks deeper. Seawater is heavier than fresh water, so it pulls the ship down further.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Water never pulls a floating ship **down**. The only downward force is the ship's own **weight**, and that has not changed. The water pushes **up**.\n\nFollow the balance:\n\n- Same ship, so the same **weight** pulling down\n- So it needs the same **buoyant force** pushing up -- the same weight of liquid pushed aside\n- A cubic metre of seawater weighs more than a cubic metre of fresh water\n- So **fewer** cubic metres are needed, and less of the hull goes under\n\n| Water | Density | Fraction under, compared with the river | Depth under water |\n| --- | --- | --- | --- |\n| River | 1.000 g/cm³ | 1.000 | **8.0 m** |\n| Sea | 1.025 g/cm³ | 1.000 / 1.025 = 0.976 | 8.0 x 0.976 = **7.8 m** |\n\nThe ship rises by about **20 cm**. **Denser liquid holds things higher.**",
            options: [
                { id: 'retry', label: "Same weight, denser water, less under.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Denser liquid holds a floating object higher, because less of it is needed to match the object's weight.**\n\nIt is why P6's **load line** is really a set of lines. Cargo ships carry separate marks for fresh water, for seawater, and for tropical and winter seas, because the same load sits at a different depth in each. A ship loaded right up to its seawater mark would sit **deeper** once it sailed into a river.\n\nAll of it came from one idea: **a floating object pushes aside its own weight of liquid.**\n\nC6 used differences in density to separate a mixture. L2C6 turns that round, and **makes** a liquid with exactly the density it needs.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Its own weight of liquid!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You worked out how deep things float.**\n\n- **Weight** pulls down: **weight = mass x 9.8 N/kg**, in newtons\n- The **buoyant force** pushes up\n- **Archimedes' principle**: buoyant force = weight of the liquid pushed aside, or **displaced**\n- Floating still, the forces balance: **buoyant force (up) = weight (down)**\n- **fraction under water = object density / liquid density**\n- Conditions: floating still, density of the **whole** object, liquid the same all the way down\n- P6's wooden block: **60%** under water\n- An iceberg: 0.917 / 1.025 = **89%** hidden\n- The fraction under water can never be more than 1\n- A ship moving from river to sea rises about **20 cm** in 8 m\n- Ordinary seawater is **1.025 g/cm³**; the **Dead Sea** is about **1.24 g/cm³**\n\nNext in C6: making a liquid of exactly the density you need.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Object density over liquid density!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Much of an Iceberg Is Hidden?**\n\nP6 said whether things float. Level 2 works out how deep they float.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Weight | **mass x 9.8 N/kg**, down | The pull of gravity |\n| Buoyant force | weight of liquid displaced, up | Archimedes' principle |\n| Floating still | buoyant force = weight | It pushes aside its own weight |\n| How deep | **object density / liquid density** | The fraction under water |\n| Wooden block | 0.6 / 1.0 = **0.6** | 60% under |\n| Iceberg | 0.917 / 1.025 = **0.89** | 89% hidden |\n| River to sea | 8.0 x 1.000 / 1.025 = **7.8 m** | Denser liquid, higher float |\n| Dead Sea | about **1.24 g/cm³** | Not 1.03, which is ordinary seawater |\n\n**The one line to remember:** a floating object sinks until it has pushed aside its own weight of liquid -- so the fraction under water is its density divided by the liquid's.\n\n**Up next:** C6 -- making a liquid dense enough to sort plastic."
        }
    };
}
