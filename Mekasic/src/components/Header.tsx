import { Moon, Sun, Cpu, RotateCcw, Trophy } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
  completedCount: number;
  totalCount: number;
  onReset: () => void;
}

export function Header({ darkMode, onToggleDark, completedCount, totalCount, onReset }: HeaderProps) {
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      darkMode
        ? 'bg-dark-950/95 border-purple-900/40 backdrop-blur-xl'
        : 'bg-white/95 border-slate-200 backdrop-blur-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                darkMode ? 'bg-purple-900/60 neon-glow-purple' : 'bg-purple-50 border border-purple-200'
              }`}>
                <Cpu className={`w-5 h-5 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`} />
              </div>
            </div>
            <div>
              <h1 className={`font-bold text-sm sm:text-base leading-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Mekatronika Dasar
              </h1>
              <p className={`text-xs leading-tight ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                10 Sensor Interaktif
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
              <div>
                <div className={`text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Progress
                </div>
                <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {completedCount}/{totalCount} Selesai
                </div>
              </div>
            </div>
            <div className="w-32">
              <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-purple-950' : 'bg-slate-100'}`}>
                <div
                  className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-purple-600 to-purple-400"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className={`text-right text-xs mt-0.5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {pct}%
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              title="Reset Progress"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                darkMode
                  ? 'bg-red-950/50 text-red-400 hover:bg-red-900/60 border border-red-900/40'
                  : 'bg-red-50 text-red-500 hover:bg-red-100 border border-red-200'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onToggleDark}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                darkMode
                  ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
