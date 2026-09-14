import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to C8 "The Water Cycle".
 *
 * C8's clouds formed when rising vapour cooled. This lesson explains the
 * cooling with numbers: a table of the most water vapour that can stay as
 * vapour at each temperature, relative humidity = actual / maximum (the frame
 * of reference: the maximum at the air's own temperature), and the dew point,
 * where the two meet. Dew, a sweating glass and C8's clouds are one idea.
 *
 * Avoids "air holds water like a sponge": the limit is set by temperature.
 * Condition stated where the table is given: near the ground, over liquid
 * water. How fast rising air cools is left, by name, to Level 3.
 */
export function getL2C8Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In C8, our water molecule Droplet rose into the sky, cooled, and condensed into a cloud.\n\nBut water turns back into liquid even where there are no clouds and nothing is rising.\n\n- On a clear, still night, the grass is covered in **dew** by morning\n- On a warm day, a glass of cold juice gets covered in **drops of water** on the outside\n\nWhere does that water come from?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "From water vapour in the air. Cooling it lowers how much water can stay as vapour, so near a cold surface the extra condenses into liquid.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "The glass leaks juice through tiny holes, and grass lets out water at night.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is easy to test. Fill a glass with **orange juice** straight from the fridge. The drops that form on the outside are **clear** water, not orange juice -- so they did not come through the glass.\n\nAnd a dry metal can from the fridge, with no juice anywhere near its outside, gets wet just the same. So does a cold car window, and so does the grass under a clear sky.\n\nThe water comes from the **air**. There is always some **water vapour** mixed in with the air around you -- C8's invisible gas. When it touches something cold, some of it turns back into liquid.\n\nThe question is **how cold** is cold enough.",
            options: [
                { id: 'cont', label: "How cold is cold enough?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "First, a way to measure how much water vapour there is. The **vapour density** is the mass of water vapour in each cubic metre of air, in **g/m³**.\n\nNow the key fact. **At any temperature, only so much water can stay as vapour.** Above that limit, the extra condenses. And the limit **falls as the temperature falls**:\n\n| Temperature | Most water vapour that can stay as vapour |\n| --- | --- |\n| 0 °C | 4.8 g/m³ |\n| 10 °C | 9.4 g/m³ |\n| 15 °C | 12.8 g/m³ |\n| 20 °C | 17.3 g/m³ |\n| 25 °C | 23.0 g/m³ |\n| 30 °C | 30.4 g/m³ |\n\nPeople often say warm air \"holds\" more water, as if air were a sponge. It is not really the air. It is the **temperature**: warmer water molecules move fast enough to stay apart as a gas.\n\nTwo terms follow.\n\n**Relative humidity** compares the vapour that is there with the most that could be there **at the air's own temperature**:\n\n**relative humidity = actual vapour density / most vapour at that temperature x 100%**\n\nThe **dew point** is the temperature you would have to cool the air to for the actual vapour to reach the limit -- relative humidity 100%. **Cool anything below the dew point, and water condenses on it.**\n\nThe condition belongs here. **The table is for air near the ground, with vapour above liquid water.**",
            options: [
                { id: 'cont', label: "Work out a summer day.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "A summer afternoon: the air is **30 °C**, with **12.8 g/m³** of water vapour.\n\n**Relative humidity:**\n\nmost vapour at 30 °C = 30.4 g/m³\nrelative humidity = 12.8 / 30.4 x 100% = **42%**\n\nThe air has less than half the vapour it could have at 30 °C. It feels dry, and puddles evaporate fast.\n\n**Dew point:** find the temperature in the table where 12.8 g/m³ is the limit. That is **15 °C**.\n\n**That night**, the air cools. At 20 °C, the limit is 17.3 g/m³, and the humidity is 12.8 / 17.3 = 74%. At **15 °C**, the limit is 12.8 g/m³: the humidity reaches **100%**.\n\nThe grass cools faster than the air above it on a clear night. As soon as the grass drops below **15 °C**, vapour condenses on it -- and by morning there is **dew**.\n\nThe amount of vapour never changed. **The temperature changed, and so did the limit.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A room is at **25 °C**, and the air in it has **17.3 g/m³** of water vapour.\n\nWhat is its relative humidity?",
            options: [
                { id: 'right', label: "75%. The most vapour at 25 °C is 23.0 g/m³, and 17.3 / 23.0 x 100% = 75%.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'flipped', label: "133%, because 23.0 / 17.3 x 100% = 133%.", nextNodeId: 'math_wrong' },
                { id: 'subtract', label: "5.7%, because 23.0 − 17.3 = 5.7.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**133%** turned the fraction upside down. Relative humidity is the vapour that **is** there over the most that **could** be there. The actual amount goes in the **numerator**. A relative humidity over 100% would mean more vapour than can stay as vapour -- it would already be condensing.\n\n**5.7%** subtracted. 23.0 − 17.3 = 5.7 g/m³ is how much **more** vapour could stay as vapour -- a real amount, in g/m³, but not a percentage. Relative humidity is a **comparison**, so it needs a division.\n\nrelative humidity = 17.3 / 23.0 x 100% = **75%**",
            options: [
                { id: 'retry', label: "Actual over most, times 100%.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Air Temperature** is in °C. **Water Vapour** is the vapour density, in g/m³.\n\nThe lab draws the limit from the table as a curve, marks your air on it, and works out the relative humidity and the dew point. If you push the vapour above the limit, it shows the extra condensing.\n\nTry this:\n\n- Set **Water Vapour** to **12.8 g/m³**. Slide **Air Temperature** from 30 °C down to 15 °C, and watch the humidity climb to 100%\n- Keep the temperature at 25 °C and add vapour until it condenses\n- Notice how the curve bends: each 10 °C of warming nearly **doubles** the limit",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Below the dew point, water condenses. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A kitchen is at **25 °C**, with **12.8 g/m³** of water vapour in the air.\n\nOn the table are a **can of juice** straight from the fridge, at **10 °C**, and a **glass of juice** that has been standing a while, at **18 °C**.\n\nWhich one gets drops of water on the outside?",
            options: [
                { id: 'right', label: "Only the can. The air's dew point is 15 °C, where 12.8 g/m³ is the limit. The can at 10 °C is below it, so water condenses on it; the glass at 18 °C is above it, so it stays dry.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Both. They are both colder than the 25 °C room, so water condenses on anything colder than the air.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Being colder than the room is not enough. What matters is being colder than the **dew point** -- the temperature at which the air's 12.8 g/m³ reaches the limit.\n\nFrom the table, the limit is 12.8 g/m³ at **15 °C**. So the dew point is 15 °C.\n\n| Object | Temperature | Limit right beside it | Air's vapour | Result |\n| --- | --- | --- | --- | --- |\n| Can | 10 °C | 9.4 g/m³ | 12.8 g/m³ | above the limit: **drops form** |\n| Glass | 18 °C | about 15 g/m³ | 12.8 g/m³ | below the limit: **stays dry** |\n\nThe air touching the can is cooled below its dew point, so the extra vapour condenses. The glass cools the air beside it too -- but not enough.",
            options: [
                { id: 'retry', label: "Colder than the dew point, not just colder than the room.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Water condenses on anything colder than the air's dew point.**\n\nThat single idea explains all of C8's condensation:\n\n- **Dew** forms when grass cools below the dew point on a clear night\n- **Fog** forms when the air itself cools below its dew point near the ground\n- A **cloud** forms when rising air cools below its dew point high up -- which is exactly what happened to Droplet\n\nThis lesson took the air's temperature as given. How fast air cools as it rises -- and so how high the clouds start -- is a question for Level 3.\n\nB8 takes the heat and weather of this Big Idea to an animal that has to live in it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Below the dew point, water condenses!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found when water vapour turns back into liquid.**\n\n- The drops on a cold glass come from **water vapour in the air**, not through the glass\n- **Vapour density** is grams of water vapour in each cubic metre of air, in **g/m³**\n- At each temperature, only so much water can stay as vapour -- and the limit falls as it cools\n- It is the **temperature** that sets the limit, not air acting like a sponge\n- 0 °C **4.8**, 10 °C **9.4**, 15 °C **12.8**, 20 °C **17.3**, 25 °C **23.0**, 30 °C **30.4** g/m³\n- **relative humidity = actual / most at that temperature x 100%**\n- The **dew point** is where the actual vapour reaches the limit\n- 30 °C with 12.8 g/m³: **42%**, dew point **15 °C**\n- 25 °C with 17.3 g/m³: **75%**\n- Water condenses on anything colder than the dew point: dew, fog, clouds\n- Each 10 °C of warming nearly doubles the limit",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Colder than the dew point, water appears!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Why Cold Things Get Wet!**\n\nC8 followed water vapour condensing into a cloud. Level 2 finds exactly when it happens.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Vapour density | g of vapour per m³ of air | How much is there |\n| The limit | falls as temperature falls | 30.4 g/m³ at 30 °C, 9.4 at 10 °C |\n| Relative humidity | **actual / most x 100%** | Compared at the air's own temperature |\n| Summer afternoon | 12.8 / 30.4 = **42%** | Dry-feeling air |\n| Dew point | where actual = most | 15 °C for 12.8 g/m³ |\n| A room | 17.3 / 23.0 = **75%** | Actual in the numerator |\n| The can and the glass | 10 °C against 18 °C | Only below the dew point |\n| Dew, fog, clouds | cooling below the dew point | One idea |\n\n**The one line to remember:** cool air below its dew point, and the water vapour it contains starts turning back into liquid -- on grass, on a cold can, or high in the sky as a cloud.\n\n**Up next:** B8 -- how cold a fox can get before it has to work to stay warm."
        }
    };
}
