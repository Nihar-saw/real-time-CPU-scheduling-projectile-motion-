# CPU Projectile Scheduling 🚀

A real-time CPU Scheduling Visualizer that uses **Projectile Motion** physics to represent OS scheduling concepts.

## 🎯 Educational Mapping

| OS Concept | Projectile Motion Equivalent |
|------------|-------------------------------|
| **Burst Time** | Initial Velocity ($v_0$) |
| **Priority** | Angle of Projection ($\theta$) |
| **CPU Load** | Gravity ($g$) |
| **Waiting Time** | Maximum Height ($H_{max}$) |
| **Turnaround Time** | Range ($R$) |
| **Completion Time** | Time of Flight ($T_{flight}$) |

## 🚀 Features

- **6 Algorithms**: FCFS, SJF, Priority, Round Robin, RMS, EDF.
- **Physics Simulation**: Custom-built projectile logic animating process "balls".
- **Real-time Analytics**: Live Gantt charts and performance metrics.
- **Glassmorphism UI**: Modern, dark-mode default design with Tailwind CSS.
- **Educational Mode**: Learn the math behind the mapping.

## 🛠️ Tech Stack

- **React JS** (Vite)
- **Tailwind CSS** (Glassmorphism)
- **Framer Motion** (Animations)
- **Recharts** (Dashboard)
- **Lucide React** (Icons)

## 📦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:5173`

## 🧠 Mathematical Formulas

- **Range**: $R = \frac{v_0^2 \sin(2\theta)}{g}$
- **Max Height**: $H = \frac{v_0^2 \sin^2\theta}{2g}$
- **Time of Flight**: $T = \frac{2v_0 \sin\theta}{g}$

Developed as part of an OS Theory educational project.
