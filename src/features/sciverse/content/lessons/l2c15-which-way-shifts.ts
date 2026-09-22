import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C15 "Chemical Equilibrium".
 *
 * C15 gave K qualitatively (above 1 means mostly products) and Le Chatelier as
 * a principle. This lesson makes the prediction arithmetic: Q is the same ratio
 * measured now, and comparing Q with K names the direction. Worked on a
 * 20-particle system with K = 3, where adding 5 reactant drops Q to 1.5 and the
 * system settles at 18.75 product to 6.25 reactant.
 *
 * Condition stated: a one-to-one reaction, a closed container, one temperature.
 * Held fixed and named for Level 3: every reaction counted one-to-one, and raw
 * amounts used instead of concentrations.
 */
export function getL2C15Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C15 showed you two things. That a reaction at **equilibrium** has not stopped -- the forward and reverse reactions are both still running, at matching rates. And that the amounts settle at a fixed ratio, the **equilibrium constant K**.\n\nThen it gave you Le Chatelier's Principle: disturb the system and it shifts to relieve the disturbance.\n\nBut \"it shifts\" is a direction, and directions can be worked out rather than guessed. What would you need to know to be certain which way a disturbed reaction will go?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The ratio it has right now, and the ratio it is heading for. If the one it has is too small, it must make more product to reach the other.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Whether the amounts are equal. A reaction moves towards having the same amount of each.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is the equilibrium misconception C15 warned about, in its second form. The first is thinking equilibrium means **stopped**; this one is thinking it means **equal**.\n\nEqual amounts happen only in the one case where **K = 1**. Everything else settles lopsided, and stays there:\n\n| K | At equilibrium, out of 20 particles |\n| --- | --- |\n| 0.25 | 4 product, 16 reactant |\n| 1 | 10 product, 10 reactant |\n| **3** | **15 product, 5 reactant** |\n| 9 | 18 product, 2 reactant |\n\nEvery row is a genuine balance: in the K = 3 row, product is being made three times as fast from a fifth of the material, and destroyed just as quickly. Busy, lopsided, and steady.\n\nSo the target is not \"equal\". The target is **K**.",
            options: [
                { id: 'cont', label: "Then how do I compare where it is with where it is going?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "With two numbers that are the same ratio measured at different times.\n\n**K, the equilibrium constant**, is the ratio the reaction settles at:\n\n**K = amount of product / amount of reactant**\n\n**Q, the reaction quotient**, is that very same ratio worked out **right now**, whether or not the reaction has settled:\n\n**Q = amount of product / amount of reactant, at this moment**\n\nProduct on the top, reactant underneath, both times -- that is the frame of reference, and swapping it reverses every answer you get.\n\nNow compare them:\n\n| | What it means | Which way it goes |\n| --- | --- | --- |\n| **Q < K** | too little product | **forward**, making more product |\n| **Q = K** | already balanced | neither -- both directions run at matching rates |\n| **Q > K** | too much product | **reverse**, making more reactant |\n\nThat is Le Chatelier's Principle turned into a calculation. You are no longer asking what \"relieving a stress\" feels like; you are comparing two numbers.\n\nThe conditions. **The reaction is one-to-one** -- one particle of reactant makes one of product. **The container is closed**, so nothing escapes. And **the temperature is fixed**: K itself changes when you heat a reaction, which is why C15's temperature slider shifted the balance.",
            options: [
                { id: 'cont', label: "Work one through.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Finding K.** Twenty particles are sealed in a flask. Left alone, they settle at **15 product** and **5 reactant**, and stay there.\n\nK = 15 / 5 = **3**\n\n**Disturbing it.** Now inject **5 more reactant**. Nothing else changes yet -- the new particles have not reacted.\n\n**Step 1.** Q = 15 / 10 = **1.5**\n\n**Step 2.** Compare: Q = 1.5, K = 3, so **Q < K** -- too little product.\n\n**Step 3.** The reaction runs **forward** until the ratio is 3 again.\n\n**Where it stops.** There are now 25 particles in total, and they must divide so that product / reactant = 3. So product is three parts out of four:\n\n**Step 1.** product = 25 x 3/4 = **18.75**\n\n**Step 2.** reactant = 25 x 1/4 = **6.25**\n\n**Step 3.** check: 18.75 / 6.25 = **3** ✓\n\n| | Product | Reactant | Ratio |\n| --- | --- | --- | --- |\n| At equilibrium | 15 | 5 | **3 = K** |\n| Just after adding 5 reactant | 15 | 10 | 1.5 = Q |\n| At the new equilibrium | **18.75** | **6.25** | **3 = K** |\n\nNotice what happened to the reactant. You added 5, and at the new balance only **1.25** of them are still reactant -- the other 3.75 became product. The system absorbed most of your disturbance, exactly as Le Chatelier said, and now you can say **how much**.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A reaction has **K = 4**. At this moment the flask holds **12 product** and **6 reactant**.\n\nWhich way does the reaction go?",
            options: [
                { id: 'right', label: "Forward. Q = 12/6 = 2, which is below K = 4, so it needs more product.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'backwards', label: "Reverse. There is already twice as much product as reactant, so it must go back.", nextNodeId: 'math_wrong' },
                { id: 'settled', label: "Neither -- it is at equilibrium, because the amounts are in a whole-number ratio.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Reverse** judged the amounts on their own. Twice as much product sounds like plenty -- but this reaction settles at **four** times as much. Against its own target, it is short of product.\n\n**At equilibrium** read a tidy ratio as a settled one. Only one ratio counts as settled, and that is K. 2 is not 4.\n\n**Step 1.** Q = 12 / 6 = **2**\n\n**Step 2.** K = 4, so **Q < K**\n\n**Step 3.** The reaction runs **forward**\n\nWhere does it stop? Eighteen particles in total, dividing as four parts to one: product = 18 x 4/5 = **14.4**, reactant = 18 x 1/5 = **3.6**, and 14.4 / 3.6 = 4 ✓\n\n**\"A lot of product\" is never the question. The question is always: a lot compared with K?**",
            options: [
                { id: 'retry', label: "Compare with K, not with the other amount.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Equilibrium Constant K** sets the ratio this reaction settles at. **Product Particles** sets how many of the 20 particles in the flask are product right now -- the rest are reactant.\n\nThe lab works out Q, compares it with K, names the direction, and marks where the reaction will come to rest.\n\nTry this:\n\n- **K = 3** with **15** product: Q = 3, so Q = K -- balanced, and both directions still running\n- Keep K = 3 and drag product down to **5**: Q = 0.33, well below K, so **forward**\n- Now push product up to **18**: Q = 9, above K, so **reverse**\n- Set **K = 1** and watch the resting point move to **10 and 10** -- the only K where equilibrium really does mean equal\n- Set **K = 0.25**: the reaction rests at just **4** product",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Q against K gives the direction. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A reaction has **K = 0.01**. At equilibrium it holds a hundred times more reactant than product.\n\nA student concludes: *K is tiny, so this reaction barely happens. It is useless for making the product.*\n\nWhat is wrong with that?",
            options: [
                { id: 'right', label: "K says where it rests, not whether it runs. The reaction happens constantly in both directions -- and if you keep taking the product away, Q stays below K forever, so it keeps running forward and you can collect as much product as you like.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing is wrong -- a small K means a slow reaction, so there is no practical way to get much product out of it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Two different things are being run together here: **how far** and **how fast**.\n\n**K tells you how far** -- where the amounts come to rest. **It says nothing at all about how fast.** A reaction with a tiny K can reach that resting point in a fraction of a second, and one with a huge K can take years.\n\nAnd resting points can be moved. Watch what removing product does to Q:\n\n| | Product | Reactant | Q | Which way |\n| --- | --- | --- | --- | --- |\n| At rest | 1 | 100 | 0.01 = K | neither |\n| Take the product away | **0.1** | 100 | 0.001 | **forward** |\n| Take it away again | 0.1 | 99 | 0.001 | **forward** |\n\nEvery time you remove product, Q drops below K and the reaction runs forward to replace it. Keep removing, and it never stops running forward -- so a reaction that \"barely happens\" can be made to deliver, drop by drop, as much product as you have patience for.\n\nThis is how industry works with awkward equilibria: in the Haber process C15 mentioned, the ammonia is condensed out and removed continuously, so the reaction never gets to rest.\n\n**A small K is not a closed door. It tells you where the reaction wants to sit, and Q tells you how to stop it sitting there.**",
            options: [
                { id: 'retry', label: "K is how far, not how fast -- and removing product keeps Q low.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **K is where the reaction rests; Q is where it stands now; and the gap between them is the direction it must travel.**\n\nSo C15's principle has become a sum. \"The system shifts to relieve the stress\" was a good description, but **Q against K** is a prediction, and it works for whatever you disturb -- adding reactant, removing product, or changing the volume.\n\nTwo things this lesson held fixed. Every reaction here was **one-to-one**: one particle in, one particle out. Real equations are not -- three hydrogen molecules and one nitrogen make two ammonia, and those numbers become **powers** in K. And we counted **raw amounts** rather than amounts per litre, which works only while the volume never changes. Level 3 removes both.\n\nB15 watched populations rise and fall. B15 at Level 2 finds the balance point they are swinging around.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Q against K!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You turned Le Chatelier's Principle into a calculation.**\n\n- **K = product / reactant** at equilibrium; **Q** is the same ratio **right now**\n- Product on top both times -- swap it and every answer reverses\n- **Q < K** → **forward**; **Q > K** → **reverse**; **Q = K** → balanced, both directions still running\n- Equilibrium means **equal** only when **K = 1**: at K = 3 it rests at 15 product to 5 reactant\n- Adding 5 reactant to that flask drops Q to **1.5**, so it runs forward\n- It rests again at **18.75 product and 6.25 reactant** -- of the 5 added, 3.75 became product\n- K = 4 with 12 product and 6 reactant: Q = 2, so **forward**, resting at 14.4 and 3.6\n- **K is how far, not how fast**\n- Removing product holds Q below K, so even a reaction with **K = 0.01** can be made to deliver\n- Conditions: one-to-one reaction, closed container, fixed temperature\n- Held fixed: one-to-one reactions, and raw amounts instead of amounts per litre",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Compare the two ratios!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Which Way Will It Shift?**\n\nC15 named the principle. Level 2 predicts the direction.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Equilibrium constant | **K = product / reactant** | Where it rests |\n| Reaction quotient | **Q**, the same ratio now | Where it stands |\n| Too little product | **Q < K** | Runs **forward** |\n| Too much product | **Q > K** | Runs **reverse** |\n| Balanced | **Q = K** | Both directions still running |\n| Equal amounts | only when **K = 1** | K = 3 rests at 15 to 5 |\n| Add 5 reactant | Q falls to 1.5 | Rests at 18.75 and 6.25 |\n| A tiny K | K = 0.01 | How far, not how fast |\n| Keep removing product | Q stays under K | It never stops running forward |\n| Conditions | one-to-one, closed, fixed heat | Level 3 removes the first |\n\n**The one line to remember:** work out the ratio you have and compare it with the ratio the reaction rests at -- if it is too small, the reaction runs forward, and that is Le Chatelier's Principle as arithmetic.\n\n**Up next:** B15 -- the balance point that populations swing around."
        }
    };
}
