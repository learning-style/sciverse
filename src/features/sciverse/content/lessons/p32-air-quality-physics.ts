import { DialogNode } from '../../types';

export function getP32Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "You breathe about 20,000 times every day, pulling air deep into your lungs. But air isn't just invisible gas -- it carries tiny floating **particles** like dust, smoke, and pollen.\n\nWhat do you think determines whether a particle stays floating in the air or falls to the ground?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'size', label: "Smaller particles float longer because air resistance holds them up -- big particles are too heavy and fall.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'wind', label: "Wind keeps everything floating -- without wind, all particles would fall.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Wind helps spread particles, but the real factor is **size vs. gravity**! Even in perfectly still air, some particles float for hours or even days.\n\nThe reason is **air resistance** -- tiny particles are so light that the air molecules bumping into them keep them suspended. The smaller the particle, the longer it floats. Big particles like sand fall fast, but particles smaller than 2.5 micrometers (called **PM2.5 (Particulate Matter)**) can hang in the air for days!",
            options: [
                { id: 'cont', label: "So size determines how long a particle stays in the air?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! **Particle size** determines everything about how dangerous air pollution is:\n\n1. **Large particles** (>10 micrometers) -- dust, pollen. They fall quickly and your nose catches most of them\n2. **PM10 (Particulate Matter)** (2.5-10 micrometers) -- fine dust. Float longer and get past your nose into your throat\n3. **PM2.5 (Particulate Matter)** (<2.5 micrometers) -- smoke, exhaust. Float for days and reach deep into your lungs\n4. **Ultrafine** (<0.1 micrometers) -- can pass through lung walls into your blood!\n\nThe smaller the particle, the more dangerous -- because **gravity can't pull it down** and your body can't filter it out.\n\nTry the **Particle Size** slider to see how different sizes behave in air!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'try', label: "Let me see how particle size changes airflow!", nextNodeId: 'experiment' }
            ]
        },
        experiment: {
            id: 'experiment',
            speaker: 'AI',
            content: "Watch the visual! Particles are released into the air:\n\n- **Large particles** -- fall quickly, like dropping a ball. Gravity wins easily\n- **Small particles** -- drift and float, barely falling. Air resistance fights gravity to a standstill\n- The **settle time** shows how long particles stay airborne\n\nThis is why smoke from a fire hangs in the air for hours, but sand thrown into the air falls immediately. The physics of tiny particles is completely different from the physics of big objects!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'experiment' } },
            options: [
                { id: 'cp', label: "Smaller particles float way longer -- gravity barely affects them!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A factory and a campfire both release smoke. The factory has a tall smokestack that releases smoke high in the air. Which puts more dangerous particles near ground level?",
            options: [
                { id: 'right', label: "Both are dangerous -- the tiny PM2.5 particles from the smokestack float for so long they drift back down to where people breathe.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The campfire -- because the smoke is closer to the ground to begin with.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The campfire is more immediately noticeable, but factory smoke can be worse! The tiny **PM2.5 (Particulate Matter)** particles from factories are so small they float for days and travel hundreds of miles.\n\nA tall smokestack doesn't make pollution disappear -- it just spreads it over a wider area. Those tiny particles eventually drift back down to ground level, where people breathe them in. The campfire smoke is visible but contains larger particles that settle faster!",
            options: [
                { id: 'retry', label: "Oh -- tall smokestacks just spread the tiny particles further!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! Height doesn't save you from tiny particles. **PM2.5 (Particulate Matter) can travel for days** across hundreds of miles because gravity barely pulls on them.\n\nThis is why air pollution is a regional problem, not just a local one. A factory in one city can affect air quality in another city far away!\n\nIn C32 you'll learn about the **chemical reactions** that create some of the worst air pollutants -- and why some pollution is invisible!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Tiny particles travel far because gravity can't pull them down!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered the physics of air particles!**\n\nParticle size determines how air pollution behaves:\n- **Large particles** fall fast -- gravity wins easily\n- **PM2.5 (Particulate Matter)** (tiny particles) float for days -- air resistance beats gravity\n- Smaller particles reach **deeper** into your lungs\n- Tall smokestacks spread pollution further, not less\n- Air pollution is a **regional** problem because tiny particles travel far\n\nIn C32 you'll see how chemical reactions in the atmosphere create dangerous invisible pollutants!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Smaller particles are more dangerous because they float longer and go deeper!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P32 Complete -- Particle Drift!**\n\nParticle size controls how long pollution stays in the air.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Tiny particles float for days | Air resistance beats gravity | PM2.5 (Particulate Matter) stays airborne |\n| Bigger particles fall fast | Gravity wins | Less dangerous |\n| Smokestacks spread pollution | Height does not remove particles | Regional problem |\n\n**Up next:** C32 (Smog Reactions) -- how chemistry creates invisible air pollution!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
