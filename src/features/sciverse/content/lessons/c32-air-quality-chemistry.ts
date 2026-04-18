import { DialogNode } from '../../types';

export function getC32Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "On some hot summer days, the sky turns a hazy brown-yellow even when there's no smoke or dust. This haze is called **smog** -- and it's created by invisible chemical reactions right in the air above you!\n\nWhat do you think creates smog?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'react', label: "Car exhaust and sunlight react together in the atmosphere -- the sun's energy drives chemical reactions that create new pollutants.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'smoke', label: "Factories and cars just release smoke directly -- that's what smog is.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Direct smoke is part of it, but the worst smog is actually **created in the air** by chemical reactions! Cars and factories release gases like **nitrogen oxides (NOx)** and **volatile organic compounds (VOCs)**. These gases are mostly invisible.\n\nBut when sunlight hits them, the sun's energy drives a chemical reaction that produces **ozone (O3)** -- a harmful gas that irritates your lungs. This is called **photochemical smog** because light (photo) causes the chemistry!",
            options: [
                { id: 'cont', label: "So sunlight actually creates new pollutants from car exhaust?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! **Smog is made by chemistry in the sky:**\n\n1. Cars and factories release **NOx** (nitrogen oxides) and **VOCs** (volatile organic compounds)\n2. **Sunlight energy** breaks apart NOx molecules\n3. The freed atoms react with oxygen to make **ozone (O3)** -- ground-level ozone is harmful!\n4. VOCs speed up the reactions and create more toxic chemicals\n5. The result: a brown haze of **secondary pollutants** that weren't directly emitted\n\nThis is why smog is worst on hot, sunny, windless days -- more sunlight means more reactions, and no wind means the pollution stays trapped.\n\nTry the **Sunlight Intensity** slider to see how sunlight drives smog formation!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'try', label: "Let me see how sunlight creates smog!", nextNodeId: 'experiment' }
            ]
        },
        experiment: {
            id: 'experiment',
            speaker: 'AI',
            content: "Watch the visual! Car exhaust releases invisible gases into the air:\n\n- **Low sunlight** -- NOx and VOCs float around but stay mostly invisible\n- **High sunlight** -- reactions speed up, ground-level ozone forms, brown haze appears\n- The **air quality meter** shows how much harmful ozone is building up\n\nNotice that the pollution source (cars) stays the same -- but more sunlight creates MORE smog! The sun is the energy source that powers the dangerous chemistry.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'experiment' } },
            options: [
                { id: 'cp', label: "More sunlight = more chemical reactions = worse smog!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Two cities have the same number of cars. City A has hot, sunny, windless summers. City B is often cloudy and breezy. Which city has worse smog problems?",
            options: [
                { id: 'right', label: "City A -- hot sun drives more chemical reactions creating ozone, and no wind traps the smog in place.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Both the same -- they have the same number of cars producing the same exhaust.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Same cars, but very different smog! The **chemistry** depends on conditions:\n\n- City A (sunny + still): Intense UV light drives rapid ozone formation, and no wind means pollutants stay concentrated. The smog builds up day after day\n- City B (cloudy + breezy): Less sunlight means fewer chemical reactions, and wind disperses the pollutants before they react\n\nThis is why Los Angeles (sunny, still) has worse smog than Seattle (cloudy, breezy), even though both have millions of cars!",
            options: [
                { id: 'retry', label: "Oh -- weather controls the chemistry even when the cars are the same!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! Weather controls the chemistry of smog:\n\n- **Sunlight** provides energy for reactions (more sun = more smog)\n- **Wind** disperses pollutants (no wind = smog gets trapped)\n- **Temperature** affects reaction speed (hotter = faster reactions)\n\nThis connects to **P32 Particle Drift** -- the tiny particles created by these reactions float for days because they're PM2.5 size. Physics and chemistry work together to create the air quality problem!\n\nIn B32 you'll see what these pollutants do to your lungs when you breathe them in.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Sunlight plus exhaust equals dangerous smog chemistry!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how chemistry creates smog!**\n\nAir pollution involves real chemical reactions:\n- Car exhaust releases **NOx** and **VOCs** into the air\n- **Sunlight** energy drives reactions creating ground-level **ozone**\n- These are **secondary pollutants** -- created in the air, not directly emitted\n- Hot, sunny, still weather makes smog WORSE\n- Same cars can cause different air quality depending on weather\n\nIn B32 you'll discover what happens when you breathe these pollutants into your lungs!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Sunlight powers the chemistry that turns exhaust into smog!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C32 Complete -- Smog Reactions!**\n\nSunlight drives chemical reactions that create dangerous air pollution.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| NOx + VOCs + sunlight = ozone | Photochemical reactions | Secondary pollutants |\n| Sun provides the energy | More sun = more smog | Weather controls air quality |\n| Wind disperses pollutants | Still air traps smog | Geography matters |\n\n**Up next:** B32 (Breathing Under Siege) -- what pollution does to your lungs!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
