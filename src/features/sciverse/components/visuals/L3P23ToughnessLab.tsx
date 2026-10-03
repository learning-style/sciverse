import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// One number, drawn against something you can judge it by. The critical crack is
// shown as a bar beside a human hair, because the whole point is whether the
// longest tolerable crack is big enough to find before it runs.
const HAIR_MM = 0.07;
const MATERIALS: [string, number][] = [
    ['window glass', 0.7], ['concrete', 0.4], ['aluminium', 25], ['structural steel', 50],
];
const INDIGO = '#4338ca';
const UNSEEN = '#7f1d1d';

const matOf = (dial: number): [string, number] =>
    MATERIALS[Math.max(0, Math.min(MATERIALS.length - 1, Math.round(dial)))];
const stressOf = (dial: number): number => Math.max(25, Math.min(500, Math.round(dial / 25) * 25));
const criticalMm = (kic: number, mpa: number): number =>
    ((kic / mpa) * (kic / mpa)) / Math.PI * 1000;

// 0.2 um to 1.3 m is seven powers of ten, so the gauge is stretched across them
// and nothing pegs, not even steel at a stress far below its working one.
const stretch = (mm: number): number =>
    Math.max(0, Math.min(1, (Math.log(Math.max(mm, 1e-4)) / Math.LN10 + 4) / 7.2));

export const L3P23ToughnessLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const [matName, kic] = matOf(raw);
        const mpa = stressOf(raw2);
        const crit = criticalMm(kic, mpa);
        const findable = crit > HAIR_MM * 4;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const CAP = 14;
        const TAIL = 34;
        const room = Math.max(36, usable - CAP - TAIL);
        const blockH = CAP + room + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const barTop = top + CAP;
        const barH = Math.max(10, Math.min(20, room * 0.26));

        const left = 20;
        const fullW = Math.max(100, safeRight - 40);
        // both bars on one stretched scale, so the comparison is honest
        const critW = Math.max(1.5, stretch(crit) * fullW);
        const hairW = Math.max(1.5, stretch(HAIR_MM) * fullW);
        const gap = Math.max(16, Math.min(34, room * 0.3));

        ctx.fillStyle = findable ? '#c7d2fe' : '#fecaca';
        ctx.fillRect(left, barTop, critW, barH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, barTop, critW, barH);

        const hairTop = barTop + barH + gap;
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(left, hairTop, hairW, barH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.4;
        ctx.strokeRect(left, hairTop, hairW, barH);

        // a crack creeping along the tolerable length, so the bar reads as a crack
        const creep = ((t * 0.4) % 1) * critW;
        ctx.strokeStyle = findable ? INDIGO : UNSEEN;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(left, barTop + barH / 2);
        ctx.lineTo(left + creep, barTop + barH / 2);
        ctx.stroke();

        outlineText(ctx, 'the longest crack it tolerates, against a human hair',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, crit > 1 ? crit.toFixed(1) + ' mm' : (crit * 1000).toFixed(0) + ' µm',
            Math.min(left + critW + 8, safeRight - 44), barTop + barH / 2 + 4,
            'bold 12px monospace', findable ? INDIGO : UNSEEN, 'left',
            Math.max(40, safeRight - left - critW - 12));
        outlineText(ctx, 'a hair, 70 µm',
            Math.min(left + hairW + 8, safeRight - 44), hairTop + barH / 2 + 4,
            'bold 11px monospace', '#334155', 'left',
            Math.max(40, safeRight - left - hairW - 12));
        outlineText(ctx, findable ? 'long enough to find before it runs'
            : 'shorter than a hair: you cannot find it',
            safeRight / 2, Math.min(hairTop + barH + 16, artBottom),
            'bold 12px monospace', findable ? INDIGO : UNSEEN, 'center', safeRight - 24);

        outlineText(ctx, '(' + kic.toFixed(1) + ' / ' + mpa + ')² / π = '
            + (crit > 1 ? crit.toFixed(1) + ' mm' : (crit * 1000).toFixed(0) + ' µm'),
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, matName + ' at ' + mpa + ' MPa',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace',
            findable ? INDIGO : UNSEEN, 'center', safeRight - 30);

        fitText(ctx, 'tolerates ' + (crit > 1 ? crit.toFixed(1) + ' mm' : (crit * 1000).toFixed(0) + ' µm'),
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Length, not sharpness', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: stretch(crit),
                caption: 'Crack It Tolerates (stretched)',
                low: 'thinner than a hair',
                high: 'visible, and inspectable',
                stops: ['#eef2ff', '#a5b4fc', INDIGO] as [string, string, string],
            },
            note: matName + ' has a toughness of ' + kic.toFixed(1) + ' MPa√m, so at '
                + mpa + ' MPa the longest crack it tolerates is '
                + (crit > 1 ? crit.toFixed(1) + ' mm' : (crit * 1000).toFixed(0) + ' µm')
                + ' -- ' + (findable ? 'big enough to find.' : 'too small to find.'),
        };
    };

    return (
        <LabCanvas
            title="Why a Scratch Does Not Break a Girder"
            readout={({ raw }) => 'A crack in ' + matOf(raw)[0]}
            controlLabel="Material"
            controlKey="crackMat"
            controlMin={0}
            controlMax={3}
            controlInitial={3}
            controlDisplay={raw => matOf(raw)[0] + ', ' + matOf(raw)[1].toFixed(1) + ' MPa√m'}
            control2={{
                label: 'Stress on the Material',
                key: 'crackStress',
                min: 25,
                max: 500,
                initial: 250,
                display: raw => stressOf(raw) + ' MPa',
            }}
            accent="indigo"
            sky={['#eef2ff', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="How Do Materials Break and Recover?"
            completeNote="Release grows with length; cost does not!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
