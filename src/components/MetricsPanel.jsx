import React from 'react';
import { Activity, Clock, Timer, CheckCircle, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MetricsPanel = ({ results }) => {
    if (!results || results.length === 0) {
        return (
            <div className="glass-morphism p-6 rounded-2xl h-full flex flex-col items-center justify-center text-slate-500">
                <Activity className="w-12 h-12 mb-4 opacity-20" />
                <p>No results yet. Run the simulation to see metrics.</p>
            </div>
        );
    }

    const avgWaiting = (results.reduce((sum, r) => sum + r.waitingTime, 0) / results.length).toFixed(2);
    const avgTurnaround = (results.reduce((sum, r) => sum + r.turnaroundTime, 0) / results.length).toFixed(2);
    const cpuUtilization = 100; // Simplified for now

    const chartData = results.map(r => ({
        name: r.name,
        waiting: r.waitingTime,
        turnaround: r.turnaroundTime,
        color: r.color
    }));

    return (
        <div className="glass-card p-6 min-h-[820px] flex flex-col gap-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Performance Metrics
            </h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                        <Clock className="w-3 h-3" /> AVG WAITING
                    </div>
                    <div className="text-2xl font-mono text-blue-400">{avgWaiting}</div>
                </div>
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                        <Timer className="w-3 h-3" /> AVG TURNAROUND
                    </div>
                    <div className="text-2xl font-mono text-purple-400">{avgTurnaround}</div>
                </div>
            </div>

            <div className="h-48 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                            itemStyle={{ fontSize: '12px' }}
                        />
                        <Bar dataKey="turnaround" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Process Details</h3>
                <div className="overflow-hidden rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/60 text-slate-400">
                            <tr>
                                <th className="px-4 py-2 font-medium">PROCESS</th>
                                <th className="px-4 py-2 font-medium">TURNAROUND</th>
                                <th className="px-4 py-2 font-medium">WAITING</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 bg-slate-900/20">
                            {results.map((r, i) => (
                                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-4 py-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }}></div>
                                        <span className="font-medium text-slate-200">{r.name}</span>
                                    </td>
                                    <td className="px-4 py-2 font-mono text-slate-400">{r.turnaroundTime}</td>
                                    <td className="px-4 py-2 font-mono text-slate-400">{r.waitingTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">CPU Utilization</span>
                    <span className="text-green-400">{cpuUtilization}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>
            </div>
        </div>
    );
};

export default MetricsPanel;
