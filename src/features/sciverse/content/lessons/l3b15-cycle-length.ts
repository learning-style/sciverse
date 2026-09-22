import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 15, biology. Closes the Big Idea.
 *
 * Removes L2B15's fixed rates and its un-calculated lag. The losses depend on
 * both populations at once, which is what turns a balance point into a cycle:
 *
 *   change in hares = r N - a N P
 *   change in lynx  = c a N P - m P
 *
 * With r = 0.6, a = 0.03, c = 0.02, m = 0.6 per year, the equilibrium is exactly
 * L2B15's wood -- P* = r/a = 20 lynx and N* = m/(ca) = 1,000 hares -- and
 * L2B15's "fixed catch of 30" turns out to be a x N at N = 1,000. The cycle
 * period near equilibrium is 2 pi / sqrt(r m) = 10.5 years, against the real
 * lynx-hare record of about 10.
 *
 * Still standing: no carrying capacity, a quarter-cycle lag longer than the real
 * record shows, and an amplitude set only by where the wood starts.
 */
export function getL3B15Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B15 found the balance point of a wood: **1,000 hares** and **20 lynx**, with 600 hares born and 600 lost each year. It held one thing fixed to get there -- each lynx catches **30 hares a year**, whatever else changes.\n\nThink about that number for a moment. If the hares doubled to 2,000, every lynx would be tripping over them.\n\nSo can the catch really be a fixed 30?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No -- it must depend on how many hares there are. A lynx hunting in a crowded wood finds more, so the losses depend on both populations at once.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Near enough. A lynx only needs so many hares a year, so the catch is set by the lynx's appetite and the hare numbers hardly matter.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A lynx's **appetite** is capped, certainly. What is not capped is its **success rate**, and at the numbers we are dealing with that is what governs the catch.\n\nAnd this is not a small correction -- it is the difference between a wood that settles and a wood that cycles. Watch what each assumption predicts.\n\n**With a fixed catch of 30** (L2B15): the losses are 30 x P, and the hares are involved only through their births. Nudge the wood off balance and it slides one way until something stops it.\n\n**With a catch that grows with the hares**: the losses are (something x N) x P -- large when **either** population is large. Now each population is reined in by the other, and a nudge sends both round a loop.\n\nL2B15's 30 was not wrong, it was **local**. It is the catch **at 1,000 hares**. Work with 2,000 hares and the same wood gives 60.\n\nSo the fixed catch was a snapshot of a rate, and the rate is what we need.",
            options: [
                { id: 'cont', label: "Give me the rate, then.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two rules, one for each population, written as changes per year. **N** is the number of hares, **P** the number of lynx.\n\n**change in hares = r x N − a x N x P**\n\n**change in lynx = c x a x N x P − m x P**\n\nFour rates, each with units:\n\n- **r** -- how fast hares would grow alone, **0.6 a year** (L2B15's 60%)\n- **a** -- the **meeting rate**: the share of the hares one lynx takes in a year, **0.03 for each lynx**\n- **c** -- how much of a new lynx a caught hare pays for, **0.02**, so **50 hares for each new lynx**\n- **m** -- how fast lynx die without food, **0.6 a year**\n\nThe middle term, **a x N x P**, is the whole point: hares lost need a lynx **and** a hare to meet, so it depends on **both**. And it explains L2B15's 30 at once:\n\n**catch by one lynx = a x N = 0.03 x 1,000 = 30 hares a year** ✓\n\nA snapshot, taken at 1,000 hares.\n\nNow set both changes to **zero** to find where the wood balances:\n\n**lynx at balance: P\\* = r / a = 0.6 / 0.03 = 20 lynx**\n\n**hares at balance: N\\* = m / (c x a) = 0.6 / 0.0006 = 1,000 hares**\n\nExactly L2B15's wood -- reached this time without holding anything still.\n\nThe conditions: **no upper limit on hares** from food or space, **nothing else hunts them**, and the cycle results below hold for **small loops** close to the balance point.",
            options: [
                { id: 'cont', label: "So how long does one lap take?", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Read the equilibrium first**, because it says something odd.\n\n**P\\* = r / a** -- the number of **lynx** depends on the **hares'** growth rate and the meeting rate. Nothing about lynx.\n\n**N\\* = m / (c a)** -- the number of **hares** depends on the **lynx's** death rate and how efficiently they turn hares into lynx. Nothing about hare births.\n\nEach population's resting number is set by the **other** animal's biology. Feed the hares better -- raise r -- and you do not get more hares at balance; you get more **lynx**.\n\n**Now the cycle.** For small loops around that point, the time for one full lap is:\n\n**period = 2π / √(r x m)**\n\n**Step 1.** r x m = 0.6 x 0.6 = **0.36**\n\n**Step 2.** √0.36 = **0.6**\n\n**Step 3.** period = 6.2832 / 0.6 = **10.5 years**\n\nAnd the lag between the two peaks is a **quarter of a lap**:\n\n10.5 / 4 = **2.6 years**\n\n| | Model | The real record |\n| --- | --- | --- |\n| Cycle length | **10.5 years** | about **10 years** |\n| Hares at balance | 1,000 | thousands, varying |\n| Lag, hares to lynx | 2.6 years | 1 to 2 years |\n\nThe cycle length is a genuine hit. Trapping records kept for more than a century show hare and lynx numbers rising and falling on a roughly ten-year beat, and this model -- four rates and a square root -- produces 10.5 without ever being shown the data.\n\nThe lag is a partial hit: the real peaks are closer together than a quarter cycle. That gap is a fair measure of what the model leaves out.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Disease raises the lynx death rate **m** from 0.6 to **1.2 a year**. Everything else is unchanged: r = 0.6, a = 0.03, c = 0.02.\n\nWhat happens to the number of **hares** at balance?",
            options: [
                { id: 'right', label: "It doubles, to 2,000 hares. N* = m / (c a) = 1.2 / 0.0006, so a higher lynx death rate means more hares at balance.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'halved', label: "It halves, to 500 hares, because sicker lynx means a sicker wood all round.", nextNodeId: 'math_wrong' },
                { id: 'unchanged', label: "It stays at 1,000, because nothing about the hares changed.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**500 hares** followed a feeling rather than the formula. Nothing here says a wood is uniformly healthy or unhealthy; the two populations are held in place by each other.\n\n**Unchanged** is the sharpest wrong answer, because it is the intuitive one -- and the formula says the opposite. Look at which letters appear:\n\n**N\\* = m / (c x a)** -- lynx death rate, lynx efficiency, meeting rate. **Not one hare quantity.**\n\n**Step 1.** c x a = 0.02 x 0.03 = **0.0006**\n\n**Step 2.** N\\* = 1.2 / 0.0006 = **2,000 hares**\n\nWhy it works that way: the hare number is whatever it takes to keep the lynx **just** breaking even. Make lynx die faster and it takes **more** hares to sustain them -- so the balance point moves up.\n\nAnd check the other equilibrium while you are here: **P\\* = r / a = 20 lynx**, unchanged, because neither r nor a moved. Sicker lynx, the same number of lynx, and twice the hares.",
            options: [
                { id: 'retry', label: "Read which letters are in the formula.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Hare Growth Rate** sets **r**, and **Lynx Death Rate** sets **m**, both per year. The meeting rate a = 0.03 and the efficiency c = 0.02 stay put.\n\nThe lab plots both populations looping round their balance point, and gives P\\*, N\\* and the period.\n\nTry this:\n\n- **r = 0.6** and **m = 0.6**: the balance point is 1,000 hares and 20 lynx, and one lap takes **10.5 years**\n- Raise **r** to **1.2**: the lynx at balance double to **40**, and the hares do not move at all\n- Raise **m** to **1.2** instead: the hares double to **2,000**, and the lynx stay at 20\n- Raise **both** to 1.2: the balance point becomes 2,000 hares and 40 lynx, and the cycle **quickens** to 5.2 years\n- Drop both to **0.3**: the loop slows to **20.9 years** -- slow rates make long cycles",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Each population is set by the other's biology. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A poison is spread through the wood to reduce the hares. It is indiscriminate: it kills hares **and** lynx.\n\nSay it lowers the hare growth rate **r** from 0.6 to 0.4, and raises the lynx death rate **m** from 0.6 to 0.9.\n\nWork out both balance points afterwards. What has the poison achieved?",
            options: [
                { id: 'right', label: "The opposite of its purpose: hares rise to 1,500 while lynx fall to about 13. N* = m/(ca) depends only on the lynx's rates, so poisoning the lynx raises the hares -- and lowering r cuts the lynx further.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Fewer of both, in proportion. The poison hits both populations, so both balance points drop.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "That is the natural expectation, and the arithmetic refuses it. Do both sums.\n\n**Hares at balance.** N\\* = m / (c a), and only **m** changed:\n\n**Step 1.** N\\* = 0.9 / 0.0006 = **1,500 hares** -- up from 1,000\n\n**Step 2.** Nothing about hare biology enters this line. Poisoning hares does not lower the number of hares at balance.\n\n**Lynx at balance.** P\\* = r / a, and only **r** changed:\n\n**Step 3.** P\\* = 0.4 / 0.03 = **13.3 lynx** -- down from 20\n\n| | Before | After the poison |\n| --- | --- | --- |\n| Hares | 1,000 | **1,500** |\n| Lynx | 20 | **13** |\n\nHalf as many lynx as the wood had before, and fifty per cent **more** hares than when nobody interfered.\n\nThe mechanism is not subtle once you see it. The hares are held down by the **lynx**, and the poison hurt the lynx twice -- directly, and again by thinning the food that sustains them. The hares lose something to the poison too, but they are released from more than they lose.\n\nThis is a real and repeated failure. Broad-spectrum insecticides have produced worse pest outbreaks than the ones they were sprayed to stop, for exactly this arithmetic: the pest breeds back faster than the predator that was keeping it in check.\n\n**When two populations hold each other in place, an action aimed at one of them lands on both -- and the formula, not the intention, says where it lands.**",
            options: [
                { id: 'retry', label: "Poison the predator and you release the prey.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Each population's resting number is set by the other animal's rates, so acting on one of them moves the other -- often the wrong way.**\n\nSo Level 3 removed L2B15's simplifications. **The catch is not fixed** -- it is **a x N**, which made L2B15's 30 a snapshot at 1,000 hares -- and **the lag is no longer just described**: it is a quarter of a lap, and the lap itself is **2π / √(r m)**.\n\nThat closes Big Idea 15. All three lessons at Level 3 removed something that looked like a detail and turned out to carry the behaviour:\n\n- **L3P15** -- the swing is not small. **T = T₀(1 + θ²/16)**, so amplitude is part of the timekeeping, and a clock's enemy is a **changing** swing rather than friction\n- **L3C15** -- the ratio is not just amounts. **Kc = [C]^c[D]^d / ([A]^a[B]^b)**, and those powers decide both the constant and whether squeezing the flask does anything\n- **L3B15** -- the rates are not fixed. **a x N x P** couples the two populations, giving **P\\* = r/a**, **N\\* = m/(ca)**, and a **10.5-year** lap\n\n**How do systems find balance? By opposing flows meeting at a point neither one chooses alone -- and how a system behaves near that point is set by the shape of the maths around it: a square root for the pendulum, powers for the reaction, and a product of two populations for the wood.**\n\n**What is still standing here:** the hares have **no upper limit** -- no food or space caps them, which L3P9's logistic curve would add. The model's quarter-cycle lag is **longer than the records show**. And the size of the loop is set only by where the wood happened to start: nothing in these equations pulls a big cycle down into a small one, which real woods plainly do.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Two pi over the root of r m!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You calculated the cycle.**\n\n- **change in hares = r N − a N P**; **change in lynx = c a N P − m P**\n- **r = 0.6 a year**, **a = 0.03 for each lynx**, **c = 0.02** (50 hares for each new lynx), **m = 0.6 a year**\n- The losses depend on **both** populations, because a loss needs a lynx and a hare to meet\n- L2B15's fixed catch of 30 is really **a x N = 0.03 x 1,000** -- a snapshot at 1,000 hares\n- **P\\* = r / a = 20 lynx**; **N\\* = m / (c a) = 1,000 hares** -- exactly L2B15's wood\n- Each population's resting number is set by the **other** animal's rates\n- Feed the hares better and you get more **lynx**, not more hares\n- One lap: **period = 2π / √(r m)** = 6.2832 / 0.6 = **10.5 years**\n- The lag between peaks is a **quarter lap** = **2.6 years**\n- Real records: about a **10-year** cycle, with a lag of 1 to 2 years\n- Doubling the lynx death rate doubles the hares at balance, to **2,000**\n- An indiscriminate poison gave **1,500 hares and 13 lynx** -- more hares than before\n- Removed: fixed rates, and a lag that was only described\n- Still standing: no carrying capacity, a lag longer than the records, and a loop size set by where you start",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "The catch was never fixed!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Ten Years?**\n\nL2B15 found the balance point. Level 3 times the lap around it.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Hares | **r N − a N P** | Losses need both populations |\n| Lynx | **c a N P − m P** | Fed by meetings, thinned by death |\n| L2B15's catch of 30 | **a x N** at N = 1,000 | A snapshot, not a constant |\n| Lynx at balance | **P\\* = r / a** = 20 | Set by the **hares'** rates |\n| Hares at balance | **N\\* = m / (c a)** = 1,000 | Set by the **lynx's** rates |\n| One lap | **2π / √(r m)** | **10.5 years** |\n| Lag between peaks | a quarter lap | **2.6 years** |\n| Against real records | about 10 years, lag 1-2 | Period hit, lag long |\n| Sicker lynx | m 0.6 → 1.2 | **2,000** hares at balance |\n| An indiscriminate poison | r 0.6 → 0.4, m 0.6 → 0.9 | **1,500** hares, **13** lynx |\n| Removed | fixed rates, described lag | Coupled rates, calculated lap |\n| Still standing | no carrying capacity | And a loop size set by the start |\n\n**The one line to remember:** losses depend on predator and prey together, so each population's resting number is set by the other's biology -- and the lap around that balance point takes 2π divided by the square root of the two turnover rates multiplied.\n\n**Big Idea 15 is complete at Level 3.**"
        }
    };
}
