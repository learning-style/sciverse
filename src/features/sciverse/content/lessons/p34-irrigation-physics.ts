import { DialogNode } from '../../types';

export function getP34Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A farmer needs to move water from a well to thousands of thirsty plants. It sounds simple -- but on many farms, **more than half the water never reaches a single root**.\n\nIt evaporates into the air, runs off the surface, or sinks down past the roots and is lost.\n\nWhere do you think most of the wasted water goes?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'evap', label: "Sprayed water turns into vapor in the air and blows away before it ever lands on the soil.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'plants', label: "The plants drink all of it -- if water is missing, the plants just took more than they needed.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Plants are actually careful drinkers -- they only take what they can use. The water goes missing on the *way* to them!\n\nWhen a sprinkler shoots water into the air, it breaks into tiny droplets. Tiny droplets have a huge amount of **surface area** touching warm, dry air, so they **evaporate** fast. On a hot, windy day, up to half the spray can vanish before it lands.\n\nMore water also runs off the surface if you pour it faster than the soil can soak it up. That is called the **infiltration rate**.",
            options: [
                { id: 'cont', label: "So the water is lost before it even reaches the roots?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! **Irrigation** is really a physics problem. Water is lost three ways:\n\n1. **Evaporation** -- droplets in the air turn to vapor and blow away\n2. **Runoff** -- water arrives faster than the soil can absorb it and slides off\n3. **Deep drainage** -- water sinks below the roots where plants cannot reach it\n\nSo farmers changed the delivery method. **Drip irrigation** uses thin tubes that release water **slowly, drop by drop, right at the base of each plant**. No spray, no wind, no runoff. Drip systems can get **90%** of the water to the roots, while sprinklers often manage only 50-60%.\n\nSlide **Water Flow Rate** to find the setting that wastes the least!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me test different flow rates!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Two farmers each use exactly the same amount of water on the same crop. Farmer A waters at **noon** on a hot, breezy day. Farmer B waters **just before sunrise**, when the air is cool and still.\n\nWhose plants get more water?",
            options: [
                { id: 'right', label: "Farmer B -- cool, still air evaporates much less, so far more water actually reaches the soil.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The same -- they used identical amounts of water, so the plants must receive identical amounts.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "They *sent out* the same amount, but the plants do not receive the same amount!\n\nHeat gives water molecules extra energy to escape into the air, and wind sweeps the damp air away so even more can evaporate. Watering at noon in a breeze can lose **30-50%** of the water before it lands.\n\nAt dawn, the air is cool and still, and the soil has hours to soak the water in before the Sun climbs. Same water, same crop -- but Farmer B's plants get far more of it. **When** you water matters as much as **how much**.",
            options: [
                { id: 'retry', label: "Oh -- heat and wind steal the water before it lands!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! Smart irrigation is about **timing, speed, and placement**:\n\n- **Slow** flow beats fast flow -- the soil has time to soak it in\n- **Cool** hours beat hot hours -- less evaporation\n- **At the root** beats overhead spray -- nothing lost to the wind\n\nAbout **70%** of all the fresh water humans use goes to farming. Saving a fraction of it changes how much is left for everything else.\n\nWater alone will not grow a crop, though. In C34 you will find out what else plants need -- and what happens when farmers give them too much of it!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Slow, cool, and close to the roots wins!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered the physics of watering a farm!**\n\n- Water is lost to **evaporation**, **runoff**, and deep drainage\n- Tiny sprayed droplets evaporate fastest -- lots of **surface area**\n- Pouring faster than the **infiltration rate** causes runoff\n- **Drip irrigation** delivers about **90%** of water to roots\n- Watering at dawn beats watering at noon\n- Farming uses about **70%** of humanity's fresh water\n\nNext in C34: the chemistry of plant food -- and why more is not better!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Getting water to the roots is a physics puzzle!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P34 Complete -- Water on the Move!**\n\nGrowing food is mostly a problem of moving water without losing it.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Spray evaporates fast | Small drops, big **surface area** | Half the water can vanish |\n| Fast water runs off | Beat the **infiltration rate** and it slides away | Soil never soaks it up |\n| Drip beats sprinkler | Water goes straight to roots | 90% efficient instead of 55% |\n| Dawn beats noon | Cool, still air evaporates less | Same water, more crop |\n\n**Up next:** C34 (Plant Food Chemistry) -- what plants need besides water, and the danger of too much!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
