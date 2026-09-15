import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 10, chemistry.
 *
 * L2C10 held that all the CO2 released stays in the air. This removes that
 * simplification by checking it against the air itself. ppm counts molecules;
 * with L3C2's mole, the whole atmosphere (5.15 x 10^18 kg, 29 g/mol) makes
 * 1 ppm of CO2 = about 7.8 billion tonnes. A rise of 2.5 ppm a year is 19.5
 * billion tonnes of the 40 released: an airborne fraction of about half.
 *
 * Frame of reference stated: ppm is a share by number of molecules, not by
 * mass. Condition stated: CO2 mixed evenly through the atmosphere. The
 * checkpoint follows the ocean's share into acidification. Still standing: the
 * sinks' share is not fixed.
 */
export function getL3C10Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C10 worked out the CO₂ made by burning, and named what it held fixed: **all of that CO₂ stays in the air**. Now check it.\n\nPeople release about **40 billion tonnes** of CO₂ a year, from burning fuels and from clearing forests.\n\nScientists measure the CO₂ in the air in **parts per million, ppm**: how many CO₂ molecules there are in every million molecules of air. Today it is about **420 ppm**, and it rises by about **2.5 ppm** each year.\n\nIs that yearly rise of 2.5 ppm all 40 billion tonnes?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "I can't tell yet. First I need to turn ppm into tonnes: the mass of CO₂ that 1 ppm of the whole atmosphere stands for.", nextNodeId: 'ppm', sentiment: 'positive' },
                { id: 'bad', label: "It must be. CO₂ cannot vanish, so everything released has to be in the air.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "CO₂ cannot vanish -- that part is right. But it can **move** out of the air.\n\nThe air touches the ocean over most of the planet, and CO₂ **dissolves** in seawater, the way it does in a fizzy drink. And every growing plant, like L2C10's tree, pulls CO₂ out of the air and builds its carbon into wood and leaves.\n\nSo the air is not a sealed jar. It is more like a bath with the plug partly out. Water pours in from the tap, some drains away, and the level rises by less than the tap delivers.\n\nThe rise in the air is measured, and so is what people release. To compare them, both must be in the same units.",
            options: [
                { id: 'cont', label: "Turn ppm into tonnes.", nextNodeId: 'ppm' }
            ]
        },
        ppm: {
            id: 'ppm',
            speaker: 'AI',
            content: "**ppm** counts **molecules**: 420 ppm means 420 CO₂ molecules in every million molecules of air. That is the frame of reference -- a share by **number**, not by mass.\n\nSo to turn 1 ppm into tonnes, count the molecules in the whole atmosphere using L3C2's **mole**. The **molar mass** of a substance is the mass of one mole, in g/mol, equal to its formula mass.\n\n**Step 1. Moles of air.** The whole atmosphere has a mass of about **5.15 x 10¹⁸ kg**, which is 5.15 x 10²¹ g. Air is a mixture, mostly nitrogen and oxygen, with an average molar mass of about **29 g/mol**.\n\nmoles of air = 5.15 x 10²¹ g / 29 g/mol = **1.78 x 10²⁰ mol**\n\n**Step 2. Moles of CO₂ in 1 ppm.** One millionth of all the molecules:\n\n1.78 x 10²⁰ / 10⁶ = **1.78 x 10¹⁴ mol**\n\n**Step 3. Mass of that CO₂.** CO₂'s molar mass is 44 g/mol:\n\n1.78 x 10¹⁴ mol x 44 g/mol = **7.8 x 10¹⁵ g**\n\nA tonne is 10⁶ g, so that is 7.8 x 10⁹ tonnes:\n\n**1 ppm of CO₂ = about 7.8 billion tonnes**\n\nThe condition belongs here. **This treats the CO₂ as mixed evenly through the whole atmosphere.** Winds mix it around the planet within a year or two, which is why a few clean-air stations, such as Mauna Loa in Hawaii, can measure the whole planet's CO₂.",
            options: [
                { id: 'cont', label: "Now check how much stays in the air.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "**Step 1. Tonnes that stayed in the air in a year:**\n\n2.5 ppm x 7.8 billion tonnes for each ppm = **19.5 billion tonnes**\n\n**Step 2. The share that stayed:**\n\n19.5 / 40 = **0.49**\n\nThis share has a name, the **airborne fraction**:\n\n**airborne fraction = CO₂ that stays in the air / CO₂ released**\n\n**Step 3. Where did the rest go?**\n\n40 − 19.5 = **20.5 billion tonnes** a year were taken out of the air by **sinks**: places that take up more CO₂ than they give out. Roughly a quarter of the CO₂ released dissolves into the **oceans**, and most of the rest is taken up by **plants and soils** on land.\n\n| | Billion tonnes of CO₂ a year | Share of what was released |\n| --- | --- | --- |\n| Released | 40 | 1 |\n| Stayed in the air | 19.5 | about **half** |\n| Taken up by oceans and land | 20.5 | about **half** |\n\nIf all of it had stayed, the air's CO₂ would rise by 40 / 7.8 = **5.1 ppm** a year -- about twice as fast as it does.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** In the 1990s, people released about **28 billion tonnes** of CO₂ a year, and the CO₂ in the air rose by about **1.5 ppm** a year.\n\nWhat was the airborne fraction?",
            options: [
                { id: 'right', label: "About 0.42. 1.5 ppm x 7.8 billion tonnes = 11.7 billion tonnes stayed, and 11.7 / 28 = 0.42.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'units', label: "About 0.054, because 1.5 / 28 = 0.054.", nextNodeId: 'math_wrong' },
                { id: 'by_mass', label: "About 0.28, because 1 ppm of the atmosphere's 5.15 x 10¹⁸ kg is 5.15 billion tonnes, and 1.5 x 5.15 / 28 = 0.28.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**0.054** divided ppm by billions of tonnes. Those are different units, so the numbers cannot be compared until ppm is turned into tonnes.\n\n**0.28** treated ppm as a share by **mass**: one millionth of the atmosphere's mass. But ppm counts **molecules**. A CO₂ molecule (44 g/mol) is heavier than an average air molecule (29 g/mol), so a millionth of the molecules has more than a millionth of the mass: 7.8 billion tonnes, not 5.15.\n\n**Step 1.** CO₂ that stayed = 1.5 ppm x 7.8 billion tonnes = **11.7 billion tonnes**\n\n**Step 2.** airborne fraction = 11.7 / 28 = **0.42**",
            options: [
                { id: 'retry', label: "Turn ppm into tonnes first.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, using **7.8 billion tonnes of CO₂ for each ppm**.\n\n**CO₂ Released** is what people release in a year, in billion tonnes. **Rise in the Air** is how much the CO₂ in the air goes up that year, in ppm.\n\nThe lab turns the rise into tonnes, and splits what was released into the part that stayed in the air and the part the sinks took up.\n\nTry this:\n\n- Set **40** and **2.5 ppm**: about half stays\n- Raise **Rise in the Air** to **5.1 ppm**: everything stays, and the sinks take up nothing\n- Push it higher still. More would be staying than was released, so the sinks would have to be **giving out** CO₂ -- the lab shows that as a negative uptake",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "About half stays. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** The oceans take up roughly a quarter of the CO₂ people release.\n\nDoes that make the ocean a harmless place for the CO₂ to go?",
            options: [
                { id: 'right', label: "No. CO₂ dissolving in seawater forms a weak acid, carbonic acid, and makes the ocean more acidic. That makes it harder for corals and sea snails to build their shells and skeletons.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. Once the CO₂ is in the water, it is out of the air, so it does no harm.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Out of the air is not the same as gone. The CO₂ reacts with the water:\n\n**CO₂ + H₂O → H₂CO₃**, carbonic acid\n\nThat is the same weak acid that gives fizzy water its sharp taste. Surface seawater today is about **30% more acidic** than it was in the 1800s.\n\n| Where the CO₂ goes | What it does there |\n| --- | --- |\n| Stays in the air | Traps heat, as in C10 |\n| Dissolves in the ocean | Makes seawater more acidic |\n| Taken up by plants and soils | Stored, for as long as they last |\n\nCorals, sea snails and tiny shelled plankton build their shells and skeletons from minerals that are harder to form in more acidic water. The ocean sink slows warming, but it has a cost of its own.",
            options: [
                { id: 'retry', label: "Out of the air is not gone.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **About half the CO₂ released stays in the air. The ocean takes up about a quarter -- and turns more acidic -- and land takes up most of the rest.**\n\nHere is the simplification this lesson removed. **L2C10 held that all the CO₂ released stays in the air.** Measuring the air and turning ppm into tonnes shows that only about half does: an airborne fraction of about **0.5**.\n\nAnd the simplification still standing. **This lesson treated the airborne fraction as fixed at about half.** It is not guaranteed. Warmer water holds less dissolved gas, so a warming ocean takes up CO₂ less easily. Droughts and forest fires weaken the land sink -- which is why the CO₂ in the air rises faster in hot, dry years.\n\nL3B10 asks what happens to living things as their habitat shrinks.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Only half stays in the air!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found where the CO₂ goes.**\n\n- **ppm** counts molecules: CO₂ molecules in every million molecules of air\n- Atmosphere: **5.15 x 10¹⁸ kg**, average molar mass **29 g/mol**, so **1.78 x 10²⁰ mol** of air\n- 1 ppm = 1.78 x 10¹⁴ mol of CO₂ x 44 g/mol = **7.8 billion tonnes** of CO₂\n- Condition: CO₂ mixed evenly through the atmosphere\n- **airborne fraction = CO₂ that stays in the air / CO₂ released**\n- 2.5 ppm x 7.8 = 19.5 billion tonnes of 40: about **half** stays\n- **Sinks**: oceans take about a quarter, land most of the rest\n- If it all stayed, the rise would be **5.1 ppm** a year\n- 1990s: 1.5 ppm x 7.8 / 28 = **0.42**\n- ppm is not a share by mass: that would give 5.15 billion tonnes, too few\n- CO₂ in seawater makes **carbonic acid**: about 30% more acidic since the 1800s\n- Still standing: the airborne fraction can change as sinks weaken",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Turn ppm into tonnes!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Where Does the CO₂ Go?**\n\nL2C10 assumed all the CO₂ stays in the air. Level 3 checks that against the air itself.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| ppm | molecules in a million | A share by number |\n| Moles of air | 5.15 x 10²¹ g / 29 g/mol | **1.78 x 10²⁰ mol** |\n| 1 ppm of CO₂ | 1.78 x 10¹⁴ mol x 44 g/mol | **7.8 billion tonnes** |\n| Stayed in the air | 2.5 x 7.8 = **19.5** billion tonnes | Of 40 released |\n| Airborne fraction | **stayed / released** | About half |\n| Sinks | 40 − 19.5 = **20.5** | Ocean a quarter, land the rest |\n| The 1990s | 11.7 / 28 = **0.42** | Convert before dividing |\n| The ocean's share | CO₂ + H₂O → H₂CO₃ | More acidic seawater |\n| Still standing | a fixed fraction | Sinks can weaken |\n\n**The one line to remember:** turn ppm into tonnes, and the air shows that only about half the CO₂ we release stays there -- the rest goes into the oceans and the land.\n\n**Up next:** L3B10 -- how many species a shrinking habitat can keep."
        }
    };
}
