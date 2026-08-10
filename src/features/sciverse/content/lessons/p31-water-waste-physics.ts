import { DialogNode } from '../../types';

export function getP31Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Turn on a faucet and clean water flows out. Flush a toilet and the waste disappears. But where does the water come from, and where does the waste go?\n\nWhat do you think makes water flow through the pipes in your house?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'gravity', label: "Gravity pulls the water downhill through the pipes -- water towers are high up so water flows down to houses.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'pump', label: "A machine at the water factory pushes water through all the pipes.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Pumps help, but the real hero is **gravity**! Cities build tall **water towers** and fill them with clean water. Since the tower is high up, gravity pulls the water down through pipes to every house, school, and store below.\n\nIt works just like pouring water from a cup -- the higher the cup, the faster the water falls! A water tower is like a giant cup held way above the city.",
            options: [
                { id: 'cont', label: "So the water tower is high up and gravity does the rest?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! City water systems use **gravity** as their engine:\n\n1. Pumps fill a tall **water tower** with clean water\n2. **Gravity** pulls water down from the tower through underground pipes\n3. The higher the tower, the more **pressure** pushes water through the pipes\n4. Water reaches every faucet, shower, and fire hydrant in the city!\n\nAfter you use the water, it flows DOWN again -- through **sewer pipes** that slope downhill to the treatment plant. Gravity moves the waste too!\n\nTry the **Tower Height** slider to see how height changes the water pressure!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'try', label: "Let me see how tower height changes the flow!", nextNodeId: 'experiment' }
            ]
        },
        experiment: {
            id: 'experiment',
            speaker: 'AI',
            content: "Watch the visual! Water flows from the tower down to the houses:\n\n- **Short tower** -- low pressure, weak trickle from the faucets\n- **Tall tower** -- high pressure, strong flow to every house\n- The **pressure meter** shows how hard gravity pushes the water\n\nThis is also why your upstairs shower might have weaker water than the downstairs one -- the water has to climb higher against gravity to reach the top floor!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'experiment' } },
            options: [
                { id: 'cp', label: "Higher tower = more pressure = stronger flow!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** After a big storm, the city loses power and the pumps stop working. The water tower is full. What happens?",
            options: [
                { id: 'right', label: "Water keeps flowing for a while because gravity still pulls it from the tower -- but once the tower empties, it stops.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Water stops immediately because the pumps are off.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Nope -- the tower works like a **battery** for water! The pumps filled the tower when power was on. Now gravity pulls that stored water down through the pipes even without electricity.\n\nBut the tower only holds so much. Once it drains, no more water flows until the pumps restart. That's why water towers are so important -- they keep water flowing during emergencies!",
            options: [
                { id: 'retry', label: "Oh -- the water tower stores water like a battery stores electricity!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! Water towers are **gravity batteries** -- they store water up high so gravity can deliver it even when pumps fail.\n\nThe whole system works because of one simple rule: **water flows downhill**. Cities use this to move both clean water (tower to houses) and waste water (houses to treatment plant). Gravity is free, reliable, and never needs electricity!\n\nIn C31 you'll see how chemistry makes dirty water clean again!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Gravity moves water AND waste -- it's the city's free engine!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how cities move water with gravity!**\n\nCity water systems use simple physics:\n- **Water towers** store clean water up high\n- **Gravity** pulls it down through pipes to every building\n- Higher tower = more **pressure** = stronger flow\n- **Sewer pipes** slope downhill to carry waste away\n- Water towers act as **gravity batteries** during power outages\n\nIn C31 you'll see how chemistry cleans the dirty water before it goes back to the river!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Water flows downhill -- gravity runs the whole system!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P31 Complete -- Downhill Flow!**\n\nGravity moves water through the city -- no engine needed.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Water towers store water high up | Gravity pulls it down | Flow without pumps |\n| Higher tower = more pressure | Water pushes harder | Reaches every building |\n| Sewer pipes slope downhill | Waste flows by gravity too | No pumps needed for waste |\n\n**Up next:** C31 (Clean Water) -- how chemicals clean dirty water!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
