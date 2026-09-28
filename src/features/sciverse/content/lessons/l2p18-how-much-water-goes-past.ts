import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 18, physics.
 *
 * P18 showed that fast water erodes and slow water deposits, and that the outer
 * bank of a bend is cut while the inner bank is built. It never said how much
 * water was involved -- only whether it was fast or slow. This lesson puts a
 * number on the river itself:
 *
 *   discharge = width x depth x speed,  in cubic metres per second (m3/s)
 *
 * Worked on a stream 8 m wide and 1.5 m deep flowing at 0.8 m/s: 9.6 m3/s. The
 * checkpoint is the flood from P18 -- it deepens the channel to 3.0 m and doubles
 * the speed to 1.6 m/s, and discharge does not double but quadruples, to
 * 38.4 m3/s, because two of the three numbers changed at once.
 *
 * Still standing: the water does not all move at one speed. Friction holds it
 * back at the bed and the banks, so the middle runs faster than the edges and
 * this formula uses an average. Level 3 takes that apart.
 */
export function getL2P18Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A gauge on a river bank reports **9.6 cubic metres per second**. A cubic metre of water is a cube a metre on each side, and it weighs a tonne.\n\nSo every second, about ten tonnes of water goes past that gauge.\n\nP18 told you what fast water does: it lifts particles and cuts into banks, while slow water drops what it carries. What it never told you is **how much water** there is. \"Fast\" says nothing about size -- a fast gutter and a fast river are not the same problem, and the flood that moves boulders is not simply faster water, it is far more of it.\n\nHere is a stream: **8 m** wide, **1.5 m** deep, flowing at **0.8 m/s**. Can you tell how much water passes in a second?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Yes -- multiply all three. The width and depth give the size of the opening, and the speed says how fast the water crosses it.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "No -- speed alone cannot tell you an amount, and there is nothing else to go on.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "There is something else to go on, and you already have it: the **shape of the channel**.\n\nThink about a doorway. If you know it is 1 m wide and 2 m tall, you know its opening is 2 m². Now if people walk through at 1 m/s, then in one second everyone within 1 m of the doorway gets through -- so you empty a slab of space 1 m deep and 2 m² across.\n\nA river is the same. The water crosses an opening, and in one second it crosses it by however many metres its speed says.\n\nSo the amount is not a mystery. It is the **opening**, multiplied by **how fast the water crosses it**.",
            options: [
                { id: 'cont', label: "So the opening and the speed together give the amount?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "That is exactly it, and the quantity has a name. **Discharge** is the volume of water passing a point each second:\n\n**discharge = width x depth x speed**\n\nIn metres, metres and metres per second, that gives **cubic metres per second**, written **m³/s**. Check the units and you can see why: m x m x m/s leaves m³/s.\n\nThree things worth knowing before you use it:\n\n- **Width x depth is the cross-section** -- the area of the opening the water flows through, looking straight at the river from downstream.\n- **One cubic metre of water is one tonne.** So m³/s doubles as tonnes per second, which is why discharge tells you about power as well as volume.\n- **The condition:** this holds for a channel of roughly even depth, and it uses one **average** speed for all of the water.\n\nThat last point matters, and we come back to it.",
            options: [
                { id: 'cont', label: "Put the stream through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The stream: 8 m wide, 1.5 m deep, 0.8 m/s.**\n\n1. **Cross-section:** 8 m x 1.5 m = **12 m²**\n2. **Discharge:** 12 m² x 0.8 m/s = **9.6 m³/s**\n\nThat is the gauge reading from the start of the lesson. About **ten tonnes of water every second**, from a stream you could wade across.\n\nIt is worth pausing on how small a stream that is. 8 m is the width of a quiet road. 1.5 m deep is chest height. 0.8 m/s is a slow walk. Nothing about it looks dramatic, and it is still shifting ten tonnes a second.\n\nNow here is the part that makes discharge useful. Each of the three numbers is multiplied in, so **each one counts the same amount**. Double the width, double the discharge. Double the depth, double it again. Double the speed, the same. No one of them is the important one.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A river is **12 m** wide and **2.0 m** deep, and its water moves at **1.0 m/s**.\n\nWhat is its discharge?",
            options: [
                { id: 'right', label: "24 m³/s. The cross-section is 12 x 2.0 = 24 m², and 24 x 1.0 = 24.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'added', label: "15 m³/s, from 12 + 2.0 + 1.0.", nextNodeId: 'math_wrong' },
                { id: 'forgot_depth', label: "12 m³/s -- the width times the speed, since the depth is about the bed rather than the flow.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Check it with the units, which is the quickest way to catch both of those.\n\n**Adding** them cannot be right: you would be adding metres to metres per second, which is like adding a length to a speed. The units refuse it.\n\n**Leaving the depth out** cannot be right either. Width times speed is m x m/s = m²/s, an area each second rather than a volume. It would say a river 12 m wide carries the same water whether it is ankle deep or ten metres deep.\n\nAll three, multiplied: 12 x 2.0 x 1.0 = **24 m³/s**. If the units of your answer are not m³/s, the arithmetic went somewhere you did not intend.",
            options: [
                { id: 'retry', label: "Multiply all three, and let the units check it.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Channel Width** sets how wide the opening is, in metres, and **Flow Speed** sets how fast the water crosses it, in metres per second. The depth is held at 1.5 m so that the two dials are the two you are changing.\n\n| Width | Speed | Cross-section | Discharge |\n| --- | --- | --- | --- |\n| 4 m | 0.4 m/s | 6 m² | **2.4 m³/s** |\n| 8 m | 0.8 m/s | 12 m² | **9.6 m³/s** |\n| 8 m | 1.6 m/s | 12 m² | **19.2 m³/s** |\n| 16 m | 0.8 m/s | 24 m² | **19.2 m³/s** |\n| 20 m | 2.0 m/s | 30 m² | **60.0 m³/s** |\n\nLook at the two rows that both give 19.2. One got there by doubling the speed, the other by doubling the width. **The river cannot tell the difference** -- the same water goes past either way.\n\nBut the *land* can tell the difference, and this is where P18 comes back. The same discharge arriving fast and narrow cuts into the bed; arriving slow and wide, it drops sand instead. Discharge tells you how much water. It does not tell you what the water does with itself.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Same amount of water, different work. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** P18's flood arrives at our 8 m stream. The water rises, so the channel is now **3.0 m** deep instead of 1.5 m, and the flow speeds up from 0.8 m/s to **1.6 m/s**. The width stays 8 m.\n\nP18 said a flood \"doubles the river's speed\". So does the discharge double?",
            options: [
                { id: 'right', label: "No -- it quadruples, to 38.4 m³/s. The depth doubled and the speed doubled, and both multiply in.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- the speed doubled, so the discharge doubles to 19.2 m³/s.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The speed did double -- but read the question again. **The depth doubled too.**\n\n- Before: 8 x 1.5 x 0.8 = **9.6 m³/s**\n- After: 8 x 3.0 x 1.6 = **38.4 m³/s**\n\nThat is **four times**, not two. Two of the three numbers doubled, and 2 x 2 = 4.\n\nThis is the thing to take from the whole lesson. A flood is almost never described properly as \"faster water\". A rising river gets **deeper and faster at the same time**, because the extra water has to fit somewhere and deeper water feels less drag from the bed. The two arrive together, and their effects multiply.\n\nIt is why a flood that looks perhaps twice as alarming can be carrying four times the water -- and why a river gauge measures the **height** of the water rather than its speed. Height is what you can read off a post from the bank, and in a known channel it tells you the depth and the speed together.",
            options: [
                { id: 'retry', label: "Depth and speed both rose, so the effects multiplied.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct -- **38.4 m³/s**, four times the fair-weather flow, from a channel that looks only a little angrier.\n\nAnd 38.4 m³/s is 38.4 tonnes a second. That is what rolls the boulders P18 promised you: not faster water so much as *far more* water, arriving with the speed as well.\n\nOne more thing to notice. Discharge is the quantity every other river measurement hangs off:\n\n- **How much rock leaves the valley?** That is how much is dissolved in each litre, times the discharge. C18 is next, and this is exactly the sum it needs.\n- **How much power has the river got?** Discharge, times the height it falls.\n- **Will the town flood?** Discharge, against how much the channel can hold before it spills.\n\nNone of those can be answered from \"the water was fast\".",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Width, depth and speed -- all three, multiplied.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You measured a river.**\n\n- **discharge = width x depth x speed**, in **cubic metres per second (m³/s)**\n- **Width x depth** is the **cross-section**: the opening the water crosses\n- The units prove the formula: m x m x m/s = m³/s\n- **One cubic metre of water weighs a tonne**, so m³/s also reads as tonnes per second\n- The worked stream -- 8 m, 1.5 m, 0.8 m/s -- carries **9.6 m³/s**, ten tonnes a second\n- All three numbers count **equally**, because all three are multiplied\n- The same discharge can be wide and slow or narrow and fast: the water is the same, the **erosion is not**\n- In flood, depth and speed rise **together**: 8 x 3.0 x 1.6 = **38.4 m³/s**, four times the flow\n- Which is why a gauge measures **height**, not speed -- height carries both\n- Removed: P18's \"fast\" and \"slow\", which could not say how much water\n- Still standing: the water does **not** all move at one speed. The bed and banks hold it back by **friction**, so the middle outruns the edges, and this formula uses an **average**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Ten tonnes a second, from a stream I could wade!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Rivers Shape the Land?**\n\nP18 told you what fast water does. Level 2 tells you how much water there is to do it with.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Discharge | **width x depth x speed** | The water passing each second |\n| Units | m x m x m/s = **m³/s** | The units check the formula |\n| Weight | 1 m³ of water = **1 tonne** | m³/s is also tonnes/s |\n| The worked stream | 8 x 1.5 x 0.8 | **9.6 m³/s** |\n| Equal partners | all three multiplied | No one of them is the important one |\n| Same Q, different work | wide-slow vs narrow-fast | The river cannot tell; the bank can |\n| The flood | 8 x 3.0 x 1.6 | **38.4 m³/s** -- four times, not two |\n| Not in the formula | how speed **varies** across the channel | Which is why Level 3 returns to bends |\n\n**The one line to remember:** a flood is not faster water, it is deeper *and* faster water, and because the two multiply, twice as alarming can mean four times as much.\n\n**Up next:** C18 -- that clear water is carrying dissolved rock, and now you can work out how many tonnes of it leave the valley each day."
        }
    };
}
