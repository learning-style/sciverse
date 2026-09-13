import { LabCanvas, fitText, outlineText } from './LabCanvas';
import type { LabScene } from './LabCanvas';

interface Props {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

const G = 9.8;
const ATMOSPHERIC_PA = 101000;
const SIDE_M = 0.1;
const FACE_M2 = SIDE_M * SIDE_M;
const VOLUME_M3 = FACE_M2 * SIDE_M;
const MAX_DEPTH_M = 50;

/** The fluids named in the lesson, stepped through by the second dial. */
const FLUIDS: [string, number][] = [['air', 1.2], ['oil', 920], ['fresh water', 1000], ['seawater', 1025], ['Dead Sea', 1240]];

const depthOf = (dial: number): number => Math.max(0, Math.min(MAX_DEPTH_M, Math.round(dial)));
const fluidOf = (dial: number): [string, number] => FLUIDS[Math.max(0, Math.min(FLUIDS.length - 1, Math.round(dial)))];
const densityText = (rho: number): string => (rho < 10 ? rho.toFixed(1) : rho.toLocaleString());
const newtonText = (force: number): string => (force < 1 ? force.toFixed(3) : force.toFixed(1));
/** Face forces need more decimals in air, where the two faces differ by only about 0.01 N. */
const faceText = (force: number, rho: number): string => force.toFixed(rho < 10 ? 3 : 1);

export const L3P6PressureLab = ({ state, onStateChange }: Props) => {
    const phase = (state.phase as string) || 'intro';

    const drawScene = ({ ctx, safeRight, raw, raw2, stageTop, stageBottom }: LabScene) => {
        const depth = depthOf(raw);
        const [fluidName, rho] = fluidOf(raw2);
        const pTop = ATMOSPHERIC_PA + rho * G * depth;
        const pBottom = ATMOSPHERIC_PA + rho * G * (depth + SIDE_M);
        const forceDown = pTop * FACE_M2;
        const forceUp = pBottom * FACE_M2;
        const buoyant = rho * G * VOLUME_M3;
        const room = stageBottom - 50 - stageTop;
        const sy = Math.max(0.75, Math.min(1, room / 136));

        // A depth gauge from 0 m to 50 m, with the cube's depth marked
        const gaugeX = 52;
        const gaugeTop = stageTop + 12;
        const gaugeBottom = stageTop + 128 * sy;
        const yOfDepth = (m: number): number => gaugeTop + (m / MAX_DEPTH_M) * (gaugeBottom - gaugeTop);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gaugeX, gaugeTop);
        ctx.lineTo(gaugeX, gaugeBottom);
        ctx.stroke();
        outlineText(ctx, '0 m', gaugeX - 6, gaugeTop + 4, '11px monospace', '#475569', 'right', 40);
        outlineText(ctx, '50 m', gaugeX - 6, gaugeBottom + 4, '11px monospace', '#475569', 'right', 40);
        ctx.fillStyle = '#4f46e5';
        const markY = yOfDepth(depth);
        ctx.beginPath();
        ctx.moveTo(gaugeX + 3, markY);
        ctx.lineTo(gaugeX + 13, markY - 6);
        ctx.lineTo(gaugeX + 13, markY + 6);
        ctx.closePath();
        ctx.fill();

        // The cube, with the push down on its top and the push up on its bottom
        const cubeX = safeRight * 0.34;
        const cubeY = stageTop + 70 * sy;
        const half = 20;
        ctx.fillStyle = rho > 10 ? '#dbeafe' : '#f1f5f9';
        ctx.fillRect(cubeX - 60, stageTop + 8, 120, gaugeBottom - stageTop - 8);
        ctx.fillStyle = '#a16207';
        ctx.fillRect(cubeX - half, cubeY - half, half * 2, half * 2);
        ctx.strokeStyle = '#422006';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cubeX - half, cubeY - half, half * 2, half * 2);
        const maxForce = (ATMOSPHERIC_PA + 1240 * G * (MAX_DEPTH_M + SIDE_M)) * FACE_M2;
        const arrowLen = (force: number): number => 12 + 30 * sy * (force / maxForce);
        const drawArrow = (x: number, fromY: number, toY: number, colour: string) => {
            const dir = toY > fromY ? 1 : -1;
            ctx.strokeStyle = colour;
            ctx.fillStyle = colour;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(x, fromY);
            ctx.lineTo(x, toY - dir * 8);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, toY);
            ctx.lineTo(x - 7, toY - dir * 10);
            ctx.lineTo(x + 7, toY - dir * 10);
            ctx.closePath();
            ctx.fill();
        };
        drawArrow(cubeX, cubeY - half - 2 - arrowLen(forceDown), cubeY - half - 2, '#334155');
        drawArrow(cubeX, cubeY + half + 2 + arrowLen(forceUp), cubeY + half + 2, '#4f46e5');

        // The numbers for each face, and the difference
        const px = safeRight * 0.56;
        const pw = safeRight - 20 - px;
        outlineText(ctx, `top: ${Math.round(pTop).toLocaleString()} Pa`, px, stageTop + 20, 'bold 12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `force down ${faceText(forceDown, rho)} N`, px, stageTop + 38, '12px monospace', '#334155', 'left', pw);
        outlineText(ctx, `bottom: ${Math.round(pBottom).toLocaleString()} Pa`, px, stageTop + 64, 'bold 12px monospace', '#3730a3', 'left', pw);
        outlineText(ctx, `force up ${faceText(forceUp, rho)} N`, px, stageTop + 82, '12px monospace', '#3730a3', 'left', pw);
        outlineText(ctx, `difference: ${newtonText(buoyant)} N up`, px, stageTop + 110 * sy, 'bold 13px monospace', '#0f172a', 'left', pw);

        outlineText(ctx, `buoyant force = ρ x g x V = ${densityText(rho)} x 9.8 x 0.001 = ${newtonText(buoyant)} N`,
            safeRight / 2, stageBottom - 34, 'bold 13px monospace', '#0f172a', 'center', safeRight - 30);
        outlineText(ctx, `in ${fluidName}: force up ${faceText(forceUp, rho)} N − force down ${faceText(forceDown, rho)} N`,
            safeRight / 2, stageBottom - 14, 'bold 12px monospace', '#475569', 'center', safeRight - 30);

        fitText(ctx, `Buoyant force ${newtonText(buoyant)} N at ${depth} m`, safeRight / 2, 94, safeRight - 24, 16);
        fitText(ctx, 'The difference between the bottom and the top', safeRight / 2, 118, safeRight - 24, 13);

        return {
            meter: {
                fraction: Math.max(0, Math.min(1, buoyant / 12.2)),
                caption: 'Buoyant Force',
                low: '0 N',
                high: '12 N',
                stops: ['#e0e7ff', '#818cf8', '#3730a3'] as [string, string, string],
            },
            note: `In ${fluidName}, the top of the 10 cm cube at ${depth} m feels ${faceText(forceDown, rho)} N down and its bottom ${faceText(forceUp, rho)} N up: a difference of ${newtonText(buoyant)} N.`,
        };
    };

    return (
        <LabCanvas
            title="Where the Buoyant Force Comes From"
            readout={({ raw }) => `Top of the cube ${depthOf(raw)} m down`}
            controlLabel="Depth"
            controlKey="cubeDepth"
            controlMin={0}
            controlMax={MAX_DEPTH_M}
            controlInitial={1}
            controlDisplay={raw => `${depthOf(raw)} m`}
            control2={{
                label: 'Fluid Density',
                key: 'fluidDensity',
                min: 0,
                max: FLUIDS.length - 1,
                initial: 2,
                display: raw => `${densityText(fluidOf(raw)[1])} kg/m³ (${fluidOf(raw)[0]})`,
            }}
            accent="indigo"
            sky={['#f8fafc', '#f8fafc']}
            completeTitle="Level 3 Complete!"
            completeSubtitle="Where the Buoyant Force Comes From"
            completeNote="A difference of pressures: ρ x g x V!"
            phase={phase}
            onStateChange={onStateChange}
            drawScene={drawScene}
        />
    );
};
