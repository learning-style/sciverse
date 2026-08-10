import { DialogNode } from '../../types';

/**
 * P29 — Contact Networks & Transmission Patterns
 * Big Idea 29: "How Do Diseases Spread and Stop?"
 */
export function getP29Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `In 2020, one virus shut down the entire world. How can something invisible spread so fast? The answer lies in **network physics** — the mathematics of who touches whom.\n\n**Visual legend:**\n- **Dots (nodes)**: People in a population. Green = healthy, red = infected, blue = recovered.\n- **Lines (edges)**: Contact connections between people.\n- **Spread wave**: Shows how infection ripples outward from patient zero.\n\n**Key words:**\n- **Contact rate**: How many people each person interacts with per day. More contacts = faster spread.\n- **Population density**: How closely packed people are. Dense crowds mean more contacts.\n- **Transmission rate (R₀)**: The average number of new people each infected person spreads to. R₀ > 1 = epidemic grows. R₀ < 1 = epidemic dies out.\n- **Network**: The web of connections between individuals. Not everyone is equally connected.\n- **Super-spreader**: A highly connected node that can infect many others from one event.\n\nWhy did COVID spread faster in cities than in rural areas?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'physics_answer', label: 'Cities have higher population density, so people have more contacts per day — raising the transmission rate.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'simple_answer', label: 'Because cities are dirtier and have more germs.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `"Dirtier" isn't the right framing. The virus itself doesn't care about cleanliness — it needs **contact** to spread. In cities, people share elevators, subways, offices, and stores. Each person might contact 50+ others daily, while a rural resident might contact 5. The physics is simple: **transmission rate = contact rate × probability of infection per contact**. Double the contacts, double the spread rate. That's why social distancing works — it reduces the contact rate, which drops R₀ below 1.`,
            options: [
                { id: 'cont', label: 'So it\'s about how many connections exist, not how dirty a place is.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly! Disease transmission depends on **two key variables**:\n\n1. **Contact rate** — How many people each person interacts with daily. At a concert: 1000+. At home: 2-5. Reducing contacts is the fastest way to slow spread.\n2. **Population density** — People per square kilometer. Higher density = more involuntary contacts (public transit, shared spaces). This determines the baseline contact rate.\n\nThese two combine to produce the **transmission rate (R₀)**:\n- R₀ > 1: Each person infects more than one other → epidemic grows exponentially\n- R₀ = 1: Stable — each person infects exactly one other\n- R₀ < 1: Epidemic shrinks and dies out\n\nThe physics of networks shows that spread isn't random — it follows predictable patterns.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me how network spread works.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Network transmission — step by step:**\n\n1. **Patient zero**: One person becomes infected (the index case).\n2. **Contact web**: That person interacts with N others daily (their contact rate).\n3. **Probability**: Each contact has a chance of transmission (depends on proximity, duration, and pathogen infectivity).\n4. **First generation**: On average, R₀ people get infected. If R₀ = 3, one becomes three.\n5. **Exponential growth**: Those 3 each infect 3 more = 9. Then 27, 81, 243... It doubles and triples fast.\n6. **Network saturation**: As more people become infected/recovered, fewer susceptible contacts remain. Growth slows.\n7. **Herd immunity threshold**: When enough people are immune (recovered or vaccinated), R₀ drops below 1 even without behavior changes.\n\n**Key insight:** Reducing contact rate by just 50% can cut R₀ in half — potentially turning an epidemic into a manageable decline.\n\n**Try it:** Adjust contact rate and population density to watch the spread change!\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** If a disease has R₀ = 4 and we reduce everyone's daily contacts by 75%, what happens to the epidemic?`,
            options: [
                { id: 'right', label: 'R₀ drops to about 1, so the epidemic stops growing — each case only replaces itself.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'It slows down a little but still grows because R₀ is high.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Not quite. R₀ = 4 means each person infects 4 others at full contact. If you cut contacts by 75%, each person now effectively contacts only 25% as many people. So the new R₀ ≈ 4 × 0.25 = **1.0**. That's the tipping point — the epidemic stops growing. Cut contacts just a bit more and R₀ drops below 1, meaning the epidemic **shrinks** with each generation. This is exactly why lockdowns are so effective even though they don't eliminate all contact.`,
            options: [
                { id: 'retry', label: 'So 75% reduction brings R₀ from 4 to 1 — the breakeven point.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct! R₀ scales linearly with contact rate. A 75% reduction means multiplying R₀ by 0.25: 4 × 0.25 = 1.0. The epidemic plateaus. Any further reduction pushes it into decline.\n\nThis is why public health measures focus on **contact reduction** — it's the most powerful lever available, even before vaccines exist. Masks, distancing, and closures all target the same physics: fewer contacts per person per day.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** Disease spread follows network physics.\n\n- **Contact rate** is the primary driver of transmission\n- **Population density** sets the baseline contact rate\n- **R₀** determines if an epidemic grows (>1) or shrinks (<1)\n- **Exponential growth** makes early intervention critical — waiting doubles the problem\n- **Network structure** matters: super-spreaders and hubs accelerate spread disproportionately\n- **Reducing contacts** is mathematically equivalent to reducing R₀\n\nThe same network math applies to computer viruses, rumors, memes, and any information spreading through connected systems.`,
            options: [
                { id: 'done', label: 'Complete P29', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 29 — How Do Diseases Spread and Stop?**\n\n- **Physics (P29):** Contact Networks — contact rate, population density, and R₀ govern transmission patterns\n- **Chemistry (C29):** Disinfection — chemical agents destroy pathogens through reaction kinetics\n- **Biology (B29):** Immunity — the immune system and vaccines create biological barriers to spread\n\n**Summary Table:**\n| Variable | Low Value | High Value | Effect |\n| --- | --- | --- | --- |\n| Contact Rate | Few interactions | Many interactions | Main R₀ driver |\n| Population Density | Spread, rural | Packed, urban | Sets contact baseline |\n| Transmission Rate (R₀) | Epidemic shrinks | Epidemic grows | Net system outcome |\n\n**Key takeaways:**\n- R₀ = contact rate × infection probability per contact\n- R₀ > 1 = exponential growth; R₀ < 1 = decline\n- Cutting contacts by X% cuts R₀ by X%\n- Network hubs (super-spreaders) have outsized impact\n\n✅ **Lesson P29 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
