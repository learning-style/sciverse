import { DialogNode } from '../../types';

export function getC38Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In **P38** the robot had to **sense** where the line was. But a computer chip only understands one thing: **electricity**.\n\nSo a sensor has an odd job. It must take something that is not electrical at all -- light, heat, pressure, a smell -- and turn it into an electrical signal.\n\nHow do you think a material could turn light into electricity?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'material', label: "Use a material whose ability to carry electricity actually changes when light lands on it.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'camera', label: "Take a picture of it -- a tiny camera looks at the light and reports what it sees.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "But think about what is *inside* the camera -- the same puzzle again! Something in there must still convert light into electricity.\n\nThe answer is a special material. In a **photoresistor**, light knocks **electrons** loose from the atoms in the material. Loose electrons can move, and moving electrons are electric current.\n\nSo in the dark, the material blocks electricity strongly -- it has **high resistance**. In bright light, electrons are freed and it conducts easily -- **low resistance**. Measure the resistance and you have measured the light.",
            options: [
                { id: 'cont', label: "So light changes how well the material carries electricity?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Every sensor is a material with a **useful weakness** -- some property that changes when the world changes:\n\n1. **Light sensor** -- light frees **electrons**, so **resistance** drops\n2. **Temperature sensor** -- heat makes atoms jiggle, changing resistance in a known way\n3. **Pressure sensor** -- squeezing certain crystals literally makes them produce a small voltage\n4. **Gas sensor** -- gas molecules stick to a coated surface and change its conductivity\n5. **Humidity sensor** -- a material soaks up water, changing how much charge it can hold\n\nThe chemistry is what makes each one possible. Choose the material and you choose what the machine can feel.\n\nSlide **Light Level** and watch resistance and signal change together!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me change the light and watch the signal!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A line-following robot works perfectly in a lab. Taken outside into bright sunshine, it loses the line completely -- even though the line is still clearly visible to your eyes.\n\nWhat went wrong with its sensor?",
            options: [
                { id: 'right', label: "Sunlight flooded the sensor so both the line and the floor read as bright -- the sensor was **saturated** and could not tell them apart.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Sunlight is too strong and physically broke the sensor material.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The sensor is undamaged -- it works fine again back indoors. The problem is that it is **maxed out**.\n\nEvery sensor has a **range**: the span of conditions it can actually distinguish. In dim lab light, the black line and the white floor produced clearly different readings. Under direct sun, both reflect so much light that the sensor reads \"maximum brightness\" for both. The difference is still there in the world, but the sensor can no longer report it. Engineers call this **saturation**.\n\nYour eyes do this too. Step out of a dark cinema into midday sun and for a few seconds everything is a white blur -- your eyes are saturated until they adjust.\n\nThe fixes: shade the sensor, or use one that adjusts its range automatically.",
            options: [
                { id: 'retry', label: "Oh -- the sensor maxed out and everything looked the same!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **A sensor can only report what is inside its range.**\n\nThings every sensor has to be judged on:\n- **Range** -- the span it can measure before **saturating**\n- **Sensitivity** -- the smallest change it can detect\n- **Speed** -- how fast it responds to a change\n- **Drift** -- how much its readings creep over months and years\n\nAnd here is why this matters so much for **P38 The Feedback Loop**: the loop corrects based on what the sensor reports. A saturated sensor feeds the loop **false information**, and a perfectly tuned controller then confidently drives the robot in the wrong direction.\n\nNature has been solving this for millions of years. In B38, meet the original sensors!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A sensor is only as good as its range!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how machines feel the world!**\n\n- A sensor converts something physical into **electricity**\n- Light frees **electrons**, lowering a **photoresistor's resistance**\n- Heat, pressure, gas, and humidity each change a material in a measurable way\n- Every sensor has a **range**, and beyond it the sensor **saturates**\n- A saturated sensor reports the same value for different conditions\n- Bad sensor data makes even a perfect **feedback loop** fail\n\nNext in B38: the sensors that evolved long before engineers existed!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Sensors turn the world into electricity!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C38 Complete -- Sensors Made of Chemistry!**\n\nEvery sensor is a material chosen for how it changes when the world changes.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Sensors make electricity | Chips understand nothing else | The conversion is the whole job |\n| Light lowers resistance | Freed **electrons** carry current | How a **photoresistor** works |\n| Materials pick the sense | Heat, pressure, gas, humidity | Chemistry decides capability |\n| Sensors max out | **Saturation** ends the range | Bright sun blinds robots |\n\n**Up next:** B38 (Nature's Robots) -- animals have been doing this for millions of years!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
