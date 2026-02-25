import React from 'react';
import { Play, Pause, RotateCcw, FastForward, Settings2, Trash2 } from 'lucide-react';

const ControlPanel = ({
    algorithm,
    setAlgorithm,
    isPaused,
    setIsPaused,
    speed,
    setSpeed,
    onReset,
    onClear
}) => {
    const algorithms = [
        { id: 'FCFS', name: 'First Come First Serve' },
        { id: 'SJF-NP', name: 'SJF (Non-Preemptive)' },
        { id: 'SJF-P', name: 'SJF (Preemptive)' },
        { id: 'Priority', name: 'Priority Scheduling' },
        { id: 'RR', name: 'Round Robin' }
    ];

    return (
        <div className="glass-card p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-primary" />
                    Simulation Controls
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={onClear}
                        className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        title="Clear All"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onReset}
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                        title="Reset Simulation"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Algorithm</label>
                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none appearance-none"
                >
                    {algorithms.map(algo => (
                        <option key={algo.id} value={algo.id}>{algo.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${isPaused
                        ? 'bg-primary text-primary-foreground hover:scale-105 active:scale-95'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                >
                    {isPaused ? <Play className="fill-current" /> : <Pause className="fill-current" />}
                    {isPaused ? 'Start' : 'Pause'}
                </button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-400">Speed Multiplier</label>
                    <span className="text-primary font-mono">{speed}x</span>
                </div>
                <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-primary h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 px-1">
                    <span>0.5x</span>
                    <span>5.0x</span>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
