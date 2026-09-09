import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P3 "The Energy Ramp".
 *
 * P3 showed potential energy converting to kinetic with two moving bars. This
 * puts numbers on both, derives v = sqrt(2gh) by setting them equal, and finds
 * that the mass cancels.
 *
 * The checkpoint is deliberately the discrepancy: a real ball arrives slower
 * than the formula says, and the missing joules went to heat. That sets up
 * Level 3, where the loss stops being an annoyance and becomes a law.
 */
export function getL2P3Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In P3 you watched two bars trade places: **potential energy** shrinking as a ball rolled down, **kinetic energy** growing as it sped up.\n\nNow put numbers on them.\n\nA **2 kg** ball is held **1.8 m** above the floor. Released, it rolls down a smooth ramp.\n\nHere is the question that decides whether energy is really being conserved: **can you predict how fast it will be going at the bottom, without knowing anything about the ramp's shape?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Yes, if the stored energy at the top all becomes movement energy at the bottom -- then the two amounts must be equal, and that fixes the speed.", nextNodeId: 'formulas', sentiment: 'positive' },
                { id: 'bad', label: "No. A steeper ramp would make it faster and a gentler one slower, so you would need to know the slope first.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A steeper ramp does make it **speed up sooner** -- that part is right, and L3P1 works out exactly how. But it does not change the speed it **arrives at**.\n\nThink about what the ball actually has at the start. It is 1.8 m up, and that is the only thing it has. It is not moving, so it has no movement energy at all. Every joule it ends up with has to come from that height.\n\nA steep ramp and a gentle ramp both drop it the same 1.8 m. The gentle one takes longer and covers more ground, but it delivers the same energy in the end.\n\nSo if energy is genuinely conserved -- if the stored energy simply becomes movement energy rather than appearing or vanishing -- then the speed at the bottom depends **only on the height dropped**, and not on the path taken to get there.\n\nThat is a strong claim, and it is testable. Let us put numbers on both energies and see whether they balance.",
            options: [
                { id: 'cont', label: "Show me the two formulas.", nextNodeId: 'formulas' }
            ]
        },
        formulas: {
            id: 'formulas',
            speaker: 'AI',
            content: "Two formulas, both in **joules (J)**.\n\n**Potential energy** is the energy stored by being high up. Lifting something means pushing against its weight for the whole climb, so it depends on the mass, on gravity, and on the height:\n\n**PE = mgh**\n\n**m** in kilograms, **g = 9.8 m/s²**, **h** in metres.\n\n**Kinetic energy** is the energy of moving. It depends on mass and speed -- but on speed **squared**, which matters enormously:\n\n**KE = ½mv²**\n\nThat square is worth pausing on. Double the speed and the kinetic energy goes up **four** times, not two. It is why a car at 60 mph carries four times the energy it does at 30, and why stopping distances grow so fast.\n\nNow the ball. PE at the top:\n\nPE = 2 x 9.8 x 1.8 = **35.28 J**\n\nIf that all becomes movement energy, then at the bottom **KE = 35.28 J** as well, and you can solve for the speed.",
            options: [
                { id: 'cont', label: "So set them equal?", nextNodeId: 'derive' }
            ]
        },
        derive: {
            id: 'derive',
            speaker: 'AI',
            content: "Exactly. Conservation of energy says the total does not change, so:\n\n**mgh = ½mv²**\n\nAnd now something happens that is worth noticing before you finish the algebra. There is an **m** on both sides.\n\nDivide both sides by m and it disappears completely:\n\ngh = ½v²\nv² = 2gh\n**v = √(2gh)**\n\n**The mass has cancelled.** The speed at the bottom does not depend on how heavy the ball is at all. A marble and a cannonball, dropped the same distance, arrive at the same speed.\n\nThat is not obvious and it is not intuition -- it fell out of the algebra, because mass appears in *both* energies and divides away.\n\nFor our ball:\n\nv = √(2 x 9.8 x 1.8) = √35.28 = **5.94 m/s**\n\nNo mention of the ramp's shape anywhere in that calculation. Only the height.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A **0.5 kg** ball is released from **2.0 m** above the floor on a smooth ramp. Take **g = 9.8 m/s²**.\n\nWhat is its potential energy at the top, and how fast is it going at the bottom?",
            options: [
                { id: 'right', label: "9.8 J, arriving at about 6.3 m/s. PE = 0.5 x 9.8 x 2.0 = 9.8 J, and v = √(2 x 9.8 x 2.0) = √39.2 = 6.26 m/s.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_square', label: "9.8 J, arriving at 19.6 m/s, because v = 2gh = 2 x 9.8 x 2.0.", nextNodeId: 'math_wrong' },
                { id: 'needs_mass', label: "9.8 J, but the speed cannot be found without knowing the ramp's angle.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "The potential energy is right in both. It is the second half that slipped.\n\n**19.6 m/s** forgot the square root. The algebra gave **v² = 2gh**, not v = 2gh -- so 39.2 is the value of **v squared**, and the speed is its square root, **6.26 m/s**.\n\nA sense check catches it. 19.6 m/s is about 70 km/h, from a two-metre drop. Anything you have ever dropped from head height tells you that is far too fast.\n\n**\"The angle is needed\"** is the more understandable answer, because the ramp feels like it should matter. It decides how long the journey takes and how quickly the ball picks up speed -- but the energy at the bottom came entirely from the height, and 2.0 m is 2.0 m whatever route you take down.\n\nv = √(2 x 9.8 x 2.0) = √39.2 = **6.26 m/s**\n\nNotice that neither the mass nor the angle appears. Only **g** and **h**.",
            options: [
                { id: 'retry', label: "Take the square root -- and the path does not matter.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Mass** sets how heavy the ball is. **Drop Height** sets how far it falls.\n\nThe lab shows the potential energy at the top, the kinetic energy at the bottom, and the arrival speed.\n\nMove **Mass** first and watch carefully. Both energies climb together -- a heavier ball genuinely stores more and arrives with more. But the **speed does not move at all**, because the extra energy is spread over extra mass, and the two changes cancel exactly.\n\nNow move **Drop Height**. Everything responds, including the speed.\n\nThat is the whole result in two dials: **energy depends on mass, speed does not.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Mass changes the energy but not the speed. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** You actually run the experiment. The **2 kg** ball, dropped **1.8 m**, which the formula says should arrive at **5.94 m/s**.\n\nYour measurement says **5.0 m/s**.\n\nThe equipment is working and the measurement is good. What happened to the missing energy?",
            options: [
                { id: 'right', label: "It became heat. KE at 5.0 m/s is ½ x 2 x 25 = 25 J, against 35.28 J of stored energy, so about 10 J went into warming the ramp and the air through friction.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Some energy was destroyed by the friction, so conservation of energy does not hold exactly in the real world.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is the most important idea in the lesson, so it is worth being exact. **Energy is never destroyed.** Not by friction, not by anything. What friction does is **move it somewhere you were not counting**.\n\nDo the bookkeeping properly.\n\n**Started with:** PE = 2 x 9.8 x 1.8 = **35.28 J**\n**Arrived with:** KE = ½ x 2 x 5.0² = ½ x 2 x 25 = **25 J**\n**Unaccounted for:** 35.28 − 25 = **10.28 J**\n\nThose 10.28 J are not gone. They are in the ramp, the ball's surface and the surrounding air, as **heat** -- and you have the tools to prove it, because L2C1 gave you **Q = m x c x dT**. Measure the ramp's mass, know its specific heat capacity, and the temperature rise is predictable. It is small, but it is real and it is measurable.\n\nSo the honest statement is not that energy went missing. It is that the equation **mgh = ½mv²** was an incomplete accounting. The full version reads:\n\n**PE at the top = KE at the bottom + energy that became heat**\n\nWhich is why the smooth-ramp formula is a **prediction of the maximum**. A real ball can never beat it, and always falls a little short.",
            options: [
                { id: 'retry', label: "It moved to heat -- I just was not counting that column.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The energy did not go missing. The accounting was incomplete.**\n\nThat is worth carrying, because it is how conservation of energy is actually used. Whenever a total does not balance, the response is never \"energy was lost\" -- it is **\"which column did I forget?\"** Historically that instinct has been extraordinarily productive: several entire forms of energy were discovered precisely because somebody's books would not balance.\n\nSo Big Idea 3 now has a number attached at every stage:\n\n- **PE = mgh** -- energy stored by height\n- **KE = ½mv²** -- energy of movement, going as the **square** of speed\n- Set them equal and **v = √(2gh)**, with the mass cancelling out\n- Real experiments fall short, and the shortfall is **heat**\n\nNext, C3 asks where a chemical reaction's energy shows up -- and hands you a way to measure it, using the very formula that accounts for the heat you just found.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Which column did I forget?", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You balanced an energy budget.**\n\n- **Potential energy: PE = mgh**, in **joules (J)**\n- **Kinetic energy: KE = ½mv²**\n- Speed is **squared**, so doubling it gives **four times** the energy\n- Conservation says **mgh = ½mv²** on a smooth ramp\n- The **m cancels**, giving **v = √(2gh)**\n- So a marble and a cannonball arrive at the **same speed**\n- The ramp's shape does not appear -- only the height dropped\n- A real ball arrives slower, and the shortfall became **heat**\n- 35.28 J stored, 25 J arriving, **10.28 J** into the ramp and the air\n- Energy is never destroyed; a total that will not balance means a **forgotten column**\n\nNext in C3: measuring the energy a chemical reaction gives out.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "v = √(2gh), and the mass cancels!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Balancing the Energy Books!**\n\nP3 showed two bars trading places. Level 2 puts a number on each, and finds the third column that the bars never showed.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Stored by height | **PE = mgh** | In joules |\n| Energy of moving | **KE = ½mv²** | Speed is **squared** |\n| Double the speed | **4x** the energy | Why stopping distance grows fast |\n| Conservation | **mgh = ½mv²** | Set them equal and solve |\n| The mass cancels | **v = √(2gh)** | Marble and cannonball, same speed |\n| The path does not matter | only **h** appears | Steep or gentle, same arrival speed |\n| Real ramps fall short | 35.28 J in, 25 J out | The missing **10.28 J** is heat |\n| Books that will not balance | a forgotten column | Energy is never destroyed |\n\n**The one line to remember:** when the energy does not add up, the question is never where it went -- it is which column you forgot to write down.\n\n**Up next:** C3 -- measuring the energy a reaction releases, using Q = m x c x dT."
        }
    };
}
