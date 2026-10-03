import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// A supply being spent, not a seal. The zinc layer is drawn at its real thickness
// relative to the steel beneath, and the one number is how many years it lasts.
// 200 um at 0.5 um/yr is 400 years, so the gauge spans 400 and nothing pegs.
const MAX_YEARS = 400;
const ENVS: [string, number][] = [
    ['dry rural air', 0.5], ['town air', 2], ['heavy industry', 4], ['marine splash', 8],
];
const EMERALD = '#047857';
const SHORT = '#7f1d1d';

const thickOf = (dial: number): number => Math.max(20, Math.min(200, Math.round(dial / 5) * 5));
const envOf = (dial: number): [string, number] =>
    ENVS[Math.max(0, Math.min(ENVS.length - 1, Math.round(dial)))];

export const L2C23ZincLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const thick = thickOf(raw);
        const [envName, rate] = envOf(raw2);
        const years = thick / rate;
        const brief = years < 15;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const CAP = 14;
        const TAIL = 34;
        const barH = Math.max(40, Math.min(110, usable - CAP - TAIL));
        const blockH = CAP + barH + TAIL;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const barTop = top + CAP;

        const left = 24;
        const barW = Math.max(100, safeRight - 48);
        // the zinc is a thin skin on thick steel: 200 um of the bar's height at most
        const zincH = Math.max(3, (thick / 200) * (barH * 0.3));
        const steelTop = barTop + zincH;

        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(left, steelTop, barW, barTop + barH - steelTop);
        ctx.fillStyle = '#6ee7b7';
        ctx.fillRect(left, barTop, barW, zincH);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, barTop, barW, barH);
        ctx.strokeStyle = EMERALD;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(left, steelTop); ctx.lineTo(left + barW, steelTop);
        ctx.stroke();

        // the zinc being eaten away, faster in a harsher place
        const drops = Math.max(3, Math.min(10, Math.round(rate) + 3));
        for (let i = 0; i < drops; i++) {
            const x = left + ((t * (8 + rate * 4) + i * 37) % barW);
            ctx.fillStyle = brief ? SHORT : EMERALD;
            ctx.beginPath();
            ctx.arc(x, barTop - 5 - Math.sin(t * 2 + i) * 2, 2.4, 0, Math.PI * 2);
            ctx.fill();
        }

        outlineText(ctx, 'the zinc is a supply being spent, not a seal',
            safeRight / 2, Math.max(top + 10, artTop + 10),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, 'zinc ' + thick + ' µm',
            safeRight / 2, Math.max(Math.min(steelTop + 12, artBottom - 30), barTop + 11),
            'bold 11px monospace', '#065f46', 'center', safeRight - 24);
        outlineText(ctx, 'steel below, not rusting while the zinc lasts',
            safeRight / 2, Math.min(barTop + barH - 8, artBottom - 16),
            'bold 11px monospace', '#334155', 'center', safeRight - 24);
        outlineText(ctx, envName + ': ' + rate.toFixed(1) + ' µm lost each year',
            safeRight / 2, Math.min(barTop + barH + 16, artBottom),
            'bold 12px monospace', brief ? SHORT : EMERALD, 'center', safeRight - 24);

        outlineText(ctx, thick + ' µm / ' + rate.toFixed(1) + ' µm per year = '
            + years.toFixed(1) + ' years',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'zinc is above iron, so the zinc goes first',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', EMERALD, 'center', safeRight - 30);

        fitText(ctx, 'protected for ' + years.toFixed(1) + ' years',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'A supply, not a seal', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, years / MAX_YEARS)),
                caption: 'Years the Zinc Protects',
                low: 'gone almost at once',
                high: 'four centuries',
                stops: ['#ecfdf5', '#6ee7b7', EMERALD] as [string, string, string],
            },
            note: thick + ' µm of zinc in ' + envName + ', where it is lost at '
                + rate.toFixed(1) + ' µm a year, protects the steel for '
                + years.toFixed(1) + ' years. The life belongs to the place, not the product.',
        };
    };

    return (
        <LabCanvas
            title="How Long Will the Zinc Last?"
            readout={({ raw }) => 'A coating of ' + thickOf(raw) + ' micrometres'}
            controlLabel="Coating Thickness"
            controlKey="zincThick"
            controlMin={20}
            controlMax={200}
            controlInitial={85}
            controlDisplay={raw => thickOf(raw) + ' µm'}
            control2={{
                label: 'Where It Lives',
                key: 'zincEnv',
                min: 0,
                max: 3,
                initial: 3,
                display: raw => envOf(raw)[0] + ', ' + envOf(raw)[1].toFixed(1) + ' µm/yr',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Materials Break and Recover?"
            completeNote="Thickness over rate!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
