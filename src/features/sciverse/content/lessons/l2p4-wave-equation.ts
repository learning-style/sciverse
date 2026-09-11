import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P4 "Sound Waves".
 *
 * P4 showed a sound wave as a travelling push and introduced frequency as
 * pitch. This lesson adds wavelength and the wave equation v = f x lambda, and
 * hangs it on a sensing question: why does a bat squeak so high? A wave only
 * bounces back strongly from things about its own size or larger, so the
 * squeak's frequency is chosen to make its waves moth-sized.
 *
 * Condition stated where the number is introduced: 343 m/s is the speed of
 * sound in air at 20 C, and it changes with temperature and material.
 */
export function getL2P4Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In P4 you watched sound travel down a tube: particles bunching up and spreading out, passing a push along without travelling themselves. You also met **frequency** -- how many waves pass each second -- and found that a higher frequency sounds higher-pitched.\n\nNow a puzzle from the night sky. A **bat** flying in total darkness finds a moth by shouting and listening for the **echo** -- the sound that bounces off the moth and comes back. It shouts at about **50,000 waves every second**, far too high for any human to hear.\n\nYour own voice sits at about **200 waves every second**.\n\nIf you shouted into the dark, could you find a moth by its echo?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Probably not. A low sound must have long waves, and a wave far longer than a moth would flow straight past it instead of bouncing back.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes, as long as you shouted loudly enough. A louder shout would bounce off the moth just as well as a bat's squeak.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Loudness is not the problem. The problem is the **size of the wave** compared with the thing it hits.\n\nThink about water. Long, slow ocean swells roll straight past a thin wooden post as if it were not there. But the tiny ripples from a dropped pebble bounce off that same post clearly.\n\nThe post did not change. The waves did. **A wave bounces back strongly only from something about as big as the wave, or bigger.** Something much smaller than the wave barely disturbs it, so almost nothing comes back.\n\nSo shouting louder just sends a bigger version of the same long wave past the moth. To get an echo from something small, you need **short** waves.\n\nWhich raises the real question: how long is a sound wave, and what decides it?",
            options: [
                { id: 'cont', label: "So what decides how long the waves are?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Three quantities describe a travelling wave, and they are tied together.\n\n**Frequency, f**, is how many waves leave the source each second. It is measured in **hertz (Hz)**, where **1 Hz means one wave per second**. The bat's squeak is 50,000 Hz; your voice about 200 Hz.\n\n**Wavelength, λ** (the Greek letter *lambda*), is the length of one wave: the distance from one bunched-up region of air to the next. It is measured in **metres (m)**.\n\n**Wave speed, v**, is how fast the wave travels, in **metres per second (m/s)**.\n\nNow picture one second of sound. In that second, **f** waves leave the source, one after another, and each is **λ** metres long. Laid end to end, they stretch **f x λ** metres -- and that is exactly how far the sound travelled in one second, which is its speed:\n\n**v = f x λ**\n\nThis is called the **wave equation**. Rearranged to find the wavelength:\n\n**λ = v / f**\n\nOne condition belongs here, not at the end. Sound in air travels at about **343 m/s at 20 °C**. That figure is not fixed: it changes with temperature, and it is very different in water or steel. Level 3 explains why.",
            options: [
                { id: 'cont', label: "Then work out the bat and the voice.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Use **λ = v / f** with the speed of sound in air, **343 m/s**.\n\n**Your voice, 200 Hz:**\nλ = 343 / 200 = **1.7 m**\n\nEach wave of your voice is taller than most adults. A moth a couple of centimetres across is tiny beside it, so your shout flows around it and almost none comes back.\n\n**The bat, 50,000 Hz:**\nλ = 343 / 50,000 = **0.0069 m**, which is about **7 millimetres**\n\nThat is roughly the size of a moth's body. **The bat's squeak is pitched high enough to make its waves moth-sized** -- which is exactly the size needed to get a strong echo back from a moth.\n\nSo the bat is not squeaking high by accident. Frequency and wavelength are locked together by the wave equation, and to sense something small, a bat has to go high.\n\nOne honest note: \"about as big as the wave\" is a rule of thumb, not a sharp cut-off. Echoes fade away gradually as the object gets smaller than the wavelength.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A musical note has a frequency of **686 Hz**. It travels through air at **343 m/s**.\n\nWhat is its wavelength?",
            options: [
                { id: 'right', label: "0.5 m, because λ = v / f = 343 / 686 = 0.5.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'multiplied', label: "235,298 m, because 686 x 343 = 235,298.", nextNodeId: 'math_wrong' },
                { id: 'inverted', label: "2.0 m, because 686 / 343 = 2.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both slips are caught by checking the **units** before trusting the number.\n\nA wavelength is a **length**, so the units of the answer must come out as **metres**.\n\n**Dividing speed by frequency:** m/s divided by Hz. A hertz is \"one per second\", so dividing by it is the same as multiplying by seconds. The seconds cancel, and **metres** are left. That is the right way round.\n\n**Multiplying, 235,298 m**, gives m/s times \"per second\" -- metres per second per second. That is not a length at all. A sense check agrees: a musical note does not have waves over two hundred kilometres long.\n\n**686 / 343 = 2.0** divides the wrong way. Hz divided by m/s gives \"per metre\", again not a length.\n\nλ = 343 m/s / 686 Hz = **0.5 m**\n\nThe habit is the same one from earlier lessons: **decide what unit the answer must have, and make sure the units cancel down to it.**",
            options: [
                { id: 'retry', label: "Check that the units come out as metres.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Frequency** sets how many waves leave the source each second. Each step along it **doubles** the frequency, because pitch is heard in doublings.\n\n**Wave Speed** sets how fast sound travels in whatever it is moving through. Start at **343 m/s** for air.\n\nThe lab draws the waves to scale beside a moth and a person, and shows the wavelength using **λ = v / f**.\n\nTry sliding **Frequency** upwards and watch the waves shrink until they are moth-sized. That is the bat's job.\n\nThen push **Wave Speed** up to about **1,480 m/s**, the speed of sound in water, and keep the frequency the same. The waves get **longer**. A dolphin finding fish by echo underwater has to click even higher than a bat does, just to get the same short waves.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Faster sound means longer waves at the same frequency. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A dolphin wants to find a small fish about **1.5 cm** (0.015 m) across using echoes. Underwater, sound travels at **1,480 m/s**.\n\nWhat is the **lowest frequency** the dolphin can use so that its waves are no longer than the fish?",
            options: [
                { id: 'right', label: "About 99,000 Hz. f = v / λ = 1,480 / 0.015 = 98,667 Hz, using the speed of sound in water.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "About 23,000 Hz. f = v / λ = 343 / 0.015 = 22,867 Hz.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The rearrangement was exactly right: **f = v / λ**. The number put in for **v** was not.\n\n**343 m/s is the speed of sound in air.** The dolphin is underwater, where sound travels about four times faster, at **1,480 m/s**. That is the condition stated when the figure first appeared: the speed depends on what the sound is travelling through.\n\nRedo it with the right speed:\n\nf = 1,480 / 0.015 = **98,667 Hz**, so about **99,000 Hz**\n\nAt 22,867 Hz the dolphin's waves in water would be 1,480 / 22,867 = **6.5 cm** long -- more than four times the size of the fish, so the echo would be weak.\n\nThis is why **the same wavelength needs a higher frequency in water than in air**. Faster sound stretches each wave out, so the dolphin must squeeze more waves into each second to keep them short. Real dolphins click at around 100,000 Hz, which is just what the arithmetic predicts.",
            options: [
                { id: 'retry', label: "Use the speed for the material the sound is in.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **To sense something small with echoes, you need short waves -- and how high you must go depends on the speed of the material.**\n\nPut the whole lesson together:\n\n- **v = f x λ** ties the three quantities together, so **λ = v / f**\n- Higher frequency means shorter waves\n- A wave bounces back strongly only from things about its own size or bigger\n- So bats and dolphins pitch their calls high enough to make waves the size of their prey\n- The speed depends on the material: **343 m/s** in air at 20 °C, **1,480 m/s** in water\n\nNotice that this is a lesson about **ratios**. What matters is not the size of the moth on its own, or the length of the wave on its own, but how one compares with the other. That idea runs through all of Big Idea 4.\n\nLight is a wave too -- and its waves are unimaginably shorter than a bat's squeak. That is why you can see a moth perfectly well without shouting at it. C4 puts numbers on light.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Short waves to sense small things!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You worked out why bats squeak so high.**\n\n- An **echo** is a sound that bounces off something and comes back\n- **Frequency (f)** is waves per second, in **hertz (Hz)**\n- **Wavelength (λ)** is the length of one wave, in **metres**\n- **Wave speed (v)** is how fast the wave travels, in **m/s**\n- The **wave equation**: **v = f x λ**, so **λ = v / f**\n- Sound in air: about **343 m/s at 20 °C** -- it changes with temperature and material\n- A 200 Hz voice has waves **1.7 m** long; a 50,000 Hz bat squeak, about **7 mm**\n- A wave echoes strongly only from things about its own size or bigger\n- Check that the units cancel down to what the answer must be\n- In water sound is faster, so the same short waves need a **higher** frequency\n\nNext in C4: the numbers behind the colours of light.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "v = f x λ -- and short waves find small things!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Why Bats Squeak So High!**\n\nP4 showed you a sound wave and called its frequency pitch. Level 2 measures the wave itself, and finds out why a bat's squeak has to be so high.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Frequency | **f**, in **Hz** | Waves leaving each second |\n| Wavelength | **λ**, in **metres** | The length of one wave |\n| The wave equation | **v = f x λ** | f waves, each λ long, in one second |\n| Finding wavelength | **λ = v / f** | Higher frequency, shorter waves |\n| Sound in air | **343 m/s** at 20 °C | Changes with temperature and material |\n| Your voice | 343 / 200 = **1.7 m** | Too long to echo off a moth |\n| A bat | 343 / 50,000 = **7 mm** | Moth-sized, so it echoes |\n| Sound in water | **1,480 m/s** | Dolphins must click even higher |\n\n**The one line to remember:** a wave can only find things about its own size, so to sense something small you need short waves -- and a high frequency."
        }
    };
}
