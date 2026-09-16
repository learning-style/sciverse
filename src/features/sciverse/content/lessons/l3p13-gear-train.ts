import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 13, physics.
 *
 * L2P13 costed one ideal pair of gears. This removes both simplifications at
 * once: real machines chain pairs together, and every pair loses a little.
 * Ratios multiply along a train, and so do efficiencies: three stages of 4 at
 * 97% give a ratio of 64 and 91% of the power. Power = 2 pi x torque x turns
 * each second ties the two together.
 *
 * Frame of reference stated: each stage's driven gear is the next stage's
 * driver. Condition stated: steady speed, and an efficiency quoted for that
 * load. Still standing: efficiency varies with load, and worm gears trade
 * efficiency for self-locking, as in L3P5.
 */
export function getL3P13Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P13 costed a single pair of gears, and named what it held fixed: **one pair, working perfectly**.\n\nReal gearboxes are built in **stages**: the driven gear of one pair sits on the same shaft as the driver of the next, so the pairs hand the motion along. That is the frame of reference for this whole lesson.\n\nA winch gearbox has **three stages**, each a pair with a gear ratio of **4**. Each pair is **97%** efficient -- that is, 97% of the power going into it comes out the far side.\n\nWhat is the overall ratio, and how much of the motor's power reaches the drum?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Both multiply along the train: the ratio is 4 x 4 x 4 = 64, and the power that survives is 0.97 x 0.97 x 0.97, a bit over 91%.", nextNodeId: 'train', sentiment: 'positive' },
                { id: 'bad', label: "The ratios add to 4 + 4 + 4 = 12, and the gearbox is 97% efficient overall, because that is what each stage is.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Follow one turn of the motor through the box.\n\nStage 1 turns its output **4 times slower** than its input. Stage 2 takes that already-slowed shaft and turns **its** output 4 times slower again -- so after two stages the shaft is 16 times slower, not 8. After three, 64.\n\n**Each stage acts on what the last one handed it.** That is multiplication, not addition.\n\nThe losses work the same way. Stage 1 passes on 97% of what it receives. Stage 2 passes on 97% of **that**, which is 97% of 97%. Nothing gets a fresh start.\n\nAnything that is applied repeatedly, each time to the result of the last, multiplies -- the same shape as L3B12's odds and L2B9's doublings.",
            options: [
                { id: 'cont', label: "Write it as a formula.", nextNodeId: 'train' }
            ]
        },
        train: {
            id: 'train',
            speaker: 'AI',
            content: "For a train of stages:\n\n**overall gear ratio = ratio of stage 1 x ratio of stage 2 x ...**\n\n**overall efficiency = efficiency of stage 1 x efficiency of stage 2 x ...**\n\nIf every stage is the same, those become **ratioⁿ** and **efficiencyⁿ** for **n** stages.\n\nTo see where the lost power goes, you need **power** properly. L2P13 tracked *torque x turns each minute* and found it unchanged. The real quantity is:\n\n**power = 2 x π x torque x turns each second**, in watts\n\nThe 2π is there because one turn carries a point all the way around a circle, and π turns up whenever a circle does.\n\nThen:\n\n**power out = power in x overall efficiency**\n\n**torque out = torque in x overall gear ratio x overall efficiency**\n\nThe turns are set by the ratio alone -- gears cannot lose turns, only energy:\n\n**turns out = turns in / overall gear ratio**\n\nThe condition belongs here. **The efficiency is quoted for a steady speed and a particular load.** A gearbox running fast and lightly loaded loses a bigger share than the same box working hard.",
            options: [
                { id: 'cont', label: "Run the winch gearbox.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "**The motor:** **3 N m** at **1,500 turns a minute**. **Three stages**, each ratio **4** and efficiency **0.97**.\n\n**Step 1. Overall ratio:** 4 x 4 x 4 = **64**\n\n**Step 2. Overall efficiency:** 0.97 x 0.97 x 0.97 = **0.912**, or **91.2%**\n\n**Step 3. Turns at the drum:** 1,500 / 64 = **23.4 a minute**\n\n**Step 4. Torque at the drum:** 3 x 64 x 0.912 = **175 N m** (an ideal box would give 192 N m)\n\n**Step 5. The power, both ends:**\n\npower in = 2 x π x 3 x (1,500 / 60) = 2 x π x 3 x 25 = **471 W**\n\npower out = 471 x 0.912 = **430 W**\n\n**Step 6. Where the missing 41 W went:** into heat, in three sets of rubbing teeth. A gearbox that has been running gets warm, and that warmth is the missing watts.\n\n| | Turns each minute | Torque | Power |\n| --- | --- | --- | --- |\n| Motor | 1,500 | 3 N m | **471 W** |\n| Drum | **23.4** | **175 N m** | **430 W** |\n\nNotice what survives and what does not. The **turns** divide by exactly 64 -- friction cannot change that. The **torque** falls short of the ideal, and the **power** is down by 41 W.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A gearbox has **four** stages, each **95%** efficient.\n\nWhat share of the power going in comes out?",
            options: [
                { id: 'right', label: "About 81%. 0.95 x 0.95 x 0.95 x 0.95 = 0.814.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'subtract', label: "80%, because each stage loses 5% and 4 x 5% = 20%.", nextNodeId: 'math_wrong' },
                { id: 'same', label: "95%, because every stage is 95% efficient.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**80%** added the losses. Each stage takes 5% of **what reaches it**, not 5% of the original -- so the second stage's 5% is smaller than the first's, and the true answer is a little **better** than 80%. Adding percentages is the wrong operation, and here it happens to be pessimistic.\n\n**95%** forgot that the stages are in a row. Only the first stage sees the full power.\n\n**Step 1.** 0.95 x 0.95 = **0.9025**\n\n**Step 2.** 0.9025 x 0.95 = **0.857**\n\n**Step 3.** 0.857 x 0.95 = **0.814**, about **81%**\n\nThe gap between 81% and 80% is small here, but it grows the other way as stages pile up -- and so does the loss itself.",
            options: [
                { id: 'retry', label: "Multiply the efficiencies.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a motor giving **3 N m** at **1,500 turns a minute**, driving a train whose stages each have a ratio of **4**.\n\n**Stages** is how many pairs of gears are in the train. **Stage Efficiency** is the share of power each pair passes on.\n\nThe lab works out the overall ratio, the overall efficiency, the turns and torque at the output, and the watts lost as heat.\n\nTry this:\n\n- Set **3** stages at **97%**: a ratio of 64, and 430 of the motor's 471 W\n- Add stages one at a time. The ratio climbs 4, 16, 64, 256 -- and the power surviving falls 97%, 94%, 91%, 89%\n- Drop **Stage Efficiency** to **80%**, the sort of figure a cheap or dry gearbox gives. Four stages now pass on 41%\n- Find the number of stages at which more than half the motor's power is being turned into heat",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Ratios multiply, losses multiply. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** An engineer needs a very large gear ratio and builds a train of **ten** stages, each **95%** efficient.\n\nA colleague says: *95% is excellent, so the box will be about 95% efficient.*\n\nWhat share of the power actually reaches the output?",
            options: [
                { id: 'right', label: "About 60%. 0.95 to the power 10 is 0.599, so two fifths of the motor's power becomes heat in the teeth -- which is why designers use as few stages as the job allows.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "About 95%. Each stage keeps 95%, so the train as a whole keeps 95%.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Follow the power down the train and watch 95% compound.\n\n| Stages | Power surviving |\n| --- | --- |\n| 1 | 95% |\n| 2 | 90% |\n| 4 | **81%** |\n| 7 | 70% |\n| 10 | **60%** |\n\n0.95¹⁰ = **0.599**. Four tenths of the motor's power never reaches the output at all -- it warms the gearbox, which then has to be cooled.\n\nThis is the same compounding that made L3B12's 20% survival edge into a 4,851-fold change over 47 generations. Repeated multiplication is powerful whichever way it points: a ratio above 1 grows explosively, and one below 1 decays just as fast.\n\nSo a designer who needs a ratio of 1,000 does not reach for ten stages of 2. Two stages of 32, or three of 10, give the same ratio with far fewer sets of teeth to rub.",
            options: [
                { id: 'retry', label: "Ten stages of 95% is 60%.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Along a gear train the ratios multiply, and so do the efficiencies -- so every stage you add buys ratio and spends power.**\n\nHere are the simplifications this lesson removed. **L2P13 used one pair, working perfectly.** With stages, the ratio is a product; with friction, torque out falls short of torque in x ratio, and the difference leaves as heat.\n\nAnd the simplifications still standing. **An efficiency is quoted for one load and speed**, and a real gearbox's efficiency changes as the load changes -- a lightly loaded box wastes a bigger share. Thicker oil in the cold costs more too. And some gears are deliberately inefficient: a **worm gear** may pass on only about half its power, but it cannot be driven backwards, which is exactly the self-locking trick L3P5 found in a car jack. **Sometimes the loss is the point.**\n\nC13 said a plastic's chains pack tightly or loosely. C13 at Level 3 measures the packing by weighing it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Every stage buys ratio and spends power!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You costed a gear train.**\n\n- In a train, each stage's driven gear drives the next stage\n- **overall ratio = the stage ratios multiplied**; equal stages give **ratioⁿ**\n- **overall efficiency = the stage efficiencies multiplied**; equal stages give **efficiencyⁿ**\n- **power = 2 x π x torque x turns each second**, in watts\n- **turns out = turns in / overall ratio** -- friction cannot change the turns\n- **torque out = torque in x ratio x efficiency**\n- Three stages of 4 at 97%: ratio **64**, efficiency **91.2%**\n- 3 N m at 1,500 turns: **23.4 turns a minute**, **175 N m**, 430 W of the motor's 471 W\n- The missing **41 W** leaves as heat in the teeth\n- Four stages at 95%: **81%**, not 80% -- losses multiply, they do not add\n- Ten stages at 95%: **60%**\n- Condition: efficiency quoted at a steady speed and load\n- Still standing: efficiency varies with load, and worm gears trade it for self-locking",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Multiply the ratios, multiply the losses!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Gear Trains: Ratios Multiply, and So Do the Losses!**\n\nL2P13 costed one perfect pair. Level 3 lines them up and lets them rub.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| A train | driven gear drives the next stage | Each acts on the last one's output |\n| Overall ratio | **the ratios multiplied** | 4 x 4 x 4 = **64** |\n| Overall efficiency | **the efficiencies multiplied** | 0.97³ = **91.2%** |\n| Power | **2 x π x torque x turns each second** | 3 N m at 1,500 rpm is **471 W** |\n| At the drum | 23.4 turns, 175 N m | **430 W**, with 41 W as heat |\n| Turns | **turns in / ratio** | Friction cannot take turns |\n| Four stages at 95% | 0.95⁴ | **81%**, not 80% |\n| Ten stages at 95% | 0.95¹⁰ | **60%** |\n| Still standing | load, oil, worm gears | Sometimes the loss is the point |\n\n**The one line to remember:** a gear train multiplies its ratios and multiplies its losses, so every extra stage buys turning force and spends power.\n\n**Up next:** L3C13 -- weighing a plastic to find how tightly its chains pack."
        }
    };
}
