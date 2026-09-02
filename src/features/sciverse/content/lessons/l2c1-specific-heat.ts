import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C1 "Particles on the Move".
 *
 * Level 1 established that heating makes particles move faster. This lesson
 * costs it: Q = m x c x dT, a three-factor multiplication, and specific heat
 * capacity as the reason water and metal behave so differently.
 */
export function getL2C1Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In Level 1 you learned that heating something makes its particles move faster. Now we can work out **exactly how much energy** that takes.\n\nHere is an experiment you could actually run. Take **100 grams of water** and **100 grams of iron**. Heat each one with the same heater, for the same length of time, so each receives the **same amount of energy**.\n\nThe iron ends up roughly **nine times hotter** than the water.\n\nSame mass. Same energy in. Why does one get so much hotter than the other?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Iron needs far less energy to raise each degree, so the same energy buys it many more degrees than it buys the water.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Iron is a metal, and metals pull heat in faster than water does, so it soaks up more energy in the same time.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Metals really do carry heat quickly -- that is why a metal spoon in soup burns your fingers and a wooden one does not. But that is about how fast energy **travels**, and it is not what is happening here.\n\nRead the experiment again: both received the **same amount of energy**. That was fixed on purpose. Neither one soaked up more than the other.\n\nSo if the energy going in was equal and the temperatures came out unequal, the difference must be in what each substance **does** with that energy.\n\nAnd it is. Substances differ in how much energy it costs to warm them up by one degree, and they differ enormously:\n\n- **Water** needs **4.2 joules** to warm **1 gram** by **1 °C**\n- **Iron** needs only **0.45 joules** for the same job\n\nWater costs about **nine times** more per degree. Give both the same energy and the iron simply gets much further with it.\n\nThat number -- the joules needed per gram per degree -- is called the substance's **specific heat capacity**, written **c**.",
            options: [
                { id: 'cont', label: "So each substance charges a different price per degree?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly, and \"price per degree\" is a good way to hold on to it.\n\nThree things decide how much energy a heating job needs.\n\n**1. How much stuff there is.** Twice the mass, twice the energy -- you are warming twice as many particles.\n**2. How many degrees you want.** Twice the temperature rise, twice the energy.\n**3. What it is made of.** That is **c**, the specific heat capacity.\n\nMultiply all three together:\n\n**Q = m x c x dT**\n\n**Q** is the energy in **joules (J)**. **m** is the mass in **grams**. **c** is the specific heat capacity in joules per gram per °C. **dT** is the **temperature change** in °C -- the symbol just means \"the change in T\".\n\nAll three sit on the same side, multiplied together. There is no top and bottom here, so unlike L2P1's a = F / m, **every one of them behaves the same way**: double any of the three and you double the energy.\n\nWorth noticing where the energy actually goes. Level 1 told you heating makes particles move faster, and that is exactly what you are paying for -- every joule is buying particle motion. Water charges more per degree because its particles cling to each other, so some of your energy goes into loosening that grip rather than into speed.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** How much energy does it take to heat **200 grams** of water by **30 °C**?\n\nWater's specific heat capacity is **4.2 joules per gram per °C**.",
            options: [
                { id: 'right', label: "25,200 J, because 200 x 4.2 x 30 = 25,200.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_dt', label: "840 J, because 200 x 4.2 = 840.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "234.2 J, because 200 + 4.2 + 30 = 234.2.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two slips, and the units catch both of them.\n\n**840 J** is 200 x 4.2, which stops one factor early. Look at what c actually means: joules per gram **per °C**. Multiplying by the mass alone answers \"how much energy to raise this water by **one** degree\". The question asked for thirty of them, so it has to be multiplied by 30 as well.\n\n**234.2 J** comes from adding, and adding cannot be right because the three numbers are not measuring the same kind of thing. You can add 200 g to 300 g. You cannot meaningfully add grams to °C. **Quantities in different units get multiplied, not added.**\n\nThere is also a sense check available. 234 J is roughly the energy in a spoonful of food. Heating a glass of water by 30 degrees clearly takes more than that.\n\n200 x 4.2 x 30 = **25,200 J**, or about 25 kilojoules.",
            options: [
                { id: 'retry', label: "All three factors, and multiply rather than add.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, and the lab shows the same job done on two substances at once.\n\n**Mass** is how many grams you are heating.\n**Temperature Rise** is how many °C you want to gain.\n\nThe same **water** and **iron** are heated side by side, so the only thing differing between the two bars is **c**.\n\nMove either dial and both bars grow together, because mass and temperature rise affect both substances identically. What never changes is the **ratio** between them -- water always costs about nine times what iron does, at every setting.\n\nThat is what it means for all three factors to be multiplied. Changing m or dT scales both answers by the same amount, so it can never close the gap that **c** opens.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The gap stays the same. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** It is a hot afternoon at the seaside. The **sand** is too hot to stand on with bare feet. The **sea**, a few metres away, is still cold enough to make you gasp.\n\nBoth have been under the same Sun, for the same hours, receiving roughly the same energy on every square metre.\n\nSand's specific heat capacity is about **0.8**. Water's is **4.2**.\n\nWhy is one scorching and the other cold?",
            options: [
                { id: 'right', label: "Water costs about five times more energy per gram per degree, so the same sunlight raises the sea's temperature about five times less than the sand's.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Water is simply a cold substance by nature, and sand is a warm one, so they settle at different temperatures whatever the Sun does.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Nothing is warm or cold \"by nature\". Put a bucket of sea water on a stove and it will boil quite happily; leave sand outside overnight and it goes freezing. What differs is not what temperature they *like* -- it is **how much energy each degree costs them**.\n\nRearrange the formula to see it. If you know the energy and want the temperature change:\n\n**dT = Q / (m x c)**\n\nNow **c is underneath**, so it is an **inverse proportion** -- exactly the shape mass had in L2P1. A bigger c means a smaller temperature change for the same energy.\n\nSand: c = 0.8. Water: c = 4.2. Water's is about **five times** larger, so the same sunlight on the same mass gives the sea about **one fifth** of the temperature rise.\n\nAnd this is not a beach curiosity. It is why places by the sea have milder weather than places inland -- the ocean soaks up enormous energy in summer without warming much, then gives it back slowly in winter. **Water's stubbornness about changing temperature is one of the biggest reasons the planet's climate is as steady as it is.**",
            options: [
                { id: 'retry', label: "Water charges far more per degree, so it warms far less.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The same energy buys very different temperature changes, depending on what you are heating.**\n\nAnd notice you have now seen the same quantity behave in two ways depending on where you put it:\n\n**Q = m x c x dT** -- everything multiplied, so all three factors work the same way\n**dT = Q / (m x c)** -- now m and c are underneath, so both become inverse proportions\n\nIt is the same physics written two ways. Which form you use depends on what you know and what you want, and rearranging changes where a quantity sits, which changes how it behaves.\n\nSo far in Big Idea 1: **P1** gave you force and motion, and **C1** gave you the energy behind heat. Both are about pushing particles or objects around.\n\nWhich leaves an obvious question. Your body does this all day -- lifting, carrying, holding. Where does *its* force come from, and how much does it actually have to produce? That is B1.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Same energy, different degrees!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You costed a heating job.**\n\n- **Specific heat capacity (c)** is the joules needed per gram per °C\n- **Water: 4.2.** **Iron: 0.45.** **Sand: about 0.8**\n- **Q = m x c x dT**, with Q in **joules**\n- **dT** just means the **change** in temperature\n- All three factors are multiplied, so doubling any one doubles the energy\n- Quantities in **different units are multiplied, not added**\n- Rearranged, **dT = Q / (m x c)** -- now c is underneath and becomes an inverse proportion\n- Water's high c is why the sea stays cold while sand scorches\n- It is also why coasts have milder weather than inland places\n\nNext in B1: how much force your muscles really have to produce.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Q = m x c x dT!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Much Heat?**\n\nLevel 1 said heating makes particles move faster. The arithmetic says **what that costs**, and why the price is different for every substance.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Substances differ | water 4.2, iron 0.45 | A price per gram per degree |\n| That price is **c** | specific heat capacity | Water charges about 9x iron |\n| The formula | **Q = m x c x dT** | Energy in **joules** |\n| All multiplied | double any one, double Q | No top and bottom here |\n| Different units | multiply, never add | Grams plus °C means nothing |\n| Rearranged | **dT = Q / (m x c)** | Now c is underneath: inverse |\n\n**The one line to remember:** the energy depends on how much, how many degrees, and what it is made of -- and the last one varies more than people expect.\n\n**Up next:** B1 -- why your bicep pulls with eight times the weight you are holding."
        }
    };
}
