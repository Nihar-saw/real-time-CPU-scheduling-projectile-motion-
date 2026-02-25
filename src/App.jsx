import React, { useState, useEffect, useCallback } from 'react';
import ProcessForm from './components/ProcessForm';
import SimulationCanvas from './components/SimulationCanvas';
import ControlPanel from './components/ControlPanel';
import MetricsPanel from './components/MetricsPanel';
import GanttChart from './components/GanttChart';
import { fcfs } from './algorithms/fcfs';
import { sjf } from './algorithms/sjf';
import { sjfPreemptive } from './algorithms/sjfPreemptive';
import { priorityScheduling } from './algorithms/priority';
import { roundRobin } from './algorithms/roundRobin';
import { mapProcessToProjectile } from './utils/physicsMapper';
import { LayoutDashboard, GraduationCap, Github } from 'lucide-react';

function App() {
    const [processes, setProcesses] = useState([]);
    const [algorithm, setAlgorithm] = useState('FCFS');
    const [isPaused, setIsPaused] = useState(true);
    const [speed, setSpeed] = useState(1);
    const [results, setResults] = useState([]);
    const [executionSteps, setExecutionSteps] = useState([]);
    const [activeProjectiles, setActiveProjectiles] = useState([]);
    const [theoryMode, setTheoryMode] = useState(false);

    const runSimulation = useCallback(() => {
        if (processes.length === 0) return;

        let simulationResult;
        let steps = [];

        switch (algorithm) {
            case 'FCFS':
                simulationResult = fcfs(processes);
                steps = simulationResult.map(r => ({
                    id: r.id,
                    name: r.name,
                    startTime: r.startTime,
                    endTime: r.completionTime,
                    color: r.color
                }));
                break;
            case 'SJF-NP':
                simulationResult = sjf(processes);
                steps = simulationResult.map(r => ({
                    id: r.id,
                    name: r.name,
                    startTime: r.startTime,
                    endTime: r.completionTime,
                    color: r.color
                }));
                break;
            case 'SJF-P':
                const srtf = sjfPreemptive(processes);
                simulationResult = srtf.result;
                steps = srtf.executionSteps;
                break;
            case 'Priority':
                simulationResult = priorityScheduling(processes);
                steps = simulationResult.map(r => ({
                    id: r.id,
                    name: r.name,
                    startTime: r.startTime,
                    endTime: r.completionTime,
                    color: r.color
                }));
                break;
            case 'RR':
                const rr = roundRobin(processes, 2);
                simulationResult = rr.result;
                steps = rr.executionSteps;
                break;
            default:
                simulationResult = fcfs(processes);
        }

        setResults(simulationResult);
        setExecutionSteps(steps);

        // Map to projectiles
        const projectiles = simulationResult.map(p => ({
            ...p,
            physics: mapProcessToProjectile(p)
        }));
        setActiveProjectiles(projectiles);
    }, [processes, algorithm]);

    useEffect(() => {
        runSimulation();
    }, [processes, algorithm, runSimulation]);

    const handleAddProcess = (process) => {
        setProcesses(prev => [...prev, process]);
    };

    const handleRandomize = () => {
        const names = ['P1', 'P2', 'P3', 'P4', 'P5'];
        const randomProcesses = names.map((name, i) => ({
            id: Date.now() + i,
            name,
            arrivalTime: Math.floor(Math.random() * 10),
            burstTime: Math.floor(Math.random() * 10) + 1,
            priority: Math.floor(Math.random() * 5) + 1,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        }));
        setProcesses(randomProcesses);
    };

    const handleReset = () => {
        setIsPaused(true);
        runSimulation();
    };

    const handleClear = () => {
        setProcesses([]);
        setResults([]);
        setExecutionSteps([]);
        setActiveProjectiles([]);
        setIsPaused(true);
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
            {/* Background Particles Decoration */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container flex h-16 items-center justify-between px-8">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="w-8 h-8 text-primary" />
                        <h1 className="text-xl font-bold tracking-tight">CPU Projectile Scheduling</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setTheoryMode(!theoryMode)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${theoryMode ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                                }`}
                        >
                            <GraduationCap className="w-4 h-4" />
                            Theory Mode
                        </button>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto p-8 grid grid-cols-12 gap-8 relative">
                {/* Left: Input, Controls & Metrics Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-6 animate-in slide-in-from-left duration-500">
                    <ProcessForm onAddProcess={handleAddProcess} onRandomize={handleRandomize} />
                    <ControlPanel
                        algorithm={algorithm}
                        setAlgorithm={setAlgorithm}
                        isPaused={isPaused}
                        setIsPaused={setIsPaused}
                        speed={speed}
                        setSpeed={setSpeed}
                        onReset={handleReset}
                        onClear={handleClear}
                    />
                    <MetricsPanel results={results} />
                </div>

                {/* Right: Simulation & Timeline Theater */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    <SimulationCanvas
                        activeProcesses={isPaused ? [] : activeProjectiles}
                        isPaused={isPaused}
                        speed={speed}
                    />
                    <GanttChart executionSteps={executionSteps} />

                    {theoryMode && (
                        <div className="glass-morphism p-6 rounded-2xl animate-in fade-in zoom-in duration-300">
                            <h3 className="text-lg font-bold mb-4 text-primary">Mathematical Mapping</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                    <p className="flex justify-between border-b border-slate-800 pb-1">
                                        <span className="text-slate-400">Burst Time</span>
                                        <span className="font-mono text-blue-400">Initial Velocity (v₀)</span>
                                    </p>
                                    <p className="flex justify-between border-b border-slate-800 pb-1">
                                        <span className="text-slate-400">Priority</span>
                                        <span className="font-mono text-purple-400">Angle (θ)</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-slate-400">System Load</span>
                                        <span className="font-mono text-green-400">Gravity (g)</span>
                                    </p>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded-lg font-mono text-xs text-slate-300">
                                    Range = (v² sin 2θ) / g <br />
                                    Flight = (2v sin θ) / g
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
