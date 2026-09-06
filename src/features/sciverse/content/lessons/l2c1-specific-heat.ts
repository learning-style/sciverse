import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C1 "Particles on the Move".
 *
 * Level 1 established that heating makes particles move faster. This lesson
 * costs it: Q = m x c x dT, a three-factor multiplication.
 *
 * Two things this lesson is careful about, both from curator review. It defines
 * heat capacity BEFORE specific heat capacity, so that "specific" means
 * something rather than being decoration. And it states plainly that c is not a
 * fixed constant -- it drifts with temperature and changes outright at a change
 * of state, where the formula stops working altogether. That last part is the
 * hand-off to Level 3, and without it a curious student is left with a formula
 * they will try to use across boiling point.
 */
export function getL2C1Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In Level 1 you learned that heating something makes its particles move faster. Now we can work out **exactly how much energy** that takes.\n\nHere is an experiment you could actually run. Take **100 g of water** and **100 g of iron**. Heat each with the same heater for the same length of time, so each receives the **same amount of energy**.\n\nSuppose the water warms by **10 °C**. The iron warms by about **93 °C** -- roughly nine times as much.\n\nSame mass. Same energy in. Why does one get so much hotter than the other?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Iron needs far less energy to raise each degree, so the same energy buys it many more degrees than it buys the water.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Iron is a metal, and metals pull heat in faster than water does, so it soaks up more energy in the same time.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Metals really do carry heat quickly -- that is why a metal spoon in soup burns your fingers and a wooden one does not. But that is about how fast energy **travels**, and it is not what is happening here.\n\nRead the experiment again: both received the **same amount of energy**. That was fixed on purpose. Neither one soaked up more than the other.\n\nSo the difference must be in what each substance **does** with the energy it got. And to say that precisely, we need one term first, then a second one built on top of it.",
            options: [
                { id: 'cont', label: "Go on -- what are the two terms?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**Heat capacity** is the energy needed to raise **one particular object** by **1 °C**. Its unit is **joules per degree Celsius**, written **J/°C**.\n\nA bathtub of water might have a heat capacity of 600,000 J/°C. A cup of water might be 800 J/°C. Same substance, wildly different numbers -- because heat capacity depends on **how much of it there is**.\n\nThat makes it useless for comparing *substances*. To compare water against iron fairly, you have to remove the size of the sample from the number. So you divide by the mass, and quote the energy for just **one gram**:\n\n**Specific heat capacity** is the energy needed to raise **1 gram** of a substance by **1 °C**. Its unit is **joules per gram per degree Celsius**, written **J/g/°C**, and its symbol is **c**.\n\nThat word **specific** is doing real work. In science it means **per unit of mass** -- the sample size has been divided out, so what is left describes the substance itself and nothing about how much of it you happen to have.\n\nNow the two substances can be compared:\n\n- **Water: 4.2 J/g/°C**\n- **Iron: 0.45 J/g/°C**\n\nWater costs about **nine times more per degree**. Give both the same energy and the iron gets much further with it.",
            options: [
                { id: 'cont', label: "So c is the price per gram, per degree?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly, and \"price per degree\" is a good way to hold on to it.\n\nThree things decide how much energy a heating job needs.\n\n**1. How much stuff there is** -- the mass **m**, in **grams (g)**. Twice the mass, twice the energy.\n**2. How many degrees you want** -- the temperature change **dT**, in **°C**. The symbol just means \"the change in T\".\n**3. What it is made of** -- the specific heat capacity **c**, in **J/g/°C**.\n\nMultiply all three:\n\n**Q = m x c x dT**\n\n**Q** is the energy, in **joules (J)**.\n\nThe units tie together, which is a good check that the formula is right. Multiply **g** by **J/g/°C** by **°C**, and the grams cancel, the degrees cancel, and you are left with **J**. If your units do not cancel down to joules, you have the formula wrong.\n\nAll three sit on the same side, multiplied together. There is no numerator and denominator here, so unlike L2P1's a = F / m, **every one of them behaves the same way**: double any of the three and you double the energy.\n\nWorth noticing where the energy goes. Level 1 told you heating makes particles move faster, and that is what you are paying for -- every joule buys particle motion. Water charges more per degree because its particles cling to each other, so some energy goes into loosening that grip rather than into speed.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** How much energy does it take to heat **200 g** of water by **30 °C**?\n\nWater's specific heat capacity is **4.2 J/g/°C**.",
            options: [
                { id: 'right', label: "25,200 J, because 200 g x 4.2 J/g/°C x 30 °C = 25,200 J.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_dt', label: "840 J, because 200 g x 4.2 J/g/°C = 840.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "234.2 J, because 200 g + 4.2 J/g/°C + 30 °C = 234.2.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two slips, and the **units** catch both.\n\n**840 J** stops one factor early. Follow the units: g x J/g/°C leaves you with **J/°C**, not J. That is the energy for **one** degree, which is exactly what heat capacity means. The question asked for **30 °C**, so it must be multiplied by 30 °C as well.\n\n**234.2 J** comes from adding, and adding cannot be right because the three numbers are not the same kind of thing. You can add 200 g to 300 g. You cannot add grams to degrees Celsius -- the answer would have no meaningful unit at all. **Quantities in different units get multiplied, not added.**\n\nThere is a sense check too. 234 J is roughly the energy in one bite of an apple. Heating a glass of water by 30 °C clearly takes more than that.\n\n200 g x 4.2 J/g/°C x 30 °C = **25,200 J**, or about **25 kJ**.",
            options: [
                { id: 'retry', label: "Follow the units -- they should cancel down to joules.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, and the lab does the same job on two substances at once.\n\n**Mass** is how many **grams** you are heating.\n**Temperature Rise** is how many **°C** you want to gain.\n\nThe same **water** and **iron** are heated side by side, so the only thing differing between the two bars is **c**.\n\nMove either dial and both bars grow together, because mass and temperature rise affect both substances identically. What never changes is the **ratio** between them -- water always costs about nine times what iron does, at every setting.\n\nThat is what it means for all three factors to be multiplied. Changing m or dT scales both answers by the same amount, so it can never close the gap that **c** opens.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The gap stays the same. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** It is a hot afternoon at the seaside. The **sand** is too hot to stand on with bare feet. The **sea**, a few metres away, is still cold enough to make you gasp.\n\nBoth have been under the same Sun, for the same hours, receiving roughly the same energy on every square metre.\n\nSand's specific heat capacity is about **0.8 J/g/°C**. Water's is **4.2 J/g/°C**.\n\nWhy is one scorching and the other cold?",
            options: [
                { id: 'right', label: "Water costs about five times more energy per gram per degree, so the same sunlight raises the sea's temperature about five times less than the sand's.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Water is simply a cold substance by nature, and sand is a warm one, so they settle at different temperatures whatever the Sun does.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Nothing is warm or cold \"by nature\". Put sea water on a stove and it boils happily; leave sand out overnight and it goes freezing. What differs is **how much energy each degree costs them**.\n\nRearrange the formula to see it. If you know the energy and want the temperature change:\n\n**dT = Q / (m x c)**\n\nNow **c is the denominator**, so it is an **inverse proportion** -- exactly the shape mass had in L2P1. A bigger c means a smaller temperature change for the same energy.\n\nSand: **0.8 J/g/°C**. Water: **4.2 J/g/°C**. Water's is about **five times** larger, so the same sunlight on the same mass gives the sea about **one fifth** of the temperature rise.\n\nAnd this is not a beach curiosity. It is why places by the sea have milder weather than places inland -- the ocean soaks up enormous energy in summer without warming much, then gives it back slowly in winter. **Water's stubbornness about changing temperature is one of the biggest reasons the planet's climate is as steady as it is.**",
            options: [
                { id: 'retry', label: "Water charges far more per degree, so it warms far less.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The same energy buys very different temperature changes, depending on what you are heating.**\n\nNotice you have now seen the same quantity behave two ways depending on where it sits:\n\n**Q = m x c x dT** -- everything multiplied, so all three factors work alike\n**dT = Q / (m x c)** -- now m and c are both in the denominator, so both become inverse proportions\n\nSame physics, written two ways. Rearranging changes where a quantity sits, which changes how it behaves.\n\nBefore we finish, one more question -- and it is the one a careful student always asks next.",
            options: [
                { id: 'limits', label: "Go on.", nextNodeId: 'limits' }
            ]
        },
        limits: {
            id: 'limits',
            speaker: 'AI',
            content: "We have used **4.2 J/g/°C** for water as though it were a fixed fact.\n\nSo: is **c** the same number at every temperature? Would 4.2 J/g/°C work just as well from **0 °C to 30 °C** as from **360 °C to 450 °C**?",
            options: [
                { id: 'right', label: "No. It drifts slightly as the temperature changes, and it changes completely when the substance melts or boils -- ice, liquid water and steam each have their own value.", nextNodeId: 'limits_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. c is a property of the substance, so one number covers water at any temperature you like.", nextNodeId: 'limits_wrong' }
            ]
        },
        limits_wrong: {
            id: 'limits_wrong',
            speaker: 'AI',
            content: "It is a reasonable assumption, and it is very nearly true over small ranges. But it fails in two different ways, and the second one is serious.\n\n**First, c drifts.** Liquid water is about **4.22 J/g/°C** near 0 °C and about **4.18 J/g/°C** near 35 °C. That is a change of about 1%, far too small to matter here -- which is why one value of 4.2 J/g/°C is honest enough for this lesson.\n\n**Second, and much bigger: c changes completely when the state changes.**\n\n- **Ice: about 2.1 J/g/°C**\n- **Liquid water: about 4.2 J/g/°C**\n- **Steam: about 2.0 J/g/°C**\n\nAs far as this formula is concerned, those are three different substances. Your 360 °C to 450 °C example is not liquid water at all -- above 100 °C it is **steam**, so you would use 2.0 J/g/°C, not 4.2.\n\n**And at the change itself, the formula stops working entirely.** Hold ice at exactly 0 °C and keep heating. Energy pours in and the temperature **does not move** until every last bit has melted. Q = m x c x dT would say that dT = 0 °C means Q = 0 J -- no energy needed at all. That is plainly wrong; a great deal of energy went in.\n\nThe reason: at a change of state, energy stops speeding particles up and starts **pulling them apart** instead. Temperature only measures the speeding-up part, so it sits still while the pulling-apart happens. That hidden energy has a name -- **latent heat** -- and it is Level 3's job.\n\nSo the honest statement of what you have learned is: **Q = m x c x dT works within one state of matter, over a moderate range of temperature.** Cross a melting or boiling point and you need more than this formula.",
            options: [
                { id: 'retry', label: "So one c per state, and the formula breaks at the change itself.", nextNodeId: 'limits_correct' }
            ]
        },
        limits_correct: {
            id: 'limits_correct',
            speaker: 'AI',
            content: "Correct, and asking that question is worth as much as the formula itself.\n\n**Every formula comes with conditions.** L2B33's probability assumed species fail independently. This one assumes **c is constant**, and that assumption holds only within a single state of matter, over a moderate range.\n\nWhat you can now do:\n\n- Heat water from 20 °C to 80 °C. **Fine** -- all liquid, use 4.2 J/g/°C\n- Heat ice from -20 °C to -5 °C. **Fine** -- all solid, use 2.1 J/g/°C\n- Heat ice at -10 °C all the way to steam at 150 °C. **Not with this formula alone** -- it crosses two changes of state, and the formula is blind to both\n\n**Coming in Level 3:** the energy that a change of state swallows -- **latent heat** -- so that last job becomes possible. Level 3 also asks *why* water's c is so unusually high, which comes down to the bonds between its particles.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One c per state, and only within that state!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You costed a heating job.**\n\n- **Heat capacity** is the energy to raise **one object** by 1 °C, in **J/°C** -- it depends on size\n- **Specific heat capacity (c)** is the energy to raise **1 gram** by 1 °C, in **J/g/°C**\n- **Specific** means **per unit of mass**, so the sample size is divided out\n- **Water: 4.2 J/g/°C.** **Iron: 0.45 J/g/°C.** **Sand: about 0.8 J/g/°C**\n- **Q = m x c x dT**, with **m** in g, **dT** in °C, and **Q** in **joules (J)**\n- The units cancel to joules -- if yours do not, the formula is wrong\n- Quantities in **different units are multiplied, not added**\n- Rearranged, **dT = Q / (m x c)** -- now c is in the denominator and becomes an inverse proportion\n- Water's high c keeps the sea cold while sand scorches, and keeps coasts mild\n- **c is not truly constant**: it drifts about 1% with temperature, and changes outright between **ice 2.1 J/g/°C**, **water 4.2 J/g/°C** and **steam 2.0 J/g/°C**\n- At a melting or boiling point the formula **fails completely** -- energy goes in and dT stays at 0 °C\n\nNext in B1: how much force your muscles really have to produce.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Q = m x c x dT -- within one state!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Much Heat?**\n\nLevel 1 said heating makes particles move faster. The arithmetic says **what that costs**, why the price differs for every substance, and where the formula stops being true.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Heat capacity | **J/°C** | For one object; depends on its size |\n| Specific heat capacity | **J/g/°C**, symbol **c** | Per gram, so substances compare fairly |\n| The values | water **4.2**, iron **0.45**, sand **0.8**, all in **J/g/°C** | Water costs about 9x iron |\n| The formula | **Q = m x c x dT** | g x J/g/°C x °C cancels to **J** |\n| All multiplied | double any one, double Q | No numerator or denominator |\n| Rearranged | **dT = Q / (m x c)** | Now c is the denominator: inverse |\n| The condition | c is not constant | One value **per state of matter** |\n| Where it breaks | melting and boiling | Energy in, but **dT = 0 °C** |\n\n**The one line to remember:** the energy depends on how much, how many degrees, and what it is made of -- and that last one only holds still while the substance stays in one state.\n\n**Up next:** B1 -- why your bicep pulls with eight times the weight you are holding. **In Level 3:** latent heat, and why water's c is so unusually high."
        }
    };
}
