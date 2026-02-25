/**
 * Shortest Job First (SJF) Scheduling (Non-Preemptive)
 */

export const sjf = (processes) => {
    let pendingProcesses = [...processes].map(p => ({
        ...p,
        arrivalTime: parseInt(p.arrivalTime),
        burstTime: parseInt(p.burstTime)
    }));

    const result = [];
    let currentTime = 0;

    while (pendingProcesses.length > 0) {
        // Get processes that have arrived
        const availableProcesses = pendingProcesses.filter(p => p.arrivalTime <= currentTime);

        if (availableProcesses.length === 0) {
            // If no process arrived, jump to the next arrival time
            currentTime = Math.min(...pendingProcesses.map(p => p.arrivalTime));
            continue;
        }

        // Pick process with shortest burst time
        availableProcesses.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime);
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
