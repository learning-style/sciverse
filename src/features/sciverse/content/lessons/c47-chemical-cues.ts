import { DialogNode } from '../../types';

export function getC47Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A fox cannot guard its whole territory at once. It might be two fields away, fast asleep.\n\nYet other foxes usually stay out anyway.\n\nThe fox left something behind that keeps working while it sleeps. What do you think it is?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "A smell -- the fox leaves scent marks that other foxes can read long after it has gone.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Nothing at all -- other foxes just guess where the edges are and stay away to be safe.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Guessing would be a poor way to run a territory. The fox leaves an actual **message**, and the message is made of **smell**.\n\nAnimals leave **scent marks** on posts, rocks and grass at the edges of their patch. A scent mark is a tiny amount of a smelly liquid, and it carries real information:\n\n- **Who** left it, because every fox smells slightly different\n- **How big** they are\n- **How recently** they passed by\n\nAnother fox sniffs the mark and reads all three. If the message is fresh and the owner smells large, the visitor usually turns around. Nobody has to be there, and nobody has to fight.\n\nA smell is a message that keeps working after you leave.",
            options: [
                { id: 'cont', label: "So the smell carries a message even when the fox is gone?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! A **scent mark** is a chemical message, and its most useful feature is that it **fades**.\n\nIt is one of the quietest ways **species share habitats** -- two animals settle who goes where without ever meeting.\n\n1. Fresh mark -- a **strong** smell, so the owner was here recently\n2. A few days old -- **fainter**, the owner may have moved on\n3. A week or two -- almost **gone**, so the patch may be free\n\nThat fading is what makes it useful. A mark that lasted forever would be useless, because every patch would end up smelling of every fox that ever passed. Because it fades, the strength of the smell tells you **how recently** somebody was here.\n\nSo animals top up their marks, walking the edges of their territory and refreshing them. A fox that stops patrolling stops smelling of the place, and before long a new fox moves in.\n\nSmell messages also save fights. Plenty of animals use them -- cats, badgers, deer, wolves, even ants marking a trail to food.\n\nIn the picture, a scent mark sits on a post and a visiting fox sniffs it.\n\nSlide **Days Since Marking** and see what the visitor decides!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me see how the smell fades!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A fox is ill and stays in its den for two weeks without patrolling.\n\nWhat happens to its territory?",
            options: [
                { id: 'right', label: "Its scent marks fade, so passing foxes read the patch as empty and start moving in.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing changes -- once a territory is marked, it belongs to that fox permanently.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "A territory is never permanent. It is only ever as good as the **freshest mark**.\n\nThe marks the ill fox left two weeks ago have faded to almost nothing. A passing fox sniffs the posts, finds only a faint old trace, and reads exactly what the smell is telling it: **nobody has been here for a long time**.\n\nSo the visitor moves in and starts leaving its own fresh marks. When the ill fox recovers it may find the patch already claimed, and now it would have to fight for it.\n\nThis is why animals spend so much time patrolling and re-marking. The message is not permanent, so keeping a territory is a job you have to keep doing.",
            options: [
                { id: 'retry', label: "Oh -- you have to keep topping the message up!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **A scent mark is a message with a built-in clock.**\n\n- A **scent mark** says who was here, how big, and how recently\n- It **fades**, and the fading is the useful part\n- A strong smell means recent; a faint one means long gone\n- Animals must keep **topping up** their marks to hold a territory\n- Smell messages settle disputes without fighting\n\nSo animals use space (**P47**) and smell messages to keep each other apart.\n\nBut some animals live right on top of each other and never fight at all. How can two species share exactly the same patch? That is B47!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The fading is what makes the message useful!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how animals send messages that outlast them!**\n\n- A **scent mark** is a smell left deliberately at a territory edge\n- It carries **who**, **how big** and **how recently**\n- Every animal smells slightly different\n- The smell **fades** over days, so strength means freshness\n- Animals patrol and **top up** their marks to keep a territory\n- Smell messages prevent most fights before they start\n\nNext in B47: how two species live in the same place without a fight!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Smells are messages that keep working after you leave!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C47 Complete -- Smell Messages!**\n\nA scent mark is a message that works while you sleep, and fades so it stays honest.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Animals leave **scent marks** | A smell left on purpose | Works when nobody is there |\n| The smell carries information | Who, how big, how recent | Every animal smells different |\n| Marks **fade** over days | Strong means recent | A permanent mark would be useless |\n| Marks must be topped up | Stop patrolling and you lose the patch | Territory is a job |\n\n**Up next:** B47 (Sharing Without Fighting) -- how two species use the very same patch!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
