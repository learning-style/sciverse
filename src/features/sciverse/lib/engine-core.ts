import Matter from 'matter-js';
import { Vector2D } from '../types';

/**
 * EngineCore
 * Encapsulates the Matter.js boilerplate and provides a clean API for the React application.
 * Implements the SimState Abstraction Layer (SSAL) pattern.
 */
export class EngineCore {
    public engine: Matter.Engine;
    public runner: Matter.Runner;
    public render: Matter.Render | null = null;
    
    // SSAL Data Store
    private _simStateCallback: ((data: any) => void) | null = null;

    constructor() {
        this.engine = Matter.Engine.create();
        this.runner = Matter.Runner.create();
        
        // Disable default gravity initially or configure as needed
        this.engine.gravity.y = 9.8 * 0.1; // Scale down for canvas pixels logic (optional tweak)
        this.engine.gravity.scale = 0.001;
    }

    /**
     * Initializes the Matter.Render instance attached to a DOM element.
     */
    public mount(element: HTMLElement) {
        this.render = Matter.Render.create({
            element: element,
            engine: this.engine,
            options: {
                width: element.clientWidth,
                height: element.clientHeight,
                background: '#0f172a', // slate-900
                wireframes: false, // Solid shapes
                showAngleIndicator: false,
            }
        });

        Matter.Render.run(this.render);
        Matter.Runner.run(this.runner, this.engine);

        // Hook into the update loop for SSAL
        Matter.Events.on(this.engine, 'afterUpdate', this.handleUpdateLoop.bind(this));
    }

    /**
     * Cleans up the engine instance.
     */
    public unmount() {
        if (this.render) {
            Matter.Render.stop(this.render);
            if (this.render.canvas) {
                this.render.canvas.remove();
            }
        }
        Matter.Runner.stop(this.runner);
        Matter.Engine.clear(this.engine);
        this.render = null;
    }

    /**
     * The heart of SSAL. Extract physics state and broadcast it.
     */
    private handleUpdateLoop() {
        if (!this._simStateCallback) return;

        const bodies = Matter.Composite.allBodies(this.engine.world);
        
        // For MVP, we assume the first body is our "Primary Object" (Projectile/Crate)
        const primaryBody = bodies[0]; 

        if (primaryBody) {
            const snapshot = {
                timestamp: this.engine.timing.timestamp,
                primaryObject: {
                    position: { x: primaryBody.position.x, y: primaryBody.position.y },
                    velocity: { x: primaryBody.velocity.x, y: primaryBody.velocity.y },
                    acceleration: { 
                        // Matter.js doesn't store acceleration explicitly, we infer or track it if needed.
                        // For now, we use force/mass or delta-v/delta-t. 
                        // Simplified: Using previous velocity diff could be noisy.
                        // We will just pass velocity for Kinematics Lab.
                        x: 0, 
                        y: 0 
                    },
                    netForce: { x: primaryBody.force.x, y: primaryBody.force.y }
                }
            };
            this._simStateCallback(snapshot);
        }
    }

    public subscribeToUpdates(callback: (data: any) => void) {
        this._simStateCallback = callback;
    }

    // --- Interaction API ---

    public spawnProjectile(x: number, y: number, velocity: Vector2D) {
        Matter.Composite.clear(this.engine.world, false); // Clear previous objects

        const ball = Matter.Bodies.circle(x, y, 20, {
            restitution: 0.8, // Bouncy
            friction: 0.005,
            frictionAir: 0.001,
            render: { fillStyle: '#4f46e5' } // Indigo-600
        });

        Matter.Body.setVelocity(ball, velocity);
        Matter.Composite.add(this.engine.world, ball);

        // Add ground
        if (this.render) {
            const ground = Matter.Bodies.rectangle(
                this.render.options.width! / 2,
                this.render.options.height!,
                this.render.options.width!,
                40,
                { isStatic: true, render: { fillStyle: '#1e293b' } }
            );
            Matter.Composite.add(this.engine.world, ground);
        }
    }
}