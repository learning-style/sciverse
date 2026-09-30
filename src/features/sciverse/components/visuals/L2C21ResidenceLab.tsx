import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

// The dials reach 40,000 GtC over 30 GtC a year, which is 1,333 years, so the meter
// has to span that or it pegs. A linear scale would then squash the realistic cases
// -- the atmosphere's 4 years would read as zero -- so the bar uses a square-root
// stretch and the caption says so.
const MAX_YEARS = 1350;
const QUICK = '#047857';
const SLOW = '#065f46';

const reservoirOf = (dial: number): number => Math.max(500, Math.min(40000, Math.round(dial / 500) * 500));
const fluxOf = (dial: number): number => Math.max(30, Math.min(250, Math.round(dial / 10) * 10));

export const L2C21ResidenceLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const reservoir = reservoirOf(raw);
        const flux = fluxOf(raw2);
        const years = reservoir / flux;
        const slow = years >= 100;

        const artTop = stageTop + 18;
        const artBottom = stageBottom - 52;
        const usable = artBottom - artTop;
        const capBand = Math.max(14, Math.min(22, usable * 0.13));
        const labelTail = Math.max(18, Math.min(28, usable * 0.16));
        const boxH = Math.max(44, Math.min(140, usable - capBand - labelTail));
        const blockH = capBand + boxH + labelTail;
        const top = artTop + Math.max(0, (usable - blockH) / 2);
        const boxTop = top + capBand;
        const boxBottom = boxTop + boxH;

        // the reservoir as a tank whose fill shows its size, with carbon leaving
        const tankW = Math.max(60, Math.min(safeRight * 0.3, 140));
        const cx = safeRight / 2;
        const left = cx - tankW / 2;
        const fill = Math.max(6, Math.min(boxH - 6, (reservoir / 40000) * (boxH - 6)));

        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, boxTop, tankW, boxH);
        ctx.fillStyle = slow ? '#a7f3d0' : '#d1fae5';
        ctx.fillRect(left, boxBottom - fill, tankW, fill);
        ctx.strokeRect(left, boxBottom - fill, tankW, fill);

        // carbon leaving, at a rate set by the flux dial
        const dots = Math.max(1, Math.min(8, Math.round(flux / 30)));
        ctx.fillStyle = QUICK;
        for (let i = 0; i < dots; i++) {
            const span = Math.max(14, safeRight / 2 - left - 10);
            const dx = left + tankW + ((t * (18 + flux / 8) + i * 23) % span);
            const dy = boxBottom - fill / 2 + Math.sin(t * 2 + i) * 6;
            ctx.beginPath();
            ctx.arc(dx, dy, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        outlineText(ctx, 'a store of carbon, and the carbon leaving it',
            cx, Math.max(top + 11, artTop + 11),
            'bold 11px monospace', '#334155', 'center', safeRight - 36);
        outlineText(ctx, 'holds ' + reservoir.toLocaleString() + ' GtC',
            cx, Math.max(boxBottom - fill - 10, artTop + 26),
            'bold 11px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'losing ' + flux + ' GtC a year',
            cx, Math.min(boxBottom + 14, artBottom - 12),
            'bold 12px monospace', QUICK, 'center', safeRight - 30);
        outlineText(ctx, slow ? 'a vault: an atom settles here for centuries'
            : 'a thoroughfare: an atom passes through in years',
            cx, Math.min(boxBottom + labelTail + 12, artBottom),
            'bold 11px monospace', slow ? SLOW : QUICK, 'center', safeRight - 30);

        outlineText(ctx, 'reservoir ' + reservoir.toLocaleString() + ' GtC / flux out '
            + flux + ' GtC a year = ' + years.toFixed(1) + ' years',
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, 'check: GtC divided by GtC a year leaves years',
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#334155', 'center', safeRight - 30);

        fitText(ctx, 'residence time ' + years.toFixed(1) + ' years',
            safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'Stirring is not the same as draining',
            safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, Math.sqrt(years / MAX_YEARS))),
                caption: 'How Long an Atom Stays (stretched scale)',
                low: '0 years',
                high: MAX_YEARS.toLocaleString() + ' years',
                stops: ['#ecfdf5', '#6ee7b7', SLOW] as [string, string, string],
            },
            note: 'A store holding ' + reservoir.toLocaleString()
                + ' GtC and losing ' + flux + ' GtC a year turns over in '
                + reservoir.toLocaleString() + ' / ' + flux + ' = ' + years.toFixed(1)
                + ' years, which is the average time a carbon atom spends in it. '
                + (slow
                    ? 'Centuries: this is a vault, like the deep ocean at 37,000 GtC and 90 GtC a year.'
                    : 'Years: this is a thoroughfare, like the atmosphere at 875 GtC and 210 GtC a year.')
                + ' The units do the checking -- GtC divided by GtC a year leaves years. But be '
                + 'careful what the answer means: it says how fast the store is stirred, not how '
                + 'fast an addition to it fades. The air loses 210 GtC a year and gains about 210, '
                + 'so an added molecule is swapped rather than removed, and an excess drains only '
                + 'as fast as the small imbalance between the two flows.',
        };
    };

    return (
        <LabCanvas
            title="How Long Does a Carbon Atom Stay?"
            readout={({ raw }) => 'A store of ' + reservoirOf(raw).toLocaleString() + ' GtC'}
            controlLabel="Reservoir Size"
            controlKey="carbonReservoir"
            controlMin={500}
            controlMax={40000}
            controlInitial={1000}
            controlDisplay={raw => reservoirOf(raw).toLocaleString() + ' GtC'}
            control2={{
                label: 'Flux Out',
                key: 'carbonFlux',
                min: 30,
                max: 250,
                initial: 210,
                display: raw => fluxOf(raw) + ' GtC a year',
            }}
            accent="emerald"
            sky={['#ecfdf5', '#f8fafc']}
            completeTitle="Level 2 Complete!"
            completeSubtitle="How Do Cycles Keep Systems Alive?"
            completeNote="Stirring is not the same as draining!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
