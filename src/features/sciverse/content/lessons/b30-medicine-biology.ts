import { DialogNode } from '../../types';

/**
 * B30 — Target Cells & Treatment Response
 * Big Idea 30: "How Do Medicines Reach the Right Place?"
 *
 * Rewritten for Level 1 (grades 3-5). The first draft was written at
 * undergraduate level: Brownian motion, van der Waals forces, conformational
 * change, monoclonal antibodies, prodrugs, selective toxicity. Every one of
 * those is gone. What stayed is the idea itself -- a medicine cannot choose,
 * so the cell's own receptors do the choosing -- plus the four words the lab
 * prints on screen, each now defined before the learner meets it.
 */
export function getB30Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `How does a headache pill "know" to work on your head and leave your elbow alone? Here is the surprise: **it does not know**. The medicine spreads all through you. It reaches your head, your elbow, your toes, everywhere.\n\nSo why does only the sore part change? Because of what is on the outside of your cells.\n\nA **cell** is one of the tiny building blocks you are made of. On the outside of a cell sit shapes called **receptors**. A **receptor** is a shape that only one kind of medicine fits into, the way one key fits one lock. If the medicine fits, that cell notices it. If it does not fit, that cell carries on as if nothing arrived.\n\n**What you will see:**\n- **Cell grid**: rows of cells. Some have the matching receptor and some do not.\n- **Drug molecule**: one floating piece of medicine. A **molecule** is the smallest piece of something that is still that thing.\n- **Bound (responding)**: a cell glows green once a medicine piece has locked into its receptor. When that happens we say the medicine **binds** to the receptor, and **bound** means it is stuck in place.\n- **Response meter**: how much of the body is answering the medicine. It is labelled **treatment effectiveness** — **effectiveness** just means how well the medicine is working.\n\n**The two dials:**\n- **Receptor density** is how crowded a cell is with receptors. Many receptors means many locks, so that cell answers strongly.\n- **Drug affinity** is how tightly the medicine holds on once it fits. High affinity means it grips hard and a small amount is enough.\n\nTogether they give the **treatment response** — how much better the body actually gets.\n\nHere is the question. Some medicines stop germs growing but leave your own cells alone. How?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'bio_answer', label: 'Germs must be built differently, so the medicine finds something to grip on a germ that our cells simply do not have.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'simple_answer', label: 'The medicine can tell the difference between good and bad, and only goes after the bad.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `It is a fair guess, but a medicine cannot tell good from bad. It cannot tell anything. It is far too small to know where it is — it is only a shape drifting about, and shapes do not make choices.\n\nThe real reason is that **germs are built differently from us**. Many germs hold themselves together with a stiff outer wall. Our cells have no wall at all; they have a soft, bendy skin instead.\n\nSo a medicine like penicillin is shaped to jam the wall-building job. On a germ there is a wall to spoil, and the germ cannot hold itself together. On your cells there is no wall — nothing for that medicine to grip, so nothing happens. The medicine is not being kind to you. There is simply no lock of that shape on you to fit.\n\nWe say such a medicine is **picky**: it can only act where the matching shape exists.`,
            options: [
                { id: 'cont', label: 'So it comes down to germs and our cells being built differently, not the medicine being clever.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `That is it. Whether a cell answers a medicine comes down to two things, and they are the two dials in front of you.\n\n1. **Receptor density** — how many matching receptors that kind of cell carries. The nerve cells that carry pain are crowded with the receptors a painkiller fits. Your muscle cells have very few. The medicine reaches both, but only the crowded ones have enough locks to answer, so the ache fades while your muscles barely notice.\n2. **Drug affinity** — how tightly the medicine holds on once it is in. A tight grip means it stays put and does its work, so a small dose is plenty. A **dose** is how much medicine you take. A loose grip keeps slipping out, so you would need a much bigger dose to get the same help.\n\nPut the two together and you get the **treatment response**:\n- **Strong response**: crowded with receptors and a tight grip — the medicine works its best.\n- **Weak response**: few receptors, or a loose grip — very little changes.\n- **Side effects**: the medicine also fits receptors on cells you were not aiming at. A **side effect** is a change you did not want, like a sore tummy.\n\nAll of it is one lock-and-key match, happening on the skin of your cells.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me what happens when medicine meets a receptor.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**From swallowing the pill to feeling better, step by step:**\n\n1. **The medicine arrives.** It travels in your **bloodstream** — the blood going round and round your body — and then spreads into the tissue by **diffusion**. **Diffusion** is the way anything spreads from where there is a lot of it to where there is less, all by itself, with nothing pushing it. Squash spreading through water is diffusion. The **target tissue** is the part of the body you were hoping to help.\n2. **It bumps into things.** Medicine pieces do not steer. They drift and bump, over and over, until one happens to bump into a receptor.\n3. **Does it fit?** If the shape of the medicine matches the hollow in the receptor, it settles in. If not, it drifts off and keeps bumping.\n4. **It holds on.** Once in, tiny pulls hold it there. A tighter hold is what we called high **drug affinity**.\n5. **The cell passes the news inward.** The receptor is pressed out of shape, and that sets off a chain of small changes running deeper into the cell. A chain like that, where each change sets off the next, is called a **cascade** — think of one domino tipping the next.\n6. **The cell acts.** At the end of the cascade the cell does something different: it stops sending its pain signals, or it lets swelling go down. That is when the **symptoms resolve** — **symptoms** are what you feel when you are unwell, and **resolve** means they settle down and fade.\n7. **It lets go.** After a while the medicine slips back out, the receptor springs back to its old shape, and it is free to be used again. Those seven steps together — arrive, fit, hold, pass the news in, act, let go — are the receptor **cycle**, and a **cycle** is something that comes back round to where it started.\n\n**The catch:** some receptors on other cells are *nearly* the same shape. A medicine can squeeze into those too, and that is where side effects come from. A pickier medicine fits fewer of them and gives you fewer surprises.\n\n**Try it:** move both dials and watch the response meter. Can you get a strong response with only a few receptors?\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** A medicine is made for the receptor on the cells of a sore, swollen knee. Nearly every cell in the knee carries that receptor. It turns out a few cells in the lining of the stomach carry the very same receptor too.\n\nWhat happens when someone takes it?`,
            options: [
                { id: 'right', label: 'The knee gets most of the help, because almost all its cells have the receptor. A few stomach cells answer as well, so there may be a mild sore tummy — a side effect.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'Only the knee is affected, because the medicine was made for the knee.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Remember what the medicine can and cannot do. It cannot tell a knee from a stomach. All it can do is fit, or not fit.\n\nIf a few stomach cells carry the same receptor, the medicine **will settle into those too**. It has no way of knowing it was meant for the knee.\n\nThe response follows the crowding. The knee is packed with matching receptors, so the knee answers strongly and the swelling goes down. The stomach has only a few, so it answers faintly — enough to feel a bit off, not enough to do real harm. That faint answer in the wrong place is exactly what a side effect is.\n\nThis is why a medicine box lists things you might feel. The people who made it already know which other cells share that receptor shape. A better medicine is a pickier one: it fits the knee receptor and slides straight past the near-matches.`,
            options: [
                { id: 'retry', label: 'So a side effect is just the same lock-and-key match happening on a cell I was not aiming at.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct. And it is the hardest part of making any medicine: you want it to help a lot **and** fit as few other cells as possible. Make it grip harder and it helps more — but it may also grip the near-matches harder.\n\nHere is how medicine makers push against that problem:\n- **Fussier shapes**: build the medicine so it fits one receptor closely and the near-matches badly.\n- **Sleeping medicines**: send it in switched off, so it only wakes up where the right cells can switch it on. Nowhere else can.\n- **Tiny bubbles**: pack it inside bubbles so small you would need a microscope to see them, made so they pile up mostly where the trouble is.\n- **Making a map first**: check which other cells carry the same receptor **before** anyone takes it, so the surprises are known in advance.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** the medicine does not choose. The cell does.\n\n- **Receptor density** decides which cells answer loudly and which hardly answer at all\n- **Drug affinity** decides how tight the grip is, and so how long the help lasts\n- **Treatment response** grows when either dial goes up — more locks, or a firmer hold\n- **Side effects** happen where cells you were not aiming at carry the same receptor\n- **Picky** medicines fit the one receptor they were meant for and little else\n- **Lock and key**: shape alone decides everything. Nothing in here is making a decision\n\nPhysics gets the medicine there by **diffusion**. Chemistry decides when it is let out. Biology decides who answers — and that is the receptors.`,
            options: [
                { id: 'done', label: 'Complete B30', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 30 — How Do Medicines Reach the Right Place?**\n\n- **Physics (P30): Diffusion Transport** — medicine spreads from crowded places towards emptier ones, which is how it leaves the blood and soaks into tissue\n- **Chemistry (C30): Drug Solubility & Release** — **solubility** means how well something dissolves, and a coating that dissolves slowly lets the medicine out little by little\n- **Biology (B30): Target Cells & Response** — receptors decide which cells answer\n\n**Summary Table:**\n| Dial | Turned low | Turned high | What it changes |\n| --- | --- | --- | --- |\n| Receptor density | Few locks on the cell | Many locks on the cell | How loudly that cell answers |\n| Drug affinity | Loose grip, slips out | Tight grip, stays put | How strong the help is, and how long it lasts |\n| Treatment response | Barely any change | The medicine doing its best work | How much better the body gets |\n\n**Key takeaways:**\n- A medicine cannot aim. It goes everywhere, and only fitting cells answer\n- A cell crowded with matching receptors answers strongly; one with few barely answers\n- A tight grip means a smaller dose is enough\n- Side effects are the same match on a cell you were not aiming at\n- **Diffusion**, dissolving and receptors: the three keys to medicine **delivery**, which means getting it to the right place\n\n✅ **Lesson B30 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
