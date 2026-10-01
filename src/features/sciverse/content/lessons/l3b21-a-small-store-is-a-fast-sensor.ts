import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 21, biology. Biology closes the Big Idea, and
 * this lesson turns L2B21's alarming finding into the reason the system works.
 *
 * L2B21 measured a reserve of 5.5 minutes of ATP at rest and 33 seconds working
 * hard, and asked what signal could possibly hold a supply that thin steady while
 * demand swings tenfold within a second of standing up. B21 called it feedback
 * regulation and never named the signal.
 *
 * The signal is ADP, and the mechanism is amplification by scarcity. Spending ATP
 * does two things at once: it removes a molecule from the large ATP pool and adds
 * one to the small ADP pool. So the same absolute change is a small fractional
 * change in ATP and a large one in ADP:
 *
 *   amplification = [ATP] / [ADP]
 *
 * At a resting ratio near 10:1, a 1% fall in ATP is a 10% rise in ADP. The cell
 * senses the scarce species, so it reads a change it could not otherwise detect --
 * and the smallness of the reserve, which looked like the system's weakness, is
 * exactly what makes the sensor sharp.
 *
 * Still standing: the real control uses several signals at once -- AMP, phosphate
 * and calcium as well as ADP -- and the ratio differs between tissues. And this
 * explains how supply tracks demand, not what sets the ceiling, which is oxygen
 * delivery and belongs to Big Idea 18.
 */
export function getL3B21Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B21 ended with a number that ought to be alarming. Your body holds about **five and a half minutes** of spendable energy at rest, and about **33 seconds** of it when you are working hard. There is no tank, and there cannot be one -- a day's worth of **ATP**, or **adenosine triphosphate**, the molecule your cells actually spend, would weigh 65 kg.\n\nNow put that beside what your body actually does. Stand up suddenly and your leg muscles need several times more ATP within a **single second**. Sprint for a bus and the demand goes up tenfold. And yet you do not black out, and your ATP level barely moves -- measurements in working muscle show it falling by only a few per cent even during hard exercise.\n\nSo something is matching production to demand almost instantly, working from a reserve of seconds. B21 called it **feedback regulation** and left it at that, which names the category and not the mechanism.\n\nThe puzzle is sharper than it first looks. To correct an imbalance you must first **detect** it -- and if ATP only falls by 1% when you start sprinting, the cell has to notice a 1% change and respond hard. A thermostat that could only detect a 1% change in temperature would be a poor thermostat.\n\nYour two dials are the two quantities that decide how sharp the detection is.\n\n- **Resting ATP to ADP Ratio** -- how much more ATP than ADP a cell holds when idle.\n- **Fall in ATP**, as a percentage, when demand rises.\n\nHere is the question. Spending ATP turns it into **ADP** -- adenosine **di**phosphate, the same molecule with one phosphate removed. If ATP falls by 1%, what happens to ADP?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It rises by far more than 1% in relative terms, because there is much less ADP about -- the same number of molecules is a bigger fraction of a smaller pool.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "It also changes by about 1%, since every ATP spent makes exactly one ADP.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Every ATP spent does make exactly one ADP -- that part is right, and it is the key to the whole thing. What differs is what that one molecule **means** to each pool, because the two pools are not the same size.\n\nA resting cell holds roughly **ten times** as much ATP as ADP. Take typical figures: ATP at 5 millimoles per litre, ADP at 0.5.\n\nNow spend 1% of the ATP -- that is 0.05 mM:\n\n- **ATP:** 5.00 falls to 4.95. A change of **1%**.\n- **ADP:** 0.50 rises to 0.55. A change of **10%**.\n\nThe same 0.05 mM. One per cent of the big pool, ten per cent of the small one.\n\nThis is not a special fact about energy chemistry -- it is arithmetic that applies wherever a substance moves from a large store to a small one. A shop that sells one loaf out of a thousand has barely changed its stock; the customer's bag has gone from empty to holding a loaf.\n\nSo a cell that wants to detect a small change in ATP has an obvious move available: **do not measure ATP. Measure ADP.** The information is the same and the signal is ten times larger.\n\nAnd that is what cells do.",
            options: [
                { id: 'cont', label: "So how much larger, exactly?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Exactly the ratio of the two pools, and the derivation is three lines.\n\nSuppose an amount **x** of ATP is spent. Then:\n\n- ATP falls by x, so its **fractional** change is **x / [ATP]**\n- ADP rises by x, so its fractional change is **x / [ADP]**\n\nDivide one by the other and the x cancels:\n\n**amplification = [ATP] / [ADP]**\n\nSo the signal is amplified by exactly the resting ratio of the two pools. At 10:1, a 1% fall in ATP is a **10%** rise in ADP. At 50:1 -- which some cells maintain -- the same 1% fall is a **50%** rise.\n\nAnd now the point that turns L2B21 on its head. **The amplification comes from ADP being scarce.** A cell that kept plenty of ADP about would have a poor sensor. The very thinness that made the five-minute reserve look precarious is what makes the control sharp -- and it is sharper still for the smaller pool, which is the one you would have thought was the problem.\n\nTwo things to be careful about:\n\n- **The signal is a ratio, not a level.** What the machinery responds to is how much ADP there is relative to ATP, which is why it works the same in a cell with plenty of both and a cell with little of either.\n- **The condition:** real control is not one signal. Cells also read **AMP** -- adenosine monophosphate, two phosphates gone -- and free phosphate, and calcium, which rises inside the cell when a muscle is told to contract. Several sensors, reinforcing each other.",
            options: [
                { id: 'cont', label: "Work out a real muscle.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A resting muscle cell: ATP 5.0 mM, ADP 0.5 mM, a ratio of 10:1.**\n\nYou start to run. Demand rises tenfold. In the first fraction of a second, before production has caught up, spending outruns supply and some ATP is converted.\n\n1. **Suppose ATP falls 2%**, which is 0.1 mM\n2. **ADP rises by the same 0.1 mM:** from 0.50 to 0.60\n3. **As a fraction:** ATP down 2%, ADP up **20%**\n4. **Amplification:** 20 / 2 = **10**, which is the resting ratio\n\nA 20% rise in ADP is an enormous signal in cellular terms. The enzymes that control respiration respond to it directly: more ADP means more raw material for rebuilding ATP, and several control points in the pathway speed up. Production climbs to meet the demand, and the ATP level settles back -- **a couple of per cent below where it was, and no further.**\n\nThat is why measurements of working muscle are so strange at first sight. The demand for ATP has gone up tenfold and the amount of ATP has barely moved. It looks as if nothing is happening. In fact the near-constancy **is** the evidence that the control is working: a thermostat that holds a room within a degree while the weather swings looks, from the thermometer alone, as though the weather were not changing.\n\n**And the same figures explain the failure case.** If oxygen cannot arrive fast enough -- a blocked artery, or sprinting past what the lungs can supply -- production cannot rise to meet the signal however loud it gets. Then ATP really does fall, ADP and AMP climb steeply, and the cell switches to the rougher ways of making ATP that leave you aching. The signal was never the limit. **The supply was.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A cell keeps a resting ATP to ADP ratio of **50:1** -- unusually high, as some nerve cells do.\n\nIf its ATP falls by **1%**, by how much does its ADP rise?",
            options: [
                { id: 'right', label: "By about 50%. The amplification is the ratio itself, so 1% x 50 = 50%.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'same', label: "By 1%, since each ATP spent makes one ADP.", nextNodeId: 'math_wrong' },
                { id: 'divided', label: "By 0.02%, from 1% divided by 50.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**By 1%** counts molecules and forgets the pools. One ATP does make one ADP -- and that one molecule is a small share of a large pool and a large share of a small one. The whole mechanism lives in that asymmetry.\n\n**Dividing** puts the amplification the wrong way up. Ask which way it must go: ADP is the **scarcer** species, so a given number of molecules must matter **more** to it, not less. If your answer makes the scarce pool less sensitive, the ratio is inverted.\n\n**1% x 50 = 50%.**\n\nAnd a 50:1 cell is worth thinking about, because it shows why different tissues make different choices. A nerve cell has a very sharp sensor: a 1% wobble in ATP produces a 50% ADP signal, so control is fast and tight. The cost is that it holds even less ADP in hand, so there is even less slack if supply fails -- which is exactly what you would expect of the tissue that dies first when the blood stops.\n\n**Sharper sensing and thinner margins are the same design choice**, read two ways.",
            options: [
                { id: 'retry', label: "The amplification is the ratio itself, and the scarce pool is the sensitive one.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Resting ATP to ADP Ratio** and **Fall in ATP** as a percentage.\n\n| Resting ratio | ATP falls 1% | ATP falls 2% | ATP falls 5% |\n| --- | --- | --- | --- |\n| 5 : 1 | ADP +5% | +10% | +25% |\n| 10 : 1 | ADP **+10%** | **+20%** | +50% |\n| 20 : 1 | ADP +20% | +40% | **+100%** |\n\nEvery number in that table is the product of the two dials, which is the whole content of the derivation. The dial stops at 20 to 1 because that is where a 5% fall already **doubles** the ADP; the 50 to 1 cells come up in a moment, and you can work those out in your head with the same multiplication.\n\n**The visual shows you the one thing to see.** The two bars are the **same length**, because each one is a whole pool -- all the ATP on top, all the ADP below. What differs is how each is **split**: the ATP bar into 100 fine **units**, the ADP bar into 10 coarse ones. Now highlight **one unit** on each. On the top bar it is a hairline, a hundredth. On the bottom bar it is a tenth, and you can see it without being told.\n\nThat is the whole lesson in one picture. **The same single unit** -- the arrow shows it leaving the top pool and joining the bottom one -- is **1%** of the ATP and **10%** of the ADP. Not because anything about the unit changed, but because the bottom pool is cut into fewer, bigger pieces. Turn the ratio dial up and the bottom bar is split coarser still, so that same unit becomes a larger share of the **smaller pool**. That is all amplification by scarcity is.\n\nSo the rule the cell follows is short: **watch the scarce pool, not the big one.**\n\n**A cell with a tiny reserve has a magnificent sensor.** That is the sentence L2B21 could not have written. Its five-minute reserve looked like a design flaw; here it turns out to be the sensing element. Keep less of the scarce species and you notice trouble sooner.\n\nAnd this is a fourth reasoning shape to add to the ones the closing lessons have collected:\n\n- **L3B18** had two curves whose **ratio** collapsed -- supply falling while demand rose.\n- **L3B19** had two factors whose **product** peaks -- water and air sharing one pore space.\n- **L3B20** had a **reciprocal** that turned a steady decline into a sudden event.\n- **This lesson** has **amplification by scarcity**: a signal read from the small pool instead of the large one, magnified by exactly their ratio.\n\nAnd the shape is everywhere once you have it. A country's trade balance is a small difference between two huge flows, so it swings wildly on small changes in either. A bank's profit is a thin margin between what it pays and charges. **Reading the small quantity is how you detect a change in the large ones** -- and it is also why small quantities are so volatile, which is the same fact wearing a different hat.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The thin reserve is the sensor. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A designer proposes improving a cell: keep **ten times more ADP** about, so that the cell has more raw material ready for rebuilding ATP and can respond faster to demand.\n\nWhat does the amplification argument say?",
            options: [
                { id: 'right', label: "It would wreck the sensor. Ten times more ADP takes the ratio from 10:1 to 1:1, so a 1% fall in ATP becomes a 1% rise in ADP instead of 10% -- the cell would barely notice demand rising.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It should help -- more ADP means more raw material, so ATP can be rebuilt faster when needed.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "More raw material sounds like an improvement, and it costs the cell the thing it actually depends on.\n\nRun the amplification. Ten times more ADP takes the resting ratio from 10:1 to about **1:1**. Then:\n\namplification = [ATP] / [ADP] = **1**\n\nSo a 1% fall in ATP now produces a **1%** rise in ADP instead of 10%. The signal the cell uses to detect rising demand has been divided by ten. The control that used to catch a 1% wobble would now need the ATP level to fall **ten times further** before responding as strongly -- and with a reserve of seconds, ten times further is most of the way to failure.\n\nThere is a second cost, subtler and worse. ADP is not inert: a high ADP level is itself the signal for **run faster**. A cell permanently full of ADP is a cell permanently being told to work flat out, which wastes fuel continuously and leaves nothing to say when demand genuinely rises.\n\nSo the design is not \"keep a comfortable stock of everything\". It is: **hold plenty of the currency and very little of the signal.** ATP is kept high so there is something to spend; ADP is kept low so that spending it is audible.\n\nWhich answers this Big Idea's question for the third and last time. A cycle keeps a system alive where storage is impossible -- and it can only do so if something regulates it fast enough. **The regulation works because the store is small.** Not in spite of it.",
            options: [
                { id: 'retry', label: "Hold plenty of the currency and very little of the signal.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- the amplification would fall from 10 to about 1, and the cell would need ATP to drop ten times further before responding as strongly. With a reserve of seconds, that is most of the way to failure.\n\nThere is a second cost too: a high ADP level **is** the signal for *run faster*, so a cell permanently full of ADP is permanently being told to work flat out, wasting fuel and having nothing left to say when demand really rises.\n\nSo the design rule is **hold plenty of the currency and very little of the signal.**\n\nAnd that closes Big Idea 21, which asked how cycles keep systems alive. Three cycles, and three different answers:\n\n| | What sets the rate | Can it be regulated? | What keeps the system alive |\n| --- | --- | --- | --- |\n| **Tides** (L3P21) | orbits, and the cube of distance | **no** -- nothing on Earth can alter it | utter reliability |\n| **Carbon** (L3C21) | a reaction whose reactant is consumed | only by supplying more carbonate | centuries of slack |\n| **ATP** (this lesson) | feedback, amplified by scarcity | **instantly**, and continuously | a sensor made of the shortage itself |\n\nRead the last column. The tide needs no regulation because it cannot fail. The carbon cycle has enough slack that it did not need to be fast -- until we started testing it. And the ATP cycle has neither reliability nor slack, so it survives on **control**, which is the only one of the three that had to be invented.\n\nWhich is the real answer to the Big Idea. A cycle keeps a system alive by delivering what cannot be stored -- and the less a system can store, the better its regulation has to be. **Five minutes of ATP demands a sensor that notices one per cent.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The regulation works because the store is small!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the signal B21 only named.**\n\n- L2B21's puzzle: a reserve of **5.5 minutes** at rest and **33 seconds** working hard, against demand that swings tenfold in a second\n- And measurements show ATP barely moving during hard exercise -- a fall of only a **few per cent**\n- So the cell must detect a 1% change and respond hard. It does it by **not measuring ATP**\n- Spending ATP makes **ADP** -- adenosine **di**phosphate -- one for one, but the pools differ: ATP is about **ten times** more plentiful\n- So the same 0.05 mM is **1% of the ATP** and **10% of the ADP**\n- **amplification = [ATP] / [ADP]**, derived in three lines: the x cancels when you divide the two fractional changes\n- At 10:1 a 1% fall in ATP is a **10% rise in ADP**. At 50:1 -- as in some nerve cells -- it is **50%**\n- **The amplification comes from ADP being scarce**, so the thinness that made the reserve look precarious is what makes the sensor sharp\n- The signal is a **ratio, not a level**, so it works the same in a rich cell and a poor one\n- Which is why working muscle shows ATP nearly constant: the **near-constancy is the evidence that control is working**, like a thermostat holding a room steady through changing weather\n- And why failure looks different: if oxygen cannot arrive, production cannot answer the signal however loud. **The signal was never the limit -- the supply was**\n- Keeping **ten times more ADP** would take the amplification from 10 to 1 and make the cell nearly blind, and a cell full of ADP is permanently told to run flat out\n- So: **hold plenty of the currency and very little of the signal**\n- A fourth reasoning shape for the closing lessons: **amplification by scarcity**, after L3B18's collapsing **ratio**, L3B19's peaking **product** and L3B20's **reciprocal**\n- Removed: B21's \"feedback regulation\", a category with no mechanism\n- Still standing: real control reads **several** signals -- AMP, phosphate, calcium as well as ADP -- and the ratio differs between tissues. And this explains how supply **tracks** demand, not what sets the **ceiling**, which is oxygen delivery and belongs to Big Idea 18",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Hold the currency, not the signal!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Cycles Keep Systems Alive?**\n\nThree levels, three cycles, and three different reasons a cycle is what keeps something alive.\n\n**Summary Table:**\n| | Physics | Chemistry | Biology |\n| --- | --- | --- | --- |\n| **Level 1** | Tides repeat | Carbon moves between stores | Cells make energy in a cycle |\n| **Level 2** | **every 12 h 25 min**, springs 3.2 m | **reservoir / flux** = 4.2 years | **pool / rate** = 5.5 minutes |\n| **Level 3** | tide goes as **M / r³** | absorbing spends a **carbonate ion** | **amplification = [ATP]/[ADP]** |\n| **What Level 3 removed** | the Sun's borrowed share | the unexplained imbalance | \"feedback regulation\" |\n| **The mechanism** | free fall cancels an even pull | the sink consumes itself | the scarce pool carries the signal |\n| **The number that decides** | **0.459**, giving springs/neaps = 2.70 | **Revelle 10**, so a tenth of the promise | **10x**, so 1% becomes 10% |\n| **Can the cycle be regulated?** | no, and it never fails | barely, and it is slowing | instantly, and it must be |\n| **Still standing** | force, not the height of water | Revelle is measured, not derived | several signals, not one |\n\n**The one line to remember:** a cycle keeps a system alive by delivering what cannot be stored, and the less a system can store the better its regulation must be -- which is why a body carrying five minutes of energy detects a one per cent shortfall by reading the molecule it deliberately keeps least of.\n\n**Where this leaves Big Idea 21:** the question was how cycles keep systems alive, and the three disciplines gave three answers that could not be swapped. The tide is kept alive by being unstoppable, the carbon cycle by having centuries of slack, and your cells by regulation so fast that a five-minute reserve never actually runs down. Only the last of those had to be invented, and it works by keeping almost none of the thing it measures."
        }
    };
}
