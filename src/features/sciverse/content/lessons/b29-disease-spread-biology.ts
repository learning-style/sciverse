import { DialogNode } from '../../types';

/**
 * B29 — Pathogens, Immunity & Vaccination
 * Big Idea 29: "How Do Diseases Spread and Stop?"
 */
export function getB29Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `Your body fights off thousands of pathogens every day without you even noticing. But sometimes a new one gets through — and that's when you get sick. How does your immune system decide what to fight, and how do vaccines help?\n\n**Visual legend:**\n- **Shield icon**: Your immune system's strength — how quickly it recognizes and attacks invaders.\n- **Syringe icon**: Vaccination rate in the population — the percentage of people who are protected.\n- **Herd immunity bar**: Shows whether enough people are immune to stop the chain of transmission.\n\n**Key words:**\n- **Pathogen**: Any organism that causes disease — bacteria, viruses, fungi, parasites.\n- **Immune response**: Your body's detection and destruction system. Takes 7-14 days on first exposure, but only hours on re-exposure.\n- **Antibodies**: Y-shaped proteins that lock onto specific pathogens, marking them for destruction.\n- **Vaccination**: Exposing the immune system to a harmless version of a pathogen so it builds memory without getting sick.\n- **Herd immunity**: When enough people are immune that the pathogen can't find new hosts — protecting even the unvaccinated.\n\nWhy do you only get chickenpox once, but you can get the flu every year?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'bio_answer', label: 'Chickenpox doesn\'t change, so your immune memory works forever. Flu mutates every season, so your old antibodies don\'t recognize the new version.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'simple_answer', label: 'Chickenpox is just a weaker virus that your body remembers better.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Chickenpox isn't weaker — it can actually be quite dangerous in adults. The real difference is **mutation rate**. Your immune system creates antibodies that recognize specific molecular shapes on a pathogen's surface. Chickenpox virus barely changes shape over decades, so your antibodies from age 5 still work at age 50. But influenza mutates rapidly — its surface proteins shift every season, creating a "disguise" your old antibodies can't recognize. That's why you need a new flu shot each year: the target has changed shape.`,
            options: [
                { id: 'cont', label: 'So immune memory is permanent, but the pathogen itself can change and escape recognition.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly! Stopping disease biologically depends on **two key variables**:\n\n1. **Immune strength** — How fast and effectively your body detects and destroys pathogens. A strong immune response catches invaders in hours. A weak one takes days — giving the pathogen time to multiply and spread.\n2. **Vaccination rate** — The percentage of the population that has been vaccinated. Higher rates create a wall of immune people that pathogens can't spread through.\n\nThese two combine to determine **herd immunity** — the population-level threshold where the disease can no longer sustain transmission. For measles (R₀ = 15), you need ~94% vaccination. For flu (R₀ = 2), you need ~50%.\n\nLet's trace how immunity builds and protects.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me how the immune system stops disease.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Immune defense — step by step:**\n\n1. **Invasion**: A pathogen enters the body through skin, lungs, or gut.\n2. **Innate response** (minutes): General-purpose defenders (neutrophils, macrophages) attack anything foreign. Fever raises body temperature to slow pathogen reproduction.\n3. **Antigen presentation**: Macrophages display pieces of the pathogen on their surface — "wanted posters" for the adaptive immune system.\n4. **Adaptive response** (days): T-cells and B-cells that match the antigen activate and multiply.\n5. **Antibody production**: B-cells produce millions of antibodies that lock onto the pathogen, neutralizing it and marking it for destruction.\n6. **Memory cells created**: Long-lived memory B-cells and T-cells remain — ready to respond in hours, not days, if the same pathogen returns.\n7. **Vaccination shortcut**: A vaccine triggers steps 3-6 using a harmless version, building memory without the disease.\n\n**Herd immunity math:** If R₀ = 4, each person infects 4 others. If 75% are immune, 3 out of 4 contacts are dead ends → effective R = 1 → epidemic can't grow.\n\n**Try it:** Adjust immune strength and vaccination rate to see herd immunity change!\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** A disease has R₀ = 5. If 70% of the population is vaccinated, can the epidemic still spread?`,
            options: [
                { id: 'right', label: 'Yes — herd immunity for R₀ = 5 requires 80% vaccination (1 - 1/5 = 0.80), so 70% isn\'t enough.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'No — 70% is more than half, so the majority are protected and it can\'t spread.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Not quite. "More than half" isn't the threshold — the math is more demanding. The herd immunity threshold = **1 - 1/R₀**. For R₀ = 5: threshold = 1 - 1/5 = 1 - 0.2 = **80%**. At 70% vaccination, 30% are still susceptible. Each infected person contacts 5 others, and 30% of those (1.5 people) are susceptible and get infected. Since 1.5 > 1, the epidemic still grows — just more slowly than without any vaccination. You need that full 80% to push the effective reproduction number below 1.`,
            options: [
                { id: 'retry', label: 'I see — the threshold depends on R₀, and 70% isn\'t high enough for a highly contagious disease.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Right! The formula is elegant: **herd immunity threshold = 1 - 1/R₀**.\n\n| Disease | R₀ | Herd Immunity Threshold |\n| --- | --- | --- |\n| Flu | ~2 | 50% |\n| COVID | ~3 | 67% |\n| Smallpox | ~5 | 80% |\n| Measles | ~15 | 93% |\n\nThis is why measles outbreaks occur even in highly vaccinated countries — dropping from 95% to 90% vaccination can restart transmission. The more contagious the disease, the higher the bar.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Connect all the pieces.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** Biology provides the ultimate defense against disease.\n\n- **Immune strength** determines individual protection speed\n- **Vaccination rate** determines population-level protection\n- **Herd immunity** = 1 - 1/R₀ — the threshold where epidemics can't sustain themselves\n- **Memory cells** turn a 14-day first response into a hours-long second response\n- **Vaccines** build the same memory without the disease\n- Higher R₀ diseases need higher vaccination thresholds\n\nPhysics controls how fast disease spreads. Chemistry provides the disinfection tools. Biology builds the immune army that ultimately stops it.`,
            options: [
                { id: 'done', label: 'Complete B29', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 29 Complete — How Do Diseases Spread and Stop?**\n\n- **Physics (P29):** Contact Networks — contact rate and density drive transmission R₀\n- **Chemistry (C29):** Disinfection Kinetics — concentration and contact time determine kill rate\n- **Biology (B29):** Immunity & Vaccination — immune strength and vaccination rate create herd immunity\n\n**Summary Table:**\n| Defense Layer | Variable | Role |\n| --- | --- | --- |\n| Physics | Contact reduction | Lowers R₀ directly |\n| Chemistry | Disinfection | Kills pathogens on surfaces |\n| Biology (individual) | Immune strength | Fights infection once exposed |\n| Biology (population) | Vaccination rate | Builds herd immunity barrier |\n\n**Key takeaways:**\n- Herd immunity threshold = 1 - 1/R₀\n- Immune memory turns week-long responses into hour-long ones\n- Vaccines build memory without disease\n- All three layers work together to stop epidemics\n\n✅ **Lesson B29 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
