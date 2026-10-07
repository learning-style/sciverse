import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 24, chemistry. Mechanism + Limit.
 *
 * L2C24 gave share = one route / the total of both, and stated its condition in
 * passing: the gases rush away from the flame and never come back. That condition
 * was doing all the work. Let the two products sit together, able to go back, and
 * the split stops being about speed at all:
 *
 *   ratio at equilibrium = exp(energy gap / R T)
 *
 * so it is decided by which product is STEADIER, not which forms faster. Butadiene
 * and HBr is the school case: about 71:29 towards the faster product at -80 C, and
 * about 15:85 the other way once warmed and given time. Same flask, same molecules,
 * opposite answers.
 *
 * Verified: 85% at 45 C needs a gap of 4.59 kJ/mol, and exp(4600/(8.314 x 318.1))
 * = 5.70, which is 85.1%.
 *
 * The real content is the trap. "Cold favours the faster product" is a true rule of
 * thumb with a wrong obvious reason. At EQUILIBRIUM cold favours the steadier
 * product harder -- 94.6% at -80 C against 85.1% at 45 C -- so cold does not change
 * which product is favoured. It stops the system equilibrating at all, and you are
 * left looking at the speeds because nothing can go back.
 *
 * Frame of reference stated: the energy gap is how much lower the steadier product
 * sits than the faster one, and the ratio is steadier-to-faster.
 *
 * Still standing: this gives the answer equilibrium would reach and says nothing
 * about how long that takes. The crossover between the two regimes needs activation
 * energies, which are not here. The kinetic split is also held fixed at its measured
 * -80 C value, because working out how IT drifts with temperature needs the same
 * two activation energies.
 */
export function getL3C24Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C24 worked out where the carbon in a flame ends up, and it was all about **speed**: the share going each way was one route's speed over the total of both. Faster route, bigger share.\n\nIt also stated a condition, almost in passing. *The gases are rushing away from the flame and never get the chance to come back.*\n\nThat sentence was doing every bit of the work, and this lesson is about what happens when it is not true.\n\nSo take a reaction where the products **can** come back. Butadiene is a short hydrocarbon with two double bonds; add hydrogen bromide (HBr) to it and there are two places the bromine can end up, giving two different products from the same two starting materials.\n\n- one of them **forms faster**. Chemists call it the **1,2-adduct**, after which carbons the pieces landed on\n- the other one is **steadier** -- lower in energy, so once made it is more reluctant to come apart. That is the **1,4-adduct**\n\nAnd here is the measurement that should stop you.\n\n**At -80 °C you get about 71% of the faster product.** Warm the same flask to **45 °C** and leave it, and you get about **85% of the steadier one**. Same molecules, same flask, nothing added -- and the majority product has swapped.\n\nL2C24's formula cannot do this. It has one answer for one pair of speeds.\n\nYour two dials are the two things the second answer depends on.\n\n- **Energy Gap** -- how much lower the steadier product sits than the faster one, in **kilojoules per mole (kJ/mol)**.\n- **Temperature**, in **°C**.\n\nBefore any arithmetic: why would warming a flask change which product you end up with most of?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'speeds', label: "Heat changes the two speeds, so the faster route changes.", nextNodeId: 'misconception' },
                { id: 'back', label: "Warming lets the products go back, so being steady starts to matter.", nextNodeId: 'defining', sentiment: 'positive' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Heat does change both speeds, and it is not enough to explain this.\n\nSpeeding both routes up was L2C24's own worked case, and the share did not budge -- the ratio decides, and multiplying both by the same thing cancels. For heat to flip the **majority product** by changing speeds, it would have to speed one route up far more than the other, and reverse which is faster. That does not happen here: the 1,2 route is the faster one at every temperature in this lesson.\n\nWhat heat actually changes is something L2C24 had ruled out by assumption. **It lets the products come apart again.**\n\nAt -80 °C a product, once made, stays made -- there is not enough energy about for it to go back over the hill it came across. So the only thing that matters is which route got there first, and you are reading off a race.\n\nWarm it up and the race stops being the point, because now the molecules can leave and re-enter. Over and over. And a system that is free to keep rearranging does not sit where it arrived first -- it piles up in whichever arrangement is **hardest to leave**.",
            options: [
                { id: 'cont', label: "So what decides it then?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "There are two regimes, and chemistry names them after whichever thing is deciding.\n\n**Kinetic control** -- the products cannot go back, so the split is the race. This is L2C24 exactly: **share = one route's speed / the total of both**. The condition is that nothing returns.\n\n**Thermodynamic control** -- the products can go back, and are given long enough, so the split settles where the molecules are most reluctant to leave. The ratio of steadier to faster is then\n\n**ratio = e to the power of (energy gap / R T)**\n\nwhere **R** is the gas constant, **8.314 joules per mole per kelvin** -- the same R as in pV = nRT -- and **T** is the temperature in **kelvin**, which is °C plus 273. The condition is that the system actually **reaches** equilibrium.\n\nCheck the units before trusting it. The gap in **joules per mole** divided by R in **joules per mole per kelvin** leaves **kelvin**, and dividing by T in kelvin cancels that too. So the exponent is a plain number, as it has to be -- you cannot raise e to a power that has units.\n\nAnd notice what has gone missing. **The speeds are not in this formula.** How fast either route runs has no bearing on where a system ends up once it is free to keep rearranging. Speed decides where you arrive; **the gap decides where you stay.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me the 85%.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The warm flask.** The steadier product sits **4.6 kJ/mol** lower, and the temperature is **45 °C**.\n\nFirst the temperature in kelvin:\n\n45 + 273 = **318 K**\n\nThen the exponent, with the gap in joules per mole so the units cancel:\n\n4600 / (8.314 x 318) = 4600 / 2644 = **1.74**\n\nThen the ratio:\n\ne to the power of 1.74 = **5.7 to 1**\n\nSo for every 5.7 molecules of the steadier product there is 1 of the faster one, and the share of the steadier one is\n\n5.7 / 6.7 = **0.851**, so **85%**\n\nwhich is the measured figure. A gap of 4.6 kJ/mol is small -- less than a tenth of the energy in a single carbon-carbon bond -- and it still ends up deciding the majority product almost six to one. **That is what the exponential does: it turns a small energy difference into a lopsided mixture.**\n\n**Now the same flask cold.** At -80 °C, T = 193 K:\n\n4600 / (8.314 x 193) = **2.87**, and e to the power of 2.87 = **17.6 to 1**, a **94.6%** share.\n\nRead that again, because it is not what anybody expects.",
            options: [
                { id: 'check', label: "Wait -- cold favours the steadier one MORE?", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Yes. At equilibrium, the colder the flask, the **more** lopsided the mixture becomes towards the steadier product: **94.6%** at -80 °C against **85.1%** at 45 °C.\n\nBut the measurement at the start of this lesson says that at -80 °C you actually get **71% of the faster product**.\n\nBoth of those are true. **Why is there no contradiction?**",
            options: [
                { id: 'frozen', label: "At -80 °C the system never reaches equilibrium, so the equilibrium answer never applies.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'wrong', label: "One of the two numbers must be measured wrong.", nextNodeId: 'math_wrong' },
                { id: 'flip', label: "The steadier product must become the less steady one when cold.", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Neither number is wrong, and nothing swaps which product is steadier -- the energy gap is a property of the two molecules and it is not going to change its sign because the flask got cold.\n\nThe resolution is that the two numbers are answers to **different questions**.\n\n- **94.6%** is where the mixture would settle **if it could get there**\n- **71% the other way** is where it actually is, because at -80 °C it **cannot get there**\n\nCold does two separate things, and they pull opposite ways. It makes equilibrium **more** lopsided towards the steadier product, by the formula. And it makes the reverse reaction **far slower**, so the mixture is stuck wherever the race left it.\n\nThe second effect wins completely, and that is the whole reason cold gives you the kinetic product.\n\nSo the rule of thumb *cold favours the faster product* is true, and the obvious reason for it is **wrong**. Cold does not favour the faster product. **Cold prevents the question being asked**, and you are left looking at the race because nothing can go back and change the result.",
            options: [
                { id: 'retry', label: "Cold freezes it, it does not favour it.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. Two bars are drawn: the split the **race** would give you, which is held at its measured -80 °C value, and the split **equilibrium** would give you, which both dials move. The distance between the bars is the distance between the two regimes.\n\nThings worth doing:\n\n- Put the gap at **0 kJ/mol**. The equilibrium bar sits at **50:50**, whatever the temperature -- because with nothing to choose between them, nothing is chosen. The race bar is still lopsided, which makes the point that they are genuinely different questions.\n- Hold the gap at 4.6 and sweep the temperature. The equilibrium share falls steadily as it warms: **94.6%** cold, **85%** at 45 °C, **76%** at 200 °C. **Heat always evens a mixture out**, because heat is what lets molecules leave the comfortable arrangement.\n- Push the gap to **12 kJ/mol** at room temperature: **99.2%**. Four joules per mole per degree of certainty, roughly -- the exponential is doing the work, not the chemistry.\n- Find a setting where the two bars **agree**. The split is then the same either way, and no experiment on the mixture alone could tell you which regime you were in.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "A chemist needs the **faster** product -- the one the race favours -- and needs a lot of it.\n\nThey know the steadier product is 4.6 kJ/mol lower, so equilibrium is against them at every temperature. They have the reaction running at **-80 °C**, which gives them **71%** of what they want, and they would like more.\n\nA colleague suggests **warming it slightly**, on the grounds that a warmer reaction goes faster and they will get their product sooner.\n\nWhat is wrong with that advice?",
            options: [
                { id: 'drain', label: "Warming lets the product go back, so the mixture starts draining towards the steadier one -- the yield of what they want falls.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'nothing', label: "Nothing -- it will be faster and the share is set by the race either way.", nextNodeId: 'checkpoint_wrong' },
                { id: 'equil', label: "Warming makes equilibrium favour the steadier product more, so it is worse thermodynamically.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The colleague is right that it goes faster, and that is not the risk.\n\nThe risk is that **-80 °C was not an inconvenience, it was the method.** Being too cold for the reverse reaction is the only thing holding the mixture at the race's answer. Warm it and the products start coming back, the system begins sliding towards the steadier one, and the share of the wanted product falls from 71% towards 15%. They would get their product sooner and have less of it.\n\nAnd the third answer has the thermodynamics backwards, which this lesson has already shown. **Warming makes equilibrium less lopsided, not more** -- the steadier product's equilibrium share *falls* from 94.6% to 85.1% to 76.3% as you heat it. Warming hurts here not because equilibrium gets worse but because the mixture is finally **able to reach** it.\n\nSo the real advice is the opposite one: if you want the race's answer, **keep it cold and stop early**. Both halves matter, and both are about denying the system the chance to settle.",
            options: [
                { id: 'retry', label: "The cold was the method, not an obstacle.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and that is the practical shape of this whole lesson.**\n\nTwo products, and which one you get is **not a property of the molecules**. It is a property of what you let the molecules do.\n\n- want the one that **forms faster**? Deny the system the chance to go back: **cold, and stopped early**\n- want the one that is **steadier**? Give it every chance: **warm, and left alone**\n\nThe same flask of the same two chemicals yields either answer on demand, and the choice is made by the conditions rather than by the chemistry.\n\nWhich also answers a question L2C24 could not have asked. Its formula was not a simplification of this one -- the two formulas do not even contain the same quantities, since the speeds vanish from the equilibrium answer entirely. They are answers to two different questions, and **L2C24's condition was what chose the question**. A flame is under kinetic control for exactly the reason stated there: the gases rush away and never come back.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The conditions choose the question!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out that L2C24's condition was the whole lesson.**\n\n- L2C24 said the split is **speed**: one route over the total of both. Its stated condition -- the gases never come back -- was doing all the work\n- Let the products come back and the speeds **drop out of the answer entirely**. The ratio of steadier to faster is **e to the power of (energy gap / R T)**\n- R is **8.314 J per mol per K**, the same R as in pV = nRT, and T is in **kelvin**. The gap in J/mol over R leaves kelvin, which T cancels, so the exponent is a plain number -- as it must be\n- 4.6 kJ/mol at 45 °C: 4600/(8.314 x 318) = **1.74**, e to that power is **5.7 to 1**, a **85%** share. The measured figure\n- A gap smaller than a tenth of one carbon-carbon bond decides the majority product almost six to one. **The exponential turns a small energy difference into a lopsided mixture**\n- **Kinetic control** is the race, and holds while nothing can return. **Thermodynamic control** is the settling, and holds once everything can\n- Butadiene and HBr: **71% the faster product at -80 °C**, and **85% the steadier one** warmed and left. Same flask, opposite majorities\n- And the trap. At equilibrium, **cold favours the steadier product harder** -- 94.6% at -80 °C against 85.1% at 45 °C. So *cold favours the faster product* is true for the opposite reason to the obvious one: **cold does not favour it, cold stops the question being asked**\n- **Heat always evens a mixture out**, because heat is what lets molecules leave the comfortable arrangement\n- So the product you get is not a property of the molecules but of **what you let them do**: cold and stopped early for the race, warm and left alone for the settling\n- **Still standing:** this is where equilibrium **would** end up, and it says nothing about **how long** that takes. Which regime you are actually in is the one question neither formula answers, because the crossover is set by **activation energies** -- how high the hills are, not how deep the valleys. The race's own split is held fixed here at its measured -80 °C value for the same reason. **That is the next thing to remove.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L3C24", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Chemistry Complete -- How Do Networks Deliver What Matters?**\n\nL2C24's answer was not wrong and it was not general. It was the answer to a flame.\n\n**Summary Table:**\n| | L2C24 said | L3C24 says |\n| --- | --- | --- |\n| What decides the split | the **speeds** of the two routes | the **energy gap** between the products |\n| The formula | one route / the total | **e to the (gap / R T)** |\n| Where the speeds went | they were everything | **not in the answer at all** |\n| The condition | nothing comes back | the system **reaches** equilibrium |\n| The name | **kinetic** control | **thermodynamic** control |\n| Butadiene and HBr | -- | **71%** faster product cold, **85%** steadier warm |\n| What warming does | -- | lets it **go back**, so the mixture drains to the steadier one |\n| What cold does | -- | **not** favour the faster product: it **stops the question** |\n| At equilibrium, cold | -- | favours the steadier product **harder**: 94.6% |\n| To get what you want | change the ratio of speeds | **cold and early**, or **warm and left alone** |\n| Still standing | -- | **how long** equilibrium takes needs activation energies |\n\n**The one line to remember:** speed decides where a reaction arrives and stability decides where it stays, so which of the two you are reading is settled not by the molecules but by whether you let them go back -- and the reason cold gives you the faster product is that cold stops them, not that cold prefers them.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
