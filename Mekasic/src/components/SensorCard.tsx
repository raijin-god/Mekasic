import { Lock, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import type { SensorData } from '../data/sensors';

const neonClasses: Record<string, { glow: string; badge: string; bar: string }> = {
  cyan: {
    glow: 'neon-glow-cyan',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    bar: 'from-cyan-500 to-cyan-300',
  },
  green: {
    glow: 'neon-glow-green',
    badge: 'bg-green-500/10 text-green-400 border-green-500/30',
    bar: 'from-green-500 to-green-300',
  },
  pink: {
    glow: 'neon-glow-pink',
    badge: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    bar: 'from-pink-500 to-pink-300',
  },
  yellow: {
    glow: 'neon-glow-yellow',
    badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    bar: 'from-yellow-500 to-yellow-300',
  },
  orange: {
    glow: 'neon-glow-orange',
    badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    bar: 'from-orange-500 to-orange-300',
  },
  teal: {
    glow: 'neon-glow-teal',
    badge: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    bar: 'from-teal-500 to-teal-300',
  },
};

interface SensorCardProps {
  sensor: SensorData;
  isUnlocked: boolean;
  isCompleted: boolean;
  darkMode: boolean;
  onClick: () => void;
}

export function SensorCard({ sensor, isUnlocked, isCompleted, darkMode, onClick }: SensorCardProps) {
  const neon = neonClasses[sensor.neonColor] ?? neonClasses.cyan;

  if (!isUnlocked) {
    return (
      <div className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
        darkMode
          ? 'bg-dark-900/50 border-purple-950/60'
          : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-purple-950/80' : 'bg-slate-200'
          }`}>
            <Lock className={`w-6 h-6 ${darkMode ? 'text-purple-600' : 'text-slate-400'}`} />
          </div>
          <div className="text-center">
            <div className={`font-bold text-sm ${darkMode ? 'text-purple-800' : 'text-slate-400'}`}>
              {sensor.title}
            </div>
            <div className={`text-xs mt-1 ${darkMode ? 'text-purple-900' : 'text-slate-300'}`}>
              Selesaikan modul sebelumnya
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
            darkMode ? 'bg-purple-950/60 border-purple-900/40 text-purple-800' : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}>
            Terkunci
          </div>
        </div>
        {/* Number badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            darkMode ? 'bg-purple-950 text-purple-800' : 'bg-slate-200 text-slate-400'
          }`}>
            #{sensor.id}
          </span>
        </div>
        <div className="h-40" />
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 text-left w-full
        hover:-translate-y-1 hover:shadow-xl active:scale-95
        ${darkMode
          ? `bg-dark-900/80 border-purple-900/30 hover:border-purple-700/50 ${isCompleted ? 'hover:' + neon.glow : ''}`
          : `bg-white border-slate-200 hover:border-purple-300 shadow-sm hover:shadow-purple-100`
        }`}
    >
      {/* Completed shimmer overlay */}
      {isCompleted && (
        <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${neon.bar} pointer-events-none`} />
      )}

      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${isCompleted ? neon.bar : darkMode ? 'from-purple-900 to-purple-800' : 'from-slate-200 to-slate-100'} transition-all duration-300`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
              darkMode ? neon.badge : 'bg-purple-50 text-purple-700 border-purple-200'
            }`}>
              #{sensor.id}
            </span>
            {isCompleted && (
              <CheckCircle2 className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
            )}
          </div>
          {isCompleted ? (
            <Zap className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'} group-hover:animate-pulse`} />
          ) : (
            <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
              darkMode ? 'text-purple-600' : 'text-slate-400'
            }`} />
          )}
        </div>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300 ${
            darkMode
              ? 'bg-purple-950/60 group-hover:bg-purple-900/60'
              : 'bg-purple-50 group-hover:bg-purple-100'
          }`}>
            {sensor.icon}
          </div>
          <div>
            <h3 className={`font-bold text-base leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {sensor.title}
            </h3>
            <p className={`text-xs mt-0.5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              {sensor.subtitle}
            </p>
          </div>
        </div>

        {/* Teori preview */}
        <p className={`text-xs leading-relaxed line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {sensor.teori}
        </p>

        {/* Status bar */}
        <div className={`mt-4 pt-3 border-t flex items-center justify-between ${
          darkMode ? 'border-purple-950/60' : 'border-slate-100'
        }`}>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
            isCompleted
              ? darkMode
                ? 'bg-green-950/40 text-green-400 border-green-900/40'
                : 'bg-green-50 text-green-700 border-green-200'
              : darkMode
                ? 'bg-purple-950/60 text-purple-400 border-purple-900/40'
                : 'bg-purple-50 text-purple-700 border-purple-200'
          }`}>
            {isCompleted ? 'Selesai' : 'Mulai Belajar'}
          </span>
          <span className={`text-xs ${darkMode ? 'text-purple-700' : 'text-slate-400'}`}>
            {sensor.wiringPins.length} pin
          </span>
        </div>
      </div>
    </button>
  );
}
