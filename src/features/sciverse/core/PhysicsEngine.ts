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
    public render: Matter.Render | null = null;
    
    private entities: Map<string, { body: Matter.Body, label: string }> = new Map();
    private subscribers: ((snapshot: SimSnapshot) => void)[] = [];
    private animationFrameId: number | null = null;
    private isPaused: boolean = false;
    private timeElapsed: number = 0;

    constructor(canvas?: HTMLCanvasElement) {
        // 1. Initialize Matter.js Engine
        this.engine = Matter.Engine.create();
        
        // Default Gravity
        this.engine.gravity.x = 0;
        this.engine.gravity.y = 1; 
        this.engine.gravity.scale = 0.001; 

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
                    background: 'transparent', // Important for SVG overlay visibility
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

    public resize(width: number, height: number) {
        if (this.render) {
            this.render.canvas.width = width;
            this.render.canvas.height = height;
            // Also need to reset boundaries to match new size
            this.reset();
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

    public setGravity(x: number, y: number) {
        this.engine.gravity.x = x;
        this.engine.gravity.y = y;
    }

    public spawnObject(config: { 
        x: number, 
        y: number, 
        velocity?: Vector2D, 
        mass?: number,
        label?: string, 
        color?: string,
        isStatic?: boolean 
    }) {
        const { x, y, velocity = {x:0, y:0}, label = 'Object', color = '#4f46e5', isStatic = false } = config;
        
        const id = `${label}_${Date.now()}`;
        
        const body = Matter.Bodies.circle(
            toPixels(x), 
            toPixels(y), 
            20, 
            { 
                label: label,
                isStatic: isStatic,
                restitution: 0.8,
                friction: 0.00,
                frictionAir: 0.0,
                render: { fillStyle: color }
            }
        );

        if (!isStatic) {
            Matter.Body.setVelocity(body, { 
                x: toPixels(velocity.x) * (1/60), 
                y: toPixels(velocity.y) * (1/60) 
            });
        }

        Matter.Composite.add(this.engine.world, body);
        this.entities.set(id, { body, label });
    }

    // Deprecated alias for backward compatibility
    public spawnProjectile(x: number, y: number, velocity: Vector2D, label: string = 'Projectile') {
        this.spawnObject({ x, y, velocity, label });
    }

    private addBoundaries(width: number, height: number) {
        // Floor: Positioned to be visible at the bottom
        // Center Y = Height - 20 (so top edge is at Height - 40)
        const floorHeight = 40;
        const floorY = height - (floorHeight / 2);
        
        const ground = Matter.Bodies.rectangle(width / 2, floorY, width, floorHeight, { 
            isStatic: true, 
            label: 'Ground',
            render: { fillStyle: '#334155' } // slate-700, visible "Bench"
        });

        // Walls (Invisible, just to keep objects in)
        const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, { isStatic: true });
        const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, { isStatic: true });
        
        Matter.Composite.add(this.engine.world, [ground, leftWall, rightWall]);
    }
}