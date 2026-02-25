/**
 * Round Robin (RR) Scheduling
 */

export const roundRobin = (processes, quantum = 2) => {
    let queue = [];
    let pendingProcesses = [...processes].map(p => ({
        ...p,
        arrivalTime: parseInt(p.arrivalTime),
        burstTime: parseInt(p.burstTime),
        remainingTime: parseInt(p.burstTime)
    })).sort((a, b) => a.arrivalTime - b.arrivalTime);

    const result = [];
    const executionSteps = []; // RR needs steps because it's preemptive
    let currentTime = 0;
    let completedCount = 0;
    const n = pendingProcesses.length;

    currentTime = pendingProcesses[0].arrivalTime;
    queue.push(pendingProcesses[0]);
    let nextArrivalIdx = 1;

    while (completedCount < n) {
        if (queue.length === 0 && nextArrivalIdx < n) {
            currentTime = pendingProcesses[nextArrivalIdx].arrivalTime;
            queue.push(pendingProcesses[nextArrivalIdx]);
            nextArrivalIdx++;
        }

        const process = queue.shift();
        const startTime = currentTime;
        const executeTime = Math.min(process.remainingTime, quantum);

        executionSteps.push({
            id: process.id,
            name: process.name,
            startTime,
            endTime: startTime + executeTime,
            color: process.color
        });

        currentTime += executeTime;
        process.remainingTime -= executeTime;

        // Check for new arrivals during this execution slice
        while (nextArrivalIdx < n && pendingProcesses[nextArrivalIdx].arrivalTime <= currentTime) {
            queue.push(pendingProcesses[nextArrivalIdx]);
            nextArrivalIdx++;
        }

        if (process.remainingTime > 0) {
            queue.push(process);
        } else {
            completedCount++;
            const completionTime = currentTime;
            const turnaroundTime = completionTime - process.arrivalTime;
            const waitingTime = turnaroundTime - process.burstTime;

            result.push({
                ...process,
                completionTime,
                turnaroundTime,
                waitingTime
            });
        }
    }

    return { result, executionSteps };
};
