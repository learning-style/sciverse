import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 24, chemistry.
 *
 * C24 said that reaction networks have bottlenecks and that catalysts shift the
 * flow through them. It never said where the material actually ends up, which is
 * the question a reaction network is really for.
 *
 * The junction here is the one every burning thing has. Carbon in a fuel can leave
 * as carbon dioxide (CO2, the full burn) or as carbon monoxide (CO, the dangerous
 * one), and both routes start from the same carbon:
 *
 *   share that becomes CO2 = CO2 route / (CO2 route + CO route)
 *
 * The point is the contrast with L2P24. Two pipes side by side ADD, because each
 * carries its own water: 25 + 20 = 45. Two reaction routes side by side DIVIDE,
 * because they compete for the same carbon. So doubling both pipes doubles the
 * delivery, while doubling both routes changes the share by exactly nothing --
 * verified, 60/66 and 30/33 are both 90.9%.
 *
 * And that is the decision. A heater turned up twice as high is no less efficient,
 * but it puts twice as much CO into the same room, so the SHARE and the AMOUNT come
 * apart. Ventilation is not the same problem as efficiency.
 *
 * Frame of reference stated: both route speeds are grams of carbon leaving the
 * flame down that route, per minute.
 *
 * Still standing: the two route speeds are set here by dials. What really moves
 * them is temperature and how much air reaches the flame, and the lesson says which
 * way each one pushes without being able to calculate it. It also assumes the split
 * is settled by speed alone -- which is true while the gases are rushing away from
 * the flame, and L3C24 removes it.
 */
export function getL2C24Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C24 told you that a reaction **network** -- a set of reactions joined so that one step's product is the next step's starting material -- has bottlenecks, and that a catalyst can shift the flow. What it never said is **where the material ends up**, which is the only reason anyone draws a reaction network in the first place.\n\nSo here is a junction you have in your home.\n\nBurn anything with carbon in it -- gas, wood, candle wax -- and each carbon atom leaves by one of two routes. It can pick up two oxygens and leave as **carbon dioxide (CO2)**, which is the full burn and is harmless at these amounts. Or it can pick up only one and leave as **carbon monoxide (CO)**, which is colourless, has no smell, and is poisonous.\n\n**Both routes start from the same carbon.** That is the whole lesson, and it is why this junction behaves nothing like L2P24's.\n\nA **route speed** is how many grams of carbon leave the flame down that route each minute, in **grams per minute (g/min)**. Your two dials set them.\n\n- **Route to CO2** -- faster when more **air** reaches the flame, because the full burn needs two oxygens instead of one.\n- **Route to CO** -- faster when the flame is **cool** or starved of air, which is why a yellow, smoky flame is the worrying one.\n\nSo, before any arithmetic. You turn a gas heater up so it burns twice as much fuel every minute. Both routes get twice as fast. What happens to the **share** of the carbon that leaves as the poisonous CO?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'doubles', label: "It doubles -- twice the burning, twice the share.", nextNodeId: 'misconception' },
                { id: 'same', label: "It stays the same, because both routes sped up together.", nextNodeId: 'defining', sentiment: 'positive' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is the answer L2P24 would give, and this is the one junction where that lesson's arithmetic does not carry over.\n\nIn the pipe network, two pipes side by side **added**: 25 + 20 = 45 L/min, and doubling both pipes doubled the delivery. Each pipe had its **own** water.\n\nThese two routes do not have their own carbon. **They are competing for the same carbon**, and every atom goes down exactly one of them. So the question is not how much each route carries, it is **what fraction of the traffic each route wins** -- and if both routes get twice as fast, they are still winning the same fractions as before.\n\n**Pipes side by side add. Routes side by side divide.** Same picture, opposite arithmetic, and the reason is which of them owns the material.\n\nSomething *does* double, though, and it matters. Hold that thought -- it comes back at the checkpoint.",
            options: [
                { id: 'cont', label: "So what sets the fractions?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Picture the carbon arriving at the junction as a single stream, and the two routes as two openings it can leave by. The faster route takes the bigger share, and the shares have to add up to all of it.\n\nSo the share that leaves as CO2 is that route's speed over the **total** of both:\n\n**share as CO2 = CO2 route / (CO2 route + CO route)**\n\nand whatever is left over is the share that leaves as CO.\n\nThis holds while both routes start from the **same carbon** and each route's speed is set by the conditions rather than by how much fuel you are feeding in -- which is the case for a flame, where the gases are rushing away and never get the chance to come back.\n\nNow look at what the formula is made of. Both the top and the bottom are **speeds**, so dividing one by the other **cancels the units** and the answer is a plain fraction. That is why the share cannot care how big the flame is: multiply both speeds by the same number and it cancels out of the top and the bottom together.\n\nChemists call that share the **selectivity** of the junction -- the proportion of the material that ends up as the thing you wanted.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me it on real numbers.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A worked example.** A gas heater running properly: the CO2 route is **60 g/min** and the CO route is **6 g/min**.\n\nThe total leaving the junction:\n\n60 + 6 = **66 g/min** of carbon\n\nThe share as CO2:\n\n60 g/min / 66 g/min = **0.909**, so **90.9%**\n\nThe units cancel, as promised, and what is left over is the CO share: 100% - 90.9% = **9.1%**.\n\n**Now turn the heater down to half.** Both routes halve, to 30 and 3 g/min:\n\n30 / (30 + 3) = 30 / 33 = **0.909**, so **90.9%** again.\n\nExactly the same share. Not nearly -- exactly, because the 2 cancelled.\n\n**And now open the air vent instead**, which speeds up the CO2 route *alone*. Leave the CO route at 6 and put the CO2 route at 90:\n\n90 / (90 + 6) = 90 / 96 = **0.938**, so **93.8%**\n\nThat is the only kind of change that moves the share: one route, not both. **Changing the size of the flame does nothing. Changing the balance does everything.**",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. A flame is burning badly: the **CO2 route is 10 g/min** and the **CO route is 40 g/min**.\n\nWhat share of the carbon leaves as the harmless CO2?",
            options: [
                { id: 'twenty', label: "20%", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'twentyfive', label: "25%", nextNodeId: 'math_wrong' },
                { id: 'eighty', label: "80%", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Careful -- the bottom of the fraction is the **total** of both routes, not the other route.\n\n- the total: 10 + 40 = **50 g/min**\n- the share as CO2: 10 / 50 = **0.20**, so **20%**\n\nSo four fifths of the carbon in this flame is leaving as poison. That is a flame to turn off.\n\n25% is 10 divided by 40, which compares one route against the other instead of against the whole stream -- it would have the shares adding up to more than everything there is. And 80% is the CO share: it is the right arithmetic answering the other question, which is worth checking yourself on every time, because here the two answers are a life apart.\n\n**Always divide by the total.**",
            options: [
                { id: 'retry', label: "Divide by the total. Got it.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The stream arriving at the junction splits into two, and each outgoing stream's **width** is its route's speed -- so the share is something you can see rather than calculate.\n\nThings worth doing:\n\n- Put the routes at **30 and 3**, then at **60 and 6**. The streams get twice as fat and the split looks **identical**, because it is.\n- Now raise only the **Route to CO2**. The split visibly shifts, and that is the real fix.\n- Now raise only the **Route to CO**, the way a cold or starved flame does. Watch how fast the CO share climbs once that route is anywhere near the other.\n- Set them **equal**. Half the carbon leaves as poison, and the two streams are the same width -- which is a picture worth remembering, because a flame like that looks perfectly normal.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Back to the heater, and to the thing that *does* double.\n\nA heater runs with the CO2 route at 30 g/min and the CO route at 3 g/min. Someone turns it up so that it burns twice as much fuel each minute, and both routes double, to 60 and 6.\n\nYou already know the share of CO is unchanged at 9.1%. **Is the room any more dangerous than it was?**",
            options: [
                { id: 'yes', label: "Yes -- the share is the same, but twice as much CO is now entering the room each minute.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'no', label: "No -- the share did not change, so the danger did not change.", nextNodeId: 'checkpoint_wrong' },
                { id: 'less', label: "No, and it is safer, because a hotter flame burns more completely.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The share and the amount are two different numbers, and this is the one place in the lesson where only the amount matters.\n\n- before: the CO route ran at **3 g/min**\n- after: the CO route runs at **6 g/min**\n\nThe share of the carbon going that way is unchanged at **9.1%**, and **twice as much CO per minute is going into the room**. What harms somebody is the amount that builds up in the air, not the fraction it represents of the fuel.\n\nSo a flame can be perfectly efficient and still fill a room, which is why a gas heater needs **ventilation** -- a way for air to come in and exhaust to go out -- and not just a good burner.\n\nAnd the third answer has it backwards in a useful way. A hotter flame does favour the CO2 route a little, so the share may improve slightly. The amount still doubles, and the amount is what you breathe.",
            options: [
                { id: 'retry', label: "Share unchanged, amount doubled.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly, and this is the pair of numbers the lesson is really about.**\n\n- the **share** is set by the **ratio** of the two route speeds, so it ignores the size of the flame entirely\n- the **amount** is set by the **size** of the flame, so it ignores the ratio entirely\n\nThey are independent, and a safety problem can live in either one. A badly adjusted burner is a **share** problem, and you fix it by changing the balance -- more air. A big heater in a sealed room is an **amount** problem, and no amount of adjusting the burner fixes it, because the burner is already working as well as it can.\n\nTwo questions, then, not one: *how good is this flame?* and *how much of it is there?*",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Share and amount are different!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out what a junction does to material, not just to flow.**\n\n- **share as CO2 = CO2 route / (CO2 route + CO route)**, while both routes start from the same carbon and the gases do not come back\n- The bottom is the **total** of both routes. Dividing a speed by a speed **cancels the units**, so the answer is a plain fraction\n- That share is the junction's **selectivity** -- the proportion that ends up as what you wanted\n- 60 and 6 g/min: the total is 66, and the CO2 share is 60/66 = **90.9%**, leaving **9.1%** as CO\n- Halve both to 30 and 3 and the share is **exactly the same**, because the 2 cancels out of the top and the bottom together\n- **Pipes side by side add; routes side by side divide.** L2P24's 25 + 20 = 45 because each pipe had its own water. These routes share one stream of carbon\n- So the only way to move the share is to change **one** route. Opening the air vent takes 60/66 to 90/96 = **93.8%**\n- A badly burning flame at 10 and 40 g/min sends **80%** of its carbon out as poison, and looks normal doing it\n- The **share** and the **amount** are independent. Doubling the flame leaves the share at 9.1% and doubles the CO entering the room from 3 to **6 g/min**\n- So there are two separate safety questions, and **ventilation** answers the one the burner cannot\n- **Still standing:** the two route speeds were dials here. Which way air and temperature push them is in the lesson, but working out the speeds themselves is not. And the whole thing assumed the split is settled by **speed** alone. That is true for a flame, where the gases rush away and never come back -- but let the two products sit together and able to turn back, and the split is decided by something else entirely. **L3C24 removes that one.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2C24", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Chemistry Complete -- How Do Networks Deliver What Matters?**\n\nC24 said a catalyst shifts the flow through a network. This says what the shift is made of, and the arithmetic turned out to be the opposite of the physics.\n\n**Summary Table:**\n| | C24 said | L2C24 says |\n| --- | --- | --- |\n| What a junction does | shifts flux between pathways | **divides** one stream between routes |\n| The formula | -- | **share = one route / the total of both** |\n| What sets the share | bottlenecks and catalysts | only the **ratio** of the two route speeds |\n| Making everything faster | more output | **exactly no change** to the share |\n| Making one route faster | -- | the share moves, and that is the only fix |\n| Against L2P24 | -- | pipes **add**, routes **divide** |\n| The worked case | -- | 60 and 6 g/min gives **90.9% CO2**, 9.1% CO |\n| The second number | -- | the **amount**: doubling the flame doubles the CO |\n\n**The one line to remember:** two routes out of one junction share the material, so the ratio of their speeds fixes the share and the size of the whole thing fixes the amount -- and a flame can be good at the first while being dangerous at the second.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
