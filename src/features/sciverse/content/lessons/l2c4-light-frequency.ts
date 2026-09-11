import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C4 "Light & Colour".
 *
 * C4 gave red and violet their wavelengths and said shorter waves mean higher
 * frequency. This lesson turns those wavelengths into frequencies with
 * f = c / lambda, which needs powers of ten, and finds that every visible
 * colour fits inside less than one doubling of frequency.
 *
 * It deliberately avoids spectral lines (Big Idea 22), colour mixing and cone
 * cells (Big Idea 46), and refraction (Big Idea 20). Its theme is the one
 * running through Big Idea 4 at this level: senses are built around ratios.
 */
export function getL2C4Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In C4 a prism split white light into a rainbow, and you met **wavelength** -- red light has waves about **700 nanometres** long, violet about **400**. C4 also said that shorter waves mean a higher **frequency**, just as with sound in P4.\n\nIn L2P4 a bat's squeak reached **50,000 waves every second**.\n\nSo how does red light compare? Does it make more waves per second than a bat's squeak, or fewer?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Vastly more. Light's waves are far shorter than any sound wave, and light travels enormously faster, so both push its frequency up.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "About the same as a bat. Light and sound are both waves, so their frequencies should be in the same range.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Both are waves, and both obey the wave equation from L2P4. But the numbers that go into it could hardly be more different.\n\nFirst, the **speed**. Sound in air travels at 343 m/s. Light travels at about **300,000,000 m/s** -- nearly a million times faster. Light could go around the Earth seven times in one second.\n\nSecond, the **wavelength**. A bat's squeak has waves about 7 millimetres long. Red light's waves are about 700 **nanometres**, and a nanometre is so small that 7 millimetres is **ten thousand times** longer than 700 of them.\n\nL2P4's equation rearranged is **f = v / λ**. A faster speed pushes the frequency **up**, and a shorter wavelength pushes it **up** too. Light has both at once, so its frequency is not in the same range as sound at all.\n\nTo work out how far apart they are, you need a way of writing very large and very small numbers.",
            options: [
                { id: 'cont', label: "How do I write numbers that big and that small?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "With **powers of ten**. Instead of writing out all the zeros, you count them.\n\n- **10⁸** means 1 followed by 8 zeros: 100,000,000\n- **10⁻⁹** means 1 divided by 1 followed by 9 zeros: 0.000 000 001\n\nWriting a number as something times a power of ten is called **scientific notation**. The speed of light is **3 x 10⁸ m/s**.\n\nA **nanometre (nm)** is one billionth of a metre: **1 nm = 10⁻⁹ m**. So 700 nm = **7 x 10⁻⁷ m**.\n\nOne rule makes the arithmetic easy. **When you divide powers of ten, you subtract the powers.** So 10⁸ ÷ 10⁻⁷ = **10¹⁵**, because 8 − (−7) = 15.\n\nNow the wave equation for light. Light's speed has its own letter, **c**:\n\n**c = f x λ**, so **f = c / λ**\n\nThe condition belongs here, not at the end. **3 x 10⁸ m/s is the speed of light in empty space.** In air it is almost exactly the same. In water or glass light is slower and its waves get shorter -- yet its colour does not change, because colour is really set by the **frequency**, and the frequency stays the same.",
            options: [
                { id: 'cont', label: "Now work out red and violet.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Red light, 700 nm = 7 x 10⁻⁷ m:**\n\nf = (3 x 10⁸) / (7 x 10⁻⁷)\n\nSplit it into the ordinary numbers and the powers of ten:\n\n- 3 / 7 = **0.43**\n- 10⁸ ÷ 10⁻⁷ = **10¹⁵**\n\nf = 0.43 x 10¹⁵ = **4.3 x 10¹⁴ Hz**\n\nThat is 430,000,000,000,000 waves every second -- nearly **ten billion times** a bat's squeak.\n\n**Violet light, 400 nm = 4 x 10⁻⁷ m:**\n\n- 3 / 4 = **0.75**\n- 10⁸ ÷ 10⁻⁷ = **10¹⁵**\n\nf = 0.75 x 10¹⁵ = **7.5 x 10¹⁴ Hz**\n\nNow compare the two ends of the rainbow. Violet's frequency divided by red's is 7.5 / 4.3 = **1.74**. **Every colour you have ever seen fits inside less than one doubling of frequency.**\n\nMusicians call a doubling of frequency an **octave**. Your ears hear from about 20 Hz to 20,000 Hz, which is about **ten octaves**. Your eyes see **less than one**. As a range of frequencies, human vision is a remarkably narrow slice.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Green light has a wavelength of **500 nm**. Take the speed of light as **3 x 10⁸ m/s**.\n\nWhat is its frequency?",
            options: [
                { id: 'right', label: "6.0 x 10¹⁴ Hz. 500 nm = 5 x 10⁻⁷ m; 3 / 5 = 0.6 and 10⁸ ÷ 10⁻⁷ = 10¹⁵, so 0.6 x 10¹⁵ = 6.0 x 10¹⁴ Hz.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_convert', label: "600,000 Hz, because 3 x 10⁸ divided by 500 is 600,000.", nextNodeId: 'math_wrong' },
                { id: 'powers', label: "6 Hz, because the powers combine to 10⁸ x 10⁻⁷ = 10¹, and 0.6 x 10 = 6.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two slips, and both come from the powers of ten.\n\n**600,000 Hz** skipped the conversion. The wavelength must be in **metres** before it goes into f = c / λ, because the speed is in metres per second. 500 nm is not 500 metres -- it is 5 x 10⁻⁷ m. A sense check catches it too: 600,000 Hz is only about twelve times a bat's squeak, yet light's waves are ten thousand times shorter than a squeak's.\n\n**6 Hz** used the rule for **multiplying**, where the powers add: 10⁸ x 10⁻⁷ = 10¹. But this is a **division**, so the powers subtract: 10⁸ ÷ 10⁻⁷ = 10¹⁵, because 8 − (−7) = 15. Six waves a second would be slower than a hummingbird's wingbeat.\n\nf = (3 x 10⁸) / (5 x 10⁻⁷) = 0.6 x 10¹⁵ = **6.0 x 10¹⁴ Hz**",
            options: [
                { id: 'retry', label: "Convert to metres, then subtract the powers.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, describing a **sensor** -- an eye, or a camera chip.\n\n**Shortest Wavelength** is the bluest light it can detect. **Longest Wavelength** is the reddest.\n\nThe lab converts both into frequencies with **f = c / λ**, and shows how many doublings of frequency the sensor covers.\n\nStart at **400 nm** and **700 nm**, human vision: a little under one doubling.\n\nThen widen it. Honeybees see down to about **300 nm**, into **ultraviolet** light that is invisible to you -- which is why many flowers that look plain to us carry bold patterns for bees. Night-vision cameras reach well past **700 nm**, into **infrared**.\n\nNotice something as you slide. Moving the short end by 100 nm changes the frequency far more than moving the long end by 100 nm. That is what the checkpoint is about.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The short end moves the frequency more. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two sensors each cover a range **300 nm wide**.\n\n**Sensor A** detects from **400 nm to 700 nm** -- visible light.\n**Sensor B** detects from **700 nm to 1,000 nm** -- infrared, as in a night-vision camera.\n\nDo they cover the same range of **frequencies**?",
            options: [
                { id: 'right', label: "No, Sensor A covers far more. Frequency is c divided by wavelength, so the same 300 nm changes frequency much more at short wavelengths: A spans 7.5 to 4.3 x 10¹⁴ Hz, B only 4.3 to 3.0 x 10¹⁴ Hz.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. Both ranges are 300 nm wide, so both sensors take in the same amount of the spectrum.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The two ranges are the same width **in wavelength**. That does not make them the same width **in frequency**, because frequency is not a straight line in wavelength -- it is **c divided by** the wavelength, an inverse proportion.\n\nWork out the four frequencies with f = c / λ:\n\n| Sensor | Short end | Long end | Width in frequency |\n| --- | --- | --- | --- |\n| A | 400 nm: 7.5 x 10¹⁴ Hz | 700 nm: 4.3 x 10¹⁴ Hz | **3.2 x 10¹⁴ Hz** |\n| B | 700 nm: 4.3 x 10¹⁴ Hz | 1,000 nm: 3.0 x 10¹⁴ Hz | **1.3 x 10¹⁴ Hz** |\n\nSensor A covers about **two and a half times** as much frequency as Sensor B, although both are 300 nm wide.\n\nThe ratios show it as well. A's two ends differ by 700 / 400 = **1.75**. B's differ by only 1,000 / 700 = **1.43**.\n\n**Equal differences are not equal ratios.** The same 300 nm is a big share of a short wavelength and a small share of a long one -- and for light, the share is what sets the frequency.",
            options: [
                { id: 'retry', label: "Same width in nanometres, different widths in frequency.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Equal steps in wavelength are not equal steps in frequency, because f = c / λ.**\n\nThis lesson and L2P4 share one idea, and it is worth saying outright. In L2P4 what mattered was a wave's size **compared with** a moth. Here what matters is how one wavelength **compares with** another: visible light spans a ratio of about **1.75**, less than one doubling, while your hearing spans about ten.\n\n**Senses are built around ratios, not differences.**\n\nB4 takes that one step further, inside your head. When your brain decides whether something got louder, brighter or heavier, it does not look at how much was added. It looks at what share of the original was added.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Ratios, not differences!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You put numbers on the rainbow.**\n\n- Light travels at about **3 x 10⁸ m/s** in empty space -- nearly a million times faster than sound\n- **Powers of ten**: 10⁸ is 1 followed by 8 zeros; 10⁻⁹ is one billionth\n- **Scientific notation** writes a number as something times a power of ten\n- A **nanometre (nm)** is **10⁻⁹ m**, so 700 nm = 7 x 10⁻⁷ m\n- When dividing powers of ten, **subtract** the powers\n- **c = f x λ**, so **f = c / λ**, with λ in **metres**\n- Red, 700 nm: **4.3 x 10¹⁴ Hz**. Violet, 400 nm: **7.5 x 10¹⁴ Hz**\n- Every visible colour fits in less than one doubling -- less than one **octave**\n- Hearing spans about ten octaves\n- Colour is set by frequency, which stays the same when light enters water\n- Equal widths in wavelength are **not** equal widths in frequency\n- Bees see **ultraviolet**; night-vision cameras see **infrared**\n\nNext in B4: why your brain notices the share that changed, not the amount.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "f = c / λ -- and all colour fits in one octave!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- The Numbers Behind the Rainbow!**\n\nC4 gave the colours their wavelengths. Level 2 turns them into frequencies, and finds out how narrow a slice of light you actually see.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Speed of light | **c = 3 x 10⁸ m/s** | In empty space; nearly the same in air |\n| Powers of ten | 10⁸ and 10⁻⁹ | Count the zeros instead of writing them |\n| Nanometre | **1 nm = 10⁻⁹ m** | Convert before dividing |\n| Frequency of light | **f = c / λ** | The same wave equation as sound |\n| Red and violet | 4.3 and 7.5 x 10¹⁴ Hz | Nearly ten billion times a bat's squeak |\n| A narrow slice | violet / red = **1.74** | Less than one octave |\n| Hearing, for comparison | 20 Hz to 20,000 Hz | About ten octaves |\n| Ratios, not differences | 400–700 vs 700–1,000 nm | Same width, 2.5 times the frequency |\n\n**The one line to remember:** light's frequency is its speed divided by its wavelength -- and every colour you have ever seen fits inside less than one doubling of it.\n\n**Up next:** B4 -- why your brain notices the share that changed, not the amount."
        }
    };
}
