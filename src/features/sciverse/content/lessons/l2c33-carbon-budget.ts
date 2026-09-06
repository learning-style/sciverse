import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C33 "Nature's Recycling Loop".
 *
 * Level 1 established that matter cycles. This lesson makes the cycle a budget:
 * reservoirs, fluxes, and net change as a subtraction. It is deliberately the
 * arithmetic opposite of L2P33 -- energy compounds multiplicatively, matter
 * balances additively -- and the two are compared directly at the end.
 */
export function getL2C33Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In the 1640s a scientist called Jan van Helmont tried an experiment that took him five years.\n\nHe planted a small willow tree in a pot, and he weighed everything first. The tree: **2.3 kg**. The dry soil: **90.7 kg**.\n\nFive years later he weighed it all again. The tree now weighed **76.7 kg** -- it had gained **74.4 kg** of new wood, bark and leaves.\n\nAnd the soil had lost **57 grams**. Not 57 kilograms. Fifty-seven **grams**.\n\nSo where did the other 74.3 kg come from?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Out of the air and the water. A gas has mass too, and the tree was pulling carbon dioxide out of the atmosphere the whole five years.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Out of the soil. His scales must have been slightly off, because a tree obviously grows out of the ground it is standing in.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The scales were fine. And look at the size of the gap -- this is not a small error.\n\nThe soil lost **0.057 kg**. The tree gained **74.4 kg**. The tree gained about **1,300 times** more than the soil lost.\n\nThat matters because of a rule with no exceptions, called **conservation of mass**: atoms are never created and never destroyed. If 74.4 kg of tree appeared, then 74.4 kg of atoms arrived from somewhere. They cannot have come from soil that only gave up 57 grams.\n\nVan Helmont decided it must all be water. He was half right, and for his time that was a brilliant answer.\n\nHere is the full one. Dry wood is about **50% carbon** by mass, and **every one of those carbon atoms arrived as a gas**. The tree was quietly taking carbon dioxide out of the air and building it into itself.\n\nA tree is made mostly of air.",
            options: [
                { id: 'cont', label: "So the mass came out of the atmosphere, not the ground?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly. And once you accept that atoms are only ever moved around, you can start doing bookkeeping on them.\n\n**Photosynthesis**, written as a word equation:\n\ncarbon dioxide + water --> sugar + oxygen\n\nThe carbon goes into the plant. The oxygen is let go. **Respiration** runs the same equation backwards, which is why animals -- and plants at night -- breathe carbon dioxide back out.\n\nNow two words that turn this into maths. The difference between them is the whole lesson, so it is worth being slow about.\n\n**A reservoir** is an **amount** of carbon sitting somewhere -- the air, living plants, the soil, the ocean. You measure it in **kilograms**. Nothing about it mentions time.\n\n**A flux** is a **flow** of carbon from one reservoir to another. You measure it in **kilograms per year**. A flux is not an amount; it is an amount **per year**, so time is built into it.\n\nThink of a bath. The water in the bath is the **reservoir**, measured in litres. The tap and the drain are **fluxes**, measured in litres per minute.\n\nAnd here is the part that is easy to get wrong: **a single flux is not the change in the reservoir.** Knowing the tap is running does not tell you whether the bath is filling up. You have to know what the drain is doing as well.\n\n- **Photosynthesis** takes carbon **out of the air** and builds it into plants.\n- **Respiration** and **decay** put carbon **back into the air**.\n\nThe change comes from the difference between the two:\n\n**net change = flux in - flux out**\n\nThat answer is in **kilograms per year** as well. It is a **rate**, not a total. To get a total you multiply it by how many years have gone by.\n\nNo powers, no compounding. Just a subtraction -- but the sign of the answer decides everything.",
            options: [
                { id: 'try', label: "Let me try the bookkeeping.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn**, and this one needs two steps.\n\nA tree adds **500 kg** of dry wood over its lifetime. Dry wood is about **50% carbon**.\n\nA carbon dioxide molecule is one carbon atom joined to two oxygen atoms, and those oxygens are heavier than the carbon. The whole molecule weighs about **3.7 times** what its carbon alone weighs.\n\nSo how much **carbon dioxide** did this tree take out of the air?",
            options: [
                { id: 'right', label: "About 925 kg. Half of 500 is 250 kg of carbon, and 250 x 3.7 = 925 kg of carbon dioxide.", nextNodeId: 'budget', sentiment: 'positive' },
                { id: 'one_step', label: "250 kg, because half of the wood's mass is carbon.", nextNodeId: 'math_wrong' },
                { id: 'divided', label: "About 68 kg, because 250 divided by 3.7 is 68.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both near misses, and both worth naming.\n\n**Stopping at 250 kg** answers a different question. 250 kg is the mass of **carbon** now locked in the wood -- that part is right, and it is step one. But the question asked for the mass of **carbon dioxide** the tree pulled from the air, and carbon dioxide is heavier than carbon alone, because it is dragging two oxygen atoms along with it.\n\n**Dividing by 3.7** is the right number used the wrong way round. Ask yourself which should be the bigger figure. The whole molecule must weigh **more** than the one atom inside it, so you multiply.\n\n250 x 3.7 = **925 kg of carbon dioxide**.\n\nThat is a useful habit whenever you use a ratio: before you calculate, decide whether the answer should come out bigger or smaller. It catches an upside-down ratio every time.",
            options: [
                { id: 'retry', label: "Check the direction first, then multiply.", nextNodeId: 'budget' }
            ]
        },
        budget: {
            id: 'budget',
            speaker: 'AI',
            content: "Now scale that up from one tree to a whole landscape.\n\nBefore any of this means anything you have to say **which reservoir you are tracking**, because \"in\" and \"out\" only mean something once there is a thing to be in or out of.\n\nWe are going to track **the air**. Not because the land is less interesting, but because the air is what the words \"sink\" and \"source\" were built around, and because the air is the part people worry about.\n\nSo from here on, in and out mean in and out of **the air**:\n\n- **Flux in** -- carbon going **into the air**. That is **respiration and decay**.\n- **Flux out** -- carbon coming **out of the air**. That is **photosynthesis**.\n\nGo back to the bath for a moment. **The air is the bath.** Respiration and decay are the tap running in. Photosynthesis is the drain letting water out.\n\nOne warning about the picture. **Green does not mean good here.** Green simply marks carbon going **into** the air -- which is the direction we are about to call a problem.\n\nEcologists measure both fluxes in **kilograms of carbon per square metre per year**:\n\n**Flux in** -- what respiration and the **decomposers** put back into the air.\n**Flux out** -- what photosynthesis pulls out of the air.\n\nNeither number on its own tells you whether the air's carbon is building up. Only the difference does.\n\nSubtract, and the sign tells you what kind of place you are standing in.\n\n- **In is bigger than out** -- the air is **gaining** carbon. This land is a **carbon source**.\n- **Out is bigger than in** -- the air is **losing** carbon. This land is a **carbon sink**.\n- **In equals out** -- the air's carbon does not move. This is **steady state**, and most old forests sit close to it.\n\nBecause we are tracking the air, both words now mean exactly what they sound like. A kitchen **sink** is where water leaves the room; a carbon **sink** is where carbon leaves the air. A **source** is where something comes from, like the source of a river; a carbon **source** is where carbon comes from, back into the air.\n\nThis is also why the words are always used this way in the news. When people worry about a forest \"becoming a carbon source\", they mean it has stopped draining the air and started filling it.\n\nAnd remember what the very first experiment told you. Atoms are never destroyed, so **whatever the air loses, the land gains** -- exactly, to the last gram. Tracking one is tracking both.\n\nAnd because it is a subtraction rather than a multiplication, the total just adds up year after year:\n\n**change in the air's carbon after n years = net change x n**\n\nA negative answer means the air lost that much -- and the land gained it.\n\nSlide **Photosynthesis** and **Decomposition** and watch the balance tip.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "I have tipped it both ways. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two pieces of land. Both capture **exactly the same** amount of carbon by photosynthesis: **1.2 kg per square metre per year**.\n\n**Forest A** is warm and wet. Its decomposers work fast all year: flux out **1.2 kg**.\n**Bog B** is cold and waterlogged. Its decomposers barely work: flux out **0.7 kg**.\n\nOver **50 years**, which one removes more carbon **from the air** -- and how much more?",
            options: [
                { id: 'right', label: "Bog B, by 25 kg per square metre. Its net change is 0.7 - 1.2 = -0.5 kg a year, so the air loses 0.5 x 50 = 25 kg. Forest A's net change is zero, so the air neither loses nor gains.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Forest A, because warm wet forests are the fastest-growing places on Earth and grow far more plant material.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Read the question again -- it says both capture **exactly the same** amount. The growing is identical. That was deliberate, because it forces the answer to come from the other side of the sum.\n\nRemember we are tracking **the air**, so **in** means respiration and decay, and **out** means photosynthesis.\n\n**Forest A:** 1.2 in, 1.2 out. Net change **0**. After 50 years the air has neither lost nor gained. It is not failing -- it is at **steady state**, growing and rotting at the same rate.\n\n**Bog B:** 0.7 in, 1.2 out. Net change **-0.5 kg** a year, and the minus sign says the air is **losing**. After 50 years: 0.5 x 50 = **25 kg per square metre** taken out of the air, and now sitting in the bog.\n\nThe bog wins, and not by growing faster. It wins by **rotting slower**, which makes its flux **in** small.\n\nThis is not a puzzle-book trick. It is why the world's peat bogs and frozen soils hold more carbon than every forest on Earth put together, despite growing very little. Cold and waterlogged means decomposers cannot work.\n\nAnd it is why warming them is so serious. Warming speeds up the decomposers, which raises the flux **into** the air -- and once in is bigger than out, a **carbon sink** becomes a **carbon source**. Centuries of stored carbon start coming back.",
            options: [
                { id: 'retry', label: "It stores more because it releases less, not because it grows more.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **What a place stores depends on both fluxes, and the slower one is often the one that decides.**\n\nNow put this lesson next to L2P33 and notice they are arithmetic opposites.\n\n**Energy (L2P33):** **E = base x efficiency to the power of n**. Multiplicative. Each step multiplies again, so losses **compound** and the fall is brutal.\n\n**Matter (L2C33):** **net = in - out**, then **total = net x n**. Additive. Nothing compounds; the same amount is added every year, and it can go negative.\n\nThat difference is not a coincidence -- it comes straight from the physics of the two lessons.\n\nEnergy makes one **one-way** trip. It arrives from the Sun, and every level it passes through takes its cut and dumps the rest as heat. That is a chain of multiplications, and it ends.\n\nMatter goes in a **circle**. The same atoms return, so what matters is not how much is lost per step but whether more is arriving in a reservoir than leaving it. That is a subtraction, and it never ends.\n\n**Energy flows through and compounds. Matter cycles round and balances.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Energy compounds. Matter balances.", nextNodeId: 'why_it_matters' }
            ]
        },
        why_it_matters: {
            id: 'why_it_matters',
            speaker: 'AI',
            content: "One last question, and it is the one everybody asks: **is more carbon in the air a good thing or a bad thing?**\n\nThe honest answer is that it depends entirely on **how much** and **how fast** -- and it is worth being precise, because carbon dioxide is not a villain.\n\n**Some is essential.** Carbon dioxide is not a poison. Plants need it, and every gram of van Helmont's willow came out of it. It also traps heat near the surface, and that trapping is what makes the planet liveable: without it, Earth's average temperature would be about **-18 °C** instead of the roughly **15 °C** we actually get. A world with no carbon dioxide in the air would be frozen solid.\n\n**The trouble is the amount changing quickly.** Before people began burning coal and oil in large quantities, the air held about **280 molecules of carbon dioxide in every million**. That is written **280 parts per million**, or **280 ppm**. Today it is about **420 ppm** -- roughly **50% more**, in about two hundred years.\n\nMore carbon dioxide traps more heat. More trapped heat means warmer air and oceans, ice melting, seas rising, and rainfall patterns shifting away from the places farms and cities were built for.\n\nSo: a little is essential, and the present rise is a serious problem -- not because the gas is bad, but because **moving a planet's thermostat quickly is very expensive to live with**.\n\nAnd this is exactly why the arithmetic you just did matters. People currently add roughly **10 billion tonnes of carbon** to the air each year. The world's sinks -- forests, soils, bogs and above all the ocean -- pull a little over **half** of it back out. The rest stays, which is why that ppm number keeps climbing.\n\nEvery bog drained and every forest cleared flips a **sink** into a **source**, and pushes that balance the wrong way.",
            options: [
                { id: 'disc', label: "A little is essential; the fast rise is the problem.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You turned the carbon cycle into a budget.**\n\n- **Conservation of mass**: atoms are never made or destroyed, only moved\n- Van Helmont's willow gained 74.4 kg while the soil lost 57 g -- a tree is made mostly of **air**\n- Dry wood is about **50% carbon**, and every carbon atom arrived as a gas\n- Carbon dioxide weighs about **3.7 times** its carbon alone\n- A **reservoir** is an **amount** of carbon, in kilograms -- a bath full of water\n- A **flux** is a **flow** between reservoirs, in kilograms per year -- a tap or a drain\n- **A single flux is not the change.** The change is the difference between two fluxes\n- **net change = flux in - flux out**\n- Everything is measured **in and out of the air**: in is respiration and decay, out is photosynthesis\n- In bigger than out is a **carbon source** -- the air is **gaining**\n- Out bigger than in is a **carbon sink** -- the air is **losing**, like water down a kitchen sink\n- Equal is **steady state**\n- **change in the air's carbon after n years = net change x n**\n- Whatever the air loses, the **land gains** -- exactly, because atoms are never destroyed\n- Some carbon dioxide is **essential** -- without it Earth would average about **-18 °C**\n- The air has gone from about **280 ppm** to about **420 ppm** in roughly 200 years\n- People add about **10 billion tonnes of carbon** a year; sinks remove a little over half\n- Cold, wet ground stores carbon by **rotting slowly**, not by growing fast\n\nCheck a ratio's direction before you use it -- should the answer be bigger or smaller?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "net change = flux in - flux out!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- The Carbon Budget!**\n\nLevel 1 told you matter goes round in a circle. The arithmetic tells you **where it is piling up, and where it is draining away**.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Conservation of mass | 74.4 kg in, 57 g from soil | The rest came from the **air** |\n| Wood is half carbon | 500 kg wood -> 250 kg carbon | All of it was once a gas |\n| Carbon dioxide is heavier | 250 x 3.7 = 925 kg | Check a ratio's direction first |\n| Reservoir versus flux | kg versus kg per **year** | An amount versus a flow |\n| One flux is not the change | tap alone tells you nothing | You need the drain too |\n| Net change | in - out | A subtraction, not a product |\n| Everything tracks the **air** | in = decay, out = photosynthesis | One frame of reference throughout |\n| Is more carbon bad? | 280 ppm -> 420 ppm | Some is essential; the **speed** is the problem |\n| Sink or source | negative or positive | Minus means the air is **losing** |\n| Storing over time | net x n | Adds up; it does not compound |\n\n**The one line to remember:** energy **compounds** because it makes a one-way trip, while matter **balances** because it goes in a circle.\n\n**Next in Level 2:** B33 -- putting a probability on why variety protects an ecosystem."
        }
    };
}
