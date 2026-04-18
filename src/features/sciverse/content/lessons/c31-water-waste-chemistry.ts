import { DialogNode } from '../../types';

export function getC31Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "When you flush the toilet or wash dishes, dirty water goes down the drain. But that water eventually goes back into rivers and lakes! How does disgusting sewage become clean enough to return to nature?\n\nWhat do you think cleans dirty water?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'chem', label: "Chemicals are added to kill germs and make the dirt clump together so it can be removed.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'filter', label: "They just pour it through a really big filter and that catches everything.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Filters help catch big stuff, but they can't remove invisible germs or dissolved chemicals! The real cleaning power comes from **chemistry**.\n\nTreatment plants add special chemicals that do two things:\n1. Make tiny dirt particles **clump together** into big blobs that sink to the bottom\n2. **Kill germs** so the water is safe\n\nWithout these chemical steps, filtered water would still be full of invisible dangers!",
            options: [
                { id: 'cont', label: "So chemicals do the real cleaning, not just filters?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Water treatment uses **chemistry** in steps:\n\n1. **Screening** -- catch big stuff (sticks, trash)\n2. **Clumping** -- add a chemical that makes tiny dirt particles stick together into heavy blobs\n3. **Settling** -- the heavy blobs **sink** to the bottom (gravity helps here too, like P31!)\n4. **Filtering** -- water passes through sand and gravel to catch remaining bits\n5. **Disinfecting** -- add **chlorine** to kill germs\n\nThe key chemistry step is **chlorine** -- it destroys bacteria and viruses so the water is safe to drink or return to rivers.\n\nTry the **Chlorine Level** slider to see how much germ-killing power the water gets!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'try', label: "Let me see how chlorine cleans the water!", nextNodeId: 'experiment' }
            ]
        },
        experiment: {
            id: 'experiment',
            speaker: 'AI',
            content: "Watch the visual! Dirty water enters the treatment plant from the left:\n\n- **Low chlorine** -- germs survive the treatment, water is still unsafe\n- **High chlorine** -- germs are destroyed, water comes out clean and clear\n- The **purity meter** shows how safe the water is\n\nBut here's the tricky part: too MUCH chlorine tastes bad and can be harmful. The goal is the **sweet spot** -- enough to kill germs but not so much that it causes problems!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'experiment' } },
            options: [
                { id: 'cp', label: "Just enough chlorine kills germs without going overboard!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A city's water treatment plant breaks down for a day. They can still filter the water but can't add chlorine. Is the filtered water safe to drink?",
            options: [
                { id: 'right', label: "No -- filters catch dirt but not invisible germs. Without chlorine, bacteria and viruses pass right through.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- if the water looks clear after filtering, it's clean enough.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Dangerous mistake! Water can look crystal clear and still be full of invisible **bacteria** and **viruses**. You can't see germs -- they're thousands of times smaller than a grain of sand.\n\nFilters catch particles, but germs slip right through the tiny gaps. Only **chemical treatment** (chlorine, UV light, or ozone) can destroy them. That's why \"clear\" doesn't mean \"clean\" -- chemistry makes the difference!",
            options: [
                { id: 'retry', label: "Oh -- clear water can still have invisible germs in it!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! This is one of the most important chemistry lessons: **what you can't see CAN hurt you**.\n\nChlorine and other disinfectants are the last line of defense. They chemically destroy germs that are far too small for any filter. That's why every city in the world adds disinfectant to drinking water.\n\nRemember from **P31 Downhill Flow** how gravity moves water through the system? Chemistry is what makes that water **safe** before it reaches your faucet!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Physics moves it, chemistry cleans it!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how chemistry cleans water!**\n\nWater treatment uses chemistry at every step:\n- **Clumping chemicals** make dirt particles stick together and sink\n- **Chlorine** destroys bacteria and viruses\n- **Filters** catch particles but can't stop invisible germs\n- Clear water is NOT the same as clean water\n- The **right amount** of chlorine kills germs without causing problems\n\nIn B31 you'll discover what happens when water ISN'T cleaned -- and why clean water saves millions of lives!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Chemistry is the invisible shield that makes water safe!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C31 Complete -- Clean Water!**\n\nChemistry turns dirty sewage into safe, clean water.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Clumping chemicals remove dirt | Particles stick and sink | First cleaning step |\n| Chlorine kills germs | Chemical disinfection | Destroys invisible dangers |\n| Clear does not mean clean | Germs are invisible | Need chemistry, not just filters |\n\n**Up next:** B31 (Invisible Enemies) -- what happens when water isn't cleaned!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
