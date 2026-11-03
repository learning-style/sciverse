import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 28, biology. Closes the Big Idea.
 *
 * Replaces a lesson on regional blood flow redistribution -- output times share, the
 * gut and kidneys giving up their perfusion, arteriolar radius^4. A reader said it was
 * med school material and that the Big Idea's question had stopped being asked. Both
 * were right: regional perfusion is undergraduate physiology, and 'how do body systems
 * work together' is not answered by a table of organ blood flows. Parked in docs/level4/.
 *
 * This replacement is squarely on the syllabus. The OXYGEN DISSOCIATION CURVE is core
 * AP Biology and core A-level Biology, and reading values off it is the examined skill;
 * nothing here derives it. It also removes exactly what L2B28 confessed to -- that its
 * 'taken from each litre' was an average with no account of where 50 and 170 came from.
 *
 *   lungs            13.3 kPa   98% saturated
 *   resting tissue    5.3 kPa   77%   ->  a litre gives up about 40 mL
 *   working muscle    2.7 kPa   33%   ->  about 130 mL
 *   and with the Bohr shift     21%   ->  about 155 mL, which is L2B28's 170
 *
 * The S shape is cooperative binding, which is on the syllabus as a named idea: four
 * subunits, and binding one oxygen makes the next easier. The consequence is the
 * lesson's best single comparison -- the same 2.7 kPa drop releases 2% of the load up
 * at the top of the curve and 45% down in the middle, so the curve is FLAT where blood
 * loads and STEEP where it unloads.
 *
 * The Bohr shift is the answer to the Big Idea's own question. A working muscle makes
 * carbon dioxide, which makes the blood slightly acidic, which loosens haemoglobin's
 * grip and shifts the curve right. So the tissue that needs oxygen most produces the
 * signal that releases it -- with no nerve, no hormone and nothing coordinating it.
 *
 * Frames stated: partial pressure is of oxygen in the fluid the blood is sitting in;
 * saturation is the share of haemoglobin's binding sites filled; 'given up' is counted
 * between arriving and leaving one tissue.
 *
 * Still standing: 200 mL per litre assumes a normal amount of haemoglobin, so anaemia
 * lowers every figure here; temperature shifts the curve as well as acidity; and the
 * curve is read, not derived.
 */
export function getL3B28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B28 closed Big Idea 28 at Level 2 with a rule and an admission.\n\nThe rule: the **flow** multiplied by what is **taken from each litre**, with a hard ceiling, because a litre of blood holds at most about **200 mL** of oxygen.\n\nThe admission: that second figure was **an average**. It used **50 mL** a litre at rest and **170 mL** in hard exercise, and it never said where either number came from, or why a litre does not simply hand over all 200.\n\nSo start there, because it is the better question. **A litre of blood arrives at a resting muscle holding 200 mL of oxygen and leaves still holding 150 of them.** Three quarters of the cargo goes straight past the tissue that needs it and back to the lungs.\n\nWhy would blood carry oxygen all that way and then not deliver it?\n\nYour dials are **Oxygen Pressure** and **How Hard the Muscle Is Working**.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'grip', label: "Because haemoglobin does not simply empty — it must hold on more or less tightly depending on the conditions around it, and at a resting muscle it still holds on fairly tightly.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'slow', label: "Because the blood moves past too quickly for all the oxygen to come out in time.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Speed is not the problem, and there is a clean way to see it.\n\n**Slow the blood right down and it still comes back three-quarters full.** Blood sits in a resting muscle's capillaries for about a second, which is many times longer than oxygen needs to cross a capillary wall. If leaving were simply a matter of time, a resting muscle would strip the blood bare.\n\nIt does not, and the reason is that **haemoglobin is not a bucket.**\n\nA bucket empties until it is empty. **Haemoglobin is a protein that binds oxygen reversibly**, which means it is always doing both things at once -- picking oxygen up and letting it go -- and what you observe is whichever is winning.\n\nWhat decides which is winning is **how much oxygen is already in the fluid around it.** Plenty of oxygen outside, and haemoglobin holds a full load. Very little outside, and it lets go.\n\nSo the question *why does it not give up everything* becomes a better question: **how much oxygen is there in the fluid at a resting muscle, and how tightly does haemoglobin hold on at that amount?**\n\nBoth have numbers, and the second one is a graph every biology course puts on the wall.",
            options: [
                { id: 'cont', label: "Then show me the graph.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "First the quantity on the bottom axis, because it is not a concentration.\n\n**Partial pressure** is the share of the total gas pressure that one gas contributes. Air is about 21% oxygen, so at sea level oxygen's partial pressure in the air is about 21% of 101 kPa, which is **21 kPa**. The frame: this is the pressure of oxygen **in the fluid the blood is sitting in**, and it is what haemoglobin responds to.\n\nIt falls at every step of the journey:\n\n| | Partial pressure of oxygen |\n| --- | --- |\n| air in the lungs | **13.3 kPa** |\n| resting muscle | **5.3 kPa** |\n| hard-working muscle | **2.7 kPa** |\n\nNow the top axis. **Saturation** is the share of haemoglobin's oxygen-binding sites that are filled, from 0 to 100%.\n\nPut one against the other and you get the **oxygen dissociation curve**, which is the picture on your screen. Read it like a graph, which is exactly what it is for:\n\n| Where the blood is | Partial pressure | Saturation |\n| --- | --- | --- |\n| **lungs** | 13.3 kPa | **98%** |\n| **resting muscle** | 5.3 kPa | **77%** |\n| **working muscle** | 2.7 kPa | **33%** |\n\nAnd L2B28's missing number falls straight out. A full litre holds 200 mL, so:\n\n**oxygen given up by a litre = (saturation arriving − saturation leaving) x 200 mL**\n\nThe condition: this assumes a normal amount of haemoglobin. Anaemia lowers the 200 and every figure below with it.\n\nAt a **resting** muscle the difference is 98% − 77%, or 21%, and 21% of 200 is about **40 mL**. **That is where L2B28's 50 came from.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Why is the curve that S shape?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Because haemoglobin carries four oxygens, not one, and they help each other on.**\n\nOne haemoglobin molecule is four protein subunits, each able to hold one oxygen. They are not independent. **When the first oxygen binds, the whole molecule changes shape slightly, and that makes the second one easier to bind.** The second makes the third easier again.\n\nThis is called **cooperative binding**, and it is the whole explanation of the shape:\n\n- **at low partial pressure** the first oxygen is hard to attach, so the curve starts shallow\n- **in the middle** each one that binds helps the next, so the curve turns steep\n- **near the top** there are almost no empty sites left, so it flattens off\n\nAnd now look at what that shape *does*, because this is the part worth remembering. **Take the same drop in partial pressure in two different places on the curve:**\n\n| A drop of 2.7 kPa | Saturation falls from | to | Oxygen released |\n| --- | --- | --- | --- |\n| high up, 13.3 to 10.6 kPa | 98% | 96% | **2% of the load** |\n| in the middle, 5.3 to 2.7 kPa | 77% | 33% | **45% of the load** |\n\n**The same change in conditions does twenty times as much in one place as in the other.**\n\nThat is not a curiosity, it is the design. **The curve is flat exactly where blood is loading and steep exactly where it is unloading.**\n\n- in the **lungs**, high on the flat part: a bad day, a head cold, thin mountain air -- the partial pressure can fall a long way and the blood still leaves nearly full\n- in a **working muscle**, down on the steep part: a small fall in partial pressure dumps a large share of the cargo\n\n**Being hard to move at the top and easy to move in the middle is what makes haemoglobin a delivery system rather than a container.**",
            options: [
                { id: 'check', label: "Let me read the working muscle off it.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Blood leaves the lungs **98%** saturated and reaches a hard-working muscle, where the partial pressure of oxygen is down at **2.7 kPa**.\n\nRead the curve. How much of its 200 mL does that litre give up?",
            options: [
                { id: 'right', label: "About 130 mL — the curve reads 33% at 2.7 kPa, so 98% − 33% = 65% of 200", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'all', label: "All 200 mL — the muscle needs oxygen badly, so it takes everything there is", nextNodeId: 'math_wrong' },
                { id: 'same', label: "About 40 mL, the same as the resting muscle, since it is the same blood with the same haemoglobin", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Read the two saturations off the curve and subtract. That is the whole of it.\n\n| | Partial pressure | Saturation |\n| --- | --- | --- |\n| arriving from the lungs | 13.3 kPa | **98%** |\n| leaving a working muscle | 2.7 kPa | **33%** |\n| **difference** | | **65%** |\n\n65% of 200 mL is about **130 mL** -- against the **40 mL** the same blood gave up at a resting muscle. **Three times as much, from identical blood, with nothing changed except where it went.**\n\n*The same as the resting muscle* is the answer that treats haemoglobin as a container that empties at a fixed rate. It is not: **what it releases depends entirely on the conditions it finds**, and a working muscle presents different conditions because it is **using** oxygen, which keeps the partial pressure around it low.\n\nAnd *all 200* cannot happen, because haemoglobin only releases its last oxygens at partial pressures far below anything in a living tissue. **There is always a reserve going back to the lungs**, which is not waste -- it is what is available if the muscle works harder still, and it is why you do not faint when you stand up.\n\nSo L2B28's two figures were never two different kinds of blood. **They are two points on one curve.**",
            options: [
                { id: 'retry', label: "Two points on one curve.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The picture is the curve itself, with a marker you move along it. **Oxygen Pressure** sets where on the bottom axis you are reading, and the bar underneath shows what a litre of blood gives up by the time it gets there.\n\nThings worth doing:\n\n- Start at **13.3 kPa**, the lungs. Saturation is 98% and almost nothing has been given up: this is blood loading, not unloading\n- Walk the marker down to **5.3 kPa**, a resting muscle. Watch the curve bend. About **40 mL** has come out -- **L2B28's resting figure, read off a graph**\n- Keep going to **2.7 kPa**, a working muscle. The curve is at its steepest here and the bar jumps to about **130 mL**\n- Now go back to the top and take the pressure from 13.3 down to **10.6** -- the same 2.7 kPa step you just took at the bottom. **Almost nothing happens.** That is the flat part doing its job\n- Then turn up **How Hard the Muscle Is Working**. Watch the whole curve slide to the **right**. At any pressure you choose, saturation is now lower -- **the blood is letting go of more oxygen without the pressure changing at all**\n- Put the pressure at 2.7 kPa and the effort at its maximum. The bar reaches about **155 mL**, which is where L2B28's 170 came from",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "That slide to the right has a name and a cause, and it is the point of the whole Big Idea.\n\nA working muscle respires, and respiring makes **carbon dioxide**. Carbon dioxide dissolving in blood makes it **slightly more acidic**. And acid makes haemoglobin **loosen its grip** on oxygen, which moves the whole curve right.\n\nIt is called the **Bohr shift**. Now think about what it means.\n\nWhat is doing the deciding here?",
            options: [
                { id: 'itself', label: "The muscle itself — its own waste product is the signal that makes the blood release more oxygen, so nothing has to notice or decide anything.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'brain', label: "The brain, which detects the working muscle and sends a nerve signal telling the blood to release more oxygen there.", nextNodeId: 'checkpoint_wrong' },
                { id: 'heart', label: "The heart, which pumps harder and so forces more oxygen out of the blood as it passes.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "**Nothing is sending a message, and that is what makes this worth knowing.**\n\nFollow the chain and notice that every link is ordinary chemistry happening where it happens:\n\n| | |\n| --- | --- |\n| the muscle **respires** | because it is working |\n| respiring makes **carbon dioxide** | it is a product of the reaction |\n| carbon dioxide makes the blood **slightly acidic** | it dissolves to form an acid |\n| acid makes haemoglobin **let go more easily** | it changes the protein's shape a little |\n\n**There is no step in that list where anything measures anything.** No nerve carries a request. No hormone is released. The muscle's **waste** is the signal, and it arrives exactly where it is needed because that is where it was made.\n\nSo the muscle working hardest in your body gets the most oxygen out of each litre, automatically, and a muscle that stops working stops getting it within seconds -- **without the body knowing which muscle is which.**\n\nAnd *the heart pumping harder* confuses two separate things. The heart changes **how many litres** arrive, which is L2P28's half of the story. The Bohr shift changes **how much each litre lets go**. They are the two factors in L2B28's own rule, and this lesson is about the second one.\n\n**That is the honest answer to how body systems work together.** Not by one being in charge. **By one system's output being another system's input**, so the arrangement needs no manager.",
            options: [
                { id: 'retry', label: "The muscle's own waste is the signal.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that closes Big Idea 28.**\n\n| | What it sets | |\n| --- | --- | --- |\n| **P28** | **how many litres** arrive, from rate x volume per beat | the pump |\n| **C28** | what else those litres are carrying, and how little room there is | the cargo |\n| **B28** | **how much each litre lets go**, read off one curve | the handover |\n\nL2B28's rule multiplied the first by the third. **Level 3 says where the third number comes from, and it is not a property of the blood. It is a property of the place the blood arrives at.**\n\nAnd the arrangement has no manager. **The muscle's waste carbon dioxide is the signal that makes haemoglobin let go**, so the oxygen is released precisely where it is being used, at the moment it is being used, with nothing measuring and nothing deciding.\n\nThere is one more place the same curve explains something, and it is worth seeing because it uses everything above.\n\n**An unborn baby has to take oxygen out of its mother's blood.** But the mother's blood is where the oxygen already is -- it should flow the other way. The solution is that **fetal haemoglobin is a slightly different protein with its curve shifted to the left**, so it binds oxygen more tightly at every pressure:\n\n| At 2.7 kPa | Saturation |\n| --- | --- |\n| mother's haemoglobin | **33%** |\n| fetal haemoglobin | **54%** |\n\nAt the same partial pressure the baby's blood holds on harder, so oxygen moves across. **A change in the shape of one protein is the entire mechanism**, and no part of either body has to cooperate with the other for it to work.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The waste is the signal!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found where L2B28's two numbers came from.**\n\n- **A litre of blood holds about 200 mL of oxygen** and gives up only part of it: about **40 mL** at a resting muscle, so three quarters of the cargo goes back to the lungs\n- **Haemoglobin is not a bucket.** It binds oxygen **reversibly**, picking it up and letting it go at the same time, and what you see is whichever is winning. What decides that is **how much oxygen is in the fluid around it**\n- **Partial pressure** is the share of the total gas pressure one gas contributes -- 21% of 101 kPa for oxygen in air. It falls at every step: **13.3 kPa** in the lungs, **5.3** at a resting muscle, **2.7** at a working one\n- **Saturation** is the share of haemoglobin's binding sites that are filled, and plotting it against partial pressure gives the **oxygen dissociation curve**: **98%**, **77%** and **33%** at those three places\n- **The oxygen a litre gives up** is the saturation arriving minus the saturation leaving, times 200 mL, assuming a normal amount of haemoglobin. At a resting muscle that is 21%, so about **40 mL** -- which is **L2B28's figure, read off a graph**\n- **The S shape is cooperative binding.** Haemoglobin is four subunits; binding the first oxygen changes the shape so the second is easier, and the second helps the third. Shallow at the start, steep in the middle, flat at the top\n- **And the shape is the design.** The same 2.7 kPa drop releases **2%** of the load high on the curve and **45%** in the middle. **Flat where blood loads, steep where it unloads** -- so thin mountain air still fills the blood, while a small fall at a muscle dumps a large share\n- **At a working muscle the difference is 65%**, about **130 mL** -- three times the resting figure, from identical blood, with nothing changed but where it went\n- **Some is always left.** Haemoglobin gives up its last oxygens only below any pressure found in a living tissue, so a reserve always returns to the lungs -- which is what is there if you work harder\n- **The Bohr shift is the Big Idea's answer.** A working muscle respires, respiring makes **carbon dioxide**, carbon dioxide makes the blood slightly **acidic**, and acid loosens haemoglobin's grip -- sliding the whole curve **right** so more is released at the same pressure, reaching about **155 mL**, which is L2B28's 170\n- **Nothing in that chain measures anything.** No nerve, no hormone. **The muscle's waste is the signal**, and it is already in the right place because that is where it was made\n- **So body systems work together without a manager**: one system's output is another's input. **P28 sets how many litres arrive; B28 sets how much each one lets go**\n- **And fetal haemoglobin is the same idea once more.** A slightly different protein with its curve shifted **left** holds oxygen more tightly at every pressure -- **54%** against the mother's **33%** at 2.7 kPa -- so oxygen crosses from mother to baby with nothing cooperating\n- **Still standing:** 200 mL a litre assumes a normal amount of haemoglobin, so anaemia lowers every number here. **Temperature** shifts the curve too, not only acidity. And the curve itself is **read, not derived** -- its shape is measured.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 28, Level 3", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Body Systems Work Together?**\n\nBy one system's output being another system's input, so nothing has to be in charge.\n\n**Summary Table:**\n| | L2B28 said | L3B28 says |\n| --- | --- | --- |\n| Oxygen used | flow x taken from each litre | **the same rule** |\n| A full litre | 200 mL, a ceiling | unchanged |\n| Taken at rest | **50 mL**, an average | 21% of 200, about **40 mL** |\n| Taken in exercise | **170 mL**, an average | 77% of 200, about **155 mL** |\n| What decides it | -- | the **partial pressure** where the blood arrives |\n| How you find it | -- | **read the dissociation curve** |\n| Why the curve is S-shaped | -- | **cooperative binding** across four subunits |\n| What the shape buys | -- | flat where blood **loads**, steep where it **unloads** |\n| What shifts the curve | -- | **carbon dioxide and acid**: the Bohr shift |\n| What is in charge | -- | **nothing**: the muscle's waste is the signal |\n\n**What ties them together:** P28's heart sets how many litres arrive and C28 weighs what else those litres carry, while B28 sets how much of the oxygen each litre lets go. The third number was the one L2B28 had to average, and it turns out not to be a property of the blood at all -- it is a property of the place the blood arrives at.\n\n**The one line to remember:** haemoglobin holds on tightly where oxygen is plentiful and lets go where it is scarce, so blood unloads itself exactly where it is needed -- and a working muscle releases even more simply by producing carbon dioxide, which means the signal that asks for oxygen is the waste left over from using it.\n\n**Big Idea 28 is complete at Level 3.**"
        }
    };
}
