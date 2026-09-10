import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 3, physics.
 *
 * Level 2 ended three lessons in a row with energy going somewhere unwanted and
 * treated it as a measurement nuisance. This lesson turns it into a law.
 *
 * The simplification removed is conservation-as-sufficient: L2P3's books
 * balance perfectly whichever way the energy runs, so the first law alone
 * cannot explain why heat never turns fully back into work. The Carnot limit
 * supplies the ceiling. Its condition -- heat engines only -- is why muscle's
 * 25% (L3B1) beats it, so L3B3 has to explain that figure from chemistry.
 */
export function getL3P3Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P3 left you with a rule that never fails: **energy is conserved.** When a ball arrived slower than predicted, the missing joules were in the ramp as heat. Nothing was lost; a column had been forgotten.\n\nSo here is a question that rule cannot answer.\n\nThe ramp is now slightly warm. That warmth is precisely the energy the ball gave up. **Conservation permits it to go straight back** -- the ramp cools by a fraction of a degree, the ball speeds up again, and the books balance perfectly.\n\nIt never happens. Not once, anywhere, ever.\n\nIf energy is conserved either way, what forbids the second one?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Conservation cannot be the whole story. Something separate must decide which direction energy is allowed to move, even when the totals work out either way.", nextNodeId: 'spreading', sentiment: 'positive' },
                { id: 'bad', label: "The energy has been destroyed by the friction, so there is nothing left to come back.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "L2P3 settled this: **energy is never destroyed.** The joules are genuinely still there, in the ramp, and you could measure them with Q = m x c x dT.\n\nSo the puzzle stands, and it is sharper than it first looks. Nothing in the first law of thermodynamics -- energy is conserved -- prefers one direction over the other. Write the ball slowing down and warming the ramp; write the ramp cooling and speeding the ball up. **Both obey conservation exactly.** One happens constantly and one has never been observed.\n\nA law that permits both cannot explain why only one occurs. Something else is doing that work.\n\nAnd it is not only ramps. Every example from Level 2 has the same one-sidedness. Heat leaked from the calorimeter into the room and never leaked back. Sunlight warmed a leaf and the leaf never re-radiated it as sunlight. **Energy is conserved in both directions and only ever travels one of them.**",
            options: [
                { id: 'cont', label: "So what decides the direction?", nextNodeId: 'spreading' }
            ]
        },
        spreading: {
            id: 'spreading',
            speaker: 'AI',
            content: "The answer is about **how many ways** the energy can be arranged.\n\nWhen the ball is rolling, every one of its atoms is moving the same way at once -- billions of them, marching in step. That is a very particular arrangement. There are not many ways to be a rolling ball.\n\nWhen that same energy is in the warm ramp, it is scattered among billions of atoms jiggling in random, unrelated directions. There are an unimaginable number of ways to be a slightly warm ramp -- and they all look identical from outside.\n\nSo the reverse process is not forbidden by any force. It is simply that the atoms would all have to happen to jiggle **the same way at the same instant**, and the number of arrangements that do that is vanishingly small against the number that do not.\n\nThat count has a name: **entropy**, a measure of how many arrangements produce what you see. The **second law of thermodynamics** says the total entropy of an isolated system never decreases.\n\nIt is not a force. It is arithmetic about probability, and at the scale of 10²³ atoms the odds are so lopsided that \"unlikely\" becomes \"never\".\n\n**Organised energy scatters into disorganised energy, and does not gather itself back up.**",
            options: [
                { id: 'cont', label: "What does that cost an engine?", nextNodeId: 'carnot' }
            ]
        },
        carnot: {
            id: 'carnot',
            speaker: 'AI',
            content: "Everything, and it can be put as a number.\n\nA **heat engine** is any device that takes in heat and produces work -- a power station, a car engine, a steam locomotive. It draws heat from something **hot** and must dump some into something **cold**.\n\nThat dumping is not bad design. It is the price of the second law. To keep running, the engine has to end each cycle where it started, and the only way to shed the disorder it took in with the heat is to pass some heat onwards. **A heat engine with no cold side cannot run at all.**\n\nSo not all the heat can become work, and the fraction that can has a ceiling that depends only on the two temperatures:\n\n**maximum efficiency = 1 − Tc / Th**\n\n**Th** is the hot side and **Tc** the cold side, both in **kelvin** -- and the reason kelvin is compulsory is exactly L3P2's: a ratio of temperatures is meaningless on a scale with an arbitrary zero.\n\nA modern power station runs steam at about **840 K** and dumps into a river at about **300 K**:\n\n1 − 300/840 = 1 − 0.357 = **0.643**\n\n**64% at absolute best**, from a perfect frictionless machine that does not exist. Real stations reach about 40%.\n\nThe remaining 36% is not waste anyone could engineer away. It is the second law's fee.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A car engine burns fuel at about **1,200 K** and exhausts to air at about **300 K**.\n\nWhat is the highest efficiency it could possibly reach?",
            options: [
                { id: 'right', label: "75%. 1 − 300/1,200 = 1 − 0.25 = 0.75.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'inverted', label: "25%, because 300/1,200 = 0.25.", nextNodeId: 'math_wrong' },
                { id: 'celsius', label: "About 97%, using 927 °C and 27 °C: 1 − 27/927.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two different slips, and the second is the one that ruins gas problems too.\n\n**25%** is Tc/Th, which is the fraction that must be **dumped**, not the fraction that can be used. The formula subtracts it from 1 for exactly that reason. A sense check helps: if the cold side were almost as hot as the hot side, barely any work should be available -- and Tc/Th would then be near 1, so the efficiency must be near 0. Only 1 − Tc/Th behaves that way.\n\n**Using Celsius** gives **97%**, which should stop you immediately -- no car engine is 97% efficient, and if one were, the exhaust pipe would be barely warm. Celsius has an arbitrary zero, so ratios on it mean nothing, the same trap as L3P2's pressure question. Push it further and it becomes absurd: an engine exhausting at 0 °C would give 1 − 0/Th = **100%**, a perfect machine conjured out of a choice of scale. **Kelvin, or the formula is meaningless.**\n\n1 − 300/1,200 = 1 − 0.25 = **0.75**, so **75%**\n\nAnd that is a ceiling no engineering can lift, not a target. Real petrol engines manage about 30%.",
            options: [
                { id: 'retry', label: "Subtract from 1, and always in kelvin.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, both in kelvin.\n\n**Hot Side** is the temperature the engine takes heat from. **Cold Side** is where it dumps.\n\nThe lab shows the ceiling, and the work you would get from 1,000 J of heat at that ceiling.\n\nThree things to try.\n\nRaise the **hot side** and the ceiling climbs -- which is why engineers chase ever higher combustion temperatures, and why the limit is usually the melting point of the turbine rather than the physics.\n\nLower the **cold side** and it climbs too, which is why power stations sit beside rivers and why cooling towers exist.\n\nNow bring the two dials **together**. The ceiling collapses towards zero. An engine with no temperature difference produces no work at all, however much heat is available -- and the ocean is full of heat that is useless for exactly this reason.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "No difference, no work. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** An inventor offers a ship that needs no fuel.\n\nThe sea holds an enormous quantity of thermal energy. The ship draws heat from the water, uses it to turn a propeller, and returns slightly cooler water behind it. Nothing is burned. Energy is perfectly conserved -- the heat taken out equals the work done.\n\n**The first law of thermodynamics permits this exactly.** Why will it not work?",
            options: [
                { id: 'right', label: "It has no cold side. With Th and Tc both at sea temperature, 1 − Tc/Th = 0, so the ceiling on the work available is zero however much heat the ocean holds.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The sea is not hot enough. At about 290 K there is too little thermal energy in the water to turn a propeller.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "There is a staggering amount of thermal energy in the sea. Cooling the top few metres of the Atlantic by one degree would release more energy than humanity uses in a year. Quantity is not the problem.\n\n**Availability** is.\n\nPut the ship's own numbers into the formula. It draws heat from water at about 290 K and it has nowhere colder to dump into -- the sea it returns to is also 290 K.\n\n1 − 290/290 = 1 − 1 = **0**\n\nThe ceiling is zero. Not small: **zero**. No amount of heat, no cleverness of design, no better propeller changes it, because the fraction available for work is set entirely by the ratio of two temperatures and that ratio is 1.\n\nThis kind of machine has a name -- a **perpetual motion machine of the second kind** -- and it is the more seductive of the two. It does not claim to make energy from nothing, which people spot immediately. It respects the first law completely. It merely proposes to take disorganised energy and reorganise it for free, which the second law forbids.\n\n**Energy and useful energy are different quantities.** The ocean is full of the first and has almost none of the second. What an engine needs is not heat but a **temperature difference** -- and a ship that cools the sea and warms nothing has none.",
            options: [
                { id: 'retry', label: "It has heat but no difference, so no work is available.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A heat engine runs on a temperature difference, not on heat.**\n\nAnd now Level 2's three loose ends turn out to be one law.\n\n- The ball's joules went into the ramp and stayed there, because organised motion scatters and does not gather\n- The calorimeter always read low, because heat flows outward into a cooler room and never back\n- The leaf keeps 1%, and every step after it will keep less\n\nLevel 2 measured each of those and called them losses. They are not losses. **They are the direction the second law runs**, and the same law that permits an engine to work at all is what caps it.\n\nOne more thing, because it has been outstanding since Big Idea 1 and this formula settles half of it. **L3B1 told you muscle is about 25% efficient.** Is muscle a heat engine, held under this ceiling?\n\nTry it. Your body runs at about **310 K** in surroundings of about **300 K**:\n\n1 − 300/310 = **about 3%**\n\nMuscle does **eight times better** than that. A heat engine cannot beat its ceiling, so **muscle is not a heat engine**. It never turns chemical energy into heat and then heat into work -- it turns chemical energy into work directly.\n\nThat is the condition this formula depends on, and it is worth stating plainly: **1 − Tc/Th applies to engines that make work out of heat, and to nothing else.** Where muscle's 25% really comes from is B3's question.\n\nNext, C3 asks where a fuel's energy actually comes from, and why hydrogen gives nine times more per gram than wood.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A heat engine runs on a difference, not on heat!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the ceiling on every heat engine.**\n\n- Conservation permits energy to run **either way**, so it cannot explain direction\n- Organised motion has few arrangements; heat has unimaginably many\n- **Entropy** counts those arrangements; the **second law** says it never decreases\n- It is not a force -- it is probability at the scale of 10²³ atoms\n- A **heat engine** needs a hot side and a cold side, and **cannot run without both**\n- **maximum efficiency = 1 − Tc / Th**, both in **kelvin**\n- A power station at 840 K into 300 K is capped at **64%**; real ones reach about 40%\n- A car at 1,200 K into 300 K is capped at **75%**; real ones reach about 30%\n- Bring the temperatures together and the ceiling falls to **zero**\n- The ocean holds vast heat and almost no **useful** energy\n- **Energy and useful energy are different quantities**\n- At body temperature the ceiling would be about **3%**; muscle manages 25%, so muscle is **not** a heat engine\n- The formula applies only to engines that make **work from heat**\n\nNext in C3: where a fuel's energy actually comes from.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "1 − Tc/Th, and always in kelvin!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- The Ceiling on Every Heat Engine!**\n\nLevel 2 kept finding energy in the wrong column and called it a nuisance. Level 3 finds the law that put it there.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Conservation is not enough | balances both ways | It cannot explain direction |\n| Why one direction | arrangements, not forces | Few ways to roll, countless ways to warm |\n| **Entropy** | never decreases | Probability at 10²³ atoms |\n| A heat engine | needs hot **and** cold | No cold side, no engine |\n| The ceiling | **1 − Tc / Th** | Kelvin, or it is meaningless |\n| A power station | 1 − 300/840 = **64%** | Real ones reach about 40% |\n| A car engine | 1 − 300/1,200 = **75%** | Real ones reach about 30% |\n| No difference | ceiling falls to **0** | The ocean's heat is unusable |\n| Muscle at 25% | a heat engine would get ~3% | So muscle is **not** a heat engine |\n| The condition | engines making work from heat | Nothing else |\n\n**The one line to remember:** a heat engine does not run on heat, it runs on a difference in temperature -- and the size of that difference sets a ceiling no engineering can lift.\n\n**Up next:** C3 -- where a fuel's energy actually comes from, and why hydrogen beats wood nine times over."
        }
    };
}
