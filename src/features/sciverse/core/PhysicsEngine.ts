import Matter from 'matter-js';
import { PHYSICS_CONFIG, toMeters, toPixels } from '../config/physicsConfig';
import { PhysicsEntity, SimSnapshot, Vector2D } from '../types';

/**
 * PhysicsEngine
 * A wrapper class around Matter.js to handle the Simulation Loop and State Abstraction.
 * This runs outside the React Render Cycle.
 */
export class PhysicsEngine {
    public engine: Matter.Engine;
    public runner: Matter.Runner;
    public render: Matter.Render | null = null; // For debug rendering if needed
    
    private entities: Map<string, { body: Matter.Body, label: string }> = new Map();
    private subscribers: ((snapshot: SimSnapshot) => void)[] = [];
    private animationFrameId: number | null = null;
    private isPaused: boolean = false;
    private timeElapsed: number = 0;

    constructor(canvas?: HTMLCanvasElement) {
        // 1. Initialize Matter.js Engine
        this.engine = Matter.Engine.create();
        
        // Matter.js gravity is 1 unit by default (approx 1px/tick^2). 
        // We set scale to 0 to implement custom gravity force, OR we strictly map scale.
        // For simple Kinematics, let's use Matter's built-in gravity but scaled.
        // Matter.js defaults: y=1, scale=0.001.
        // We want 9.8 m/s^2.
        // 1m = 100px. 9.8m = 980px.
        // Per second. Ticks are 60hz.
        // acceleration = 980 px/s^2.
        // Matter applies gravity as a force F = m * g.
        this.engine.gravity.x = 0;
        this.engine.gravity.y = 1; // Direction only
        this.engine.gravity.scale = 0.001; // Default matter scale

        // 2. Initialize Runner (Fixed Time Step)
        this.runner = Matter.Runner.create({
            isFixed: true,
            delta: PHYSICS_CONFIG.TIME_STEP
        });

        // 3. Setup Render (Optional Debug)
        if (canvas) {
            this.render = Matter.Render.create({
                element: undefined,
                canvas: canvas,
                engine: this.engine,
                options: {
                    width: canvas.width,
                    height: canvas.height,
                    background: 'transparent',
                    wireframes: false, // Solid shapes
                    showAngleIndicator: false
                }
            });
            this.addBoundaries(canvas.width, canvas.height);
        }
    }

    public start() {
        if (this.render) {
            Matter.Render.run(this.render);
        }
        this.loop();
    }

    public stop() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        if (this.render) Matter.Render.stop(this.render);
        Matter.Runner.stop(this.runner);
        Matter.Engine.clear(this.engine);
        this.entities.clear();
        this.subscribers = [];
    }

    public pause() {
        this.isPaused = true;
    }

    public resume() {
        this.isPaused = false;
        this.loop();
    }

    public reset() {
        Matter.Composite.clear(this.engine.world, false);
        this.entities.clear();
        this.timeElapsed = 0;
        if (this.render) {
            this.addBoundaries(this.render.canvas.width, this.render.canvas.height);
        }
    }

    private loop = () => {
        if (this.isPaused) return;

        this.animationFrameId = requestAnimationFrame(this.loop);
        
        // Update Physics
        Matter.Runner.tick(this.runner, this.engine, performance.now());
        this.timeElapsed += PHYSICS_CONFIG.TIME_STEP / 1000;

        // Broadcast Snapshot
        this.broadcastState();
    };

    /**
     * SSAL: Broadcast State
     * Extracts the current physics state and sends it to subscribers (React Context).
     */
    private broadcastState() {
        if (this.subscribers.length === 0) return;

        const snapshot = this.getSnapshot();
        this.subscribers.forEach(cb => cb(snapshot));
    }

    public getSnapshot(): SimSnapshot {
        const entitySnapshots: PhysicsEntity[] = [];

        this.entities.forEach(({ body, label }, id) => {
            // Calculate approximate acceleration from force (F=ma -> a=F/m)
            // Note: Matter.js forces are cleared every step, so this captures instantaneous force applied this step
            // For gravity, Matter applies it internally, it might not show up in 'force' property unless we manually applied it.
            // Kinematics visualization often needs velocity primarily.
            
            entitySnapshots.push({
                id,
                label,
                mass: body.mass,
                position: { x: toMeters(body.position.x), y: toMeters(body.position.y) },
                velocity: { x: toMeters(body.velocity.x), y: toMeters(body.velocity.y) },
                acceleration: { x: body.force.x / body.mass, y: body.force.y / body.mass }, 
                force: { x: body.force.x, y: body.force.y }
            });
        });

        return {
            timestamp: Date.now(),
            entities: entitySnapshots,
            system: {
                isPaused: this.isPaused,
                timeElapsed: this.timeElapsed,
                gravity: { x: this.engine.gravity.x * this.engine.gravity.scale, y: this.engine.gravity.y * this.engine.gravity.scale }
            }
        };
    }

    public subscribe(callback: (snapshot: SimSnapshot) => void) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(cb => cb !== callback);
        };
    }

    // --- Interaction Methods ---

    public spawnProjectile(x: number, y: number, velocity: Vector2D) {
        // Clear old projectiles
        const entitiesToRemove: string[] = [];
        this.entities.forEach((val, key) => {
            if (val.label === 'Projectile') entitiesToRemove.push(key);
        });
        entitiesToRemove.forEach(key => {
            const ent = this.entities.get(key);
            if (ent) Matter.Composite.remove(this.engine.world, ent.body);
            this.entities.delete(key);
        });

        const id = `proj_${Date.now()}`;
        const body = Matter.Bodies.circle(
            toPixels(x), 
            toPixels(y), 
            20, // 20px radius
            { 
                label: 'Projectile',
                restitution: 0.8, // Bouncy
                friction: 0.001,
                frictionAir: 0.0, // Reduced for projectile motion logic
                render: { fillStyle: '#4f46e5' } // Indigo-600
            }
        );

        // Set Initial Velocity (m/s -> px/tick)
        // Velocity in Matter is per-step. 
        // 10 m/s = 1000 px/s. 
        // 60 ticks/s. -> 16.6 px/tick.
        // But Matter.Body.setVelocity takes instantaneous velocity.
        // Wait, Matter velocity is pixels per step? No, documentation says "velocity".
        // It is roughly pixels/step.
        const pxPerSecX = toPixels(velocity.x);
        const pxPerSecY = toPixels(velocity.y);
        
        // Adjust for timestep
        // v_matter = v_px_s * (1/60)?
        // Actually, let's keep it simple. If we set velocity 10, it moves 10px next frame.
        // So Velocity 10 = 600px/s.
        // We want V_m_s. 
        // V_px_s = V_m_s * 100.
        // V_matter = V_px_s / 60 (approx, depending on runner delta).
        // Let's implement a utility for this later, for now we assume input is "Engine Units".
        // Correction: We will treat input velocity as m/s and convert.
        
        const velocityScale = 1 / 60 * 1.5; // Tuning factor for "feel"
        
        Matter.Body.setVelocity(body, { 
            x: toPixels(velocity.x) * (1/60), // Convert m/s to px/tick 
            y: toPixels(velocity.y) * (1/60) 
        });

        Matter.Composite.add(this.engine.world, body);
        this.entities.set(id, { body, label: 'Projectile' });
    }

    private addBoundaries(width: number, height: number) {
        const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true, render: { fillStyle: '#1e293b' } });
        const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true });
        
        Matter.Composite.add(this.engine.world, [ground, leftWall, rightWall]);
    }
}