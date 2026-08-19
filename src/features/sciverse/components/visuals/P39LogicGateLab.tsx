import { LabCanvas, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/** Side-by-side AND and OR gates driven by the same two input switches. */
export const P39LogicGateLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, H, safeRight, raw }: LabScene) => {
        // Slider 0..3 selects the input pair: 00, 01, 10, 11.
        const combo = raw;
        const a = (combo & 2) !== 0;
        const b = (combo & 1) !== 0;
        const andOut = a && b;
        const orOut = a || b;

        // Input switches.
        const drawSwitch = (label: string, on: boolean, y: number) => {
            ctx.fillStyle = on ? '#22c55e' : '#94a3b8';
            ctx.beginPath();
            ctx.roundRect(40, y - 16, 62, 32, 8);
            ctx.fill();
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.stroke();
            outlineText(ctx, on ? 'ON' : 'OFF', 71, y + 5, 'bold 12px monospace', '#ffffff');
            outlineText(ctx, label, 20, y + 5, 'bold 14px monospace');
        };

        const aY = H * 0.34;
        const bY = H * 0.5;
        drawSwitch('A', a, aY);
        drawSwitch('B', b, bY);

        // Gate boxes with their output bulbs.
        const drawGate = (name: string, out: boolean, x: number, desc: string) => {
            const gy = H * 0.42;
            ctx.fillStyle = '#e2e8f0';
            ctx.beginPath();
            ctx.roundRect(x, gy - 40, 110, 80, 10);
            ctx.fill();
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 3;
            ctx.stroke();
            outlineText(ctx, name, x + 55, gy - 6, 'bold 18px monospace');
            outlineText(ctx, desc, x + 55, gy + 18, 'bold 10px monospace');

            // Wires in from the switches.
            ctx.strokeStyle = a ? '#22c55e' : '#cbd5e1';
            ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(102, aY); ctx.lineTo(x, gy - 18); ctx.stroke();
            ctx.strokeStyle = b ? '#22c55e' : '#cbd5e1';
            ctx.beginPath(); ctx.moveTo(102, bY); ctx.lineTo(x, gy + 18); ctx.stroke();

            // Output bulb.
            ctx.strokeStyle = out ? '#22c55e' : '#cbd5e1';
            ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(x + 110, gy); ctx.lineTo(x + 146, gy); ctx.stroke();
            ctx.fillStyle = out ? '#fbbf24' : '#e5e7eb';
            ctx.beginPath();
            ctx.arc(x + 164, gy, 18, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2;
            ctx.stroke();
            outlineText(ctx, out ? 'ON' : 'OFF', x + 164, gy + 40, 'bold 12px monospace',
                out ? '#15803d' : '#64748b');
        };

        drawGate('AND', andOut, safeRight * 0.28, 'both must be on');
        drawGate('OR', orOut, safeRight * 0.62, 'either one works');

        outlineText(ctx, `Inputs: A=${a ? 1 : 0}  B=${b ? 1 : 0}`, safeRight / 2, 84, 'bold 14px monospace');
        outlineText(ctx, `AND says ${andOut ? '1' : '0'}   |   OR says ${orOut ? '1' : '0'}`,
            safeRight / 2, 106, 'bold 13px monospace',
            andOut === orOut ? '#15803d' : '#b91c1c');

        const msg = andOut === orOut
            ? 'Here AND and OR agree -- both inputs are the same.'
            : 'AND and OR DISAGREE here! This is why picking the right gate matters.';
        return { note: msg };
    };

    return (
        <LabCanvas
            title="On, Off, Answer"
            readout={({ raw }) => `Switch pattern ${(raw & 2) !== 0 ? 1 : 0}${(raw & 1) !== 0 ? 1 : 0} of 4`}
            controlLabel="Input Switches"
            controlKey="inputSwitches"
            controlMin={0}
            controlMax={3}
            controlInitial={0}
            controlDisplay={raw => `${(raw & 2) !== 0 ? 1 : 0}${(raw & 1) !== 0 ? 1 : 0}`}
            accent="indigo"
            sky={['#e0e7ff', '#f8fafc']}
            completeTitle="P39 Complete!"
            completeSubtitle="How Do Computers Use Logic to Solve Problems?"
            completeNote="AND, OR, and NOT build every computer decision!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
