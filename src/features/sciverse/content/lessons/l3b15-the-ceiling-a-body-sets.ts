import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 15, biology. Closes the Big Idea.
 * Mechanism + Limit.
 *
 * Replaces a Lotka-Volterra lesson -- change in hares = rN - aNP, change in lynx =
 * caNP - mP, four fitted rates, equilibria at P* = r/a and N* = m/(ca), and a cycle
 * period of 2 pi / sqrt(r m). A reader said the formulas were beyond Level 3 and that
 * the gloss on c, 'how much of a new lynx a caught hare pays for', meant nothing. Both
 * were right. The period of small oscillations about a Lotka-Volterra fixed point needs
 * the eigenvalues of a Jacobian, which cannot be reasoned to at this level, so it was a
 * recipe; and c is a conversion efficiency, a quantity with no everyday handle at all.
 * It measured 1 structural word and 23 printed formulas. Parked in docs/level4/.
 *
 * The rewrite removes exactly the thing L2B15 named -- each lynx catches 30, whatever
 * else changes -- and does it with a time budget instead of a differential equation. A
 * lynx's day is spent SEARCHING or HANDLING, and handling is anatomy: stalk, kill, carry,
 * eat, digest. Searching gets easier as hares thicken; handling never does. So
 *
 *   days to get one hare = days searching + days handling
 *
 * and the catch saturates at 365 / handling days, whatever the density. Calibrated so
 * that 10 days searching + 2 days handling reproduces L2B15's 30 a year exactly.
 *
 * The payoff is the Big Idea's own question. Nudge the wood up to 1,400 hares: births
 * 840, taken 798, so the hares keep rising. Nudge it down to 800: births 480, taken 503,
 * so they keep falling. L2B15's balance point is a KNIFE EDGE, not a valley -- the exact
 * crossing is at 1,083, so Level 2 was right to 8%, and the 8% is not the point. A
 * pendulum's restoring force GROWS with displacement and a reaction's push back grows
 * with distance from K; a saturating predator's grip WEAKENS as the prey thicken.
 *
 * The asymmetry is structural and is the line to remember: a population multiplies in
 * proportion to its own numbers, while an animal eats in proportion to its own hours.
 *
 * Frames stated: both counts are for one wood, per year; 'taken' is counted leaving the
 * hare population; searching and handling are counted as days of one lynx's year.
 *
 * Still standing: no carrying capacity, so the escape here is unbounded, where a real
 * wood's hares run out of browse and crash -- which is what B15's Kaibab plateau was.
 * The lynx count is held at 20. And hares have other predators.
 */
export function getL3B15Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B15 balanced a wood. **1,000 hares, 20 lynx**, 600 hares born and 600 taken each year, with each lynx catching **30 hares a year**. And it named honestly what it was holding still: **each lynx catches 30, whatever else changes.**\n\nThe obvious repair is to let the catch rise with the hares. Twice the hares, twice the catch -- a lynx in a crowded wood finds more.\n\nBefore taking it, look at what a lynx has to **do** to each hare it catches.\n\nIt has to find it, which is the part that gets easier when hares are thick on the ground. But then it has to **stalk** it, **kill** it, **carry** it somewhere safe, **eat** it, and **digest** it. A lynx's **stomach** does not hold a whole hare, so it caches what is left and comes back to it over the next two or three days -- and a lynx sitting on a kill is **not hunting**.\n\nSo your dials are **Hares in the Wood** and **Days to Handle One Hare**, and the question is this.\n\nSuppose the wood held **100,000** hares. Twice-the-hares-twice-the-catch says one lynx would take about **3,000** a year. Would it?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'ceiling', label: "No — a year is only 365 days, and every hare costs days of eating and digesting that do not get shorter however many hares there are.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'prop', label: "Yes — finding prey is the hard part, so a hundred times the hares means about a hundred times the catch.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Finding is the hard part **only while prey are scarce**, and that is the trap.\n\nPut the number through. Three thousand hares in a year is **more than eight a day**, every day, including the days a lynx is ill, or has a kill half-eaten in front of it, or is feeding kittens. There is no arrangement of a lynx's body that does eight hares a day.\n\nSo something has to stop the rise, and it is not the hares. **It is the clock.**\n\n| | gets easier as hares thicken? | why |\n| --- | --- | --- |\n| **finding** one hare | **yes** | more of them, so less walking between |\n| **handling** one hare | **no** | the same stalk, the same meal, the same **gut** |\n\nThat second row is the whole lesson. **Handling time is anatomy**, not ecology. It is set by how long a kill takes, how much a **stomach** holds, and how fast a **gut** can process meat -- and none of those know or care how many hares are in the wood.\n\nWhich means the catch cannot rise for ever. Keep adding hares and the finding time falls towards nothing, and what is left is **the handling, by itself**.",
            options: [
                { id: 'cont', label: "Then let me split the year into the two jobs.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Every day of a lynx's year goes into one of two activities, and this is the only rule in the lesson:\n\n**days to get one hare = days searching + days handling**\n\nThe condition: this holds for one lynx in one wood, counted in days of that lynx's year, with the hare numbers steady while it hunts.\n\n**Searching** depends on the wood. The thicker the hares, the shorter the walk between them -- so **double the hares and halve the searching**. In L2B15's wood of 1,000 hares, call it **10 days** to find one.\n\n**Handling** depends on the lynx. The stalk needs cover; the kill needs the **jaw** to reach the neck and the **claws** to hold; then the meal, and then the **gut**. About **2 days** in all, and every part of that figure belongs to the animal's body rather than to the wood.\n\nThere is a reason searching works at all in deep snow, and it is worth a moment because it is the same kind of fact. A lynx's **paws** are enormous and furred, spreading its weight so it does not sink -- which is exactly what a snowshoe hare's own hind feet do. **The predator has evolved the prey's solution**, and a lynx that sank would spend its whole winter searching.\n\nSo in L2B15's own wood:\n\n| | |\n| --- | --- |\n| searching, at 1,000 hares | 10 days |\n| handling | 2 days |\n| **one hare costs** | **12 days** |\n| hares in a year | 365 / 12, which is **30** |\n\n**That is L2B15's 30, and it was never a fixed number.** It was 10 + 2, worked out in a wood of exactly 1,000 hares.\n\nNow double the hares to 2,000. The searching halves to 5 days; the handling does not move:\n\n| hares | searching | handling | one hare costs | caught in a year |\n| --- | --- | --- | --- | --- |\n| 1,000 | 10 days | 2 days | 12 days | **30** |\n| 2,000 | 5 days | 2 days | 7 days | **52** |\n| 4,000 | 2.5 days | 2 days | 4.5 days | **81** |\n| 10,000 | 1 day | 2 days | 3 days | **122** |\n\n**Twice the hares is not twice the catch.** Doubling 1,000 to 2,000 should have given 60 and gives 52; doubling again should have given 120 and gives 81.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Where does it stop?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**At the handling, and you can read it straight off the rule.**\n\nPile in hares without limit and the searching goes to nothing, so the 12 days becomes 2 days, and the whole year is spent handling one hare after another:\n\n**most hares in a year = 365 / days handling**\n\nThe condition: this is the ceiling, approached but never passed, and it holds only while handling time itself stays put -- a gorged animal in fact slows down further.\n\nAt 2 days a hare, that is **182 a year.** Not 3,000. Not 300.\n\n| hares in the wood | twice-the-hares-twice-the-catch says | the day says |\n| --- | --- | --- |\n| 1,000 | 30 | **30** |\n| 10,000 | 304 | **122** |\n| 100,000 | 3,040 | **174** |\n| a million | 30,400 | **181** |\n\nThe two models agree exactly where L2B15 was standing and disagree by a factor of **175** four columns later. **A rule fitted at one density is a rule about that density.**\n\nAnd the ceiling is a property of the **animal**, which is why the second dial is worth playing with. Handling is stalk plus meal plus **digestion**, so a predator that swallows small prey whole has a tiny handling time and almost no ceiling, while one that spends three days on a carcass is capped at **122** a year however thick the wood gets.\n\n**The hare's side of the wood has no such ceiling.** A snowshoe hare raises up to **four litters** in one summer, and the young of the first litter breed in the same summer they were born. So the births are not limited by any one animal's hours -- **every hare added is another breeder**, and the births rise in exact proportion to the numbers.\n\nAnd the hare's own **gut** is built for the job. Winter food is twigs and bark, which almost nothing can **digest**, so a hare carries a large hindgut where **bacteria** break the **leaf** and twig material down, and it passes the food through **twice** to collect what the first pass released. **A ceiling on a predator is its handling time; a ceiling on a plant-eater is what its gut can get out of a twig** -- and that second ceiling is the one that eventually stops a boom.\n\nThat is the asymmetry the rest of this lesson rests on. **A population multiplies in proportion to its own numbers. An animal eats in proportion to its own hours.**",
            options: [
                { id: 'check', label: "Let me test the ceiling.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "A lynx needs **2 days** to handle one hare -- stalk, kill, eat and digest it.\n\nForget the searching entirely: imagine hares so thick that one is always within reach. What is the most this lynx can take in a year?",
            options: [
                { id: 'ceil', label: "About 182 — a year is 365 days, and each hare costs 2 of them", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'prop', label: "There is no most — with hares always within reach the catch has nothing to limit it", nextNodeId: 'math_wrong' },
                { id: 'daily', label: "365 — one hare a day", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Divide the year by what one hare costs. **365 days, 2 days each, so 182 hares** -- and that is the answer whether the wood holds ten thousand hares or ten million.\n\n*One a day* is the answer if handling took **one** day, and it is worth seeing why the difference matters: the ceiling is **365 divided by the handling time**, so halving the handling doubles the ceiling. The dial is there to let you feel that.\n\n*Nothing to limit it* is the one to look at hardest, because it is how the old rule thought. It treats a lynx as a thing that **meets** hares, as though meeting were the whole of eating. But a lynx that has met a hare then disappears from the hunt for two days, into a sequence of jobs its **body** imposes: the kill, the carry, the meal, the **gut**.\n\n| | what sets it | can the wood change it? |\n| --- | --- | --- |\n| **searching** | how thick the hares are | **yes**, completely |\n| **handling** | the lynx's own body | **no** |\n\nSo the wood controls one of the two terms and nothing at all of the other, and as the hares thicken the term the wood controls shrinks towards nothing. **The density stops mattering, and the anatomy is all that is left.**\n\nThat is **satiation**, and you have watched it happen to yourself at a large meal: the food did not change, your capacity did.",
            options: [
                { id: 'retry', label: "365 over 2, so 182.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The picture shows one hare's worth of a lynx's time as a bar -- the pale part is **searching**, the solid part is **handling** -- and underneath, the whole wood for a year: how many hares are **born** against how many are **taken** by the twenty lynx.\n\nThings worth doing:\n\n- Start at **1,000** hares with handling at **2 days**. The bar is 10 pale and 2 solid, the catch is 30 a year, and the two bars underneath are almost exactly level. **This is L2B15's wood**\n- Now raise the hares to about **1,400**. Watch the pale part shrink -- and watch which of the two bars underneath pulls ahead. **It is the births**\n- Put the hares back **below** 1,000, to 800. The pale part grows, the catch falls, and now **the taken bar is the longer one**. Hares go on falling\n- Stop and look at what those two findings mean together. Above the balance the hares **run away**; below it they **collapse**. The balance point is a **ridge**, not a valley -- nudge it either way and it leaves\n- Now push the hares right up to **10,000**. The pale part nearly vanishes and the bar is almost all handling: the catch has hit its ceiling while the births have gone on multiplying. **The gap is enormous and it is still growing**\n- Finally take **Days to Handle One Hare** down to 1 while the hares are high. The ceiling doubles, the taken bar jumps -- **the only thing that ever changes the ceiling is the animal**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "L3P15 took a pendulum off its balance point and it came back. L3C15 pushed a reaction away from its balance point and it came back.\n\nYou have just nudged this wood from 1,000 hares to 1,400 -- **840 born against 798 taken** -- and it did not come back.\n\nWhat is different here?",
            options: [
                { id: 'weakens', label: "A pendulum pushed further gets a bigger restoring push, and so does the reaction. Here the push back gets weaker as the hares thicken, because the predators are running out of hours.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'slow', label: "The push back is still there and still growing — it is just slow, so the wood takes longer to return than a pendulum does.", nextNodeId: 'checkpoint_wrong' },
                { id: 'alive', label: "Living things are unpredictable, so no biological system has a true balance point the way physics and chemistry do.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Compare the actual numbers rather than the speed, because speed is not what fails here. **Direction is.**\n\n| hares | born | taken | the wood then |\n| --- | --- | --- | --- |\n| 800 | 480 | 503 | **falls further** |\n| 1,000 | 600 | 608 | level, very nearly |\n| 1,400 | 840 | 798 | **rises further** |\n| 2,000 | 1,200 | 1,043 | rises faster |\n| 10,000 | 6,000 | 2,433 | gone |\n\nBoth of the nudges move **away**. Not slowly back -- away, and faster the further it gets. A pendulum does the opposite, and so does a reaction:\n\n| | push it away and the force back... | so |\n| --- | --- | --- |\n| **P15**, a pendulum | **grows** with how far it is pushed | it returns |\n| **C15**, a reaction | **grows** with the distance from balance | it returns |\n| **B15**, a wood | **weakens**, because handling time is fixed | **it leaves** |\n\nSo the answer to the Big Idea is sharper than *systems find balance*. **A balance point is only a balance if the restoring push grows with the departure.** The wood has a point where births and losses match exactly -- the arithmetic crossing is at **1,083 hares**, so L2B15's 1,000 was right to about 8% -- and it is a **ridge**. Standing on it is possible; staying on it is not.\n\nAnd *living things are unpredictable* gets it backwards. **Nothing unpredictable happened.** Every number above came out of one division, and the instability is a consequence of the lynx's **gut**, not of anything being alive.",
            options: [
                { id: 'retry', label: "The push back weakens instead of growing.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that closes Big Idea 15 on its own question.**\n\n| | push it away and the force back... | so |\n| --- | --- | --- |\n| **P15**, a pendulum | **grows** with how far it is pushed | it returns |\n| **C15**, a reaction | **grows** with the distance from balance | it returns |\n| **B15**, a wood | **weakens**, because handling time is fixed | **it leaves** |\n\n**Systems do not find balance. Systems with a restoring push that grows find balance**, and whether a push grows is a question about the thing doing the pushing. A pendulum's is gravity, which has no ceiling. A lynx's is a day.\n\nThere is one more structure in this, and it is the lag L2B15 described and could not calculate. **The only way past the ceiling is more lynx.** One lynx cannot eat faster, so the wood's grip on the hares can only tighten if there are more lynx in it -- and that takes a **gestation** and a summer of growth. A lynx has one small litter a year, and the kittens cannot hunt for months.\n\nSo the predators' answer to a hare boom is roughly **a year late by construction**, and by the time it arrives the hares have multiplied again. **The lag is not a delay in the signal. It is the time it takes to build a predator.**\n\n**Still standing, and it is the big one:** nothing here stops the hares. In the model they rise for ever. A real wood does stop them, with its own ceiling, and it is the hare's **gut** that meets it: the **browse** runs out, and a heavily eaten shrub answers by growing twigs loaded with bitter chemicals that even a hare's **bacteria** cannot work on. **The plant is a structure that fights back.** That is exactly the crash B15 showed you on the Kaibab plateau, where removing the predators did not leave the deer in peace.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A balance that pushes away!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out why a wood does not settle, and the reason is a lynx's gut.**\n\n- **L2B15 held one lynx's catch at 30 a year, whatever else changed.** The obvious repair -- twice the hares, twice the catch -- is wrong for a reason that has nothing to do with hares\n- **A lynx's year goes into two activities**, and the days to get one hare are the days searching plus the days handling -- for one lynx in one wood, with hare numbers steady while it hunts\n- **Searching belongs to the wood.** Thicker hares mean a shorter walk between them, so double the hares and halve the searching: 10 days at 1,000 hares, 5 at 2,000, 1 at 10,000\n- **Handling belongs to the animal.** Stalk, kill, carry, eat, **digest** -- about 2 days. A **stomach** does not hold a whole hare, so a lynx caches the rest and returns over two or three days, and **a lynx sitting on a kill is not hunting**\n- **So L2B15's 30 was never a fixed number**: it is 10 days plus 2, and 365 over 12 is 30, worked out in a wood of exactly 1,000 hares. **A rule fitted at one density is a rule about that density**\n- **And the catch saturates**, at 365 divided by the handling days, which at 2 days is **182** a year -- against the 3,040 that twice-the-hares-twice-the-catch predicts at 100,000 hares. The two agree exactly where Level 2 stood and differ by a factor of 175 further out\n- **The prey have no matching ceiling.** A snowshoe hare raises up to **four litters** a summer and the first litter breeds the same year, so **every hare added is another breeder**. **A population multiplies in proportion to its own numbers; an animal eats in proportion to its own hours**\n- **Which makes the balance point a ridge.** At 1,400 hares: 840 born against 798 taken, so the hares **rise further**. At 800: 480 born against 503 taken, so they **fall further**. The crossing is at 1,083, so L2B15 was right to 8% -- and being right about where it is does not make it hold\n- **That is the real answer to the Big Idea.** A pendulum pushed further gets a **bigger** push back, and so does a reaction pushed from balance. A wood pushed up gets a **smaller** one, because the predators are running out of hours. **A balance point is only a balance if the restoring push grows with the departure**\n- **And it supplies L2B15's missing lag.** One lynx cannot eat faster, so the only way past the ceiling is **more lynx** -- a **gestation** and a summer of growth, one small litter a year, kittens that cannot hunt for months. **The lag is not a delay in the signal; it is the time it takes to build a predator**\n- **Still standing:** nothing here stops the hares, so in this model they rise for ever. A real wood stops them with a ceiling of its own -- the **browse** runs out and heavily eaten twigs turn bitter -- which is the crash B15 showed on the Kaibab plateau. The lynx are held at 20 throughout, and real hares have other predators.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 15, Level 3", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Systems Find Balance?**\n\nThey do not. Systems whose restoring push grows with the departure find balance, and a predator's cannot.\n\n**Summary Table:**\n| | L2B15 said | L3B15 says |\n| --- | --- | --- |\n| One lynx's catch | **30 a year**, held fixed | 10 days searching + 2 handling, so 365 / 12 |\n| What searching costs | -- | the **wood's** business: halves when hares double |\n| What handling costs | -- | the **animal's** body: stalk, kill, **digest** |\n| At 2,000 hares | 30 | **52**, not the 60 you would expect |\n| At 100,000 hares | 30 | **174**, against a predicted 3,040 |\n| The ceiling | -- | **365 / handling days**: 182 a year |\n| Why the prey differ | -- | every hare added is another **breeder** |\n| The balance point | a point the wood circles | a **ridge** it falls off, either way |\n| Where it is | 1,000 hares | 1,083 -- Level 2 was right to 8% |\n| The lag | described, never worked out | a **gestation** and a summer: building a predator |\n\n**What ties them together:** P15's pendulum and C15's reaction both push back harder the further you take them, so both return. This wood pushes back *less* the further you take it, because the push is made of a lynx's hours and there are only so many. The Big Idea's question has a condition attached that no one had stated.\n\n**The one line to remember:** a population multiplies in proportion to its own numbers while an animal eats in proportion to its own hours -- so prey have no ceiling and predators do, and a balance struck between the two is a ridge rather than a valley."
        }
    };
}
