import { DialogNode } from '../../types';

/**
 * B29 — Immunity & Vaccination
 * Big Idea 29: "How Do Diseases Spread and Stop?"
 *
 * Biology closes the Big Idea: P29 counted the hops and gave R0, C29 destroyed
 * the pathogen on surfaces, and this lesson removes the people it could hop to.
 *
 * Rewritten for Level 1 (grades 3-5). The first draft used neutrophils,
 * macrophages, antigen presentation, the innate response and mutation rate, and
 * gave the herd immunity threshold as the formula 1 - 1/R0 in a level that
 * carries no formulas.
 *
 * The threshold is now reasoned out by counting instead, which a ten-year-old
 * can follow and which gives the same numbers: if an ill person would pass it
 * to 3, then fewer than 1 of those 3 may be catchable, so more than 2 in 3 --
 * 67% -- must be protected. R0 = 5 gives 1 in 5, so 80%. Measles at 15 gives
 * 93%. Same table, reached rather than received.
 */
export function getB29Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `Right now, germs are landing on you. They are on the door handles you touched and in the air you are breathing. Almost all of them get dealt with without you noticing a thing.\n\nThe part of you that does this has a name: you are **immune** to something when your body can deal with it, and **immunity** is that ability.\n\nThe two lessons before this one stopped disease from the outside. **P29** counted the hops between people and gave us **R₀**, which is how many people one ill person passes it to. **C29** destroyed the germ on the surface before it could hop. This lesson does something different, and cleverer: it leaves the germ nowhere to hop **to**.\n\n**What you will see:**\n- **Shield**: how strong your **immune** defence is — how quickly your body recognises a germ and deals with it.\n- **People in three states**: **vaccinated** ones, ones who are **immune**, and **vulnerable** ones. To be **vulnerable** is to be able to be harmed — here it means you could still catch it.\n- **Pathogen**: the germ itself, which is what a **pathogen** is.\n- **Herd immunity**: what happens when so many people around are protected that the germ cannot find a chain of people to travel along. A **herd** is a group that moves together, and the idea is that the group ends up protecting the few in it who are not.\n- **Population protection**: how safe everybody is taken together, including the ones who are not protected themselves.\n\n**The two dials:** **immune** strength, and how many people are **vaccinated**.\n\nHere is a puzzle to start with. Chickenpox is usually a once-in-a-lifetime illness. Flu comes back year after year. Why the difference?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'bio_answer', label: 'Because flu keeps changing its shape, so the body\'s old recognition no longer matches it, while chickenpox stays much the same.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'weak_answer', label: 'Because chickenpox is a weak illness and flu is a strong one.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Chickenpox is not weak — it can be nasty, especially in a grown-up. Strength is not what is different between the two.\n\n**It is shape.**\n\nWhen your body meets a germ, it learns the germ by its shape, and builds small catching tools that fit that shape exactly. Those tools are called **antibodies**, and an **antibody** is a shape-matching tool your body builds to grab one particular germ. Like a key cut for one lock — which should sound familiar, because it is the same idea as the receptors in Big Idea 28.\n\nNow the difference:\n\n- **Chickenpox** barely changes its shape from one decade to the next. The antibodies you built at five still fit perfectly at fifty. You meet it again, it is recognised at once, and you never notice.\n- **Flu** changes its shape constantly. Every year the flu going round is a slightly different shape from last year's. Your old antibodies were cut for last year's shape, and they no longer quite fit.\n\nSo you are not losing your immunity to flu. **Flu is changing out from under it.** That is also why there is a new flu jab each year, and only one chickenpox one ever: the target has moved.`,
            options: [
                { id: 'cont', label: 'So my body learns a germ by its shape, and flu keeps changing shape.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly. And there are two quite different ways to be safe from a germ. One protects you. The other protects everybody.\n\n1. **Immune strength** — how fast your own body spots a germ and deals with it. Caught in hours, you never know it happened. Take days, and the germ has time to multiply and to hop to somebody else. **This protects you.**\n2. **How many people are vaccinated** — how much of everyone around you is already protected. **This protects the people who cannot protect themselves**, which is the part worth understanding.\n\nBecause here is the thing about a germ: it cannot get to you through somebody who is immune. It arrives, it finds a body that already knows exactly what it is, and it is finished. **That person is a dead end.**\n\nSo if enough people are dead ends, the germ runs out of road. Not because everybody is protected — because the chain keeps hitting people it cannot get past.\n\nThat is **herd immunity**, and it means something genuinely surprising: a baby too young for a jab, or someone too ill to have one, can be kept safe by the people around them. Their safety is not in their own body at all. It is in everybody else's.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me how my body learns a germ.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Meeting a brand new germ, step by step:**\n\n1. **It gets in.** Through your skin, your lungs or your gut.\n2. **The general guards arrive — minutes.** You have cells that attack anything that does not belong, without knowing or caring what it is. They are your first answer to everything, and they are fast because they never have to work out what they are fighting. A **fever** helps them: turning your whole body up a degree or two makes it harder for many germs to multiply. Feeling shivery and hot is not the illness beating you. It is your body making conditions worse for the germ on purpose.\n3. **The germ is shown around — hours.** Some of those guards tear the germ apart and carry pieces of it about, holding them up for other cells to see. A wanted poster: *this is what we are looking for.*\n4. **The right tool is found — days.** Your body keeps an enormous variety of cells, each able to build a slightly different shape of **antibody**. The poster gets shown around until one of them turns out to match this germ. Nobody designed it for this germ; it was already there, and it was found.\n5. **That one is copied, hard — days.** The matching cell is copied over and over, and each copy pours out antibodies. Those antibodies stick all over the germs, which stops them working and marks them to be cleared away. Now you are winning — and this is usually about the point where you start to feel better.\n6. **Memory is kept — for years.** When it is over, your body does not throw the answer away. It keeps cells that remember this shape, so **immune memory** forms out of the fight itself. That memory, and it is why this lesson has a **cycle** at all: the next meeting starts from step 6 instead of step 1.\n7. **The second meeting — hours, not days.** The same germ arrives and is recognised at once. Antibodies are pouring out before you feel a thing. **This is what being immune actually is** — not never meeting the germ, but beating it so fast you never notice.\n\n**So what is a vaccine?** It is steps 3 to 6 without step 1 doing you any harm. A **vaccine** shows your body the *shape* of a germ — a dead one, a weakened one, or just a piece of one — so that your body goes and finds the matching antibody and keeps the memory, all without your ever being ill. You skip to step 6 and stay there.\n\nThat is why a jab can ache a little for a day. That ache is steps 2 to 5 happening. It is the system working, not going wrong.\n\n**Try it:** raise the vaccinated share slowly and watch the pathogen fade. Find the point where it stops spreading.\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** An illness has **R₀ = 5** — each ill person would pass it to five others. In this town, **70%** of people are **vaccinated**. Has the illness been stopped?`,
            options: [
                { id: 'right', label: 'No. 30% are still vulnerable, and 30% of 5 people is 1.5 — more than 1, so each round is bigger than the last and it still grows.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'Yes — well over half the town is protected, so the illness cannot get anywhere.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `More than half sounds like plenty. It is not, and you can work out why by counting.\n\nAn ill person comes near **5** people. **70%** are protected, so **30%** are still **vulnerable**. How many of those 5 can actually catch it?\n\n**30% of 5 = 1.5 people.**\n\nSo each ill person still passes it on to about one and a half others. And remember P29: anything above **1** grows. One becomes 1.5, becomes 2.25, becomes 3.4. Slower than before — the jabs really did help — but still climbing.\n\nSo what would be enough? Work backwards. You need fewer than **1** of those 5 to be catchable. One in five is **20%** — so fewer than 20% vulnerable, which means **more than 80% protected**.\n\nThat is the whole trick, and there is no formula to remember:\n\n| Illness | Passes it to | So you need fewer than 1 catchable out of... | Protected |\n| --- | --- | --- | --- |\n| Flu | 2 | 1 in 2 | more than **50%** |\n| Covid | 3 | 1 in 3 | more than **67%** |\n| Smallpox | 5 | 1 in 5 | more than **80%** |\n| Measles | 15 | 1 in 15 | more than **93%** |\n\nAnd now look at measles, because it explains something in the news. It needs **93%**. Slip from 95% to 90% — which sounds like almost nothing — and you have crossed the line, and measles comes back. The more easily an illness spreads, the less room you have to slip.`,
            options: [
                { id: 'retry', label: 'So I count how many of the five could still catch it, and I need that below one.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct, and you did it by counting rather than by remembering anything.\n\nAn ill person comes near R₀ people. Only the **vulnerable** ones among them can catch it. If that comes to fewer than **1**, every round is smaller than the last and the illness dies out. If it comes to more than 1, it grows.\n\nWhich is why the **threshold** — the line you have to get past — is different for every illness, and why it is highest for the ones that spread most easily:\n\n| Illness | Passes it to | Protected share needed |\n| --- | --- | --- |\n| Flu | 2 | more than **50%** |\n| Covid | 3 | more than **67%** |\n| Smallpox | 5 | more than **80%** |\n| Measles | 15 | more than **93%** |\n\nTwo things are worth sitting with here. The first is that you never need everybody. The second is the one people find strangest: **being vaccinated protects other people, not only you.** Every dead end you add is a road the germ cannot take to somebody who had no choice in the matter.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** three Big Idea 29 lessons, three ways to break the same chain.\n\n- **P29** removed the hops: fewer **contacts**, so **R₀** falls below 1\n- **C29** destroyed the germ on the surface, given enough strength and enough time\n- **B29** removes the people it could hop to, which is the only one that lasts\n- Your body learns a germ by **shape** and builds **antibodies** to match. Flu keeps changing shape; chickenpox does not\n- **Immune memory** turns a fight of days into a fight of hours, and a **vaccine** builds that memory without the illness\n- **Herd immunity** protects those who cannot be protected themselves. Count how many of R₀ people are still **vulnerable**; get it below 1\n- The easier an illness spreads, the higher the share you need — 67% for one that passes to 3, 93% for measles\n\nContact, chemistry and immunity: three **defenses** against one germ. Physics counts the hops, chemistry kills the germ on the door handle, and biology makes the next person a dead end — which is what finally ends an outbreak.`,
            options: [
                { id: 'done', label: 'Complete B29', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 29 Complete — How Do Diseases Spread and Stop?**\n\n- **Physics (P29): Contact Networks** — **contacts** and crowding set **R₀**, and above 1 an outbreak grows\n- **Chemistry (C29): Germ Busters** — strength and **contact time** together destroy a **pathogen** on a surface\n- **Biology (B29): The Germ Fighters** — **antibodies**, **immune** memory and **herd immunity** leave the germ nowhere to go\n\n**Summary Table:**\n| Defence | What it does | How long it lasts |\n| --- | --- | --- |\n| Fewer contacts | Takes away the chances to hop | Only while people keep it up |\n| Disinfecting | Destroys the germ before it hops | Until the surface is touched again |\n| Your own **immunity** | Beats the germ in hours instead of days | Years, unless the germ changes shape |\n| **Herd immunity** | Leaves no chain of people to travel along | As long as enough stay **vaccinated** |\n\n**Key takeaways:**\n- Being immune is not never meeting a germ — it is beating it before you notice\n- Your body learns a germ by shape, and flu wins by changing shape\n- A **vaccine** teaches the shape without the illness, and the ache afterwards is the learning\n- Count how many of R₀ people are still **vulnerable**; get that below 1 and the illness fades\n- You never need everybody protected — but the more easily it spreads, the closer to everybody you need\n- Your jab is partly for the people who cannot have one\n\n✅ **Lesson B29 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
