import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C3 "Chemical Reactions".
 *
 * C3 established that reactions absorb or release energy, and that a
 * thermometer shows which. This measures how much, by handing the heat to
 * water and using L2C1's Q = m x c x dT on the water rather than on the
 * reaction. That indirect move is the whole method of calorimetry.
 *
 * The checkpoint is that every measurement of this kind comes out LOW, which
 * is the same "which column did I forget" idea as L2P3's ramp.
 */
export function getL2C3Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In C3 you watched two thermometers. Baking soda and vinegar pulled the temperature **down**; iron and oxygen pushed it **up**. Down means the reaction took energy in -- **endothermic**. Up means it gave energy out -- **exothermic**.\n\nThat tells you the direction. It does not tell you **how much**.\n\nAnd you need how much. \"This fuel is exothermic\" is useless to somebody choosing between two fuels. They need joules.\n\nSo: how would you measure the energy a burning fuel releases, when the flame itself is far too hot and too messy to put a thermometer in?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Give the heat to something easy to measure -- burn the fuel under water, and work out how much energy the water took in from its temperature rise.", nextNodeId: 'method', sentiment: 'positive' },
                { id: 'bad', label: "Put a thermometer directly into the flame and read the temperature it reaches.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A thermometer in the flame gives you a number, but not the one you want -- and the reason is a distinction worth getting straight.\n\n**Temperature is not energy.** A flame's temperature tells you how fast its particles are jiggling. It says nothing about **how many** particles there are, or how long the flame lasts.\n\nA single match and a bonfire burn at roughly the same temperature. One will boil a kettle and one will not. Temperature could never tell them apart.\n\nSo measuring the flame is measuring the wrong quantity. What you want is the **total energy** the fuel delivers, which depends on how much fuel there is.\n\nThe trick is not to measure the reaction at all. **Hand the energy to something you already know how to measure, and measure that instead.**\n\nAnd you have exactly the right tool. L2C1 gave you **Q = m x c x dT** for water. Burn the fuel underneath a known mass of water, and the water will tell you what it received.",
            options: [
                { id: 'cont', label: "So measure the water, not the flame?", nextNodeId: 'method' }
            ]
        },
        method: {
            id: 'method',
            speaker: 'AI',
            content: "Exactly, and that indirect move has a name: **calorimetry**. You never measure the reaction. You measure what the reaction did to something else.\n\nThe apparatus is simple. A known mass of water in a metal can, a thermometer in it, and a weighed burner underneath.\n\n**The method, in four steps:**\n\n1. Weigh the burner **before**.\n2. Note the water's **starting temperature**.\n3. Burn the fuel for a while, then note the **final temperature**.\n4. Weigh the burner **after**. The difference is the fuel actually used.\n\nThen turn the temperature rise into joules with the formula from L2C1:\n\n**Q = m x c x dT**\n\nwhere **m** is the mass of the **water** in grams, **c** is water's specific heat capacity, **4.2 J/g/°C**, and **dT** is the water's temperature rise in °C.\n\n**A worked run.** 200 g of water, warmed from 20 °C to 35 °C, by burning 0.50 g of ethanol.\n\nQ = 200 x 4.2 x 15 = **12,600 J**\n\nThat is what the water gained. Now make it a property of the fuel rather than of this particular experiment -- divide by the fuel burned, exactly the move L2P2 and L2C1 both used:\n\n12,600 J / 0.50 g = **25,200 J per gram**, or about **25 kJ/g**\n\nNow you can compare fuels.",
            options: [
                { id: 'try', label: "Let me run one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** You burn **1.0 g** of a fuel under **250 g** of water. The water's temperature rises by **20 °C**.\n\nWater's specific heat capacity is **4.2 J/g/°C**.\n\nHow much energy did the water gain, and how much is that per gram of fuel?",
            options: [
                { id: 'right', label: "21,000 J, which is 21 kJ per gram of fuel. Q = 250 x 4.2 x 20 = 21,000 J, and dividing by 1.0 g leaves 21,000 J/g.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'fuel_mass', label: "84 J, because Q = 1.0 x 4.2 x 20 using the mass of the fuel.", nextNodeId: 'math_wrong' },
                { id: 'no_dt', label: "1,050 J, from 250 x 4.2.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "The second slip is an old friend; the first is new and more interesting.\n\n**Using the fuel's mass** puts the wrong substance into the formula. Q = m x c x dT describes **the thing being heated**, and here that is the **water**. The fuel is not being warmed -- it is being burnt and turned into gases that leave. Its mass belongs at the very end, when you divide to find the energy per gram, and nowhere else.\n\nThat is the part of calorimetry people find genuinely confusing, so it is worth stating plainly: **the c in the formula is water's 4.2, and the m is the water's mass, even though the question is about the fuel.**\n\n**1,050 J** stops before multiplying by dT, which L2C1's math_wrong already covered -- it gives the energy for a **one degree** rise.\n\nQ = 250 g x 4.2 J/g/°C x 20 °C = **21,000 J**\nPer gram of fuel: 21,000 / 1.0 = **21,000 J/g**",
            options: [
                { id: 'retry', label: "The formula describes the water; the fuel only divides at the end.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, with **0.50 g** of fuel burnt each time.\n\n**Water Mass** sets how much water is in the can. **Temperature Rise** sets how far it climbed.\n\nBoth feed into Q = m x c x dT, and the lab then divides by the fuel to give joules per gram.\n\nHere is something worth doing deliberately. Find **two different settings that give the same answer** -- 200 g rising 15 °C, and 400 g rising 7.5 °C. Same energy, entirely different experiment.\n\nThat is the check that the method works. If the answer depended on how much water you happened to use, it would be measuring your apparatus rather than the fuel. It does not, so it is a real property.\n\nFor reference, some real values in **kJ per gram**: wood about **16**, ethanol about **30**, petrol about **46**, hydrogen about **142**.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Different experiments, same answer. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two students measure the same ethanol.\n\n**Amira** works in a draughty corner with the can held high above the flame. She gets **19 kJ/g**.\n\n**Ben** shields his apparatus from draughts and sits the can just above the flame. He gets **25 kJ/g**.\n\nThe accepted value for ethanol is about **30 kJ/g**.\n\nBoth are below it, and Amira is furthest below. Why -- and which of them is closer to the truth?",
            options: [
                { id: 'right', label: "Heat escaped to the room instead of reaching the water, so both measured low, and Amira lost more. Ben is closer. This method always underestimates.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Their fuels must have differed in purity, and there is no way to say which result is nearer the truth without testing the ethanol.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Purity would scatter their answers **randomly** -- sometimes high, sometimes low. Look at what actually happened: **both are below the accepted value, and neither is above it.** That one-sidedness is the clue, and it rules out random error entirely.\n\nWhen every measurement misses the same way, something is **systematically** removing energy before it reaches the water.\n\nAnd it is not hard to name. Heat rises around the sides of the can and into the room. It warms the can itself, the thermometer, the air. Some of the fuel evaporates without burning. Every one of those takes energy the water never sees, and every one of them makes the answer **too small**.\n\nSo the ranking is not a matter of opinion. Since all the errors point one way, **the higher measurement is necessarily the better one**. Ben shielded his apparatus and lost less, so his 25 kJ/g is closer to the true 30 than Amira's 19.\n\nThis is exactly L2P3's ramp again. There the ball arrived slower than predicted; here the water gains less than the fuel released. Both times the energy is not gone -- it is in a column nobody measured.\n\n**A method that can only fail in one direction is more useful than one that scatters**, because you always know which way the truth lies.",
            options: [
                { id: 'retry', label: "All the errors point one way, so higher is better.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **When every error points the same way, the extreme measurement is the best one.**\n\nSo Big Idea 3 has gained a way to put joules on chemistry:\n\n- **Calorimetry** measures a reaction by measuring what it heats\n- **Q = m x c x dT** on the **water**, then divide by the **fuel** burnt\n- The answer is a property of the fuel, not of your apparatus\n- Every such measurement comes out **low**, so shielding the apparatus improves it\n\nAnd notice how much this leans on earlier lessons. The formula is L2C1's. Dividing by the fuel mass to get a per-gram property is the move from L2P2's density and L2C2's relative masses. The missing energy is L2P3's forgotten column.\n\nWhat this lesson cannot yet tell you is **why** one fuel releases more than another -- why hydrogen gives 142 kJ/g and wood only 16. That answer is in the bonds between the atoms, and it is Level 3's.\n\nNext, B3 asks where the energy in food came from in the first place, and finds a step that is far less efficient than any fuel you have just measured.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Measure what it heats, then divide by the fuel!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You measured a reaction without touching it.**\n\n- **Temperature is not energy** -- a match and a bonfire burn at similar temperatures\n- **Calorimetry**: give the heat to water and measure the water instead\n- Weigh the burner before and after; the difference is the fuel used\n- **Q = m x c x dT**, with **m** and **c** belonging to the **water**\n- 200 g of water rising 15 °C gains 200 x 4.2 x 15 = **12,600 J**\n- Divide by the fuel burnt: 12,600 / 0.50 g = **25 kJ/g**\n- Different amounts of water give the **same answer per gram**, which is what makes it a real property\n- Real fuels: wood **16**, ethanol **30**, petrol **46**, hydrogen **142 kJ/g**\n- Every measurement of this kind comes out **low**, because heat escapes to the room\n- When all errors point one way, the **highest** measurement is the best\n\nNext in B3: the energy that started the whole food chain.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Measure the water, divide by the fuel!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Measuring a Reaction's Energy!**\n\nC3 told you a reaction takes energy in or gives it out. Level 2 puts a number on it, without ever measuring the reaction itself.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Temperature is not energy | match vs bonfire | Same temperature, different energy |\n| Calorimetry | measure what it heats | Never measure the flame |\n| The formula | **Q = m x c x dT** | **m** and **c** are the **water's** |\n| A worked run | 200 x 4.2 x 15 | **12,600 J** into the water |\n| Make it a property | divide by fuel burnt | 12,600 / 0.50 = **25 kJ/g** |\n| The check | more water, same answer | It measures the fuel, not the kit |\n| Always low | heat escapes to the room | So shielding improves it |\n| One-sided error | higher is better | Ben's 25 beats Amira's 19 |\n\n**The one line to remember:** you cannot measure the flame, so you measure the water and divide by the fuel -- and whatever you get, the truth is a little higher.\n\n**Up next:** B3 -- where the energy in food came from, and the astonishingly small fraction that gets captured."
        }
    };
}
