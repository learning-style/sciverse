import { DialogNode } from '../../types';

/**
 * P29 — Contact Networks
 * Big Idea 29: "How Do Diseases Spread and Stop?"
 *
 * Rewritten for Level 1 (grades 3-5). The first draft gave "transmission rate =
 * contact rate x probability of infection per contact" as a formula, used
 * patient zero, the index case, infectivity, exponential growth and said R0
 * scales linearly.
 *
 * R0 stays, because the lab prints it, and it turns out to be the most
 * teachable idea in the lesson once it is said plainly: how many people one ill
 * person passes it on to. The arithmetic that matters is kept -- a quarter of
 * the contacts turns 4 into 1, and 1 is the tipping point.
 */
export function getP29Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `In 2020 a germ too small to see closed schools all over the world. How can something that tiny travel so far, so fast?\n\nIt does not travel far at all, actually. Each germ only ever makes one short hop — from one person to another standing near them. What makes it spread across the world is that the hop happens again, and again, and again.\n\nFirst, a word for the thing doing it. A **pathogen** is any germ that can make you ill. And when a pathogen gets from one person to another — when it **transmits** — that hop is called **transmission**.\n\n**What you will see:**\n- **Dots**: people. Green means **healthy**, red means **infected** — that is, they have the pathogen now — and blue means **recovered**, meaning they have had it and got better.\n- **Lines between dots**: **contacts**. A **contact** is one person spending time close enough to another for a pathogen to hop across. Not a friendship — just being near.\n- **Population density**: how tightly packed people are in a place. **Density** means how much of something is squeezed into a space, so a crowded city has a high density and a quiet village a low one.\n- **Spread intensity**: how fast the illness is getting about right now. **Intensity** means how strong something is.\n\n**The two dials:** **contacts** (how many people each person is near each day) and **population density**.\n\nHere is the question. Why does an illness usually race through a city faster than a village?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'physics_answer', label: 'Because packed-in people are near far more others each day, and every extra person near you is another chance for the hop.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'dirty_answer', label: 'Because cities are dirtier than villages.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `A pathogen does not care how tidy a place is. What it needs is a **contact** — somebody near enough to hop to. That is all.\n\nSo count the contacts. Someone in a busy city shares a bus, a lift, a classroom, a shop queue: they might come near 50 people before lunch without giving it a thought. Someone in a quiet village might come near 5 people all day.\n\nThat is why the city spreads it faster. Ten times the chances, every single day.\n\nAnd notice what this tells you, because it is the useful part: if **contacts** are what a pathogen needs, then taking contacts away is how you stop it. That works against any pathogen at all — even a brand new one nobody has medicine for yet. You do not need to know anything about the germ to make it harder for it to hop.`,
            options: [
                { id: 'cont', label: 'So it is about how many people you come near, not how clean the place is.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly. Two things set how fast an illness gets about, and they are your two dials.\n\n1. **Contacts** — how many people each person comes near in a day. At a packed concert, over a thousand. At home with your family, maybe four. This is the one people can actually change, and it changes fast.\n2. **Population density** — how tightly packed people are. This sets your contacts before you have made a single choice: on a crowded train you are near forty people whether you wanted to be or not.\n\nPut them together and you get the number this whole lesson turns on. **R₀** — say it "R-nought" — is **how many people one ill person passes it on to, on average**. The screen also calls it the **reproduction number**, because it is counting how many new cases one case makes.\n\nAnd R₀ tells you what is going to happen, just from which side of **1** it sits:\n- **R₀ is 3**: one becomes three, three become nine, nine become twenty-seven. Growing, and getting faster.\n- **R₀ is 1**: one person passes it to one person. It keeps going, steadily, and never grows.\n- **R₀ is below 1**: some ill people pass it to nobody at all. Each round is smaller than the last, and it dies out by itself.\n\nSo the whole job, in every outbreak there has ever been, is to get R₀ under 1. Not to zero. Just under 1.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me how one case becomes an outbreak.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**One case becomes many, step by step:**\n\n1. **One person.** Somebody catches the pathogen. Just one, and they may not feel ill yet.\n2. **They go about their day.** They come near however many people their life brings them near — their **contacts**.\n3. **Some hops succeed, most do not.** Each contact is only a *chance*. Standing closer makes it likelier, staying longer makes it likelier, and some pathogens are simply better at hopping than others.\n4. **The first round.** On average R₀ people are now **infected**. If R₀ is 3, one has become three.\n5. **Round again.** Those three each pass it to three. Nine. Then twenty-seven. Then eighty-one. The newly infected repeat exactly what the first person did, and nobody is behaving differently — the same R₀ is simply being applied to a bigger number each time.\n6. **Then it slows on its own.** Sooner or later many people nearby have already had it. Someone **recovered** cannot catch it again, so a hop towards them is wasted. The number of people still able to catch it — the **susceptible** ones, which means the ones a pathogen can still get — is running out, and fewer remain with every round.\n7. **And it fades.** With too few susceptible people left within reach, the chain breaks.\n\nRound and round, that is the **transmission cycle**, and a **cycle** is a set of steps that comes back to its start.\n\n**Why waiting is so expensive.** Look again at round 5. Starting from one and tripling: 1, 3, 9, 27, 81, 243. Waiting one extra round does not add a few cases — it triples what you were dealing with. This is why anything done early beats the same thing done later. The germ has not changed. The number it is being applied to has.\n\n**Try it:** set a high population density, then bring the contacts right down. Can you stop the spread without moving anybody?\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** An illness has **R₀ = 4** — each ill person passes it to four others. Then everyone cuts their daily **contacts** to a quarter of what they were. What happens to the outbreak?`,
            options: [
                { id: 'right', label: 'R₀ falls to about 1, because a quarter of the contacts means a quarter of the hops: 4 × ¼ = 1. It stops growing, and any further cut makes it shrink.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'It carries on much as before — people are still meeting, so it will still spread.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `People are still meeting, that is true. But do the arithmetic, because it comes out better than you would think.\n\nR₀ was **4** because each ill person came near a certain number of people. Cut those contacts to a quarter and each ill person now passes it to a quarter as many: **4 × ¼ = 1**.\n\nAnd 1 is not just a smaller number. **1 is the tipping point.** At exactly 1 the outbreak stops growing — one ill person, one new case, holding level. Cut contacts a little further and R₀ drops below 1, every round is smaller than the one before, and the thing dies out on its own.\n\nThat is the surprise worth taking away. You never have to stop people meeting. You only have to get R₀ under 1, and the shrinking does the rest of the work for you.\n\nIt is also why closing crowded places helps so much while nobody is ill in them yet. It is not aimed at the people there. It is aimed at the number.`,
            options: [
                { id: 'retry', label: 'So a quarter of the contacts makes a quarter of the hops, and 1 is the line that matters.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct. Halve the contacts and you halve R₀. Quarter them and you quarter it. It follows along in step, which is what makes contacts such a useful thing to change.\n\nAnd every measure you have ever heard of is aiming at exactly this one number:\n- **Staying a bit apart** — fewer hops succeed per contact.\n- **Masks** — fewer hops succeed per contact, again.\n- **Closing crowded places** — fewer contacts to begin with.\n- **Staying home when ill** — the contacts that would have mattered most never happen.\n\nNone of them needs to work perfectly. They are all pushing on the same number, and they add up. Three measures that each take a third off will carry an R₀ of 4 below 1 between them.\n\nWhich is why this is the first thing done in any new outbreak. It works before anyone knows what the pathogen is, and long before there is any medicine for it.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** a pathogen never travels far. It only hops, over and over.\n\n- **Contacts** are what a pathogen needs, and they are the thing people can change quickest\n- **Population density** sets how many contacts you have before you choose anything\n- **R₀** is how many people one ill person passes it to, and it is also called the **reproduction number**\n- Above 1 it grows, at 1 it holds level, below 1 it dies out. Getting under 1 is the whole job\n- R₀ follows the contacts: a quarter of the contacts, a quarter of the R₀\n- Every round multiplies, so acting early beats acting later by a lot — 1, 3, 9, 27, 81\n- It slows by itself once too few **susceptible** people are left in reach\n\nPhysics counts the hops. Chemistry kills the pathogen on surfaces. Biology makes people impossible to hop to at all.`,
            options: [
                { id: 'done', label: 'Complete P29', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 29 — How Do Diseases Spread and Stop?**\n\n- **Physics (P29): Contact Networks** — **contacts**, **population density** and **R₀** decide whether an outbreak grows or fades\n- **Chemistry (C29): Disinfection** — chemicals that destroy a **pathogen** before it can hop\n- **Biology (B29): Immunity** — bodies that cannot be hopped to, so the chain breaks\n\n**Summary Table:**\n| Dial | Turned low | Turned high | What it changes |\n| --- | --- | --- | --- |\n| Contacts | A few people a day | A thousand at a concert | How many chances the pathogen gets |\n| Population density | A quiet village | A packed city | How many contacts you have without choosing |\n| **R₀** | Below 1, so it dies out | 3 or more, so it grows fast | Whether there is an outbreak at all |\n\n**Key takeaways:**\n- A pathogen needs a **contact**; it cannot cross an empty room by itself\n- **R₀** below 1 means each round is smaller than the last\n- Cutting contacts to a quarter cuts R₀ to a quarter: 4 × ¼ = 1\n- Small measures add up, and none of them has to be perfect\n- Every round multiplies, so a week's delay costs far more than a week\n\n✅ **Lesson P29 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
