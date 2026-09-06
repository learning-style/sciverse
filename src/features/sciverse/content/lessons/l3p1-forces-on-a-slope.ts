import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 1, physics.
 *
 * L2P1 treated forces as numbers on a line: add the ones pointing the same way,
 * subtract the ones pointing back. That works only because everything in it was
 * horizontal. This lesson breaks that assumption by tilting the surface, which
 * forces vectors, components and a derivation.
 *
 * Two payoffs are worth the trouble. The mass cancels, so acceleration on a
 * slope does not depend on how heavy the object is. And setting a = 0 gives
 * tan(theta) = mu, which turns the angle at which something starts to slide
 * into a measurement of friction.
 */
export function getL3P1Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "At Level 2 you learned to find the **net force** by adding what pushes forward and subtracting what pushes back. Everything in that lesson sat on flat ground, and that was not an accident -- it is the only situation where treating forces as plain numbers works.\n\nTilt the ground and the method breaks.\n\nA **20 kg** box rests on a ramp tilted at **30°** to the horizontal. Its **weight** is the force gravity exerts on it: **W = mg = 20 x 9.8 = 196 N**, and that force points **straight down**.\n\nBut the box cannot move straight down. The ramp is in the way. It can only slide **along the slope**.\n\nSo how much of that 196 N actually drives it down the ramp?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Less than all of it. Only the part of the weight that points along the slope can drive it, and the rest presses into the ramp.", nextNodeId: 'components', sentiment: 'positive' },
                { id: 'bad', label: "All 196 N. Gravity pulls with the object's full weight no matter what surface it is resting on.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Gravity does pull with the full 196 N -- that part is right. What is wrong is assuming all of it is available to **accelerate the box along the ramp**.\n\nTest it against a case you already know. Lay the ramp flat, at 0°. The weight is still 196 N, still pulling straight down. Does the box shoot across the floor?\n\nNo. It sits there. All 196 N is pressing into the floor and none of it is driving the box sideways.\n\nNow stand the ramp vertical, at 90°. The box falls freely, and the entire 196 N accelerates it.\n\nSo the driving force is **0 N at 0°** and **196 N at 90°**. It clearly depends on the angle, and somewhere between those two extremes it must pass through every value in between.\n\nWhat you need is a way to split a force into the part that acts along the direction of motion and the part that does not.",
            options: [
                { id: 'cont', label: "How do I split a force like that?", nextNodeId: 'components' }
            ]
        },
        components: {
            id: 'components',
            speaker: 'AI',
            content: "A force is a **vector** -- it has a size and a direction, and the direction is not decoration.\n\nAny vector can be replaced by two forces at right angles to each other that would have exactly the same effect. These are its **components**, and you are free to choose the two directions. Choose them to make the problem easy.\n\nOn a ramp the useful pair is **along the slope** and **perpendicular to the slope**.\n\nDrop a perpendicular from the tip of the weight vector onto the slope direction and you get a right-angled triangle. The weight **mg** is the hypotenuse, and the angle at the top of that triangle is the same **θ** as the ramp's tilt.\n\nStandard trigonometry then gives both components:\n\n- **Along the slope:** **mg sin θ** -- this is what drives the box downhill\n- **Perpendicular to the slope:** **mg cos θ** -- this presses the box into the ramp\n\nFor the 20 kg box at 30°:\n\n- Along: 196 x sin 30° = 196 x 0.500 = **98.0 N**\n- Perpendicular: 196 x cos 30° = 196 x 0.866 = **169.7 N**\n\nCheck it against the two extremes. At 0°, sin 0° = 0, so nothing drives it. At 90°, sin 90° = 1, so the whole 196 N does. Both match what you already knew.",
            options: [
                { id: 'cont', label: "Now bring friction back in.", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Here is where Level 2 quietly misled you.\n\nIn L2P1 friction was **a number** -- 20 N, say, fixed. That was a simplification, and on a slope it falls apart.\n\nFriction is produced by two surfaces being pressed together, so it depends on **how hard they are pressed**. That pressing force is the **normal force N** -- normal meaning perpendicular to the surface.\n\nNothing accelerates into or out of the ramp, so the perpendicular forces must balance:\n\n**N = mg cos θ**\n\nAnd friction is proportional to it:\n\n**f = μN = μ mg cos θ**\n\nThe **μ** (mu) is the **coefficient of friction**, a number describing how rough the pair of surfaces is. Roughly 0.05 for a ski on snow, 0.6 for rubber on dry concrete. It has **no units** -- it is a force divided by a force.\n\nNow assemble the net force along the slope, driving minus resisting:\n\n**F = mg sin θ − μ mg cos θ**\n\nAnd divide by m, exactly as L2P1 taught:\n\n**a = F/m = g(sin θ − μ cos θ)**\n\n**Look at what happened to the mass.** It was in every term, so it cancelled completely. **Acceleration down a slope does not depend on how heavy the object is.** A loaded lorry and a marble, on the same slope with the same surfaces, accelerate identically.\n\nThat is not obvious, and you could not have guessed it. It fell out of the algebra.",
            options: [
                { id: 'try', label: "Let me work one through.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A crate is on a ramp tilted at **25°**. The coefficient of friction between crate and ramp is **μ = 0.20**. Take **g = 9.8 m/s²**.\n\nsin 25° = 0.423 and cos 25° = 0.906.\n\nWhat is its acceleration down the slope?",
            options: [
                { id: 'right', label: "About 2.4 m/s². a = 9.8 x (0.423 − 0.20 x 0.906) = 9.8 x 0.242 = 2.37 m/s².", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_friction', label: "About 4.1 m/s², because a = g sin θ = 9.8 x 0.423.", nextNodeId: 'math_wrong' },
                { id: 'needs_mass', label: "It cannot be worked out -- the mass of the crate is missing.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two different things to untangle.\n\n**4.1 m/s²** is the answer with friction left out. It is exactly **g sin θ**, the driving term on its own. That would be right on a frictionless ramp, but μ = 0.20 was given, so the resisting term **μ g cos θ = 0.20 x 9.8 x 0.906 = 1.78 m/s²** has to come off. 4.15 − 1.78 = **2.37 m/s²**.\n\n**\"The mass is missing\"** is the more interesting answer, because it is the reasonable instinct and it is wrong for a reason worth understanding. The mass genuinely is absent from the question -- and it is not needed, because it cancelled:\n\na = (mg sin θ − μ mg cos θ) / m\n\nEvery term on top carries an **m**, so dividing by m removes it everywhere. Nothing about the object's mass survives into the answer.\n\nThis is worth more than the arithmetic. **When a quantity cancels out of a derivation, that is a physical result, not a tidiness.** It is telling you that acceleration on a slope is genuinely independent of mass -- which is why Galileo's rolling-ball experiments worked with balls of different weights, and why the same ramp calculation applies to a lorry and a marble.",
            options: [
                { id: 'retry', label: "The mass cancels -- that is the result, not an omission.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, and they pull in different directions.\n\n**Slope Angle** is θ. Raising it increases the driving term **g sin θ**, and at the same time **decreases** the resisting term, because **cos θ** shrinks as θ grows and friction is proportional to cos θ.\n\nSo tilting a ramp helps twice over: more push, less grip. That is why a slope that holds a load firmly at 15° can let go alarmingly at 25°.\n\n**Friction Coefficient** is μ. It only scales the resisting term.\n\nWatch the point where the acceleration crosses **zero**. Below that angle the box sits still. Above it, the box goes. Find where that happens for a given μ before the checkpoint asks you about it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "I have found the crossing point. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Here is a real laboratory method.\n\nPut an object on a flat board and tilt the board slowly, raising one end. At some angle the object suddenly begins to slide. That angle is called the **angle of repose**, and for one particular pair of surfaces it measures **22°**.\n\nFrom that one measurement alone, what is **μ** for those two surfaces?",
            options: [
                { id: 'right', label: "μ = tan 22° = 0.40. At the instant it starts to slide a = 0, so g sin θ = μ g cos θ, and dividing through gives μ = tan θ.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It cannot be found from the angle alone -- you would need to know the object's mass and measure the friction force directly.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "You need neither. Watch what the algebra does.\n\nThe instant before it slides, the object is still stationary, so its acceleration is **zero**. Put that into the equation you derived:\n\n0 = g(sin θ − μ cos θ)\n\n**g** is not zero, so the bracket must be:\n\nsin θ − μ cos θ = 0\nsin θ = μ cos θ\n\nDivide both sides by cos θ:\n\n**μ = sin θ / cos θ = tan θ**\n\nSo μ = tan 22° = **0.40**.\n\nNo mass. No force meter. No knowledge of the object at all. **A protractor is enough**, because g cancelled as well as m.\n\nThis is the payoff of deriving a result instead of being handed one. The formula a = g(sin θ − μ cos θ) does not just predict acceleration -- rearranged at the special case a = 0, it becomes a **measuring instrument**, and it is genuinely how coefficients of friction are found in a school laboratory.\n\nIt also explains a pile of sand. Pour any dry granular material and it forms a cone whose sides sit at exactly this angle. Add more and the cone gets wider, never steeper -- because grains above the angle of repose simply slide.",
            options: [
                { id: 'retry', label: "Set a = 0 and the whole thing collapses to μ = tan θ.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **μ = tan θ at the angle of repose.**\n\nStand back and look at what changed between the levels.\n\n**Level 1** said a push makes things move and friction slows them down.\n**Level 2** made that quantitative in one dimension: net force is a sum, and a = F/m.\n**Level 3** breaks the hidden assumption in Level 2 -- that everything lies on one line -- and the machinery needed to fix it is vectors and components.\n\nNotice the shape of that progression, because it repeats. **Each level does not add facts on top of the last one. It removes a simplification the last one depended on.**\n\nLevel 2 also told you friction was a number. It is not; it is μN, and N changes with geometry. That single correction is what makes a slope behave the way it does, and it is what let you measure μ with a protractor.\n\nOne more simplification is still standing, and it is worth knowing it is there. **μ is not really constant either.** The value that holds an object still (static friction) is slightly larger than the one that acts once it is moving (kinetic friction), which is why an object slides suddenly rather than gradually at the angle of repose. Beyond that, μ drifts with speed, temperature and how clean the surfaces are.\n\nEvery level of this subject is a better approximation, not a final answer.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Each level removes a simplification!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You resolved forces into components.**\n\n- A force is a **vector**; only the component along the motion drives it\n- Choose component directions to suit the problem -- on a ramp, along and perpendicular\n- **Along the slope: mg sin θ.** **Perpendicular: mg cos θ**\n- The **normal force** balances the perpendicular component: **N = mg cos θ**\n- Friction is **f = μN**, not a fixed number, so it changes with the angle\n- **μ** is the **coefficient of friction**, and it has **no units**\n- **a = g(sin θ − μ cos θ)** -- and the **mass cancels**\n- A quantity cancelling is a **physical result**, not a tidiness\n- Steepening a slope raises the driving term and lowers the resisting one\n- At the **angle of repose**, a = 0 and the formula becomes **μ = tan θ**\n- That turns a protractor into a friction meter, and explains why sand piles have a fixed slope\n- **μ is itself an approximation**: static exceeds kinetic, and both drift\n\nNext in C1: the energy that a thermometer cannot see.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "a = g(sin θ − μ cos θ), and the mass cancels!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Forces on a Slope!**\n\nLevel 2 gave you a = F/m on a line. Level 3 tilts the line, and the repair needs vectors.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Forces are vectors | split into components | Only the along-slope part drives |\n| The two components | **mg sin θ**, **mg cos θ** | Driving, and pressing in |\n| Normal force | **N = mg cos θ** | Perpendicular forces balance |\n| Friction is not fixed | **f = μN** | It shrinks as the slope steepens |\n| The derivation | **a = g(sin θ − μ cos θ)** | Mass cancels out entirely |\n| Cancelling means something | lorry = marble | A result, not a simplification |\n| Set a = 0 | **μ = tan θ** | A protractor measures friction |\n| Still approximate | static ≠ kinetic | μ drifts too |\n\n**The one line to remember:** resolve the weight into a part along the slope and a part pressing in, and everything else follows -- including the fact that mass makes no difference at all.\n\n**Up next:** C1 -- the energy that pours into ice at 0 °C and moves no thermometer."
        }
    };
}
