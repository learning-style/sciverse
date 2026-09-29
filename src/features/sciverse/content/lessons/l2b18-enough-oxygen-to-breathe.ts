import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 18, biology. Biology closes the Big Idea, so
 * this lesson is where L2P18's discharge and L2C18's dissolved load meet: both
 * measured what the river does to the land, and this one measures what the river
 * offers the things living in it.
 *
 * B18 said trout live in fast cold water and catfish in slow warm water, and that
 * warm water holds less oxygen. It never said how much less, or how much a trout
 * needs. Those are both numbers, and together they draw a line:
 *
 *   oxygen in the water = the most it can hold x how full it is
 *
 * Worked at 25 C and 70% full: 8.3 x 0.70 = 5.8 mg/L, against the 6 mg/L a trout
 * needs. The factory in B18's checkpoint does not warm the water until it is too
 * hot for a trout -- it warms it until there is not enough oxygen left.
 *
 * The wording here was rewritten after a reader pointed out that the first draft
 * called the maximum a "ceiling" and named a dial "Percent of the Ceiling". Both
 * are metaphors doing the work of terms, and neither explains itself on a screen.
 * The quantity is now "the most it can hold", and how close the water gets to it
 * is "how full" -- a glass that could hold 8.3 mg and is 70% full. Saturation is
 * still named, once, as the word a scientist would use.
 *
 * Still standing: "the most it can hold" assumes the water has had time to come
 * into balance with the air. It also treats the trout's need as a fixed 6 mg/L,
 * which Level 3 shows is the bigger simplification of the two.
 */
export function getL2B18Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B18 sent you snorkelling down a river: trout in the cold rapids at the top, catfish in the warm slow water at the bottom. And it gave you the reason -- warm water holds less **oxygen**, and a trout cannot get enough through its gills.\n\nTwo numbers were missing, and without them the reason is only a story.\n\n**How much less oxygen?** And **how much does a trout need?**\n\nBecause if warm water holds a bit less and a trout needs far less than that, there is no problem at all. If it holds a bit less and the trout was only just managing, then a warm afternoon is fatal. Same sentence, opposite meanings, and only numbers can tell them apart.\n\nOxygen in water is measured the way C18's dissolved rock was: **milligrams per litre**, mg/L. A trout needs about **6 mg/L**.\n\nYour two dials are the two things that decide how much is actually there, and the picture to keep in your head is a glass of water with room in it for oxygen.\n\n- **Water Temperature**, in °C, decides **how big the glass is** -- that is, the most oxygen this water could hold if it were completely full.\n- **How Full the Water Is** decides how much of that room is actually taken up. Water is rarely full, because everything living in the river is using the oxygen up.\n\nDoes 6 mg/L sound like a lot?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "I cannot tell yet -- it depends entirely on how much water can hold in the first place.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "No -- 6 mg is a speck, and rivers are surrounded by air, so there must be plenty.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Surrounded by air, yes -- and that is exactly what makes water such a hard place to breathe.\n\nHere are the two numbers side by side. **Air** is about 21% oxygen: a litre of it holds around **280 mg**. **River water**, ice cold and completely full, holds about **14.6 mg/L**.\n\nSo water can hold roughly **one twentieth** of the oxygen that the air above it does -- and a fish has to push heavy water over its gills to get at even that, while you move light air in and out with almost no effort.\n\nWhich turns 6 mg/L from a speck into most of the budget. A trout is not asking for a little of what is available. In warm water it is asking for **most of it**.\n\nThat is why the numbers matter here and did not matter for the rock. A river can always carry more rock. It cannot always carry more oxygen.",
            options: [
                { id: 'cont', label: "So there is not much room for oxygen in water at all. What decides how much?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Temperature decides it, and warm water has less room than cold. Here is **the most it can hold**, at each temperature, when it is completely full:\n\n| Temperature | The most it can hold |\n| --- | --- |\n| 0 °C | 14.6 mg/L |\n| 5 °C | 12.8 mg/L |\n| 10 °C | 11.3 mg/L |\n| 15 °C | 10.1 mg/L |\n| 20 °C | 9.1 mg/L |\n| 25 °C | 8.3 mg/L |\n| 30 °C | 7.6 mg/L |\n\nThat is the size of the glass. A scientist would call being completely full **saturation**, and would say water at 30 °C is *saturated* at 7.6 mg/L -- but full is the easier word, and it means the same thing.\n\nReal river water is usually **not** full, because fish, plants and everything rotting on the bed are all using oxygen up. So there are two questions, never one: how much room is there, and how much of that room is taken?\n\n**oxygen in the water = the most it can hold x how full it is**\n\nAnd this is where the physics comes back. **How full the water is depends on the flow.** Fast water tumbling over stones keeps mixing fresh air in, so rapids run almost completely full. Slow deep water barely mixes at all, and can sit at 60% or 70% full. So the second dial is really L2P18's river speed, wearing a different hat.\n\n**The condition:** the figures above assume the water has had time to settle into balance with the air. Water that has just been warmed suddenly has not.",
            options: [
                { id: 'cont', label: "Work out what the trout actually gets.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A trout stream in the cold headwaters: 10 °C, and fast enough to run 95% full.**\n\n1. **The most it can hold at 10 °C:** 11.3 mg/L\n2. **What is actually there:** 11.3 x 0.95 = **10.7 mg/L**\n3. **Against the trout's 6 mg/L:** comfortable, with nearly twice what it needs\n\n**Now the same trout in slow lowland water: 25 °C, and slow enough to sit 70% full.**\n\n1. **The most it can hold at 25 °C:** 8.3 mg/L\n2. **What is actually there:** 8.3 x 0.70 = **5.8 mg/L**\n3. **Against the trout's 6 mg/L:** **not enough.** The trout cannot live here.\n\nLook carefully at what happened, because it was not one thing. The room for oxygen shrank from 11.3 to 8.3 -- a loss of about a quarter. But how full the water was dropped too, from 95% to 70%, because slow water stops mixing in air.\n\n**The two losses multiply**, exactly as depth and speed multiplied in L2P18. Together they take 10.7 down to 5.8, which is nearly a halving -- and that is what puts the trout below its line.\n\nThis is why B18's zones are real and not just habit. The fish is not choosing cold water because it prefers the cold. It is living where the oxygen is.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A stretch of river is at **20 °C**, where the most it could hold is 9.1 mg/L, and being moderately brisk it runs **85% full**.\n\nHow much oxygen is in the water, and can a trout needing 6 mg/L live there?",
            options: [
                { id: 'right', label: "7.7 mg/L, so yes -- 9.1 x 0.85 = 7.7, which clears 6 mg/L with a little to spare.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'used_max', label: "9.1 mg/L, so yes easily -- that is the figure for 20 °C.", nextNodeId: 'math_wrong' },
                { id: 'subtracted', label: "About 1.4 mg/L, so no -- take 85% off the 9.1.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both slips are about what the percentage is *doing*.\n\n**9.1 mg/L** is the **most** this water could hold at 20 °C -- the size of the glass, not what is in it. This river is 85% full, not completely full. Using the maximum would have you declaring a river fine for trout when it might not be, which is the expensive direction to be wrong in.\n\n**Taking 85% off** leaves 15%, and 85% full means the water holds 85% of what it could, not 15%. Sanity-check the size: 1.4 mg/L would be a river with almost nothing left in it, the sort of water where you find no fish at all rather than a slightly stressed trout.\n\n**9.1 x 0.85 = 7.7 mg/L.** Above the trout's 6, though the spare is thinner than in the headwaters, and a hot week would close it.",
            options: [
                { id: 'retry', label: "Multiply by how full it is -- the maximum is not the answer.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Water Temperature** sets how much room there is, in °C, and **How Full the Water Is** sets how much of that room is taken -- which is really the flow, since fast water tumbling over stones keeps mixing air in. The trout's line stays at 6 mg/L.\n\n| Temperature | The most it can hold | 95% full | 85% full | 70% full |\n| --- | --- | --- | --- | --- |\n| 10 °C | 11.3 | **10.7** | **9.6** | **7.9** |\n| 15 °C | 10.1 | **9.6** | **8.6** | **7.1** |\n| 20 °C | 9.1 | **8.6** | **7.7** | **6.4** |\n| 25 °C | 8.3 | **7.9** | **7.1** | **5.8** |\n| 30 °C | 7.6 | **7.2** | **6.5** | **5.3** |\n\nEvery number in that table clears 6 mg/L except two, and both are in the right-hand column -- **warm and slow together**.\n\nThat is the finding. Warm water on its own is survivable: even at 30 °C, fast tumbling water gives a trout 7.2 mg/L. Slow water on its own is survivable: at 10 °C even a sluggish pool gives 7.9. It takes **both at once** to cross the line.\n\nWhich also tells you what to do about it, and it is not what you might expect. You cannot cool a river down. But you **can** give its water something to tumble over.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Warm and slow together is the danger. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** B18's factory again. It discharges warm water into a **cool, fast** trout stream, taking one stretch from 10 °C to **25 °C**. The stream is brisk, so it stays **95% full**.\n\nThe trout die. A report says the water became \"too hot for trout\". Does the arithmetic agree?",
            options: [
                { id: 'right', label: "Not really. At 25 °C and 95% full there is 7.9 mg/L, still above 6 -- so plain lack of oxygen does not explain it, and something the fixed 6 mg/L line leaves out must be involved.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- 25 °C is above the trout's limit of about 20 °C, so the heat killed them.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Careful -- that answer uses a limit this lesson never gave you, and the point of Level 2 is to stop accepting limits without a mechanism.\n\nRun the numbers. At **25 °C** the most the water can hold is 8.3 mg/L, and the stream is fast, so it runs 95% full:\n\n8.3 x 0.95 = **7.9 mg/L**\n\nThat is **above** 6 mg/L. By the rule this lesson gave you, the trout should be fine -- and they are not.\n\nSo one of two things is true. Either water temperature harms a trout in some way that has nothing to do with oxygen, or **the 6 mg/L line is not really fixed**.\n\nIt is the second one, and you can almost feel why. 6 mg/L is what a trout needs *at some temperature*. A warm fish is a busy fish: everything inside it runs faster, and a body running faster needs **more** oxygen, not the same amount. So as the water warms, what is available falls a little -- and the trout's own need climbs.\n\nBoth ends of the gap move, and we only counted one. That is the simplification Level 3 removes, and when you put a number on the other end it turns out to be the **larger** of the two effects.",
            options: [
                { id: 'retry', label: "What is there fell -- but the trout's need must have risen too.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly right, and well spotted -- the arithmetic says 7.9 mg/L, comfortably above 6, so \"too hot\" is not an explanation, it is a label.\n\nWhat this level can tell you honestly is the shape of the problem:\n\n- **What is available** falls as water warms, and falls again when it slows: 10.7 mg/L down to 5.8 in our two stretches.\n- **The line at 6 mg/L** is borrowed from a trout in cool water, and we quietly assumed it never moves.\n\nA warmed fish is a busier fish, so that second assumption is the weak one. Level 3 measures both ends and finds that the trout's own need climbs about **three times** as much as the available oxygen falls -- so the story \"warm water holds less oxygen\", which is what B18 taught and what most people say, is the **smaller** half of the truth.\n\nAnd notice what all three Big Idea 18 lessons now share. **P18** and **L2P18** measured the water: how fast, how much. **C18** and **L2C18** measured what is dissolved in it. Here both of those turn into whether something can live -- oxygen is dissolved chemistry, and how much of it gets in is physics. The fish is where the other two meet.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "What is there, against what is needed -- and I only counted one.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You put numbers on whether a fish can breathe.**\n\n- **oxygen in the water = the most it can hold x how full it is**, in **mg/L**\n- **The most it can hold** shrinks as water warms: 14.6 mg/L at 0 °C, 9.1 at 20 °C, 7.6 at 30 °C\n- Completely full is what a scientist calls **saturation**. Full is the easier word and means the same\n- Water can hold about **one twentieth** of the oxygen air does -- roughly 14.6 mg/L against 280\n- **How full the water is, is the flow** in disguise: rapids run almost completely full, slow deep water 60-70%\n- Cold fast headwater: 11.3 x 0.95 = **10.7 mg/L**. Warm slow lowland: 8.3 x 0.70 = **5.8**\n- A trout needs about **6 mg/L**, so the second stretch fails and the first is comfortable\n- The two losses **multiply**, just as depth and speed did in L2P18\n- Warm alone is survivable and slow alone is survivable. **Warm and slow together** is what crosses the line\n- Which points at the remedy: you cannot cool a river, but you can give it stones to tumble over\n- Removed: B18's \"warm water holds less oxygen\" with no amount, and no figure for what a trout needs\n- Still standing: the figures assume the water has had **time** to come into balance with the air -- and, more seriously, we treated the trout's **6 mg/L as fixed**. A warmer fish needs more, and that turns out to matter more than the falling supply",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "The fish is where the physics and the chemistry meet!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Rivers Shape the Land?**\n\nThree lessons, three sums, and they are the same river.\n\n**Summary Table:**\n| Lesson | The Maths | What It Measured |\n| --- | --- | --- |\n| **L2P18** physics | discharge = width x depth x speed | **9.6 m³/s** -- ten tonnes of water a second |\n| **L2C18** chemistry | load = concentration x discharge | **124 tonnes a day** of rock, in clear water |\n| **L2B18** biology | oxygen = the most it can hold x how full | **5.8 mg/L** against a trout's 6 |\n| The most it can hold | shrinks with warmth | 11.3 at 10 °C, 8.3 at 25 °C |\n| How full | set by the **flow** | rapids almost full, slow pools ~70% |\n| The two multiply | warm **and** slow | 10.7 mg/L becomes 5.8 |\n| Not in the formula | the fish's **own** need | Which Level 3 shows is the larger half |\n\n**The one line to remember:** a river's discharge decides how much water there is, its chemistry decides what is dissolved in it, and a fish lives or dies on the one dissolved thing it cannot do without -- so warm and slow together is the combination to watch.\n\n**Up next at Level 3:** why the outside of a bend erodes -- not because the water is faster there, which is the answer everyone gives, but because of a four-centimetre tilt across the river's surface."
        }
    };
}
