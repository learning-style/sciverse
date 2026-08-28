import { DialogNode } from '../../types';

export function getB43Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Push a wheelchair up a gentle slope and you barely notice it. Push up a steep one and within about twenty seconds your arms are burning, your heart is thumping and you are breathing hard.\n\nSame person, same wheelchair, same distance travelled.\n\nWhat has changed **inside your body**?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Steeper means more force from your muscles, so they burn energy faster and your heart and lungs have to work harder to keep up.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Nothing changes inside -- a steep ramp just needs more willpower and determination.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Willpower cannot deliver oxygen! What changes is real, measurable and happening in three body systems at once.\n\nOn a slope, part of your weight pulls you backwards, and your **muscles** have to push against it every single stroke. A steeper slope means **more force per push**.\n\nMuscles are not free. To make force they burn the **glycogen** you met in **B37**, and burning it needs **oxygen**. So the moment your arms work harder:\n\n- Your **heart rate** climbs to pump blood and oxygen faster\n- Your **breathing rate** climbs to load that oxygen in\n- If demand outruns supply, waste builds up and your muscles start to **fatigue** -- that burning feeling\n\nThat is why a steep ramp is exhausting and a gentle one is not.",
            options: [
                { id: 'cont', label: "So the ramp is really a test of my muscles, heart and lungs?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! A ramp puts three **body systems** to work together, which is the same teamwork you met in **B28**:\n\n1. **Muscular** -- arms and shoulders push, and a steeper slope needs more force each push\n2. **Circulatory** -- the **heart** beats faster to deliver oxygen to those muscles\n3. **Respiratory** -- **breathing** speeds up to take that oxygen in\n\nThere is a second half to this. **Strength** gets you started, but **endurance** gets you to the top. A short steep ramp may be possible in one hard burst. A long steep ramp asks your muscles to keep that up, and **fatigue** decides it long before your strength does.\n\nAnd bodies differ. Muscle strength and lung capacity vary with **genes**, age, training and health conditions, and they change across your life. A slope one person barely notices can be impossible for another.\n\nSo a ramp guideline is really a **biology** guideline: it keeps the effort inside what a wide range of real bodies can sustain. The usual rule is about **1 metre of ramp for every 12 centimetres of height**.\n\nIn the picture you can change the **ramp slope** and watch three things move together: the **push force** your muscles need, your **heart rate** in beats per **minute**, and your **breathing** in **breaths** per minute. When the effort gets high the picture warns that muscles will tire **quickly**. The **people served bar** shows how many could manage this ramp **alone**.\n\nSlide **Ramp Slope** and see what it does to the body!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me see what different slopes do to the body!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A ramp is built exactly to the gentle 1-in-12 guideline. But it climbs a whole storey in one unbroken **30 metre** run, with nowhere flat to stop.\n\nWhy might that still leave people unable to use it?",
            options: [
                { id: 'right', label: "Even gentle effort adds up -- without a flat landing to rest, muscles fatigue before the top.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It cannot be a problem, because the slope already meets the guideline.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Meeting the slope rule handles the **force** each push needs. It does nothing about how **long** you have to keep pushing.\n\nMuscles working steadily use energy faster than the blood can resupply it. Waste products build up, and **fatigue** grows the whole way. On a 30 metre climb that means dozens of strokes with no recovery, and someone with less **endurance** simply stops partway -- stuck on a slope, which is worse than not starting.\n\nThat is why real guidelines add a second rule: a **flat landing** every few metres, so muscles can recover before the next stretch. It is the same **rest and repair** idea from **B42**, just on a scale of seconds.\n\nStrength gets you moving. Endurance gets you to the top.",
            options: [
                { id: 'retry', label: "Oh -- effort adds up over distance, so people need places to rest!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **A ramp has to fit the body's limits, not just the building's shape.**\n\n- **Muscles** supply the force, and a steeper slope demands more of it\n- The **heart** and **lungs** must keep those muscles supplied with oxygen\n- **Fatigue** decides long climbs, so flat landings matter as much as the slope\n- Strength and **endurance** vary hugely between people and across a lifetime\n\nAll three lessons of Big Idea 43 now line up:\n- **P43** -- a longer stop means a smaller **force** on the body\n- **C43** -- crushable materials deliver that longer stop\n- **B43** -- design has to stay inside what real muscles, hearts and lungs can do\n\nEvery one of them is really about protecting a body from a force it cannot handle.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Design has to fit what bodies can actually sustain!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered what a ramp does to your body!**\n\n- A steeper slope needs **more force per push** from your **muscles**\n- Muscles burn **glycogen**, and burning it needs **oxygen**\n- So your **heart rate** and **breathing rate** both climb\n- When demand outruns supply, muscles **fatigue** and burn\n- **Strength** starts a climb; **endurance** finishes it, so long ramps need flat landings\n- Muscle strength and lung capacity vary with **genes**, age and training\n\nP43 softened the force, C43 chose the material, and B43 showed the body that has to cope with both!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "A ramp is a workout for three body systems!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 43 -- B43 Complete!**\n\nDesigned for Everyone -- How Do We Design for Safety and Accessibility?\n\nSafety and accessibility are both about keeping forces inside what a body can take.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Steeper needs more force | **Muscles** work harder each push | That is why steep ramps exhaust you |\n| Heart and breathing speed up | **Circulatory** and **respiratory** systems supply oxygen | Three systems working together |\n| Long climbs cause **fatigue** | **Endurance**, not just strength | Ramps need flat landings to rest |\n| Bodies vary and change | **Genes**, age, training, health | One slope is not one experience |\n\n**Big Idea 43 connections:**\n- P43 (Softening the Blow) showed that a longer stop means a smaller force on the body\n- C43 (Materials That Protect) showed how crushable foam delivers that longer stop\n- B43 (Designed for Everyone) showed the muscles, heart and lungs that have to cope, and why design must stay inside their limits!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
