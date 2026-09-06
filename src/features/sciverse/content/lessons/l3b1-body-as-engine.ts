import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 1, biology. The synthesis lesson.
 *
 * It reframes L2B1's lever equation as a statement about work rather than a
 * balance of moments -- the muscle's eight-fold force is paid for by moving an
 * eighth of the distance, so the work is unchanged. That reframing is what lets
 * efficiency and waste heat follow.
 *
 * Then it collects the other two Level 3 lessons: work comes from L3P1's forces,
 * and the waste heat is shed using L3C1's latent heat of vaporisation, which is
 * why the 2260 J/g figure was flagged as working in both directions.
 */
export function getL3B1Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In L2B1 you worked out something startling about your own arm. Holding a **50 N** load in your hand, **32 cm** from the elbow, forces the bicep -- attached only **4 cm** from the elbow -- to pull with about **400 N**.\n\nEight times the force of the thing you are holding.\n\nThat sounds like a terrible bargain, and it raises an obvious question. If the muscle pulls with eight times the force, is it doing **eight times the work**?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No. The muscle only shortens by a tiny amount while the hand sweeps through a large arc, so eight times the force is paid for by an eighth of the distance.", nextNodeId: 'work', sentiment: 'positive' },
                { id: 'bad', label: "Yes. Work comes from force, so eight times the force must mean eight times the work.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Work does come from force -- but not from force alone.\n\n**Work = force x distance moved in the direction of the force**, written **W = Fd**, and measured in **joules (J)**.\n\nThat second factor is the one the question is hiding. Watch what the arm actually does when you curl a weight.\n\nThe bicep attaches **4 cm** from the elbow. The hand is **32 cm** from it. Both swing through the same angle, because they are rigid parts of one lever -- so the hand travels **eight times as far** as the muscle's attachment point.\n\nRaise your hand by **32 cm** and the muscle has shortened by about **4 cm**.\n\nNow do both sums:\n\n- **Muscle:** 400 N x 0.04 m = **16 J**\n- **Load:** 50 N x 0.32 m = **16 J**\n\nIdentical. The eight-fold force is exactly cancelled by the eighth of the distance.\n\nThat is not a coincidence of these numbers. It is what L2B1's equation was really saying all along. **Force x distance on one side equals force x distance on the other** -- a lever does not create anything, it **trades force for distance**.",
            options: [
                { id: 'cont', label: "So the lever trades, rather than gains?", nextNodeId: 'work' }
            ]
        },
        work: {
            id: 'work',
            speaker: 'AI',
            content: "Exactly, and this reframes what you learned at Level 2.\n\nL2B1 gave you **load x load distance = muscle force x muscle distance** and called it a balance of turning effects. True. But read those products again -- each is a force multiplied by a distance, which is **work**.\n\nSo the moment equation is a statement about **conservation of energy** wearing different clothes. Whatever a lever gives you in force, it takes back in distance, and the work is untouched.\n\nThat is why your arm is built the way it is. It is a **bad** deal for force and a **superb** one for speed and reach: your hand moves eight times faster and eight times further than the muscle ever could. A muscle that shortens a few centimetres throws a ball across a field.\n\nNow put a number on the work of doing something useful. Lifting a mass **m** through a height **h** means pushing up against its weight **mg** for the whole distance:\n\n**W = mgh**\n\nFor a **70 kg** person climbing **10 m** of stairs, with **g = 9.8 m/s²**:\n\nW = 70 x 9.8 x 10 = **6,860 J**\n\nThat is the honest, unavoidable minimum. Physics says the climb costs 6,860 J of useful work no matter how you do it.\n\nYour body, unfortunately, is not offered that price.",
            options: [
                { id: 'cont', label: "Why not? What does it actually cost?", nextNodeId: 'efficiency' }
            ]
        },
        efficiency: {
            id: 'efficiency',
            speaker: 'AI',
            content: "Because muscle is an **engine**, and no engine turns all of its fuel into useful work.\n\n**Efficiency** is the fraction that does become useful work:\n\n**η = useful work out / total energy in**\n\nFor human muscle, η is roughly **0.25** -- about **25%**. For every 4 J of chemical energy released from food, about 1 J becomes movement and about 3 J becomes **heat**.\n\nRearrange to find what the climb really costs:\n\n**total energy in = W / η** = 6,860 / 0.25 = **27,440 J**\n\nAnd the waste is the difference:\n\n**heat = 27,440 − 6,860 = 20,580 J**\n\n**Three times as much heat as work.** That is not a flaw in you specifically -- it is close to the best any muscle manages, and a car engine does worse.\n\nWhich creates a problem the physics of Level 3 can now measure. That heat is being dumped into a body that is mostly water, and from L2C1 you know water's specific heat capacity is **4.2 J/g/°C**.\n\nA 70 kg person is about 70,000 g. If none of that heat escaped:\n\ndT = Q / (m x c) = 20,580 / (70,000 x 4.2) = **0.07 °C**\n\nA tenth of a degree for ten metres of stairs. Comfortable enough -- until you climb three hundred metres, when it becomes about **2 °C**, and a rise of 5 °C in core temperature is life-threatening.\n\nSo the heat has to go somewhere.",
            options: [
                { id: 'try', label: "Let me check the efficiency arithmetic first.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A climber does **6,860 J** of useful work getting up a staircase. Human muscle is about **25% efficient**.\n\nHow much chemical energy did their body have to release to do it?",
            options: [
                { id: 'right', label: "27,440 J, because 6,860 / 0.25 = 27,440.", nextNodeId: 'sweat', sentiment: 'positive' },
                { id: 'multiplied', label: "1,715 J, because 6,860 x 0.25 = 1,715.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "8,575 J, because you add on the 25% that gets wasted.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both are the right numbers combined the wrong way, and there is a check that catches either instantly.\n\n**Ask which figure should be larger.** The body must release **more** energy than it delivers as work, because some is always lost. So the answer has to be **bigger than 6,860 J**.\n\n**1,715 J** is smaller. It is 25% *of* the work, which would mean the body somehow got four times more out than it put in. Multiplying by η goes the wrong way -- η sits in the **denominator** when you are solving for the input.\n\n**8,575 J** is bigger, so it survives the first check, but it treats the 25% as a surcharge added to the work. It is not a surcharge; it is the **fraction that arrives**. If only a quarter arrives, the input must be **four times** the output, not a quarter more.\n\nη = W / E, so **E = W / η** = 6,860 / 0.25 = **27,440 J**\n\nA quarter arriving means multiplying by four. That is the same denominator reasoning as L2P1's a = F/m and L2C1's dT = Q/(mc) -- when the quantity you know is on the bottom, solving for the top means dividing by it.",
            options: [
                { id: 'retry', label: "A quarter arriving means four times as much went in.", nextNodeId: 'sweat' }
            ]
        },
        sweat: {
            id: 'sweat',
            speaker: 'AI',
            content: "Now the elegant part, and it is L3C1 returning in a completely different setting.\n\nYour body sheds that heat mainly by **evaporating water from your skin**. Not by the sweat being warm and running off -- by it **changing state**.\n\nEvaporation costs the **specific latent heat of vaporisation**, and every gram that leaves your skin as vapour carries away **2,260 J**.\n\n(It is slightly higher at skin temperature than at 100 °C -- about 2,430 J/g at 35 °C -- but 2,260 J/g is close enough to see the scale of it.)\n\nTwo dials in the lab: **Body Mass** sets how heavy the climber is, and **Height Climbed** sets how far up they go. Both feed straight into W = mgh.\n\nSo how much sweat has to **evaporate** to cover the staircase?\n\n**mass of sweat = heat / L_v** = 20,580 / 2,260 = **9.1 g**\n\nAbout **9 millilitres**. Under two teaspoons for ten metres of climbing.\n\nThat number is small precisely **because L_v is so large**. Look at what the alternative would be. To carry away the same 20,580 J by warming sweat instead of evaporating it, from 35 °C up to body-surface warmth, you would need litres of it. Evaporation is roughly **five hundred times** more effective per gram than warming.\n\nThe reason is exactly what L3C1 explained: warming a gram of water by one degree costs 4.2 J, while pulling that gram completely free of its neighbours costs 2,260 J. Your body is not using sweat as a coolant. **It is using the change of state.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "I have explored the numbers. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two rooms, both at **35 °C**. You do the same hard exercise in each.\n\nIn the **dry** room you sweat, and you cope.\n\nIn the **humid** room, where the air is nearly saturated with water vapour, you are drenched within minutes and your temperature climbs dangerously -- even though you are producing **more** sweat than in the dry room.\n\nMore sweat, worse cooling. Why?",
            options: [
                { id: 'right', label: "The cooling comes from evaporation, not from the sweat itself. Saturated air cannot accept more vapour, so the sweat stays liquid, drips off, and takes almost none of the 2,260 J per gram with it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Humid air holds more heat than dry air, so the room is effectively hotter and simply overwhelms you.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Both rooms are at 35 °C, so neither is hotter. The difference is not in the air's temperature -- it is in what the air will **accept**.\n\nGo back to where the 2,260 J per gram is actually paid. It is paid **at the moment of evaporation**, when a molecule breaks free of the liquid and leaves as vapour. Sweat sitting on your skin has cost nothing yet. Sweat that rolls down your back and drips onto the floor takes almost no energy with it at all -- it leaves as a warm liquid, not as vapour.\n\nIn saturated air, molecules cannot leave the skin faster than they return. Evaporation nearly stops. The sweat glands keep working, so you produce more and more, and none of it is doing the job.\n\n**Producing sweat is not cooling. Evaporating it is.**\n\nThis is why a hot dry day is bearable and a hot humid one is not, and it is the physical basis of the \"wet bulb\" temperature used in heat warnings -- a thermometer with a damp cloth over its bulb, which measures how much cooling evaporation can still deliver. When wet-bulb temperature reaches about 35 °C, a healthy person cannot shed metabolic heat at all, however much they sweat.\n\nIt is also why a fan helps: it does not cool the air, it sweeps saturated air away from your skin and lets evaporation resume.",
            options: [
                { id: 'retry', label: "The energy is paid on evaporation, not on production.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The energy is paid at the moment of evaporation, and nowhere else.**\n\nThat completes Big Idea 1 at Level 3, and the three lessons turn out to be one argument.\n\n- **L3P1** gave you **forces as vectors**, resolved into components, and **a = g(sin θ − μ cos θ)** -- with the mass cancelling out entirely\n- **L3C1** gave you **latent heat**, **Q = mL**, and the 2,260 J/g that a thermometer cannot see\n- **L3B1** spent both: **W = Fd** to find the work, **η** to find what it truly cost, and **L_v** to get rid of what was wasted\n\nA staircase, a boiling pan and a ramp are the same physics.\n\nAnd look back along all three levels of this Big Idea, because the shape is the lesson:\n\n**Level 1** -- a push makes things move, and friction slows them.\n**Level 2** -- **a = F/m**, on a line, with friction as a number.\n**Level 3** -- forces are vectors, friction is **μN**, and a lever trades force for distance while conserving work.\n\n**No level corrected the one below it. Each removed a simplification the one below depended on.** Level 2's friction-as-a-number was not a lie; it was true enough for flat ground, and it told you so. Level 3's μ is not final either -- static exceeds kinetic, and both drift with speed and temperature.\n\nThat is not a weakness of the subject. **It is how the subject works**, and knowing which simplification you are standing on is most of what it means to understand something.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Each level removes a simplification!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You ran the body as an engine.**\n\n- **Work = force x distance**, **W = Fd**, in **joules (J)**\n- A **lever trades force for distance** and leaves the work unchanged\n- The bicep's 400 N over 4 cm and the load's 50 N over 32 cm are both **16 J**\n- L2B1's moment equation was **conservation of energy** in other clothes\n- The arm is a bad deal for force and a superb one for **speed and reach**\n- Lifting: **W = mgh** -- 70 kg up 10 m is **6,860 J**\n- **Efficiency η = useful work / total energy in**, about **0.25** for muscle\n- **total in = W / η** = 27,440 J, so **heat = 20,580 J** -- three times the work\n- Trapped, that heat would raise a 70 kg body by only **0.07 °C** -- but 300 m of climbing gives **2 °C**\n- Sweat cools by **evaporating**, at **L_v = 2,260 J/g**, so the climb costs about **9 g**\n- Evaporating is roughly **500 times** more effective per gram than warming the sweat\n- In **saturated air** evaporation stops, so sweat drips off having cooled nothing\n\nBig Idea 1 is now complete at all three levels.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Levers trade force for distance; evaporation does the cooling!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- The Body as an Engine!**\n\nLevel 2 weighed the forces in your arm. Level 3 asks what they cost, and where the waste goes.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Work | **W = Fd** | Force alone is not the cost |\n| Levers trade | 400 N x 4 cm = 50 N x 32 cm | Both **16 J** -- work is conserved |\n| Lifting | **W = mgh** | 70 kg up 10 m is **6,860 J** |\n| Efficiency | **η = W / E**, about **0.25** | Three joules of heat per joule of work |\n| Solving for input | **E = W / η** | A quarter arriving means **4x** went in |\n| Shedding the heat | **m = Q / L_v** | About **9 g** of sweat for that climb |\n| Why evaporation | 2,260 J/g against 4.2 J/g/°C | Roughly **500x** better per gram |\n| Humid air | evaporation stalls | Sweat that drips has cooled nothing |\n\n**The one line to remember:** a lever changes the force but never the work, and of the energy your body spends, three quarters leaves as heat that only a change of state can carry away fast enough.\n\n**Big Idea 1 is complete at all three levels.** Level 1 asked why things move, Level 2 put numbers on it, and Level 3 removed the simplifications those numbers rested on."
        }
    };
}
