import { LabCanvas, outlineText, meterBar } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const CREATURES = ['🌳', '🐝', '🦋', '🐦', '🐿️', '🍄', '🌸', '🐸', '🦉', '🌿'];
const SERVICES = ['Clean Air', 'Clean Water', 'Food', 'Flood Control'];

/** More species variety = more resilient ecosystem = stronger free services. */
export const B33EcosystemServicesLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, t, v }: LabScene) => {
        const groundY = H - 150;

        ctx.fillStyle = '#86efac';
        ctx.fillRect(0, groundY, safeRight, H - groundY);

        // Show one creature per unit of variety.
        const count = Math.max(1, Math.round(v * CREATURES.length));
        ctx.font = '26px serif';
        ctx.textAlign = 'center';
        for (let i = 0; i < count; i++) {
            const x = 46 + (i % 5) * ((safeRight - 92) / 4);
            const row = Math.floor(i / 5);
            const bob = Math.sin(t * 1.4 + i) * 4;
            ctx.fillText(CREATURES[i], x, groundY - 18 - row * 46 + bob);
        }

        outlineText(ctx, `${count} different species living here`, safeRight / 2, 82, 'bold 13px monospace');

        // Services scale with variety, but with diminishing returns.
        const health = Math.pow(v, 0.7);
        const boxW = (safeRight - 60) / SERVICES.length;
        const boxH = 34;
        const y = 100;
        SERVICES.forEach((name, i) => {
            const x = 30 + i * boxW;
            const strong = health > 0.55;
            ctx.fillStyle = strong ? '#15803d' : health > 0.28 ? '#a16207' : '#b91c1c';
            ctx.fillRect(x + 6, y, boxW - 12, boxH);
            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 2;
            ctx.strokeRect(x + 6, y, boxW - 12, boxH);

            // Plain white fill, no halo: these sit on a solid dark chip, so an
            // outline only muddies the glyphs. Shrink to fit narrow columns.
            const avail = boxW - 20;
            let size = 14;
            ctx.textAlign = 'center';
            do {
                ctx.font = `bold ${size}px monospace`;
                if (ctx.measureText(name).width <= avail) break;
                size -= 1;
            } while (size > 9);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(name, x + boxW / 2, y + boxH / 2 + size / 2 - 1);
        });
        outlineText(ctx, 'Free services this ecosystem provides', safeRight / 2, y + boxH + 24, 'bold 13px monospace');

        meterBar(
            ctx, safeRight * 0.15, H - 92, safeRight * 0.7, health,
            'Ecosystem Resilience', 'Fragile', 'Strong'
        );

        const msg = v < 0.25
            ? 'Very few species -- one disease could collapse everything.'
            : v < 0.6
                ? 'Some variety. The ecosystem can absorb small shocks.'
                : 'High biodiversity! Plenty of backup if one species struggles.';
        outlineText(ctx, msg, safeRight / 2, H - 34, 'bold 12px monospace');
    };

    return (
        <LabCanvas
            title="Nature's Free Gifts"
            readout={({ raw }) => `Species variety: ${raw}%`}
            controlLabel="Species Variety"
            controlKey="speciesVariety"
            controlMin={5}
            controlInitial={50}
            accent="rose"
            sky={['#dbeafe', '#f0fdf4']}
            completeTitle="B33 Complete!"
            completeSubtitle="How Do Ecosystems Support Human Life?"
            completeNote="Biodiversity is nature's backup system!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
