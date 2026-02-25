/**
 * Earliest Deadline First (EDF) Real-Time Scheduling
 */

export const edf = (processes) => {
    let pendingProcesses = [...processes].map(p => ({
        ...p,
        arrivalTime: parseInt(p.arrivalTime),
        burstTime: parseInt(p.burstTime),
        deadline: parseInt(p.deadline),
        remainingTime: parseInt(p.burstTime)
    }));

    const executionSteps = [];
    let currentTime = 0;
    const n = pendingProcesses.length;
    let completedCount = 0;

    while (completedCount < n) {
        const availableProcesses = pendingProcesses.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0);

        if (availableProcesses.length === 0) {
            const nextArrivals = pendingProcesses.filter(p => p.remainingTime > 0);
            if (nextArrivals.length === 0) break;
            currentTime = Math.min(...nextArrivals.map(p => p.arrivalTime));
            continue;
        }

        // Sort by deadline
        availableProcesses.sort((a, b) => a.deadline - b.deadline || a.arrivalTime - b.arrivalTime);
        const process = availableProcesses[0];

        // EDF is preemptive, but for visualization we'll execute 1 unit at a time or check for next event
        const startTime = currentTime;
        const executeTime = 1; // Simplification: unit time steps or until next arrival/deadline

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
            process.missedDeadline = currentTime > process.deadline;
        }
    }

    const result = pendingProcesses.filter(p => p.completionTime !== undefined);
    return { result, executionSteps };
};
