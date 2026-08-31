import { DialogNode } from '../../types';

export function getB50Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Back in B48 you found out something awkward. To know whether wildlife is doing better or worse, you must count **the same way, every year, for decades** -- because the moment you change your method, your new numbers cannot be compared with your old ones.\n\nThat is punishingly hard for people. Volunteers move away. Funding stops. The person who knew how it was always done retires.\n\nA satellite does it for forty years without even trying. Why is it so good at this?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It is the same machine taking the same measurement of the same places, over and over, so nothing about the method ever changes.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Because satellites can see the animals directly from space and simply count them from up there.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "No satellite can see an animal. Not one.\n\nEven the sharpest ones show a whole car as a small handful of dots, and almost every animal is smaller than a car, moves about, and spends much of its life hidden under trees or under water.\n\nSo satellites do not count animals. **They measure the places animals live.**\n\nHow green a forest is. How far that forest stretches, and whether its edge is creeping inwards. What week the leaves come out in spring. Where the ice sits and how early it melts. How warm the surface of the sea is.\n\nAnd here is why that matters so much. It is the same machine, in the same orbit, measuring the same thing, every few days, for decades. Nobody gets bored. Nobody retires. Nobody quietly changes the method.\n\n**It is exactly the thing B48 said was so hard, done automatically.**",
            options: [
                { id: 'cont', label: "So they measure the habitat rather than the animals?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! And how useful the picture is depends on the **detail**.\n\nEvery satellite picture is made of tiny **dots**, and each dot covers a real patch of ground. That patch is what decides what you can see.\n\n**Each dot covering 1,000 metres:** you see whole forests, deserts and seas. Enough to watch a forest turn green across a whole country in spring.\n\n**Each dot covering 30 metres:** you see individual fields, and a new road being cut through a forest.\n\n**Each dot covering 1 metre:** you can pick out single trees.\n\nBut remember P50, because the trade-off is waiting for you here too. The sharpest pictures come from **low** satellites, and low satellites whizz past and may not return for days. Fine detail costs you frequent looks.\n\nWhat has all this actually shown us? Forests shrinking, and in some places growing back. Spring arriving earlier than it used to. Deserts spreading in one place and greening in another. Ice at the poles melting sooner each year.\n\nSlide **Picture Detail** and see what each dot size lets you spot!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me change the detail!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A team wants to know whether spring leaves are appearing **earlier** than they did forty years ago, right across a whole country.\n\nWhich satellite should they use?",
            options: [
                { id: 'right', label: "One that looks at the whole country every few days, even if each dot covers a big patch of ground -- because what they need is many looks over many years, not fine detail.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The sharpest satellite there is, because a sharper picture always gives you a better answer.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Ask yourself what is actually being measured here. It is not the size of anything. It is a **date** -- the week the country turns green.\n\nTo catch a date you need to be **looking often**. If your satellite passes over twice a month, spring could arrive and you would only know it happened somewhere in a two-week gap. Repeat that for forty years and your answer is far too blurry to spot a change of a few days.\n\nNow use the coarse satellite instead. Each dot covers a thousand metres, so you cannot see a single tree -- but you do not care about single trees. You care about a whole country turning green, and that is enormous. And this satellite looks **every single day**, so you can name the week precisely.\n\n**Match the satellite to the question, not to what sounds most impressive.** For a date, frequent beats sharp.",
            options: [
                { id: 'retry', label: "Oh -- for a date you need frequent looks, not fine detail!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **The right satellite is the one that fits the question.**\n\nAnd with that, the three lessons come together.\n\n- **P50** decided **where** to put it -- low for detail, high for never looking away, and a **trade-off** you cannot escape\n- **C50** made it **last** -- a metal box, a heat blanket wrapped round it and special glass over the wings, against roasting, freezing and fierce sunlight, with spare **solar panels** for the years of fading\n- **B50** decided **what to ask it** -- not \"how many animals\", but \"how is their home changing\"\n\nAnd look how far back this reaches. B48 said a trend needs the same measurement, year after year, for decades. B49 said healing land takes decades to show. Satellites are how we actually watch both -- a forest regrowing, a mine site slowly greening over, spring creeping earlier -- measured the same way every year, from 400 kilometres up, whether anyone is paying attention or not.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Match the satellite to the question!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how we watch life from space!**\n\n- No satellite can see an animal -- they are too small and too hidden\n- Satellites measure **the places animals live** instead\n- How green a forest is, how far it stretches, when leaves come out\n- The same machine, same orbit, same measurement, for decades\n- That is exactly the unchanging method a **trend** needs\n- Pictures are made of **dots**, and each dot covers a patch of ground\n- 1,000 metres a dot shows whole forests; 1 metre a dot shows single trees\n- Sharp pictures come from low satellites, which return rarely\n- **Match the satellite to the question**\n\nSatellites have shown us shrinking forests, earlier springs and melting ice -- which is how they **help life on Earth**!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Satellites measure the home, not the animals!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**B50 Complete -- Watching Life from Space!**\n\nSatellites cannot see a single animal, and yet they are the best tool we have ever had for watching what happens to life on Earth.\n\n**Summary Table:**\n| Lesson | Key Idea | What It Gave You |\n| --- | --- | --- |\n| **P50** Eyes in the Sky | Height is a **trade-off** | Low for detail, high for never looking away |\n| **C50** Built for Space | Materials chosen for 20 years | Metal box, **heat blanket**, glass wings; spare panels |\n| **B50** Watching Life from Space | Measure the **home**, not the animals | The same measurement, every year, for decades |\n\n**The big idea:** a satellite is a patient machine that measures the same thing the same way for forty years -- which is exactly what B48 told you a **trend** requires, and exactly what people find hardest to do.\n\n**Big Idea 50 complete -- and that is the whole of Level 1!** Fifty big questions, from why things fall to how we watch a whole planet breathe.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
