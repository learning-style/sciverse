import { AssessmentData } from '../../types';

/**
 * Big Idea 7 Assessment: "How Does Electricity Work?"
 * Covers P7 (Circuits & Current), C7 (Batteries & Chemical Energy), B7 (Nerve Signals)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea7Assessment: AssessmentData = {
    bigIdea: 7,
    title: 'How Does Electricity Work?',
    subtitle: 'Circuits, Batteries & Nerve Signals',
    icon: '🎯',
    questions: [
        // ── EASY (1-4) ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'What must be true for a light bulb to turn on in a simple circuit?',
            options: ['The wire must be copper', 'The switch must be red', 'There must be a complete loop from the battery through the bulb and back', 'The bulb must be touching the battery directly'],
            correctIndex: 2,
            hint: 'Electricity needs a path to flow — what happens if the path is broken?',
            explanation: 'Electric current needs a complete, unbroken loop (circuit) to flow. The battery pushes charges through the wire, through the bulb\'s filament (which glows), and back to the battery. Any break in the loop stops the current — that\'s what a switch does!',
            optionExplanations: [
                'Wires can be made from many conductive materials (aluminium, silver, gold). Copper is common but not required — what matters is a complete loop.',
                'The colour of a switch doesn\'t matter at all! A switch works by opening or closing a gap in the circuit, regardless of its colour.',
                'Correct! Current needs an unbroken path — a complete loop — to flow from the battery through the bulb and back.',
                'Bulbs don\'t need direct contact with the battery. Wires carry the current from the battery to the bulb. The key is a complete loop, not direct touching.'
            ]
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Inside a battery, what provides the energy that pushes electric charges?',
            options: ['A tiny motor', 'Chemical reactions between different materials inside the battery', 'Static electricity stored from rubbing', 'Heat from the sun'],
            correctIndex: 1,
            hint: 'Batteries contain chemicals — what happens when those chemicals interact?',
            explanation: 'A battery converts chemical energy into electrical energy. Inside, two different materials (electrodes) react with a chemical paste (electrolyte). This reaction moves electrons from one electrode to the other, creating the push (voltage) that drives current through a circuit.',
            optionExplanations: [
                'There\'s no motor inside a battery! Motors convert electrical energy into movement — they don\'t generate electricity. Batteries use chemistry.',
                'Correct! Chemical reactions between the electrodes and electrolyte produce the electrical energy.',
                'Static electricity is a surface charge from friction — it discharges quickly. Batteries provide sustained current through ongoing chemical reactions, not static buildup.',
                'Batteries work in complete darkness and don\'t need sunlight. Solar panels convert sunlight to electricity, but batteries use internal chemical reactions.'
            ]
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Your brain tells your hand to move by sending a signal. What carries that signal?',
            options: ['Neurons — specialised nerve cells that transmit electrical impulses', 'Blood vessels', 'Bones', 'Muscles generate the signal themselves'],
            correctIndex: 0,
            hint: 'Think of the body\'s "wiring" — which cells are designed to carry messages?',
            explanation: 'Neurons are the body\'s electrical wiring. When your brain decides to move your hand, neurons fire rapid electrical impulses (action potentials) down nerve fibres from the brain → spinal cord → arm → hand muscles. The signal travels in milliseconds!',
            optionExplanations: [
                'Correct! Neurons are specialised cells that transmit electrical signals from the brain to muscles and back.',
                'Blood vessels carry blood (oxygen, nutrients, hormones) — not nerve signals. They\'re the body\'s delivery system, not its communication system.',
                'Bones provide structural support and protection, but they don\'t carry electrical signals. The nervous system handles communication.',
                'Muscles respond to signals but don\'t generate the initial command — that comes from the brain via neurons. Muscles are the receivers, not the senders.'
            ]
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Both a torch circuit and a nerve cell move electrical signals. What is one key difference?',
            options: ['Neurons are faster than wires', 'There is no difference — they work identically', 'Circuits are biological too', 'Circuits use electron flow in metal wires; neurons use ion flow across cell membranes'],
            correctIndex: 3,
            hint: 'What carries the charge in a wire vs inside your body?',
            explanation: 'In a metal wire, free electrons carry the current. In a neuron, the signal is carried by ions (Na⁺ and K⁺) rushing in and out of the cell membrane. Same principle (charge movement), different carriers and mechanisms!',
            optionExplanations: [
                'Actually, it\'s the opposite! Nerve signals travel at about 100 m/s, while electricity in wires moves at close to the speed of light. Wires are much faster.',
                'They use very different mechanisms: wires use electron flow, neurons use ion flow. The physics principles overlap, but the biology is quite different.',
                'Circuits are made of metal, plastic, and other manufactured materials — they\'re not biological. Only neurons are living cells.',
                'Correct! Wires carry electrons through metal; neurons carry signals via sodium and potassium ions flowing across cell membranes.'
            ]
        },
        // ── MEDIUM (5-8) ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'In a series circuit with two identical bulbs, one bulb burns out. What happens to the other?',
            options: ['It glows brighter because it gets all the power', 'It stays the same', 'It flickers on and off', 'It also goes out — the circuit loop is broken'],
            correctIndex: 3,
            hint: 'Series means ONE path. What happens to traffic on a one-lane road if there\'s a blockage?',
            explanation: 'In a series circuit there\'s only one path for current. A burned-out bulb breaks the loop — like a roadblock on a single-lane road. No current can flow, so the remaining bulb goes dark too. This is why old Christmas lights all went out when one bulb failed!',
            optionExplanations: [
                'It can\'t glow brighter because no current flows at all. The burned-out bulb breaks the only path — like blocking the only road.',
                'It can\'t stay the same — the circuit is broken. Series circuits have only one path, so a break anywhere stops everything.',
                'Flickering would require intermittent contact. A burned-out filament is a permanent break — current either flows or it doesn\'t.',
                'Correct! In series, there\'s only one path. Breaking it anywhere stops current to everything.'
            ]
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A battery has three main parts: the anode, cathode, and electrolyte. What is the electrolyte\'s job?',
            options: ['It stores all the energy', 'It glows to show the battery is working', 'It allows ions to travel between the anode and cathode, completing the internal circuit', 'It prevents the battery from overheating'],
            correctIndex: 2,
            hint: 'Electrons flow through the external wire, but something must carry charge INSIDE the battery...',
            explanation: 'The electrolyte is a chemical medium (paste, gel, or liquid) that lets ions move between the anode and cathode inside the battery. Without it, the internal circuit would be open and no sustained current could flow. Electrons go through the wire; ions go through the electrolyte.',
            optionExplanations: [
                'The energy is stored in the chemical bonds of the electrode materials, not in the electrolyte itself. The electrolyte is a pathway, not a storage tank.',
                'Batteries don\'t glow! The electrolyte is a chemical medium inside — it\'s not visible from outside and doesn\'t produce light.',
                'Correct! The electrolyte carries ions between the electrodes, completing the internal circuit so current can keep flowing.',
                'While electrolyte chemistry affects heat generation, its primary job is ion transport. Overheating prevention is a separate engineering concern.'
            ]
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Neurons don\'t physically touch each other. How does a signal cross the gap (synapse) between two neurons?',
            options: ['The signal jumps through the air like a spark', 'Chemical messengers (neurotransmitters) are released across the tiny gap', 'The neurons stretch until they connect', 'Blood carries the signal across'],
            correctIndex: 1,
            hint: 'The gap is called a synapse. What gets released into it?',
            explanation: 'When an electrical signal reaches the end of a neuron, it triggers the release of neurotransmitters — tiny chemical molecules that float across the synapse and bind to receptors on the next neuron, triggering a new electrical signal. It\'s an electrical → chemical → electrical relay!',
            optionExplanations: [
                'Nerve signals don\'t spark through the air. The synapse gap is filled with fluid, and the signal crosses via chemical molecules — not electrical arcing.',
                'Correct! Neurotransmitters are released into the synapse gap and trigger a new signal in the next neuron.',
                'Neurons don\'t move or stretch to close the gap. The gap (synapse) is a permanent feature — chemicals bridge it every time a signal needs to cross.',
                'Blood flows through blood vessels, not through synapses. Synaptic signalling uses neurotransmitter chemicals released directly at the gap.'
            ]
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A parallel circuit has three bulbs. If one burns out, the others stay lit. Why?',
            options: ['Each bulb has its own independent path back to the battery', 'Parallel bulbs share a single path, so current reroutes', 'The battery sends extra power to compensate', 'The remaining bulbs absorb the broken bulb\'s energy'],
            correctIndex: 0,
            hint: 'Parallel means multiple lanes. If one lane is blocked...',
            explanation: 'In a parallel circuit, each bulb sits on its own branch — its own complete loop with the battery. Breaking one branch doesn\'t affect the others, just like closing one lane on a multi-lane highway doesn\'t stop traffic in the other lanes.',
            optionExplanations: [
                'Correct! Each branch is an independent loop — breaking one doesn\'t affect the others.',
                'Parallel bulbs do NOT share a single path — each has its OWN path. That\'s the whole point of parallel circuits. Current doesn\'t need to reroute because the other paths were always there.',
                'The battery doesn\'t "know" a bulb burned out and can\'t compensate. The remaining bulbs stay lit simply because their paths to the battery are still complete.',
                'Bulbs can\'t absorb another bulb\'s energy. Each bulb draws current through its own independent branch — the burned-out bulb\'s branch simply stops carrying current.'
            ]
        },
        // ── HARD (9-12) ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Two identical batteries are connected in series. Compared to one battery, what changes?',
            options: ['The voltage doubles, pushing current harder through the circuit', 'The current is halved', 'Nothing changes — extra batteries are wasted', 'The resistance of the circuit doubles'],
            correctIndex: 0,
            hint: 'Series batteries add their voltages. What does more voltage do to current?',
            explanation: 'Batteries in series stack their voltages: two 1.5 V batteries give 3 V. Higher voltage means a stronger push on the charges, increasing current through the circuit (Ohm\'s law: I = V/R). That\'s why some devices need multiple batteries in a row!',
            optionExplanations: [
                'Correct! Series batteries add voltages — two 1.5 V batteries give 3 V, pushing current harder.',
                'Current actually increases with more voltage (I = V/R). Halving current would require increasing resistance, not adding batteries in series.',
                'Extra batteries definitely make a difference! Two in series double the voltage. That\'s why devices like TV remotes have a battery compartment that stacks them end-to-end.',
                'Adding batteries doesn\'t change the circuit\'s resistance — that depends on the wires, bulbs, and other components. Batteries add voltage (push), not resistance.'
            ]
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'A rechargeable battery can be used many times. What happens during recharging?',
            options: ['New chemicals are added from the charger', 'The battery cools down and resets', 'The chemical reactions that produced electricity are reversed by forcing current backwards', 'Electrons are stored inside the electrolyte like a tank filling up'],
            correctIndex: 2,
            hint: 'Discharging runs the reaction forward. What does pushing current the other way do?',
            explanation: 'During discharge, chemical reactions convert chemical energy → electrical energy, changing the electrode materials. Recharging forces current in the reverse direction, driving the reactions backwards and restoring the original chemicals. The battery is literally un-reacting!',
            optionExplanations: [
                'No new chemicals enter the battery during charging. The charger provides electrical energy, which reverses the internal chemical reactions — restoring the original chemicals.',
                'Cooling down doesn\'t restore a battery\'s charge. Recharging requires actively pushing current backwards through the battery to reverse the chemical reactions.',
                'Correct! The charger forces current in reverse, driving the chemical reactions backward and restoring the electrode materials to their original state.',
                'Electrons aren\'t stored in the electrolyte like water in a tank. The energy is stored in the chemical bonds of the restored electrode materials. The electrolyte just carries ions.'
            ]
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Myelin is a fatty sheath around some nerve fibres. What does it do?',
            options: ['It provides nutrients to the neuron', 'It generates the nerve signal', 'It protects the neuron from physical damage only', 'It speeds up signal transmission by forcing the impulse to jump between gaps in the sheath'],
            correctIndex: 3,
            hint: 'Myelinated nerves conduct much faster. The signal "jumps" from node to node...',
            explanation: 'Myelin insulates sections of the axon, so the electrical signal can\'t leak out there. Instead, it "jumps" between tiny gaps (nodes of Ranvier) in a process called saltatory conduction. This makes myelinated nerves conduct signals up to 100× faster than unmyelinated ones!',
            optionExplanations: [
                'Nutrients are delivered to neurons by blood vessels and glial cells, not by the myelin sheath. Myelin\'s main role is electrical insulation for faster signal transmission.',
                'The nerve signal (action potential) is generated by ion channels in the neuron\'s membrane, not by myelin. Myelin speeds up the signal — it doesn\'t create it.',
                'While myelin does provide some physical protection, its primary function is electrical insulation that dramatically speeds up signal transmission. Protection alone doesn\'t explain why myelinated nerves are 100× faster.',
                'Correct! Myelin insulates the axon, forcing the signal to "jump" between gaps (nodes of Ranvier) — called saltatory conduction — making transmission up to 100× faster.'
            ]
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A lemon battery lights a small LED. What roles do the lemon juice, zinc nail, and copper coin play?',
            options: ['All three are electrodes', 'Lemon juice = electrolyte, zinc = anode (gives up electrons), copper = cathode (receives electrons)', 'Lemon = insulator, zinc = cathode, copper = anode', 'The lemon provides the energy; the metals are just connectors'],
            correctIndex: 1,
            hint: 'The lemon\'s acid is the electrolyte. Which metal is more reactive — zinc or copper?',
            explanation: 'Lemon juice (citric acid) acts as the electrolyte, carrying ions internally. Zinc is more reactive, so it dissolves (oxidises), releasing electrons — making it the anode. Those electrons flow through the external wire to the copper (cathode), lighting the LED. Same chemistry as a real battery, just with fruit!',
            optionExplanations: [
                'Only the zinc and copper are electrodes. The lemon juice is the electrolyte — it carries ions between the two metals inside the battery.',
                'Correct! Lemon juice is the electrolyte (carries ions), zinc is the anode (gives up electrons), and copper is the cathode (receives electrons).',
                'The lemon is NOT an insulator — its acidic juice conducts ions, making it the electrolyte. Also, zinc is the anode (more reactive), not the cathode.',
                'The lemon doesn\'t provide the energy — the chemical reaction between the zinc and the acid does. The metals are active participants in the reaction, not just connectors.'
            ]
        },
    ]
};

