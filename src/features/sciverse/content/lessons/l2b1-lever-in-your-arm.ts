import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B1 "Muscles & Bones".
 *
 * Level 1 established that muscles pull on bones. This lesson introduces the
 * moment -- force x distance from the pivot -- and the result that the bicep
 * works at a large mechanical disadvantage. It closes Big Idea 1 at Level 2 by
 * putting P1's forces and C1's energy into one working machine.
 */
export function getL2B1Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In Level 1 you learned that muscles pull on bones to move you. Now let us find out **how hard** they are actually pulling. The answer is genuinely surprising.\n\nHold your arm out, bent at the elbow, with a **5 kilogram** weight in your hand. On Earth that weight pulls down with a force of about **50 newtons**.\n\nTwo distances matter here, and both are measured from your **elbow**, because the elbow is the **pivot** -- the point everything turns around.\n\nYour hand is about **32 cm** from your elbow.\nYour **bicep** does not attach at your hand. It attaches to your forearm bone only about **4 cm** from the elbow.\n\nHow hard is your bicep pulling?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "About 400 N -- eight times the weight -- because the muscle works from only 4 cm out while the weight acts from 32 cm out.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "About 50 N, the same as the weight. The muscle has to match what it is holding up, otherwise the arm would move.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is true that nothing is moving, so something must be balanced. But what balances on a **lever** is not the forces -- it is their **turning effects**.\n\nYou already know this from a see-saw. A small child sitting far from the middle can balance a much heavier adult sitting close to it. The forces are wildly unequal. What matches is force **combined with distance from the pivot**.\n\nThat combination is called the **moment** of a force:\n\n**moment = force x distance from the pivot**\n\nAnd a lever balances when the moments on each side are equal.\n\nNow look at your arm again. The weight is a long way out -- **32 cm**. Your bicep is attached absurdly close in -- **4 cm**. For their moments to match, the muscle has to make up for its terrible position with sheer force:\n\nmuscle force x 4 = 50 x 32\nmuscle force x 4 = 1,600\nmuscle force = 1,600 / 4 = **400 N**\n\nYour bicep is pulling with **eight times** the weight you are holding. It does that every time you pick anything up.",
            options: [
                { id: 'cont', label: "So distance from the pivot counts as much as the force?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly. And rearranged, the rule for any lever like this is:\n\n**muscle force = load x load distance / muscle distance**\n\nRead where each quantity sits, the way you did in L2P1.\n\n**The load is on top.** Twice the weight, twice the muscle force. A **direct proportion**.\n**The load's distance is on top too.** Hold it twice as far out, and your muscle works twice as hard -- even though the weight has not changed at all.\n**The muscle's distance is underneath.** The closer the muscle attaches to the elbow, the harder it must pull. An **inverse proportion**.\n\nThat last one sounds like bad design, and in pure force terms it is. Your arm is a **third-class lever**, which always multiplies force *against* you. Engineers call that **mechanical disadvantage**, and yours is about **8 to 1**.\n\nSo why are we built this way? Because the trade runs both directions. The muscle pulls 8 times harder -- but it only has to **shorten by 4 cm to swing your hand through 32 cm**. You buy speed and reach with force. A bicep that gave you an easy 1-to-1 lift would have to be over a foot longer in its travel, and your hand would move at a crawl.\n\nThrowing, catching and reaching are worth far more than lifting comfort. Your arm is built for range, and pays for it in force.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Same arm: the bicep attaches **4 cm** from the elbow, and the hand is **32 cm** from the elbow.\n\nThis time the load in the hand is **20 N**.\n\nHow hard does the bicep pull?",
            options: [
                { id: 'right', label: "160 N. The moments must match, so muscle force = 20 x 32 / 4 = 160.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'same', label: "20 N, the same as the load it is holding up.", nextNodeId: 'math_wrong' },
                { id: 'no_divide', label: "640 N, because 20 x 32 = 640.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two different slips.\n\n**Answering 20 N** matches the forces instead of the **moments**. On a lever those are not the same thing -- that is exactly why a see-saw can balance a child against an adult.\n\n**Answering 640 N** works out the load's moment correctly and then stops. 20 x 32 = 640 is a moment, in newton-centimetres, not a force. To turn it back into a force you have to divide by the distance the muscle acts at.\n\nCheck the units and the slip shows up on its own: newtons multiplied by centimetres cannot be an answer in newtons. Dividing by the 4 cm cancels the centimetres and leaves newtons.\n\nmuscle force = 20 x 32 / 4 = 640 / 4 = **160 N**\n\nAnd a sense check: 160 N is 8 times the 20 N load, which is the same **8 to 1** ratio as before. It has to be -- the ratio comes from the two distances, 32 and 4, and those did not change when the weight did.",
            options: [
                { id: 'retry', label: "Work out the moment, then divide by the muscle's distance.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Load** is the weight in the hand, in newtons.\n**Hand Distance** is how far the hand is from the elbow, in centimetres. Bending your elbow to bring the weight closer to your body is exactly this dial.\n\nThe bicep's attachment stays at **4 cm**, because you cannot change your own skeleton.\n\nBoth dials sit on top of the fraction, so both are **direct proportions** -- and that is the surprise. Doubling the weight and doubling the distance do **exactly the same thing** to your muscle.\n\nTry it. A 40 N weight held at 16 cm, and a 20 N weight held at 32 cm, both need the same 160 N from your bicep. Your muscle cannot tell the two situations apart, because it only ever feels the **moment**.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Weight and distance do the same job. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Carry a heavy bag of shopping with your arm straight out in front of you and you will last a few seconds. Hold the same bag tucked in against your chest and you can walk home with it.\n\nThe bag has not got any lighter.\n\nWhat has changed?",
            options: [
                { id: 'right', label: "The bag's distance from the pivot. Distance is on top of the fraction, so holding it further out multiplies the moment and the muscle force with it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Objects effectively weigh more the further they are from your body, so the bag really is heavier at arm's length.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is worth being exact about, because it feels completely true and it is not.\n\nPut the bag on a scale at arm's length and then against your chest. **Same reading.** Its mass has not changed, and gravity pulls on it with the same force wherever you hold it. Nothing about the bag is different.\n\nWhat changed is **your** side of the sum.\n\nAt 40 cm: muscle force = load x 40 / 4 = **10 times** the load.\nAt 10 cm: muscle force = load x 10 / 4 = **2.5 times** the load.\n\nSame bag, and your bicep is doing four times less work holding it close. The bag did not get lighter -- **you stopped giving it such a long lever to work with**.\n\nThis is why every safe-lifting instruction says to keep the load close to your body, and why carrying a child on your hip is so much easier than at arm's length. You are not making them lighter. You are shortening their distance from your pivot.",
            options: [
                { id: 'retry', label: "The bag is the same -- the distance was doing it.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A force's effect on a lever depends on where it acts, not just how big it is.**\n\nAnd that completes Big Idea 1 at Level 2. Three lessons, three arithmetic shapes, one moving body.\n\n- **L2P1 -- a division.** **a = F / m.** Net force on top, mass underneath. What makes something speed up.\n- **L2C1 -- a product.** **Q = m x c x dT.** Three factors multiplied. What energy costs.\n- **L2B1 -- a balance.** **force x distance = force x distance.** Two moments matching. How a body turns force into movement.\n\nPut them together and you have a working machine. Your muscle produces a **force** (P1). That force costs **energy**, which your body releases from food (C1). And the **lever** of your skeleton decides how much force you need in the first place (B1).\n\nIt also explains why holding something still is tiring at all. Nothing moves, so no work is being done in the physics sense -- yet your bicep is holding 400 N and burning energy the whole time, because muscle fibres cost energy just to stay tense.\n\n**Your skeleton is a set of levers, and every one of them trades force for reach.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Force times distance, on both sides!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You worked out what your own muscles are doing.**\n\n- The **pivot** is the point a lever turns around -- for your arm, the elbow\n- **moment = force x distance from the pivot**\n- A lever balances when the **moments** match, not the forces\n- **muscle force = load x load distance / muscle distance**\n- Load and its distance are **on top**; both are direct proportions\n- The muscle's distance is **underneath**; it is an inverse proportion\n- Your bicep attaches about **4 cm** out while your hand is about **32 cm** out\n- So it pulls with about **8 times** the weight you are holding\n- That is **mechanical disadvantage**, and you get **speed and reach** in exchange\n- Holding a load close does not make it lighter -- it shortens its lever\n\n**Big Idea 1 at Level 2: a division, a product, and a balance.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Moments match, so the muscle pulls eight times harder!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- The Lever in Your Arm!**\n\nLevel 1 said muscles pull on bones. The arithmetic says **how hard**, and the answer is about eight times harder than you would guess.\n\n**Summary Table:**\n| Lesson | The Maths | What It Gave You |\n| --- | --- | --- |\n| **L2P1** Force, Mass, Acceleration | **a = F / m** | Net force first, then divide |\n| **L2C1** How Much Heat | **Q = m x c x dT** | Three factors, all multiplied |\n| **L2B1** The Lever in Your Arm | **force x distance, both sides** | Moments balance, not forces |\n\n**Putting Big Idea 1 together:** your muscle makes a **force**, that force costs **energy**, and your skeleton's **levers** decide how much force is needed at all.\n\n**The one line to remember:** a force's turning effect depends on how far it acts from the pivot -- which is why a bag at arm's length beats you and the same bag against your chest does not.\n\n**Big Idea 1 is now complete at Level 2.**"
        }
    };
}
