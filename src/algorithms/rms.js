/**
 * Rate Monotonic Scheduling (RMS)
 * Static priority preemptive scheduling based on task periods.
 * In this visualizer, we map 'Priority' as the 'Period' (shorter period = higher priority).
 */

export const rms = (processes) => {
    // Sort by priority (period) - lower number = shorter period = higher priority
    let pendingProcesses = [...processes].map(p => ({
        ...p,
        arrivalTime: parseInt(p.arrivalTime),
        burstTime: parseInt(p.burstTime),
        period: parseInt(p.priority) * 10, // Use priority as a base for period
        remainingTime: parseInt(p.burstTime)
    }));

    const executionSteps = [];
    let currentTime = 0;
    const n = pendingProcesses.length;
    let completedCount = 0;
    const maxSimulationTime = 100; // Limit for visualization

    while (currentTime < maxSimulationTime) {
        // Collect all processes that have arrived and have pending burst
        const availableProcesses = pendingProcesses.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0);

        if (availableProcesses.length === 0) {
            const nextArrivals = pendingProcesses.filter(p => p.remainingTime > 0);
            if (nextArrivals.length === 0) break;
            currentTime = Math.min(...nextArrivals.map(p => p.arrivalTime));
            continue;
        }

        // RMS: Highest priority = shortest period (lowest priority value in our case)
        availableProcesses.sort((a, b) => a.period - b.period || a.arrivalTime - b.arrivalTime);
        const process = availableProcesses[0];

        // Execute for 1 unit
        const startTime = currentTime;
        const executeTime = 1;

        executionSteps.push({
            id: process.id,
            name: process.name,
            startTime,
            endTime: startTime + executeTime,
            color: process.color
        });

        currentTime += executeTime;
        process.remainingTime -= executeTime;

        if (process.remainingTime <= 0) {
            completedCount++;
            process.completionTime = currentTime;
            process.turnaroundTime = currentTime - process.arrivalTime;
            process.waitingTime = process.turnaroundTime - process.burstTime;
        }
    }

    const result = pendingProcesses.filter(p => p.completionTime !== undefined);
    return { result, executionSteps };
};
