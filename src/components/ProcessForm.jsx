import React, { useState } from 'react';
import { Plus, Shuffle, Trash2 } from 'lucide-react';

const ProcessForm = ({ onAddProcess, onRandomize }) => {
    const [formData, setFormData] = useState({
        name: 'P1',
        arrivalTime: 0,
        burstTime: 0,
        priority: 0,
        completionTime: 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddProcess({
            ...formData,
            id: Date.now(),
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        });
        // Increment process name for convenience
        const currentNum = parseInt(formData.name.replace('P', '')) || 0;
        setFormData({ ...formData, name: `P${currentNum + 1}` });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'name' ? value : parseInt(value) || 0
        }));
    };

    return (
        <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
                Process Input
                <button
                    onClick={onRandomize}
                    className="text-xs font-normal bg-slate-800 text-slate-300 px-3 py-1 rounded-full hover:bg-slate-700 flex items-center gap-1 transition-all"
                >
                    <Shuffle className="w-3 h-3" />
                    Randomize
                </button>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Process ID</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Arrival Time</label>
                        <input
                            type="number"
                            name="arrivalTime"
                            value={formData.arrivalTime}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-primary"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Burst</label>
                        <input
                            type="number"
                            name="burstTime"
                            value={formData.burstTime}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Priority</label>
                        <input
                            type="number"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Completion Time</label>
                        <input
                            type="number"
                            name="completionTime"
                            value={formData.completionTime}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-primary"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary/20 text-primary border border-primary/30 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/30 transition-all active:scale-[0.98]"
                >
                    <Plus className="w-5 h-5" />
                    Add Process
                </button>
            </form>
        </div>
    );
};

export default ProcessForm;
