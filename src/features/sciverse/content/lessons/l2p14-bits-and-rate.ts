import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P14 "Waves & Signals".
 *
 * P14 turned the letter A into eight on-off pulses. This lesson counts them:
 * n bits make 2^n patterns, so a code needs the smallest n with 2^n at least
 * the number of symbols, and time = total bits / bits each second. Worked on
 * ASCII, a short message and an uncompressed photo.
 *
 * The wave equation belongs to L2P4 and logic gates to P39; this lesson counts
 * patterns and seconds only.
 *
 * Condition stated: every symbol given the same number of bits, and nothing
 * squeezed out. Held fixed and named for Level 3: the message arrived already
 * digital.
 */
export function getL2P14Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P14 sent the letter **A** down a wire as **01000001** -- eight on-off pulses. Each of those pulses is a **bit**: one switch that is either 1 or 0.\n\nEight bits seems a lot for one letter. The alphabet has only 26.\n\nHow many different patterns can you actually make with 8 bits?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Lots -- each bit doubles the count, so it is 2 multiplied by itself 8 times: 256 patterns.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Sixteen: 8 bits, and each one can be 1 or 0, so 8 x 2 = 16.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Count them for a small case and the pattern shows itself.\n\n**One bit:** 0, 1 -- **2** patterns.\n\n**Two bits:** 00, 01, 10, 11 -- **4** patterns. Not 4 because 2 + 2, but because each of the first bit's two choices can be followed by either choice of the second.\n\n**Three bits:** 000, 001, 010, 011, 100, 101, 110, 111 -- **8**.\n\nEvery bit you add gives every existing pattern two futures, so the count **doubles**. That is L2B9's doubling again, and it is multiplication, not addition:\n\n2, 4, 8, 16, 32, 64, 128, **256**",
            options: [
                { id: 'cont', label: "So how do I work out how many bits I need?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two rules, and one unit.\n\n**How many patterns n bits give:**\n\n**patterns = 2ⁿ**\n\n**How many bits a code needs:** pick the smallest **n** whose 2ⁿ is at least as big as the number of different symbols you must send.\n\n| Bits | Patterns | Enough for |\n| --- | --- | --- |\n| 1 | 2 | on or off |\n| 3 | 8 | the notes of a scale |\n| 5 | 32 | the 26 letters |\n| 7 | 128 | letters, digits and punctuation |\n| 8 | 256 | all of those, plus accents |\n\nNow the speed. A link's **bit rate** is how many bits it carries each second, in **bits per second (bit/s)**. To send a message:\n\n**total bits = number of symbols x bits for each symbol**\n\n**time = total bits / bit rate**\n\nOne more unit: **8 bits make a byte**, and a **megabyte (MB)** is a million bytes.\n\nThe condition belongs here. **This assumes every symbol gets the same number of bits, and that nothing is squeezed out.** Real files are usually **compressed** -- common symbols given shorter codes -- which is how a photo shrinks without looking different.",
            options: [
                { id: 'cont', label: "Work some out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A short message.** Send **HELLO** in 8-bit ASCII over an old link that carries **1,000 bit/s**.\n\n**Step 1.** total bits = 5 letters x 8 = **40 bits**\n\n**Step 2.** time = 40 / 1,000 = **0.04 s**\n\n**A photo.** A 12-megapixel picture stores **24 bits** of colour for each pixel -- 8 bits each for red, green and blue, giving 256 levels of each.\n\n**Step 1.** total bits = 12,000,000 x 24 = **288,000,000 bits**\n\n**Step 2.** in bytes: 288,000,000 / 8 = 36,000,000 bytes = **36 MB**\n\n**Step 3.** over a 20 million bit/s connection: 288,000,000 / 20,000,000 = **14.4 s**\n\n| | Symbols | Bits each | Total bits |\n| --- | --- | --- | --- |\n| HELLO | 5 letters | 8 | **40** |\n| 12 MP photo | 12 million pixels | 24 | **288 million** |\n\nA phone photo really is about 3 MB, not 36 -- because it is compressed. The 36 MB is what it would cost with no squeezing at all.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A sensor sends **200 characters** of text, each as **8 bits**, over a radio link that carries **400 bit/s**.\n\nHow long does the message take?",
            options: [
                { id: 'right', label: "4 seconds. 200 x 8 = 1,600 bits, and 1,600 / 400 = 4.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'forgot_bits', label: "0.5 seconds, because 200 / 400 = 0.5.", nextNodeId: 'math_wrong' },
                { id: 'multiplied', label: "640,000 seconds, because 1,600 x 400 = 640,000.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**0.5 s** divided characters by bits per second. The units do not match: the link counts **bits**, so the message has to be measured in bits first -- 8 for every character.\n\n**640,000 s** multiplied where it should have divided. A quick sense check catches it: a faster link should take **less** time, but multiplying makes a faster link take longer.\n\n**Step 1.** total bits = 200 x 8 = **1,600 bits**\n\n**Step 2.** time = 1,600 / 400 = **4 s**\n\nCheck the units: bits divided by bits each second leaves seconds. ✓",
            options: [
                { id: 'retry', label: "Bits first, then divide by the rate.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Bits for Each Symbol** is how many bits the code spends on one symbol. **Bit Rate** is how many bits the link carries each second.\n\nThe lab shows the patterns that many bits can make, the total bits in a 1,000-symbol message, and how long it takes.\n\nTry this:\n\n- Set **8** bits: 256 patterns, and a 1,000-symbol message is 8,000 bits\n- Drop to **5** bits: only 32 patterns -- enough for letters, but not for digits and punctuation -- and the message shrinks to 5,000 bits\n- Add one bit at a time and watch the patterns double: 32, 64, 128, 256\n- Halve the **Bit Rate** and the time doubles",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Every bit doubles the patterns. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Five bits give 32 patterns, which is already more than the 26 letters of the alphabet.\n\nSo why does text on a computer use **7 or 8** bits for each character instead of 5?",
            options: [
                { id: 'right', label: "Because text is far more than 26 letters: capitals and small letters, ten digits, punctuation and a space come to about 95 printable symbols, and 32 patterns cannot cover them. 7 bits gives 128, which is enough, and 8 bits is the size of a byte.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Because 5 bits would be too slow. More bits make a link faster.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "More bits make a message **longer**, not faster. A 5-bit code would be quicker to send, which is exactly why it is tempting.\n\nThe trouble is what it cannot say. Count what ordinary text needs:\n\n| Symbols | How many |\n| --- | --- |\n| small letters | 26 |\n| capitals | 26 |\n| digits | 10 |\n| punctuation and space | about 33 |\n| **total** | **about 95** |\n\n2⁵ = 32 -- not even close. 2⁶ = 64, still short. **2⁷ = 128**, which fits, with room over for invisible instructions like \"new line\".\n\nThat is why ASCII is really a **7-bit** code. It is stored in **8** bits because computers handle memory in bytes of 8, and the spare bit was later used for accented letters and symbols, taking the total to 256.\n\n**A code has to be big enough for everything you might send, not just the first thing you thought of.**",
            options: [
                { id: 'retry', label: "Count all the symbols, not just the letters.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The number of bits is set by how many different things you might need to say: n bits give 2ⁿ patterns, so each extra bit doubles your vocabulary.**\n\nThat is the arithmetic behind every signal P14 showed you. Bits decide how much you can say; the bit rate decides how fast you can say it.\n\nOne thing this lesson held fixed: **the message was already a list of symbols.** But a microphone does not produce symbols -- it produces a smoothly changing wave, like the sine wave on P14's oscilloscope. Level 3 turns one of those into numbers, and finds out how many samples a second it takes before the music survives the trip.\n\nC14 sorted bonds into ionic, polar and nonpolar. C14 at Level 2 finds the number that decides which one you get.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Each bit doubles what you can say!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You counted the bits in a message.**\n\n- A **bit** is one switch: 1 or 0\n- **patterns = 2ⁿ** for n bits -- each extra bit **doubles** the count\n- 1, 2, 3... bits give 2, 4, 8, 16, 32, 64, 128, **256** patterns\n- A code needs the smallest n whose 2ⁿ covers all its symbols\n- **total bits = symbols x bits for each symbol**\n- **time = total bits / bit rate**, in **bits per second**\n- **8 bits = 1 byte**; a **megabyte** is a million bytes\n- HELLO in 8-bit ASCII: **40 bits**, or 0.04 s at 1,000 bit/s\n- A 12-megapixel photo at 24 bits a pixel: **288 million bits = 36 MB**, or 14.4 s at 20 million bit/s\n- 200 characters at 400 bit/s: **4 s**\n- Ordinary text needs about **95** printable symbols, so 5 bits is not enough: ASCII is a **7-bit** code stored in a byte\n- Condition: the same bits for every symbol, with no compression\n- Held fixed: the message arrived already digital",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "2 to the power n!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Many Bits?**\n\nP14 sent a letter as eight pulses. Level 2 counts what those pulses can say, and how long they take.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| A bit | 1 or 0 | One switch |\n| Patterns | **2ⁿ** | Each bit doubles them |\n| Choosing a code | smallest n with 2ⁿ ≥ symbols | 95 symbols need 7 bits |\n| Total bits | **symbols x bits each** | HELLO = 40 bits |\n| Time | **total bits / bit rate** | 1,600 bits at 400 bit/s = 4 s |\n| Bytes | **8 bits = 1 byte** | 288 million bits = 36 MB |\n| A photo | 12 million x 24 bits | 14.4 s at 20 million bit/s |\n| Condition | fixed-length, uncompressed | Real photos are compressed |\n\n**The one line to remember:** n bits make 2ⁿ patterns, so every extra bit doubles what a signal can say -- and the bit rate turns those bits into seconds.\n\n**Up next:** C14 -- the number that decides whether a bond is ionic or covalent."
        }
    };
}
