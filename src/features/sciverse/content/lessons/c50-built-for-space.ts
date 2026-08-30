import { DialogNode } from '../../types';

export function getC50Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Satellites **help life on Earth** every day. But a satellite is a machine left outside for twenty years, in a place where nobody can ever come and mend it.\n\nBut think about what is **not** up there. No rain. No damp, so no rust. No wind. No one to knock it over.\n\nSo what on Earth wears a satellite out?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Sunlight, and enormous swings between boiling hot and freezing cold every time it passes into the Earth's shadow.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Almost nothing really -- with no air and no weather, space must be the gentlest place a machine could possibly sit.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It sounds gentle. It is one of the harshest places we know.\n\n**The heat swing.** In direct sunlight a satellite's surface reaches about **120 °C** -- hotter than boiling water. Then it slips into the Earth's shadow and drops to about **-100 °C**, far colder than a freezer. A low satellite goes round the Earth roughly **16 times a day**, so it is roasted and frozen sixteen times, every day, for years.\n\nWhy does that damage anything? Because things **grow slightly bigger when hot and shrink when cold**. Do that a few thousand times and joints work loose, paint flakes away and brittle parts crack.\n\n**The sunlight.** Down here our air soaks up the fiercest part of sunlight before it reaches us. In space there is no air to do that, so the full force lands on the satellite. Over years it breaks apart plastics and glues, which turn yellow, then brittle, then crumble.\n\n**The specks.** Tiny grains of dust and chips of old broken satellites fly about at terrific speed, pitting every surface they strike.",
            options: [
                { id: 'cont', label: "So sunlight and the heat swings are the real enemies?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! So satellites are built from materials chosen to survive precisely those things.\n\n**Metals** such as aluminium and titanium. They do not turn brittle in fierce sunlight the way plastics do, and they carry heat away from any spot that is getting too hot.\n\n**Special glass** laid over the solar panels. Ordinary clear plastic would yellow within a couple of years and starve the satellite of light. This glass takes the sunlight without yellowing.\n\n**Shiny gold-coloured blankets.** These are many wafer-thin layers of shiny film with gaps between them. They bounce sunlight away when the satellite is roasting, and hold warmth in when it is freezing. This is why satellites look as though they have been wrapped up in gold foil -- it is not decoration, each **blanket** is the coat that lets a satellite survive the heat swing and go on doing its job.\n\nEven with all of that, a satellite still slowly wears out. Its **solar panels** make a little less power every single year.\n\nSlide **Years in Space** and watch what twenty years does!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me watch the years go by!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A team builds a satellite whose solar panels make **exactly** the power it needs, on the day it is launched. Not a scrap spare. They are rather pleased -- nothing has been wasted.\n\nWhy is this a serious mistake?",
            options: [
                { id: 'right', label: "The panels make a little less power every year, so within a few years there will not be enough to run the satellite, long before its work is finished.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It is fine -- with no rain or wind up there, the panels will go on making exactly the same power for ever.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "There is no rain and no wind. But go back to what actually damages things up there.\n\nThe panels are roasted to **120 °C** and frozen to **-100 °C**, sixteen times a day. The full force of sunlight lands on them with no air to soften it. Specks of dust pit their surface.\n\nNone of that stops them working. It just makes them a little **less** good, every year, for ever. After fifteen years a panel might make only three quarters of what it made when new.\n\nSo a satellite built with exactly enough power on day one has too little by year three, and is dead long before its job is done.\n\nThis is why engineers deliberately fit **more panels than are needed** at launch. On day one there is power going spare, which looks wasteful. By year fifteen that spare is exactly what is keeping the satellite alive. **You do not build for the day it launches. You build for the day it is old.**",
            options: [
                { id: 'retry', label: "Oh -- you have to build in spare power for later!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Materials in space are chosen for what twenty years will do to them.**\n\n- Roasted to **120 °C** in sunlight, frozen to **-100 °C** in shadow, sixteen times a day\n- Things grow and shrink with heat, so joints loosen and parts crack\n- Fierce unfiltered sunlight makes plastics yellow and crumble\n- Flying specks pit every surface\n- **Metals**, **special glass** and **gold blankets** are chosen to cope\n- **Solar panels** still fade, so extra ones are fitted at the start\n\nSo the satellite is in the right orbit and it will last. Now the real question.\n\nWhat can it actually tell us about the living world down here? That is B50!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Build for the day it is old, not the day it launches!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how machines survive in space!**\n\n- Space has no rain and no rust, but it is far from gentle\n- Sunlight roasts a satellite to about **120 °C**\n- The Earth's shadow freezes it to about **-100 °C**\n- A low satellite goes through that **16 times a day**\n- Things grow and shrink with heat, so joints loosen and parts crack\n- Unfiltered sunlight turns plastics yellow, then brittle\n- **Metals**, **special glass** and shiny **gold blankets** survive it\n- **Solar panels** fade, so spare ones are built in from the start\n\nNext in B50: what all this lets us learn about life on Earth!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Space is harsh, so materials are chosen to last!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C50 Complete -- Built for Space!**\n\nEvery material on a satellite was chosen for what twenty years of roasting, freezing and fierce sunlight would do to it.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Space is not gentle | **120 °C** to **-100 °C**, 16 times a day | Joints loosen, parts crack |\n| Sunlight is unfiltered | No air to soak up the fiercest part | Plastics yellow and crumble |\n| Metals and glass cope | They do not go brittle | The satellite keeps working |\n| **Gold blankets** | Bounce heat out, hold warmth in | That is why satellites look golden |\n| Panels fade every year | So spare ones are fitted | Build for the day it is old |\n\n**Up next:** B50 (Watching Life from Space) -- what satellites tell us about the living world!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
