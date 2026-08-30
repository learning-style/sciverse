import { DialogNode } from '../../types';

export function getB49Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "The mine has run out. The machines have gone. What is left is a huge hole, some flat grey piles of crushed **waste** rock, and not one single living thing.\n\nThe company says: \"We will plant trees next spring, and in a few years it will be a lovely wood.\"\n\nThey plant a thousand young trees. Almost every one of them dies. Why?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "There is no **soil** there yet, and soil is not something you can just plant into -- it has to be built up by living things over many years.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "They planted the wrong sort of trees, and a tougher sort would have grown perfectly well.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Tougher trees would die too. So would every sort of tree.\n\nThe problem is that a young tree needs **soil**, and there is none. Soil is not the same thing as ground, and it is not the same thing as rock.\n\nSoil is a mixture of two things: tiny bits of broken rock, and **rotted plants** -- the dark crumbly remains of everything that has lived and died there. That dark part is what holds water like a sponge, and it is what feeds new plants.\n\nCrushed mine waste has the broken rock part. It has absolutely none of the rotted plant part. So water runs straight through it and there is nothing to feed a root.\n\nAnd this is the bit people find hardest to believe: **soil cannot be delivered by lorry and finished in an afternoon**. Real soil is made slowly, by living things, out of their own remains.",
            options: [
                { id: 'cont', label: "So living things have to build the soil first?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Life comes back to bare rock in a fixed order, and each step builds what the next step needs.\n\n**1. Moss and lichen.** These cling straight onto bare rock and need no soil whatsoever. When they die and rot, they leave the first thin dark skin of rotted plant.\n\n**2. Grasses and small weeds.** Their roots need only that thin skin. As they push in, they crack the rock into finer bits, and every autumn their dead leaves add more rotted plant.\n\n**3. Shrubs and bushes.** By now there is enough soil to hold water through a dry week, which is what a bigger plant needs.\n\n**4. Young trees.** Deep roots need deep soil, so trees come late.\n\n**5. Woodland.** Decades after the machines left.\n\nNotice that nothing here can be skipped. The trees could not grow in step 1 because steps 1 to 3 had not made their soil yet.\n\nPeople can **speed it up** -- spread real soil, sow grass, mix in rotted plants -- and that helps enormously. But it works by starting further along the same list, not by jumping to the end.\n\nSlide **Years of Healing** and watch the land come back!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me watch the years go by!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Two mines close in the same valley, in the same year, in the same kind of rock.\n\nSite A is fenced off and left completely alone.\n\nSite B has a layer of real soil spread over it and is sown with grass seed.\n\nTwenty years later, Site B has bushes and small trees. Site A has moss and a few patches of thin grass. Why such a difference?",
            options: [
                { id: 'right', label: "Site B was started several steps along the list, so its twenty years went into growing on soil that was already there instead of slowly making it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Site B must have been left with better rock underneath than Site A was.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Look at the question again -- both mines were in **the same kind of rock**, in the same valley. The rock cannot be the difference.\n\nWhat differs is **where each site started on the list**.\n\nSite A began at step 1, on bare rock. Twenty years of moss growing, dying and rotting is genuinely impressive work, but it only gets you a thin skin of soil and the first grasses. Site A is not behind because it failed. It is exactly where twenty years of unaided moss gets you.\n\nSite B was handed steps 1 and 2 on day one. Its twenty years were spent on steps 3 and 4, growing shrubs and young trees on soil that was waiting for them.\n\n**Nobody skipped a step. Site B was simply given the early ones.**\n\nGive Site A a century and it will get there too. It is doing the same work -- it just has to do all of it itself.",
            options: [
                { id: 'retry', label: "Oh -- Site B was given a head start, not better rock!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Land heals in a fixed order, and the slow part is making the soil.**\n\nAnd now the three lessons join up into one honest picture of using the Earth.\n\n- **P49** showed you the **hole** -- ore is deep, lifting costs energy, and the easy ore always goes first, so it gets deeper every year\n- **C49** showed you the **pile** -- metal is joined onto other things, so poor rock means enormous amounts dug, crushed, heated and dumped\n- **B49** shows you the **repair bill** -- and it is measured in decades, because soil is built by living things, not poured out of a lorry\n\nSo what does using resources **responsibly** actually mean? Four things, and every one of them comes straight out of these lessons.\n\n**Take less**, because every load was lifted a long way. **Use the richer rock**, because poor rock multiplies the waste. **Recycle**, because old metal is already free of its oxygen and needs a fraction of the heat. And **start the healing early**, because a site given soil and grass on day one is decades ahead of one that is walked away from.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Soil has to be built, and building takes years!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how land comes back to life!**\n\n- **Soil** is broken rock mixed with **rotted plants**\n- Mine waste has the rock part and none of the rotted part\n- Soil is **built by living things**, slowly, out of their own remains\n- **Moss and lichen** first -- they need no soil at all\n- Then **grasses**, whose roots crack the rock finer\n- Then **shrubs**, once soil holds water through a dry week\n- Then **young trees**, which need deep soil for deep roots\n- **Woodland** takes decades\n- People can start the land further along the list, but cannot skip it\n\nThat is why healing costs so much more time than digging did!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Moss first, woodland decades later!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**B49 Complete -- Healing the Land!**\n\nA mine can be dug in a year. Putting the land back takes a lifetime.\n\n**Summary Table:**\n| Lesson | Key Idea | What It Gave You |\n| --- | --- | --- |\n| **P49** The Cost of Digging | Lifting costs **energy** | The hole, and why it deepens every year |\n| **C49** From Rock to Metal | Metal is joined to **oxygen** | The waste pile, and why poor rock multiplies it |\n| **B49** Healing the Land | **Soil** is built by living things | The repair bill, measured in decades |\n\n**Using resources responsibly means four things:** take less, use richer rock, **recycle** what is already metal, and start the healing on day one instead of walking away.\n\n**Big Idea 49 complete!** Next: how machines far above our heads watch the whole planet at once.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
