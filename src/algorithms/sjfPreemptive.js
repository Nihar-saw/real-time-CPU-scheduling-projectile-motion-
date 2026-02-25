/**
 * Shortest Job First (Preemptive) Scheduling (SRTF)
 */

export const sjfPreemptive = (processes) => {
    let pendingProcesses = [...processes].map(p => ({
        ...p,
        arrivalTime: parseInt(p.arrivalTime),
        burstTime: parseInt(p.burstTime),
        remainingTime: parseInt(p.burstTime)
    })).sort((a, b) => a.arrivalTime - b.arrivalTime);

    const result = [];
    const executionSteps = [];
    let currentTime = 0;
    let completedCount = 0;
    const n = pendingProcesses.length;

    while (completedCount < n) {
        // Get available processes
        const availableProcesses = pendingProcesses.filter(p => p.arrivalTime <= currentTime && p.remainingTime > 0);

        if (availableProcesses.length === 0) {
            // Find next arrival
            const nextArrival = pendingProcesses.find(p => p.remainingTime > 0);
            if (nextArrival) {
                currentTime = nextArrival.arrivalTime;
                continue;
            }
            break;
        }

        // Pick process with shortest remaining time
        availableProcesses.sort((a, b) => a.remainingTime - b.remainingTime || a.arrivalTime - b.arrivalTime);
        const currentProcess = availableProcesses[0];

        // How long can we run this process?
        // Until it finishes, or until another shorter job arrives
        const otherArrivals = pendingProcesses.filter(p => p.arrivalTime > currentTime && p.remainingTime > 0);
        let runDuration = currentProcess.remainingTime;

        if (otherArrivals.length > 0) {
            const nextArrivalAt = Math.min(...otherArrivals.map(p => p.arrivalTime));
            const timeToNextArrival = nextArrivalAt - currentTime;
            runDuration = Math.min(currentProcess.remainingTime, timeToNextArrival);
        }

        // Record execution step
        const lastStep = executionSteps[executionSteps.length - 1];
        if (lastStep && lastStep.id === currentProcess.id) {
            // Merge with last step if it's the same process
            lastStep.endTime += runDuration;
        } else {
            executionSteps.push({
                id: currentProcess.id,
                name: currentProcess.name,
                startTime: currentTime,
                endTime: currentTime + runDuration,
                color: currentProcess.color
            });
        }

        currentTime += runDuration;
        currentProcess.remainingTime -= runDuration;

        if (currentProcess.remainingTime === 0) {
            completedCount++;
            const completionTime = currentTime;
            const turnaroundTime = completionTime - currentProcess.arrivalTime;
            const waitingTime = turnaroundTime - currentProcess.burstTime;

            result.push({
                ...currentProcess,
                completionTime,
                turnaroundTime,
                waitingTime
            });
        }
    }

    return { result, executionSteps };
};
