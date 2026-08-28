import { DialogNode } from '../../types';

export function getP43Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Jump off a chair onto concrete and it hurts. Jump the same height onto a thick crash mat and you barely feel it.\n\nYou fell the same distance and you were moving at the same speed when you landed. So why does one hurt and the other does not?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The mat takes longer to stop you, and a slower stop means a much smaller force on your body.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The mat is softer, so you must be landing more gently and hitting it at a lower speed.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "You hit the mat at exactly the same speed -- gravity does not care what is underneath you!\n\nWhat changes is **how long the stop takes**. On concrete you go from full speed to nothing in about **2 milliseconds**. On a crash mat, the foam squashes and stretches that stop out to around **200 milliseconds**.\n\nSame speed, same body, but **100 times longer** to stop. And a longer stop means a far gentler force.\n\nThis is exactly **P42 Follow Through** turned around. There you wanted a **long** contact time to make a ball go faster. Here you want a **long** stopping time to make a landing safer.",
            options: [
                { id: 'cont', label: "So the mat changes the stopping time, not the speed?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! The rule works in both directions:\n\n1. To make something **go fast**, push it for a **long** time (that was P42)\n2. To **stop** something gently, take a **long** time to do it\n\nEvery safety design you have ever seen uses this. They all add **stopping distance** so the stop takes longer.\n\nFirst, one word you will need. To **crumple** something means to squash it and fold it up -- exactly what you do to a sheet of paper when you scrunch it into a ball.\n\nSo the **crumple distance** is simply **how far something squashes while it is stopping you**. A bigger crumple distance means a longer, gentler stop.\n\n- A car **crumple zone** folds up over about half a metre\n- A bike **helmet** squashes down a few centimetres\n- A **crash mat** squashes under a gymnast\n- **Airbags** puff up so your head slows over a longer distance\n\nIn the picture you will see the **crumple distance** measured in **centimetres**, and a **force bar** showing how hard the landing hits.\n\nSlide **Crumple Distance** and watch the force drop!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me see how crumple distance changes the force!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Car designers deliberately build the front of a car so it **folds up** in a crash, instead of making it as stiff and strong as possible.\n\nWhy would anyone design a car to break?",
            options: [
                { id: 'right', label: "Folding makes the stop last longer, so the people inside feel a much smaller force.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "A folding car is cheaper to build than a really strong one.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Cost is not the reason -- crumple zones are carefully engineered and add expense.\n\nPicture a car built to be completely rigid. In a crash it stops almost instantly, and everyone inside stops just as instantly. That very short stopping time means an enormous force on the people.\n\nA **crumple zone** does the opposite. The metal folds in a controlled way over about half a metre, stretching the stop out over more time. The car is wrecked, but the people inside experience a far smaller force.\n\nThe car is designed to be **sacrificed** so the passengers are not. Rigid is not the same as safe.",
            options: [
                { id: 'retry', label: "Oh -- the car breaks on purpose to protect the people!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Safety design is about adding stopping distance, not adding stiffness.**\n\n- **Crumple zones** fold so the car stops slowly\n- **Helmets** squash so your skull stops slowly\n- **Crash mats** and **airbags** do the same job\n- The protective part is meant to be **destroyed**\n\nOne warning, though: this only works if the material squashes **and stays squashed** for the whole stop. A material that bounces back instantly gives you no extra time at all.\n\nWhich raises the real question: what should a helmet actually be made of? That is C43!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Add stopping distance, not stiffness!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how safety design works!**\n\n- You hit the ground at the **same speed** whatever is underneath\n- What changes is **how long the stop takes**\n- A **longer stop** means a **smaller force**\n- Concrete stops you in about 2 milliseconds; a mat takes about 200\n- **Crumple zones**, **helmets**, **crash mats** and **airbags** all add stopping distance\n- The protective part is meant to be destroyed\n\nNext in C43: what material can squash once and save your head!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Longer stops mean gentler forces!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P43 Complete -- Softening the Blow!**\n\nSafety is not about being strong enough to resist. It is about taking longer to stop.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Landing speed is the same | The mat does not slow your fall | Gravity is unchanged |\n| A longer stop is gentler | Stopping time sets the force | The whole of safety design |\n| Crumple zones fold on purpose | Sacrifice the car, save the people | Rigid is not safe |\n| Helmets and airbags do the same | Add **stopping distance** | Millimetres matter |\n\n**Up next:** C43 (Materials That Protect) -- what a helmet is really made of!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
