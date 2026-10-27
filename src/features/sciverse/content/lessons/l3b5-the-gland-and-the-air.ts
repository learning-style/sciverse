import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 5, biology. The synthesis lesson. Mechanism.
 *
 * Replaces a version that carried the same conclusion as a power equation --
 * most cooling = 240 W x (5.6 kPa - vapour pressure of air) -- and which measured zero
 * structural biology words. It is parked in docs/level4/.
 *
 * The rewrite reaches the same limit through anatomy. A sweat gland is one tube: a
 * coiled ball in the dermis that makes the fluid, and a duct spiralling up through the
 * epidermis to a pore, which reabsorbs most of the salt on the way so sweat is less
 * salty than blood. Beside it, dermal blood vessels widen to carry hot blood close to
 * the surface. Two structures, one delivering heat and the other water.
 *
 * And then the point: NEITHER structure does the cooling. Cooling happens when a water
 * molecule leaves the sweat on the skin, and that step is outside the body entirely. So
 * the body's control ends at the skin surface -- it can make more sweat and it cannot
 * make the air accept it, which is why humidity and not sweat rate sets the ceiling.
 * Named: wet-bulb temperature, and above roughly 31 C a resting person sheds no heat at
 * all however wet they are. The visible sign is sweat that runs off instead of drying.
 *
 * The checkpoint is structural too: a fan works by stripping away the saturated layer of
 * air held against the skin, which is why it helps in dry heat and stops helping when
 * the whole air is saturated.
 *
 * Frames stated: heat is counted leaving the body, water is counted leaving the sweat,
 * and 'wet-bulb' is the temperature a wet thermometer settles at in that air.
 *
 * Still standing: the real survivable wet-bulb is nearer 31 C than 35 because sweating
 * is not perfect; the duct's salt recovery is not total; and nothing here counts how
 * fast a single gland can work.
 */
export function getL3B5Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B5 let you choose how much sweat evaporated, as though that were the body's decision. It is not, and the clearest way to see why is to look at what a sweat gland actually is.\n\n**One gland is a single long tube**, and it has two distinct parts.\n\nDeep down, in the **dermis** -- the **inner skin**, the living layer beneath the surface -- the tube is wound into a tight **coil**, a ball about half a millimetre across. The cells lining that coil pull water and salt out of the surrounding fluid and push it into the tube. That is where sweat is made.\n\nFrom the coil, a **duct** runs upwards, spiralling through the **epidermis** -- the **outer skin**, whose surface cells are dead and flattened -- and opens at a **pore** on the skin. You have somewhere between two and four million of these, and on the palms and soles they are packed several hundred to a square centimetre.\n\nThe duct is not just plumbing. **On the way up, its walls pull most of the salt back out** and return it to the body, leaving the water to continue. That is why sweat tastes only faintly salty when blood is clearly salt -- and why heavy sweating costs you water much faster than it costs you salt.\n\nAnd the glands do not work alone. In the same layer of dermis, **blood vessels widen** -- which is why someone hot goes flushed -- carrying warm blood from the core up close to the surface. So shedding heat needs two structures at once:\n\n- **vessels** bring the **heat** to the skin\n- **glands** bring the **water** to the skin\n\nYour two dials are **Humidity** and **Sweat Rate**.\n\nBefore anything else. Both structures have done their job and there is a layer of sweat on warm skin. **Where does the cooling actually happen?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'leaving', label: "When a water molecule leaves the sweat — so the last step is outside the body.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'gland', label: "In the gland, as it makes the cool fluid.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The gland makes fluid at **body temperature**. It is not refrigeration -- nothing cold comes out of a sweat gland, and a layer of warm water sitting on warm skin removes no heat at all.\n\nThe cooling is in the **leaving**. A water molecule in the sweat is held by the water around it; to break free into the air it has to be given enough energy to escape them, and it takes that energy **from the skin it was sitting on**. Every molecule that leaves carries away a small parcel of heat. Liquid water that stays put carries away none.\n\nSo follow the chain and notice where it ends:\n\n| step | where it happens | who controls it |\n| --- | --- | --- |\n| heat brought to the skin | the **dermis**, in widened vessels | the body |\n| water brought to the skin | the **coil** and the **duct** | the body |\n| water **leaving** the sweat | the **air**, just above the surface | **not the body** |\n\n**The body's control ends at the pore.** It can make a thicker layer, a wetter layer, sweat over more of its surface -- and it cannot make the air accept a single molecule more than the air is willing to take.\n\nWhich reframes the whole question. *How much sweat evaporates* was never a dial the body owns. **The body supplies one half of evaporation and the air supplies the other**, and when the air stops cooperating no amount of the body's half will help.",
            options: [
                { id: 'cont', label: "So when does the air stop cooperating?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**When it is already full of water.**\n\nAir can hold a certain amount of water vapour and no more, and how much depends on its temperature. **Humidity** is how full it already is: at 100% the air is holding all it can. And a molecule can only leave the sweat if there is somewhere for it to go.\n\nSo picture the sweat in two different kinds of air:\n\n- **dry air**: molecules leave the sweat constantly, few return, the sweat thins and disappears, and every departure takes heat with it\n- **saturated air**: molecules still leave, but just as many come back out of the air into the sweat. **Nothing is gained.** The sweat stays, the skin stays wet, and no heat leaves\n\nThat second case has a name you can measure. Hang a wet cloth around a thermometer bulb and blow air over it, and it cools until evaporation stops -- the temperature it settles at is the **wet-bulb temperature** of that air. It is the coldest that evaporation alone can make anything in those conditions, which makes it exactly the right number for a sweating animal.\n\n**And it gives a hard limit on being alive.** A resting human body makes heat continuously -- it cannot stop. If the wet-bulb temperature of the air is as warm as the skin, then evaporation can remove nothing, and the heat the body makes stays in it. Measured on people in heat chambers, the limit is a wet-bulb of about **31 °C**.\n\nNot *uncomfortable*. **A wet-bulb of 31 °C is survivable only for a few hours, in shade, at rest, with water** -- and no amount of sweating changes that, because sweating is the half the body already controls.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "How would you even notice this happening?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**By looking at the skin, and this is the part worth remembering.**\n\nIn dry heat, hard work makes you sweat and the sweat **disappears**. You feel damp and then you do not; your shirt dries in patches; salt crusts on your skin where the water went and the salt the duct did not reclaim stayed behind. That is cooling happening.\n\nIn humid heat, the same work makes the same sweat and the sweat **runs**. It beads, gathers, drips off your nose and soaks your clothes. It feels like you are sweating harder -- and it is the sign that you are being cooled **less**.\n\n| | the sweat | the heat |\n| --- | --- | --- |\n| dry heat | **evaporates** | carried away |\n| humid heat | **runs off** | stays in you |\n\n**Sweat that drips has failed.** Every drop that lands on the ground took water from your blood and removed almost no heat on the way, because it never made the one transition that matters. The body spent its half of the bargain and got nothing back.\n\nAnd that is a genuinely useful thing to know about yourself, because the feeling is misleading in exactly the wrong direction. **Dripping feels like effective cooling and is the opposite**, which is why humid heat kills people who would have been fine in a hotter, drier day -- and why the thing to watch on a forecast is not the temperature but how much water is in the air.\n\nIt also explains the oldest trick in the book: **a fan**.",
            options: [
                { id: 'check', label: "Why does a fan help, then?", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "A fan does not cool the air -- a fan's motor slightly **warms** the room. Yet standing in front of one feels better immediately.\n\nAnd it works much better on a dry day than a humid one. What is it actually doing?",
            options: [
                { id: 'boundary', label: "Stripping away the thin layer of air held against the skin, which has already filled with vapour — so the sweat meets fresh, drier air", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'cold', label: "Blowing cold air onto the skin", nextNodeId: 'math_wrong' },
                { id: 'push', label: "Pushing the sweat off the skin faster", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Look at what sits **immediately** against wet skin, in the first millimetre or two.\n\nWater has been leaving the sweat into that thin layer of air, and because the layer is barely moving, the vapour accumulates there. Within moments it is far more humid than the room -- it may be saturated even when the room is dry. **The sweat is no longer in contact with the room's air. It is in contact with its own exhaust.**\n\nA fan sweeps that layer away and replaces it with room air. The sweat finds somewhere to evaporate into again, and evaporation restarts. Nothing has been cooled; a **gradient has been restored**.\n\nSo *blowing cold air* has the physics wrong -- the air is room temperature or very slightly warmer, and on a day hotter than your skin a fan genuinely does make you warmer by convection while still cooling you by evaporation.\n\nAnd *pushing the sweat off* is backwards in the way the lesson is about: **sweat leaving as liquid is the failure mode.** You want it to leave as vapour, which is the only route that takes heat with it.\n\n**Which is why a fan stops working on a humid day.** It can clear away the saturated layer at the skin, but if the air it brings in is also saturated, there is nowhere for the vapour to go. The fan is still doing its job perfectly; the job has simply become pointless. **A fan fixes a local shortage of dry air, and cannot fix a global one.**",
            options: [
                { id: 'retry', label: "It restores the gradient, nothing more.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The picture is a slice through skin, and every part of it is labelled. The pale upper band marked **outer skin** is the **epidermis**; the pink one below it marked **inner skin** is the **dermis**. Running through the inner skin is the **warm blood** of a widened vessel, and beside it one **sweat gland** -- the **coil** at the bottom, the **duct** spiralling up to its **pore**. The thin blue band on top marked **sweat** is the layer the gland has delivered, and above that is the **air**.\n\nThings worth doing:\n\n- Start with **Humidity** low and a middling **Sweat Rate**. Molecules leave the sweat steadily, the layer stays thin, and the heat arrows leave the skin. This is dry heat working\n- Now raise the **Humidity** towards 100% and watch. Molecules still leave -- but as many come back, the layer thickens instead of thinning, and it starts to run. **The gland has not changed anything**\n- Try to fix it with the other dial. Put **Sweat Rate** to its maximum in saturated air: more sweat, more running, and the heat leaving the skin barely moves. **The body's half of the bargain is already fully paid**\n- Now go the other way -- high humidity but a very low sweat rate. The skin is dry and the heat is also trapped, for a different reason. **Both halves are needed, and only one is yours**\n- And watch the **duct** as the sweat climbs it. Salt is drawn back out through its walls all the way up, which is why the sweat is mostly water by the time it reaches the pore",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "This Big Idea asks how a small force can do a big job. The sweat gland is a candidate: a tube half a millimetre wide, moving a few grams of water, shedding hundreds of watts of heat.\n\nBut after this lesson, what is the honest description of where that leverage comes from?",
            options: [
                { id: 'borrowed', label: "The gland supplies water to a step it does not perform — the leverage is real but it is borrowed from evaporation, which the air can withdraw.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'gland', label: "From the gland itself, which is a remarkably powerful pump for its size.", nextNodeId: 'checkpoint_wrong' },
                { id: 'number', label: "From there being millions of glands, so small forces add up.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Ask what work the gland is doing, and then where the heat actually goes.\n\nThe gland moves water. Moving a few grams of water up half a millimetre of duct is almost no work at all -- it is a trivial job for a tube that size, and nothing about the gland is powerful. **The enormous quantity of heat that leaves is not carried by the gland. It is carried by evaporation**, and evaporation is a property of water and air, not of the animal.\n\nSo the leverage is genuine and it is **borrowed**:\n\n| | |\n| --- | --- |\n| what the body **does** | delivers water to a surface, and heat to the same surface |\n| what removes the heat | **water leaving the sweat**, out in the air |\n| what the body gets | enormous cooling for almost no effort |\n| what the body risks | a lender that can **refuse** |\n\nThat is the real answer to *how can a small force do a big job*, and it is more interesting than a lever: the body has arranged to be in the right place for a large physical effect, rather than producing one. **It is not a pump. It is a tap, positioned next to something free.**\n\nAnd *millions of glands* is true but it is not the leverage -- a million tiny pumps are still tiny pumps. What makes the arrangement powerful is the step none of them performs.\n\n**Every borrowed mechanism comes with the lender's conditions**, and this one's condition is written in the air. When the wet-bulb temperature rises to meet the skin, the loan is called in -- and the body has no fallback, because it never had the mechanism in the first place.",
            options: [
                { id: 'retry', label: "Borrowed from evaporation.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that closes the Big Idea in a way the levers could not.**\n\nP5's lever and C5's dissolving both get a big result from a small input by **arrangement** -- a long arm, a large surface. This lesson finds a body doing the same thing with a step it does not own, and the structures make the arrangement visible:\n\n- the **coil** makes fluid at body temperature, which cools nothing\n- the **duct** carries it up and reclaims the salt, which cools nothing\n- the **vessels** bring heat to the surface, which cools nothing\n- **a molecule leaving the sweat** cools everything, and happens in the air\n\nFour structures positioning one physical effect. **Nothing in the skin is a cooling organ; the skin is a delivery system for somewhere else's physics.**\n\nWhich is why the failure is so abrupt and so unlike the failure of a lever. A lever that is too short still does *some* work. **A body in saturated air does not sweat less effectively -- it sweats just as hard, for nothing**, and the only outward sign is that the sweat is running instead of vanishing.\n\n**Still standing** is one honest number. Heat-chamber work puts the real limit at a wet-bulb near **31 °C** rather than the 35 °C you would guess from skin temperature, because the arrangement is not perfect: some skin is covered, some sweat drips before it can evaporate, and the layer is never uniformly thin. The structure is good, not ideal.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The skin delivers; the air decides!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out why *how much sweat evaporates* was never the body's dial.**\n\n- **A sweat gland is one tube with two parts.** A tight **coil** in the **dermis**, about half a millimetre across, whose lining cells make the fluid; and a **duct** spiralling up through the **epidermis** to a **pore**. Two to four million of them, packed hundreds per square centimetre on palms and soles\n- **The duct is not just plumbing**: its walls pull most of the **salt** back out on the way up and return it to the body. That is why sweat is only faintly salty while blood is clearly salt, and why heavy sweating costs water far faster than salt\n- **Glands do not work alone.** **Blood vessels** in the same dermis widen -- the flush of someone hot -- bringing core heat up to the surface. **Vessels deliver the heat; glands deliver the water**\n- **And neither structure does the cooling.** The gland makes fluid at **body temperature**; warm water on warm skin removes nothing. The cooling is in the **leaving**: a molecule breaking free of the water around it takes the energy to do so from the skin beneath it\n- **So the body's control ends at the pore.** It can make a thicker, wetter, wider layer; it cannot make the air accept one molecule more than the air will take. **The body supplies one half of evaporation and the air supplies the other**\n- In **dry** air molecules leave and few return, so the sweat thins and heat goes. In **saturated** air just as many return as leave: **nothing is gained**, the skin stays wet, the heat stays in\n- The measurable version is the **wet-bulb temperature** -- what a wet thermometer settles at in that air, the coldest evaporation alone can reach. **A resting body makes heat it cannot switch off**, so when the wet-bulb nears skin temperature there is no route out\n- **The visible sign is the opposite of what it feels like.** Sweat that **disappears** is cooling; sweat that **runs and drips** has failed, taking water from your blood and almost no heat with it. Dripping feels like hard cooling and is the reverse, which is why humid heat harms people who would be fine on a hotter dry day\n- **A fan restores a gradient, it does not cool.** The first millimetre of air against wet skin fills with vapour and the sweat ends up in contact with its own exhaust; a fan sweeps that away. So a fan fixes a **local** shortage of dry air and cannot fix a **global** one -- on a saturated day it works perfectly and achieves nothing\n- **The leverage is real and borrowed.** Moving a few grams of water up a tiny duct is almost no work, and the heat is carried by **evaporation**, which belongs to water and air rather than to the animal. **The skin is not a cooling organ; it is a delivery system for somewhere else's physics** -- a tap positioned next to something free\n- Which makes the failure abrupt in a way a lever's is not. A short lever still does some work; **a body in saturated air sweats just as hard, for nothing**\n- **Still standing:** heat-chamber measurements put the real limit at a wet-bulb near **31 °C**, not the 35 you would guess from skin temperature, because some skin is covered, some sweat drips before it can evaporate, and the layer is never evenly thin. The duct's salt recovery is not total either, and how fast one gland can work is not counted here at all.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 5, Level 3", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Can a Small Force Do a Big Job?**\n\nThe physics and chemistry got their leverage from arrangement. So does the body -- but it borrows the step that does the work.\n\n**Summary Table:**\n| | L2B5 said | L3B5 says |\n| --- | --- | --- |\n| What sweats | the body | a **coil** in the **dermis**, up a **duct** to a **pore** |\n| How many | -- | **two to four million** glands |\n| What the duct does | -- | reclaims most of the **salt** on the way up |\n| What brings the heat | -- | **blood vessels** widening in the dermis |\n| Where cooling happens | when sweat evaporates | when a molecule **leaves the sweat** -- in the **air** |\n| Who chooses how much | the learner, by dial | the **air**, by how full of water it is |\n| The measurable limit | -- | **wet-bulb temperature**, about **31 °C** |\n| The visible sign | -- | sweat that **runs** has failed; sweat that **vanishes** worked |\n| What a fan does | -- | restores a **gradient**, cools nothing |\n\n**What ties them together:** a lever, a dissolving surface and a sweat gland all turn a small input into a large result by being arranged in the right place. The gland goes furthest, because the effect it exploits is not even its own -- which is also why it is the only one of the three that can be switched off by the weather.\n\n**The one line to remember:** nothing in your skin is a cooling organ -- the coil, the duct and the vessels only deliver heat and water to a surface, and all the cooling is done by molecules leaving that surface into the air, so when the air is already full the body goes on sweating exactly as hard and gets nothing for it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
