/**
 * Physics Mapper Utility
 * Maps OS scheduling concepts to Projectile Motion parameters
 */

export const mapProcessToProjectile = (process, systemLoad = 9.8) => {
    // Burst Time -> Initial Velocity (v)
    // Smaller burst time = slightly slower but manageable launch
    // Let's normalize v between 40 and 100 for visual clarity
    const v = Math.min(100, Math.max(40, process.burstTime * 5));

    // Priority -> Angle (theta)
    // High priority (low number) = higher angle (more time in air/waiting)
    // Low priority (high number) = lower angle
    // Map priority (1-10) to angle (15-75 degrees)
    const angleDeg = Math.min(75, Math.max(15, 90 - (process.priority * 7)));
    const theta = (angleDeg * Math.PI) / 180;

    // Gravity (g) -> System Load
    const g = systemLoad;

    // Calculate standard projectile motion values
    const range = (Math.pow(v, 2) * Math.sin(2 * theta)) / g;
    const maxHeight = (Math.pow(v, 2) * Math.pow(Math.sin(theta), 2)) / (2 * g);
    const timeOfFlight = (2 * v * Math.sin(theta)) / g;

    return {
        initialVelocity: v,
        angle: angleDeg,
        gravity: g,
        theoreticalRange: range,
        theoreticalMaxHeight: maxHeight,
        theoreticalTimeOfFlight: timeOfFlight,
        color: process.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };
};

export const calculatePosition = (v0, thetaDeg, g, t) => {
    const theta = (thetaDeg * Math.PI) / 180;

    // x = v0 * t * cos(theta)
    const x = v0 * t * Math.cos(theta);

    // y = v0 * t * sin(theta) - 0.5 * g * t^2
    const y = (v0 * t * Math.sin(theta)) - (0.5 * g * Math.pow(t, 2));

    return { x, y };
};
