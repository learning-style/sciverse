import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 8, biology. The synthesis lesson.
 *
 * L2B8 treated fur as the fox's only way to lose heat. This removes that
 * simplification: blood carries heat to the paws, which stand on snow. Heat
 * lost there = blood flow x c x (temperature the blood arrives at - paw
 * temperature). Countercurrent exchange -- artery beside vein, flowing in
 * opposite directions -- cools the blood before it arrives. Worked by hand:
 * about 67 W with no exchange, about 7 W with it.
 *
 * Model figures stated as a model: 0.5 g/s of blood, c = 3.6 J/g/C, paws at
 * 0 C. Frame of reference stated: the blood's temperature drop inside the paw.
 * Still standing: vessels open and close, and breath also carries heat away.
 */
export function getL3B8Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B8 balanced an arctic fox's heat budget with its fur. But it named what it held fixed: **fur as the only way out for heat**.\n\nThe fox's paws stand directly on snow. Blood has to reach the paws, or they would die. And blood arriving at 37 °C, in feet sitting on snow, should lose a great deal of heat.\n\nYet a fox can stand on snow for hours. Measure its paw pads, and they sit at about **0 °C** -- just above freezing -- while its body stays at **37 °C**.\n\nHow does it keep its paws so cold without its whole body's heat draining out through them?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The blood vessels to the paw run beside the vessels coming back. Warm blood going down hands its heat to cold blood coming up, so the blood is already cold when it reaches the paw, and little heat is lost there.", nextNodeId: 'blood', sentiment: 'positive' },
                { id: 'bad', label: "Its paws have thick fur underneath, so no heat gets into the snow at all.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Arctic fox paws are furry, and that helps. But fur alone cannot explain it.\n\nThe paw's tissue has to stay alive, so blood has to keep flowing into it. And the paw pads themselves press on the snow. If blood arrived at the paws at **37 °C** and left at **0 °C**, it would carry away a large amount of heat every second -- however good the fur.\n\nThe trick is not in the paw. It is further up the leg, in **how the blood vessels are arranged**. To see how much it matters, first work out how much heat blood can carry.",
            options: [
                { id: 'cont', label: "How much heat does blood carry?", nextNodeId: 'blood' }
            ]
        },
        blood: {
            id: 'blood',
            speaker: 'AI',
            content: "Blood carries heat the way L2C1's water does. When blood cools inside the paw, the heat it gives up is:\n\n**heat lost each second = blood flow x c x (arriving temperature − paw temperature)**\n\n- **blood flow**, in grams each second\n- **c**, blood's specific heat capacity: about **3.6 J/g/°C**, a little less than water's 4.2\n- the bracket is the frame of reference: **how far the blood cools inside the paw**, from the temperature it arrives at down to the paw's temperature\n\nNow the model's numbers, rounded but in the right range:\n\n- blood flow to all four paws: **0.5 g each second**\n- paws at **0 °C**, leaving the paw at that temperature\n- the fox's resting heat from L2B8: **15 W**\n\n**With no trick at all**, blood arrives at 37 °C:\n\nheat lost = 0.5 x 3.6 x (37 − 0) = **66.6 W**\n\nOver **four times** everything the fox makes at rest -- lost through its feet alone. No fur could make up for that.\n\nThe condition belongs here. **This model treats the blood flow as steady, and the paws as sitting at 0 °C.**",
            options: [
                { id: 'cont', label: "So how does the fox avoid losing 67 W?", nextNodeId: 'exchange' }
            ]
        },
        exchange: {
            id: 'exchange',
            speaker: 'AI',
            content: "In the fox's legs, the **artery** carrying warm blood down to the paw runs right alongside the **vein** carrying cold blood back up. The two flow in **opposite directions**. This is called **countercurrent exchange**.\n\nFollow it step by step:\n\n**Step 1.** Warm blood leaves the body in the artery at 37 °C.\n\n**Step 2.** Right beside it, cold blood is coming back up the vein from the paw. Heat flows from the warmer vessel to the cooler one, by L2P8's conduction, across the thin walls between them.\n\n**Step 3.** Further down the leg, the artery has already given away some heat -- but the vein beside it is colder still, because that blood has come more recently from the paw. **At every point down the leg, the artery is still a little warmer than the vein beside it**, so heat keeps crossing over all the way down.\n\n**Step 4.** By the time the artery reaches the paw, its blood has cooled to only a few degrees. And the vein's blood has been warmed nearly back to body temperature before it re-enters the body.\n\nThe heat is not lost. It is **handed back** to the blood returning to the body. Only a small leftover reaches the paw.",
            options: [
                { id: 'cont', label: "Work out how much it saves.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "Suppose the exchange cools the artery's blood to **4 °C** before it reaches the paw.\n\n| | Blood arrives at the paw | Cools inside the paw by | Heat lost = 0.5 x 3.6 x that |\n| --- | --- | --- | --- |\n| No exchange | 37 °C | 37 °C | **66.6 W** |\n| Countercurrent exchange | 4 °C | 4 °C | **7.2 W** |\n\nThe exchange cuts the heat lost through the paws from 66.6 W to **7.2 W**.\n\nHow much of the heat was handed back? Out of the 37 °C the blood would otherwise have cooled by, the exchange took away 37 − 4 = 33 °C before the paw:\n\n**share handed back = 33 / 37 = 0.89**\n\nAbout **89%** of the heat heading for the paws is returned to the body. The fox keeps its feet cold, and its heat.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** In a younger fox, the exchange works less well: blood reaches its paws at **10 °C**. The flow is still **0.5 g** each second, c = **3.6 J/g/°C**, and the paws are at **0 °C**.\n\nHow much heat is lost through the paws each second?",
            options: [
                { id: 'right', label: "18 W. The blood cools by 10 − 0 = 10 °C in the paw, and 0.5 x 3.6 x 10 = 18 W.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'recovered', label: "48.6 W, because the blood cooled by 37 − 10 = 27 °C, and 0.5 x 3.6 x 27 = 48.6 W.", nextNodeId: 'math_wrong' },
                { id: 'no_c', label: "5 W, because 0.5 x 10 = 5.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**48.6 W** is the heat **handed back** to the body, not the heat lost. The blood's cooling from 37 °C to 10 °C happened **up the leg**, into the vein beside it -- that heat went back into the body. The heat lost to the snow is only what the blood gives up **inside the paw**: from 10 °C down to 0 °C.\n\n**5 W** left out blood's **specific heat capacity**. Grams times degrees is not yet energy. Each gram cooling by each degree gives up 3.6 J, so c must be in the product.\n\nheat lost = 0.5 x 3.6 x (10 − 0) = **18 W** -- more than the fox's whole 15 W of resting heat.",
            options: [
                { id: 'retry', label: "Only the cooling inside the paw is lost.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a fox with paws at **0 °C** and 15 W of resting heat.\n\n**Blood Flow** is the blood reaching all four paws, in grams each second. **Arrival Temperature** is the temperature the blood has cooled to by the time it reaches the paws, in °C -- 37 °C for no exchange at all, lower for a better exchange.\n\nThe lab draws the artery and the vein side by side, coloured by temperature, and works out the heat lost through the paws and the share handed back to the body.\n\nTry this:\n\n- Set **Arrival Temperature** to **37 °C**: no exchange, and a heat loss far above 15 W\n- Lower it to **4 °C**, and watch the loss fall to about 7 W\n- Halve **Blood Flow**. Less blood loses less heat -- but a paw that gets too little blood freezes",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Cold arriving blood, little heat lost. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A fox's paw pads sit at about 0 °C on snow at **−10 °C**. Imagine instead that the fox kept its paws comfortably warm, at **37 °C**.\n\nUsing L2P8's idea that heat flow grows with the temperature difference, why would warm paws be a bad idea?",
            options: [
                { id: 'right', label: "Heat flow into the snow grows with the difference between paw and snow. A 37 °C paw is 47 °C warmer than the snow, against 10 °C for a 0 °C paw -- so it would lose nearly five times as much heat.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Warm paws would melt the snow, and the fox would sink in and get stuck.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Warm paws would melt a little snow -- but the far bigger cost is the **heat** leaking out.\n\nFrom L2P8, heat flow through a layer is **k x A x ΔT / d**. With the same paw pads touching the same snow, only ΔT changes:\n\n| Paws at | Snow at | ΔT, paw − snow | Heat lost, compared with 0 °C paws |\n| --- | --- | --- | --- |\n| 0 °C | −10 °C | 10 °C | 1 |\n| 37 °C | −10 °C | 47 °C | 47 / 10 = **4.7 times** as much |\n\nKeeping its paws just above freezing is not a failure to stay warm. It is how the fox keeps the temperature difference with the snow -- and so its heat loss -- as small as it can, without letting the paws freeze.",
            options: [
                { id: 'retry', label: "Cold paws keep the temperature difference small.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Cold paws keep the temperature difference with the snow small -- and countercurrent exchange lets the fox keep them cold without its body going cold.**\n\nHere is the simplification this lesson removed. **L2B8 treated fur as the fox's only way out for heat.** Blood carries heat to every part of the body, including the paws that stand on snow. Without countercurrent exchange, the paws alone would cost over four times the fox's resting heat.\n\nThat completes Big Idea 8 at Level 3. Level 2 measured single rates. Level 3 followed heat along a **path**:\n\n- **L3P8** -- layers in series add their resistances: the unseen air films matter more than the glass\n- **L3C8** -- rising air cools itself by expanding, **9.8 °C per km**, and clouds begin at **125 m per degree** of gap\n- **L3B8** -- an artery and a vein, side by side and flowing opposite ways, hand **89%** of the paws' heat back to the body\n\nAnd the simplifications still standing. **The blood flow was held steady.** Real foxes open and close the vessels to their paws, now and then letting a little warm blood through so the tissue does not freeze. And a fox loses heat in another way this lesson ignored: every breath carries warm, damp air out of its body -- L2C8's water vapour. Many mammals recover some of that heat too, in the passages of the nose, with the same countercurrent trick.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Hand the heat back before it leaves!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found how a fox keeps its feet cold.**\n\n- Fur is not the only way out for heat: blood carries heat to the paws\n- **heat lost = blood flow x c x (arriving temperature − paw temperature)**\n- Model: 0.5 g of blood each second, **c = 3.6 J/g/°C**, paws at **0 °C**\n- No exchange: 0.5 x 3.6 x 37 = **66.6 W** -- over four times the resting 15 W\n- **Countercurrent exchange**: artery and vein side by side, flowing opposite ways\n- At every point down the leg, the artery is a little warmer than the vein beside it\n- Blood arriving at 4 °C: **7.2 W** lost; **89%** handed back\n- Blood arriving at 10 °C: **18 W** lost\n- Heat cooled out of the blood up the leg is handed back, not lost\n- Warm paws on −10 °C snow would lose **4.7 times** as much as 0 °C paws\n- Still standing: blood flow varies, and breath also carries heat and water vapour away",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Countercurrent exchange!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How a Fox Keeps Its Feet Cold!**\n\nL2B8 balanced the heat leaking through fur. Level 3 follows the heat that blood carries to the snow.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Heat in blood | **flow x c x (arriving − paw)** | Only the cooling inside the paw is lost |\n| No exchange | 0.5 x 3.6 x 37 = **66.6 W** | Over four times resting heat |\n| Countercurrent | artery beside vein, opposite flows | Heat handed back up the leg |\n| With exchange | 0.5 x 3.6 x 4 = **7.2 W** | A small leftover |\n| Share handed back | 33 / 37 = **89%** | Most of the heat returns |\n| A weaker exchange | 0.5 x 3.6 x 10 = **18 W** | More than resting heat |\n| Cold paws | ΔT 10 °C against 47 °C | 4.7 times less loss |\n| Still standing | steady flow, no breath | Vessels vary; breath loses heat |\n| Big Idea 8 at Level 3 | series layers, expanding air, exchangers | Heat follows a path |\n\n**The one line to remember:** by running warm blood past cold blood in opposite directions, a fox hands its paws' heat back to its body -- and keeps its feet cold on purpose.\n\n**Big Idea 8 is complete at Level 3.**"
        }
    };
}
