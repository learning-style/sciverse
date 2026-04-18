import { DialogNode } from '../../types';

export function getB31Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In some parts of the world, people get very sick just from drinking water. But water looks harmless! How can plain water make someone so ill they end up in the hospital?\n\nWhat do you think makes dirty water dangerous?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'germs', label: "Invisible germs live in the water -- bacteria and viruses that cause diseases when you drink them.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'dirt', label: "The dirt and mud in the water makes your stomach hurt.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Dirt might taste gross, but it usually won't make you seriously sick. The real danger is **invisible germs** -- bacteria and viruses that are way too small to see!\n\nWhen sewage (toilet waste) mixes with drinking water, germs from human waste get into the water. These germs cause diseases like **cholera**, **typhoid**, and **dysentery** -- illnesses that can make you very, very sick. One drop of contaminated water can contain millions of bacteria!",
            options: [
                { id: 'cont', label: "So it's the invisible germs, not the visible dirt, that's dangerous?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! **Waterborne diseases** are caused by germs living in contaminated water:\n\n1. Sewage (waste) gets into the water supply\n2. **Bacteria** (like cholera) multiply rapidly in the warm water\n3. Someone drinks the contaminated water\n4. Germs invade their **gut** and make them very sick\n5. Their waste carries germs back into the water -- and the **cycle repeats**!\n\nThis is why keeping sewage AWAY from drinking water is so important. When the system breaks down, disease spreads through whole communities.\n\nTry the **Sanitation Level** slider to see how clean water systems protect a community!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'try', label: "Let me see how sanitation protects people!", nextNodeId: 'experiment' }
            ]
        },
        experiment: {
            id: 'experiment',
            speaker: 'AI',
            content: "Watch the visual! A community drinks water from a shared source:\n\n- **Low sanitation** -- sewage mixes with water, germs spread, many people get sick (red)\n- **High sanitation** -- clean water pipes keep sewage separated, most people stay healthy (green)\n- The **health meter** shows how healthy the community is\n\nClean water is the single most important thing for public health. More lives have been saved by clean water pipes than by any medicine in history!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'experiment' } },
            options: [
                { id: 'cp', label: "Better sanitation = healthier community!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** After a flood, the city's sewage pipes break and mix with the drinking water pipes. What should people do?",
            options: [
                { id: 'right', label: "Stop drinking tap water! Boil water first or use bottled water -- boiling kills the germs.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It's fine -- if the water looks clear, it's safe to drink.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Very dangerous! Remember from **C31 Clean Water** -- clear water can be FULL of invisible germs. If sewage has mixed with the water supply, bacteria and viruses are definitely in there.\n\n**Boiling water** for one minute kills almost all germs. That's why emergency broadcasts tell people to boil water after floods and pipe breaks. Heat destroys the germs that chemistry (chlorine) normally handles!",
            options: [
                { id: 'retry', label: "Oh -- boiling is the emergency backup for killing germs!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! Boiling water is the oldest germ-killing trick -- heat destroys bacteria and viruses.\n\nThis connects everything in Big Idea 31:\n- **P31** -- gravity and pipes deliver water, but broken pipes mix sewage with drinking water\n- **C31** -- chlorine kills germs in treatment plants, but a flood can bypass the whole system\n- **B31** -- without clean water, germs spread through the community and people get sick\n\nPhysics, chemistry, and biology all play a role in keeping water safe!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Pipes, chemicals, and biology all work together for clean water!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered why clean water saves lives!**\n\nPublic health depends on keeping germs out of water:\n- **Bacteria and viruses** in water cause deadly diseases\n- **Sewage** must stay separated from drinking water\n- **Sanitation** (clean pipes + treatment) protects whole communities\n- **Boiling** kills germs when the system fails\n- Clean water has saved more lives than any medicine ever invented\n\nP31 showed how gravity moves water, C31 showed how chemistry cleans it, and B31 showed why failing to do so makes people very sick!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Clean water = healthy people. It all connects!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 31 -- B31 Complete!**\n\nInvisible Enemies -- How Do Cities Move Water and Waste?\n\nClean water is the foundation of **public health** -- without it, invisible germs spread through communities.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Germs in water cause disease | Invisible bacteria and viruses | Cholera, typhoid, dysentery |\n| Sanitation keeps water safe | Separate pipes for waste | Prevents contamination |\n| Boiling kills germs | Heat destroys bacteria | Emergency backup plan |\n\n**Big Idea 31 connections:**\n- P31 (Downhill Flow) showed how gravity moves water through pipes\n- C31 (Clean Water) showed how chemistry kills germs in water\n- B31 (Invisible Enemies) showed why clean water saves lives!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
