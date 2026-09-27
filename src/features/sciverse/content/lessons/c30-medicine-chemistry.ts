import { DialogNode } from '../../types';

/**
 * C30 — Drug Solubility & Controlled Release
 * Big Idea 30: "How Do Medicines Reach the Right Place?"
 *
 * Rewritten for Level 1 (grades 3-5). The first draft ran on polymer swelling,
 * cellulose and polyethylene glycol, ionizable groups staying protonated,
 * dissolution kinetics and pH gradients -- none of which a nine-year-old can
 * use. The chemistry is unchanged: a coating decides when the medicine is let
 * out. Every word the lab prints is still here, each one now explained where
 * the learner first meets it.
 */
export function getC30Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `Some pills are gone a few minutes after you swallow them. Others give out their medicine slowly, all day long. Both are just a powder with a skin around it. So what makes the difference?\n\nThe skin. It is called the **coating**, and choosing it is a chemist's job.\n\n**What you will see:**\n- **Pill cut in half**: the **core** in the middle is the medicine itself. The **coating** is the layer wrapped around it.\n- **Water creeping in**: water soaking through the coating and beginning to dissolve the core. To **dissolve** is to break up and disappear into water, the way sugar vanishes into tea. The whole business of dissolving is called **dissolution** — a long word for a thing you have watched a hundred times.\n- **Blood level line**: how much medicine is in the blood as **time** goes on. The line should climb into the shaded band and stay there.\n- **Therapeutic window**: that shaded band. It is the safe middle — above it there is too much medicine to be safe, below it there is too little to help. Staying inside the window is the whole aim.\n\n**The two dials:**\n- **Solubility** is how easily the medicine dissolves. High solubility means it disappears into water fast.\n- **Coating thickness** is how thick that outer layer is. A thick coating takes water longer to get through.\n\nTogether they set the **release rate** — how quickly medicine is let out of the pill.\n\nHere is the question. Some pills say on the box: do not crush. Why would crushing a pill matter?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'chem_answer', label: 'Crushing wrecks the coating, so all the medicine comes out at once instead of slowly — far too much in one go.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'simple_answer', label: 'Because crushed powder tastes horrible and does not work as well.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `The taste really is horrible, but that is not the reason. The reason is the amount.\n\nA pill built to last all day has a whole day of medicine packed inside it. It is safe only because the coating lets it out a little at a time — a small amount every hour, for twelve hours.\n\nCrush it, and there is no coating left to slow anything down. **All twelve hours of medicine dissolves at once.** That is about twelve times as much as an hour's worth, arriving in one rush, and the blood level shoots straight up out of the safe band.\n\nSo the coating is not wrapping paper. It is the part that makes the pill safe. Chemists call a layer like that a **rate controller**, because a **rate** is how fast something happens, and this layer decides it.`,
            options: [
                { id: 'cont', label: 'So the coating is a safety part, not packaging — it controls how fast the medicine arrives.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `That is exactly it. Two things decide when the medicine gets out, and they are your two dials.\n\n1. **Solubility** — how easily this particular medicine dissolves in the watery fluid inside you. Some medicines dissolve the moment they are wet. Others barely dissolve in water at all, and those ones need help: they dissolve in oil instead of water, so they are mixed with a little oil to get them moving.\n2. **Coating thickness** — how far water has to soak before it reaches the core. Water cannot skip the coating. It has to work through, and a thicker layer simply takes longer.\n\nPut them together and you get the **release rate**:\n- **All at once**: no coating and a medicine that dissolves easily. Help in half an hour, gone soon after.\n- **Slow and steady**: a thick coating. A little medicine every hour, for eight hours or more, which is how one pill covers a whole day.\n- **Not until later**: a coating built to shrug off the stomach and only open further along.\n\nNone of this is a new kind of chemistry. It is sugar dissolving in water — measured carefully, and wrapped on purpose.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me how the coating lets the medicine out.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**From swallowed pill to medicine in the blood, step by step:**\n\n1. **Water arrives.** The watery fluid inside you touches the pill, and the coating starts to soak it up.\n2. **The coating swells.** As it takes in water it puffs up, and tiny gaps open all through it — far too small to see, but big enough for water to travel along. Water **penetrates** the coating, which means it works its way right through.\n3. **Water reaches the core.** It follows those gaps inward until it meets the medicine. A thicker coating means a longer journey, which is why thickness is a dial.\n4. **The medicine dissolves.** It breaks up into pieces too small to see, each one a **molecule** — the smallest piece of something that is still that thing. How fast this happens is the medicine's **solubility**.\n5. **The molecules diffuse out.** They drift back out through the swollen coating into the fluid around it. To **diffuse** is to spread from where there is a lot of something towards where there is less, all on its own, with nothing pushing. That spreading is called **diffusion**.\n6. **It crosses into the blood.** At the gut wall the molecules pass through into the blood, and the **blood level rises** — the amount of medicine in your blood goes up.\n7. **It holds steady.** Your body is clearing old medicine away the whole time. When it leaves as fast as it arrives, the blood level stops climbing and stays put — right inside the **therapeutic window**, which is where you want it.\n\nThose seven steps are the pill's **dissolution cycle** — a **cycle** is a set of steps that comes back round to the start, ready to happen again in the next pill you take.\n\n**The neat part:** the coating works like a tap. A tap does not care how much water is in the tank; it decides how fast water comes out. The coating does not care how much medicine is inside; it decides how fast it leaves.\n\n**Try it:** set a thick coating with a medicine that dissolves easily. Can you keep the line inside the window the longest?\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** Your stomach is full of strong **acid** — a sour liquid, strong enough to dissolve most things. Further along, in the **gut**, the liquid is not sour at all.\n\nSome pills wear a coating chosen so that acid cannot dissolve it, but ordinary non-sour liquid can. Where does that pill open up?`,
            options: [
                { id: 'right', label: 'Further along, in the gut. The coating ignores the stomach acid and only dissolves once it reaches the liquid that is not sour.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'In the stomach, because acid is strong and dissolves things faster.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `It sounds right — acid is strong, so surely it dissolves everything faster. But "strong" is not the same as "dissolves everything".\n\nDissolving is fussy. A thing dissolves in one liquid and sits there untouched in another. Chalk barely moves in water but fizzes away in vinegar. Cooking oil ignores water completely. So a chemist can pick a coating that acid cannot touch, while plain non-sour liquid takes it apart easily.\n\nIn the stomach, that coating just sits there. It protects two things at once: the medicine, which is not meant to come out yet, and the stomach lining, which some medicines would irritate. Then the pill moves along into the gut, the liquid there is not sour, the coating dissolves, and the medicine comes out where it was wanted all along.\n\nThe clever bit is that nobody has to time it. **Your own body is the switch** — the pill opens when its surroundings change.`,
            options: [
                { id: 'retry', label: 'So the coating is picked to react to where it is, not to how long it has been there.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct. And that idea — let the surroundings throw the switch — gives chemists several ways to choose *when* a pill opens:\n\n- **Opened by sourness**: the coating survives sour stomach acid and dissolves where the liquid is not sour.\n- **Opened by time**: the coating simply wears away at a steady rate, wherever it happens to be.\n- **Opened by the body's tools**: your body makes its own tiny tools for cutting food apart. A coating can be built so that only one of those tools can cut it, and only certain places have that tool.\n- **Opened by warmth**: a few coatings soften and let go only when the body is hotter than usual, which is a way of saying "let this out only if there is a fever".`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** a pill is a clock made of chemistry.\n\n- **Solubility** sets how fast the medicine itself can dissolve\n- **Coating thickness** sets how long water takes to get in — so it sets the timing\n- A coating can be chosen to open in one place and not another\n- The **therapeutic window** is the safe middle, and the aim is to stay inside it\n- Letting medicine out slowly beats a big rush followed by nothing\n- Same powder, different coating, and you have a fast pill, a slow pill, or a pill that waits\n\nPhysics moves the medicine along by **diffusion**. Chemistry decides when it is let out. Biology decides which cells answer.`,
            options: [
                { id: 'done', label: 'Complete C30', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 30 — How Do Medicines Reach the Right Place?**\n\n- **Physics (P30): Diffusion Transport** — medicine spreads from crowded places towards emptier ones, and has to cross barriers on the way\n- **Chemistry (C30): Drug Solubility** — how fast it dissolves, and a coating that decides when\n- **Biology (B30): Target Cells** — receptors decide which cells answer, and how strongly\n\n**Summary Table:**\n| Dial | Turned low | Turned high | What it changes |\n| --- | --- | --- | --- |\n| Solubility | Dissolves slowly | Dissolves fast | How quickly medicine is ready to move |\n| Coating thickness | Thin, so water is in quickly | Thick, so water takes its time | How long the pill keeps going |\n| Release rate | A slow, steady trickle | A rush all at once | The shape of the blood level line |\n\n**Key takeaways:**\n- A coating is a tap on the medicine, not wrapping paper\n- Thicker coating, longer wait; easier dissolving, faster start\n- A coating can be chosen to open in one part of the body and nowhere else\n- Crushing a slow pill throws away the very thing keeping it safe\n- The aim is always the same: get into the **therapeutic window** and stay there\n\n✅ **Lesson C30 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
