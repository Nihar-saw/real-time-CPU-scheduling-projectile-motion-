/**
 * First Come First Serve (FCFS) Scheduling
 */

export const fcfs = (processes) => {
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    const result = [];
    let currentTime = 0;
    const CONTEXT_SWITCH = 0.5;

    sortedProcesses.forEach((p, index) => {
        const arrivalTime = parseInt(p.arrivalTime);
        const burstTime = parseInt(p.burstTime);

        if (currentTime < arrivalTime) {
            currentTime = arrivalTime;
        }

        const startTime = currentTime;
        const completionTime = startTime + burstTime;
        const waitingTime = startTime - arrivalTime;
        const turnaroundTime = completionTime - arrivalTime;

        result.push({
            ...p,
            startTime,
            completionTime,
            waitingTime,
            turnaroundTime
        });

        currentTime = completionTime;
    });

    return result;
};
