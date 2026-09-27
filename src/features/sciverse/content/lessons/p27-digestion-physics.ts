import { DialogNode } from '../../types';

/**
 * P27 — Mechanical Digestion
 * Big Idea 27: "How Does Food Become Usable Energy?"
 *
 * Rewritten for Level 1 (grades 3-5). The first draft used chyme, bolus,
 * epiglottis, pyloric sphincter, compressive and shearing forces, and gave
 * speeds as ~2-25 cm/s without saying what that feels like. Peristalsis,
 * churning, grinding and contractions all stay, because the lab prints them on
 * screen -- each is now explained where the learner first meets it.
 *
 * The surface-area claim is correct and worth keeping: cutting a cube into
 * eight smaller cubes halves every edge and doubles the total surface.
 */
export function getP27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `You bite into an apple. Somehow that apple ends up as energy for running about. The very first part of the job is not chemistry at all — it is pushing, crushing and squeezing. Plain physics, and quite a lot of it.\n\nNothing has changed *what* the apple is yet. It has only been made smaller. Breaking food up without changing what it is made of is called **mechanical digestion** — **mechanical** means to do with pushing and pulling and squashing.\n\n**What you will see:**\n- **Teeth**: **grinding** the apple, which means crushing it between two hard surfaces until it is crumbs.\n- **Stomach**: **churning**, which means stirring and folding something over and over, the way you mix cake batter.\n- **Tube with travelling waves**: **peristalsis**. Your food pipe is a soft tube wrapped in rings of muscle. The rings squeeze one after another, and that travelling squeeze pushes the food along. A squeeze of a muscle is a **contraction**, so peristalsis is a row of contractions passing down the tube like a wave going down a skipping rope.\n- **Cloud of pieces**: the crumbs, and how much **surface** they have. **Surface** is the outside of something — the part you could touch, and the only part anything else can reach.\n\nHere is the question. Why bother with all this crushing? Why not swallow the apple whole and let your insides get on with it?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'physics_answer', label: 'Because crumbs have far more outside than one big lump, and things can only be worked on from the outside.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'dissolve_answer', label: 'Food just dissolves inside you on its own, so the size cannot matter much.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Food does not dissolve on its own. Leave an apple in a glass of water all day and come back: it is a wet apple. Nothing has dissolved.\n\nYour body does real physical work on it instead, and it is harder work than you would think.\n\nYour teeth crush. Your back teeth can press with about as much force as a heavy bag of flour resting on your thumb — which is why a nut gives way. Your stomach squeezes and folds the food over and over. Your gut passes it along with those travelling waves of **peristalsis**, hour after hour, without you thinking about it once.\n\nAnd the reason for all that effort is coming up next. It is not about making food small enough to fit. It is about making **outside**.`,
            options: [
                { id: 'cont', label: 'So my body really is doing physical work on food, not just waiting for it to dissolve.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly. Three pushing-and-squeezing jobs get it done, and the whole thing is aimed at one goal.\n\n1. **Grinding** — in your mouth. Front teeth cut, side teeth tear, flat back teeth crush. Each chew takes about half a second, and every chew turns a few big pieces into many small ones.\n2. **Churning** — in your stomach. The stomach wall squeezes about **3 times a minute**, folding the food over and mixing it with acid and enzymes until it is a thick soup. Mixing matters: without it the enzymes would only ever meet the food right next to them.\n3. **Peristalsis** — all the way along. Those travelling squeezes keep everything moving forward, and they are strong enough that they do not need any help from gravity. You could eat standing on your head and your dinner would still go the right way.\n\nTogether these are the **mechanical pipeline** — a **pipeline** being a line of stages where each one hands on to the next.\n\nAnd the goal of every stage is the same: make more **surface**. Chemistry can only happen on a surface, so the amount of surface sets how fast the rest can go.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Walk me through the whole journey.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**From bite to soup, step by step:**\n\n1. **Mouth.** Your teeth do different jobs on purpose: the sharp front ones cut a piece off, the pointed ones beside them tear, and the wide flat ones at the back crush it to crumbs. Meanwhile your spit wets everything so it holds together.\n2. **Swallowing.** Your tongue gathers the crumbs into a soft ball and pushes it backwards. At the same moment a small flap folds down over your airway so that food goes down the food pipe and not into your lungs. More than twenty muscles do this in the right order, in about a second, and you never once decide to do it.\n3. **Food pipe.** **Peristalsis** carries the ball down to your stomach in about 6 to 10 seconds.\n4. **Stomach.** Layers of muscle **churn** for 2 to 5 hours. At the bottom there is a ring of muscle acting as a gate: it stays shut until pieces are small enough — roughly the size of a grain of rice — so anything still too big is kept back and churned some more. Nothing leaves early.\n5. **Gut.** Now the food is a thin soup, and it is moved slowly along by peristalsis while enzymes work on it and your body takes up what it needs.\n\n**Why make crumbs? Here is the whole reason.**\n\nTake a cube of food and cut it into 8 smaller cubes. You have exactly the same amount of food — but **twice as much surface**. Cut those again, and you double it again.\n\nEnzymes can only work on a surface. They cannot reach the middle of a lump; they have to wait for the outside to come off first. So doubling the surface means twice as many enzymes can be at work at the same moment. The enzymes are no faster. There is simply more room for them, so they **access** the food — meaning they can reach it — all over it at once, instead of only at its skin.\n\n**Try it:** grind finely and churn hard. How much does the food's surface grow?\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** People say you should chew your food properly. Why would chewing more make digestion faster?`,
            options: [
                { id: 'right', label: 'Chewing makes many small pieces out of a few big ones, and many small pieces have far more surface for enzymes to work on at once.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'Because chewing warms the food up, and warm food breaks down faster.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Chewing barely warms food at all — and anyway, the food is about to sit inside you at body warmth for hours, which settles its temperature far more than your teeth ever could.\n\nThe real answer is **surface**.\n\nTry this with sugar. Drop a sugar cube into a glass of water and watch how long it takes to vanish. Now stir the same amount of powdered sugar into another glass. The powder is gone almost at once. Same sugar, same water — but the powder has thousands of times more outside for the water to get at.\n\nChewing turns your dinner into powder. A few big lumps become hundreds of small pieces, and every new piece brings fresh surface for enzymes to work on.\n\nSwallow a lump whole and your enzymes are left nibbling at its skin, working their way in from the outside, for hours longer than they needed to.`,
            options: [
                { id: 'retry', label: 'So it is about surface, and chewing is how I make more of it.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct. **Surface** is the bridge between the physics and the chemistry. Your teeth do not change the food one bit chemically — they just hand chemistry a much bigger surface to start on.\n\nAnd it is worth being clear about what does *not* change. Each enzyme works at exactly the same speed as before. Not one of them is hurrying. There is simply more space for more of them to work side by side.\n\nGrown-ups use this trick everywhere. Ground coffee gives up its flavour in seconds while a whole bean sits in hot water doing almost nothing. Kindling catches light while a log sits there. Same stuff, more surface, faster everything.\n\nYour back teeth have been doing it since before anybody worked out why.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** the physics of eating is all about making surface.\n\n- **Grinding** increases the surface; **churning** mixes the crumbs with acid and enzymes; **peristalsis** moves everything forward\n- **Surface** is the point of all three. Cut a cube into 8 and you have twice the surface for the same food\n- A **contraction** is one squeeze of a muscle, and peristalsis is a row of them passing along like a wave\n- Peristalsis is strong enough to work upside down, so gravity is a help rather than a need\n- The stomach's gate holds food back until the pieces are small enough, so nothing leaves too early\n- Chemistry is not made quicker. It is given more room\n\nWithout the crushing and squeezing, your enzymes would need **days** to get through one meal instead of hours. Physics sets chemistry up; chemistry does the cutting; biology keeps the order.`,
            options: [
                { id: 'done', label: 'Complete P27', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 27 Complete — How Does Food Become Usable Energy?**\n\n- **Physics (P27): Mechanical Digestion** — grinding, churning and peristalsis turn a lump into crumbs with far more surface\n- **Chemistry (C27): Enzyme Reactions** — shaped tools cut the bonds in starchy food, protein and fat\n- **Biology (B27): Digestive System** — the organs keep the mechanical and chemical stages in the right order\n\n**Summary Table:**\n| Stage | What squeezes | What you end up with |\n| --- | --- | --- |\n| Mouth | Teeth crushing and cutting | A few big pieces become hundreds of crumbs |\n| Stomach | Churning about 3 times a minute | A thick soup, well mixed with acid and enzymes |\n| Gut | Peristalsis, wave after wave | Soup kept moving while the enzymes finish |\n\n**Key takeaways:**\n- Mechanical digestion changes the size of food, never what it is made of\n- Cut a cube into 8 and the surface doubles — same food, twice the room to work\n- Enzymes can only work on a surface, so surface sets the pace\n- **Peristalsis** does not rely on gravity; it works upside down\n- Chewing properly really does help, and now you know exactly why\n\n✅ **Lesson P27 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
