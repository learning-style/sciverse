import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 23, physics. P23 opens by asking why bridges
 * fail after many small loads and names fatigue five times. This answers that.
 *
 * An earlier draft of this lesson was about stress concentration at a notch --
 * K = 1 + 2a/b -- which is engineering-level for this age and, worse, answered the
 * other half of P23's question while leaving the repeated-loads half untouched. It
 * is kept whole in docs/level4/.
 *
 * The everyday version is a paperclip. One bend does nothing you can see; a handful
 * snaps it. So the damage is real, invisible, and it adds up. The quantity is the
 * number of bends a wire survives, and it falls steeply with how far you bend:
 *
 *   life = 4 x (90 / bend angle)^3 bends
 *
 * anchored on one measured point and stated as a rule of thumb, because it is. The
 * useful consequence is that halving the bend multiplies the life by about eight,
 * and below about 12 degrees the wire survives any number of bends at all -- the
 * fatigue limit, which is the number bridges are designed under.
 *
 * Still standing: the cube is fitted, not derived, and the lesson says so. And
 * nothing here says WHAT the invisible damage is -- Level 3 does.
 */
export function getL2P23Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Take a paperclip and bend it once. Nothing happens -- straighten it and it looks exactly as it did.\n\nBend it back and forth a few more times and it **snaps**.\n\nThat is strange if you think about it. The bend that broke it was no harder than the first one. If one bend does no damage, how can six of them break the wire?\n\nP23 asked exactly this, in its very first line: **why do bridges and materials sometimes fail after many small loads?** It called the answer **fatigue** and left it at that, which names the thing without letting you predict anything.\n\nAnd there is something to predict here, because the number of bends is not random. Bend a paperclip right over and you get a handful. Bend it gently and you can keep going for hundreds. **The number of bends a wire survives is a quantity**, and it depends on how far you bend it in a way that is worth knowing.\n\nYour two dials are the two things that decide whether the wire is still in one piece.\n\n- **Bend Angle**, in degrees -- how far you bend it each time.\n- **Bends So Far**, simply how many times you have done it.\n\nSo, before any arithmetic. If one bend leaves no mark you can see, and six bends break it, what must the first five have been doing?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Damaging it in some way you cannot see — the damage is adding up quietly until there is not enough wire left to hold.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Nothing — the wire is fine until the last bend, which must be the one that finally goes too far.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That would be a reasonable account if the last bend were different from the others. It is not -- and you can test that in about ten seconds.\n\nBend a fresh paperclip to the same angle, once. It survives. **So that bend is not enough to break a paperclip.** Yet it breaks one that has already been bent five times. The bend did not change. The wire did.\n\nAnd you can see the change if you look at the right thing. Bend a clip back and forth near the breaking point and feel it: it gets **warm**, and it gets **harder to bend** than it was at the start. Something inside the metal is being worked over and over, and it is not springing back the way it did.\n\nThen look at the broken ends. A wire snapped in one go pulls out into a point first -- it necks down and tears. A wire broken by bending snaps **flat and suddenly**, with a dull patch where the crack grew slowly and a bright patch where the last of it let go all at once.\n\n**Two different-looking breaks mean two different things happened.** The flat dull patch is damage that was there before the final bend -- a crack, growing a little with every cycle, far too small to see.\n\nSo a paperclip does not fail because a bend was too big. **It fails because the bends were too many**, and that is a completely different kind of failure from anything a single load can do.",
            options: [
                { id: 'cont', label: "So how many is too many?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "It depends on the angle, and far more steeply than you would guess.\n\nHere is the rule, and the first thing to say about it is what kind of rule it is. **This is a rule of thumb fitted to measurements, not something derived.** Somebody bent a great many wires and wrote down what happened:\n\n**life = 4 x (90 / bend angle)³ bends**\n\nThe **4** is the anchor: a steel paperclip bent right over to 90° goes in about four bends. The **cube** is the shape of the curve. **The condition:** it is for this kind of steel wire, and it only holds above the limit in the next paragraph.\n\nWork the cube and the consequence is dramatic:\n\n| Bend | Life |\n| --- | --- |\n| 90° -- right over | **4 bends** |\n| 60° | 14 |\n| **45° -- half as far** | **32** |\n| 30° | 108 |\n| 20° | 364 |\n| 15° | 864 |\n\n**Halving the bend multiplies the life by about eight.** Not by two -- by eight, because the angle is cubed. That is the single most useful thing in this lesson: a small reduction in how hard something is worked buys an enormous increase in how long it lasts.\n\n**And then it stops.** Below about **12°** a steel wire does not break at all, however many times you bend it -- not in thousands of bends, not in millions. That cut-off is called the **fatigue limit**, and it is a real property of steel rather than a limit of anyone's patience.\n\nSo there are two regimes, and the difference matters more than any number: **above the limit, every bend uses up part of a life. Below it, the bends are free.**",
            options: [
                { id: 'cont', label: "Work one out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**You bend a paperclip to 45° and you have done it 16 times. Is it about to go?**\n\n**Step 1 -- how long it should last at that angle.**\n\nlife = 4 x (90 / 45)³ = 4 x 2³ = 4 x 8 = **32 bends**\n\n**Step 2 -- how much of that you have used.**\n\n16 / 32 = **half of its life**\n\nSo it is halfway. It looks perfectly fine, it feels nearly fine, and it has about **16 bends left**.\n\n**Check Step 1 against something you know.** At 90° the rule gives 4 x (90/90)³ = 4 bends, which is the measured anchor it was built from ✓. And the 45° answer is eight times that, which is the halving rule.\n\n**Now the comparison that makes the point.** Suppose instead you had been bending it to **30°** -- only fifteen degrees gentler:\n\nlife = 4 x (90 / 30)³ = 4 x 27 = **108 bends**\n\nAfter the same 16 bends you would have used 16 / 108 = **15%** of its life, with ninety-two bends in hand.\n\n**Same wire. Same number of bends. Half-dead against barely touched**, and the only difference is fifteen degrees.\n\nThat is why the useful question about anything that flexes repeatedly is never *how strong is it?* but **how hard is it being worked?** A wire bent gently outlasts an identical wire bent firmly by a factor you would not believe until you cube it.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** You bend a wire to **60°**.\n\nAbout how many bends does it last?",
            options: [
                { id: 'right', label: "About 14 — life = 4 × (90/60)³ = 4 × 1.5³ = 4 × 3.375.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'linear', label: "About 6, because 60° is two thirds of 90° so it should last about half again as long as 4.", nextNodeId: 'math_wrong' },
                { id: 'inverted', label: "About 1, because a bigger angle means a shorter life and 60 is bigger than 4.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**\"About 6\"** treats the rule as proportional. It is not -- the angle is **cubed**, and that is the whole point of the rule. Going from 90° to 60° is a factor of 1.5 on the angle and **1.5³ = 3.375** on the life.\n\n**\"About 1\"** has compared the angle with the number of bends, which are different quantities and cannot be compared at all. Check the direction instead: a **gentler** bend must last **longer**, so going from 90° down to 60° must give a number **bigger** than 4.\n\n**4 x (90/60)³ = 4 x 3.375 = 13.5, so about 14 bends.**\n\nAnd this is worth doing slowly, because cubes are genuinely hard to feel. A third off the angle nearly **quadruples** the life. Two thirds off -- 90° down to 30° -- multiplies it by twenty-seven.\n\nIt is the same arithmetic that catches people out everywhere a cube appears: a pizza twice as wide has four times the area, a balloon twice as wide holds eight times the air. **Our intuition is built for proportion, and nature keeps using powers.**\n\nSo when you are told that reducing something by a modest amount makes a large difference to how long it lasts, that is usually not sales talk. It is a cube.",
            options: [
                { id: 'retry', label: "The angle is cubed, and gentler must mean longer.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Bend Angle** and **Bends So Far**.\n\n| Bend | Life | After 10 bends | After 30 | After 100 |\n| --- | --- | --- | --- | --- |\n| 90° | 4 | **snapped** | snapped | snapped |\n| 60° | 14 | 74% used | **snapped** | snapped |\n| 45° | 32 | 31% used | 94% used | **snapped** |\n| 30° | 108 | 9% used | 28% used | 93% used |\n| 20° | 364 | 3% used | 8% used | 27% used |\n| **below 12°** | **never** | 0% | 0% | 0% |\n\nRead down the first column and the steepness is obvious. Read **across** and something less obvious appears: at 90° the wire is gone before you have really started, and at 20° you could sit there all afternoon.\n\n**The bottom row is the one engineers care about.** Below the fatigue limit the wire is not slowly using itself up -- it is using up **nothing**. A million bends leave it exactly as it started.\n\nSo a bridge is not designed to survive a known number of lorries. It is designed so that an ordinary lorry flexes it **below the limit**, where the count does not matter. The whole design problem is to stay in the bottom row.\n\nAnd that reframes what \"strong enough\" means for anything that moves. A paperclip holding a stack of paper will last for ever -- it is barely flexing. The same paperclip being fiddled with in a meeting is dead in a minute. **The load that breaks something is often not the big one. It is the small one, repeated.**\n\nWhich is why this failure is so dangerous in real structures: nothing looks overloaded, every single load is comfortably safe, and the thing fails anyway.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The small load, repeated. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A bracket on a machine keeps cracking after a few months. An engineer tests it and finds that the largest force it ever sees is only a quarter of what the bracket can hold in one go.\n\nTheir manager says the test proves the bracket is strong enough and the cracks must be a manufacturing fault. What is wrong with that?",
            options: [
                { id: 'right', label: "A single-load test cannot detect fatigue. The bracket is strong enough for any one load and is being flexed over and over, so what matters is whether each flex is above the fatigue limit — not whether it is below the breaking load.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing is wrong — if the force never gets close to the breaking load, something else must be causing the cracks.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The test is honest and the conclusion does not follow, which is exactly what makes this trap so common.\n\nThe test answers the question **\"will one load break it?\"** The bracket is failing from a different cause entirely, so a test of the first question tells you nothing about the second.\n\nGo back to the paperclip, because the numbers are the same shape. A paperclip bent to 45° is nowhere near breaking in one bend -- you could bend it there once and walk away, and nothing would happen. **It still dies in 32 bends.** If you had tested that paperclip by bending it once and declaring it fine, you would have been right about the test and wrong about the paperclip.\n\nSo the manager's reasoning proves only that the bracket will not fail on its **first** cycle. The thing to measure instead is whether each flex is above or below the **fatigue limit** -- and if it is above, how many flexes the bracket gets in a day. A quarter of the breaking load, several times a minute, for months, is an enormous number of cycles.\n\n**\"It never gets near the breaking load\" is not a defence against fatigue. It is a description of fatigue**, which is precisely the failure that happens at loads nothing would survive.\n\nAnd the fix follows from the cube. You do not need a bracket four times stronger. **Flex it a little less** -- stiffen it, shorten it, support it -- and the life goes up by the cube of whatever reduction you manage.",
            options: [
                { id: 'retry', label: "A single-load test cannot see a failure that needs many loads.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. The test answers *\"will one load break it?\"* and the bracket is failing from a different cause, so it tells you nothing. A paperclip at 45° is nowhere near breaking in one bend and still dies in 32.\n\n**\"It never gets near the breaking load\" is not a defence against fatigue -- it is a description of fatigue**, which is the failure that happens at loads nothing would survive on its own.\n\nAnd the fix follows from the cube: not a bracket four times stronger, but one that **flexes a little less**. Stiffen it, shorten it, support it, and the life rises by the cube of whatever reduction you manage.\n\nSo you can now do what P23 only named:\n\n| | P23 said | L2P23 says |\n| --- | --- | --- |\n| Why many small loads fail things | it is called **fatigue** | invisible damage that **adds up** |\n| How you know damage is real | -- | the same bend breaks a used wire and not a fresh one |\n| How long it lasts | not asked | **life = 4 x (90/angle)³** bends |\n| A 45° bend | -- | **32 bends**, and 16 of them is halfway |\n| Halving the bend | -- | **eight times** the life |\n| Below about 12° | not mentioned | the **fatigue limit**: the bends are free |",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The small load, repeated!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You answered P23's first line.**\n\n- One bend of a paperclip leaves no mark, and six bends snap it -- so the first five must have done **damage you cannot see**\n- And you can prove the wire changed rather than the bend: **the same bend breaks a used clip and not a fresh one**\n- The wire gets **warm** and **harder to bend**, and the broken ends show a dull patch where a crack grew slowly beside a bright patch where the last of it went at once. **Two different-looking breaks mean two different things happened**\n- **life = 4 x (90 / bend angle)³ bends** -- a **rule of thumb fitted to measurements**, not derived, anchored on a paperclip bent right over going in about **4** bends\n- **Halving the bend multiplies the life by about eight**, because the angle is **cubed**. A third off the angle nearly quadruples it\n- So **45° gives 32 bends**, and after 16 of them the clip is **halfway** through its life while looking perfectly fine\n- Fifteen degrees gentler -- **30°** -- gives **108**, so the same 16 bends have used only **15%**. Same wire, same bends, half-dead against barely touched\n- **Below about 12° a steel wire never breaks at all**, however many bends. That is the **fatigue limit**\n- So there are **two regimes**: above the limit every bend spends part of a life, below it **the bends are free** -- and a bridge is designed to stay in the second\n- **The load that breaks something is often not the big one; it is the small one, repeated** -- which is why this failure is so dangerous: nothing looks overloaded and it fails anyway\n- A single-load test **cannot see it**. \"It never gets near the breaking load\" is not a defence against fatigue, it **is** fatigue\n- And the fix follows the cube: not four times stronger, but **flexing a little less**\n- Removed: P23's \"fatigue\", a name with nothing attached to it\n- Still standing: the **cube is fitted, not derived**, and holds for this steel above the limit. And nothing here says **what** the invisible damage actually is -- what is physically happening inside the metal, and why there should be a limit at all. Level 3 opens the wire up",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Halve the bend, eight times the life!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Materials Break and Recover?**\n\n**Summary Table:**\n| Idea | The Physics | The Number |\n| --- | --- | --- |\n| One bend does nothing | six snap it | the damage is **invisible** |\n| The proof | the same bend breaks a **used** clip | the wire changed, not the bend |\n| The evidence on the break | a dull patch beside a bright one | a slow crack, then a sudden one |\n| How long it lasts | **life = 4 x (90/angle)³** | fitted, not derived |\n| Right over, 90° | the anchor | **4 bends** |\n| Half as far, 45° | cubed | **32 bends** |\n| Halving the bend | -- | **eight times** the life |\n| Fifteen degrees gentler | 45° to 30° | 16 bends is 50% used against **15%** |\n| Below about 12° | the **fatigue limit** | it never breaks |\n| Still standing | what **is** the damage? | and why a limit at all |\n\n**The one line to remember:** the load that breaks something is often not the big one but the small one repeated, and because the life goes as the cube of how far you flex it, working something a little less gently buys far more life than making it a little stronger.\n\n**Up next:** C23 turns to the other way things fail -- not from being worked, but from the air around them. And it has a protection trick that works even where it has been scratched off."
        }
    };
}
