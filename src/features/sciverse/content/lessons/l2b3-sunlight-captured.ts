import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B3 "Food Chains".
 *
 * B3 traced Sun -> grass -> rabbit -> fox. This lesson quantifies only the
 * FIRST arrow, deliberately. Big Idea 33 owns the trophic pyramid and the 10%
 * rule; duplicating it here would make two Big Ideas read as one. What is
 * missing there is the step before it -- how much of the sunlight arriving at a
 * leaf ever enters the chain at all.
 *
 * The answer, about 1%, then explains why leaves are green: the plant is
 * discarding the part of the spectrum it cannot use.
 */
export function getL2B3Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B3 traced the chain backwards: fox, rabbit, grass, Sun. Everything alive is running on sunlight that a plant caught first.\n\nSo how good are plants at catching it?\n\nOn a clear day, sunlight arrives at about **1,000 joules every second, on every square metre**. That is **1,000 watts per square metre**, and a **watt** is simply one joule per second.\n\nOver six hours, one square metre of leaf receives about **21.6 million joules**.\n\nHow much of that do you think ends up stored as food?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Probably a small fraction. Leaves get warm and they reflect a lot of light, so most of that energy must be doing something other than making food.", nextNodeId: 'budget', sentiment: 'positive' },
                { id: 'bad', label: "Most of it. Plants have had hundreds of millions of years to get good at this, so photosynthesis should be highly efficient by now.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is a reasonable expectation and it is spectacularly wrong. Photosynthesis captures roughly **one per cent**.\n\nAbout **99% of the sunlight landing on a leaf never becomes food at all.**\n\nBefore explaining why, notice that you can already see the evidence, and you have been looking at it your whole life.\n\n**Leaves are green.** A leaf looks green because green light **bounces off it** -- it is the part of the sunlight the leaf sends straight back rather than absorbing. Chlorophyll takes in red light and blue light well, and reflects the green in the middle.\n\nSo the colour of every plant on Earth is a photograph of energy being thrown away. If leaves absorbed the whole spectrum they would look black, and a fair number of the losses in that 99% would disappear.\n\nThe rest goes to warming the leaf, evaporating water, and to chemistry that is simply imperfect.\n\nEvolution has had hundreds of millions of years, and 1% is what it managed -- which tells you the job is genuinely hard, not that plants are lazy.",
            options: [
                { id: 'cont', label: "Then let me work out what 1% actually amounts to.", nextNodeId: 'budget' }
            ]
        },
        budget: {
            id: 'budget',
            speaker: 'AI',
            content: "Do the arithmetic in three steps.\n\n**Step 1 -- how much arrives.** Power multiplied by time gives energy. A **watt** is a joule per second, so seconds are what you need:\n\n**energy = power x area x time**\n\n1,000 W/m² x 1 m² x 6 hours x 3,600 seconds = **21,600,000 J**, or **21.6 MJ**\n\n**Step 2 -- how much is kept.** About 1% of it:\n\n21,600,000 x 0.01 = **216,000 J**, or **216 kJ**\n\n**Step 3 -- turn that into food.** Glucose stores about **15.6 kJ per gram**, a figure measured by exactly the calorimetry you did in L2C3:\n\n216 / 15.6 = **about 13.8 g of glucose**\n\nSo one square metre of leaf, in six hours of good sun, makes roughly **14 grams** of sugar. About three teaspoons.\n\nIt sounds like nothing. But a mature tree carries hundreds of square metres of leaf, and it does this every day for months -- which is how the wood gets built. Van Helmont's willow, back in L2C33, gained 74 kg this way.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A plant has **2 m²** of leaf and gets **5 hours** of full sun at **1,000 W/m²**.\n\nTaking photosynthesis as **1% efficient** and glucose as **15.6 kJ/g**, how much glucose does it make?",
            options: [
                { id: 'right', label: "About 23 g. Energy in = 1,000 x 2 x 5 x 3,600 = 36 MJ. One per cent is 360 kJ, and 360 / 15.6 = 23 g.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'hours', label: "About 0.006 g, from 1,000 x 2 x 5 = 10,000 J, then 1% of that divided by 15.6.", nextNodeId: 'math_wrong' },
                { id: 'no_eff', label: "About 2,300 g, from 36 MJ divided by 15.6 kJ/g.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two slips, and the first is the one that catches almost everybody.\n\n**Using hours directly.** A watt is a joule **per second**, so multiplying watts by hours gives joule-hours per second -- a quantity that means nothing. The units have to agree before you multiply. Convert first: 5 hours x 3,600 = **18,000 seconds**.\n\n1,000 W/m² x 2 m² x 18,000 s = **36,000,000 J**\n\nThat is the same habit L2C1 taught with grams and degrees. **Check that the units cancel to what you want before you trust the number.** Here they cancel to joules only if the time is in seconds.\n\n**Forgetting the 1%** gives 2,300 g -- over two kilograms of sugar from one small plant in an afternoon. Worth a sense check: no plant on Earth does that. The efficiency is the entire point of the lesson, and leaving it out inflates the answer a hundredfold.\n\n36,000,000 x 0.01 = 360,000 J = **360 kJ**\n360 / 15.6 = **about 23 g**",
            options: [
                { id: 'retry', label: "Seconds, not hours -- and do not forget the 1%.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, with the Sun fixed at **1,000 W/m²** and photosynthesis at **1%**.\n\n**Leaf Area** sets how much leaf is catching light. **Hours of Sun** sets how long for.\n\nThe lab shows the energy arriving, the sliver that is kept, and the glucose that makes.\n\nWatch the two numbers side by side, because the gap is the lesson. Even at settings where the plant makes a satisfying pile of sugar, the energy arriving dwarfs the energy kept -- the discarded column is always about a hundred times the useful one.\n\nAnd both dials behave the same way. Doubling the area doubles the food; doubling the hours doubles it too. **Energy = power x area x time**, all three multiplied, so no dial can rescue a shortfall in another -- exactly the shape of L2C1's Q = m x c x dT.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The discarded column dwarfs the kept one. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A gardener says: \"Photosynthesis is only 1% efficient. That is a terrible design -- if plants were better at it, there would be far more food in the world.\"\n\nThe efficiency figure is right. Is the conclusion?",
            options: [
                { id: 'right', label: "The figure is right but the framing is wrong. That 1% is the entire input to every food chain on Earth, so it is not a small quantity -- it is the whole supply, and it is already enough to build forests.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- 1% is clearly wasteful, so improving photosynthesis is the obvious way to get more food out of the same land.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Raising photosynthetic efficiency is a real goal that real laboratories work on, so the instinct is not silly. But calling 1% \"terrible\" mistakes what the number is measuring.\n\n**One per cent of an enormous quantity is still an enormous quantity.** The Sun delivers about a thousand watts to every square metre of lit ground, free, all day, everywhere. A hundredth of that, collected across every leaf on the planet, is what builds every forest, feeds every animal and laid down every scrap of coal and oil ever burned.\n\nIt is worth being precise about what the 1% is a fraction **of**. It is not 1% of the plant's food being wasted. It is 1% of the **incoming sunlight** being captured -- and the other 99% was never the plant's to begin with. It arrived, warmed the leaf, evaporated some water and left.\n\nThe number that matters for a food chain is not the efficiency but the **total**: about 14 grams of glucose per square metre of leaf per good day. That is the entire budget every living thing above the plant has to share.\n\nAnd **sharing it is where the losses really bite.** Each step from plant to plant-eater to predator loses far more than photosynthesis ever did -- which is Big Idea 33's subject, not this one. This lesson is only about the **first** arrow in B3's chain, the one that fills the tank.",
            options: [
                { id: 'retry', label: "1% of a huge number is the whole supply.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A small fraction of a vast supply is still the whole supply.**\n\nThat completes Big Idea 3 at Level 2, and the three lessons have one thing in common: each takes an energy story that Level 1 told in pictures and attaches joules to it.\n\n- **L2P3** -- **PE = mgh** becomes **KE = ½mv²**, and the shortfall in a real experiment is heat\n- **L2C3** -- **calorimetry** measures a reaction by measuring the water it heats, then divides by the fuel\n- **L2B3** -- **energy = power x area x time**, and about **1%** of it becomes food\n\nAnd all three ended in the same place, which is not a coincidence. The ball lost joules to friction. The calorimeter lost joules to the room. The leaf loses 99% to reflection and warming.\n\n**Every energy story at this level ends with most of the energy somewhere you did not want it.** Level 2 treats that as a nuisance to be measured. Level 3 asks whether it is a nuisance at all, or a law -- and the answer turns out to put a hard ceiling on what any engine, any reaction and any living thing can ever achieve.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A small fraction of a vast supply!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You costed the first step of every food chain.**\n\n- Sunlight arrives at about **1,000 W/m²**; a **watt** is one joule per second\n- **energy = power x area x time**, with time in **seconds**\n- One square metre for six hours receives about **21.6 MJ**\n- Photosynthesis captures about **1%** of it\n- Glucose stores about **15.6 kJ/g**, measured by L2C3's calorimetry\n- So one square metre of leaf makes about **14 g** of glucose in a good day\n- **Leaves are green because green light is reflected** -- energy visibly thrown away\n- If leaves absorbed everything they would look black\n- The other 99% warms the leaf and evaporates water; it was never the plant's\n- **1% of a vast supply is still the whole supply** for every living thing above\n- What happens to it *after* the plant is Big Idea 33's subject\n\nBig Idea 3 is complete at Level 2.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Power x area x time, then one per cent!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Much Sunlight a Leaf Keeps!**\n\nB3 drew an arrow from the Sun to the grass. Level 2 measures that arrow, and finds it thinner than anyone expects.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Sunlight arriving | about **1,000 W/m²** | A watt is a joule per second |\n| Energy from power | **power x area x time** | Time in **seconds**, not hours |\n| One square metre, six hours | **21.6 MJ** | Before anything is kept |\n| Photosynthesis keeps | about **1%** | **216 kJ** of the 21.6 MJ |\n| Into food | **15.6 kJ/g** of glucose | About **14 g** in a good day |\n| Why leaves are green | green light is reflected | The colour is energy discarded |\n| Not a design fault | 1% of a vast supply | It builds every forest on Earth |\n| What happens next | Big Idea 33's pyramid | This lesson is only the first arrow |\n\n**The one line to remember:** a leaf throws away ninety-nine parts in a hundred, and the one part it keeps is what every living thing on Earth is running on.\n\n**Big Idea 3 is complete at Level 2** -- a ball's energy budget, a reaction's energy measured through water, and the thin first arrow of every food chain."
        }
    };
}
