import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 18, physics. A Mechanism lesson: it adds no
 * new machinery at all, and instead asks why the Level 1 rule is true.
 *
 * P18 explained the eroding outer bank with an analogy -- "the outer bank gets the
 * fast water, like a car on the outside of a turn". That analogy is the
 * simplification this lesson removes, because it cannot explain the other half of
 * what P18 itself described: sediment piling up on the inner bank. Faster water on
 * the outside says nothing about why sand should travel inwards.
 *
 * The real mechanism needs only circular motion and a force balance:
 *
 *   surface tilt across the channel:  dh = v^2 w / (g R)
 *
 * Worked on a river 30 m wide on a 100 m bend at 1.2 m/s: 4.4 cm of tilt. Then the
 * consequence -- the tilt is set by the average speed, but the surface water is
 * faster than the bed water, so the same tilt over-provides for the slow water at
 * the bed. The bed water is pushed inward, and because bedload rolls along the bed
 * it goes with it. That is one mechanism explaining both banks.
 *
 * Still standing: this treats the bend as an existing curve of fixed radius and
 * steady flow. It explains why a bend deepens and migrates once it exists. It does
 * not explain how the very first bend started in a straight channel.
 */
export function getL3P18Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P18 gave you a rule and a reason. The rule: the **outer bank** of a bend erodes, the **inner bank** collects sand and gravel. The reason: \"the outer bank gets the fast water, like a car on the outside of a turn.\"\n\nThe rule is right. The reason has a hole in it, and it is worth finding before we fill it.\n\nFaster water on the outside could explain why the outer bank is cut. It explains **nothing** about the inner bank. Slow water dropping what it already carries is not the same as sand *arriving* -- and P18's inner bank is not merely quiet, it is being **built**, year after year, into a point bar. Something has to carry sediment sideways, across the channel, towards the inside of the curve.\n\nNothing in \"the outside is faster\" moves anything sideways.\n\nYour two dials are the two things a bend is made of. **Flow Speed** is how fast the water is travelling, in metres per second, and **Bend Radius** is how tight the curve is, in metres -- a small radius is a sharp bend.\n\nSo: what pushes sand towards the inner bank?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Something must be making the water itself move sideways near the bed, and the sand goes with it.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Nothing needs to. The inner bank is just calm, so whatever drifts past settles there.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Test that against the river. If the inner bank only collected what happened to drift by, a point bar would be a thin veneer of the finest silt -- the last stuff to settle out of still water.\n\nGo and look at one. Point bars are **coarse**: sand, gravel, sometimes cobbles. That is not material that settled out of calm water. It is material that was **delivered**, and delivering gravel takes work.\n\nThere is a second problem. A bend does not just sit there being lopsided; it **migrates**. The outer bank retreats and the inner bank advances at much the same rate, so the channel keeps its width while the whole curve crawls sideways across the valley -- which is how a river ends up with the meanders you see from a plane.\n\nThat is a conveyor belt, not a settling pond. Material is being taken off one bank and put on the other.\n\nAnd a conveyor needs a mechanism.",
            options: [
                { id: 'cont', label: "So something carries it across. Where does a sideways force come from?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "From the bend itself. Here is the whole derivation, and it uses nothing you have not met.\n\nWater going round a curve is not moving in a straight line, so **it must be accelerating**. A body on a circle of radius **R** at speed **v** has acceleration **v²/R**, directed at the centre of the curve. That is not a new law; it is what circular motion means.\n\nSo something must push the water towards the inside of the bend. What is available? Not friction -- water has nothing to grip. The only thing a fluid can push with is a **pressure difference**, and in an open channel the way to get one is to make the water **deeper on one side than the other**.\n\nSo the surface **tilts**. It stands higher against the outer bank and lower against the inner bank, and the weight of that extra water leaning inwards supplies exactly the push the curve demands.\n\nSetting the two against each other, the surface slope across the channel is **v²/(gR)**, so across a width **w** the height difference is\n\n**Δh = v² w / (g R)**\n\nRearrange it whichever way you need: **v = √(g R Δh / w)** turns a measured tilt into the speed of the river.\n\n**The conditions:** a curve of roughly constant radius, steady flow, and a channel whose width is small compared with R.",
            options: [
                { id: 'cont', label: "Put a real river through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A river 30 m wide, on a bend of radius 100 m, flowing at 1.2 m/s.**\n\n1. **The acceleration the curve demands:** v²/R = 1.44/100 = **0.0144 m/s²**\n2. **As a fraction of gravity:** 0.0144/9.81 = **0.00147**, so the surface slopes at about 1 in 680\n3. **Across 30 m:** 0.00147 x 30 = **0.044 m**\n\n**Δh = 4.4 cm.**\n\nThat is so small that the lab has to cheat to show you: its tilt is drawn larger than life, because a slope of 1 in 680 is invisible on a screen. Bear that in mind while you use it -- the picture exaggerates, the number does not.\n\nThat 4.4 cm is the entire engine. Four centimetres of tilt across a river wide enough to need a bridge -- you would never see it, and a spirit level laid across the water would barely argue with you.\n\nAnd yet. **Δh goes as v²**, so it is fiercely sensitive to flow. Double the speed to 2.4 m/s and the tilt is not 8.8 cm but **17.6 cm**. Tighten the bend to R = 50 m and it doubles again. A river in flood on a tight bend can stand a good half-metre higher against its outer bank than its inner one, which is why that is where flood defences fail.\n\nBut a tilt on its own still does not move sand sideways. The tilt is the setup. The next step is the mechanism.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A river **60 m** wide runs at **1.5 m/s** round a bend of radius **200 m**. Take g as 9.81 m/s².\n\nWhat is the height difference between its outer and inner banks?",
            options: [
                { id: 'right', label: "About 6.9 cm. v²w/(gR) = (2.25 x 60)/(9.81 x 200) = 135/1962 = 0.069 m.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_square', label: "About 4.6 cm, from (1.5 x 60)/(9.81 x 200).", nextNodeId: 'math_wrong' },
                { id: 'flipped', label: "About 2.2 m, from (2.25 x 200)/(9.81 x 60).", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two slips worth separating, because one is arithmetic and the other is physics.\n\n**Forgetting to square v** loses the most important feature of the whole result. The tilt comes from the acceleration v²/R, and the square is why a modest flood reshapes a bend that survived a decade of ordinary flow. Dropping it turns the fiercest term in river physics into a gentle one.\n\n**Swapping R and w** is the more interesting mistake, and the units cannot catch it -- both are metres, so the answer still comes out in metres. Check it by asking which way each should act. A **tighter** bend needs a **bigger** tilt, so R must be on the bottom. A **wider** channel has further to tilt across, so w must be on top. Getting 2.2 m of tilt across a river should also feel wrong: you would see that from the bank.\n\n**(2.25 x 60)/(9.81 x 200) = 135/1962 = 0.069 m**, near enough **7 cm**.",
            options: [
                { id: 'retry', label: "Square the speed, and R on the bottom.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Now the mechanism, and it follows from something the tilt has to ignore.**\n\nThe two dials are **Flow Speed** and **Bend Radius**, and here is what they give:\n\n| Speed | Radius | Tilt across 30 m |\n| --- | --- | --- |\n| 0.6 m/s | 100 m | **1.1 cm** |\n| 1.2 m/s | 100 m | **4.4 cm** |\n| 1.2 m/s | 50 m | **8.8 cm** |\n| 2.0 m/s | 100 m | **12.2 cm** |\n\nEvery one of those is a **single** tilt -- one surface, one slope. But the water under it is not all moving at the same speed. L2P18 warned you about this and set it aside: **friction at the bed holds the lower water back**, so surface water runs faster than water near the bed. Call it 1.5 m/s at the surface and 0.6 m/s near the bed.\n\nNow ask what each layer needs. The fast surface water, on a 100 m bend, needs v²/R = 2.25/100 = 0.0225 m/s² of inward acceleration. The slow bed water needs only 0.36/100 = **0.0036 m/s²**, six times less.\n\nAnd they are both under **the same tilt** -- one surface serves the whole depth, and it is set by the average.\n\nSo the tilt is **not enough** for the surface water, which drifts outward, and it is **far too much** for the bed water, which gets pushed inward. The water turns over: outward at the top, down the outer bank, inward along the bed, up at the inner bank. A slow corkscrew, spiralling downstream.\n\nThere is your conveyor. **Gravel and sand roll along the bed** -- that is what bedload means -- so they travel with the bed current, which goes **inward**. The outer bank meanwhile takes the full force of fast water diving down it.\n\nOne mechanism, both banks, and no analogy required.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The tilt fits the average, so it fails both layers. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** An engineer lines a bend with smooth concrete to stop it eroding. The lining works: the bed is now almost frictionless, so the water moves at nearly the same speed from surface to bed.\n\nWhat happens to the corkscrew, and to the sand that used to build the inner bank?",
            options: [
                { id: 'right', label: "The corkscrew nearly stops. With one speed everywhere, one tilt suits every layer, so there is no sideways flow and no sand delivered to the inner bank.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The corkscrew gets stronger, because the faster water round the bend needs a bigger tilt.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The tilt does get bigger -- faster water on the same bend needs more of it, and Δh goes as v². That part is right.\n\nBut the corkscrew was never caused by the tilt being **big**. It was caused by the tilt being **wrong for most of the water**.\n\nGo back to the two layers. The spiral existed because one surface slope had to serve water moving at 1.5 m/s and water moving at 0.6 m/s, and it could not suit both: too little for the fast layer, far too much for the slow one. The mismatch is the mechanism.\n\nTake the friction away and the mismatch goes with it. If every layer moves at 1.4 m/s, then every layer needs the same v²/R, and a single tilt satisfies all of them **exactly**. Nothing is left over to push water sideways. The flow goes round the bend and stays where it is, top to bottom.\n\nSo the spiral is not driven by speed, or by tightness, or by the size of the tilt. It is driven by the **difference in speed with depth**. No velocity gradient, no secondary flow.\n\nWhich is a genuinely useful thing to know, because it predicts something you can go and check: a smooth artificial channel really does stop building point bars, and the sand that used to be laid down inside the bend carries on downstream instead. Engineers who line one bend and not the next find the problem has simply moved.",
            options: [
                { id: 'retry', label: "It is the speed difference with depth, not the size of the tilt.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. The spiral lives on the **velocity gradient** -- the change of speed with depth -- and a lined channel removes it.\n\nAnd that is worth pausing on, because it is the kind of prediction that separates a mechanism from a story. \"The outside is faster\" predicts nothing about a concrete lining. This mechanism predicts that lining a bend stops it building sand on the inside, and it is right: lined bends pass their bedload straight on downstream, to be dropped wherever the lining ends.\n\nSo look at what the mechanism explains that the analogy could not:\n\n- **Why the inner bank gains coarse gravel** rather than fine silt: it is delivered along the bed, not settled out of still water.\n- **Why bends migrate sideways at constant width**: one circulation takes material off the outer bank and puts it on the inner one.\n- **Why the deepest point of a bend is against the outer bank**: that is where the surface flow dives down.\n- **Why lining a bend moves the problem** instead of solving it.\n- **Why a flood reshapes a bend a decade of ordinary flow left alone**: the tilt, and the strength of the whole circulation, go as **v²**.\n\nThe analogy was not wrong about the outer bank. It was just not a mechanism, and so it could not be asked any of these questions.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A four-centimetre tilt, and a corkscrew.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You replaced an analogy with a mechanism.**\n\n- Water on a curve must accelerate inward at **v²/R** -- that is what going round a bend means\n- A fluid can only push with a **pressure difference**, so the surface **tilts**: higher outside, lower inside\n- **Δh = v² w / (g R)**, rearranging to **v = √(g R Δh / w)** if you have measured the tilt\n- A 30 m river on a 100 m bend at 1.2 m/s tilts by just **4.4 cm** -- invisible, and it drives everything\n- **Δh goes as v²**: double the speed and the tilt quadruples, which is why floods reshape bends\n- **One surface, many speeds.** Friction at the bed means the top runs faster than the bottom, and a single tilt is set by the average\n- So the tilt is **too little** for the surface water, which drifts outward, and **too much** for the bed water, which is pushed inward\n- The result is a **corkscrew** spiralling downstream: out at the top, down the outer bank, in along the bed\n- **Bedload rolls along the bed**, so sand and gravel travel inward and build the point bar -- which is the half P18's analogy could not explain\n- Remove the **velocity gradient** and the spiral goes: a smooth lined bend stops building its inner bank\n- Removed: P18's \"the outer bank gets the fast water, like a car on a turn\"\n- Still standing: this assumes an **existing** bend of fixed radius and steady flow. It explains why a bend deepens and migrates. It does not explain how the **first** bend appears in a straight channel",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Four centimetres of tilt, moving a valley!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Rivers Shape the Land?**\n\nLevel 2 measured the river. Level 3 asks why Level 1's rule was true -- and needs no new machinery to answer, only circular motion and a force balance.\n\n**Summary Table:**\n| Step | The Physics | The Number |\n| --- | --- | --- |\n| A curve demands | inward acceleration **v²/R** | 0.0144 m/s² at 1.2 m/s, R = 100 m |\n| A fluid supplies it by | **tilting** its surface | slope v²/(gR), about 1 in 680 |\n| Across the channel | **Δh = v² w / (g R)** | **4.4 cm** across 30 m |\n| Rearranged | v = √(g R Δh / w) | a measured tilt gives the speed |\n| Sensitivity | Δh goes as **v²** | double the speed, quadruple the tilt |\n| But the water | is **faster at the surface** than the bed | 1.5 m/s against 0.6 m/s |\n| One tilt, two needs | too little on top, too much below | 0.0225 against 0.0036 m/s² |\n| So the flow | **corkscrews**: out on top, in along the bed | the conveyor P18 lacked |\n| And bedload | rolls **along the bed**, so it goes inward | the point bar, explained |\n| Not explained | how the **first** bend starts | Still standing |\n\n**The one line to remember:** a river leans four centimetres into its own turn, and because that lean is set by the average speed while the water is faster on top than below, it pushes the bed inward and builds the inside of every bend on Earth.\n\n**Up next:** C18 and L2C18 had a river's dissolved concentration set by its rock. Then why does flood water, ten times the flow, come out barely more dilute?"
        }
    };
}
