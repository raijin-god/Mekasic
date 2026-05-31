import { useEffect, useState } from 'react';
import {
  X, BookOpen, Database, Wrench, Code2, Share2,
  ChevronDown, ChevronUp, CheckCircle2, Copy, ExternalLink
} from 'lucide-react';
import type { SensorData } from '../data/sensors';
import { WiringEngine } from './WiringEngine';

const IG_USERNAME = 'USERNAME_IG_SAYA';

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  darkMode: boolean;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, icon, darkMode, children, defaultOpen = false }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`rounded-xl border overflow-hidden ${
      darkMode ? 'border-purple-900/40' : 'border-slate-200'
    }`}>
      <button
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center justify-between px-5 py-3.5 transition-colors duration-200 ${
          darkMode
            ? 'bg-purple-950/30 hover:bg-purple-950/50 text-white'
            : 'bg-slate-50 hover:bg-slate-100 text-slate-900'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {icon}
          <span className="font-semibold text-sm">{title}</span>
        </div>
        {open
          ? <ChevronUp className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-slate-400'}`} />
          : <ChevronDown className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-slate-400'}`} />
        }
      </button>
      {open && (
        <div className={`px-5 py-4 ${darkMode ? 'bg-dark-900/40' : 'bg-white'}`}>
          {children}
        </div>
      )}
    </div>
  );
}

interface SensorModalProps {
  sensor: SensorData;
  darkMode: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export function SensorModal({ sensor, darkMode, isCompleted, onComplete, onClose }: SensorModalProps) {
  const [copied, setCopied] = useState(false);
  const [igCopied, setIgCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(sensor.rewardCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAndOpenIG = async () => {
    await navigator.clipboard.writeText(sensor.laporanIG);
    setIgCopied(true);
    setTimeout(() => setIgCopied(false), 2000);
    window.open(`https://ig.me/m/${IG_USERNAME}`, '_blank');
  };

  const iconColor = darkMode ? 'text-purple-400' : 'text-purple-600';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div className={`relative w-full sm:max-w-2xl sm:mx-4 sm:rounded-2xl overflow-hidden flex flex-col
        max-h-[92dvh] sm:max-h-[88vh] shadow-2xl
        ${darkMode
          ? 'bg-dark-950 border border-purple-900/50'
          : 'bg-white border border-slate-200'
        }`}>

        {/* Top gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-purple-800 via-purple-500 to-purple-300" />

        {/* Modal header */}
        <div className={`flex items-center gap-4 px-6 py-4 border-b flex-shrink-0 ${
          darkMode ? 'border-purple-900/40' : 'border-slate-200'
        }`}>
          <div className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center flex-shrink-0 ${
            darkMode ? 'bg-purple-950/60' : 'bg-purple-50'
          }`}>
            {sensor.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className={`font-bold text-lg leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {sensor.title}
            </h2>
            <p className={`text-sm ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              {sensor.subtitle}
            </p>
          </div>
          {isCompleted && (
            <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
          )}
          <button
            onClick={onClose}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${
              darkMode
                ? 'bg-purple-950/60 hover:bg-purple-900/60 text-purple-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

          {/* Teori */}
          <Section
            title="Teori Kerja"
            icon={<BookOpen className={`w-4 h-4 ${iconColor}`} />}
            darkMode={darkMode}
            defaultOpen
          >
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {sensor.teori}
            </p>
          </Section>

          {/* Datasheet */}
          <Section
            title="Spesifikasi Datasheet"
            icon={<Database className={`w-4 h-4 ${iconColor}`} />}
            darkMode={darkMode}
            defaultOpen
          >
            <div className="flex flex-wrap gap-2">
              {sensor.datasheet.split(' | ').map((spec, i) => (
                <span key={i} className={`text-xs px-3 py-1.5 rounded-lg font-mono border ${
                  darkMode
                    ? 'bg-purple-950/40 border-purple-900/40 text-purple-300'
                    : 'bg-purple-50 border-purple-200 text-purple-800'
                }`}>
                  {spec}
                </span>
              ))}
            </div>
          </Section>

          {/* Troubleshooting */}
          <Section
            title="Troubleshooting"
            icon={<Wrench className={`w-4 h-4 ${iconColor}`} />}
            darkMode={darkMode}
          >
            <div className={`flex gap-3 p-3 rounded-lg ${
              darkMode ? 'bg-yellow-950/30 border border-yellow-900/40' : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <Wrench className={`w-4 h-4 flex-shrink-0 mt-0.5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-yellow-200' : 'text-yellow-900'}`}>
                {sensor.troubleshooting}
              </p>
            </div>
          </Section>

          {/* Wiring Engine */}
          <div>
            <div className={`flex items-center gap-2 mb-3`}>
              <div className={`w-1 h-5 rounded-full bg-gradient-to-b from-purple-500 to-purple-700`} />
              <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Virtual Wiring Challenge
              </h3>
            </div>
            <WiringEngine
              sensorTitle={sensor.title}
              wiringPins={sensor.wiringPins}
              darkMode={darkMode}
              onSuccess={onComplete}
              alreadyCompleted={isCompleted}
            />
          </div>

          {/* Reward: Code (only after completed) */}
          {isCompleted && (
            <Section
              title="Reward: Kode C++ Arduino"
              icon={<Code2 className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />}
              darkMode={darkMode}
              defaultOpen
            >
              <div className="relative">
                <pre className={`text-xs font-mono overflow-x-auto p-4 rounded-xl leading-relaxed ${
                  darkMode ? 'bg-dark-800 text-green-300' : 'bg-slate-900 text-green-400'
                }`}>
                  <code>{sensor.rewardCode}</code>
                </pre>
                <button
                  onClick={copyCode}
                  className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    copied
                      ? 'bg-green-600 text-white'
                      : darkMode
                        ? 'bg-purple-900/70 text-purple-300 hover:bg-purple-800'
                        : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  }`}
                >
                  <Copy className="w-3 h-3" />
                  {copied ? 'Disalin!' : 'Salin'}
                </button>
              </div>
            </Section>
          )}

          {/* Reward: Laporan IG (only after completed) */}
          {isCompleted && (
            <Section
              title="Generator Laporan Instagram"
              icon={<Share2 className={`w-4 h-4 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />}
              darkMode={darkMode}
              defaultOpen
            >
              <p className={`text-xs leading-relaxed mb-4 p-3 rounded-xl ${
                darkMode ? 'bg-dark-800 text-slate-300 border border-slate-700/50' : 'bg-slate-50 text-slate-700 border border-slate-200'
              }`}>
                {sensor.laporanIG}
              </p>
              <button
                onClick={copyAndOpenIG}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                  igCopied
                    ? 'bg-green-600 text-white'
                    : darkMode
                      ? 'bg-gradient-to-r from-pink-700 to-pink-500 text-white hover:from-pink-600 hover:to-pink-400 neon-glow-pink'
                      : 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-lg shadow-pink-200 hover:from-pink-500 hover:to-pink-400'
                }`}
              >
                {igCopied
                  ? <><CheckCircle2 className="w-4 h-4" /> Teks Tersalin & Buka IG</>
                  : <><ExternalLink className="w-4 h-4" /> Salin Teks & Kirim ke IG</>
                }
              </button>
            </Section>
          )}

        </div>
      </div>
    </div>
  );
}
