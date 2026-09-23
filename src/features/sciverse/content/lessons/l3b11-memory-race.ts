import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 11, biology. The synthesis lesson.
 *
 * L2B11 held a vaccine's protection as one share, the same for everyone. This
 * removes that simplification: protection is a race of doublings. From L2B9's
 * cells = start x 2^n and L3B4's logs, doublings needed = log (target / start)
 * / log 2. Model: matching cells double every 12 hours to 100,000. Worked by
 * hand: from 100 cells, 10 doublings, 120 hours; from 5,000 memory cells, 4.3
 * doublings, 52 hours; a germ doubling every 3 hours from 100 to a billion
 * takes 70 hours. The checkpoint's faster germ wins -- one reason a vaccine is
 * not 100% effective.
 *
 * Frame of reference stated: hours counted from when the germ arrives.
 * Condition stated: every matching cell doubling on one timetable. Still
 * standing: start-up delay, innate defences, other immune cells.
 */
export function getL3B11Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B11 measured a vaccine as **90% effective**, and named what it held fixed: **protection was one share, the same for everyone**. So why does a vaccine not protect everyone?\n\nStart with what a vaccine leaves behind: **memory cells**. In this lesson's model, the first time a germ arrives, the body has about **100** immune cells that match it. After vaccination, it has about **5,000**: fifty times as many.\n\nThe matching cells must multiply, by dividing, until there are about **100,000** of them.\n\nOne dial is the germ's **doubling time**: how long the germs take to double in number, in minutes. A short doubling time means the infection grows fast.\n\nDoes starting with fifty times as many cells make the response arrive **fifty times sooner**?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No. The cells multiply by doubling, so a fifty-times head start only saves the doublings it takes to multiply by fifty -- fewer than six of them. It arrives sooner, but nowhere near fifty times sooner.", nextNodeId: 'doublings', sentiment: 'positive' },
                { id: 'bad', label: "Yes. Fifty times as many cells do the job fifty times as fast.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That would be true if the cells had to be **added** one at a time. But immune cells multiply the way L2B9's cells did: by **doubling**.\n\nPicture a ladder where every rung is twice the number on the rung below: 100, 200, 400, 800... The job is to climb to 100,000.\n\nStarting with fifty times as many cells puts you higher up the same ladder. How many rungs higher? 2⁵ = 32 and 2⁶ = 64, so fifty times is between **5 and 6 rungs** -- out of about 10.\n\nThe head start skips the bottom rungs. The top rungs still have to be climbed, one doubling at a time.",
            options: [
                { id: 'cont', label: "How do I count the rungs exactly?", nextNodeId: 'doublings' }
            ]
        },
        doublings: {
            id: 'doublings',
            speaker: 'AI',
            content: "From L2B9: **cells = start x 2ⁿ**, after **n** doublings.\n\nHere the target is known and **n** is wanted. Divide by the start:\n\ntarget / start = 2ⁿ\n\nTake the log of both sides. L3B4's rule, log (xⁿ) = n x log x, brings the n down:\n\nlog (target / start) = n x log 2\n\n**doublings needed = log (target / start) / log 2**, where **log 2 = 0.301**\n\nAnd the time:\n\n**time = doublings needed x doubling time**\n\nThe frame of reference: time is counted in hours **from the moment the germ arrives**.\n\nThis lesson's model, in round numbers:\n\n- matching immune cells double every **12 hours**\n- **100,000** matching cells are enough to control the infection\n- first time: **100** matching cells; after vaccination: **5,000** memory cells\n- the germ, a bacterium, starts at **100** and doubles every **3 hours**\n- you feel ill once there are **1 billion** (10⁹) of the germ\n\nThe condition belongs here. **The model has every matching cell doubling on one timetable from the start**, as L2B9 did. Real immune cells first need a day or two to be switched on.",
            options: [
                { id: 'cont', label: "Run the race by hand.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "**The first time: 100 matching cells.**\n\n**Step 1.** target / start = 100,000 / 100 = **1,000**\n\n**Step 2.** doublings = log 1,000 / log 2 = 3 / 0.301 = **10.0**\n\n**Step 3.** time = 10.0 x 12 hours = **120 hours**, 5 days\n\n**After vaccination: 5,000 memory cells.**\n\n**Step 1.** target / start = 100,000 / 5,000 = **20**\n\n**Step 2.** doublings = log 20 / log 2 = 1.301 / 0.301 = **4.32**\n\n**Step 3.** time = 4.32 x 12 hours = **52 hours**, about 2.2 days\n\n**The germ: 100 bacteria, doubling every 3 hours.**\n\n**Step 1.** target / start = 10⁹ / 100 = **10⁷**\n\n**Step 2.** doublings = log 10⁷ / log 2 = 7 / 0.301 = **23.3**\n\n**Step 3.** time = 23.3 x 3 hours = **70 hours**, about 2.9 days\n\n| Race | Immune cells reach 100,000 | Germ reaches 1 billion | Who wins |\n| --- | --- | --- | --- |\n| First time | 120 hours | 70 hours | The germ: you fall ill |\n| After vaccination | **52 hours** | 70 hours | **Memory**: the germ is held back first |\n\nFifty times the cells made the response only 120 / 52 = **2.3 times** sooner -- but that was enough to win.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A **booster** dose doubles the memory cells, from 5,000 to **10,000**. The cells still double every **12 hours**, up to **100,000**.\n\nHow long does the response take now?",
            options: [
                { id: 'right', label: "About 40 hours. 100,000 / 10,000 = 10, log 10 / log 2 = 1 / 0.301 = 3.32 doublings, and 3.32 x 12 = 40 hours -- one doubling, 12 hours, sooner.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'halved', label: "26 hours. Twice as many cells should take half the time: 52 / 2 = 26.", nextNodeId: 'math_wrong' },
                { id: 'no_change', label: "52 hours. A booster adds cells, but the doubling time is the same, so the race is the same.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**26 hours** treated the cells as added, not doubled. Twice as many cells is exactly **one** rung higher on the doubling ladder -- it saves one doubling, not half the time.\n\n**52 hours** forgot the head start. The doubling time is the same, but the climb is shorter: from 10,000 rather than 5,000.\n\n**Step 1.** target / start = 100,000 / 10,000 = **10**\n\n**Step 2.** doublings = log 10 / log 2 = 1 / 0.301 = **3.32**\n\n**Step 3.** time = 3.32 x 12 hours = **40 hours**\n\nCheck: 4.32 − 3.32 = exactly **1** doubling saved, which is 12 hours. ✓",
            options: [
                { id: 'retry', label: "Twice the cells saves one doubling.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for immune cells that double every **12 hours** up to **100,000**, racing a germ that starts at **100** and makes you ill at **1 billion**.\n\n**Memory Cells** is how many matching cells there are when the germ arrives. **Germ Doubling Time** is how long the germ takes to double, in hours.\n\nThe lab draws both climbs on a scale where each gridline is ten times the one below, and marks who reaches their target first.\n\nTry this:\n\n- Set **100** cells and a **3-hour** germ: the germ wins by 50 hours\n- Set **5,000** cells: memory wins by 18 hours\n- Keep 5,000 cells and speed the germ up. Find the doubling time at which the germ starts to win",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "A head start of doublings. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A vaccinated person, with **5,000** memory cells, meets a **faster** germ that doubles every **2 hours**. It still starts at 100 and makes you ill at 1 billion.\n\nDoes the memory response still win?",
            options: [
                { id: 'right', label: "No. The germ needs 23.3 doublings x 2 hours = 47 hours, before the memory response's 52 hours. A fast germ, or a big dose of it, can beat a vaccinated person's memory -- one reason no vaccine is 100% effective. A booster's 40 hours would win.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. Memory cells always win -- that is what being vaccinated means.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Memory is a **head start**, not a guarantee. Run the race:\n\n| | Doublings | Doubling time | Time to target |\n| --- | --- | --- | --- |\n| Memory cells, 5,000 to 100,000 | 4.32 | 12 hours | **52 hours** |\n| Germ, 100 to 1 billion | 23.3 | 3 hours | 70 hours |\n| **Faster** germ, 100 to 1 billion | 23.3 | **2 hours** | **47 hours** |\n| Memory after a booster, 10,000 | 3.32 | 12 hours | **40 hours** |\n\nAgainst the faster germ, memory arrives about 5 hours too late. The person may fall ill -- though usually less badly, because their response is already on its way.\n\nPeople differ too: how many memory cells they keep, how big a dose of germ they meet. That is why a vaccine's effectiveness is a share of people, not a wall around each one.",
            options: [
                { id: 'retry', label: "Memory is a head start, not a guarantee.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Vaccination wins by giving the immune system a head start of doublings -- and a fast enough germ can still win the race.**\n\nHere is the simplification this lesson removed. **L2B11 held protection as one share, the same for everyone.** Protection is a race, and its result depends on the head start, the germ's speed, and the dose.\n\nThat completes Big Idea 11 at Level 3. Every lesson found that health turns on **ratios, not amounts**:\n\n- **L3P11** -- **flow after / flow before = (radius ratio)⁴**: an artery at 80% of its radius carries 41% of the flow\n- **L3C11** -- **pH = 6.1 + log (bicarbonate / (0.03 x CO₂ pressure))**: breathing restores the ratio, and the pH with it\n- **L3B11** -- **doublings = log (target / start) / log 2**: fifty times the cells saves 5.6 doublings, enough to win\n\n**How do we stay healthy?** By keeping the right ratios: wide enough vessels, the right balance of base to acid, and a big enough head start against the germs we meet.\n\nAnd the simplifications still standing. **Real immune cells need a day or two to switch on** before they start doubling. **Innate defences**, B11's fast responders, slow the germ from the start. And immune cells do more than multiply: other cells, such as **T cells**, help to find and destroy infected cells.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A head start of doublings!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You raced memory cells against a germ.**\n\n- Immune cells multiply by **doubling**: cells = start x 2ⁿ\n- Rearranged with logs: **doublings needed = log (target / start) / log 2**, with log 2 = 0.301\n- **time = doublings x doubling time**, counted from when the germ arrives\n- Condition: every matching cell doubling on one timetable from the start\n- First time, 100 cells: **10 doublings**, **120 hours**\n- After vaccination, 5,000 memory cells: **4.32 doublings**, **52 hours**\n- Germ doubling every 3 hours to a billion: **23.3 doublings**, **70 hours** -- memory wins\n- Fifty times the cells: only **2.3 times** sooner\n- A booster doubling the memory cells saves exactly **one doubling**: 40 hours\n- A germ doubling every 2 hours reaches a billion in **47 hours** and wins\n- Still standing: start-up delay, innate defences, T cells",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Log of the ratio over log 2!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Racing the Germ!**\n\nL2B11 measured protection as one share. Level 3 finds the race behind it.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Doubling | cells = start x 2ⁿ | From L2B9 |\n| Doublings needed | **log (target / start) / log 2** | Count the rungs |\n| First time | 3 / 0.301 x 12 | **120 hours** |\n| Memory cells | 1.301 / 0.301 x 12 | **52 hours** |\n| The germ | 7 / 0.301 x 3 | **70 hours** |\n| A booster | 1 / 0.301 x 12 | **40 hours**, one doubling saved |\n| A faster germ | 7 / 0.301 x 2 | **47 hours**: the germ wins |\n| Still standing | start-up delay, innate defences | A model of the race |\n| Big Idea 11 at Level 3 | radius⁴, log of a ratio, doublings | Health turns on ratios |\n\n**The one line to remember:** a vaccine gives the immune system a head start of doublings -- each doubling of memory cells saves one doubling time, which is usually enough to beat the germ.\n\n**Big Idea 11 is complete at Level 3.**"
        }
    };
}
