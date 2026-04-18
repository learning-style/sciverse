import { DialogNode } from '../../types';

/**
 * B30 — Target Cells & Treatment Response
 * Big Idea 30: "How Do Medicines Reach the Right Place?"
 */
export function getB30Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `How does a painkiller "know" to stop your headache but not affect your stomach? The truth is: **it doesn't know**. Medicine goes everywhere in your body. The secret is in **receptor biology** — only cells with the right receptor respond.\n\n**Visual legend:**\n- **Cell grid**: Different cell types (target and non-target). Target cells have receptors that match the drug.\n- **Drug molecules**: Floating medicine particles. They bind to matching receptors like a key fits a lock.\n- **Response meter**: Shows the treatment effect as more drug-receptor pairs form.\n\n**Key words:**\n- **Receptor**: A protein on a cell surface shaped to bind specific molecules. Like a lock that only one key fits.\n- **Receptor density**: How many receptors a cell has. More receptors = stronger response to the drug.\n- **Drug affinity**: How strongly a drug binds to its receptor. High affinity = drug sticks tightly and works at lower doses.\n- **Treatment response**: The biological effect when drug binds receptor — blocking pain signals, killing bacteria, or reducing inflammation.\n\nWhy do antibiotics kill bacteria but not your own cells?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'bio_answer', label: 'Antibiotics target receptors and structures that bacteria have but human cells don\'t — like bacterial cell walls.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'simple_answer', label: 'Because antibiotics are designed to only attack bad things, not good things.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Medicines can't tell "good" from "bad" — they're just molecules following chemistry. Antibiotics work because **bacterial cells are structurally different** from human cells. Penicillin, for example, blocks an enzyme that bacteria need to build their cell walls. Human cells have no cell walls — they have flexible membranes instead. So penicillin binds to the bacterial enzyme (its **target receptor**) and has nothing to bind to on human cells. This is called **selective toxicity** — the drug is toxic to the pathogen but harmless to the host because the target exists only in the pathogen.`,
            options: [
                { id: 'cont', label: 'So it\'s about structural differences between cell types, not the drug being "smart."', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly! Drug targeting depends on **two key biological variables**:\n\n1. **Receptor density** — How many matching receptors a cell type has. Pain-sensing neurons have many opioid receptors. Muscle cells have few. So painkillers affect neurons strongly but muscles barely notice.\n2. **Drug affinity** — How tightly the drug molecule binds to its receptor. High affinity = effective at low doses. Low affinity = needs higher doses (with more side effects).\n\nThese combine to produce the **treatment response**:\n- **Strong response**: High receptor density + high affinity → maximum therapeutic effect\n- **Weak response**: Low density OR low affinity → minimal effect\n- **Side effects**: When the drug also binds receptors on non-target cells (lower affinity, but still some binding)\n\nThe biology of drug targeting is essentially a **lock-and-key** matching problem at the molecular level.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me how drug-receptor binding works.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Drug-receptor interaction — step by step:**\n\n1. **Drug arrives**: Medicine molecules reach the target tissue via the bloodstream (physics: diffusion and transport).\n2. **Receptor encounter**: Drug molecules randomly collide with cell surface receptors through Brownian motion.\n3. **Shape recognition**: If the drug's 3D shape complements the receptor's binding pocket, it fits — like a key in a lock.\n4. **Binding**: Chemical bonds (hydrogen bonds, van der Waals forces) form between drug and receptor. Higher affinity = more bonds = tighter grip.\n5. **Signal activation**: Binding triggers a conformational change in the receptor, activating (or blocking) a cellular signaling pathway.\n6. **Cellular response**: The signal cascades inside the cell — reducing inflammation, blocking pain signals, or triggering cell death (in cancer drugs).\n7. **Unbinding**: Eventually, the drug releases from the receptor. How long it stays bound determines duration of effect.\n\n**Key insight:** Side effects occur when drugs bind to **similar but different receptors** on non-target cells. More selective drugs have fewer side effects.\n\n**Try it:** Adjust receptor density and drug affinity to see how treatment response changes!\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** A cancer drug is designed to target a receptor found on 90% of tumor cells but also on 10% of healthy liver cells. What happens when the patient takes this drug?`,
            options: [
                { id: 'right', label: 'Tumor cells are strongly affected (high receptor density), but some liver cells are also harmed (lower density but still present) — causing side effects.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'Only tumor cells are affected because the drug is designed for cancer.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Drugs don't "know" which cells are cancerous — they only "know" which receptors match their shape. If 10% of liver cells have the same receptor, the drug **will bind there too**. This is why cancer treatments often cause side effects like liver damage, nausea (gut cells get hit), and hair loss (hair follicle cells share some receptors with tumors). The treatment response is proportional to receptor density: tumor cells with 90% receptor coverage respond strongly, liver cells with 10% respond weakly but noticeably. Better drugs have higher **selectivity** — they hit the target much more than bystanders.`,
            options: [
                { id: 'retry', label: 'So side effects are fundamentally a receptor-matching problem — the drug can\'t tell cell types apart.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct! This is the central challenge of pharmacology: **selectivity vs. efficacy**.\n\nModern drug design strategies to improve targeting:\n- **Monoclonal antibodies**: Engineered to bind only one specific receptor variant\n- **Prodrugs**: Inactive until converted by enzymes found only at the target site\n- **Nanoparticle delivery**: Tiny capsules that accumulate preferentially in tumor tissue\n- **Receptor profiling**: Mapping which receptors exist on which cells to predict side effects before clinical trials`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** Drug targeting is receptor biology.\n\n- **Receptor density** determines which cells respond most strongly\n- **Drug affinity** controls how tightly medicine binds and how long it works\n- **Treatment response** is proportional to receptor density × affinity\n- **Side effects** occur when non-target cells share similar receptors\n- **Selectivity** is the holy grail of drug design\n- **Lock-and-key** principle: molecular shape determines which receptors a drug can bind\n\nPhysics delivers the drug (diffusion). Chemistry controls the release (coatings). Biology determines the response (receptors).`,
            options: [
                { id: 'done', label: 'Complete B30', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 30 — How Do Medicines Reach the Right Place?**\n\n- **Physics (P30):** Diffusion Transport — concentration gradients drive medicine through tissues\n- **Chemistry (C30):** Drug Solubility — coatings and solubility control release timing\n- **Biology (B30):** Target Cells — receptors determine which cells respond to treatment\n\n**Summary Table:**\n| Variable | Low Value | High Value | Effect |\n| --- | --- | --- | --- |\n| Receptor Density | Few receptors | Many receptors | Strength of response |\n| Drug Affinity | Weak binding | Strong binding | Duration & potency |\n| Treatment Response | Minimal effect | Full therapeutic effect | Net outcome |\n\n**Key takeaways:**\n- Drugs don't "know" their target — receptors do the matching\n- Response = receptor density × drug affinity\n- Side effects = drug binding to similar receptors on non-target cells\n- Better selectivity = fewer side effects\n- Modern approaches: antibodies, prodrugs, nanoparticles\n\n✅ **Lesson B30 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
