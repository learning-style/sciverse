import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 21, biology. Biology closes the Big Idea, so
 * this lesson uses L2P21's idea of a cycle's period and L2C21's division on the
 * one cycle that cannot be allowed to stop.
 *
 * B21 talked about ATP throughput, metabolic reserve and strain without a single
 * number, so "reserve" could mean anything. The same division as L2C21 settles it:
 *
 *   turnover time = pool / rate of use
 *
 * A body holds about 250 g of ATP and rebuilds about 65 kg of it a day, so the
 * entire pool is replaced every 5.5 minutes -- about 260 times its own mass a day.
 * That is the reserve, and it is tiny: a few minutes, not hours.
 *
 * Which explains the design. The body does not store the currency, it stores the
 * fuel -- about 500 g of glycogen and far more fat -- and keeps only minutes of ATP
 * in hand. So the cycle is not merely efficient, it is compulsory.
 *
 * Still standing: 5.5 minutes is a whole-body average at rest, and the muscle that
 * needs ATP fastest has the smallest share of the pool. Level 3 asks why a system
 * this critical is run with so little in reserve.
 */
export function getL2B21Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B21 described the energy cycle inside your cells and used three words that sound precise and are not: **throughput**, **reserve** and **strain**. It said reserve is the headroom between what oxygen can supply and what the body is demanding, and never said how much headroom that is.\n\nIt matters enormously, because the number turns out to be startling -- and the real question is how much of a head start your body has if the traffic through that pool ever stops.\n\nThe molecule your cells actually spend is **ATP** -- **adenosine triphosphate**. Think of it as the cell's cash: whatever fuel you eat, it is converted into ATP before anything uses it. Muscles pull on ATP, nerves fire on ATP, and every pump in every cell membrane runs on it.\n\nSo the sensible question is the one L2C21 just taught you to ask of a reservoir. **How much ATP is in your body, and how fast do you spend it?**\n\n- Your whole body holds about **250 grams** of ATP at any instant -- about a mugful.\n- You rebuild about **65 kilograms** of it a day.\n\nYour two dials are those two numbers.\n\n- **ATP Pool**, in grams.\n- **ATP Used Each Day**, in kilograms a day.\n\nBefore calculating: 250 grams held, 65 kilograms a day spent. Does that sound like a system with a comfortable reserve?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No -- the daily spend is hundreds of times the amount held, so the pool must be recycled constantly and there can only be minutes of it in hand.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Probably -- 250 grams is a lot of molecules, so there should be a good few hours of supply.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "250 grams is indeed an enormous number of molecules. It is still almost nothing compared with the spending, and comparing the two is the whole point.\n\nPut them in the same units. 65 kilograms is **65,000 grams**, against a pool of 250 g. So each day you rebuild the pool:\n\n65,000 / 250 = **260 times**\n\nTwo hundred and sixty times a day. Not twice, not ten times. Every molecule of ATP in you is built, spent and rebuilt hundreds of times before tomorrow.\n\nAnd there is a reason it cannot be otherwise. ATP is not stored the way fat or starch is stored, because you cannot keep much of it about. It is a large, heavily charged molecule, and a cell holding enough for hours would have to pack it in at concentrations that would wreck the delicate balance of water and salts it depends on. **The cell physically cannot hoard its own currency.**\n\nSo your body does something cleverer, and it is the design idea at the heart of this lesson. It stores the **fuel** instead -- about 500 g of **glycogen** in liver and muscle, and kilograms of fat -- and keeps only a few minutes of finished ATP in hand, rebuilt continuously from that fuel.\n\nStore the fuel, not the cash.",
            options: [
                { id: 'cont', label: "So how many minutes is a few?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Exactly the division L2C21 used on the atmosphere:\n\n**turnover time = pool / rate of use**\n\nThere it was a reservoir of carbon over a flux in GtC a year, and the answer came out in years. Here it is a pool of ATP over a rate in kilograms a day, and the answer comes out in days -- which you then convert into something a human can feel.\n\nTwo things to watch:\n\n- **Match the units before dividing.** Grams against kilograms a day will be out by a thousand. Put both in grams first.\n- **A small answer is the interesting case.** For the atmosphere, 4.2 years meant the air is a thoroughfare. Here, a tiny turnover time means something stronger: the system has **no buffer at all**, and must be supplied continuously or it stops.\n\nAnd this is where B21's word **reserve** finally gets a meaning. Your reserve is not a tank of ATP. It is the **turnover time** -- how long the existing pool would last if production stopped and spending carried on. That is a number, and now you can find it.\n\n**The condition:** these are whole-body averages at rest. A sprinting thigh muscle spends ATP far faster than a resting liver, so its own turnover time is shorter still.",
            options: [
                { id: 'cont', label: "Work it out.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A pool of 250 g, spent at 65 kg a day.**\n\n1. **Same units:** 65 kg = **65,000 g** a day\n2. **Turnover time:** 250 / 65,000 = **0.0038 days**\n3. **In minutes:** 0.0038 x 24 x 60 = **5.5 minutes**\n\n**Five and a half minutes.** That is the whole of your body's energy reserve -- not the fuel, which would last weeks, but the finished, spendable ATP.\n\nAnd it lines up with something you already know. Hold your breath and count how long before your body is in real trouble: a minute or two, perhaps three with practice. Interrupt the blood supply to the brain and consciousness goes in **about ten seconds**, with permanent damage within minutes. Those are not arbitrary numbers. They are what a **five-minute reserve** looks like from the inside, and the brain's own share is thinner than the average.\n\nCompare that with the fuel:\n\n| What is stored | How much | How long it would last |\n| --- | --- | --- |\n| **ATP** -- the cash | 250 g | **about 5 minutes** |\n| **Glycogen** -- quick fuel | about 500 g | about a day |\n| **Fat** -- slow fuel | many kilograms | **weeks** |\n\nWeeks of fuel, and five minutes of money. Your body is a business with a full warehouse and almost nothing in the till -- and it works, because the till is refilled 260 times a day.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** During hard exercise the body can spend ATP about **10 times** faster than at rest -- so about **650 kg a day** if it were kept up -- while the pool stays about **250 g**.\n\nWhat is the turnover time then?",
            options: [
                { id: 'right', label: "About 33 seconds. 250 / 650,000 of a day, which is 0.55 minutes.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'ten_times', label: "About 55 minutes -- ten times longer than at rest.", nextNodeId: 'math_wrong' },
                { id: 'same', label: "Still 5.5 minutes, because the pool has not changed.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Ten times longer** has the direction backwards, and the direction is the whole content of the formula. The rate of use is on the **bottom**. Spending faster makes the same pool last a **shorter** time, not longer. Spending ten times faster divides the time by ten.\n\n**Still 5.5 minutes** keeps the pool and forgets that the answer depends on both numbers. The pool has not changed, and the turnover time has -- that is precisely why it is a ratio and not a property of the pool alone.\n\n**250 / 650,000 = 0.000385 days, which is 0.55 minutes -- about 33 seconds.**\n\nHalf a minute of ATP in hand, in a body working hard. And that is why the first thing that happens when you sprint is that you start breathing like a bellows: not to top up a tank, because there is no tank, but to keep a production line running that is now consuming its entire stock every half minute.\n\nIt is also why a sprinter can hold full pace for only a few seconds longer than that before the body starts falling back on rougher, less efficient ways of making ATP -- the ones that leave you aching.",
            options: [
                { id: 'retry', label: "The rate is on the bottom, so faster spending means less time.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **ATP Pool** in grams and **ATP Used Each Day** in kilograms a day.\n\n| Condition | Pool | Used each day | Turnover time |\n| --- | --- | --- | --- |\n| Deep sleep | 250 g | 45 kg | **8.0 min** |\n| Resting | 250 g | 65 kg | **5.5 min** |\n| Brisk walking | 250 g | 130 kg | **2.8 min** |\n| Hard exercise | 250 g | 650 kg | **33 s** |\n| Sprinting flat out | 250 g | 1,300 kg | **17 s** |\n\nEvery row has the same pool. The reserve swings from eight minutes to seventeen seconds purely because of the spending, which is what makes **reserve** a ratio rather than a quantity you carry.\n\nAnd now the connection back to the other two lessons, because all three of this Big Idea are about the same thing seen three ways.\n\n**L2P21** was a cycle with a fixed period: 12 h 25 min, set by the Moon, and nothing on Earth can hurry it or delay it. **L2C21** was a cycle you time by dividing a store by a flux: 4.2 years for the air. **This lesson** is the same division on a cycle whose period is **5.5 minutes** -- and unlike the tide, this one can be made faster or slower by how hard you work, and unlike the carbon, it cannot be allowed to pause.\n\nThat is what the Big Idea's question actually means. A cycle keeps a system alive when the system holds almost none of what it needs and the cycle delivers it continuously. **Your body is alive because something is turning over 260 times a day, not because anything is stored.**\n\nWhich raises an uncomfortable question. Why would evolution build the most critical supply in the body with five minutes of stock?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Five minutes of stock for the most critical supply? Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Someone proposes an improvement to the human body: **store more ATP**. Keep a day's worth -- 65 kg -- instead of five minutes' worth, and a blocked artery or a held breath would stop mattering.\n\nThe chemistry says no. What goes wrong?",
            options: [
                { id: 'right', label: "65 kg of ATP is most of a person's body weight, and ATP is a large, heavily charged molecule -- a cell packed with it could not keep its water and salt balance. You cannot store the currency, only the fuel.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing in principle -- the body simply never evolved the machinery to store it, and could in principle be improved.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Start with the mass, because it settles the question before any biology is needed. A day's ATP is **65 kilograms**. An adult weighs perhaps 70. The proposal is to make a person almost entirely out of their own petty cash, leaving no room for muscle, bone or brain.\n\nBut suppose you only wanted an hour's worth -- 2.7 kg. Still impossible, and here the chemistry matters. ATP is a large molecule and it carries **several negative charges**. A cell's interior is a carefully held balance of water, ions and charge, and every dissolved particle pulls water in by osmosis. Fill a cell with enough ATP to run for an hour and it would swell and its charge balance would collapse -- the cell would stop working long before it ran out of energy.\n\nSo the constraint is not an oversight in the design. **It is a property of the molecule**, and the body's answer is the one you have already seen: store the **fuel** and not the **cash**. Fat carries enormous energy per gram, is uncharged, and packs away without disturbing anything. Glycogen sits in the middle. ATP is made on demand, seconds before it is spent.\n\nAnd that is why the cycle is not merely an efficient arrangement -- it is **compulsory**. A system that cannot store what it spends has to make it continuously, which is the answer to this Big Idea's question. Cycles keep systems alive precisely where storage is impossible.\n\nYou can see the same logic outside biology. An electricity grid stores almost no electricity; it stores coal, gas and water behind dams, and generates to match demand second by second -- for much the same reason, that the product itself is awkward to keep.",
            options: [
                { id: 'retry', label: "You cannot store the currency -- only the fuel.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- and the mass alone settles it before any chemistry is needed. A day's ATP is **65 kg** in a body that weighs about 70. You would be made almost entirely of your own petty cash.\n\nEven an hour's worth, 2.7 kg, fails for the chemical reason: ATP is large and **heavily charged**, and a cell filled with it could not hold its water and salt balance. So the design is forced rather than chosen -- **store the fuel, not the cash** -- and it explains why the cycle is compulsory rather than merely efficient.\n\nSo Big Idea 21's three lessons are three cycles with three periods, and putting them side by side is the point:\n\n| Cycle | Period | Set by | Can it pause? |\n| --- | --- | --- | --- |\n| **Tides** (L2P21) | 12 h 25 min | the Moon's orbit | never, and nothing can change it |\n| **Carbon** (L2C21) | 4.2 years in the air | how fast sinks take it | it can shift, and has |\n| **ATP** (this lesson) | 5.5 minutes | how hard you are working | **no -- minutes are fatal** |\n\nRead the last column. That is the answer to *how do cycles keep systems alive*: a cycle is what lets a system run on almost no stock. The tide needs no stock at all, the carbon cycle has centuries of slack, and your cells have five minutes.\n\nWhat this level cannot explain is how the ATP cycle is held **steady**. With five minutes of stock and demand that swings tenfold within a second of standing up, something must be adjusting production almost instantly -- and B21 called that feedback regulation without saying what the signal is. That is Level 3.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Cycles are for what you cannot store!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You measured your own energy reserve.**\n\n- **ATP** -- **adenosine triphosphate** -- is the cell's cash: every fuel is converted into it before anything is spent\n- **turnover time = pool / rate of use**, the same division L2C21 used on the atmosphere\n- **Match the units first.** 65 kg a day is 65,000 g a day against a 250 g pool\n- Your body rebuilds its ATP pool **260 times a day**\n- **250 / 65,000 of a day = 5.5 minutes.** That is the whole reserve of spendable energy\n- Which is what a held breath and a blocked artery already told you: consciousness goes in about **ten seconds**, damage within minutes\n- Working hard, the same pool lasts **33 seconds**; sprinting, about **17 seconds**. Reserve is a **ratio**, not a quantity you carry\n- The rate is on the **bottom**, so spending faster makes the reserve shorter\n- You **cannot store the currency**: a day's ATP is 65 kg in a 70 kg body, and even an hour's worth would wreck a cell's water and salt balance, because ATP is large and heavily charged\n- So the body stores **fuel** instead: about 500 g of **glycogen** for about a day, and fat for weeks\n- **Weeks of fuel, five minutes of money** -- a full warehouse and almost nothing in the till\n- Which answers the Big Idea: **a cycle is what lets a system run on almost no stock**, and an electricity grid does the same thing for the same reason\n- Removed: B21's reserve, throughput and strain, used without a single number\n- Still standing: 5.5 minutes is a **whole-body average at rest**, and the muscle that needs ATP fastest holds the least. And nothing here says what **signal** keeps production matched to demand within seconds",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "A full warehouse and nothing in the till!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Cycles Keep Systems Alive?**\n\nThree cycles, three periods, and the same division twice over.\n\n**Summary Table:**\n| Lesson | The Maths | What It Measured |\n| --- | --- | --- |\n| **L2P21** physics | next high tide = last + 12 h 25 min | **50 min later** each day; springs 3.2 m, neaps 1.2 m |\n| **L2C21** chemistry | residence time = reservoir / flux | **4.2 years** in the air, 411 in the deep ocean |\n| **L2B21** biology | turnover time = pool / rate | **5.5 minutes** of ATP, 33 s working hard |\n| ATP | adenosine triphosphate, the cell's cash | rebuilt **260 times a day** |\n| Why so little | large and **heavily charged** | a cell cannot hoard it |\n| So the body stores | **fuel**, not cash | glycogen a day, fat for weeks |\n| Which answers the Big Idea | cycles cover what cannot be **stored** | as an electricity grid does |\n| Not in the formula | what **signal** matches supply to demand | which is Level 3 |\n\n**The one line to remember:** you hold about five minutes of spendable energy and rebuild it 260 times a day, because a cell cannot store its own currency -- so the cycle is not an efficiency, it is the only possible arrangement.\n\n**Up next at Level 3:** why the Sun raises less than half the Moon's tide despite pulling 179 times harder, why an excess of carbon dioxide outlasts the atom that carries it, and what signal keeps a five-minute reserve from ever running out."
        }
    };
}
