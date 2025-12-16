/**
 * Physics Configuration Constants
 * Defines the mapping between the Simulation World (SI Units) and the Render World (Pixels).
 */

export const PHYSICS_CONFIG = {
    // Scaling: 1 Meter = 100 Pixels
    // This allows reasonable on-screen sizes for standard objects (e.g., a 0.5m box is 50px).
    METER_TO_PIXEL: 100,
    
    // Time Step: Fixed at 60Hz for deterministic behavior
    TIME_STEP: 1000 / 60,
    
    // Gravity: Standard Earth Gravity (m/s^2)
    GRAVITY: { x: 0, y: 9.81 },
    
    // Visuals
    COLORS: {
        PRIMARY: '#6366f1', // Indigo-500
        ACCENT: '#10b981',  // Emerald-500
        DANGER: '#ef4444',  // Red-500
        TEXT: '#f8fafc'     // Slate-50
    }
};

export const toPixels = (meters: number) => meters * PHYSICS_CONFIG.METER_TO_PIXEL;
export const toMeters = (pixels: number) => pixels / PHYSICS_CONFIG.METER_TO_PIXEL;