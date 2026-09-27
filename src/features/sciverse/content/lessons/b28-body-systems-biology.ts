import { DialogNode } from '../../types';

/**
 * B28 — Organ Coordination
 * Big Idea 28: "How Do Body Systems Work Together?"
 *
 * Biology closes the Big Idea: P28 gave the pushing that moves blood, C28 gave
 * the chemical messages, and this lesson shows the two being used together on
 * one job -- getting oxygen to a sprinting leg.
 *
 * Rewritten for Level 1 (grades 3-5). The first draft used chemoreceptors,
 * respiratory and circulatory systems, interdependence and negative feedback.
 * O2 and CO2 stay, because the lab prints both, and are now spelled out.
 */
export function getB28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `You start to run. Within seconds your heart is thumping, you are breathing hard, and your legs are burning. Nobody told those three things to happen. You did not decide any of them. And they all arrived together, in the right order, at the right size.\n\nSeparate body parts, acting like one thing. That is what this lesson is about.\n\nThe two lessons before this one gave you the pieces. **P28** was the pushing: your heart squeezes, and how wide the tubes are decides how much blood arrives where. **C28** was the messages: chemistry put into the blood, heard only by cells wearing the matching **receptor** — a shape that fits one message the way a lock takes one key. Now watch both being used at once.\n\n**What you will see:**\n- **Body parts as circles**: **lungs**, heart, **muscles** and **brain**, the four working together.\n- **Arrows between them**: what each one sends the others — some carrying supplies, some carrying news.\n- **O₂ delivery**: **O₂** is the short way of writing **oxygen**, the part of air your body must have. **Delivery** is how much of it actually reaches the muscles.\n- **CO₂ return**: **CO₂** is short for **carbon dioxide**, the waste gas your cells make while they work. **Return** is that waste being carried back to your lungs to be breathed out.\n- **Coordination**: how well the parts are keeping step. To **coordinate** is to get separate things timed to fit together.\n\n**The two dials:** **breathing** (how fast you breathe) and **heart rate** (how many times a minute your heart squeezes).\n\nHere is the question. Which is the most important part for getting oxygen to a running leg?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'bio_answer', label: 'None of them on its own. Lungs collect the oxygen and the heart moves it — either one alone gets you nowhere.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'heart_answer', label: 'The heart, because it is the pump and the blood is what carries everything.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `The heart matters enormously — but ask one more question about it. The blood is carrying something. Where did that something come from?\n\nThe **lungs**. Oxygen gets into your blood in one place only: the lungs, out of the air you breathe in. Your heart cannot make oxygen. It cannot collect oxygen. It is a pump, and a pump moves whatever it is given.\n\nSo picture each one working alone:\n- **Heart with no breathing.** It pumps hard, round and round, moving blood that has almost no oxygen in it. Busy, and useless.\n- **Breathing with no pumping.** Your lungs fill with beautifully fresh air and the oxygen crosses into the blood sitting there — where it stays, because nothing is carrying it to your legs.\n\nNeither one is the important one. Each is useless without the other, and that is the whole point of this lesson: your body parts **need each other**. Not one of them can do a job by itself.`,
            options: [
                { id: 'cont', label: 'So they need each other — the lungs collect it, the heart moves it, and one without the other is no use.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly. Two things have to rise together when you run, and they are your two dials.\n\n1. **Breathing** — how fast your lungs take fresh air in. More breathing means more **oxygen** crossing into your blood, and more **carbon dioxide** getting out.\n2. **Heart rate** — how many times a minute your heart squeezes. A faster heart means blood goes round more often, so oxygen is **delivered** to your muscles sooner and waste is carried away sooner.\n\nAnd they are **not** two separate controls that you happen to turn at the same time. Your brain raises them together on purpose, because raising only one is nearly worthless.\n\nThink of it as fetching water in buckets. Breathing decides **how full each bucket is**. Heart rate decides **how many buckets arrive each minute**. What your legs get is the two multiplied together — and a fast line of nearly empty buckets delivers about as little as one full bucket a minute.\n\nSo whichever of the two is lagging sets what your muscles actually get. That is a **bottleneck**: the narrow neck of a bottle decides how fast it pours, however wide the rest of it is.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me what happens when I start running.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**You start to sprint. Here is the whole loop, in order:**\n\n1. **Your muscles demand more.** They start burning oxygen fast, and making **CO₂** as waste. Nothing has been sent anywhere yet — your legs have simply started spending.\n2. **The waste builds up in your blood.** Your muscles cannot store it, so it goes straight into the blood, and the amount of **CO₂** there begins to climb.\n3. **Sensors in your brain notice.** Your brain has parts that taste the blood going past, measuring how much waste gas it holds. Rising **CO₂** **signals** the brain — it is the news that your legs are working hard, and notice that nothing sent that message on purpose. **The waste itself is the message.**\n4. **Your brain raises your heart rate.** Nerve signals go to the heart to make it beat faster. This part is the fast, wired kind of message from C28.\n5. **Your brain increases your breathing.** At the same moment, other nerves make you breathe deeper and faster.\n6. **Your lungs do both jobs at once.** More fresh **O₂** crosses into the blood, and the **CO₂** crosses the other way to be breathed out. In and out, in the same breath.\n7. **The blood delivers and returns.** More blood, going round more often, carrying more oxygen out to the legs and more waste back. This is P28's physics doing the work — and your body widens the vessels in your legs at the same time, so that most of the extra blood goes where it is needed rather than everywhere equally.\n8. **The waste falls, and the loop eases off.** With more breathing and more pumping, the **CO₂** in your blood comes back down. The sensors notice **that** too, and the brain eases off. If you stop running, everything settles — which is why you carry on puffing for a minute afterwards, paying off what your legs borrowed.\n\nRound and round, that is the **coordination loop**, and a **loop** is a path that comes back to where it started.\n\nThe best part is what is *not* in that list: you. No step waited for you to decide anything. Your body noticed a change, worked out what was needed, and made it happen.\n\n**Try it:** raise the heart rate to its highest and leave breathing at its lowest. How much oxygen actually reaches the muscles?\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** Someone is exercising. Their **heart rate** goes right up, but their **breathing** stays exactly as slow as it was at rest. Do their muscles get much more oxygen?`,
            options: [
                { id: 'right', label: 'No. Each bit of blood still picks up the same small amount of oxygen, so faster pumping just sends the same low-oxygen blood round more often.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'Yes — the blood is going round faster, so it collects more oxygen on each trip.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Here is the catch. Going round faster does not mean picking up more on each trip. How much oxygen a bit of blood collects in the lungs depends on the air arriving there — and the air arriving there depends on **breathing**, which has not changed.\n\nSo the buckets are going round the line twice as fast, and every one of them is just as empty as before.\n\nIt is worse than useless, in fact. The heart is working much harder — using up oxygen itself, because the heart is a muscle too — to deliver blood that is carrying no more than it was.\n\nThat is the **bottleneck** again. When one step in a chain cannot keep up, speeding up a different step gains you nothing. Your legs get what the slowest step allows.\n\nWhich is exactly why your brain raises both together, every time. It does not try the heart first and see how that goes.`,
            options: [
                { id: 'retry', label: 'So a faster heart cannot make up for slow breathing — the slowest step decides.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct, and it runs the other way too:\n\n- **Fast heart, slow breathing**: plenty of trips, each carrying very little. Your legs go short.\n- **Fast breathing, slow heart**: oxygen crosses nicely into the blood and then sits in your chest, because too little is being carried away.\n- **Both together**: full buckets, arriving often. This is the only one that actually works.\n\nSo your brain never raises one alone. It watches one number — how much waste gas is in your blood — and from that one reading it adjusts both, because both are needed and neither can cover for the other.\n\nThat is what **coordination** really means. Not that the parts are near each other, or connected. It means what one part does is decided by what the others need.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** three Big Idea 28 lessons, one body keeping itself in step.\n\n- **Breathing** decides how much **O₂** gets into your blood; **heart rate** decides how often it is **delivered**. Your muscles get the two multiplied together\n- The slowest step decides the result, so your brain raises both at once rather than one at a time\n- The **CO₂** coming back from your muscles is not just waste — it is the message that tells your brain to act. **No part of you had to decide to send it**\n- Both kinds of message from C28 are used here: fast nerve **signals** to the heart and lungs, and the slow chemical reading of the blood itself\n- P28's physics does the delivering, and widening the leg vessels sends the extra blood where it is wanted\n- A **loop**: your muscles change the blood, the blood tells the brain, the brain changes the body, and that changes the blood back\n\nPhysics moves the blood. Chemistry carries the news. Biology is the four parts — **lungs**, heart, **brain**, **muscles** — behaving as one **integrated** whole, which means joined so completely that they work as a single thing.`,
            options: [
                { id: 'done', label: 'Complete B28', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 28 Complete — How Do Body Systems Work Together?**\n\n- **Physics (P28): Flow & Pressure** — the heart's squeeze and the width of the tubes decide how much blood arrives where\n- **Chemistry (C28): Chemical Signaling** — messages in the blood, heard only by matching **receptors**, and switched off by feedback\n- **Biology (B28): Organ Coordination** — **lungs**, heart, **brain** and **muscles** keeping step without you deciding anything\n\n**Summary Table:**\n| Part | Its one job | What it needs from the others |\n| --- | --- | --- |\n| Lungs | Take **O₂** in, let **CO₂** out | Blood brought to them, or there is nothing to load |\n| Heart | Move the blood round | Oxygen already in that blood, or it moves nothing useful |\n| Muscles | Do the work, make the waste | Both of the above, and more of both when running |\n| Brain | Read the blood and adjust the rest | Honest news, which rising **CO₂** provides by itself |\n\n**Key takeaways:**\n- No body part is the important one; each is useless alone\n- Full buckets arriving often: **breathing** sets how full, **heart rate** sets how often\n- The slowest step decides, so both are raised together\n- The waste gas from your muscles is the message that starts the whole correction\n- **Coordination** means each part's job is set by what the others need\n\n✅ **Lesson B28 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
