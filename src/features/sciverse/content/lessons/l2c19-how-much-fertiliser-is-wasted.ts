import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 19, chemistry.
 *
 * C19 said plants need nitrogen, phosphorus and potassium, that soil pH decides
 * what is available, and that too much fertiliser causes algal blooms downstream.
 * What it never explained is why anyone would apply too much. This lesson gives
 * the reason, and it is arithmetic rather than carelessness:
 *
 *   fertiliser to apply = what the crop takes away / the share the plants catch
 *
 * Worked on a crop removing 120 kg of nitrogen per hectare where the plants catch
 * only half of what is spread: 240 kg/ha must go on, and 120 kg/ha is left in the
 * soil with nowhere to be. The surplus is not a mistake -- it is the arithmetic of
 * an inefficient catch, and it is the number that ends up in the river.
 *
 * Still standing: the share the plants catch is treated here as a property of the
 * field. It is not. It depends on when the fertiliser is spread, on soil pH, and
 * on how much water drains through -- which is L2P19's other half. Level 3 shows
 * why nitrogen in particular is so hard to keep.
 */
export function getL2C19Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C19 ended with a farmer adding tons of nitrogen fertiliser, a river full of algae, and dead fish. The lesson called it **eutrophication** and left it there, which quietly makes the farmer look either greedy or careless.\n\nUsually they are neither. Watch what the arithmetic forces.\n\nA crop growing on a hectare of land pulls a certain amount of nitrogen out of the soil and carries it away when it is harvested -- for a decent cereal crop, around **120 kg of nitrogen per hectare**. A **hectare** is 100 m by 100 m, about two football pitches, and **kg/ha** means kilograms per hectare, which is how every fertiliser decision is measured.\n\nIf you want that crop next year, you have to put those 120 kg back. Otherwise the field gets poorer every season.\n\nYour two dials are the two numbers that decide how big the bag has to be.\n\n- **Crop Demand** is how much nitrogen the crop takes away, in kg/ha.\n- **Share the Plants Catch** is the percentage of what you spread that actually ends up inside a plant.\n\nAnd here is the awkward number. That second dial is often about **50%**. So: to give the crop 120 kg, how much do you have to spread?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "240 kg -- if the plants only catch half, you have to put on twice what they need.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "120 kg, and the plants will manage to find most of it eventually.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "They will not, and the reason is timing rather than effort.\n\nA plant takes up nitrogen through its roots, dissolved in soil water, and only while it is growing. But the nitrogen is in the soil from the day it is spread, sitting in that same water -- and water moves. Rain pushes it downwards, past the roots, and once it is below the root zone it is gone for good. It is not stored for later; it is on its way to a stream.\n\nSo the plant is not competing with a full larder. It is competing with **drainage**, which is exactly what L2P19 measured. The water that soaked into the field is the water that carries fertiliser down through it.\n\nSpread 120 kg and lose half to drainage and the crop gets 60 kg -- half of what it needed. The yield falls, and the farmer who did the honest thing is worse off than the one who overdid it.\n\nWhich is why the sum runs the other way round: you start from what the plant must get, and work back to what you have to spread.",
            options: [
                { id: 'cont', label: "So work backwards from what the crop needs?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Exactly, and working backwards means dividing:\n\n**fertiliser to apply = what the crop takes away / the share the plants catch**\n\nIf the plants catch half, divide by 0.5, which doubles it. If they catch 70%, divide by 0.7. The worse the catch, the bigger the bag.\n\nThe quantity worth watching is what is left over:\n\n**surplus = fertiliser applied - what the crop takes away**\n\nThat surplus is the honest name for the problem, and it is the part heading for the river. It is not wasted in the sense of sloppiness -- it is the unavoidable consequence of a catch below 100%, and it is the material that ends up in the river.\n\nTwo notes before you use it:\n\n- **Dividing by a fraction makes a number bigger.** If that feels wrong, check it: 240 kg spread with half caught gives 120 kg in the plant, which is what we wanted. The division undoes the losing.\n- **The condition:** this assumes you know the catch. In practice it is estimated from experiments on similar fields, and it is the shakiest number in the sum.\n\nThe proper name for the share the plants catch is the **nitrogen use efficiency**. **Efficiency** here means what fraction of the effort reaches the target, exactly as it does for an engine.",
            options: [
                { id: 'cont', label: "Put the crop through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A crop taking away 120 kg/ha of nitrogen, with the plants catching 50%.**\n\n1. **Apply:** 120 / 0.5 = **240 kg/ha**\n2. **The crop gets:** 240 x 0.5 = 120 kg/ha, which is what it needed\n3. **Surplus left in the soil:** 240 - 120 = **120 kg/ha**\n\nSo half the bag does its job and **half is loose in the field**. Not spilled, not mismeasured -- spread exactly as intended, and surplus by arithmetic.\n\nNow improve the catch to **70%**, which good practice can achieve:\n\n1. **Apply:** 120 / 0.7 = **171 kg/ha**\n2. **Surplus:** 171 - 120 = **51 kg/ha**\n\nLook at what improving the catch did. The crop still gets its 120 kg -- the yield is unchanged. But the surplus fell from 120 to 51 kg/ha, a drop of well over half.\n\nThat is the finding, and it is not obvious. **Efficiency does not mainly save money on fertiliser; it mostly removes the surplus.** Going from 50% to 70% cuts the bag by 29% and the surplus by 58%. The river notices far more than the accountant does.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A crop takes away **90 kg/ha** of nitrogen, and on this field the plants catch **60%** of what is spread.\n\nHow much must be applied, and how much is surplus?",
            options: [
                { id: 'right', label: "Apply 150 kg/ha, and 60 kg/ha is surplus. 90 / 0.6 = 150, and 150 - 90 = 60.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'multiplied', label: "Apply 54 kg/ha, from 90 x 0.6, with no surplus.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "Apply 144 kg/ha, by adding 60% of 90 on top of the 90.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**54 kg/ha** multiplied where it should have divided, and you can catch it without any algebra: 54 is *less* than the 90 the crop needs. If the plants only catch some of what you spread, the answer has to be **more** than the requirement, never less. Spreading 54 with 60% caught gives the crop 32 kg, and the crop fails.\n\n**144 kg/ha** is the more tempting mistake, because adding a margin feels like the practical thing to do. But check it: 144 spread with 60% caught gives 144 x 0.6 = 86 kg -- still short of 90. Adding a percentage on top does not cancel losing a percentage, because the loss applies to the whole of the new amount, including the margin you just added.\n\n**90 / 0.6 = 150 kg/ha.** Check it forwards: 150 x 0.6 = 90 exactly. Surplus 150 - 90 = **60 kg/ha**.",
            options: [
                { id: 'retry', label: "Divide by the share -- adding a margin does not cancel a loss.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Crop Demand** in kg/ha, and **Share the Plants Catch** as a percentage.\n\n| Crop takes | Plants catch | Apply | Surplus |\n| --- | --- | --- | --- |\n| 120 kg/ha | 40% | 300 kg/ha | **180 kg/ha** |\n| 120 kg/ha | 50% | 240 kg/ha | **120 kg/ha** |\n| 120 kg/ha | 70% | 171 kg/ha | **51 kg/ha** |\n| 120 kg/ha | 90% | 133 kg/ha | **13 kg/ha** |\n| 150 kg/ha | 40% | 375 kg/ha | **225 kg/ha** |\n\nRun your eye down the surplus column while the crop demand stays at 120. It goes 180, 120, 51, 13. The catch improved steadily, in equal steps of 10 or 20 percentage points -- and the surplus collapsed far faster than it improved.\n\nThat is because the surplus depends on the catch **twice over**: a worse catch means a bigger bag, *and* a bigger share of that bigger bag is left behind. The two work together.\n\nWhich tells you where the effort belongs. A farmer who wants to protect a river cannot simply spread less -- that starves the crop and is why the honest approach fails. They have to spread it so that **more of it is caught**: closer to when the plants are growing fast, in several smaller doses rather than one, and never just before heavy rain.\n\nThat last one comes straight from L2P19. Fertiliser spread the day before a downpour meets the water that soaks in, and leaves with it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "A poor catch costs twice. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A farmer is told to cut fertiliser use by a quarter to protect the river. Their crop takes away **120 kg/ha**, and the plants currently catch **50%**, so they have been applying 240 kg/ha.\n\nThey cut to **180 kg/ha** and change nothing else. What happens?",
            options: [
                { id: 'right', label: "The crop gets only 90 kg instead of 120, so the yield falls -- and the surplus is still 90 kg/ha, so the river is only somewhat better off. Cutting the amount without improving the catch hurts the crop more than it helps the river.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The surplus falls by a quarter and the crop is fine, since there was plenty of spare nitrogen in that 240 kg anyway.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "There was never any spare nitrogen in the 240 kg. That is the thing to see. The 240 was 120 for the crop and 120 lost -- and the lost half was not sitting there available, it was on its way out with the drainage water.\n\nRun the cut:\n\n- **Applied:** 180 kg/ha\n- **Crop gets:** 180 x 0.5 = **90 kg/ha**, against the 120 it needed. Short by a quarter, and the yield shows it.\n- **Surplus:** 180 - 90 = **90 kg/ha**, against 120 before.\n\nSo the crop loses a quarter of its nitrogen and the river's problem falls by a quarter. Both numbers moved together, because **the catch did not change** -- and the catch is the only thing that decides how the bag splits.\n\nThis is the honest difficulty with fertiliser rules written as a cut in the amount. They work, in the sense that less surplus reaches the water. They just take it out of the harvest at the same time, which is why farmers resist them and why the arguments are so bitter.\n\nWhat moves both numbers the right way is the **catch**. Go from 50% to 70% and you apply 171 instead of 240 -- less fertiliser bought, **and** the crop still gets its full 120 kg, **and** the surplus falls from 120 to 51. Everyone gains, and nothing was given up.",
            options: [
                { id: 'retry', label: "Cutting the amount splits the loss between crop and river. Improving the catch helps both.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Crop down to 90 kg, surplus still 90 kg** -- the cut was shared out between the harvest and the river, because nothing changed about how the bag splits.\n\nAnd that is the useful conclusion from a fairly small piece of arithmetic. There are two ways to reduce what reaches the water, and they are not equally good:\n\n- **Spread less**, and the crop pays part of the price. The surplus falls in proportion, and so does the yield.\n- **Catch more**, and nothing pays. The crop keeps its 120 kg, the bag gets smaller, and the surplus falls faster than the bag does.\n\nSo C19's fish were not killed by a careless farmer. They were killed by a **catch of 50%**, which turns a sensible decision into 120 kg/ha of loose nitrogen.\n\nWhat this level cannot yet tell you is why nitrogen is so hard to catch in the first place. Potassium is spread on the same fields and mostly stays put; nitrogen leaves. That is not about the plants at all -- it is about what soil can and cannot hold on to, and it is where Level 3 goes.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The catch decides everything!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out why anyone would ever apply too much fertiliser.**\n\n- **fertiliser to apply = what the crop takes away / the share the plants catch**\n- **surplus = applied - what the crop takes away**, and the surplus is what reaches the river\n- A **hectare** is 100 m by 100 m, and **kg/ha** is how every fertiliser decision is measured\n- A cereal crop carries away about **120 kg/ha** of nitrogen, which has to be replaced or the field gets poorer\n- Catching 50%: apply **240 kg/ha**, surplus **120 kg/ha**. Catching 70%: apply **171**, surplus **51**\n- Dividing by a fraction makes the number **bigger**, and adding a margin instead does not work: 144 with 60% caught still leaves the crop short\n- **A poor catch costs twice** -- a bigger bag, and a bigger share of it left behind\n- Cutting the amount alone shares the loss between the harvest and the river. **Improving the catch costs nobody anything**\n- The share the plants catch is called the **nitrogen use efficiency**\n- Fertiliser spread before heavy rain meets L2P19's water going in, and leaves with it\n- Removed: C19's overfertilising farmer, with no reason given for the decision\n- Still standing: the catch is treated here as a property of the field. It is not -- it depends on timing, on soil pH, and on drainage. And nothing here explains why **nitrogen** is so much harder to keep than potassium",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Half the bag, gone by arithmetic!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Does Soil Support Life?**\n\nC19 told you excess fertiliser kills fish. Level 2 tells you where the excess comes from, and it is not carelessness.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Apply | **crop demand / share caught** | Work backwards from the plant |\n| Surplus | **applied - crop demand** | What reaches the river |\n| Catching 50% | 120 / 0.5 = 240 | Surplus **120 kg/ha** |\n| Catching 70% | 120 / 0.7 = 171 | Surplus **51 kg/ha** |\n| Why it pays twice | bigger bag, bigger share lost | Surplus falls faster than the bag |\n| Cutting the amount | 240 to 180 | Crop short by a quarter, river only a quarter better |\n| Improving the catch | 50% to 70% | Crop unharmed, surplus halved |\n| Not in the formula | why **nitrogen** leaves and potassium stays | Which is Level 3 |\n\n**The one line to remember:** if plants catch only half of what you spread, you must spread twice what they need, so the surplus that poisons the river is not carelessness but arithmetic -- and the only fix that costs nobody anything is to improve the catch.\n\n**Up next:** B19 -- there is another way to feed a crop, and it involves the dead leaves already lying on the ground."
        }
    };
}
