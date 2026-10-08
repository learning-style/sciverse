import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 25, biology. The closing lesson.
 *
 * B25 said a single DNA change can reshape an organism. That is true and it is
 * misleading, because almost all of them do nothing whatever. The question B25
 * never asks is what separates the two, and the answer is not the size of the
 * change -- every single-base change is the same size. It is WHERE it lands.
 *
 *   genes affected = breadth ^ depth
 *
 * where breadth is how many genes one switch turns on and depth is how many layers
 * of switches sit below the mutated one. A worker gene is depth 0 and affects one
 * thing. 20 wide and 3 deep affects 8000.
 *
 * And depth beats breadth, which is the arithmetic worth having: 20^3 = 8000 while
 * 30^2 = 900, so one extra layer beats making every layer half again as wide.
 *
 * It closes the Big Idea by naming what all three disciplines turned out to share.
 * L2P25 multiplied an error by 2 repeatedly; L2C25 sent a carrier round repeatedly;
 * this multiplies a switch's reach repeatedly. In all three the size of the effect
 * came from the NUMBER of repeats, never from the size of one step -- which is the
 * actual answer to how a tiny change causes a big effect.
 *
 * Frame of reference stated: depth is counted downwards from the mutated gene, and
 * breadth is genes turned on by one switch.
 *
 * Still standing: this treats the network as a perfect tree, where every gene has
 * one input and nothing is counted twice. Real networks are not trees -- a gene has
 * many inputs, and most cascades die out rather than multiplying. L3B25 removes it,
 * and finds the same threshold the other two Level 3 lessons find.
 */
export function getL2B25Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B25 told you that a single DNA change can reshape a whole organism. That is true, and on its own it is badly misleading -- because **almost all of them do nothing at all**.\n\nYou are carrying a few dozen mutations your parents did not have. You are fine. Meanwhile there are single-base changes that turn a fruit fly's **antennae into legs** -- a real mutation, in a gene called *Antennapedia*, and the fly grows walking legs out of its head.\n\nSo the interesting question is not *can a tiny change have a big effect*. It is: **two changes of exactly the same size, and one does nothing while the other rebuilds an animal's head. What is the difference between them?**\n\nIt is not the size. Every single-base change is the same size -- one letter in three billion. **It is where it lands.**\n\nGenes code for proteins, and proteins come in two kinds that matter here.\n\n- A **worker** protein does a job itself. It might give skin its stretch, or break down a sugar. Break it and you have broken that one job.\n- A **switch** protein has only one job: **turning other genes on**. Biologists call it a *transcription factor*. Break it and you have broken everything it was switching on -- and if any of those were switches too, you have broken everything *they* were switching on.\n\nThat is a cascade, and your two dials describe its shape.\n\n- **Genes Each Switch Turns On** -- the **breadth**. How many genes one switch controls.\n- **Layers Below** -- the **depth**. How many ranks of switches sit beneath the one that mutated. A worker gene has a depth of **0**.\n\nSo, before any arithmetic. A switch controls 20 genes, and each of those controls 20 more, and each of those controls 20 more. How many genes does breaking the top switch affect?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'sixty', label: "60 — twenty, three times over.", nextNodeId: 'misconception' },
                { id: 'eightk', label: "8000 — each layer multiplies the one above.", nextNodeId: 'defining', sentiment: 'positive' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "60 is 20 **added** three times. The layers do not add, because each gene in a layer turns on its own 20 -- not a share of the same 20.\n\nWalk it down slowly.\n\n- the broken switch turns on **20** genes. All 20 are now wrong\n- but each of those 20 is itself a switch, and each turns on **20** more. That is 20 lots of 20 = **400**\n- and each of those 400 turns on 20 more: **8000**\n\nSo the third layer alone is 8000 genes, not 20.\n\nThis is the same arithmetic you have already met twice in this Big Idea, wearing different clothes. **L2P25** had an error multiplied by 2 at every step, not increased by 2. **L2C25** had a carrier go round a cycle 100,000 times, not 100,000 carriers each going once. Adding when the truth is multiplying is the single mistake this whole Big Idea is about.\n\n**Layers multiply.** And that is why there is any answer at all to how one letter rebuilds a head.",
            options: [
                { id: 'cont', label: "So it is breadth multiplied by itself.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Each layer multiplies by the breadth, so after **depth** layers:\n\n**genes affected = breadth ^ depth**\n\nwhich means breadth multiplied by itself *depth* times. Breadth 20, depth 3, is 20 x 20 x 20 = **8000**.\n\nThis holds while the cascade is a **tree** -- every gene below has one switch above it, and nothing gets counted twice. That is a real simplification and this lesson will come back to it.\n\nTwo things fall straight out.\n\n**A worker gene has depth 0**, and anything to the power of 0 is **1**. So breaking a worker affects exactly one thing, which is the right answer and a good sign the formula is not nonsense.\n\n**And depth beats breadth.** Compare:\n\n| Breadth | Depth | Genes affected |\n| --- | --- | --- |\n| 30 | 2 | **900** |\n| 20 | 3 | **8000** |\n\nThe second switch controls *fewer* genes each time -- 20 against 30 -- and affects **nine times as many**, because it sits one layer higher. **Being higher up beats being wider**, and it is not close.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me the whole range.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**One breadth, four depths.** Take breadth 20 and walk the depth down:\n\n| Depth | Genes affected | What that is |\n| --- | --- | --- |\n| 0 | **1** | a worker gene. One job broken |\n| 1 | **20** | a switch at the bottom. A noticeable defect |\n| 2 | **400** | a whole tissue goes wrong |\n| 3 | **8000** | an organ, or a body part in the wrong place |\n| 4 | **160,000** | more genes than a human has. The embryo does not survive |\n\nFive rows, one formula, and the same size of change every time: **one letter**.\n\nThat table is the answer to the question B25 asked and left open. A mutation does nothing, or ends a pregnancy, and what decides which is not how big it was but **how far up it landed**.\n\nAnd notice the last row, because it is doing something useful. 160,000 is more genes than a human genome contains -- about 20,000. So that row is telling you the model has been pushed past where it makes sense, which is a thing a good model should do rather than quietly giving you a number. **A formula that returns an impossible answer is telling you something: in this case, that real cascades cannot be four perfect layers of twenty.**",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. A switch turns on **5** genes, and there are **4** layers below it.\n\nHow many genes does a mutation in that switch affect?",
            options: [
                { id: 'sixtwentyfive', label: "625", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'twenty', label: "20", nextNodeId: 'math_wrong' },
                { id: 'thousand', label: "1024", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Multiply the breadth by itself, once per layer:\n\n5 x 5 x 5 x 5 = **625**\n\n20 is 5 added four times -- the adding mistake again, and it is worth noticing how wrong it gets: 20 against 625 is more than thirty times out, from one wrong operation.\n\n1024 is 2 to the power of 10, which is **L2P25's** number, not this one. It is a good thing to have at your fingertips but it belongs to a different cascade -- breadth 2, depth 10. Which is worth a moment: **breadth 2 and depth 10 affects 1024, while breadth 5 and depth 4 affects 625.** A switch controlling only two genes reaches further than one controlling five, if it sits six layers higher.\n\n**Depth beats breadth, every time, and by more than you expect.**",
            options: [
                { id: 'retry', label: "Breadth multiplied by itself, once per layer.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The cascade is drawn as a spreading tree from the mutated gene, with the count beside it.\n\nThings worth doing:\n\n- Put **Layers Below** at 0. One gene, one job -- a worker. Now step it to 1, 2, 3. The count goes 1, 20, 400, 8000 while the dial moves three notches.\n- Now hold the depth at 2 and push **Genes Each Switch Turns On** all the way to 30. You reach **900**. Then put breadth back to 20 and depth to 3: **8000**. **One extra layer beat ten extra genes per switch, nine times over.**\n- Set breadth to its smallest, **2**, and the depth to its largest. Even a switch controlling just two genes reaches **16** genes four layers down, and would reach 1024 at ten layers.\n- Try to find a setting where a **worker** gene affects more than one thing. You cannot -- depth 0 always gives 1, whatever the breadth. **The breadth of a switch you did not break does not matter.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Two children are each born with a single-base mutation.\n\n**Child A** has a mutation in a gene for a worker protein in the lens of the eye. The protein is slightly the wrong shape.\n\n**Child B** has a mutation in a switch gene that sits **three layers above** the genes that build the whole eye, with each switch controlling about 20 genes.\n\nBoth mutations are the same size: one letter. Why would a doctor expect these to be completely different in their effects?",
            options: [
                { id: 'depth', label: "A affects about 1 gene and B about 8000, because B's effect is multiplied by every layer below it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'size', label: "B's mutation must be in a bigger or more important gene.", nextNodeId: 'checkpoint_wrong' },
                { id: 'random', label: "There is no way to expect anything — mutation effects are random.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Both genes could be exactly the same length, and both mutations are exactly one letter. **Nothing about the change is bigger.**\n\n- Child A: a worker, depth **0**. 20 to the power of 0 = **1 gene affected**. One protein slightly wrong in one tissue\n- Child B: a switch, depth **3**. 20 x 20 x 20 = **8000 genes affected**. The instructions for building an eye, disrupted at the top\n\nSo the second answer is reaching for the wrong property. There is no such thing as a bigger or more important gene in the sense it needs -- there is only a gene's **position in the network**, and position is not something you can see by looking at the gene.\n\nAnd *mutation effects are random* gives up on a question that has a good answer. Which base gets changed is indeed a matter of chance. **What that change then does is not** -- it follows from where the gene sits, and this formula is a first estimate of it. That distinction is worth holding on to: the cause is random, the consequence is structured.",
            options: [
                { id: 'retry', label: "Position in the network, not size of the change.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and that closes the Big Idea, because all three disciplines just gave the same answer.**\n\nLook at what each one actually said.\n\n- **L2P25:** an error that **doubles** each step. What set the size of the disaster was **how many steps**, not how wrong the measurement was -- which is why a thousand-fold better instrument bought only fifteen days\n- **L2C25:** a carrier **handed back** each cycle. What set the damage was **how many cycles**, not how many carriers -- which is why one atom wrecks a hundred thousand molecules\n- **L2B25:** a switch whose reach is **multiplied** by each layer. What sets the effect is **how many layers**, not how big the mutation -- which is why one letter can rebuild a head\n\nThree subjects, three formulas, **one shape**: something small, multiplied over and over.\n\n**So the answer to *how can tiny changes cause big effects* is that they are never added up. They are multiplied -- and what decides the size of the effect is how many times, not how big the cause.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One shape, three subjects!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found what separates a harmless mutation from a catastrophic one, and it is not the mutation.**\n\n- Almost all mutations do nothing. A few rebuild a body part. **Every single-base change is the same size**, so the size cannot be what separates them\n- A **worker** protein does a job. A **switch** protein -- a *transcription factor* -- turns other genes on. Break a worker and one job fails; break a switch and everything below it fails\n- **genes affected = breadth ^ depth**, while the cascade is a tree with nothing counted twice\n- A worker gene is **depth 0**, and anything to the power of 0 is **1**. The formula gets the easy case right, which is how you know it is not nonsense\n- Breadth 20: depth 1 gives **20**, depth 2 gives **400**, depth 3 gives **8000** -- an organ, or legs where antennae belong\n- Depth 4 gives **160,000**, which is more genes than a human has. **A formula that returns an impossible answer is telling you something** -- here, that real cascades are not four perfect layers of twenty\n- **Depth beats breadth, and not narrowly.** Breadth 30 at depth 2 is **900**; breadth 20 at depth 3 is **8000**. Breadth 2 at depth 10 is **1024**, beating breadth 5 at depth 4\n- Two children, two single-letter mutations: **1 gene** affected and **8000**. The difference is **position in the network**, which you cannot see by looking at the gene\n- The cause is **random**; the consequence is **structured**. Which base changes is chance, what it then does is not\n- **And all three disciplines gave one answer.** An error doubling, a carrier cycling, a switch switching -- in every case the effect's size came from **how many repeats** and never from how big one step was. **Tiny changes cause big effects because they are multiplied, not added**\n- **Still standing:** this treated the cascade as a perfect **tree**. Real gene networks are not trees -- a gene has many switches above it, the same gene gets counted twice, and most importantly **most cascades die out instead of multiplying**, or every mutation would be fatal. The honest version asks whether each layer multiplies by more or less than **one**. **L3B25 asks exactly that, and finds the same threshold L3P25 and L3C25 find.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2B25", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Can Tiny Changes Cause Big Effects?**\n\nA weather forecast, the ozone layer and a fruit fly's head, and between them one shape.\n\n**Summary Table:**\n| | Physics (L2P25) | Chemistry (L2C25) | Biology (L2B25) |\n| --- | --- | --- | --- |\n| The small thing | a **measurement error** | one **chlorine atom** | one **letter** of DNA |\n| What repeats | the error **doubles** | the carrier is **handed back** | each layer **multiplies** |\n| The formula | **start x 2ⁿ** | **1 / stopping chance** | **breadth ^ depth** |\n| In real numbers | **15 days** of forecast | about **100,000** molecules | **8000** genes |\n| The surprise | 1000x better buys **15 days**, not 1000x | halve the stopping chance, **double** the damage | **depth beats breadth**, nine times over |\n| What it changes | do not promise a year | stop the **carriers**, not the cycles | **position**, not size, predicts the damage |\n| Still standing | the doubling rate is not fixed | the stopping chance is not fixed | real networks are **not trees** |\n\n**The one line to remember:** a tiny change becomes a big effect only by being multiplied over and over, so in all three subjects the size of the effect is set by **how many repeats** and not by how big the cause was -- which is why a thousand-fold better thermometer buys a fortnight, and why one letter can put legs on a head.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
