import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 4, biology. The synthesis lesson.
 *
 * L2B4 looked at one noticeable change at a time. This removes that
 * simplification by stacking Weber steps: I = I0 (1 + k)^n, solved with a
 * logarithm, n = log(I / I0) / log(1 + k). About 290 loudness steps cover a
 * trillion-fold range, and every ten-fold increase adds the same 24.
 *
 * The middle-ear pressure-gain story was considered and rejected: the popular
 * "22 times" transformer figure double-counts, and impedance belongs to Big
 * Idea 22. The simplification still standing: k is not constant, and Stevens'
 * power law fits direct loudness judgements better.
 *
 * Level 3 theme for Big Idea 4: the power in each law -- square root, fourth
 * power, logarithm.
 */
export function getL3B4Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B4 found that you notice a change only when it is a big enough **share** of what was already there -- about **10%** for loudness.\n\nNow think about the range your ears cope with. Sound carries energy, and its **intensity** is the power arriving on each square metre, in **watts per square metre (W/m²)**.\n\n- The faintest sound a young person can hear: about **10⁻¹² W/m²**\n- A sound loud enough to hurt: about **1 W/m²**\n\nThat is a range of **10¹²** -- a trillion times.\n\nYour ears handle all of it. How many **different** loudnesses can you actually tell apart, from the faintest to the painful?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Only a few hundred. Each noticeable step is a 10% increase, and it takes surprisingly few 10% steps to multiply by a trillion.", nextNodeId: 'stacking', sentiment: 'positive' },
                { id: 'bad', label: "Billions. A trillion-fold range must be sliced into an enormous number of loudness levels.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It would take billions of levels if each noticeable step were a fixed **amount**. A step near the painful end would be the same size as a step near the faintest sound, and a trillion-fold range would be cut into a vast number of thin slices.\n\nBut L2B4 showed that each step is a fixed **share**. Near the faint end, 10% is a tiny amount. Near the loud end, the same 10% is an enormous amount. Steps that grow as you climb cover ground far faster than steps that stay the same size.\n\nThink of savings that grow by **10% every year**. One dollar does not take a trillion years to become a trillion dollars. It takes about **290 years**, because each year's growth is bigger than the year before.\n\nThe same 290 turns up in your ears. Here is where it comes from.",
            options: [
                { id: 'cont', label: "Show me where 290 comes from.", nextNodeId: 'stacking' }
            ]
        },
        stacking: {
            id: 'stacking',
            speaker: 'AI',
            content: "Start at the faintest sound you can hear, and call its intensity **I₀** (say \"I-nought\").\n\nThe first noticeable step up adds a share **k**, L2B4's **Weber fraction**:\n\nafter 1 step: I₀ x (1 + k)\n\nThe next step adds the same share of **that**:\n\nafter 2 steps: I₀ x (1 + k) x (1 + k) = I₀ x (1 + k)²\n\nand after **n** steps:\n\n**I = I₀ x (1 + k)ⁿ**\n\nThe condition belongs here, and it is a big one. **This assumes k stays the same at every level**, from the faintest sound to the loudest. L2B4 warned that Weber's rule works best in the middle of a sense's range. This model stretches it across the whole range, and the end of the lesson comes back to that.\n\nThe question is **how many steps n** it takes to reach a given intensity. n is stuck up in the power. To bring it down, you need a **logarithm**.",
            options: [
                { id: 'cont', label: "What is a logarithm?", nextNodeId: 'logarithm' }
            ]
        },
        logarithm: {
            id: 'logarithm',
            speaker: 'AI',
            content: "The **logarithm** of a number, written **log**, answers one question: **ten to what power gives this number?**\n\n- log 1,000 = **3**, because 10³ = 1,000\n- log 10¹² = **12**\n- log 1.1 = **0.0414**, because 10 to the power 0.0414 is 1.1\n\nThese are base-ten logarithms, the **log** key on a calculator.\n\nOne rule makes them useful: **the log of a power brings the power down in front.**\n\nlog (xⁿ) = n x log x\n\nIt follows from L2C4's rule for powers of ten. Multiplying numbers **adds** their powers of ten, so multiplying x by itself n times adds its power n times.\n\nNow take the log of both sides of I / I₀ = (1 + k)ⁿ:\n\nlog (I / I₀) = n x log (1 + k)\n\nand divide:\n\n**n = log (I / I₀) / log (1 + k)**\n\nThat is **the number of just noticeable steps** between the faintest sound and a sound of intensity I.",
            options: [
                { id: 'cont', label: "Now use it on hearing.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Hearing**, from the faintest sound to the painful: I / I₀ = 10¹², and k = 0.1.\n\nlog 10¹² = 12\nlog 1.1 = 0.0414\nn = 12 / 0.0414 = **290 steps**\n\nA trillion-fold range, and only about **290** loudness steps you can tell apart.\n\nNow a striking consequence. How many steps does it take to make a sound **ten times** as intense?\n\nn = log 10 / log 1.1 = 1 / 0.0414 = **24 steps**\n\n**Every ten-fold increase adds the same 24 steps**, wherever it happens. Going from 10 units of intensity to 100 is the same climb as going from 1,000,000 to 10,000,000.\n\nA sense that turns equal **ratios** into equal **steps** is called **logarithmic**. That is exactly why sound engineers measure loudness on a logarithmic scale to match: the **decibel**, which appears in P45. Every **10 decibels** is ten times the intensity.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** For brightness, **k is about 0.08**. A lamp can be turned up from its dimmest setting to **1,000 times** as bright.\n\nHow many noticeably different brightness steps does it have?",
            options: [
                { id: 'right', label: "About 90. log 1,000 = 3 and log 1.08 = 0.0334, so n = 3 / 0.0334 ≈ 90.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'by_k', label: "About 37.5, because 3 / 0.08 = 37.5.", nextNodeId: 'math_wrong' },
                { id: 'amounts', label: "About 12,500, because the brightness climbs by 999 dimmest-settings, and each step is 0.08 of one.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**37.5** divided by k instead of by **log (1 + k)**. Each step multiplies the brightness by 1.08, so the formula needs the power of ten that makes 1.08. That is log 1.08 = **0.0334**, less than half of 0.08, which more than doubles the answer.\n\n**12,500** treats every step as the same **amount**: 0.08 of the dimmest setting. That is exactly the thinking Weber's rule replaced. Near the bright end, each step is 8% of a much bigger brightness, so far fewer steps are needed.\n\nn = log 1,000 / log 1.08 = 3 / 0.0334 = **about 90 steps**",
            options: [
                { id: 'retry', label: "Divide by log (1 + k), not by k.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Weber Fraction** is k, the share that must be added before a change is noticed. **Intensity Range** is how many times stronger the strongest signal is than the faintest, as a power of ten.\n\nThe lab draws the range on a scale where every ten-fold increase takes the same space, climbs it one just noticeable step at a time, and counts the steps with **n = log (I / I₀) / log (1 + k)**. If the steps are too close together to draw, it shades them in. The last ten-fold increase is shaded too.\n\nStart with hearing: k = **0.10** and a range of **10¹²**. About 290 steps.\n\nThen:\n\n- Halve **Weber Fraction** to 0.05, a sharper sense, and watch the count nearly double\n- Shrink **Intensity Range**, and notice the steps stay **evenly spaced** -- every ten-fold increase holds the same number",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Every ten-fold increase, the same steps. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Using this lesson's model, with **k = 0.1**:\n\n**Change A:** a sound goes from **1 unit** of intensity to **10 units**.\n**Change B:** a sound goes from **1,000 units** to **10,000 units**.\n\nChange B added 9,000 units; Change A added only 9. Which change feels bigger?",
            options: [
                { id: 'right', label: "Neither -- they feel the same. Both multiply the intensity by 10, and every ten-fold increase is the same 24 noticeable steps.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Change B, by far. It added a thousand times as much sound energy as Change A.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Change B really did add a thousand times as much energy. But your ears do not report the energy added. They report it one just noticeable step at a time, and each step is a **share**.\n\n| Change | From | To | Ratio | Steps: log (ratio) / log 1.1 |\n| --- | --- | --- | --- | --- |\n| A | 1 unit | 10 units | x 10 | 1 / 0.0414 = **24** |\n| B | 1,000 units | 10,000 units | x 10 | 1 / 0.0414 = **24** |\n\nThe steps near 1,000 units are a thousand times bigger than the steps near 1 unit, so the same 24 of them cover a thousand times as much energy.\n\nThis is L2B4's rule, stacked up. **Equal ratios feel like equal steps.**",
            options: [
                { id: 'retry', label: "Same ratio, same number of steps.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A sense that notices shares turns equal ratios into equal steps: it is logarithmic.**\n\nThe simplification this lesson removed: **L2B4 looked at one change at a time.** Stacking those changes shows the shape of the whole sense -- about 290 steps covering a trillion-fold range.\n\nThat completes Big Idea 4 at Level 3. Level 2 found that senses work in **ratios**. Level 3 found the **power in each law**, which decides how steeply each answer responds:\n\n- **L3P4** -- v = √(B / ρ): a **square root**, so a hundred times the stiffness gives only ten times the speed\n- **L3C4** -- scattering ∝ 1 / λ⁴: a **fourth power**, so halving the wavelength scatters sixteen times as much\n- **L3B4** -- n = log (I / I₀) / log (1 + k): a **logarithm**, so every ten-fold increase adds the same 24 steps\n\nAnd the simplification still standing. **This model assumes k is the same everywhere, and it is not.** In the 1950s the psychologist **S. S. Stevens** asked people to judge directly how loud sounds seemed. He found loudness grows roughly as intensity to the power **0.3**. By that measure, ten times the intensity sounds about **twice** as loud, because 10 to the power 0.3 is 2.0. Whether perception is truly logarithmic or follows a power law is still argued about -- but both agree that the ear squeezes a trillion-fold range into something the brain can use.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Equal ratios, equal steps!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the shape of a whole sense.**\n\n- Sound **intensity** is power per square metre, in **W/m²**\n- Hearing spans about **10¹²**: from 10⁻¹² W/m² to about 1 W/m²\n- Stacking Weber steps: **I = I₀ x (1 + k)ⁿ**, if k is the same at every level\n- A **logarithm** answers: ten to what power gives this number?\n- **log (xⁿ) = n x log x** brings the power down\n- **n = log (I / I₀) / log (1 + k)** counts the just noticeable steps\n- Hearing: 12 / 0.0414 = **about 290 steps** across a trillion-fold range\n- Every ten-fold increase adds the same **24 steps**\n- A sense that turns equal ratios into equal steps is **logarithmic**\n- The **decibel** scale is logarithmic to match: every 10 decibels is ten times the intensity\n- Still standing: **Stevens** found loudness grows about as intensity to the power **0.3**\n\nBig Idea 4 is complete at Level 3.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "n = log (I / I₀) / log (1 + k)!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Senses That Count in Powers of Ten!**\n\nL2B4 found the rule for one noticeable change. Level 3 stacks those changes and finds the shape of a whole sense.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Intensity | W/m² | Power on each square metre |\n| Stacked steps | **I = I₀ x (1 + k)ⁿ** | Each step a fixed share |\n| Logarithm | ten to what power? | log 1,000 = 3 |\n| Counting steps | **n = log (I / I₀) / log (1 + k)** | Assumes k is constant |\n| Hearing | 12 / 0.0414 = **290** | A trillion-fold range |\n| Ten-fold increase | 1 / 0.0414 = **24** | The same everywhere |\n| Logarithmic sense | equal ratios, equal steps | Why decibels exist |\n| Still standing | loudness ∝ intensity to the 0.3 | Stevens' power law |\n| Big Idea 4 at Level 3 | root, fourth power, logarithm | The power decides the response |\n\n**The one line to remember:** a sense that notices shares climbs in equal steps for equal ratios -- which is how a few hundred steps can cover a trillion-fold range.\n\n**Big Idea 4 is complete at Level 3.**"
        }
    };
}
