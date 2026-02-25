import React from 'react';

const GanttChart = ({ executionSteps, totalTime }) => {
    if (!executionSteps || executionSteps.length === 0) {
        return (
            <div className="glass-morphism p-6 rounded-2xl h-24 flex items-center justify-center text-slate-500 text-sm">
                Simulation timeline will appear here
            </div>
        );
    }

    const duration = totalTime || Math.max(...executionSteps.map(s => s.endTime));
    const scale = 100 / duration;

    return (
        <div className="glass-card p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Gantt Chart / Timeline</h2>
                <span className="text-xs font-mono text-slate-500">Total Time: {duration}ms</span>
            </div>

            <div className="relative h-12 w-full bg-slate-900/50 rounded-lg overflow-hidden">
                {executionSteps.map((step, idx) => (
                    <div
                        key={`${step.id}-${idx}`}
                        className="h-full absolute group"
                        style={{
                            left: `${step.startTime * scale}%`,
                            width: `${(step.endTime - step.startTime) * scale}%`,
                            backgroundColor: step.color,
                            opacity: 0.8
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white truncate px-1 pointer-events-none">
                            {step.name}
                        </div>
                        {/* Completion Time Label */}
                        <div className="absolute bottom-0 right-0 px-1 bg-black/20 text-[8px] font-mono text-white/80 rounded-tl pointer-events-none">
                            {step.endTime}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                            {step.name}: {step.startTime} - {step.endTime}
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative w-full h-4">
                {[...Array(Math.floor(duration / 5) + 1)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-[8px] text-slate-600 border-l border-slate-800 h-full pt-1"
                        style={{ left: `${(i * 5) * scale}%` }}
                    >
                        {i * 5}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GanttChart;
