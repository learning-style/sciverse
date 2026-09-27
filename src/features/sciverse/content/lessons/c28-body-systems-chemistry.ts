import { DialogNode } from '../../types';

/**
 * C28 — Chemical Signaling
 * Big Idea 28: "How Do Body Systems Work Together?"
 *
 * Rewritten for Level 1 (grades 3-5). The first draft used desensitization,
 * downregulation, graded responses, beta cells, blood glucose concentration,
 * tolerance and neurotransmitters. The insulin story survives, because it is a
 * genuinely good one once told in plain words: sugar arrives, a message goes
 * out, the cells open their doors.
 *
 * Gland, hormone, signal, receptor, response, feedback, inhibits, trigger and
 * target all stay -- the lab prints every one of them.
 */
export function getC28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `Your brain is in your head. Your heart is in your chest. When you get a fright, your heart speeds up almost at once — so a message got from one to the other. How?\n\nSome messages go along nerves, like wires. But your body has a second way of sending word, and it is chemistry: put the message **into the blood** and let it travel everywhere.\n\n**What you will see:**\n- **Gland**: a **gland** is a body part whose job is making something and letting it out. This one makes the message.\n- **Signal molecule**: the message itself. A **signal** is anything sent to tell something else what to do, and here the signal is a **hormone** — a chemical message carried in your blood. A **molecule** is the smallest piece of something that is still that thing.\n- **Target cell**: the cell the message is meant for. **Target** means the one being aimed at.\n- **Receptors**: shapes on the outside of that cell. A **receptor** only fits one kind of message, the way one lock takes one key. A cell with no matching receptor never hears the message at all.\n- **Response**: what the cell does once it gets the message. Because it happens inside a cell, the screen calls it the **cellular response**.\n\nHere is the question. Nerves are much faster than blood. So why bother with chemical messages at all?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'chem_answer', label: 'Because blood goes everywhere. One message in the blood reaches the whole body at once, while a nerve only reaches wherever it is wired to.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'speed_answer', label: 'There is no good reason — nerves are faster, so chemical messages are just the slow leftover way.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Nerves really are much faster. But fast is not the only thing worth being, and the two ways of sending word are good at different jobs.\n\nA nerve is a wire. It is quick, and it goes to exactly one place — which is wonderful when you want to move one finger, and useless when you need to tell your **whole body** something at once. You have no wire to every cell in you.\n\nA chemical message needs no wires. It goes into the blood, and your blood visits everywhere, so every cell gets offered the message. Only the cells with a matching **receptor** act on it. It is a shout to the whole room, where only some people are listening for their name.\n\nThere are two more things a chemical message can do that a nerve cannot:\n- **It can be sent by amount.** A little message means a small change; a lot means a big one. The sender picks how much.\n- **It can last.** A nerve signal is over in less time than a blink — a few **milliseconds**, and a **millisecond** is a thousandth of a second. A chemical message can keep working for minutes or hours.\n\nSo your body keeps both. Nerves for fast and exact. Chemistry for everywhere and for a while.`,
            options: [
                { id: 'cont', label: 'So nerves are for speed and aim, and chemical messages are for reaching everywhere and lasting.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly. And how big an effect a message has comes down to two things — one chosen by the sender, one by the receiver. They are your two dials.\n\n1. **Signal strength** — how much of the message the **gland** puts into the blood. More message means more of it bumping into receptors, so a bigger **response**. This is the sender's choice, and it is not all-or-nothing: your body can send a little or a lot, and get a little or a lot back.\n2. **Receptor sensitivity** — how many receptors the target cell is wearing. A cell covered in receptors catches plenty of the message and answers strongly. A cell with only a few catches very little, and barely answers.\n\nThat second one deserves a moment, because it is easy to miss. **The receiver gets a vote.** Two cells sitting in the very same blood, with the very same amount of message going past, can answer completely differently — because one is covered in receptors and the other is not.\n\nAnd a cell can change its own number of receptors. If a message has been shouting at it all day, it quietly takes some receptors off its surface so the shouting matters less. That is the cell turning its own volume down.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me a real message being sent.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**A real one, start to finish. You set this off every time you eat.**\n\n1. **Something changes.** You finish a meal, and the amount of sugar in your blood goes up. Sugar is fuel, and your cells need it — but it has to get out of your blood and into them.\n2. **A gland notices.** A **gland** near your stomach is watching your blood sugar all the time. It **detects** the rise, which means it notices and measures it.\n3. **The message goes out.** The gland releases its **hormone** into the blood. The more sugar it found, the more message it sends — the amount is the point, not just the fact.\n4. **The blood carries it.** Within a minute or two it has been everywhere in you. Every cell is offered it.\n5. **Receptors bind the signal.** Cells that need sugar — muscle cells especially — are wearing matching receptors, and the message locks into them. To **bind** is to take hold and stay.\n6. **The response triggers.** Inside those cells, being bound sets off a change: doors open in the cell's surface and sugar comes in from the blood. To **trigger** something is to set it off, the way pulling a trigger fires at once rather than gradually.\n7. **Feedback shuts it off.** Now the sugar in your blood is falling, because the cells are taking it in. The gland is still watching, sees the level coming down, and sends less message. Less message, fewer doors open, and the whole thing eases off by itself.\n\nThat last step has a name worth knowing: **feedback**. Feedback is when the *result* of an action loops back and changes the action itself. Here the result — less sugar — makes the gland send less message. We say the falling sugar **inhibits** the gland, and to **inhibit** something is to hold it back or slow it down.\n\nRound and round: message, response, result, less message. That is the **signal–response cycle**, and a **cycle** is a set of steps that comes back to its start.\n\nWithout feedback, the gland would keep shouting after the job was done and your blood sugar would crash right through the floor. Feedback is what makes it stop at about the right place.\n\n**Try it:** send a strong signal to a cell with very few receptors. Does a loud message help?\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** A cell takes some of the **receptors** off its surface. The amount of hormone in the blood does not change at all. What happens to that cell's **response**?`,
            options: [
                { id: 'right', label: 'It gets weaker. Fewer receptors catch less of the message, so less of it is heard — even though just as much is going past.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'It stays the same — the receptors that are left just work harder to make up for it.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `A receptor cannot work harder. That is the thing about it. Each one holds one message molecule and sets off one response, and that is all it can ever do. There is no extra effort available to it.\n\nSo if a cell has half as many receptors, it catches about half as much of the message, and its response is about half as big. The hormone going past is unchanged. The cell simply hears less of it.\n\nThink of a radio aerial. Take half the aerials off and each one left is working exactly as well as before — but the radio is quieter, because less of the signal is being caught.\n\nAnd cells do this **deliberately**. If a message has been loud for a long time, a cell removes some receptors to protect itself from being shouted at non-stop. It is the cell turning its own volume down, and it is why the same amount of hormone can have a big effect one week and a small one the next.`,
            options: [
                { id: 'retry', label: 'So a receptor can only do one job, and having fewer means hearing less.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct. A cell sets how loudly it hears by choosing how many **receptors** to wear.\n\nSo every chemical message in you has two hands on the volume knob:\n- **The sender** picks how much message to put into the blood.\n- **The receiver** picks how many receptors to catch it with.\n\nThat is a lot of control from a fairly simple idea, and it explains something you may have noticed. Take a medicine every day for a long time and it can slowly stop working as well. Nothing has gone wrong with the medicine. The cells have quietly removed some of the receptors it works through, because a message that never stops is one they turn down.\n\nSame message. Same amount. Different answer — because the receiver changed its mind.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** your body talks to itself by putting chemistry in the blood.\n\n- A **gland** makes the message; the blood takes it everywhere; only cells with matching **receptors** hear it. Messages sent this way are **hormones**\n- **How much** is sent decides how big the answer is — it is never simply on or off\n- **How many receptors** a cell wears decides how much of the message it hears, so the receiver has a say too\n- **Feedback** is the result looping back to change the cause: falling blood sugar **inhibits** the gland that started it, which means it holds it back\n- Nerves are fast and go to one place; chemical messages are slower, reach everyone, and last much longer\n- A cell can turn its own volume down by removing receptors, which is why a message that never stops stops being heard\n\nPhysics moves the blood that carries the message. Chemistry is the message. Biology decides who is listening.`,
            options: [
                { id: 'done', label: 'Complete C28', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 28 Complete — How Do Body Systems Work Together?**\n\n- **Physics (P28): Flow & Pressure** — heart rate, vessel width and resistance decide how much blood arrives, and the blood is what carries every chemical message\n- **Chemistry (C28): Chemical Signaling** — a **hormone** in the blood, a matching **receptor** to catch it, and **feedback** to stop it\n- **Biology (B28): Organ Coordination** — heart, lungs, brain and muscles keeping step\n\n**Summary Table:**\n| Way of sending word | How fast | How far | How long it lasts |\n| --- | --- | --- | --- |\n| Along a nerve | A few **milliseconds** — thousandths of a second | Only where the nerve is wired | Gone almost at once |\n| Chemical message in the blood | A minute or two | Everywhere blood goes, so everywhere | Minutes, sometimes hours |\n\n**Key takeaways:**\n- One message in the blood reaches the whole body; only matching **receptors** hear it\n- The sender chooses how much, so the answer can be small or large\n- The receiver chooses how many receptors, so it sets its own volume\n- **Feedback** turns the sender down once the job is done — without it, nothing would stop\n- Your body keeps nerves *and* chemistry because they are good at different things\n\n✅ **Lesson C28 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
