import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Carbon atoms from sliding sheets to a rigid 3D network: same atoms, very different hardness. */
export const C44ArrangementLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, t, v, stageTop, stageBottom }: LabScene) => {
        const hardness = v;
        const cols = 8, rows = 4;
        const gridW = safeRight - 150;
        const gridX = 75;
        const gridTop = stageTop + 46;
        const gridH = Math.min(190, stageBottom - gridTop - 74);
        const dx = gridW / (cols - 1);
        const dy = gridH / (rows - 1);
        // Sheets slide sideways when the joins between them are weak.
        const slide = (1 - v) * 26;

        // Vertical joins appear as the network forms.
        ctx.strokeStyle = `rgba(4,120,87,${0.15 + v * 0.85})`;
        ctx.lineWidth = 2 + v * 3;
        for (let r = 0; r < rows - 1; r++) {
            for (let c = 0; c < cols; c++) {
                const off1 = Math.sin(t * 0.8 + r) * slide;
                const off2 = Math.sin(t * 0.8 + r + 1) * slide;
                ctx.beginPath();
                ctx.moveTo(gridX + c * dx + off1, gridTop + r * dy);
                ctx.lineTo(gridX + c * dx + off2, gridTop + (r + 1) * dy);
                ctx.stroke();
            }
        }
        // Sheets themselves are always strongly joined.
        ctx.strokeStyle = '#047857';
        ctx.lineWidth = 4;
        for (let r = 0; r < rows; r++) {
            const off = Math.sin(t * 0.8 + r) * slide;
            ctx.beginPath();
            ctx.moveTo(gridX + off, gridTop + r * dy);
            ctx.lineTo(gridX + gridW + off, gridTop + r * dy);
            ctx.stroke();
        }
        for (let r = 0; r < rows; r++) {
            const off = Math.sin(t * 0.8 + r) * slide;
            for (let c = 0; c < cols; c++) {
                ctx.fillStyle = '#334155';
                ctx.beginPath();
                ctx.arc(gridX + c * dx + off, gridTop + r * dy, 9, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
        outlineText(ctx, 'every dot is a carbon atom', safeRight / 2, gridTop + gridH + 34, 'bold 14px monospace');

        outlineText(ctx, v < 0.33
            ? 'Flat sheets, weakly joined -- they slide apart. This is pencil lead.'
            : v < 0.7
                ? 'Some joins between the sheets now. Sliding is getting harder.'
                : 'A full 3D network -- nothing can slide. This is diamond.',
            safeRight / 2, 96, 'bold 15px monospace');
        outlineText(ctx, 'The atoms are identical the whole way -- only the joins change',
            safeRight / 2, 118, 'bold 13px monospace');

        const msg = v < 0.33
            ? 'Soft and slippery. Whole sheets slide off onto the paper.'
            : v < 0.7
                ? 'Partly joined -- harder than pencil lead, softer than diamond.'
                : 'Nothing can slide anywhere, so the material is extremely hard.';
        return { meter: { fraction: hardness, caption: 'Hardness of the Material', low: 'Soft as pencil lead', high: 'Hard as diamond' }, note: msg };
    };

    return (
        <LabCanvas
            title="Same Atoms, Different Material"
            readout={({ v }) => v < 0.33 ? 'Arrangement: flat sheets (pencil lead)' : v < 0.7 ? 'Arrangement: partly joined' : 'Arrangement: 3D network (diamond)'}
            controlLabel="Atom Arrangement"
            controlKey="atomArrangement"
            controlInitial={10}
            controlDisplay={(_raw, v) => v < 0.33 ? 'sheets' : v < 0.7 ? 'part network' : 'network'}
            accent="emerald"
            sky={['#f5f3ff', '#f8fafc']}
            completeTitle="C44 Complete!"
            completeSubtitle="How Do Everyday Materials Get Their Properties?"
            completeNote="Same atoms, different joins, different material!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
