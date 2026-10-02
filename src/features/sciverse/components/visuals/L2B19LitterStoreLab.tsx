import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const MAX_STORE = 45;      // t/ha at the top of the meter
const THIN = '#be123c';
const DEEP = '#7f1d1d';

const fallOf = (dial: number): number => Math.max(1, Math.min(8, Math.round(dial) / 2));
const rotOf = (dial: number): number => Math.max(5, Math.min(90, Math.round(dial / 5) * 5));

export const L2B19LitterStoreLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const fall = fallOf(raw);
        const rot = rotOf(raw2);
        const store = fall / (rot / 100);
        const leaves = rot * store / 100;          // tonnes rotting each year, equals the fall
        const deep = store >= 20;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const boxH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + boxH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const baseY = top + capBand + boxH;

        const boxW = Math.max(140, Math.min(safeRight - 90, safeRight * 0.66));
        const cx = safeRight / 2;
        const left = cx - boxW / 2;

        // The store drawn as a layer whose depth is the settled amount.
        const layerH = Math.max(4, Math.min(boxH * 0.8, (store / MAX_STORE) * boxH * 0.8));
        ctx.fillStyle = deep ? '#7c2d12' : '#a16207';
        ctx.fillRect(left, baseY - layerH, boxW, layerH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, baseY - layerH, boxW, layerH);

        // leaves falling in, at a rate set by the leaf fall dial
        const drops = Math.max(2, Math.min(10, Math.round(fall * 1.5)));
        ctx.fillStyle = '#ca8a04';
        for (let i = 0; i < drops; i++) {
            const dx = left + 10 + ((i * 41) % Math.max(14, boxW - 20));
            const span = Math.max(12, baseY - layerH - (top + capBand));
            const dy = top + capBand + ((t * 28 + i * 19) % span);
            ctx.beginPath();
            ctx.ellipse(dx, dy, 4, 2.4, (i * 0.7) % Math.PI, 0, Math.PI * 2);
            ctx.fill();
        }

        outlineText(ctx, 'leaves landing each year, and the layer they build',
            cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'leaf fall ' + fall.toFixed(1) + ' t/ha each year',
            cx, Math.max(baseY - layerH - 12, artTop + 26),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'the store settles at ' + store.toFixed(1) + ' t/ha',
            cx, Math.min(baseY + 14, artBottom - 12),
            'bold 12px monospace', deep ? DEEP : THIN, 'center', safeRight - 30);
        outlineText(ctx, rot + '% rots each year, which is ' + leaves.toFixed(1) + ' t/ha leaving',
            cx, Math.min(baseY + labelTail + 12, artBottom),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);

        outlineText(ctx, 'leaf fall ' + fall.toFixed(1) + ' t/ha divided by ' + rot
            + '% rotting = store ' + store.toFixed(1) + ' t/ha',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, deep
            ? 'slow rotting builds a deep store, which is how peat happens'
            : 'fast rotting keeps the layer thin, however much lands',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', deep ? DEEP : THIN,
            'center', safeRight - 30);

        fitText(ctx, 'the store settles at ' + store.toFixed(1) + ' t/ha',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Being slow at rotting is what builds a store',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, store / MAX_STORE)),
                caption: 'Dead Material Held in the Soil',
                low: 'nothing held',
                high: 'peat building up',
                stops: ['#fff1f2', '#fdba74', DEEP] as [string, string, string],
            },
            note: 'With ' + fall.toFixed(1) + ' t/ha of dead material landing each year and '
                + rot + '% of the store rotting away annually, the layer settles at '
                + store.toFixed(1) + ' t/ha.',
        };
    };

    return (
        <LabCanvas
            title="How Much Dead Leaf Piles Up?"
            readout={({ raw }) => fallOf(raw).toFixed(1) + ' t/ha landing each year'}
            controlLabel="Leaf Fall"
            controlKey="leafFall"
            controlMin={2}
            controlMax={16}
            controlInitial={8}
            controlDisplay={raw => fallOf(raw).toFixed(1) + ' t/ha/yr'}
            control2={{
                label: 'Share That Rots Each Year',
                key: 'rotShare',
                min: 5,
                max: 90,
                initial: 40,
                display: raw => rotOf(raw) + '%',
            }}
            accent="rose"
            sky={['#fff1f2', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Does Soil Support Life?"
            completeNote="Being bad at rotting is how you build a bog!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
