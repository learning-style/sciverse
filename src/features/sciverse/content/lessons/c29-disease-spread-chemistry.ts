import { DialogNode } from '../../types';

/**
 * C29 — Disinfection
 * Big Idea 29: "How Do Diseases Spread and Stop?"
 *
 * Rewritten for Level 1 (grades 3-5). The first draft used reaction kinetics,
 * exponential decay, "asymptotically approach 100%", lipid membranes,
 * oxidation and denaturation, and gave a kill-rate equation.
 *
 * It also explained contact time with a steak in a hot pan, which breaks this
 * project's rule against examples that involve eating animals. It is a baked
 * potato now, and the point it makes is the same one.
 *
 * The 90%-then-99%-then-99.9% pattern is kept in full, because it is plain
 * arithmetic and it is the whole reason contact time matters.
 */
export function getC29Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `You rub cleaning gel on your hands and the germs on them die. Something invisible kills something else invisible, in a few seconds, and you feel nothing at all. What is actually going on down there?\n\nA **pathogen** is a germ that can make you ill. A **disinfectant** is a chemical that destroys pathogens — the gel, the wipes, the bleach under the sink. And it turns out that *how long* you leave it on matters just as much as how strong it is.\n\n**What you will see:**\n- **Live pathogen**: a germ still working, marked with a dot.\n- **Destroyed**: one that has been dealt with, marked with a cross.\n- **Concentration**: how strong the disinfectant is — how much of the killing chemical is packed into each drop.\n- **Contact time**: how long the disinfectant is left sitting on the surface, wet, before it is wiped or dries.\n- **Kill rate**: how fast pathogens are being destroyed right now.\n- **Pathogen destruction**: how much of the job is done.\n\n**The two dials:** **concentration** and **contact time**.\n\nHere is the question. Cleaning gel is very good at its job. So why does every bottle say to rub it in for a while, instead of just touching it and moving on?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'chem_answer', label: 'Because the chemical has to find each germ and take it apart, and that takes time. Strength alone cannot do it instantly.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'instant_answer', label: 'It is just packaging advice — a strong disinfectant kills everything the moment it lands.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Nothing kills everything the moment it lands, and the pattern it follows instead is worth knowing, because it is strange.\n\nSuppose a disinfectant destroys **9 out of every 10** pathogens each second. Start with 1000 germs:\n\n- After **1 second**: 900 gone, **100 left**.\n- After **2 seconds**: 90 more gone, **10 left**.\n- After **3 seconds**: 9 more gone, **1 left**.\n- After **4 seconds**: that last one is likely gone too.\n\nLook at what is happening. It is a **ninth of the remaining ones** each second, not a fixed number of germs. The first second takes out 900 of them. The third second takes out **nine**. The chemical has not weakened at all — there is simply far less left to find.\n\nSo you creep up on being completely clean without quite arriving: 90%, then 99%, then 99.9%, then 99.99%. It is like trying to empty a bucket by taking out half the water each time. You get very close, very fast, and then you are taking out thimblefuls.\n\nThat is why bottles say **99.9%** and never 100%. It is not modesty. It is arithmetic — and it is why the seconds at the end still count for something.`,
            options: [
                { id: 'cont', label: 'So each second takes a share of what is left, not a fixed number — that is why it never quite reaches all of them.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly. Two things decide how much of the job gets done, and they are your two dials.\n\n1. **Concentration** — how much killing chemical is packed into each drop. More of it means more chemical **molecules** bumping into pathogens each second, so more are destroyed. A **molecule** is the smallest piece of something that is still that thing.\n2. **Contact time** — how long it stays wet on the surface. Cleaning gel takes about 15 seconds to destroy 9 out of 10 germs, 30 seconds to reach 99 out of 100, and a full minute to get to 99.9%.\n\nNow here is the part worth remembering. **You need both, and one cannot stand in for the other.**\n\nDoubling the strength does roughly double how fast germs are destroyed — but only while it is wet. Wipe it off after one second and the strongest disinfectant in the world has had one second's worth of chances. It does not get to finish afterwards.\n\nAnd piling on more and more strength stops helping after a point. Past a certain concentration you are adding chemical that has nothing left to bump into, which is a waste — and with something like bleach, a stronger mix is harsher on your skin and on the surface without killing much more.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me how a germ is actually destroyed.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Taking one germ apart, step by step:**\n\n1. **The disinfectant lands.** It is spread across the surface, so it now **contacts** the pathogens there — it is touching them — and they are sitting in a puddle of it.\n2. **It spreads to reach them.** The chemical has to get right up against a germ before it can do anything, and it drifts there by itself — spreading from where there is a lot of it towards where there is less.\n3. **It attacks the bag.** A germ is a single living **cell**, and every cell is held together by a thin skin called a **membrane** — a bag, keeping its insides in. Cleaning gel dissolves that bag in much the way washing-up liquid cuts through grease. Bleach attacks it a different way, by wrecking the material it is built from.\n4. **The bag breaks down.** Once the **membrane** breaks down, the germ is open. Its insides begin to leak out and the outside world leaks in, which for a germ is already fatal.\n5. **Proteins denature.** Now the chemical gets inside, where a germ's working parts are. Those parts are **proteins**, and a protein only works because of its careful folded shape. The chemical makes that shape fall open, which is called **denaturing** it — the same thing that happens to the clear part of an egg in a hot pan, turning white and never going back. A denatured protein cannot do its job again.\n6. **More surface is exposed.** A germ that has been broken open has far more of itself **exposed** — meaning left open to the outside — than a whole one did. So the chemical gets at it more easily still, and the wrecking speeds up once it has started.\n7. **Destroyed.** Nothing about the germ works any more. It cannot repair itself, and it cannot make you ill.\n\nThen the same chemical moves on to the next one, which is the **disinfection cycle** — a **cycle** being a set of steps that comes round to its start again.\n\n**The important bit:** every one of those steps takes time. Steps 3 to 5 in particular are not instant. Take the wetness away halfway through and you have left germs with a damaged bag and some of their proteins still folded — and a germ like that can mend itself and carry on.\n\n**Try it:** use the strongest concentration with the shortest contact time. How much of the job actually gets done?\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** A hospital uses a disinfectant that needs **5 minutes** of **contact time** to work. The staff spray it on and then wipe the surface dry after **30 seconds**, so it looks clean and they can move on. What have they achieved?`,
            options: [
                { id: 'right', label: 'Not much. The chemical only had a tenth of the time it needed, so many germs are damaged but not destroyed — and a damaged germ can repair itself.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'The surface is clean — the disinfectant touched every germ on it, and that is what matters.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Touching is only the beginning. Look back at those steps: the bag has to be dissolved, the chemical has to get inside, the **proteins** have to fall open. That is not one event. It is a job of work, and this disinfectant was built knowing it needs 5 minutes to finish it.\n\nGiven 30 seconds, it gets through a small fraction of that. Many germs are left with a damaged bag and their insides still working — and they can mend the damage and carry on as before.\n\nThe cruel part is that the surface *looks* perfect. It has been sprayed, it has been wiped, it is dry and shiny. Nothing about it shows you that the chemistry was interrupted.\n\nThink of baking a potato. The oven is as hot as it goes, so surely a minute will do? No — it comes out raw in the middle, because heat has to work its way through and that takes the time it takes. A hotter oven does not let you skip it.\n\nSo "wipe it dry so it looks clean" is the exact wrong move. **The wetness is the disinfectant working.** Drying it early is switching it off early, and it is a real and well-known way that surfaces in hospitals end up still carrying germs.`,
            options: [
                { id: 'retry', label: 'So wiping it dry early stops the chemistry before it has finished — looking clean is not the same as being clean.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct, and it is one of the commonest mistakes there is.\n\n**Kill rate** needs both: how strong the chemical is, and how long it is given. Take either one away and you get very little. A strong disinfectant with no time is about as useful as a weak one with plenty.\n\nWhich turns into advice you can actually use:\n- **Cleaning gel**: keep rubbing until your hands feel dry, rather than wiping it off. The rubbing is what gives it its time.\n- **Wipes**: the surface should stay visibly wet for as long as the packet says. One quick pass dries in seconds and does far less than it looks like it did.\n- **Bleach for a kitchen or bathroom**: leave it on before rinsing. That waiting *is* the cleaning.\n\nAnd the general rule, in and out of chemistry: a reaction cannot be hurried past the time it needs. You can make it stronger. You still have to let it finish.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** disinfecting is a job of work, not a single moment.\n\n- **Concentration** sets how many chemical molecules are bumping into germs each second\n- **Contact time** sets how many of those steps get finished, and it cannot be skipped\n- **Kill rate** needs both. Either one missing and very little happens\n- Each second destroys a share of the germs **that are left**, so it goes 90%, 99%, 99.9% — always closer, never quite all\n- That is why bottles say 99.9%, and it is arithmetic rather than caution\n- A germ is destroyed in a definite order: its **membrane** breaks down, then its **proteins** denature — meaning their shapes fall open, like egg white in a hot pan\n- Half-done means repairable. A damaged germ mends itself and carries on\n\nPhysics counts the hops between people. Chemistry destroys the germ on the surface before it hops. Biology makes the next person impossible to hop to.`,
            options: [
                { id: 'done', label: 'Complete C29', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 29 — How Do Diseases Spread and Stop?**\n\n- **Physics (P29): Contact Networks** — how many people each person comes near, and whether **R₀** sits above or below 1\n- **Chemistry (C29): Disinfection** — **concentration** and **contact time** together decide the **kill rate**\n- **Biology (B29): Immunity & Vaccination** — bodies that already know the germ, so the chain has nowhere to go\n\n**Summary Table:**\n| Dial | Turned low | Turned high | What it changes |\n| --- | --- | --- | --- |\n| Concentration | Few chemical molecules per drop | Many, though past a point it stops helping | How fast germs are destroyed each second |\n| Contact time | Wiped dry at once, job unfinished | Left wet for the time on the packet | How much of the destroying actually completes |\n| Kill rate | Germs damaged, and able to mend | 99.9% destroyed | Whether the surface is really clean |\n\n**Key takeaways:**\n- Strength and time are both needed; neither covers for the other\n- Each second removes a share of what is left, so you close in on all of them without reaching all of them\n- A germ dies in order: bag first, then the **proteins** inside\n- Half-finished germs repair themselves, so stopping early can mean doing nothing\n- Keep rubbing the gel until your hands are dry. That is the chemistry being given its time\n\n✅ **Lesson C29 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
