import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 25, biology. The synthesis lesson. Mechanism.
 *
 * L2B25 admitted one problem with breadth^depth -- at depth 4 it returned 160,000,
 * more genes than a human has. It did not admit the worse one: if a mutation in a
 * switch gene really disrupted 8000 genes, then every such mutation would be fatal,
 * and a person carrying dozens of new mutations could not exist.
 *
 * The missing idea is redundancy. A gene usually has several switches above it, so
 * losing one does not switch it off. Only genes with NO spare switch fail. So define
 * the gain -- the number of genes that actually stop working per gene that has
 * stopped working:
 *
 *   g = breadth x (share of genes below with no spare switch)
 *   total affected = 1 / (1 - g)      for g < 1
 *
 * which is the same formula as L3C25's, and the threshold is again exactly 1. At
 * breadth 20 the threshold share is 1/20 = 5%: below that the cascade dies out,
 * above it runs away. So the wider a switch's reach, the less redundancy it can
 * afford.
 *
 * And that answers the question B25 opened and L2B25 could not close. Most mutations
 * do nothing because real networks sit BELOW 1 -- which is not luck. A network with
 * g above 1 would be wrecked by its first mutation, so only buffered networks have
 * survived to be here. The threshold is why complex organisms are possible at all.
 *
 * It closes the Big Idea by naming what all three Level 3 lessons found: a
 * multiplier, a dividing line at exactly 1, and 1/(1 - multiplier) blowing up as it
 * is approached. L3P25's multiplier was a slope, L3C25's a count of carriers, this
 * one a count of genes.
 *
 * Frame of reference stated: the gain is counted per layer, as genes that stop
 * working in the next layer over genes that have stopped working in this one.
 *
 * Still standing: g is an average over a network that is not uniform. Real networks
 * have hubs where g is locally far higher, and that is where the catastrophic
 * mutations live -- so an average below 1 does not make every mutation safe. And g
 * depends on the environment: the same mutation can be silent in one and lethal in
 * another, which this single number cannot express.
 */
export function getL3B25Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B25 was honest about one problem with its formula and quiet about a much worse one.\n\nThe problem it admitted: **breadth ^ depth** returns 160,000 at depth 4, which is more genes than a human has. It said so, and used it as a sign that the model had been pushed too far.\n\nThe problem it did not mention is this. **You are carrying a few dozen mutations your parents did not have.** If a mutation in a switch gene really disrupted 8000 genes, then every such mutation would be a catastrophe -- and with dozens of new mutations each generation, nobody would ever be born healthy. **We exist, so the formula is not just imprecise at depth 4. It is wrong at depth 1.**\n\nWhat is missing is the thing that makes a living network survivable. **A gene usually has several switches above it, not one.** Break one switch and the gene carries on, because another switch is still turning it on. Biologists call that **redundancy**, and a network with it is **buffered**.\n\nSo a broken switch does not break the 20 genes below it. It breaks only those with **no spare switch** -- and that is a much smaller number.\n\nWhich means the quantity to count is not the breadth. It is the **gain**:\n\n**g = the number of genes that actually stop working, per gene that has stopped working**\n\nYour two dials give it to you:\n\n- **Genes Each Switch Turns On** -- the breadth, as in L2B25.\n- **Share With No Spare Switch** -- what fraction of those genes depend on this one switch alone.\n\nSo **g = breadth x share**. Before any arithmetic: with a switch controlling 20 genes, how small does that share have to be for a mutation to be survivable?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'small', label: "Very small -- a few percent at most.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'half', label: "Under half, surely -- then most genes still work.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Half would be a disaster, and the reason is the thing this whole Big Idea has been about.\n\nA switch controls 20 genes. If half of them have no spare switch, then breaking the switch breaks **10** genes. But those 10 are switches too, and each of them breaks 10 more. And each of those...\n\n**g = 10.** The cascade is multiplying by ten at every layer, which is barely better than L2B25's twenty and heads to the same impossible place.\n\nFor the cascade to **die out** instead of growing, each broken gene must break **less than one** gene on average. That is the whole condition:\n\n**g below 1.**\n\nAnd with a breadth of 20, g = 20 x share, so g below 1 means the share must be below **1/20**, which is **5%**.\n\nSo it is not *under half*. It is **under five percent** -- at least nineteen out of every twenty genes must have a spare switch, or the organism cannot survive its own mutations. That is a far stronger demand on how a living network is wired than anything L2B25 suggested, and real networks meet it.",
            options: [
                { id: 'cont', label: "So the condition is g below 1.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "One broken gene breaks **g** genes. Each of those breaks **g** more. So the layers go 1, g, g², g³ -- and the total ever affected is\n\n**total = 1 / (1 - g)**, for g below 1\n\nwith no finite total at or above 1.\n\n**You have seen this formula before, in this Big Idea, an hour ago.** It is L3C25's, exactly. There the multiplier was carriers handed back per cycle; here it is genes broken per broken gene. The formula did not notice the difference.\n\nThe threshold sits where **g = 1**, which means **breadth x share = 1**, so\n\n**the threshold share is 1 / breadth**\n\n| Breadth | Threshold share |\n| --- | --- |\n| 5 | **20%** |\n| 10 | **10%** |\n| 20 | **5%** |\n| 30 | **3.3%** |\n\nRead that table twice, because it says something no one would guess. **The wider a switch's reach, the less redundancy it can afford.** A switch controlling 30 genes needs better than 97% of them to have a spare; a switch controlling 5 needs only 80%. Reaching further is not just more dangerous in proportion -- it raises the standard the whole network has to meet.\n\nAnd notice where L2B25 sits in this. It assumed **no** redundancy at all: every gene below depends on the one switch, so the share is **100%** and g = breadth = 20. Twenty, against a threshold of one. **L2B25 was not slightly wrong. It was twenty times past the dividing line**, which is exactly why it produced a number larger than a genome.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me both sides of the line.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A switch controlling 20 genes.** Walk the share across the threshold.\n\n| Share with no spare | g | Total genes affected |\n| --- | --- | --- |\n| 1% | 0.20 | **1.25** |\n| 2% | 0.40 | **1.67** |\n| 3% | 0.60 | **2.50** |\n| 4% | 0.80 | **5.00** |\n| **5%** | **1.00** | **the threshold** |\n| 6% | 1.20 | no end |\n| 10% | 2.00 | no end |\n\nLook at the left-hand column. **Those are all small numbers**, and the difference between the top row and the bottom is four percentage points. Across that gap the outcome goes from *one or two genes slightly affected* to *a developmental catastrophe*.\n\nAnd look at the totals as the share climbs: 1.25, 1.67, 2.50, 5.00, and then off the end. The total is **1 over the distance to the threshold**, so it does not grow steadily and then get big -- it accelerates into the line and stops existing at it.\n\n**At 2% the answer is 1.67 genes.** That is the sentence this lesson exists for. A mutation in a switch gene controlling twenty genes, in a properly buffered network, affects **about one and a half genes in total** -- itself, and a bit. Not 8000.\n\n**That is why you are carrying dozens of mutations and are fine.**",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. A switch controls **10** genes, and **4%** of the genes below it have no spare switch.\n\nWork out g, and say whether the cascade dies out.",
            options: [
                { id: 'dies', label: "g = 0.4, so it dies out — about 1.67 genes affected in total", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'runs', label: "g = 4, so it runs away", nextNodeId: 'math_wrong' },
                { id: 'quarter', label: "g = 0.4, so 40% of the genes below are affected", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "g = breadth x share = 10 x 0.04 = **0.4**, which is below 1, so the cascade dies out. The total is 1/(1 - 0.4) = 1/0.6 = **1.67 genes**.\n\ng = 4 comes from using 4 rather than 4% -- a factor of a hundred, and it lands on the wrong side of the threshold, which is the one error here that changes the biology rather than just the number.\n\nThe third answer gets g right and then misreads what it means. **g is not a percentage and not a share. It is a count** -- the number of genes that break per broken gene. g = 0.4 does not mean 40% of something is affected; it means that on average each broken gene breaks 0.4 of a gene below it, which is why the cascade fades. The thing you are counting and the thing you multiplied by are different quantities, and the units are worth keeping straight: **genes per gene, not a fraction of anything.**",
            options: [
                { id: 'retry', label: "g is a count of genes per gene.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. One broken switch is drawn at the top, with the genes it controls below it -- each one marked by whether it has a spare switch. **The broken ones in the lower row are g**, so you can count it.\n\nThings worth doing:\n\n- Put the breadth at 20 and the share at **0%**. Every gene below has a spare, nothing breaks, and g = 0. **A mutation here does nothing at all** -- which is the commonest outcome in real life.\n- Raise the share one notch at a time and watch the lower row. At 5% exactly **one** gene breaks, and that is the threshold: each broken gene replaces itself and no more.\n- Now hold the share at **5%** and change the **breadth**. At breadth 10 the threshold has not been reached; at breadth 30 it has been passed. **The same amount of redundancy is safe for a narrow switch and fatal for a wide one.**\n- Set the share to **100%** -- L2B25's assumption, that nothing has a spare. g is the full breadth, and the total is gone. You are looking at the lesson that ran to 160,000.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Every complex organism that has ever lived has had to survive its own mutation rate -- dozens of new mutations per individual, generation after generation, for hundreds of millions of years.\n\nSuppose some lineage had evolved a gene network with **g above 1**: beautifully intricate, finely wired, with little redundancy.\n\nWhat would have happened to it, and what does that tell you about every network alive today?",
            options: [
                { id: 'selected', label: "Its first mutations would have been catastrophic, so it could not persist — which means every surviving network must have g below 1.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'fine', label: "It would have been fine as long as it avoided mutations.", nextNodeId: 'checkpoint_wrong' },
                { id: 'chance', label: "Nothing in particular — whether a network is buffered is a matter of chance.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "No lineage gets to avoid mutations. They arrive every generation whether they are welcome or not -- that is what B25's *tiny changes* are, and there is no mechanism for declining them.\n\nSo a network with g above 1 does not have a risk. **It has a schedule.** Each mutation in a switch gene starts a cascade that does not die out, so each one is a developmental catastrophe, and the lineage ends.\n\nWhich means buffering is not a matter of chance. **It is a requirement for existing**, and that is a strong statement: every gene network you can study today, in every organism, has g below 1 -- not because it was designed that way, but because the ones above the line are not here to be studied.\n\nAnd this turns the Big Idea's question around. B25 asked how tiny changes can cause big effects. The deeper answer is that **in living things they usually cannot, and that is not an accident** -- anything that let them would have been removed long ago. The tiny changes that *do* cause big effects are the exceptions that a network has not managed to buffer.",
            options: [
                { id: 'retry', label: "Buffering is a requirement, not luck.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and that closes the Big Idea with the three disciplines saying one thing.**\n\nLook at what each Level 3 lesson found.\n\n| | The multiplier | Below 1 | Above 1 |\n| --- | --- | --- | --- |\n| **L3P25** | the rule's **slope** | gaps fade, forecasts work | chaos |\n| **L3C25** | **carriers** handed back | the chain fades out | explosion |\n| **L3B25** | **genes** broken per gene | the cascade dies | catastrophe |\n\nThree subjects, three completely different multipliers -- a steepness, a count of atoms, a count of genes -- and **the same dividing line at exactly 1**. In all three, the total is **1 / (1 - multiplier)**, which accelerates into the line and stops existing at it.\n\nSo Level 2's answer was the first half. It said a tiny change becomes a big effect by being **multiplied** rather than added, and that what matters is the number of repeats. True.\n\n**Level 3 is the second half: there is only ever one question about a repeated multiplication, and it is whether the multiplier is above or below 1.** Below it, everything fades however many repeats you allow. Above it, nothing can stop it. And the whole of chaos, explosion and developmental catastrophe is three systems sitting on the wrong side of the same number.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One dividing line, three subjects!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out why you are alive despite carrying dozens of mutations.**\n\n- L2B25 admitted its formula gave 160,000 at depth 4. The worse problem it skipped: if a switch mutation really broke 8000 genes, **every one would be fatal and nobody would be born healthy**\n- What was missing is **redundancy**. A gene has **several** switches above it, so losing one does not switch it off. Only genes with **no spare switch** fail\n- So count the **gain**: **g = breadth x (share with no spare switch)** -- the genes that actually stop working per gene that has stopped working. It is a **count, genes per gene**, not a fraction\n- **total affected = 1 / (1 - g)**, for g below 1. **This is L3C25's formula exactly**, with a different multiplier in it\n- The threshold is **g = 1**, so the **threshold share is 1 / breadth**: 20% at breadth 5, **5% at breadth 20**, 3.3% at breadth 30\n- **So the wider a switch's reach, the less redundancy it can afford.** Reaching further raises the standard the whole network must meet\n- At breadth 20 and a 2% share, a switch mutation affects **1.67 genes in total**. Itself, and a bit. Not 8000 -- **and that is why you are fine**\n- Four percentage points, from 1% to 5%, is the whole distance from *barely anything* to *no end at all*. The total is **1 over the distance to the threshold**\n- **L2B25 assumed no redundancy at all**, a 100% share, so its g was the full breadth of 20 against a threshold of 1. **Twenty times past the line**, which is why it returned more genes than a genome\n- And buffering is **not luck**. A lineage with g above 1 does not have a risk, it has a **schedule** -- so every network alive today has g below 1, because the ones above it are not here to be studied\n- Which turns B25's question around: **in living things, tiny changes usually cannot cause big effects, and that is not an accident.** The ones that do are what a network has failed to buffer\n- **The three disciplines gave one answer.** A **slope**, a count of **carriers**, a count of **genes** -- and the same dividing line at **1**, with **1/(1 - multiplier)** accelerating into it. **Level 2 said the effect is multiplied. Level 3 says the only question is whether the multiplier is above or below 1**\n- **Still standing:** g is an **average** over a network that is not uniform. Real networks have **hubs** where g is locally far higher, and those are exactly where the catastrophic mutations live -- so an average below 1 does **not** make every mutation safe, and *Antennapedia* is a hub. And g is not a fixed property: the same mutation can be silent in one environment and lethal in another, which one number cannot express.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L3B25", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Can Tiny Changes Cause Big Effects?**\n\nLevel 2 found that the effect is multiplied. Level 3 found the number that decides whether the multiplying ever stops.\n\n**Summary Table:**\n| | Physics (L3P25) | Chemistry (L3C25) | Biology (L3B25) |\n| --- | --- | --- | --- |\n| What Level 2 assumed | the error **doubles** | one carrier **in, one out** | the cascade is a **perfect tree** |\n| What removed it | a step multiplies by the **slope** | a cycle can hand back **two** | genes have **spare switches** |\n| The multiplier | **slope = r(1 - 2x)** | **b**, carriers handed back | **g = breadth x share** |\n| The threshold | **\\|slope\\| = 1**, so r < 3 | **b = 1** | **g = 1**, so share < 1/breadth |\n| What blows up | the forecast horizon | **1 / (1 - b)** cycles | **1 / (1 - g)** genes |\n| Above the line | chaos | explosion | catastrophe |\n| The number | **r = 4 gives exactly 2.0000** | 0.99 against 1.01: **nothing** against **20,959** | **5%** at breadth 20; 2% gives **1.67 genes** |\n| The surprise | chaos is the system's property, **not our ignorance** | pressure gives **two** explosion limits | buffering is a **requirement for existing** |\n| Still standing | the doubling **stops** when the gap is large | b depends on **pressure** | networks have **hubs** |\n\n**The one line to remember:** every one of these systems multiplies something repeatedly, and a repeated multiplication has only ever had one question -- is the multiplier above or below one? Below it everything fades however long you wait; above it nothing can stop it; and chaos, explosion and catastrophe are three different subjects sitting on the wrong side of the same number.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
