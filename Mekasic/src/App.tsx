import { useState, useCallback, useEffect } from 'react';
import { Cpu, GraduationCap, Trophy, Zap } from 'lucide-react';
import { SENSORS } from './data/sensors';
import { useProgress } from './hooks/useProgress';
import { Header } from './components/Header';
import { SensorCard } from './components/SensorCard';
import { SensorModal } from './components/SensorModal';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('mekatronika_theme') === 'dark';
    } catch {
      return false;
    }
  });
  const [selectedSensorId, setSelectedSensorId] = useState<number | null>(null);
  const { progress, completeSensor, resetProgress, isCompleted, isUnlocked } = useProgress();

  useEffect(() => {
    try {
      localStorage.setItem('mekatronika_theme', darkMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [darkMode]);

  const handleComplete = useCallback((sensorId: number) => {
    completeSensor(sensorId);
  }, [completeSensor]);

  const selectedSensor = selectedSensorId !== null
    ? SENSORS.find(s => s.id === selectedSensorId) ?? null
    : null;

  const completedCount = progress.completedSensors.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-dark-950' : 'bg-slate-50'
    }`}>
      <Header
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(v => !v)}
        completedCount={completedCount}
        totalCount={SENSORS.length}
        onReset={resetProgress}
      />

      {/* Hero section */}
      <div className={`relative overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-br from-dark-950 via-purple-950/20 to-dark-950'
          : 'bg-gradient-to-br from-white via-purple-50/50 to-white'
      }`}>
        {/* Neon ambient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: darkMode ? 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' : 'radial-gradient(circle, #ede9fe 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: darkMode ? 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' : 'radial-gradient(circle, #cffafe 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          <div className="text-center max-w-2xl mx-auto">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border ${
              darkMode
                ? 'bg-purple-950/60 border-purple-800/50 text-purple-300'
                : 'bg-purple-50 border-purple-200 text-purple-700'
            }`}>
              <GraduationCap className="w-3.5 h-3.5" />
              Media Pembelajaran Interaktif
            </div>

            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              10 Sensor{' '}
              <span className={`${darkMode ? 'text-purple-400 neon-text-purple' : 'text-purple-700'}`}>
                Mekatronika
              </span>
              <br />Dasar
            </h1>
            <p className={`text-base sm:text-lg leading-relaxed mb-8 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Pelajari teori, datasheet, dan wiring setiap sensor secara interaktif.
              Selesaikan Virtual Wiring untuk membuka modul berikutnya.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { icon: <Cpu className="w-4 h-4" />, label: 'Sensor', value: '10' },
                { icon: <Zap className="w-4 h-4" />, label: 'Modul Aktif', value: String(progress.unlockedSensors.length) },
                { icon: <Trophy className="w-4 h-4" />, label: 'Selesai', value: String(completedCount) },
              ].map(stat => (
                <div key={stat.label} className={`flex items-center gap-3 px-5 py-3 rounded-2xl border ${
                  darkMode
                    ? 'bg-dark-900/60 border-purple-900/40'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <span className={darkMode ? 'text-purple-400' : 'text-purple-600'}>{stat.icon}</span>
                  <div>
                    <div className={`text-xl font-black leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {stat.value}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Milestone Grid
            </h2>
            <p className={`text-sm mt-0.5 ${darkMode ? 'text-purple-500' : 'text-slate-500'}`}>
              Klik sensor yang terbuka untuk mulai belajar
            </p>
          </div>
          {/* Progress bar mobile */}
          <div className="sm:hidden text-right">
            <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {completedCount}/{SENSORS.length}
            </div>
            <div className={`text-xs ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>selesai</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {SENSORS.map(sensor => (
            <SensorCard
              key={sensor.id}
              sensor={sensor}
              isUnlocked={isUnlocked(sensor.id)}
              isCompleted={isCompleted(sensor.id)}
              darkMode={darkMode}
              onClick={() => setSelectedSensorId(sensor.id)}
            />
          ))}
        </div>

        {/* Completion banner */}
        {completedCount === SENSORS.length && (
          <div className={`mt-12 rounded-2xl p-8 text-center border ${
            darkMode
              ? 'bg-gradient-to-br from-purple-950/60 to-dark-900/80 border-purple-800/40'
              : 'bg-gradient-to-br from-purple-50 to-white border-purple-200'
          }`}>
            <div className="text-5xl mb-4">🎉</div>
            <h3 className={`text-2xl font-black mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Semua Sensor Dikuasai!
            </h3>
            <p className={`${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              Kamu telah menyelesaikan seluruh 10 modul sensor mekatronika dasar.
              Selamat, Engineer!
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 mt-8 ${
        darkMode ? 'border-purple-950/60 bg-dark-950' : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-sm ${darkMode ? 'text-purple-700' : 'text-slate-400'}`}>
            Media Pembelajaran Interaktif &mdash; 10 Sensor Mekatronika Dasar
          </p>
        </div>
      </footer>

      {/* Modal */}
      {selectedSensor && (
        <SensorModal
          sensor={selectedSensor}
          darkMode={darkMode}
          isCompleted={isCompleted(selectedSensor.id)}
          onComplete={() => handleComplete(selectedSensor.id)}
          onClose={() => setSelectedSensorId(null)}
        />
      )}
    </div>
  );
}

export default App;
