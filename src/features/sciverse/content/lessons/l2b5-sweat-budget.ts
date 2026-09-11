import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B5 "Homeostasis". The synthesis lesson.
 *
 * B5 described sweating as negative feedback. This lesson puts the heat budget
 * into joules, kept from the body's frame of reference: heat made by the body
 * is heat in; heat carried off by evaporating sweat is heat out. L2C1's
 * Q = m x c x dT turns the difference into a temperature change.
 *
 * Conditions stated where used: air as warm as skin (so evaporation is the only
 * way out), only evaporated sweat cools, and c is an average for body tissue.
 * Water's value for evaporation at skin temperature (about 2,400 J/g) is given
 * plainly; latent heat is named at Level 3 (L3C1).
 */
export function getL2B5Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B5 showed your body holding itself near **37 °C** with **negative feedback**: when you get too hot, you sweat, and the sweat cools you back down.\n\nBut how big a job is that sweat really doing?\n\nWhen you run hard, your muscles make a lot of heat -- about **600 W**. A **watt (W)** is **one joule every second**, so that is 600 J of heat every second.\n\nImagine a hot day when the air is as warm as your skin. If your sweat stopped working during a **one-hour** run, how much would your body temperature rise?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Several degrees -- enough to be dangerous. 600 joules every second adds up to millions of joules in an hour.", nextNodeId: 'budget', sentiment: 'positive' },
                { id: 'bad', label: "Less than a degree. A body is mostly water, and water takes a lot of heat to warm up.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Half of that is right. L2C1 showed that water takes a lot of heat to warm -- **4.2 J** for each gram and each degree -- and your body, being mostly water, is similar. That really does slow the rise.\n\nBut it cannot stop it. The problem is not the size of each second's heat. It is that the heat **never stops coming**.\n\nAn hour is **3,600 seconds**. 600 J every second for 3,600 seconds is more than **two million joules**.\n\nA large heat capacity is like a large bucket under a running tap. It takes longer to fill -- but if the tap never turns off and nothing drains out, it fills all the same.",
            options: [
                { id: 'cont', label: "So how full does the bucket get in an hour?", nextNodeId: 'budget' }
            ]
        },
        budget: {
            id: 'budget',
            speaker: 'AI',
            content: "Keep the books for your **body**. Heat your body makes counts as heat **in**. Heat that leaves your body counts as heat **out**.\n\n**Step 1: heat in.** Energy = power x time, with the time in **seconds**:\n\n600 W x 3,600 s = **2,160,000 J** in one hour\n\n**Step 2: heat out.** Usually some heat leaves by warming the air around you. But heat only flows from hotter to colder. **When the air is as warm as your skin, about 35 °C, no heat flows from your skin into the air.** For now, assume nothing gets out.\n\n**Step 3: the temperature rise.** Use L2C1's formula, **Q = m x c x dT**, rearranged:\n\n**dT = Q / (m x c)**\n\nTake a **70 kg** person, which is **70,000 g**. The **specific heat capacity** of the human body averages about **3.5 J/g/°C** -- a little less than water, because bone and fat take less heat to warm. That number is an average over many tissues, and the formula holds because your body stays in one state, never melting or boiling.\n\nm x c = 70,000 x 3.5 = **245,000 J** for every °C\n\ndT = 2,160,000 / 245,000 = **8.8 °C**\n\nYou would go from 37 °C to nearly **46 °C**. Above about 40 °C, the enzymes B5 described start to fail, and that is called **heatstroke**. An hour's run with no cooling would kill you.",
            options: [
                { id: 'cont', label: "So how does sweat get that heat out?", nextNodeId: 'sweat' }
            ]
        },
        sweat: {
            id: 'sweat',
            speaker: 'AI',
            content: "By **evaporating**.\n\nIn liquid water, the molecules cling to each other. To escape as vapour, each molecule has to break free, and that takes energy. The energy comes from whatever the water is sitting on -- your skin.\n\nIt takes a surprising amount. At skin temperature, evaporating water takes about **2,400 J for every gram**. (At its boiling point it takes a little less, about 2,260 J per gram, because hotter molecules already have more energy of their own.) Compare that with warming it: warming 1 g of water by 1 °C takes only 4.2 J. Evaporating that gram takes about **570 times** as much.\n\nSo think of every gram of sweat that evaporates as a tiny delivery van, carrying **2,400 J** out of your body.\n\nHow many grams would carry away the whole 2,160,000 J?\n\n2,160,000 / 2,400 = **900 g** in one hour\n\nA gram of sweat is about a millilitre, so that is about **0.9 litres** an hour. Runners on hot days really do sweat that much.\n\nThe condition matters here. **Only sweat that evaporates cools you.** Sweat that drips off your skin takes almost no heat with it -- it leaves before it has turned into vapour.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Sitting still on the same hot day, a 70 kg body makes about **100 W** of heat.\n\nIf none of it could escape, how much would the body's temperature rise in **one hour**? Remember m x c = 245,000 J for every °C.",
            options: [
                { id: 'right', label: "About 1.5 °C. 100 W x 3,600 s = 360,000 J, and 360,000 / 245,000 = 1.5 °C.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_seconds', label: "About 0.0004 °C, because 100 / 245,000 = 0.0004.", nextNodeId: 'math_wrong' },
                { id: 'no_c', label: "About 5.1 °C, because 360,000 / 70,000 = 5.1.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**0.0004 °C** is the rise in **one second**, not one hour. A watt is a joule **every second**, so the heat for an hour is 100 x 3,600 = **360,000 J**. Leaving out the seconds made the answer 3,600 times too small.\n\n**5.1 °C** divided by the mass alone. But a gram of body needs **3.5 J** to warm by 1 °C, not 1 J. The formula needs both: m x c = 70,000 x 3.5 = **245,000 J** for every °C.\n\ndT = 360,000 / 245,000 = **about 1.5 °C** in one hour\n\nEven sitting still, a body on a hot day would warm by a degree and a half an hour without sweat.",
            options: [
                { id: 'retry', label: "Seconds first, then divide by m x c.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a **70 kg** body on a day when the air is as warm as the skin.\n\n**Heat Made** is how fast the body makes heat, in watts. **Sweat Evaporated** is how many grams of sweat evaporate from the skin in one hour.\n\nThe lab keeps the body's books for one hour: the heat made, the heat carried out by sweat, what is left over, and how much that changes the body's temperature.\n\nTry this:\n\n- Set **Heat Made** to 600 W and find the sweat that holds the temperature steady. It should be **900 g**.\n- Set **Heat Made** to 100 W. Now only **150 g** is needed.\n- Push **Sweat Evaporated** higher than needed, and the body cools.\n\nIn a real body, feedback does this adjusting for you: your brain senses a rise of a few tenths of a degree and turns the sweat up.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "900 g for 600 W. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** You run for an hour at **600 W** on a hot, **humid** day, when damp air makes sweat slow to evaporate.\n\nYou sweat **900 g** -- but only **300 g** evaporates. The rest drips off.\n\nWhat happens to your body temperature over the hour?",
            options: [
                { id: 'right', label: "It rises by about 5.9 °C. Only the 300 g that evaporates carries heat out: 300 x 2,400 = 720,000 J, leaving 1,440,000 J, and 1,440,000 / 245,000 = 5.9 °C.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It stays steady. 900 g of sweat is exactly what 600 W needs.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "900 g **would** be enough -- if all of it evaporated. But sweat that drips off leaves before turning into vapour, so it carries almost no heat out.\n\nKeep the body's books for the hour:\n\n| | Amount | Heat |\n| --- | --- | --- |\n| Heat made (in) | 600 W x 3,600 s | **2,160,000 J** |\n| Sweat that evaporates (out) | 300 g x 2,400 J/g | **720,000 J** |\n| Sweat that drips (out) | 600 g | almost **0 J** |\n| Left in the body | 2,160,000 − 720,000 | **1,440,000 J** |\n\ndT = 1,440,000 / 245,000 = **5.9 °C**\n\nThat would take a runner from 37 °C to about 43 °C -- deep into heatstroke. It is why hot, humid days are so much more dangerous for exercise than hot, dry ones, even at the same temperature.",
            options: [
                { id: 'retry', label: "Only evaporated sweat counts.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Sweat cools you only by evaporating, and each gram carries about 2,400 J out of your body.**\n\nIt also shows why you must drink. At 900 g an hour, a two-hour run takes nearly **2 litres** of water out of you -- and C42 explains that salts leave with it.\n\nThat completes Big Idea 5 at Level 2, and all three lessons kept the same kind of books:\n\n- **L2P5** -- a lever divides the force and multiplies the distance: **work in = work out**\n- **L2C5** -- pressure packs gas into a drink, **k x pressure** of it, and exactly that comes back out when the pressure goes\n- **L2B5** -- a rise of a few tenths of a degree switches on sweat that moves **2,160,000 J** an hour, paid for in grams of water\n\n**How can a small force do a big job?** By trading. A small push moves further; a small pressure change releases a lot of gas; a small signal spends a lot of water. Nothing is free, and the books always balance.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Nothing is free -- the books balance!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You kept a heat budget for a human body.**\n\n- A **watt (W)** is one joule every second; energy = power x time in seconds\n- Keep the books for the body: heat made is **in**, heat carried away is **out**\n- Running hard makes about **600 W**: **2,160,000 J** in an hour\n- When the air is as warm as your skin, heat cannot flow into the air\n- **dT = Q / (m x c)**, with c for the body about **3.5 J/g/°C**, an average over tissues\n- A 70 kg body needs **245,000 J** for each °C\n- No cooling for an hour's run: **8.8 °C** hotter -- heatstroke\n- Evaporating water at skin temperature takes about **2,400 J per gram**\n- **900 g** of evaporated sweat carries off an hour of hard running\n- **Only sweat that evaporates cools you**; dripping sweat does not\n- Humid air slows evaporation, so humid heat is more dangerous\n\nBig Idea 5 is complete at Level 2.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "2,400 joules in every gram of sweat!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Why Sweat Works!**\n\nB5 showed sweating as negative feedback. Level 2 counted the joules it moves.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Power | **1 W = 1 J every second** | Energy = power x time |\n| Heat in | 600 W x 3,600 s = **2,160,000 J** | One hour of hard running |\n| No way out | air as warm as skin | Heat cannot flow into the air |\n| Temperature rise | **dT = Q / (m x c)** | 245,000 J for each °C |\n| No cooling | **8.8 °C** in an hour | Heatstroke |\n| Evaporating sweat | about **2,400 J per gram** | 570 times the heat to warm it 1 °C |\n| Sweat needed | 2,160,000 / 2,400 = **900 g** | About 0.9 litres an hour |\n| Humid day | only evaporated sweat counts | 5.9 °C rise from 300 g |\n| Big Idea 5 at Level 2 | the books balance | Lever, drink and body all trade |\n\n**The one line to remember:** each gram of sweat that evaporates carries about 2,400 joules out of your body -- which is why you can run in the heat, and why you must drink.\n\n**Big Idea 5 is complete at Level 2.**"
        }
    };
}
