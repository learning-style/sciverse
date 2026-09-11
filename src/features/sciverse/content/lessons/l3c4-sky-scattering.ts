import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 4, chemistry.
 *
 * C4 said gas molecules scatter blue light; L2C4 said light crosses air almost
 * exactly as it crosses empty space. This removes that simplification: air
 * barely slows light, but it filters it, with scattering growing as 1 / lambda^4.
 * The fourth power is built from a shaken electron in four steps.
 *
 * Survival along a path is (fraction per thickness)^n, with its no-return
 * condition. The checkpoint turns on the rule's own condition (clouds are
 * white). The simplification still standing: 1 / lambda^4 describes the air,
 * not the eye, which is why the sky is not violet.
 */
export function getL3C4Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In C4 you learned why the sky is blue: tiny gas molecules in the air **scatter** short wavelengths in every direction. To scatter light is to catch it and send it off again in a new direction. None of it is destroyed.\n\nBut C4 never said **how much** more blue is scattered than red.\n\nFrom L2C4: blue light's wavelength is about **450 nm**, red's about **700 nm**. Blue's wave is a bit under two thirds as long.\n\nDoes air scatter blue about one and a half times as strongly as red, in proportion to how much shorter its wave is? Or far more than that?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Far more. The scattering must rise very steeply as the wavelength shrinks, or the sky would only be faintly bluish.", nextNodeId: 'shaking', sentiment: 'positive' },
                { id: 'bad', label: "About one and a half times, in proportion to how much shorter blue's wave is.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is the natural first guess, so test it against the sky.\n\nIf scattering were in proportion, blue would be scattered 700 / 450 = **1.56 times** as strongly as red. Light scattered sideways would be only slightly bluer than sunlight. The sky would be a pale, milky blue-white, and a setting Sun would be only a little yellow.\n\nThe real sky is a deep blue, and a Sun on the horizon can glow deep red. Something much steeper is at work.\n\nTo find it, you need to know what a molecule actually does when light reaches it.",
            options: [
                { id: 'cont', label: "What does a molecule do to light?", nextNodeId: 'shaking' }
            ]
        },
        shaking: {
            id: 'shaking',
            speaker: 'AI',
            content: "Start with what light is: a travelling wave of **electric and magnetic fields**. Its electric part pushes on electric charges. Every molecule of nitrogen or oxygen contains **electrons**, tiny negative charges.\n\n**Step 1.** As a light wave passes, it shakes the molecule's electrons back and forth at the light's own frequency -- L2C4's 10¹⁴ Hz.\n\n**Step 2.** A shaken electron sends out light of its own, in all directions. That is the scattered light. The physics of electricity and magnetism shows that **the power it sends out grows with the square of its acceleration**. (**Acceleration** is how quickly speed changes, from L2P1.)\n\n**Step 3.** How does the acceleration depend on frequency? Wave your hand side to side across the same width, first slowly, then **twice as often**. Each swing now takes half the time, so your hand moves **twice as fast** -- and it has to stop and reverse **twice as often**. Twice the speed, changed in half the time: **four times the acceleration**. Acceleration grows as **f²**.\n\n**Step 4.** Put steps 2 and 3 together. Writing **∝** for **is proportional to**:\n\nscattered power ∝ (acceleration)² ∝ (f²)² = **f⁴**\n\nSince f = c / λ, that is the same as **1 / λ⁴**. This is **Rayleigh scattering**, after Lord Rayleigh, who worked it out in 1871.\n\nThe condition belongs here, and it has two parts. **The particle must be much smaller than the wavelength**, so all its electrons are shaken together. And **the light must be well below the frequencies the molecule absorbs**, so the electrons swing the same width at every frequency, as your hand did. An air molecule is about **0.3 nm** across, over a thousand times smaller than visible light's waves, and air absorbs only far into the ultraviolet. For air, both parts hold.",
            options: [
                { id: 'cont', label: "So how much more is blue scattered?", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Compare **blue, 450 nm**, with **red, 700 nm**. Scattering goes as 1 / λ⁴, so the shorter wave wins by the ratio of the wavelengths to the fourth power -- with the longer wavelength in the numerator:\n\n(700 / 450)⁴ = 1.556⁴\n\nSquare it, then square again: 1.556² = 2.42, and 2.42² = **5.86**\n\nAir scatters blue light about **5.9 times** as strongly as red. Not 1.56 times: the fourth power turns a modest difference in wavelength into a large difference in scattering.\n\n**Violet, 400 nm**: (700 / 400)⁴ = 1.75⁴ = **9.4 times** red.\n\nThe fourth power is steep. **Halve the wavelength and the scattering rises 2⁴ = 16 times.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** How many times as strongly does air scatter **green light, 525 nm**, as **red light, 700 nm**?",
            options: [
                { id: 'right', label: "About 3.2 times. 700 / 525 = 1.333; 1.333² = 1.78, and 1.78² = 3.16.", nextNodeId: 'survival', sentiment: 'positive' },
                { id: 'no_power', label: "About 1.33 times, because 700 / 525 = 1.33.", nextNodeId: 'math_wrong' },
                { id: 'flipped', label: "About 0.32 times, because (525 / 700)⁴ = 0.32.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**1.33 times** is the ratio of the wavelengths with the fourth power left out -- the in-proportion guess the lesson opened by testing. Scattering goes as **1 / λ⁴**, so the ratio must be raised to the fourth power.\n\n**0.32 times** did use the fourth power, but upside down. It says green is scattered **less** than red, when green has the shorter wave and must be scattered **more**. Because λ is in the denominator of 1 / λ⁴, the **longer** wavelength goes in the numerator of the ratio: red's wavelength over green's.\n\n(700 / 525)⁴ = 1.333⁴ = **3.16**",
            options: [
                { id: 'retry', label: "Longer over shorter, to the fourth power.", nextNodeId: 'survival' }
            ]
        },
        survival: {
            id: 'survival',
            speaker: 'AI',
            content: "Now follow the Sun's beam down through the air.\n\nCall the thickness of air straight above your head **one overhead thickness**. A Sun directly overhead shines through one. A low Sun's light comes in at a slant and crosses more: about **2** when the Sun is 30° above the horizon, and about **38** when it sits on the horizon.\n\nClean air scatters about **3.6% of red light (700 nm)** out of the beam in each overhead thickness. Blue is scattered 5.86 times as strongly: 5.86 x 3.6% = **21%**.\n\nSo the fraction surviving one thickness is:\n\n- Red: 100% − 3.6% = **0.964**\n- Blue: 100% − 21% = **0.79**\n\nEach further thickness takes the **same share of whatever is left**, so the fractions multiply:\n\n**fraction surviving = (fraction per thickness)ⁿ**, for **n** thicknesses\n\nThe condition: this assumes light scattered out of the beam **never returns** to it. A little does -- part of the glow around a low Sun -- so the answer is slightly pessimistic. It is also for clean air; dust and haze scatter more.\n\n**The Sun on the horizon, n = 38:**\n\n- Red: 0.964³⁸ = **0.25** -- a quarter gets through\n- Blue: 0.79³⁸ = **0.00013** -- about one part in 8,000\n\nCompared with how much of each set out, red arrives about **2,000 times** as strongly as blue. That is why a setting Sun glows red.",
            options: [
                { id: 'cont', label: "Let me change the path through the air.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Wavelength** is the colour of the light, in nanometres. **Air Path** is how many overhead thicknesses of air the beam crosses -- **1** for a Sun straight overhead, **38** for a Sun on the horizon.\n\nThe lab works out the share scattered in each thickness, **3.6% x (700 / λ)⁴**, then the fraction that survives the whole path. It draws the beam fading as it crosses each thickness in turn, and the Sun shows the red, green and blue light that gets through.\n\nTry this. Leave **Wavelength** at 450 nm and slide **Air Path** from 1 up to 38. Then do the same at 700 nm. The blue beam fades long before the red one.\n\nThen watch the Sun as the path grows: nearly white overhead, then yellow, orange, and finally red.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Blue is gone long before red. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A cloud is made of water droplets about **10,000 nm** across.\n\nUsing the **condition** on the 1 / λ⁴ rule, why are clouds **white** rather than blue?",
            options: [
                { id: 'right', label: "The rule only holds for particles much smaller than the wavelength. A 10,000 nm droplet is far bigger than any visible wave, so it scatters all colours about equally, and all colours together look white.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Droplets do scatter blue 5.9 times as strongly, but a cloud is close to us, so the blue has too little distance to build up.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Distance is not what makes the sky blue. You see scattered light **directly**, from wherever it was scattered. If a cloud's droplets favoured blue 5.9 times over, the cloud would look blue however close it was.\n\nThe real reason is the **condition** on the rule. Rayleigh's 1 / λ⁴ holds for particles **much smaller than the wavelength**, where all the electrons are shaken together, in step.\n\n| Scatterer | Size | Compared with 500 nm light | Scattering |\n| --- | --- | --- | --- |\n| Air molecule | 0.3 nm | about 1,700 times smaller | **1 / λ⁴** -- blue far more |\n| Cloud droplet | 10,000 nm | 20 times bigger | all colours about equally |\n\nIn a droplet far bigger than the wave, different parts are shaken out of step, and the steep dependence on wavelength disappears. **All colours scattered equally look white.** Fog and milk are white for the same reason.",
            options: [
                { id: 'retry', label: "The rule's condition fails for big droplets.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **1 / λ⁴ holds only for scatterers much smaller than the wavelength** -- air molecules, not cloud droplets.\n\nHere is the simplification this lesson removed. **L2C4 said light crosses air almost exactly as it crosses empty space.** For its speed, that is true. But air is not empty. It steadily scatters light, and it scatters short wavelengths far more than long ones. What reaches your eye has been **filtered** by the air on the way.\n\nAnd the simplification still standing. By 1 / λ⁴, violet (9.4 times red) out-scatters blue (5.9 times). **So why is the sky not violet?**\n\nBecause 1 / λ⁴ describes only what the **air** does to light. It says nothing about how much of each colour sunlight contains to begin with -- **less violet than blue** -- or how sensitive your eyes are to each colour, which is **far less to violet**. The colour you see depends on the air, the Sun and your eyes together, and the result is blue.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The air filters the light before I see it!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the power law that colours the sky.**\n\n- To **scatter** light is to send it off in a new direction, not destroy it\n- Light's electric field shakes a molecule's **electrons** at the light's frequency\n- A shaken electron sends out power in proportion to its **acceleration squared**\n- Acceleration grows as **f²**, so scattered power ∝ **f⁴** ∝ **1 / λ⁴**: **Rayleigh scattering**\n- Condition: particles **much smaller than the wavelength**, light below the absorbed frequencies\n- Blue (450 nm) is scattered **5.9 times** as strongly as red (700 nm); violet **9.4 times**\n- Halve the wavelength and the scattering rises **16 times**\n- Survival along a path: **(fraction per thickness)ⁿ**, if scattered light never returns\n- On the horizon (38 thicknesses): a quarter of red gets through, about one part in 8,000 of blue\n- Cloud droplets are bigger than the wavelength, so clouds are **white**\n- The sky is blue, not violet, because of sunlight and your eyes, not the air",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "1 / λ⁴ -- the fourth power that colours the sky!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- The Fourth Power That Colours the Sky!**\n\nC4 said air scatters blue. Level 3 found out how steeply, why, and when the rule stops working.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Scattering | light sent in a new direction | Not absorbed, not destroyed |\n| Shaken electron | power ∝ acceleration² | It sends out light of its own |\n| Acceleration | ∝ f² | Twice as often, four times as hard |\n| Rayleigh scattering | ∝ f⁴ ∝ **1 / λ⁴** | For particles much smaller than λ |\n| Blue against red | (700 / 450)⁴ = **5.9** | Why the sky is blue |\n| Along a path | **(fraction per thickness)ⁿ** | If scattered light never returns |\n| Sunset | 0.25 red, 0.00013 blue | Why the setting Sun is red |\n| Clouds | droplets bigger than λ | All colours equally: white |\n| Still standing | sunlight and eyes | Why the sky is not violet |\n\n**The one line to remember:** air scatters light as one over the wavelength to the fourth power -- so blue fills the sky, and red is what is left in the beam.\n\n**Up next:** B4 -- how a sense covers a trillion-fold range with a few hundred steps."
        }
    };
}
