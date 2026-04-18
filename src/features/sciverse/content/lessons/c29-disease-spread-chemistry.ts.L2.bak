import { DialogNode } from '../../types';

/**
 * C29 — Disinfectants & Reaction Kinetics
 * Big Idea 29: "How Do Diseases Spread and Stop?"
 */
export function getC29Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `You spray hand sanitizer and germs die in seconds. But how? The answer is **reaction kinetics** — the chemistry of how fast disinfectants destroy pathogens.\n\n**Visual legend:**\n- **Pathogen icons**: Bacteria or virus particles on a surface.\n- **Disinfectant wave**: Chemical molecules attacking pathogen membranes.\n- **Kill rate bar**: Shows how fast pathogens are being eliminated.\n\n**Key words:**\n- **Disinfectant**: A chemical agent that destroys or inactivates pathogens (e.g., bleach, alcohol, hydrogen peroxide).\n- **Concentration**: The amount of active chemical per unit volume. Higher concentration = more reactive molecules available.\n- **Contact time**: How long the disinfectant stays in contact with the pathogen. Most disinfectants need 30 seconds to 10 minutes.\n- **Reaction kinetics**: The study of how fast chemical reactions occur. Depends on concentration, temperature, and molecular collision frequency.\n- **Denaturation**: When a disinfectant unfolds (destroys) a protein's shape, rendering it non-functional. This is how alcohol kills bacteria.\n\nWhy does hand sanitizer say "kills 99.9% of germs" and not 100%?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'chem_answer', label: 'The kill rate follows exponential decay — you can never reach exactly 100% because the last survivors are hardest to reach.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'simple_answer', label: 'Some germs are immune to alcohol.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `A few pathogens (like bacterial spores) can resist alcohol, but that's not the main reason. The real explanation is **reaction kinetics**. Disinfection follows exponential decay: in the first second, you kill 90%. In the next second, 90% of the remaining 10% = 99%. Then 99.9%, 99.99%... You asymptotically approach 100% but never reach it. It's like trying to empty a bucket by removing half the water each time — you get closer and closer to empty but never truly get there. The "99.9%" claim reflects a realistic contact time, not a fundamental immunity.`,
            options: [
                { id: 'cont', label: 'So it\'s an exponential decay curve — fast at first, then diminishing returns.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly! Disinfection chemistry depends on **two key variables**:\n\n1. **Disinfectant concentration** — More active molecules per milliliter = more collisions with pathogens per second. Double the concentration ≈ double the kill rate. But there are diminishing returns above optimal levels.\n2. **Contact time** — Even strong disinfectants need time. At 70% alcohol, 15 seconds kills 90%, 30 seconds kills 99%, and 60 seconds kills 99.9%. Wiping a surface and immediately drying it defeats the purpose.\n\nThe **kill rate** is derived from both: kill rate ∝ concentration × contact time. This is the fundamental equation of disinfection kinetics.\n\nLet's explore the chemistry step by step.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me how disinfectants work chemically.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Disinfection chemistry — step by step:**\n\n1. **Application**: Disinfectant is applied to a surface containing pathogens.\n2. **Diffusion**: Chemical molecules spread across the surface and reach pathogen cells.\n3. **Membrane attack**: Alcohol dissolves the lipid (fat) membrane surrounding bacteria/viruses. Bleach oxidizes membrane proteins.\n4. **Protein denaturation**: Once inside, the chemical unfolds critical proteins — destroying enzymes the pathogen needs to survive.\n5. **DNA/RNA damage**: Strong oxidizers (bleach, H₂O₂) break the pathogen's genetic material.\n6. **Cell lysis**: The pathogen's membrane collapses, contents leak out. The organism is dead.\n7. **Time factor**: All these steps take time. The longer the contact, the more complete the kill.\n\n**Common disinfectants:**\n- **Alcohol (60-70%)**: Dissolves membranes. Fast but evaporates quickly.\n- **Bleach (NaOCl)**: Oxidizes everything. Slower but extremely thorough.\n- **Hydrogen peroxide (H₂O₂)**: Generates free radicals that shred proteins and DNA.\n\n**Try it:** Adjust concentration and contact time to see the kill rate change!\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** A hospital uses a disinfectant that needs 5 minutes of contact time, but staff wipe surfaces dry after 30 seconds. What happens?`,
            options: [
                { id: 'right', label: 'Most pathogens survive — the chemical didn\'t have enough time to complete the reaction.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'It still works because the chemical is strong enough to kill instantly.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Not quite. Even the strongest disinfectants need **contact time** to complete the chemical reactions. Wiping dry after 30 seconds of a 5-minute process means only about 10% of the required reactions have occurred. Most pathogens are still intact — their membranes are damaged but not destroyed, and they can repair and recover. This is actually a major problem in hospitals: improper contact time is one of the leading causes of healthcare-associated infections. The chemistry doesn't care how strong the solution is if it's removed too early.`,
            options: [
                { id: 'retry', label: 'So contact time is just as important as concentration — you need both.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Exactly! This is one of the most common real-world failures in disinfection. The **kill rate equation** has two terms — concentration AND time. Removing either one crashes the effectiveness.\n\nThink of it like cooking: even at maximum temperature, a steak needs time to cook through. Pulling it off after 10 seconds gives you a raw interior no matter how hot the pan is. Disinfection works the same way — chemical reactions need time to propagate through the entire pathogen.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Connect it all.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** Disinfection is applied reaction kinetics.\n\n- **Concentration** controls how many reactive molecules are available per second\n- **Contact time** determines how many reaction cycles can complete\n- **Kill rate** = concentration × time (exponential decay curve)\n- Different disinfectants attack different targets: membranes, proteins, DNA\n- **99.9% kill** requires significantly more time than 90% kill (logarithmic scaling)\n- Real-world failures almost always come from insufficient contact time, not insufficient concentration\n\nChemistry provides the weapons; physics (contact time and diffusion) determines whether they reach their targets.`,
            options: [
                { id: 'done', label: 'Complete C29', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 29 — How Do Diseases Spread and Stop?**\n\n- **Physics (P29):** Contact Networks — contact rate and density drive transmission R₀\n- **Chemistry (C29):** Disinfection Kinetics — concentration and contact time determine kill rate\n- **Biology (B29):** Immunity & Vaccination — immune response and herd immunity stop epidemics\n\n**Summary Table:**\n| Variable | Low Value | High Value | Effect |\n| --- | --- | --- | --- |\n| Concentration | Weak solution | Strong solution | More reactive molecules |\n| Contact Time | Brief wipe | Full soak | More reaction cycles complete |\n| Kill Rate | Pathogens survive | 99.9%+ eliminated | Net disinfection outcome |\n\n**Key takeaways:**\n- Kill rate ∝ concentration × contact time\n- Disinfection follows exponential decay — fast at first, then diminishing\n- Contact time matters as much as concentration\n- Different chemicals target different pathogen structures\n\n✅ **Lesson C29 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
