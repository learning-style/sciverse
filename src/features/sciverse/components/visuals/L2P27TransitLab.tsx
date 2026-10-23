import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One idea: the squeezes are fast and the food is slow, and the gap between them is
// the whole lesson. So the tube carries BOTH -- a row of squeeze marks sweeping along
// at the wave's rate and one bolus creeping at the food's rate -- and the on-screen
// ratio of the two is the real ratio at every dial setting, never fudged. At the
// oesophagus setting they move together and nothing overtakes the food; in the small
// intestine seventy-five squeezes pass it for every length it travels, which is what
// "mixing rather than carrying" looks like.
const WAVE = 3;                // cm/s: how fast one squeeze travels, much the same everywhere
const WAVE_MARKS = 6;
const TUBE = '#be123c';
const FOOD = '#b45309';
const WAVEC = '#0369a1';

// the speeds a gut really shows, from the large intestine up to a swallow
const SPEEDS = [0.01, 0.02, 0.03, 0.04, 0.06, 0.08, 0.1, 0.17, 0.25, 0.5, 0.75, 1, 1.5, 2, 3];
const speedOf = (dial: number): number =>
    SPEEDS[Math.max(0, Math.min(SPEEDS.length - 1, Math.round(dial)))];
const lengthOf = (dial: number): number => Math.max(25, Math.min(600, Math.round(dial / 25) * 25));

const friendly = (seconds: number): string => {
    if (seconds < 90) return seconds.toFixed(1) + ' seconds';
    if (seconds < 5400) return (seconds / 60).toFixed(0) + ' minutes';
    return (seconds / 3600).toFixed(1) + ' hours';
};

export const L2P27TransitLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const speed = speedOf(raw);
        const length = lengthOf(raw2);
        const seconds = length / speed;
        const ratio = WAVE / speed;
        const carrying = ratio < 1.5;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const ROW = 16;
        const fit = Math.max(0, Math.min(2, Math.floor((usable - 18) / ROW)));
        const showWave = fit >= 1;
        const showFood = fit >= 2;
        const rows = (showWave ? ROW : 0) + (showFood ? ROW : 0);
        const tubeH = Math.max(12, Math.min(usable - rows, 54));
        const blockH = tubeH + rows;
        const top = artTop + Math.max(0, (usable - blockH) / 2);

        const left = 26;
        const fullW = Math.max(80, safeRight - 52);
        const waveRow = showWave ? top + 12 : 0;
        const tubeTop = top + (showWave ? ROW : 0);
        const tubeBottom = tubeTop + tubeH;
        const foodRow = showFood ? tubeBottom + 13 : 0;
        const cyTube = (tubeTop + tubeBottom) / 2;

        // the tube
        ctx.fillStyle = '#ffe4e6';
        ctx.fillRect(left, tubeTop, fullW, tubeH);
        ctx.strokeStyle = TUBE;
        ctx.lineWidth = 2;
        ctx.strokeRect(left, tubeTop, fullW, tubeH);

        // the squeezes, sweeping along at the wave's rate
        const wavePass = 0.32;                      // of the tube per second on screen
        ctx.strokeStyle = WAVEC;
        ctx.lineWidth = 2;
        for (let i = 0; i < WAVE_MARKS; i++) {
            const f = ((i / WAVE_MARKS) + t * wavePass) % 1;
            const x = left + fullW * f;
            const pinch = tubeH * 0.26;
            ctx.beginPath();
            ctx.moveTo(x, tubeTop + 1);
            ctx.lineTo(x, tubeTop + pinch);
            ctx.moveTo(x, tubeBottom - pinch);
            ctx.lineTo(x, tubeBottom - 1);
            ctx.stroke();
        }

        // the food, creeping at its own rate -- the ratio on screen is the real ratio
        const foodPass = wavePass * (speed / WAVE);
        const fx = left + fullW * ((t * foodPass) % 1);
        const foodR = Math.max(4, Math.min(tubeH * 0.3, 13));
        ctx.fillStyle = FOOD;
        ctx.beginPath();
        ctx.ellipse(fx, cyTube, foodR * 1.25, foodR, 0, 0, Math.PI * 2);
        ctx.fill();

        if (showWave) {
            outlineText(ctx, 'squeezes ' + WAVE + ' cm/s', left, waveRow,
                'bold 11px monospace', WAVEC, 'left', fullW);
        }
        if (showFood) {
            outlineText(ctx, 'food ' + speed + ' cm/s, ' + length + ' cm to go', left, foodRow,
                'bold 11px monospace', FOOD, 'left', fullW);
        }

        outlineText(ctx, length + ' / ' + speed + ' = ' + seconds.toFixed(0) + ' s',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, carrying ? 'the squeezes carry it'
            : ratio.toFixed(0) + ' squeezes per length',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            carrying ? WAVEC : FOOD, 'center', safeRight - 30);

        fitText(ctx, friendly(seconds), safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Two speeds, one tube', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, Math.log10(ratio) / Math.log10(300))),
                caption: 'Squeezes Per Length',
                low: 'carrying the food',
                high: 'mixing it instead',
                stops: ['#e0f2fe', '#fcd34d', FOOD] as [string, string, string],
            },
            note: carrying
                ? 'At ' + speed + ' cm/s the food keeps up with the squeezes, so every one of them carries it along and '
                  + length + ' cm takes ' + friendly(seconds) + '.'
                : 'The squeezes travel at ' + WAVE + ' cm/s and the food at ' + speed
                  + ', so about ' + ratio.toFixed(0)
                  + ' of them pass it for every length it moves: they are mixing it rather than carrying it.',
        };
    };

    return (
        <LabCanvas
            title="How Long Does Food Take?"
            readout={({ raw }) => 'Food advances ' + speedOf(raw) + ' cm/s'}
            controlLabel="How Fast the Food Advances"
            controlKey="foodSpeed"
            controlMin={0}
            controlMax={SPEEDS.length - 1}
            controlInitial={3}
            controlDisplay={raw => speedOf(raw) + ' cm/s'}
            control2={{
                label: 'Length',
                key: 'gutLength',
                min: 25,
                max: 600,
                initial: 600,
                display: raw => lengthOf(raw) + ' cm',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Does Food Become Usable Energy?"
            completeNote="The four hours is for something!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
