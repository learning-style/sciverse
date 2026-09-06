import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C1 "Particles on the Move".
 *
 * Structure note: `defining` sits on the MAIN path, reached from both root
 * answers. It used to hang off the misconception branch only, which meant a
 * student who answered correctly skipped both definitions and was then asked
 * to calculate with c -- answering well produced the worse lesson.
 *
 * The teaching order is deliberately intuition first, name second: the idea is
 * built with a price-per-kilogram analogy and a worked example before the
 * formula appears in symbols. "Gram-degree" is an invented convenience, and the
 * lesson says so rather than passing it off as standard usage.
 */
export function getL2C1Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In Level 1 you learned that heating something makes its particles move faster. Now we can work out **exactly how much energy** that takes.\n\nHere is an experiment you could actually run. Take **100 g of water** and **100 g of iron**. Heat each with the same heater for the same length of time, so each receives the **same amount of energy**.\n\nSuppose the water warms by **10 °C**. The iron warms by about **93 °C** -- roughly nine times as much.\n\nSame mass. Same energy in. Why does one get so much hotter than the other?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Iron must need less energy for each degree, so the same energy buys it many more degrees than it buys the water.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Iron is a metal, and metals pull heat in faster than water does, so it soaks up more energy in the same time.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Metals really do carry heat quickly -- that is why a metal spoon left in soup burns your fingers and a wooden one does not. But that is about how fast energy **travels through** something, and it is not what is happening here.\n\nRead the experiment again: both received the **same amount of energy**. That was fixed on purpose. Neither one soaked up more than the other.\n\nSo the difference is not in how much energy each one *got*. It is in what each one **did** with it.",
            options: [
                { id: 'cont', label: "So what did they do differently with the same energy?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Let us build this up slowly, because the idea is much easier than the name they gave it.\n\n**Start with what warming something actually means.** Level 1 told you: the particles in everything are jiggling, and hotter means jiggling faster. So warming something up means **paying energy to make its particles jiggle faster**.\n\nWhich raises a fair question: **what does one degree cost?**\n\nAsk it about a whole object first. How much energy to warm a **bathtub** of water by 1 °C? About **600,000 J**. And a **cup** of water by 1 °C? About **800 J**.\n\nSame water in both. Wildly different answers -- because the bathtub has far more particles that all need to speed up.\n\nThat number, for one whole object, has a name. It is that object's **heat capacity**, measured in **joules per degree Celsius (J/°C)**.\n\nUseful if you own that exact bathtub. Useless for comparing water against iron -- because the answer depends mostly on **how big your sample happens to be**, not on what it is made of.",
            options: [
                { id: 'cont', label: "So how do you compare the substances themselves?", nextNodeId: 'per_gram' }
            ]
        },
        per_gram: {
            id: 'per_gram',
            speaker: 'AI',
            content: "You have met this problem before, in a shop.\n\nA big sack of rice costs more than a small bag of lentils. Does that make rice the more expensive food? Of course not -- you compared **bag sizes**, not foods.\n\nWhich is exactly why shops print the price **per kilogram** on the shelf label. Divide the bag size out, and suddenly the two are comparable.\n\nDo the same here. Take the energy for one degree, and divide by the mass, so you get the cost for just **one gram**:\n\n**The energy needed to warm 1 gram of a substance by 1 °C.**\n\nThat is the number that describes the substance itself, and it is called the **specific heat capacity**. Its symbol is **c**, and its unit is **joules per gram per degree Celsius**, written **J/g/°C**.\n\nThe word **specific** is doing the same job as \"per kilogram\" on a shelf label. In science it means **the amount has been divided out**, so what is left is about the stuff, not about how much of it you happen to have.\n\nSo now the two can finally be compared:\n\n- **Water: 4.2 J/g/°C**\n- **Iron: 0.45 J/g/°C**\n\nOne gram of water, one degree warmer, costs **4.2 J**. The same job on iron costs **0.45 J**. **Water is about nine times dearer to heat**, and that is the whole explanation for the experiment you started with.",
            options: [
                { id: 'why', label: "Why would water be so much more expensive?", nextNodeId: 'why_water' }
            ]
        },
        why_water: {
            id: 'why_water',
            speaker: 'AI',
            content: "Good question, and the answer is a picture rather than a number.\n\n**In iron**, the atoms sit in a fixed framework, like people standing on marked spots in a hall. Push energy in and they wobble on their spots, faster and faster. Almost every joule turns straight into jiggling -- and jiggling is exactly what a thermometer measures.\n\n**In water**, the molecules **cling to each other**. Picture a crowd holding hands. To get them moving faster you have to stretch and break those grips, again and again, all the way through.\n\nThat grip-breaking swallows energy too. But it is not jiggling, so **the thermometer never sees it**.\n\nSo in water your energy is buying two things at once: some jiggling, and a great deal of grip-breaking. In iron it is buying almost nothing but jiggling.\n\nYou pay for two things and only get credit for one. **That is where the factor of nine comes from** -- and it is also why water is going to keep behaving oddly for the rest of this lesson.",
            options: [
                { id: 'cont', label: "Now show me how to cost a whole job.", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Right. **c** is a price for one gram warmed by one degree. To cost a real job you need to know **how many of those you are buying**.\n\nTwo things decide that:\n\n- how many **grams** there are\n- how many **degrees** you want to gain\n\nMultiply them and you have the size of your order. There is no official name for \"one gram warmed by one degree\", so let us just call it a **gram-degree** for this lesson -- it is exactly the thing **c** prices.\n\n**Worked example: 200 g of water, warmed by 30 °C.**\n\n**Step 1 -- how much are we buying?**\n200 g x 30 °C = **6,000 gram-degrees**\n\n**Step 2 -- what does one cost?**\nWater's price is **4.2 J** per gram-degree.\n\n**Step 3 -- multiply the amount by the price.**\n6,000 x 4.2 J = **25,200 J**\n\nThat is the whole method: **work out how much you are buying, then multiply by the price.**\n\nWritten in symbols, those three steps are one line:\n\n**Q = m x c x dT**\n\n**Q** is the energy in **joules (J)**. **m** is the mass in **grams (g)**. **dT** is the temperature change in **°C** -- the symbol just means \"the change in T\". And **c** is the price, in **J/g/°C**.\n\nOne last check, and it is a good habit. Multiply the units: **g** x **J/g/°C** x **°C**. The grams cancel, the degrees cancel, and **J** is left. If your units do not cancel down to joules, the formula has been put together wrong.",
            options: [
                { id: 'try', label: "Let me try one myself.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn**, and this time it is iron.\n\nHow much energy does it take to heat **150 g of iron** by **40 °C**?\n\nIron's specific heat capacity is **0.45 J/g/°C**.\n\nUse the same three steps: how many gram-degrees, what does one cost, multiply.",
            options: [
                { id: 'right', label: "2,700 J. 150 g x 40 °C = 6,000 gram-degrees, and 6,000 x 0.45 J = 2,700 J.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_c', label: "6,000 J, because 150 g x 40 °C = 6,000.", nextNodeId: 'math_wrong' },
                { id: 'same_as_water', label: "25,200 J, the same as the water, because energy is energy whatever you heat.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both worth looking at, because they are different mistakes.\n\n**6,000** is a real number in this problem -- it is how many **gram-degrees** you are buying. You did step 1 correctly and then stopped. But 6,000 is the size of the order, not the bill. You still have to multiply by the price, and iron's price is 0.45 J each.\n\nThe units say so too: g x °C gives you **gram-degrees**, not joules. Nothing has turned into energy yet.\n\n**25,200 J** is the answer for the *water*, and this one is the more interesting slip. Notice the order is the same size in both problems -- 200 x 30 and 150 x 40 both come to **6,000 gram-degrees**. That was on purpose. Everything about the two jobs is identical except **what you are heating**.\n\nAnd the bill is nine times smaller, purely because iron is cheaper per gram-degree. Same order, different price list.\n\n6,000 x 0.45 J = **2,700 J**",
            options: [
                { id: 'retry', label: "Work out the order, then multiply by that substance's price.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, and the lab does the same job on both substances at once.\n\n**Mass** is how many **grams** you are heating.\n**Temperature Rise** is how many **°C** you want to gain.\n\nTogether they set the size of the order. The two bars then show the bill for water and for iron, from the same order at two different prices.\n\nMove either dial and both bars grow together, because mass and temperature rise change the **order**, and the order is the same for both. What never changes is the **ratio** between them -- water always costs about nine times what iron does, at every setting.\n\nThat is what it means for all three factors to be multiplied. Changing m or dT scales both bills by the same amount, so it can never close the gap that **c** opens.",
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
                { id: 'right', label: "Water costs about five times more per gram-degree, so the same energy buys the sea about five times fewer degrees than it buys the sand.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Water is simply a cold substance by nature, and sand is a warm one, so they settle at different temperatures whatever the Sun does.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Nothing is warm or cold \"by nature\". Put sea water on a stove and it boils happily; leave sand out overnight and it goes freezing.\n\nThis time the **energy** is what is fixed and the **degrees** are what you want to find. So turn the formula round. If you know the energy and want the temperature change:\n\n**dT = Q / (m x c)**\n\nNow **c is the denominator**, so it is an **inverse proportion** -- the same shape mass had in L2P1. A bigger c means a smaller temperature change for the same energy.\n\nSand: **0.8 J/g/°C**. Water: **4.2 J/g/°C**. Water's price is about **five times** higher, so the same sunlight on the same mass buys the sea about **one fifth** of the temperature rise.\n\nThink of it as a fixed amount of money buying fewer expensive items than cheap ones.\n\nAnd this is not a beach curiosity. It is why places by the sea have milder weather than places inland -- the ocean soaks up enormous energy in summer without warming much, then gives it back slowly in winter. **Water's stubbornness about changing temperature is one of the biggest reasons the planet's climate is as steady as it is.**",
            options: [
                { id: 'retry', label: "Fixed energy buys fewer degrees when each degree costs more.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The same energy buys very different temperature changes, depending on what you are heating.**\n\nNotice you have now used the same relationship two ways round:\n\n**Q = m x c x dT** -- you know the order, you want the bill\n**dT = Q / (m x c)** -- you know the bill, you want the order\n\nSame physics. Rearranging moves **c** from being multiplied to being divided by, which flips it from behaving like a price to behaving like a brake.\n\nBefore we finish, one more question -- and it is the one a careful student always asks next.",
            options: [
                { id: 'limits', label: "Go on.", nextNodeId: 'limits' }
            ]
        },
        limits: {
            id: 'limits',
            speaker: 'AI',
            content: "We have used **4.2 J/g/°C** for water as though it were a fixed fact, printed on a shelf label that never changes.\n\nSo: is **c** the same number at every temperature? Would 4.2 J/g/°C work just as well from **0 °C to 30 °C** as it would from **360 °C to 450 °C**?",
            options: [
                { id: 'right', label: "No. It drifts a little as the temperature changes, and it changes completely when the substance melts or boils -- ice, liquid water and steam each have their own price.", nextNodeId: 'limits_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. c is a property of the substance, so one number covers water at any temperature you like.", nextNodeId: 'limits_wrong' }
            ]
        },
        limits_wrong: {
            id: 'limits_wrong',
            speaker: 'AI',
            content: "It is a reasonable assumption, and very nearly true over small ranges. But it fails in two ways, and the second is serious.\n\n**First, the price drifts.** Liquid water is about **4.22 J/g/°C** near 0 °C and about **4.18 J/g/°C** near 35 °C. That is roughly a 1% change -- far too small to matter here, which is why one value of 4.2 J/g/°C is honest enough for this lesson.\n\n**Second, and much bigger: the price changes completely when the state changes.**\n\n- **Ice: about 2.1 J/g/°C**\n- **Liquid water: about 4.2 J/g/°C**\n- **Steam: about 2.0 J/g/°C**\n\nAs far as this formula is concerned those are three different substances with three different price lists. Your 360 °C to 450 °C example is not liquid water at all -- above 100 °C it is **steam**, so the price is 2.0 J/g/°C, not 4.2.\n\n**And at the moment of the change, the formula stops working altogether.** Hold ice at exactly 0 °C and keep heating. Energy pours in and the temperature **does not move** until every last bit has melted. Q = m x c x dT would say that dT = 0 °C means Q = 0 J -- no energy needed. That is plainly false; a great deal of energy went in.\n\nGo back to the hand-holding picture and it makes sense. At a melting or boiling point, **all** of your energy goes into breaking grips and none into jiggling. The thermometer only reads jiggling, so it sits perfectly still while a huge amount of energy disappears into pulling the particles apart.\n\nThat hidden energy has a name -- **latent heat** -- and it is Level 3's job.",
            options: [
                { id: 'retry', label: "One price per state, and no price works at the change itself.", nextNodeId: 'limits_correct' }
            ]
        },
        limits_correct: {
            id: 'limits_correct',
            speaker: 'AI',
            content: "Correct, and asking that question is worth as much as the formula itself.\n\n**Every formula comes with conditions.** L2B33's probability assumed species fail independently. This one assumes **c holds still**, and it only does that within a single state of matter, over a moderate range.\n\nWhat you can now do:\n\n- Heat water from 20 °C to 80 °C. **Fine** -- all liquid, price 4.2 J/g/°C\n- Heat ice from -20 °C to -5 °C. **Fine** -- all solid, price 2.1 J/g/°C\n- Heat ice at -10 °C all the way to steam at 150 °C. **Not with this formula alone** -- it crosses two changes of state, and the formula is blind to both\n\n**Coming in Level 3:** the energy a change of state swallows -- **latent heat** -- so that last job becomes possible. Level 3 also asks *why* water grips itself so strongly in the first place, which is where its unusually high price comes from.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One price per state, and only within that state!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You costed a heating job.**\n\n- Warming something means **paying energy to make its particles jiggle faster**\n- **Heat capacity** is what one degree costs for **one whole object**, in **J/°C** -- it depends on size\n- Dividing the size out gives the price for **1 gram**, the way a shelf label gives a price per kilogram\n- **Specific heat capacity (c)** is the energy to warm **1 gram** by **1 °C**, in **J/g/°C**\n- **Specific** is the science word for \"per kilogram\" -- the amount has been divided out\n- **Water: 4.2 J/g/°C.** **Iron: 0.45 J/g/°C.** **Sand: about 0.8 J/g/°C**\n- Water is dear because its molecules **cling to each other**, and breaking those grips costs energy the thermometer never sees\n- Cost a job in three steps: **grams x degrees**, then **multiply by the price**\n- In symbols, **Q = m x c x dT**, with Q in **joules (J)**\n- The units cancel to joules -- if yours do not, the formula is wrong\n- Rearranged, **dT = Q / (m x c)** -- c is now the denominator, so it becomes an inverse proportion\n- **c is not truly constant**: it drifts about 1%, and changes outright between **ice 2.1**, **water 4.2** and **steam 2.0 J/g/°C**\n- At a melting or boiling point the formula **fails completely** -- energy goes in and dT stays at 0 °C\n\nNext in B1: how much force your muscles really have to produce.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Work out the order, multiply by the price!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Much Heat?**\n\nLevel 1 said heating makes particles move faster. The arithmetic says **what that costs**, why the price differs for every substance, and where the formula stops being true.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Heat capacity | **J/°C** | One degree for one whole object |\n| Divide the size out | energy for **1 gram** | Like a price per kilogram on a shelf |\n| Specific heat capacity | **J/g/°C**, symbol **c** | The price for **one gram-degree** |\n| The prices | water **4.2**, iron **0.45**, sand **0.8**, all in **J/g/°C** | Water is about 9x dearer |\n| Why water is dear | grips must be broken too | The thermometer never sees that part |\n| Costing a job | grams x degrees, then x price | **Q = m x c x dT** |\n| Check the units | g x J/g/°C x °C | Cancels to **J** |\n| Turned round | **dT = Q / (m x c)** | Fixed energy buys fewer dear degrees |\n| The condition | c holds still | One price **per state of matter** |\n| Where it breaks | melting and boiling | Energy in, but **dT = 0 °C** |\n\n**The one line to remember:** work out how many gram-degrees you are buying, then multiply by that substance's price -- and remember the price only holds while the substance stays in one state.\n\n**Up next:** B1 -- why your bicep pulls with eight times the weight you are holding. **In Level 3:** latent heat, and why water grips itself so tightly."
        }
    };
}
