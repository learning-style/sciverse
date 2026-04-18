import { DialogNode } from '../../types';

/**
 * C30 — Drug Solubility & Controlled Release
 * Big Idea 30: "How Do Medicines Reach the Right Place?"
 */
export function getC30Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `Why do some pills dissolve in your stomach in minutes while others release medicine slowly over 12 hours? The answer is **pharmaceutical chemistry** — engineering how drug molecules interact with water and coatings.\n\n**Visual legend:**\n- **Pill cross-section**: Shows the drug core surrounded by a polymer coating. Coating thickness controls release rate.\n- **Dissolution wave**: Water penetrating the coating and dissolving the drug inside.\n- **Concentration curve**: Shows drug level in the blood over time — the goal is to stay inside the therapeutic window.\n\n**Key words:**\n- **Solubility**: How well a substance dissolves in a solvent. Higher solubility = faster dissolution.\n- **Controlled release**: Engineering a pill to release medicine gradually, maintaining steady blood levels.\n- **Coating thickness**: The polymer layer around a drug. Thicker coating = slower water penetration = slower release.\n- **Therapeutic window**: The safe concentration range — above minimum effective dose, below toxic dose.\n\nWhy can't you crush a time-release pill and take the powder instead?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'chem_answer', label: 'Crushing destroys the controlled-release coating, releasing the entire dose at once — potentially toxic levels.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'simple_answer', label: 'Because the powder tastes terrible and won\'t work as well.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Taste isn't the issue — it's life-threatening chemistry! A 12-hour time-release pill contains a full 12 hours of medicine. The polymer coating is engineered to dissolve slowly, releasing a small amount each hour. If you crush it, **all 12 hours of medicine hits your bloodstream at once**. That's roughly 12× the intended hourly dose — enough to cause overdose symptoms. The coating isn't for taste; it's a **chemical rate controller** that turns a potentially dangerous dose into a safe, steady stream of medicine.`,
            options: [
                { id: 'cont', label: 'So the coating is actually a safety mechanism that controls chemistry, not just packaging.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly! Drug chemistry controls delivery through **two key variables**:\n\n1. **Drug solubility** — How fast the active ingredient dissolves in body fluids. Highly soluble drugs dissolve instantly (aspirin). Poorly soluble drugs need special formulations (fat-soluble vitamins).\n2. **Coating thickness** — The polymer barrier around the drug. Water must penetrate this layer before the drug can dissolve. Thicker coating = longer delay before release.\n\nThese combine to produce the **release rate** — how much drug enters the bloodstream per hour:\n- **Immediate release**: No coating, high solubility → peak in 30 min, drops quickly\n- **Extended release**: Thick coating → steady levels for 8-24 hours\n- **Enteric coating**: Acid-resistant → survives stomach, dissolves in intestine (pH-triggered)\n\nThe chemistry of dissolution follows the same principles as sugar dissolving in water — but engineered with precision.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me how controlled release works chemically.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Controlled release chemistry — step by step:**\n\n1. **Water contact**: Body fluids reach the pill surface. The outer coating begins absorbing water.\n2. **Polymer swelling**: The coating material (often cellulose or polyethylene glycol) swells as water enters, creating microscopic channels.\n3. **Diffusion through coating**: Water reaches the drug core through these channels. Rate depends on coating thickness and polymer type.\n4. **Drug dissolution**: The active ingredient dissolves in the water that penetrated the coating. Solubility determines how fast.\n5. **Outward diffusion**: Dissolved drug molecules diffuse back out through the swollen coating into the surrounding fluid.\n6. **Absorption**: Drug enters the bloodstream through the gut wall.\n7. **Steady state**: As drug is absorbed and eliminated at equal rates, blood concentration stays constant — inside the therapeutic window.\n\n**Key insight:** The coating acts like a **chemical valve** — controlling flow rate regardless of how much drug is inside.\n\n**Try it:** Adjust solubility and coating thickness to see how the release profile changes!\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** A patient takes an enteric-coated aspirin. The stomach has pH 2 (acidic) and the intestine has pH 7 (neutral). Where does the aspirin dissolve, and why?`,
            options: [
                { id: 'right', label: 'In the intestine — the enteric coating is acid-resistant so it survives the stomach but dissolves at the higher pH of the intestine.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'In the stomach — acid helps dissolve things faster.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Counterintuitive but wrong! Enteric coatings are made of **pH-sensitive polymers** that are stable in acid (pH < 5) but dissolve in neutral/basic conditions (pH > 5.5). In the acidic stomach, the coating stays intact — protecting both the stomach lining from aspirin irritation AND the drug from premature release. When the pill moves to the intestine (pH ~7), the coating dissolves and releases the drug. This is **chemistry-triggered delivery** — the body's own pH gradient acts as the release switch.`,
            options: [
                { id: 'retry', label: 'So the coating is designed to respond to specific chemical conditions, not just dissolve over time.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct! Enteric coatings exploit the body's **pH gradient** as a targeting mechanism. The coating polymer has ionizable groups that stay protonated (and insoluble) in acid, but deprotonate (and dissolve) at higher pH.\n\nThis is one of several chemical targeting strategies:\n- **pH-triggered**: Dissolves at specific pH (enteric coatings)\n- **Time-triggered**: Coating erodes at a constant rate regardless of pH\n- **Enzyme-triggered**: Coating broken down by specific enzymes at the target site\n- **Temperature-triggered**: Some hydrogel coatings release drugs at fever temperatures`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** Drug delivery is controlled chemistry.\n\n- **Solubility** determines how fast drug molecules dissolve\n- **Coating thickness** controls the release timeline\n- **pH-sensitive coatings** target specific body regions\n- **Therapeutic window** defines the safe effective range\n- **Controlled release** maintains steady levels instead of spike-and-crash\n- **Formulation chemistry** turns the same molecule into fast, slow, or targeted delivery\n\nPhysics provides the transport (diffusion). Chemistry provides the release control. Biology provides the target response.`,
            options: [
                { id: 'done', label: 'Complete C30', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 30 — How Do Medicines Reach the Right Place?**\n\n- **Physics (P30):** Diffusion Transport — concentration gradients and barrier physics\n- **Chemistry (C30):** Drug Solubility — dissolution kinetics and controlled-release coatings\n- **Biology (B30):** Target Cells — receptor binding and cellular treatment response\n\n**Summary Table:**\n| Variable | Low Value | High Value | Effect |\n| --- | --- | --- | --- |\n| Drug Solubility | Slow dissolve | Fast dissolve | Speed of release |\n| Coating Thickness | Thin → fast | Thick → slow | Duration control |\n| Release Rate | Steady/slow | Burst/fast | Blood level profile |\n\n**Key takeaways:**\n- Controlled release = chemical engineering of time\n- Coatings act as chemical valves on drug flow\n- pH-triggered coatings use the body's own chemistry for targeting\n- Crushing time-release pills destroys the safety mechanism\n\n✅ **Lesson C30 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
