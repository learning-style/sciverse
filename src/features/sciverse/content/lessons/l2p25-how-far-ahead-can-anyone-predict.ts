import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 25, physics.
 *
 * P25 said that tiny differences in starting conditions grow into big ones, and
 * left it there -- with the words chaotic, nonlinear, trajectory and deterministic
 * and not a single number. The question it raises and never asks is the one that
 * matters: how far ahead CAN anyone predict?
 *
 *   error after n doublings = starting error x 2^n
 *
 * In the real atmosphere a small error doubles in about a day and a half. So ten
 * doublings is fifteen days, which is where a forecast stops being worth anything
 * -- and that matches the real practical limit of about a fortnight.
 *
 * The useful consequence is the one nobody expects: because the growth is
 * multiplication, improving the measurement buys only a FIXED NUMBER of extra
 * doublings. A thousand times better thermometer is ten more doublings, which is
 * fifteen more days, and a million times better is only thirty. You cannot buy your
 * way out of this, and that is the actual content of the word chaos.
 *
 * Frame of reference stated: the error is the difference between the forecast
 * temperature and the real one at the same place and the same moment, in degrees C.
 *
 * Still standing: the doubling rate is treated as fixed, which it is not -- it
 * depends on the weather itself. And this blames the measurement alone, when a real
 * forecast is also limited by the model being wrong about the physics. L3P25 asks
 * where the doubling comes from in the first place.
 */
export function getL2P25Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P25 told you that a tiny difference at the start can grow into a big one, and used the word **chaotic** to describe it. That is a label, not an answer, and it leaves the only interesting question untouched.\n\nHere is that question. A weather service measures the atmosphere this morning as carefully as it possibly can, and runs the physics forward. **How many days ahead is the answer worth having?**\n\nNotice that this is not a question about whether the physics is right. Assume it is perfect. The problem is that the measurement this morning was not perfect -- it never can be -- and in a system like the weather that small mistake does not stay small.\n\n**Error** here means one specific thing: the difference between the temperature the forecast predicts and the temperature that actually happens, at the same place and the same moment, in **°C**. At the start the error is just how wrong this morning's measurement was.\n\nAnd the thing that makes weather weather is this. **The error does not grow by adding. It grows by doubling.** In the real atmosphere a small error takes about **a day and a half** to double, and then a day and a half to double again.\n\nYour two dials are the two things you would want to control.\n\n- **Starting Error** -- how wrong this morning's measurement is, in °C. This is the one a weather service can spend money on.\n- **Days Ahead** -- how far forward you are asking. The dial moves in steps of a day and a half, so each step is exactly one doubling.\n\nA forecast is useless once the error reaches about **1 °C**, because that is as big as the thing you were trying to predict.\n\nSo, before any arithmetic. If you measured a thousand times more precisely, roughly how much further ahead could you forecast?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'thousand', label: "About a thousand times further ahead.", nextNodeId: 'misconception' },
                { id: 'little', label: "Hardly any further -- doubling eats a head start fast.", nextNodeId: 'defining', sentiment: 'positive' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is the answer for something that grows by **adding**, and it is the single most expensive mistake you can make about a system like this.\n\nIf the error grew by adding 0.1 °C a day, then yes -- starting a thousand times smaller would last a thousand times longer, and a better thermometer would buy forecasts for years.\n\nBut the error **doubles**. And doubling does something to a head start that adding never does: it **eats it in a fixed number of steps**.\n\nStart a thousand times smaller and you have not bought a thousand times longer. You have bought however many doublings it takes to make up a factor of a thousand -- and that is **ten**, because 2 multiplied by itself ten times is 1024.\n\nTen doublings. At a day and a half each, **fifteen days**. That is what a thousand-fold improvement is worth, and it is the same fifteen days whether you start from a thousandth of a degree or a millionth.\n\n**Multiplying growth turns a huge improvement into a small, fixed extension.** That is not a detail about weather. It is what the word chaos is actually claiming.",
            options: [
                { id: 'cont', label: "Show me the arithmetic.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "One doubling multiplies the error by 2. Two doublings multiply it by 2 x 2 = 4. Ten doublings multiply it by 2 ten times over, which is **1024**.\n\nSo for **n** doublings:\n\n**error = starting error x 2ⁿ**\n\nThis holds while the error is still **small** -- small enough that doubling is a fair description. Once the error is as big as the weather itself it cannot keep doubling, because there is nothing left to be wrong about. That is exactly why 1 °C is the place we stop caring.\n\nAnd the powers of 2 are worth knowing by sight, because they are the whole lesson:\n\n| Doublings | Multiply by | Days |\n| --- | --- | --- |\n| 1 | 2 | 1.5 |\n| 10 | **1024**, call it a thousand | **15** |\n| 20 | **1,048,576**, call it a million | **30** |\n\nRead the middle row in the direction that matters. **Ten doublings is a factor of a thousand.** So every factor of a thousand you win on the measurement is worth ten doublings, and every ten doublings costs you a factor of a thousand in precision.\n\nThat is the trade, and it is a terrible one.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me it on real numbers.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A worked example.** This morning's measurement is wrong by **0.001 °C** -- a thousandth of a degree, which is far better than any real weather station manages.\n\nHow long until the error reaches 1 °C and the forecast is worthless?\n\nWe need to multiply 0.001 by enough 2s to reach 1, which means multiplying by about a thousand. From the table, that is **10 doublings**:\n\n0.001 x 1024 = **1.024 °C**\n\nAnd 10 doublings at a day and a half each:\n\n10 x 1.5 = **15 days**\n\n**Fifteen days.** Which is worth stopping on, because the real practical limit of weather forecasting is about **a fortnight** -- and we just got there from one measurement error and ten doublings.\n\n**Now buy a thousand times better.** Starting error **0.000001 °C**, a millionth of a degree. That is a fantasy instrument. How much does it buy?\n\nTo get from a millionth to 1 we need a factor of a million, which is **20 doublings**:\n\n0.000001 x 1,048,576 = **1.05 °C**, at 20 x 1.5 = **30 days**\n\nSo a **thousand-fold** better measurement took the forecast from 15 days to **30 days**. Not 15,000 days. **Fifteen extra days, for a thousand-fold improvement** -- and the next fifteen days would cost another factor of a thousand on top.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. A weather station's measurement is wrong by **0.01 °C** -- a hundredth of a degree.\n\nRoughly how many days ahead is its forecast worth having, before the error passes 1 °C?",
            options: [
                { id: 'ten', label: "About 10 days", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'fifteen', label: "About 15 days", nextNodeId: 'math_wrong' },
                { id: 'hundred', label: "About 150 days", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Count the doublings needed, then turn them into days.\n\nFrom 0.01 to 1 is a factor of **100**. How many 2s make 100? 2, 4, 8, 16, 32, 64, **128** -- that is **7 doublings**, and 7 x 1.5 = **10.5 days**, so about **10 days**.\n\n15 days is the answer for a starting error of 0.001, ten times smaller. Notice how little that extra factor of ten bought: **three doublings**, four and a half days. And 150 days is the adding answer again -- it treats a factor of 100 as buying 100 times longer, when a factor of 100 buys **seven doublings** and nothing more.\n\nIt is worth seeing the whole pattern in one place:\n\n| Starting error | Doublings to reach 1 °C | Days |\n| --- | --- | --- |\n| 0.01 | 7 | **10.5** |\n| 0.001 | 10 | **15** |\n| 0.000001 | 20 | **30** |\n\nEach row is a thousand times better than the one two below it, and buys **fifteen days**.",
            options: [
                { id: 'retry', label: "Count doublings, not factors.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The error is drawn as a bar that doubles each step, against the 1 °C line where the forecast dies.\n\nThings worth doing:\n\n- Set the **Starting Error** to 0.001 and walk **Days Ahead** forward. For the first week almost nothing happens -- the bar is invisible. Then it crosses the line in two steps. **Doubling looks like nothing right up until it looks like everything.**\n- Now take the starting error down by a factor of ten, and find the day the line is crossed. It moves by **three or four doublings** -- four to six days. Do it again. Another four to six.\n- Put the starting error at its very best and ask how far that got you: **30 days**, from an instrument a thousand times better than anything real.\n- Set **Days Ahead** to 30 and sweep the starting error through its whole range. Every setting is over the line. **At thirty days out, no measurement you could ever make is good enough.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "A weather service can forecast usefully about **10 days** ahead. It is offered a new satellite network that would make every measurement **100 times** more precise, at enormous cost.\n\nA manager argues that 100 times better measurements should give roughly 100 times better forecasts, so they should be able to predict most of a **year** ahead.\n\nWhat will the new satellites actually buy?",
            options: [
                { id: 'seven', label: "About 7 more doublings -- roughly 10 extra days, taking it to about 20.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'year', label: "Close to a year, as the manager says -- 100 times the range.", nextNodeId: 'checkpoint_wrong' },
                { id: 'nothing', label: "Nothing at all, because chaos makes forecasting impossible.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "A factor of 100 is **7 doublings**, because 2 multiplied by itself seven times is 128. Seven doublings at a day and a half is **10.5 days**.\n\nSo the satellites take the forecast from about 10 days to about **20 days**. That is a real and valuable gain -- a fortnight's warning of a storm instead of a week's -- and it is nowhere near a year.\n\nThe manager's mistake is treating the range as **proportional** to the precision. It is not: the range goes up by a **fixed step** for each factor you win, because the error grows by multiplying. To reach a year, about 365 days, you would need 365/1.5 which is roughly **243 doublings** -- a factor of 2 multiplied 243 times. That number is larger than the number of atoms in your body. **It is not an engineering problem.**\n\nAnd the third answer gives up too early, which is the opposite mistake and just as costly. Chaos does not make forecasting impossible; it makes it **finite**. Ten days is genuinely useful, twenty is better, and knowing the limit is what stops a weather service spending a fortune chasing a year.",
            options: [
                { id: 'retry', label: "A fixed step per factor, not proportional.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and that number is worth buying.**\n\nTen extra days of warning is the difference between a week and a fortnight's notice of a storm, which is a real decision about evacuations and harvests. The lesson is not that the satellites are useless. It is that they buy **days, not years**, and anybody who promised years was doing the wrong arithmetic.\n\nThis is the shape of every chaotic system, and it is why the word exists:\n\n- the rules are **perfectly known** -- we assumed the physics was exact all the way through\n- nothing is **random** -- the same start always gives the same answer\n- and the prediction still **runs out**, because the one imperfection you cannot remove gets multiplied\n\n**Chaos is not the opposite of knowing the rules. It is what happens when you know the rules and cannot measure the start.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Days, not years!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You put a number on the word chaotic.**\n\n- **error = starting error x 2ⁿ** for n doublings, while the error is still small enough for doubling to describe it\n- In the real atmosphere a small error doubles in about **a day and a half**, so n doublings is 1.5n days\n- A forecast is finished once the error reaches about **1 °C**, because that is the size of the thing being predicted\n- **Ten doublings is a factor of 1024** -- call it a thousand. That one fact is the whole lesson\n- Starting error 0.001 °C: ten doublings, **15 days**. Which is the real practical limit of weather forecasting, reached from one measurement error\n- A **thousand times** better instrument buys **ten doublings**, which is **fifteen days**. Not fifteen thousand\n- 0.01 °C gives 7 doublings and **10.5 days**; 0.000001 °C gives 20 and **30 days**. Each factor of a thousand is worth the same fifteen days\n- To forecast a **year** ahead you would need about **243 doublings**, a factor of 2 multiplied 243 times. That is not an engineering problem\n- So **the range grows by a fixed step for each factor you win**, never in proportion. Treating it as proportional is how a weather service wastes a fortune\n- Doubling **looks like nothing until it looks like everything** -- the bar is invisible for a week and then crosses the line in two steps\n- And the three things that are all true at once: the rules are **exactly known**, nothing is **random**, and the prediction still **runs out**. **Chaos is what happens when you know the rules and cannot measure the start**\n- **Still standing:** two things. The doubling time was treated as a fixed day and a half, and really it depends on what the weather is doing -- a calm week doubles errors more slowly than a stormy one. And this blamed the **measurement** alone, when a real forecast is also limited by the model being slightly wrong about the physics, which this lesson assumed away. Most of all, nothing here says **why** the error doubles rather than merely grows. **L3P25 finds the doubling inside the rule itself.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2P25", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Physics Complete -- How Can Tiny Changes Cause Big Effects?**\n\nP25 named the effect. This measured it, and the measurement came with a price list.\n\n**Summary Table:**\n| | P25 said | L2P25 says |\n| --- | --- | --- |\n| How the error grows | it diverges rapidly | it **doubles**, about every 1.5 days |\n| The formula | -- | **error = starting error x 2ⁿ** |\n| When a forecast dies | -- | at about **1 °C**, the size of the weather |\n| From 0.001 °C | -- | 10 doublings, **15 days** |\n| What a 1000x better instrument buys | -- | **10 doublings = 15 days**, every time |\n| What it does not buy | -- | **1000 times the range** |\n| Forecasting a year ahead | -- | about **243 doublings**. Not possible |\n| Is anything random? | chaos is unpredictable | **no** -- the rules are exact and the start is not |\n\n**The one line to remember:** when a difference grows by multiplying rather than adding, a huge improvement in the measurement buys only a fixed number of extra steps -- so chaos does not make prediction impossible, it makes it finite, and the useful thing to know is where it ends.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
