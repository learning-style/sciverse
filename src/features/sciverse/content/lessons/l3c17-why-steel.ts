import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 17, chemistry.
 *
 * L2C17 treated the grip between concrete and steel as a detail about ribs. It is
 * not a detail: it is the reason the pairing works at all, and it rests on two
 * pieces of chemistry the earlier lesson never mentioned.
 *
 *   expansion = alpha x dT x length,   slip = (alpha1 - alpha2) x dT x length
 *
 * Steel expands at about 12 x 10^-6 per degree and concrete at about 10, so over a
 * 10 m beam through a 50 C swing they slip past each other by only 1 mm. Aluminium
 * at 23 x 10^-6 would slip 6.5 mm, six and a half times as much. And fresh concrete
 * is strongly alkaline, near pH 13, which passivates steel -- while the same
 * alkalinity attacks aluminium.
 *
 * Still standing: the whole beam is assumed at one temperature, and the bond also
 * depends on rib shape and cover depth, which are not chemistry.
 */
export function getL3C17Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C17 sized the steel: 120 kN of pull needs 300 mm² of bar, because steel carries 400 N/mm² where concrete manages 3. It added a condition almost in passing -- **the concrete must grip the steel** -- and explained it with ribs on the bar.\n\nRibs are real, and they are not the answer. Ribs would not save a metal that refused to live inside concrete.\n\nThe two dials under the picture are the **beam length** in **metres (m)** and the **temperature swing** in **degrees Celsius (°C)** the beam goes through between a winter night and a summer afternoon.\n\nAluminium is lighter than steel, stronger for its weight, and does not rust. Why is there no aluminium-reinforced concrete?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Something about living inside concrete must suit steel specifically. Perhaps the two materials have to behave alike as conditions change, or the bond tears itself apart.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Cost. Aluminium would work perfectly well but is far more expensive than steel, so nobody bothers.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Aluminium is dearer, and cost is not the obstacle. Aluminium-reinforced concrete fails for two reasons that have nothing to do with price, and both are chemistry.\n\n**The first is temperature.** Every solid expands when warmed, each at its own rate. A beam sitting in the sun does not get to choose: the concrete and the bar inside it must move **together**, because they are stuck to one another. If they want to move by different amounts, something has to give, and what gives is the bond.\n\n**The second is what concrete is chemically.** Fresh concrete is not neutral. It is strongly **alkaline** -- around **pH 13**, more alkaline than oven cleaner -- because cement releases calcium hydroxide as it sets.\n\nThat alkalinity is a gift to steel and a death sentence for aluminium, and you can see why from Big Idea 11's pH scale. Both reasons point the same way, and neither is about money.",
            options: [
                { id: 'cont', label: "Start with the temperature. How much do they differ?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "How much a solid grows when warmed is its **coefficient of thermal expansion**, written **α**, in **per degree Celsius (/°C)**:\n\n**expansion = α x ΔT x length**\n\nwhere **ΔT** is the temperature change. The numbers that matter here:\n\n| Material | α | Over 10 m and 50 °C |\n| --- | --- | --- |\n| Concrete | about **10 x 10⁻⁶ /°C** | grows 5 mm |\n| Steel | about **12 x 10⁻⁶ /°C** | grows 6 mm |\n| Aluminium | about **23 x 10⁻⁶ /°C** | grows 11.5 mm |\n\nA bar stuck inside concrete cannot grow by its own amount. What matters is the **difference**, because that difference is how far the two surfaces try to slide past each other:\n\n**slip = (α of the bar − α of the concrete) x ΔT x length**\n\nSteel against concrete: the gap is only **2 x 10⁻⁶ /°C**. Aluminium against concrete: **13 x 10⁻⁶**, more than six times as much.\n\n**And now the second reason.** Steel rusts in air, yet steel buried in concrete does not. At **pH 13** the iron surface grows a microscopically thin, tough oxide film that stops further attack -- it is **passivated**. Concrete is not merely holding the steel; it is chemically protecting it.\n\nAluminium's oxide film behaves in the opposite way. It survives neutral and mildly acid conditions, which is why aluminium windows last outdoors, but **alkali dissolves it**. Put aluminium in fresh concrete and it corrodes and gives off hydrogen.\n\nThe conditions here are two. **The whole beam is taken to be at one temperature**, when in truth a sunlit face is hotter than a shaded one. And **slip is not the whole bond story** -- rib shape and how deeply the bar is buried matter too, and neither is chemistry.",
            options: [
                { id: 'cont', label: "Work out the slip for a real beam.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A 10 m beam through a 50 °C swing** -- a cold winter night to a hot summer afternoon is not unusual.\n\n**Step 1.** the length in millimetres: 10 m = **10,000 mm**\n\n**Step 2.** steel on its own: 12 x 10⁻⁶ x 50 x 10,000 = **6 mm**\n\n**Step 3.** concrete on its own: 10 x 10⁻⁶ x 50 x 10,000 = **5 mm**\n\n**Step 4.** the slip between them: (12 − 10) x 10⁻⁶ x 50 x 10,000 = **1 mm** over ten metres\n\nOne millimetre, spread along ten thousand. The ribs have very little to hold against, and the bond survives comfortably.\n\n**Now the same beam reinforced with aluminium.**\n\n**Step 1.** aluminium on its own: 23 x 10⁻⁶ x 50 x 10,000 = **11.5 mm**\n\n**Step 2.** the slip: (23 − 10) x 10⁻⁶ x 50 x 10,000 = **6.5 mm**\n\n| Bar material | α | Slip over 10 m, 50 °C | Against steel |\n| --- | --- | --- | --- |\n| Steel | 12 x 10⁻⁶ | **1.0 mm** | — |\n| Aluminium | 23 x 10⁻⁶ | **6.5 mm** | **6.5 times worse** |\n\nAnd this is not a single event. A beam goes through that swing **every year**, and a smaller one every day. The bond is worked back and forth thousands of times, and 6.5 mm of movement per cycle prises concrete off metal.\n\n**Steel's real qualification is not that it is strong. It is that it moves almost exactly as concrete moves.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A **20 m** beam goes through a **60 °C** swing.\n\nHow far do the steel and the concrete try to slide past each other? (α steel = 12 x 10⁻⁶, α concrete = 10 x 10⁻⁶ /°C)",
            options: [
                { id: 'right', label: "2.4 mm. The difference is 2 x 10⁻⁶ /°C, and 2 x 10⁻⁶ x 60 x 20,000 = 2.4 mm.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'used_steel', label: "14.4 mm, from 12 x 10⁻⁶ x 60 x 20,000 -- the steel's own expansion.", nextNodeId: 'math_wrong' },
                { id: 'forgot_mm', label: "0.0024 mm, from 2 x 10⁻⁶ x 60 x 20.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**14.4 mm** is how far the steel would move **if it were free**, and it is not free -- it is glued into concrete that is itself moving 12 mm. The bond only feels the **difference**. A bar that expanded at exactly concrete's rate would stress the bond not at all, however much both of them grew.\n\n**0.0024 mm** left the length in **metres**. α is per degree, so the length must be in the unit you want the answer in: 20 m is **20,000 mm**.\n\n**Step 1.** the mismatch: 12 − 10 = **2 x 10⁻⁶ /°C**\n\n**Step 2.** the length: 20 m = **20,000 mm**\n\n**Step 3.** slip = 2 x 10⁻⁶ x 60 x 20,000 = **2.4 mm**\n\nFor comparison, aluminium in that same beam would slip (23 − 10) x 10⁻⁶ x 60 x 20,000 = **15.6 mm**, which is well over a centimetre of grinding, every year, for the life of the structure.",
            options: [
                { id: 'retry', label: "Only the difference matters.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Beam Length** runs from **2 m** to **30 m**. **Temperature Swing** runs from **10 °C** to **80 °C**.\n\nThe lab draws the beam with a steel bar and an aluminium bar, and works out how far each tries to slide against the concrete.\n\nTry this:\n\n- **10 m** and **50 °C**: steel slips **1 mm**, aluminium slips **6.5 mm**\n- Lengthen the beam and both slips grow in a **straight line**. There is no squaring here -- doubling the length doubles the slip\n- Raise the temperature swing and the same thing happens, for the same reason: both length and ΔT sit on top\n- **30 m** at **80 °C**: steel slips 4.8 mm and aluminium **31.2 mm**, which is why long structures are built with deliberate gaps in them\n- The ratio between the two bars never changes: **6.5 times**, at every setting. It is fixed by the materials, not by the beam",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The mismatch is what does the damage. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** An engineer proposes solving the aluminium problem by coating each aluminium bar in a tough plastic sleeve, so the alkaline concrete can never touch the metal.\n\nThe chemistry objection is dealt with. Does the sleeve make aluminium-reinforced concrete work?",
            options: [
                { id: 'right', label: "No. The sleeve answers the alkali but not the expansion. The aluminium still tries to move 6.5 mm further than the concrete over 10 m, and a slippery sleeve makes the grip worse, not better -- and without grip the bar carries nothing at all.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. Corrosion was the real problem, and with the metal protected the aluminium's lower weight and higher strength per gram become a straightforward advantage.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The sleeve is a genuine answer to **one** of the two reasons, and the other one is the harder of the pair.\n\n| Objection | Does a sleeve fix it? |\n| --- | --- |\n| Alkali dissolves aluminium's oxide film | **Yes** |\n| Aluminium expands 6.5 times further than steel does relative to concrete | **No** |\n\nAnd the sleeve makes the second problem worse. L2C17 was clear that a bar which slips inside concrete carries nothing -- that is why bars are ribbed. A smooth plastic sleeve is a deliberate slip surface. You have protected the bar by disconnecting it from the very thing it was meant to reinforce.\n\nThere is a third cost too, which follows from L3P17. Reinforcement works because concrete and steel share the load, and how they share it depends on stiffness, the **E** from the buckling sum. Aluminium's E is about **70,000 N/mm²** against steel's **200,000** -- under the same stretch aluminium carries less than half as much. Being strong per gram does not help when the concrete around you cracks long before you reach your strength.\n\n**Steel is not in concrete because it is the strongest choice. It is there because it expands like concrete, is protected by concrete, and is stiff enough to take the load before the concrete gives way.** Three coincidences in one metal.",
            options: [
                { id: 'retry', label: "The sleeve fixes the alkali and breaks the grip.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Steel's qualification for living inside concrete is that it expands at almost the same rate, is passivated by concrete's alkalinity rather than attacked by it, and is stiff enough to pick up load before the concrete cracks.**\n\nSo L2C17's passing remark about ribs was standing on far more than it admitted. The grip is possible because the chemistry allows it.\n\nAnd it explains something you can see on any old bridge. Where the concrete cover over a bar is too thin, or has cracked, air and rain get in and carry away the alkalinity -- the concrete **carbonates**, its pH falls from 13 towards 8, and the passive film on the steel dissolves. Then the steel rusts, rust takes up more room than steel, and it splits the concrete off from inside. The brown stain and the flaking corner are the same story: **the protection failed before the steel did.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Steel matches concrete, and concrete protects steel!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found why the pairing works.**\n\n- **expansion = α x ΔT x length**, with α the **coefficient of thermal expansion** in **/°C**\n- Concrete about **10 x 10⁻⁶**, steel about **12 x 10⁻⁶**, aluminium about **23 x 10⁻⁶**\n- A bar glued into concrete feels only the **difference**: **slip = (α of bar − α of concrete) x ΔT x length**\n- Over 10 m and 50 °C, steel slips **1 mm** and aluminium **6.5 mm** -- **6.5 times worse**\n- That ratio is fixed by the materials and never changes with the beam\n- Slip grows in a **straight line** with both length and temperature swing, so a 30 m beam at 80 °C slips 4.8 mm in steel and **31.2 mm** in aluminium\n- Fresh concrete is strongly **alkaline**, near **pH 13**, from the calcium hydroxide cement releases\n- That alkalinity **passivates** steel -- a thin tough oxide film that stops further attack\n- The same alkalinity **dissolves** aluminium's oxide film, so aluminium corrodes and gives off hydrogen\n- Aluminium's stiffness **E** is about 70,000 N/mm² against steel's 200,000, so it picks up less load for the same stretch\n- When cover cracks, concrete **carbonates**, pH falls towards 8, the film goes, and rust splits the concrete from inside\n- Removed: L2C17's treatment of the grip as a detail about ribs\n- Still standing: one temperature for the whole beam, and rib shape and cover depth, which are not chemistry",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Three coincidences in one metal!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Steel, of All Metals**\n\nL2C17 said put steel where the stretching is. Level 3 says why it can be steel at all.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Expansion | **α x ΔT x length** | Every solid grows when warmed |\n| Concrete | 10 x 10⁻⁶ /°C | The rate to match |\n| Steel | 12 x 10⁻⁶ /°C | Almost the same |\n| Aluminium | 23 x 10⁻⁶ /°C | More than twice |\n| What the bond feels | **the difference** | Not either rate alone |\n| Over 10 m, 50 °C | 1 mm against **6.5 mm** | Steel wins 6.5 times over |\n| Concrete's chemistry | about **pH 13** | Alkaline, from calcium hydroxide |\n| For steel | **passivated** | A film that stops attack |\n| For aluminium | film **dissolved** | Corrodes and gives off hydrogen |\n| Stiffness | 200,000 against 70,000 | Steel picks up more load |\n| When cover cracks | **carbonation** | pH falls, rust splits the concrete |\n| Still standing | one temperature, rib shape | Not everything is chemistry |\n\n**The one line to remember:** steel is in concrete not because it is the strongest metal but because it expands like concrete, is protected by concrete, and is stiff enough to take the load first.\n\n**Up next:** B17 at Level 3 -- what that hollow bone is really worth, once you count distance to the fourth power."
        }
    };
}
