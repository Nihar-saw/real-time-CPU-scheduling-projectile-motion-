/**
 * Priority Scheduling (Non-Preemptive)
 */

export const priorityScheduling = (processes) => {
    let pendingProcesses = [...processes].map(p => ({
        ...p,
        arrivalTime: parseInt(p.arrivalTime),
        burstTime: parseInt(p.burstTime),
        priority: parseInt(p.priority)
    }));

    const result = [];
    let currentTime = 0;

    while (pendingProcesses.length > 0) {
        const availableProcesses = pendingProcesses.filter(p => p.arrivalTime <= currentTime);

        if (availableProcesses.length === 0) {
            currentTime = Math.min(...pendingProcesses.map(p => p.arrivalTime));
            continue;
        }

        // Pick process with highest priority (lower number = higher priority typically in OS)
        availableProcesses.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);
        const process = availableProcesses[0];

        const startTime = currentTime;
        const completionTime = startTime + process.burstTime;
        const waitingTime = startTime - process.arrivalTime;
        const turnaroundTime = completionTime - process.arrivalTime;

        result.push({
            ...process,
            startTime,
            completionTime,
            waitingTime,
            turnaroundTime
        });

        currentTime = completionTime;
        pendingProcesses = pendingProcesses.filter(p => p.id !== process.id);
    }

    return result;
};
