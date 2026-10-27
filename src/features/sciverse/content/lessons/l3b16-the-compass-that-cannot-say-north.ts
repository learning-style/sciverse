import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 16, biology. Closes the Big Idea. Mechanism + Limit.
 *
 * Replaces a version built on weighted averaging -- combined error = sqrt((s1 x e1)^2 +
 * (s2 x e2)^2), searched for a lowest point at a 94/6 split -- which measured zero
 * structural biology words. Parked in docs/level4/.
 *
 * The simplification this one removes is better, because L2B16 named it without noticing:
 * it treated THE MAGNETIC SENSE as one black box returning a bearing. It is not a needle,
 * and the two structures that might do the job cannot report north.
 *
 *   magnetite    crystals of iron oxide in cells, feeling a TORQUE. A torque tells you
 *                the LINE the field runs along; a twist has no built-in far end.
 *   cryptochrome a protein in the retina that absorbs blue light and leaves a RADICAL
 *                PAIR -- two molecules each with one unpaired electron. The field alters
 *                how the pair's magnetism evolves and so how much product the reaction
 *                makes. Hence: it needs light, it is in the eye, and its response depends
 *                on the ANGLE to the field and is unchanged when the field is reversed.
 *
 * Both are axial, so what a bird knows is POLEWARD or EQUATORWARD, not north or south --
 * an inclination compass. Which is testable and was tested: reverse the vertical
 * component and the bird reverses its heading, reverse the horizontal and it does not.
 * And it fails outright at the magnetic equator, where the field is level.
 *
 * It then reverses L2B16's conclusion while keeping its finding. L2B16 proved averaging
 * cancels scatter and never bias, and magnetic rock is a bias. So the star compass is not
 * a second vote to be averaged in -- it is the REFERENCE, found by watching the sky rotate
 * and locating the still point, and the magnetic compass is the one that gets corrected.
 *
 * The chemistry tie is earned rather than gestured at: L2C16 measured magnetite's Curie
 * temperature at 585 C, and a bird runs at 41 C, so a crystal in a warm body stays
 * magnetic. At 35 C the sense could not exist.
 *
 * Frames stated: inclination is measured downward from the horizontal ground; poleward
 * means toward the nearer magnetic pole; a torque is counted on the crystal.
 *
 * Still standing: how a radical pair's chemistry becomes a nerve impulse is not known,
 * whether the beak magnetite cells are sensors at all is contested, and the two senses
 * are treated here as separate when they may well work together.
 */
export function getL3B16Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B16 priced a second sense and did it properly -- averaging independent cues divides the scatter by the square root of how many you have, and does nothing at all about a bias.\n\nBut look at what it assumed on the way. **It treated the magnetic sense as one thing that returns a bearing**, good to so many degrees, like a compass with a wobble. That is the simplification to remove, and removing it changes what the bird is doing.\n\n**There is no needle.** A compass needle is a magnet free to swing on a pivot, and nothing in a bird is free to swing. So whatever the sense is, it is built out of cells -- and a cell can only report what its own structure lets it feel.\n\nTwo structures are candidates, and this lesson is about both:\n\n- **magnetite** -- crystals of **iron oxide**, the mineral L2C16 measured a Curie temperature for, grown inside cells\n- **cryptochrome** -- a **protein** in the **retina**, the light-sensitive sheet at the back of the eye\n\nYour dials are **Field Angle Into the Ground** and **Light on the Eye**, and that second dial is already a clue: a compass does not care whether the lights are on.\n\nSo, before the structures. Does a bird's magnetic sense tell it which way is **north**?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'incl', label: "Probably not north as such — if it is built from cells, it can only report whatever those cells actually feel, which need not be a direction at all.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'north', label: "Yes — it is a biological compass, so it points north the way a compass needle does.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is the obvious reading of the word *compass*, and the experiment that broke it is simple enough to describe in a sentence.\n\n**Put a migrating bird in a cage inside coils that can change the field around it, and see which way it tries to go.**\n\nEarth's field has two parts: a **horizontal** part, running along the ground toward the magnetic pole, and a **vertical** part, running down into it. Reverse them one at a time.\n\n| What was reversed | What a needle would do | What the bird did |\n| --- | --- | --- |\n| the **horizontal** part | swing right round | **carried on the same way** |\n| the **vertical** part | nothing much | **reversed its heading** |\n\nA compass needle lives or dies by the horizontal part -- that is the part it swings into line with. The bird ignored it, and was turned around by the part a needle barely uses.\n\nSo the bird is not reading the same thing a needle reads. **It is reading the angle at which the field dips into the ground** -- its **inclination**, measured downward from the horizontal ground. That angle is steep near the poles and level at the magnetic equator, which is the quantity L2P16 was already about.\n\nAnd the consequence is immediate. **An angle of dip has no north in it.** What it tells you is which way the field is tipping -- that is, **poleward** (toward the nearer magnetic pole) or **equatorward**. Those are the only two words this sense knows.",
            options: [
                { id: 'cont', label: "What kind of structure reports an angle rather than a direction?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two of them, built on completely different principles. Here is each, and what its structure makes possible.\n\n**Magnetite: a crystal that is pulled round.**\n\nSome cells grow tiny crystals of **magnetite**, an **iron oxide** -- the same mineral in L2C16's table of magnetic materials. A magnetised crystal sitting in Earth's field feels a **torque**, a twisting force, counted on the crystal itself and acting to swing it into line with the field. The crystal is anchored in the cell, so it cannot actually turn far; instead it **pulls on whatever holds it**, and that pull is something a cell can be built to notice.\n\nThe clearest case known is not a bird at all. Certain bacteria grow a **chain of** magnetite crystals, each crystal inside its own **membrane** pouch, lined up so that the whole chain behaves as a single magnet -- and the bacterium swims along the field. In birds, iron-rich structures sit in the **tissue** of the upper beak, held in place by **fibres**, and whether they are sensors at all is still argued over.\n\nThis is a mechanical sense, closer to touch than to sight. **It works in complete darkness**, and it reports the **line** the field runs along.\n\n**Cryptochrome: a chemical reaction the field can nudge.**\n\nIn the **retina** -- the light-sensitive sheet at the back of the eye, a **tissue** built in layers -- sits a **protein** called **cryptochrome**, **embedded** in particular cells of one of those layers. It is not an odd one-off: the same **protein** turns up across a great many **species**, and plants and insects use it to set their daily rhythms by the light. So this is a light-sensitive **protein** that may have been **adapted** to a second job. When it absorbs **blue light**, an electron hops from one part of the molecule to another, leaving behind a **radical pair**: two molecules, each with a **single unpaired electron**.\n\nAn unpaired electron is itself slightly magnetic. So while the pair sits there, **the surrounding magnetic field changes how the two electrons' magnetism evolves together** -- and that decides which of two possible products the reaction ends up making. Change the field, and you change **how much product comes out**.\n\nSo the field is not felt as a force here at all. **It is read off the yield of a chemical reaction**, and everything odd about this sense follows from that structure:\n\n| Because the structure is... | the sense... |\n| --- | --- |\n| started by **absorbed light** | **does not work in the dark** |\n| sitting in the **retina** | is part of **seeing**, not of touch |\n| spread across a **curved** sheet of cells | gives a **different signal in each direction** the bird looks |\n\nThat last row is the strange and lovely part. A bird with this sense would not feel the field. **It would see a pattern across its field of view, shifting as it turned its head.**\n\nWhatever either structure reports, it has to reach the brain along a **nerve**, and that step is the weakest part of the whole account -- see the end of the lesson.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "So which of them gives north?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Neither, and for the same reason twice over.** This is the heart of the lesson.\n\nStart with the crystal. A torque swings it into line with the field -- but **into line** has two ends. Turn the whole field around by a half turn and the crystal settles in exactly the same place, pulling exactly as hard on exactly the same anchor. **The torque is the same whichever way along the line the field runs**, so the cell holding it cannot tell the two apart.\n\nNow the radical pair. The two electrons' magnetism is nudged by the field, and the nudging depends on the **angle** between the field and the molecule. Reverse the field and that angle is unchanged -- so **the yield is unchanged too.**\n\n| | what it feels | reverse the field and... |\n| --- | --- | --- |\n| **magnetite** | a **torque** along a line | the torque is the same |\n| **cryptochrome** | an **angle** to the molecule | the yield is the same |\n\nSo both structures are blind to the same thing: **which end of the line the field points at.** Not because evolution was careless, but because a torque and an angle are both quantities that cannot distinguish a thing from its opposite. **The limit is in the physics of what is being felt, and no refinement of the cell can remove it.** It is a limit on the **structure**, not on how good an **organ** is built around it.\n\nWhich explains the cage experiment exactly. All the bird can recover is the field's **line**, and the one piece of direction a line still carries is **how steeply it tips**: that is the **inclination**, and it names **poleward** without ever naming north.\n\nAnd now the limit, which the same structure hands you for free. **At the magnetic equator the field is level.** There is no tipping, so there is nothing to tell poleward from equatorward -- and a bird whose whole compass is an angle of dip has, at that line, no magnetic compass at all. Birds that cross the equator do it on other cues, which is not an oddity but a **prediction of the mechanism**.",
            options: [
                { id: 'check', label: "Then how does it ever get the bias out?", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "A fair question, because L2B16 left a problem standing. Magnetic rock pulls every magnetic reading the **same** number of degrees east, every single time -- and L2B16 proved that averaging cancels **scatter** and does nothing whatever about a **bias**.\n\nSo a bird cannot fix this by taking more magnetic readings, or by averaging its magnetic sense with anything. Yet young birds do get it right.\n\nWhat do they do with the stars?",
            options: [
                { id: 'calib', label: "They use the stars as the reference and correct the magnetic compass against them — so the second cue is not averaged in, it is what sets the first one straight", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'average', label: "They average the star bearing with the magnetic bearing, which pulls the answer part of the way back", nextNodeId: 'math_wrong' },
                { id: 'ignore', label: "They ignore the magnetic sense whenever stars are visible, and only fall back on it under cloud", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Averaging is the move L2B16 would suggest, and L2B16 is the lesson that rules it out. **Average a biased reading with an unbiased one and you keep part of the bias** -- half of it, for an equal split. The error does not scatter away, because it was never scatter.\n\nSo the stars have to be doing something else, and what they are doing is the better idea.\n\n**A young bird watches the night sky turn.** Over a few hours every star sweeps round, except near one point where they barely move at all. That **still point** is the centre of the rotation, and it marks the pole -- and finding it needs no knowledge of any named star pattern. **It is pure geometry, read off the motion.**\n\nAnd crucially, **it cannot be biased by rock**, because it has nothing to do with the ground. Whatever a hillside of magnetised stone is doing to the field, the sky still turns about the same point.\n\nSo the young bird uses that still point to work out which way poleward really is, and then **adjusts its magnetic compass until the two agree.** After that, the magnetic sense carries the work on cloudy nights -- calibrated.\n\n| | L2B16's picture | what the structures give |\n| --- | --- | --- |\n| the stars are | a **second vote**, averaged in | **the reference** |\n| the magnetic sense is | an **equal partner** | **the one being corrected** |\n| what a second cue fixes | **scatter** | **bias** |\n\n**That reverses L2B16's conclusion without contradicting a single number in it.** Its arithmetic was right: a second cue of a different kind is worth far more than twenty repeats of the first. Level 3 says *why* it is worth more, and it is not the averaging. **It is that one of the two can be checked against something the ground cannot reach.**\n\nAnd *ignore it whenever stars are visible* throws away the calibration along with the cue. A compass you never check against the sky is a compass you cannot trust under cloud -- which is precisely the night you need it.",
            options: [
                { id: 'retry', label: "The stars are the reference, not a vote.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The picture is a bird's head with both structures in it -- **magnetite** cells at the front and **cryptochrome** in the **retina** -- and the field running through at the angle you set.\n\nThings worth doing:\n\n- Start with **Field Angle Into the Ground** high, near a pole. The field dips steeply, there is a clear tipping to read, and the heading is firm\n- Now bring the angle down toward **zero**, the magnetic equator. Watch the tipping flatten out, and watch **both** readings fail together -- not because either structure broke, but because a level field has no steepness to report. **Set it to exactly zero and see what is left**\n- Now take **Light on the Eye** down to nothing, with the angle back up high. **The retina goes dark and cryptochrome stops**, because its whole mechanism begins with an absorbed photon. The magnetite cells carry on untroubled: a torque needs no light\n- With the light off, look at what the bird still has. **A line, and no way along it** -- which is the limit both structures share, now visible with only one of them working\n- Then try the combination the cage experiment used: a steep angle, light on, and ask yourself what would change if the field were turned completely around. **Nothing in this picture would move**, and that is the point",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "One loose end, and it is the one that lets the whole sense exist.\n\nA bird's body runs at about **41 °C**. L2C16 measured **magnetite's Curie temperature at 585 °C** -- the temperature above which a material stops being magnetic at all.\n\nSuppose magnetite's Curie temperature had instead been **35 °C**. What would that mean for this lesson?",
            options: [
                { id: 'none', label: "There would be no magnetite sense at all — inside a 41 °C body the crystals would be above their Curie temperature and simply would not be magnetic.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'sharper', label: "The sense would be sharper, because the crystals would be closer to the temperature where they respond most.", nextNodeId: 'checkpoint_wrong' },
                { id: 'bars', label: "Nothing — a Curie temperature applies to bar magnets, not to crystals grown inside cells.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Go back to what L2C16 actually found. **A Curie temperature is not a point of peak response. It is where the magnetism disappears completely**, and it belongs to the **material** -- not to a magnet's size, or shape, or where it happens to be sitting. A crystal a cell grew obeys it exactly as a bar magnet does.\n\nSo at 35 °C, a bird at 41 °C would be carrying crystals that are **above** their Curie temperature. Not weakly magnetic. **Not magnetic.** No torque, no pull on the anchor, nothing for a cell to notice.\n\nThe real figures leave an enormous margin:\n\n| | |\n| --- | --- |\n| magnetite's **Curie temperature** | **585 °C** |\n| a bird's **body temperature** | **41 °C** |\n\nAnd that is the sort of thing worth noticing about which materials living things use. **A cell cannot choose its working temperature very freely**, so whatever **evolved** to sense the field had to be built from a mineral that stays magnetic at body heat -- and magnetite, which a cell can grow from iron it already handles for other purposes, clears that bar by more than five hundred degrees.\n\nWhich is also the answer to the Big Idea, and it takes all three lessons:\n\n| | | |\n| --- | --- | --- |\n| **P16** | a field has a direction **and a dip into the ground** | supplies the only quantity this sense can read |\n| **C16** | only a few materials are magnetic, and only below a **Curie temperature** | says which mineral a warm body may use |\n| **B16** | two structures, a **torque** and a **reaction yield** | decide what can be reported at all |",
            options: [
                { id: 'retry', label: "Above its Curie temperature it is not magnetic at all.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that completes Big Idea 16, with each lesson supplying something the other two could not.**\n\n| | | |\n| --- | --- | --- |\n| **P16** | a field has a direction **and a dip into the ground** | supplies the only quantity this sense can read |\n| **C16** | only a few materials are magnetic, and only below a **Curie temperature** | says which mineral a warm body may use |\n| **B16** | two structures, a **torque** and a **reaction yield** | decide what can be reported at all |\n\nNotice how the limits run downhill. **The physics decides what is there to be felt. The chemistry decides what a cell may build to feel it with. The structure decides what the feeling can mean.** A bird does not have a poor compass. It has an **inclination** compass, which is the only kind those structures could ever have produced.\n\nAnd it sharpens what L2B16 was really measuring. Its arithmetic stands untouched -- averaging divides scatter by the square root of the count, and leaves bias alone. What Level 3 adds is **why the cues are not interchangeable**. They are not two readings of one quantity with different wobbles. **One of them can be checked against the turning of the sky, and the other cannot**, and that is the whole reason a bird keeps both.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A line, a tilt, and no north anywhere!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out what a magnetic sense is physically able to say.**\n\n- **There is no needle.** A compass needle is a magnet free to swing on a pivot, and nothing in a bird is. Whatever the sense is, it is cells -- and **a cell can only report what its own structure lets it feel**\n- **Magnetite**: crystals of **iron oxide** grown inside cells. Earth's field exerts a **torque** on a magnetised crystal, counted on the crystal, acting to swing it into line. Anchored, it instead **pulls on what holds it**, which a cell can be built to notice. A mechanical sense, closer to touch than to sight, and **it works in complete darkness**. The clearest case is a bacterium, which grows a **chain of** crystals each in its own **membrane** pouch; in birds the iron-rich structures sit in the **tissue** of the upper beak, held by **fibres**, and whether they are sensors is contested\n- **Cryptochrome**: a **protein** **embedded** in cells of the **retina**, the layered **tissue** at the back of the eye. The same **protein** appears across many **species**, setting daily rhythms in plants and insects, so it may have been **adapted** to a second job. Absorbing **blue light** moves an electron and leaves a **radical pair** -- two molecules each with one **unpaired electron**, each therefore slightly magnetic. The surrounding field changes how their magnetism evolves together, and so **which product the reaction makes**\n- **So the field is read off a chemical yield**, and the oddities follow from the structure: it **needs light**, it is part of **seeing** rather than touch, and because the retina is a curved sheet it gives **a different signal in each direction the bird looks**. Such a bird would not feel the field. **It would see a pattern shifting as it turned its head**\n- **Neither structure can give north, for the same reason twice.** Into line with the field has **two ends**, so reversing the field leaves the torque identical; and the radical pair responds to the **angle** between field and molecule, which reversing also leaves identical. **A torque and an angle both fail to distinguish a thing from its opposite**, and no refinement of the cell removes that\n- **So what is left is the line, and the one direction a line carries: how steeply it tips.** That is the **inclination**, measured downward from the horizontal ground, and it names **poleward** -- toward the nearer magnetic pole -- without ever naming north\n- **Which the cage experiment shows directly.** Reverse the field's **horizontal** part, the part a needle lives by, and the bird carries on. Reverse the **vertical** part, which a needle barely uses, and **the bird turns around**\n- **And the mechanism predicts its own failure.** At the **magnetic equator** the field is level, so there is no tipping to read and no poleward at all. Birds crossing it use other cues -- not an oddity but a consequence\n- **The bias problem is solved by calibration, not averaging.** Magnetic rock biases every reading the same way, and L2B16 proved averaging never touches a bias. So a young bird **watches the night sky turn**, finds the **still point** the stars barely move around -- pure geometry, no star patterns needed, and **nothing the ground can reach** -- and adjusts its magnetic compass until the two agree\n- **That reverses L2B16's conclusion while keeping every number in it.** A second cue of a different kind really is worth more than twenty repeats of the first -- but not because of the averaging. **It is because one of the two can be checked against the turning of the sky**\n- **And the sense exists at all only because of a number from the chemistry lesson.** L2C16 put magnetite's **Curie temperature** at **585 °C**, above which a material is not weakly magnetic but **not magnetic**. A bird runs at **41 °C**. Had the figure been 35 °C there would be no magnetite sense -- **a mineral is only available to biology if it stays magnetic at body heat**\n- **Still standing:** whatever either structure reports must reach the brain along a **nerve**, and how a radical pair's chemistry becomes a **nerve** impulse is **not known**. Whether the beak magnetite cells are sensors at all is **contested**. And this lesson treats the two senses as separate when they may well work together.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 16, Level 3", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Magnets Help Us Navigate and Build Machines?**\n\nThe physics decides what is there to be felt, the chemistry decides what a cell may build to feel it with, and the structure decides what the feeling can mean.\n\n**Summary Table:**\n| | L2B16 said | L3B16 says |\n| --- | --- | --- |\n| The magnetic sense is | one cue with a bearing error | **two structures**, neither a needle |\n| Structure one | -- | **magnetite** crystals feeling a **torque** |\n| Structure two | -- | **cryptochrome** in the **retina**, a **radical pair** |\n| What each needs | -- | the crystal: nothing. The protein: **light** |\n| What they can report | a bearing | a **line**, and how steeply it tips |\n| Why not north | -- | reverse the field and **both are unchanged** |\n| So the compass is | a compass | an **inclination** compass: **poleward** |\n| Where it fails | -- | the **magnetic equator**, where the field is level |\n| What the stars are for | a second vote to average | **the reference** that removes the **bias** |\n| Why a bird may carry a magnet | -- | magnetite's **585 °C** against a body's **41 °C** |\n\n**What ties them together:** P16 says a field has a dip into the ground as well as a direction, which is the only quantity this sense can read; C16 says only a few materials are magnetic and only below a Curie temperature, which decides that magnetite is the one a warm body may use; and B16's two structures decide that what gets reported is a tilt rather than a heading.\n\n**The one line to remember:** a bird's compass is made of cells, so it can only report what a torque and a chemical yield can tell apart -- and neither can tell a field from the same field reversed, which is why the sense knows poleward and equatorward but has no word for north, and why the turning of the sky, which no hillside of magnetised rock can bias, is what sets it straight."
        }
    };
}
