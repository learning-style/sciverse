import { DialogNode } from '../../types';

export function getP37Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Solar panels make the most electricity at **noon**. But people use the most electricity at **7 in the evening**, when everyone gets home, turns on lights, and cooks dinner.\n\nThe Sun does not care about our schedule. So we have to **store** energy from noon and spend it at night.\n\nHow do you think you could store electricity without a battery?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'lift', label: "Use the spare electricity to lift something heavy, then let it fall later to make electricity again.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'wires', label: "Just leave the electricity sitting in the wires until someone needs it.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Electricity is one of the few things that genuinely **cannot wait around**. It is moving energy -- the instant it stops moving, it is gone.\n\nSo to save it, you have to **convert it into something that can sit still**. And the oldest trick is height.\n\nUse the spare noon electricity to pump water **uphill** into a high lake. The energy is now stored as **gravitational potential energy** -- energy of position. At 7pm, open a valve, let the water rush down through a turbine, and you get electricity back. This is called **pumped hydro**, and it stores more of the world's energy than every battery on Earth combined.",
            options: [
                { id: 'cont', label: "So you turn electricity into height, then back again?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! **Storing energy always means changing its form.** Here are the main ways:\n\n1. **Pumped hydro** -- pump water uphill, release it down through a turbine (**potential energy**)\n2. **Flywheel** -- spin a heavy wheel very fast, slow it down to draw power back (**kinetic energy**)\n3. **Spring** -- squeeze or wind it, like in a clockwork toy (**elastic energy**)\n4. **Battery** -- store it as chemistry, which you will explore in C37\n\nBut there is a catch you cannot escape: **every conversion loses some energy as heat**. Pumped hydro returns about **80%** of what you put in. The missing 20% warmed up the pipes and the pumps.\n\nSlide **Lift Height** and watch how much energy gets stored -- and how much comes back!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me store some energy and get it back!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** An engineer builds a pumped hydro station. She can either pump water into a lake **50 metres** up, or into an identical lake **200 metres** up.\n\nWhich stores more energy, and why?",
            options: [
                { id: 'right', label: "The 200 metre lake -- the same water stores four times the energy because it is four times higher.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The same -- it is the same amount of water, so it must hold the same amount of energy.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The amount of water is only half the story -- **height is the other half**!\n\nStored energy depends on **weight multiplied by height**. Lift the same water twice as high and you have stored twice the energy. Lift it four times as high and you store four times as much.\n\nYou can feel this yourself. Drop a ball from your knee and it barely bounces. Drop the identical ball from a second-floor window and it slams. Same ball, more height, far more energy.\n\nThis is why pumped hydro stations are built in **mountains**. Height is free storage capacity.",
            options: [
                { id: 'retry', label: "Oh -- higher means much more stored energy!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Stored energy = weight x height**, so mountains make excellent batteries.\n\nWhat matters when choosing a storage method:\n- **How much** energy it holds\n- **How fast** you can get it back out\n- **How much** you lose in the round trip (never zero!)\n- **How long** it lasts before leaking away\n\nPumped hydro is enormous but needs a mountain and a lake. **Flywheels** release energy in seconds but empty quickly. Each tool fits a different job.\n\nFor something you can carry in your pocket, you need chemistry. That is C37!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Weight times height equals stored energy!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how to store energy without a battery!**\n\n- Electricity cannot sit still -- it must be **converted** to be stored\n- **Pumped hydro** stores energy as height (**potential energy**)\n- **Flywheels** store it as spin (**kinetic energy**); **springs** store it as stretch\n- Stored energy = **weight x height**, so height matters enormously\n- Every conversion loses energy as **heat** -- about 20% round trip for pumped hydro\n- Different methods trade off size, speed, and how long they hold\n\nNext in C37: storing energy as chemistry, small enough for your pocket!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Store energy by changing its form!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P37 Complete -- Save It for Later!**\n\nEnergy has to be converted into something that can sit still until you need it.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Electricity cannot wait | It must be **converted** | Storage always changes form |\n| Water uphill stores energy | **Pumped hydro**, potential energy | World's biggest storage |\n| Height multiplies energy | Weight x height | Mountains make great batteries |\n| Round trips lose energy | About 20% escapes as heat | Nothing is 100% efficient |\n\n**Up next:** C37 (Inside a Battery) -- storing energy as chemistry!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
