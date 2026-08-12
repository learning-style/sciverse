import { DialogNode } from '../../types';

export function getC36Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In **P36** you learned that filters cannot catch the smallest germs. So how does tap water become safe?\n\nThe answer is a chemical called **chlorine**. Adding chlorine to drinking water is often called the most important public health invention of the last two centuries -- it saved millions of lives.\n\nHow do you think a chemical makes water safe?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'kills', label: "It attacks the germs themselves, damaging the outside of each germ cell until it cannot survive.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'sinks', label: "It makes the germs heavy so they sink to the bottom and can be poured off.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Water plants really do make some particles clump and sink -- that step is called **coagulation**. But chlorine does something much more direct.\n\nChlorine is a **disinfectant**. It reacts with the outer wall of a **bacterium** and tears it open, and it damages the machinery inside. The germ cannot repair itself, so it dies. Nothing is left behind to sink or strain out.\n\nThat is why chlorine finishes the job the filters started -- it does not care how small the germ is.",
            options: [
                { id: 'cont', label: "So chlorine destroys the germs rather than removing them?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! A water treatment plant runs a chemical routine:\n\n1. **Coagulation** -- add a chemical that makes tiny specks clump into big clumps\n2. **Settling** -- the heavy clumps sink to the bottom\n3. **Filtering** -- the physics from P36 removes what is left\n4. **Chlorination** -- chlorine destroys the surviving germs\n5. **pH check** -- water is adjusted to about **pH 7**, neither acid nor base\n\nThat last step matters more than it sounds. **Acidic** water slowly dissolves metal out of old pipes, so a plant that lets the **pH** drop can poison the water it just cleaned.\n\nAnd chlorine has its own trade-off. Too little and germs survive; too much and the water tastes like a swimming pool.\n\nSlide **Chlorine Amount** to find the safe zone!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me find the right chlorine level!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A city cleans and chlorinates its water perfectly at the plant. But the pipes carrying it to homes are old and leaky, and the city adds **no extra chlorine** for the journey.\n\nIs the water still safe when it comes out of a tap across town?",
            options: [
                { id: 'right', label: "Not reliably -- germs can enter through leaks along the way, so a little chlorine must stay in the water the whole trip.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- the water was made completely safe at the plant, so it stays safe until someone drinks it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The water leaves the plant perfectly clean -- but it then travels for hours through kilometres of buried pipe.\n\nOld pipes crack. When pressure drops, dirty groundwater can be **sucked in** through those cracks, bringing bacteria with it. The treatment that happened this morning cannot protect against contamination that happens this afternoon.\n\nThat is why engineers deliberately leave a small amount of chlorine in the water, called the **residual**. It is a chemical bodyguard riding along, ready to destroy anything that sneaks in on the way. It is also why tap water sometimes has a faint pool smell -- that smell is the protection still working.",
            options: [
                { id: 'retry', label: "Oh -- the chlorine has to keep guarding the water all the way!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! Safe water needs chemistry that **lasts**:\n\n- **Coagulation** clumps the tiny stuff so it will sink\n- **Chlorine** destroys germs that filters could never catch\n- A chlorine **residual** protects the water all the way to your tap\n- **pH** must stay near 7 so pipes do not dissolve into the water\n- Too little chlorine is unsafe; too much tastes bad\n\nBut how does anyone actually *know* the water is safe? You cannot see a bacterium. In B36 you will learn how scientists test water and find the invisible!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The chlorine has to protect the water the whole way!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered the chemistry of safe drinking water!**\n\n- **Chlorine** is a **disinfectant** -- it destroys germs rather than removing them\n- **Coagulation** clumps tiny particles so they sink\n- A chlorine **residual** keeps guarding water inside the pipes\n- **pH** near 7 stops pipes from dissolving into the water\n- Too little chlorine is dangerous; too much tastes unpleasant\n\nNext in B36: how scientists prove water is actually safe!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Chemistry finishes what filters could not!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C36 Complete -- Chlorine Patrol!**\n\nChemistry destroys the germs that are too small to strain out -- and keeps guarding the water afterwards.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Chlorine destroys germs | It is a **disinfectant** | Works at any germ size |\n| Coagulation clumps specks | Small bits become sinkable | Clears cloudy water |\n| Some chlorine must remain | The **residual** | Guards water inside pipes |\n| pH must stay near 7 | Acid water dissolves pipes | Stops metal poisoning |\n\n**Up next:** B36 (Water Detectives) -- how we prove water is safe when germs are invisible!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
