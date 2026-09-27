import { DialogNode } from '../../types';

/**
 * P28 — Flow & Pressure
 * Big Idea 28: "How Do Body Systems Work Together?"
 *
 * Rewritten for Level 1 (grades 3-5). The first draft named Poiseuille's law,
 * systole, the left ventricle, the aorta, arterioles and hypertension, gave
 * pressures in mmHg unexplained, and stated "blood pressure = cardiac output x
 * total peripheral resistance" in a level that carries no formulas.
 *
 * The fourth-power result is too good to lose, so it stays as arithmetic a
 * ten-year-old can follow: halve the width and about a sixteenth gets through,
 * because 2 x 2 x 2 x 2 = 16.
 */
export function getP28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `Your blood travels along tubes called **blood vessels**. Laid end to end, yours would stretch about **100,000 km** — twice around the world. And one pump the size of your fist pumps blood through all of it, about once a minute, your whole life long.\n\nHow does that even work? Mostly by squeezing.\n\n**What you will see:**\n- **Heart pump**: your heart, squeezing to push blood out.\n- **Blood vessel**: one tube with blood moving along it.\n- **Pressure gauge**: **pressure** is how hard the blood pushes outwards on the walls of the tube. Squeeze a balloon and the air inside pushes harder on the skin of it — that harder push is more pressure.\n- **Flow rate**: how much blood actually gets past a point each second. Pressure is the push; **flow** is what arrives.\n- **Vessel Ø**: the width of the tube, straight across the middle. That measurement has a proper name, the **diameter**, and Ø is the short sign for it.\n\nHere is the question. Your blood has to get from your heart all the way to your toes, uphill much of the time. What pushes it?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'physics_answer', label: 'The heart squeezes, which makes the pressure higher behind the blood than in front of it, and blood moves from the harder push towards the softer one.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'gravity_answer', label: 'Gravity pulls it down to the toes and it finds its way back up.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Gravity does lend a hand going down. But think about the way back up, and about lying flat in bed — no downhill at all — and your blood still goes round perfectly well.\n\nWhat really moves blood is a **difference** in pressure. Your heart squeezes and makes the push strong where the blood leaves it, and by the time blood has been all the way round, the push there is much weaker. Blood always moves from the harder push towards the softer one, whichever way that happens to be.\n\nAnd here is the surprising part: what decides how much blood arrives is not mainly the heart. It is the **width** of the tubes.\n\nSqueeze a tube to half its width and you might expect half as much blood. It is far worse than that. **Only about a sixteenth gets through** — about six drops out of every hundred.\n\nWhy sixteen? Narrowing a tube hurts in four ways at once, and each one halves what gets past: the opening is narrower both across and around, and the blood also has to rub past far more wall for the little room it has left. Halve the width and you halve the flow four times over — 2 x 2 x 2 x 2 = **16**.\n\nThat is why a partly blocked blood vessel is so serious. It does not feel like a small problem to the body, because it never was one.`,
            options: [
                { id: 'cont', label: 'So it is a difference in pressure that moves blood — and the width of the tube matters enormously.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly. Three things decide how much blood gets where it is needed.\n\n1. **Heart rate** — how many times your heart squeezes each minute. Sitting still, about 70. Running hard, up to about 180. More squeezes means more blood pushed out each minute.\n2. **Vessel diameter** — how wide the tubes are. Your blood vessels have muscle in their walls, so they can open wider or squeeze narrower. Wider is easier for blood to get through; narrower is much harder, as you have just seen.\n3. **Pressure** — how hard the blood pushes on the walls. This is what you get when you put the first two together: how hard the heart pushes, against how hard the tubes make it work.\n\nThat last part is worth being careful about, because it is where people go wrong. Narrow tubes do not mean a gentle trickle. They mean the heart's push has nowhere easy to go, so the **pressure climbs**. The word for how hard the tubes make the heart work is **resistance** — how much something resists being pushed through.\n\nToo much pressure, kept up for years, wears out the vessel walls. Too little, and your toes and your brain do not get what they need. So your body is constantly adjusting, and it never asks you about it.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me one trip round the body.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**One trip round, step by step:**\n\n1. **The heart squeezes.** A strong squeeze from the muscular left side sends blood out into the biggest tube of all, in a surge.\n2. **The big tubes stretch.** They are springy on purpose. Each surge stretches them wide, then they spring back and push the blood onward, so the pushing carries on between heartbeats instead of stopping dead. That springy stretch is what you feel as a **pulse** on your wrist.\n3. **The small tubes decide.** Next come tubes narrow enough to need a microscope, with rings of muscle around them. These are the taps of the whole system: squeeze a little and less blood goes that way, relax and more does. This is where your body chooses **who gets blood right now**.\n4. **The tiniest tubes hand things over.** At last the tubes are so fine that their walls are a single cell thick, and the blood is barely creeping. That slowness is the point: there is time for oxygen and food to slip out to the cells, and for waste to come aboard.\n5. **The way back.** Wide, floppy tubes bring blood back to the heart. The push left in it by now is very weak, so these tubes have little one-way flaps inside them, and the squeeze of your leg muscles when you walk about helps the blood upward. Sitting still for hours makes that job harder, which is why long journeys leave your legs feeling heavy.\n6. **Sensors check the pressure.** In the wall of one big vessel near your neck sit **sensors** — parts that measure something and report it. These **detect** the pressure — meaning they notice it and measure it — and send the reading straight to your **brain**.\n7. **The brain adjusts.** If pressure has fallen, your brain speeds the heart up and narrows some vessels. If it has risen too far, it slows the heart and lets vessels widen. That loop, measuring and correcting over and over, is the **pressure–flow cycle**.\n\nYou can catch it happening. Stand up quickly and you sometimes feel a moment of dizziness: your blood sank towards your legs, the pressure at your head dropped, and it takes a second or two for the sensors and your brain to put it right. Your body did not prevent the problem — it noticed and corrected it.\n\n**Try it:** narrow the vessel and raise the heart rate together. Does the flow recover?\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** Your blood vessels squeeze narrower, and your heart keeps pumping just as much blood as before. What happens to the **pressure**?`,
            options: [
                { id: 'right', label: 'It goes up. The same blood is being forced through a tighter space, so it pushes harder on the walls.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'It goes down, because a narrow tube lets less blood through.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Careful — two different things are getting mixed up here. **Flow** is how much blood gets past. **Pressure** is how hard it pushes on the walls. Narrowing the tube sends those two in opposite directions.\n\nYou have felt this in a garden hose. Squeeze the end with your thumb and the water does not dribble out gently. It sprays further than before, because the push behind it has gone up.\n\nSame in you. Your heart is still sending out the same amount of blood every minute, but now it has to force it through a tighter space, so it has to push harder. Less gets through, and it pushes harder while doing it.\n\nThis is why vessels staying narrowed for years is a real problem. Your heart is pushing against too much **resistance** every single beat, and the walls take the strain. That is what high blood pressure means.`,
            options: [
                { id: 'retry', label: 'So narrowing lowers the flow and raises the pressure — those are two different things.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct. Pressure is what you get from the heart's pushing set against the tubes' **resistance**. Narrow the tubes without slowing the heart and the pressure has to rise.\n\nYour body uses this on purpose, every day:\n- **Cold outside?** It narrows the vessels near your skin, so less warm blood goes to the surface where the heat would be lost. This is why fingers go pale in the cold.\n- **Running?** It widens the vessels in your legs, so far more blood reaches the muscles that are asking for oxygen.\n- **Just eaten?** More blood goes to your gut, which is part of why a big meal leaves you sleepy.\n\nThe heart is rarely the clever part. The tubes are, because they choose who gets the blood.\n\nAnd none of this is special to bodies. Water in pipes behaves the same way: how much arrives depends on the push at one end set against how hard the pipe makes it work.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** blood moves because of a difference in pushing, and the tubes are in charge.\n\n- **Heart rate** sets how much blood is sent out each minute\n- **Vessel diameter** sets the **resistance**, and it matters far more than it looks: halve the width and about a sixteenth gets through, because 2 x 2 x 2 x 2 = 16\n- **Pressure** is the heart's push set against that resistance\n- Narrowing raises the pressure and lowers the flow, both at once\n- **Sensors** measure the pressure and your **brain** corrects it, over and over, without you ever deciding to\n- Your body cannot stop pressure changing. It notices, and puts it right — which is why standing up fast can make you dizzy for a second\n\nThe same physics runs water through pipes, oil through engines and blood through you.`,
            options: [
                { id: 'done', label: 'Complete P28', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 28 Complete — How Do Body Systems Work Together?**\n\n- **Physics (P28): Flow & Pressure** — heart rate, vessel width and **resistance** decide how much blood arrives where\n- **Chemistry (C28): Chemical Signaling** — chemical messages in the blood tell distant body parts what to do\n- **Biology (B28): Organ Coordination** — heart, lungs, brain and muscles working as one\n\n**Summary Table:**\n| Dial | Turned low | Turned high | What it changes |\n| --- | --- | --- | --- |\n| Heart rate | About 70 squeezes a minute, resting | Up to about 180, running hard | How much blood leaves the heart each minute |\n| Vessel diameter | Narrow, so high **resistance** | Wide, so low resistance | How easily blood gets through — and this one matters most |\n| Pressure | Too little reaches your brain and toes | Walls take a battering year after year | How hard the blood pushes on the walls |\n\n**Key takeaways:**\n- Blood moves from a harder push towards a softer one, uphill or not\n- Halve a tube's width and about a sixteenth of the blood gets through\n- Narrowing raises the pressure while lowering the flow\n- The small tubes are the taps: they decide which parts of you get blood now\n- **Sensors** and your **brain** keep correcting the pressure, and you never notice unless the correction is late\n\n✅ **Lesson P28 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
