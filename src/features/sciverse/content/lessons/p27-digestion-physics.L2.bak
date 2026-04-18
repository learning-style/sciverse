import { DialogNode } from '../../types';

/**
 * P27 — Mechanical Digestion & Motion
 * Big Idea 27: "How Does Food Become Usable Energy?"
 */
export function getP27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `When you eat an apple, how does your body turn it into energy you can actually use?\n\n**Visual legend:**\n- **Teeth icon**: Mechanical grinding that increases surface area.\n- **Tube with wave arrows**: **Peristalsis** — rhythmic muscle contractions that push food through the digestive tract.\n- **Particle cloud**: Food broken into smaller pieces, exposing more surface for chemical attack.\n\n**Key words:**\n- **Mechanical digestion**: Physical breakdown of food — chewing, churning, and squeezing — without changing its chemical identity.\n- **Peristalsis**: Wave-like muscle contractions that move food from the esophagus through the stomach and intestines.\n- **Surface area**: The total exposed area of food particles. Smaller pieces = more surface = faster chemical digestion.\n- **Churning**: The stomach's muscular walls contract and relax to mix food with digestive juices.\n- **Force**: A push or pull that changes the shape or motion of food as it travels through the tract.\n\nWhat do you think happens to food between biting it and absorbing its nutrients?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'physics_answer', label: 'The body physically breaks food into tiny pieces and pushes them through a long tube.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'magic_answer', label: 'Food just dissolves on its own once you swallow it.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `That's a common idea, but food doesn't dissolve on its own. Your body does **serious mechanical work** to break it down. Teeth crush and grind. The stomach churns with powerful muscle contractions. The intestines use **peristalsis** — coordinated waves of force — to keep everything moving. Without these physical forces, chemical digestion would be far too slow to sustain life.`,
            options: [
                { id: 'cont', label: 'So the body uses physical force to prepare food for chemistry.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly! Mechanical digestion uses **three key physics processes**:\n\n1. **Grinding (teeth & jaw)** — Your jaw muscles exert **~70 N of force** on molars. Chewing fractures food into smaller particles, dramatically increasing **surface area**.\n2. **Churning (stomach)** — The stomach's muscular walls contract **~3 times per minute**, mixing food with acid and enzymes into a semi-liquid paste called **chyme**.\n3. **Peristalsis (esophagus & intestines)** — Smooth muscle rings contract in sequence, creating a traveling wave that propels food forward at **~2-25 cm/s**.\n\nThese three processes create a **mechanical pipeline** — grinding exposes surface area, churning mixes reactants, and peristalsis moves everything through roughly **9 meters** of digestive tract.\n\nLet's explore how the physics works step by step.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Walk me through the mechanical stages.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**The mechanical digestion pipeline — step by step:**\n\n1. **Mouth**: Teeth apply compressive and shearing forces. Incisors cut, canines tear, molars grind. Each chew cycle lasts ~0.5 seconds.\n2. **Swallowing**: The tongue pushes the **bolus** (chewed food ball) backward. The epiglottis closes the airway. This is a coordinated **reflex** involving >20 muscles.\n3. **Esophagus**: Peristaltic waves carry the bolus to the stomach in **6-10 seconds**. Gravity helps when upright, but peristalsis works even upside down!\n4. **Stomach**: Three muscular layers churn food for **2-5 hours**. The pyloric sphincter controls release — only particles smaller than ~2 mm pass through.\n5. **Small intestine**: **Segmentation** contractions mix chyme with enzymes. Peristalsis slowly advances it. The intestinal wall has **villi** — tiny finger-like projections that increase absorption surface area by **~600×**.\n6. **Large intestine**: Slower peristalsis. Water absorption. Remaining material compacted.\n\n**Try it:** Increase the grinding force slider and watch surface area multiply. Then increase peristalsis speed to see transit time change!\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Yes, let\'s check my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** Why does chewing food thoroughly speed up digestion?`,
            options: [
                { id: 'right', label: 'Smaller pieces have more surface area for enzymes to attack.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'Chewing heats the food, which makes it dissolve faster.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Not quite. Chewing doesn't significantly heat food. The real reason is **surface area**. Imagine a sugar cube vs. the same sugar ground into powder — the powder dissolves much faster because enzymes can access more surface at once. Chewing does the same thing: it fractures food into hundreds of smaller particles, each exposing fresh surface for digestive enzymes to work on. More surface area → faster chemical breakdown.`,
            options: [
                { id: 'retry', label: 'Got it — it\'s about surface area, not temperature.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct! **Surface area** is the bridge between mechanical and chemical digestion. When you grind a food particle into 8 smaller cubes, you **double** the total surface area. The enzymes don't work faster per unit area — there's just **more area** for them to work on simultaneously.\n\nThis is the same principle used in industrial chemistry: catalysts are ground into fine powders to maximize reaction speed. Your teeth are doing industrial-grade surface preparation!`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Let\'s see the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** Mechanical digestion is a physics-driven pipeline that transforms whole food into a form chemistry can process efficiently.\n\n- **Forces** (compression, shear, peristaltic waves) do the physical work\n- **Surface area** is the critical output — more surface means faster enzyme access\n- **Peristalsis** provides continuous transport through 9 meters of tract\n- **Timing** matters: the stomach holds food for hours to ensure thorough mixing before release\n\nWithout mechanical digestion, your enzymes would take **days** to break down a single meal instead of hours. Physics enables chemistry at biological speed.`,
            options: [
                { id: 'done', label: 'Complete P27', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 27 Complete — How Does Food Become Usable Energy?**\n\n- **Physics (P27):** Mechanical Digestion — grinding, churning, and peristalsis break food into small particles with maximum surface area\n- **Chemistry (C27):** Enzyme Reactions — specialized proteins catalyze the chemical breakdown of carbohydrates, proteins, and fats\n- **Biology (B27):** Digestive System — organs coordinate mechanical and chemical digestion into an integrated nutrient-extraction pipeline\n\n**Summary Table:**\n| Stage | Force Type | Key Outcome |\n| --- | --- | --- |\n| Mouth | Compression & shear | Food fractured into small particles |\n| Stomach | Churning contractions | Mixing with acid → chyme |\n| Small intestine | Segmentation + peristalsis | Maximum enzyme contact |\n| Large intestine | Slow peristalsis | Water recovery, compaction |\n\n**Key takeaways:**\n- Mechanical digestion is about **forces** and **surface area**\n- **Peristalsis** moves food even against gravity\n- Smaller particles → exponentially faster chemical digestion\n- The stomach acts as both a mixer and a timed-release valve\n- Physics and chemistry work together at every stage\n\n✅ **Lesson P27 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
