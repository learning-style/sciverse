import { DialogNode } from '../../types';

export function getP50Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Two satellites are circling above you right now, doing completely different jobs -- and both of them **help life on Earth** in ways you will see by the end of this Big Idea.\n\nThe weather satellite watches the same storm all day long without ever losing sight of it.\n\nThe mapping satellite takes pictures sharp enough to pick out cars in a car park -- but it only passes over your town once every few days.\n\nWhy can one satellite not simply do both?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "One of them is far closer to us than the other, and being close gives sharper pictures but means you go rushing past.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The mapping satellite just has a much better camera, and the weather one was built with a cheaper camera.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Cameras do matter. But swap the cameras over and you would still have the same problem, because the real difference is **how high up each satellite is**.\n\nTwo things change when a satellite flies lower.\n\n**It sees more detail.** Exactly like holding a photograph close to your face instead of across the room.\n\n**It has to move faster.** This is the surprising one. The closer in you are, the faster you must whizz round to keep from falling. A satellite 400 kilometres up races round the whole Earth in about **90 minutes**. It crosses your entire country in a couple of minutes and is gone.\n\nAnd now the clever bit. Go far enough out -- about **36,000 kilometres** -- and a satellite takes a full day to go round once. The Earth also takes a day to spin round once. They keep perfect pace with each other, so the satellite hangs above the same spot on the ground and never drifts away from it.",
            options: [
                { id: 'cont', label: "So how high it flies changes everything?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Height gives you two very different kinds of satellite.\n\n**Low, about 400 kilometres up:** wonderfully sharp pictures, because it is close. But it whizzes past in minutes, sees only a narrow strip of ground, and may not come back over your town for days.\n\n**High, about 36,000 kilometres up:** it hangs over one place all day and can see a whole face of the Earth at once. But everything is enormously far away, so the picture is coarse.\n\nThis is what people call a **trade-off**. A trade-off means you cannot have both good things at once -- getting more of one always costs you some of the other. More detail costs you staying put. Staying put costs you detail.\n\nThere is no cleverness that escapes it, so instead we build different satellites for different jobs. Watching storms? Go high. Mapping a forest? Go low.\n\nIn the picture, a satellite circles the Earth and you can see the patch of ground it watches.\n\nSlide **Orbit Height** and watch the trade-off happen!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me change how high it flies!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A huge wildfire has broken out. Two things need to be known.\n\nFirst: where the smoke is drifting, hour by hour, so people know when to leave.\n\nSecond: exactly which buildings have burned.\n\nHow many satellites does this job need?",
            options: [
                { id: 'right', label: "Two -- a high one that never looks away, to follow the smoke all day, and a low one to come over and take the sharp pictures of the buildings.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "One low satellite would do, because low satellites take the sharpest pictures and sharper is always the better choice.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Sharper is not always better, and a wildfire shows why beautifully.\n\nYour low satellite comes over the fire and takes a magnificent picture. Then it is gone -- over the horizon in about two minutes. It may not pass this way again for **two days**.\n\nMeanwhile the smoke is drifting over a new town every hour, and nobody can see it. The picture you took at breakfast tells you nothing about where the smoke is at lunchtime.\n\nFor that job you need something that **never looks away**, and only a high satellite can do that. It will not show you individual buildings, but it does not need to. It needs to show you the smoke, all day, without blinking.\n\n**Detail and staying put pull against each other.** When a job needs both, you need two satellites, not a cleverer one.",
            options: [
                { id: 'retry', label: "Oh -- the sharp picture is useless if it only comes twice a week!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **How high a satellite flies decides what it is good for.**\n\n- **Low** means sharp pictures, but it whizzes past and rarely returns\n- **High** means it hangs over one spot all day, but the picture is coarse\n- At about 36,000 kilometres a satellite keeps pace with the spinning Earth\n- This is a **trade-off** -- more of one costs you some of the other\n- Different jobs need different satellites\n\nSo you have chosen where to put your satellite. Now it has to survive up there, with nobody to mend it, for twenty years.\n\nThere is no rain in space and no rust. So what actually wears a satellite out? That is C50!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Detail and staying put pull against each other!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered why satellites fly where they do!**\n\n- The closer a satellite is, the **sharper** the picture\n- The closer it is, the **faster** it must move to stay up\n- Low satellites circle the Earth in about **90 minutes**\n- At **36,000 kilometres** one lap takes a whole day\n- The Earth also spins once a day, so a high satellite hangs over one spot\n- High satellites see a whole face of the Earth, but coarsely\n- This is a **trade-off**: more detail costs you staying put\n\nNext in C50: how a machine survives twenty years in space with nobody to fix it!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Low for detail, high for never looking away!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P50 Complete -- Eyes in the Sky!**\n\nWhere you put a satellite decides what it can do, and no satellite can do everything.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Closer means sharper | Like holding a photo near your face | Low satellites map in fine detail |\n| Closer means faster | About 90 minutes for one lap | It whizzes past and may not return for days |\n| 36,000 km takes a day | The Earth spins in a day too | The satellite hangs over one spot |\n| You cannot have both | This is a **trade-off** | Different jobs need different satellites |\n\n**Up next:** C50 (Built for Space) -- surviving twenty years with nobody to fix you!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
