import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P10 "Renewable Energy".
 *
 * P10 said renewables are powerful enough to run a town. This lesson puts a
 * number on one home: electrical power = sunlight on each m2 x area x
 * efficiency, and energy = power x time in kWh. Worked: a 1.7 m2 panel at 20%
 * gives 340 W, 1.36 kWh in 4 full-sun hours, so a 10 kWh home needs 8 panels.
 *
 * Frame of reference stated: 1,000 W per m2 on a surface facing the Sun.
 * Condition stated where energy is worked out: full-sun hours pack a varying
 * day into an average. The checkpoint breaks that average across the seasons,
 * and names it as held fixed for Level 3.
 */
export function getL2P10Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In P10, solar panels turned sunlight into electricity. Now put numbers on one home.\n\nAt midday on a clear day, sunlight delivers about **1,000 watts** onto each square metre of a panel facing the Sun. A typical panel has an area of **1.7 m²**.\n\n1,000 W for each m², on 1.7 m², is **1,700 W** of sunlight arriving.\n\nDoes that panel give the home **1,700 W** of electricity?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No. A panel turns only part of the sunlight into electricity -- about a fifth -- so it gives about 340 W. Most of the rest warms the panel up.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes. 1,700 W of sunlight goes in, so 1,700 W of electricity comes out.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "1,000 x 1.7 = 1,700 W is right -- for the sunlight **arriving**. But no panel turns all of it into electricity.\n\nTouch a solar panel that has been sitting in the sun: it is **hot**. Some of the sunlight bounces off, and much of it becomes heat.\n\nP3 said energy is never lost, only changed from one form to another. The panel changes some sunlight into electricity, and more of it into heat -- which the home did not want.\n\nIt is like a sieve catching sand: pour in a bucketful, and only part of it stays in the sieve. How much of the sunlight a panel keeps as electricity has a name.",
            options: [
                { id: 'cont', label: "What is it called?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Three ideas, one at a time.\n\n**Power** is how fast energy is delivered, in **watts (W)**. As in L2P8, 1 W is 1 joule every second.\n\n**Efficiency** is the share of the power going in that comes out as useful power:\n\nefficiency = useful power out / power in\n\nA typical solar panel's efficiency is about **20%**, which is **0.20**. So:\n\n**electrical power = sunlight on each m² x area x efficiency**\n\nThe frame of reference: the **1,000 W on each m²** is measured on a surface **facing the Sun**, at midday on a clear day.\n\n**Energy** is power multiplied by time. Electricity is sold in **kilowatt-hours (kWh)**. A **kilowatt (kW)** is 1,000 W, and 1 kWh is the energy of 1 kW running for 1 hour:\n\n**energy in kWh = power in kW x time in hours**\n\nThe condition belongs here. **The Sun is not at full strength all day**: it rises, sets, and hides behind clouds. So this lesson uses **full-sun hours**: a day's sunlight, counted as the number of hours of full 1,000 W sunshine that would deliver the same energy. A place with **4 full-sun hours** gets as much solar energy in a day as 4 hours of full midday sun.",
            options: [
                { id: 'cont', label: "How many panels does a home need?", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "A model home uses **10 kWh** of electricity a day. (Real homes range from a few kWh to over 30 kWh a day.) It is in a place with **4 full-sun hours** a day.\n\n**Step 1. Power from one panel, in full sun:**\n\n1,000 W for each m² x 1.7 m² x 0.20 = **340 W**, which is **0.34 kW**\n\n**Step 2. Energy from one panel in a day:**\n\n0.34 kW x 4 hours = **1.36 kWh**\n\n**Step 3. Panels for 10 kWh:**\n\n10 / 1.36 = 7.35\n\nYou cannot fit 0.35 of a panel, and 7 panels would fall short. Round **up**: **8 panels**.\n\n**Step 4. Check:** 8 x 1.36 = **10.9 kWh** a day. ✓ Enough.\n\nThose 8 panels cover 8 x 1.7 = **13.6 m²** of roof: about a square 3.7 m along each side.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A home in a sunnier place gets **6 full-sun hours** a day. It uses **12 kWh** a day, and has the same **340 W** panels.\n\nHow many panels does it need?",
            options: [
                { id: 'right', label: "6 panels. Each makes 0.34 kW x 6 hours = 2.04 kWh a day, and 12 / 2.04 = 5.9, which rounds up to 6.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'hours', label: "2 panels, because 12 / 6 = 2.", nextNodeId: 'math_wrong' },
                { id: 'no_time', label: "36 panels, because 12 / 0.34 = 35.3, which rounds up to 36.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**2 panels** divided the energy by the hours, and left out the panel. 12 / 6 = 2 is the power the panels must give during those 6 hours, **2 kW** -- but each panel gives only 0.34 kW.\n\n**36 panels** divided kWh by kW, and left out the time. A panel does not give 0.34 kWh once; it gives 0.34 kW for **every** full-sun hour.\n\n**Step 1.** energy from one panel = 0.34 kW x 6 hours = **2.04 kWh** a day\n\n**Step 2.** panels = 12 / 2.04 = 5.9, rounded **up** to **6 panels**\n\n**Check:** 6 x 2.04 = 12.2 kWh. ✓",
            options: [
                { id: 'retry', label: "Power x time, then divide.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for panels with an efficiency of **20%**, in sunlight of **1,000 W on each m²**.\n\n**Panel Area** is the total area of panels on the roof, in m². **Full-Sun Hours** is the day's sunlight counted as hours of full sun.\n\nThe lab works out the power at full sun, the energy in a day, and compares it with the model home's **10 kWh**.\n\nTry this:\n\n- Set **13.6 m²** and **4 hours**: 10.9 kWh, just enough\n- Drop to **2 hours**, a cloudy winter day: the energy halves\n- Set **8 hours**, and find the smallest area that still makes 10 kWh",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Sunlight x area x efficiency x hours. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A home uses **10 kWh** a day and has the **8 panels** from the worked example: 13.6 m², giving **2.72 kW** in full sun.\n\nIts town gets **2 full-sun hours** a day in winter and **6** in summer. The average is 4 hours, which 8 panels were chosen for.\n\nDoes the home make enough electricity every day of the year?",
            options: [
                { id: 'right', label: "No. In winter it makes 2.72 kW x 2 hours = 5.4 kWh, only about half of what it needs. In summer it makes 16.3 kWh, more than it can use. Enough on average is not enough every day.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. The average is (2 + 6) / 2 = 4 full-sun hours, and 8 panels make 10.9 kWh in 4 hours.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The average really is 4 hours. But the home does not live in the average -- it lives in winter, and then in summer.\n\n| Season | Full-sun hours | Energy = 2.72 kW x hours | Compared with 10 kWh |\n| --- | --- | --- | --- |\n| Winter | 2 | **5.4 kWh** | about half |\n| Average | 4 | 10.9 kWh | just enough |\n| Summer | 6 | **16.3 kWh** | 6.3 kWh extra |\n\nIn winter the home is short by about 4.6 kWh **every day**. Summer's extra cannot simply be saved for winter: a home battery holds a day or so, not months of sunshine.\n\nThat is why homes with panels usually stay connected to the electricity grid -- and why P10's town mixed its sources.",
            options: [
                { id: 'retry', label: "An average hides the seasons.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Enough energy on average is not enough energy every day.**\n\nThat is the real test of any energy source: not only how much it gives, but **when**. A panel's output follows the Sun; the home's needs follow the people in it.\n\nOne thing this lesson held fixed: **full-sun hours pack a changing day into one steady average.** For sunlight, that average works well over a single day. Level 3 takes on a source that swings far more: **wind** -- where working out the average first gives the wrong answer.\n\nC10 said burning fuel makes CO₂. C10 at Level 2 works out how much.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Not just how much, but when!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You worked out how many panels power a home.**\n\n- **Power**, in watts, is how fast energy is delivered; **1 kW = 1,000 W**\n- **efficiency = useful power out / power in**; a solar panel is about **20%**\n- **electrical power = sunlight on each m² x area x efficiency**\n- Frame of reference: 1,000 W on each m² of a surface **facing the Sun**\n- **energy in kWh = power in kW x time in hours**\n- **Full-sun hours** count a day's sunlight as hours of full sun\n- One 1.7 m² panel: **340 W**, and **1.36 kWh** in 4 full-sun hours\n- A 10 kWh home needs 10 / 1.36 = 7.35, rounded **up** to **8 panels**\n- 6 full-sun hours and 12 kWh: **6 panels**\n- Winter's 2 hours give **5.4 kWh**; summer's 6 give **16.3 kWh**\n- Enough on average is not enough every day\n- Held fixed: a changing day packed into a steady average",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Power x time!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Many Solar Panels Power a Home?**\n\nP10 said sunlight can make electricity. Level 2 works out how much.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Efficiency | **useful out / in** | A panel keeps about 20% |\n| Electrical power | **sunlight x area x efficiency** | 1,000 x 1.7 x 0.20 = **340 W** |\n| Energy | **kW x hours** | Sold in kWh |\n| Full-sun hours | a day as hours of full sun | 4 hours: **1.36 kWh** a panel |\n| Panels needed | 10 / 1.36, rounded up | **8 panels** |\n| A sunnier home | 12 / 2.04, rounded up | **6 panels** |\n| Winter and summer | 5.4 kWh and 16.3 kWh | Averages hide the seasons |\n\n**The one line to remember:** a panel's electricity is sunlight x area x efficiency -- and the energy is that power multiplied by the hours of sun.\n\n**Up next:** C10 -- how a car can make more carbon dioxide than the fuel it burns."
        }
    };
}
