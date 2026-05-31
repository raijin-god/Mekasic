import { useState } from 'react';
import { CheckCircle2, XCircle, Zap, AlertTriangle } from 'lucide-react';
import { ARDUINO_PINS, type WiringPin } from '../data/sensors';

interface WiringEngineProps {
  sensorTitle: string;
  wiringPins: WiringPin[];
  darkMode: boolean;
  onSuccess: () => void;
  alreadyCompleted: boolean;
}

export function WiringEngine({ sensorTitle, wiringPins, darkMode, onSuccess, alreadyCompleted }: WiringEngineProps) {
  const [selections, setSelections] = useState<Record<string, string>>(() =>
    Object.fromEntries(wiringPins.map(p => [p.sensorPin, '']))
  );
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('success' ? alreadyCompleted ? 'success' : 'idle' : 'idle');
  const [errorPins, setErrorPins] = useState<string[]>([]);

  const handleChange = (sensorPin: string, value: string) => {
    setSelections(prev => ({ ...prev, [sensorPin]: value }));
    if (status !== 'idle') {
      setStatus('idle');
      setErrorPins([]);
    }
  };

  const checkWiring = () => {
    const wrong: string[] = [];
    for (const pin of wiringPins) {
      if (selections[pin.sensorPin] !== pin.correctArduinoPin) {
        wrong.push(pin.sensorPin);
      }
    }
    if (wrong.length > 0) {
      setStatus('error');
      setErrorPins(wrong);
    } else {
      setStatus('success');
      setErrorPins([]);
      onSuccess();
    }
  };

  const pinColors: Record<string, string> = {
    VCC: darkMode ? 'text-red-400' : 'text-red-600',
    GND: darkMode ? 'text-slate-400' : 'text-slate-600',
    DATA: darkMode ? 'text-cyan-400' : 'text-cyan-600',
    TRIG: darkMode ? 'text-yellow-400' : 'text-yellow-600',
    ECHO: darkMode ? 'text-orange-400' : 'text-orange-600',
    AOUT: darkMode ? 'text-green-400' : 'text-green-600',
    DOUT: darkMode ? 'text-blue-400' : 'text-blue-600',
    OUT: darkMode ? 'text-purple-400' : 'text-purple-600',
    SIG: darkMode ? 'text-teal-400' : 'text-teal-600',
    SDA: darkMode ? 'text-pink-400' : 'text-pink-600',
    SCL: darkMode ? 'text-violet-400' : 'text-violet-600',
  };

  if (alreadyCompleted || status === 'success') {
    return (
      <div className={`rounded-xl p-5 border ${
        darkMode
          ? 'bg-green-950/30 border-green-900/50'
          : 'bg-green-50 border-green-200'
      }`}>
        <div className="flex items-center gap-3">
          <CheckCircle2 className={`w-6 h-6 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
          <div>
            <p className={`font-bold ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
              Wiring Benar! Modul Selesai
            </p>
            <p className={`text-sm mt-0.5 ${darkMode ? 'text-green-500' : 'text-green-600'}`}>
              Koneksi pin {sensorTitle} ke Arduino sudah tepat.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {wiringPins.map(pin => (
            <div key={pin.sensorPin} className={`flex items-center gap-2 text-xs rounded-lg px-3 py-2 ${
              darkMode ? 'bg-green-950/50' : 'bg-green-100'
            }`}>
              <span className={`font-mono font-bold ${pinColors[pin.sensorPin] ?? (darkMode ? 'text-white' : 'text-slate-800')}`}>
                {pin.sensorPin}
              </span>
              <span className={darkMode ? 'text-green-600' : 'text-green-400'}>→</span>
              <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                {pin.correctArduinoPin}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border overflow-hidden ${
      darkMode ? 'bg-dark-900/60 border-purple-900/40' : 'bg-slate-50 border-slate-200'
    }`}>
      {/* Header */}
      <div className={`px-5 py-3 border-b flex items-center gap-2 ${
        darkMode ? 'bg-purple-950/40 border-purple-900/40' : 'bg-purple-50 border-purple-100'
      }`}>
        <Zap className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
        <span className={`font-semibold text-sm ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>
          Virtual Wiring Engine
        </span>
        <span className={`ml-auto text-xs ${darkMode ? 'text-purple-600' : 'text-purple-400'}`}>
          Hubungkan pin sensor ke Arduino
        </span>
      </div>

      {/* Pin grid */}
      <div className="p-5 space-y-3">
        {/* Column labels */}
        <div className="grid grid-cols-3 gap-3 mb-1">
          <div className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-purple-500' : 'text-purple-400'}`}>
            Sensor Pin
          </div>
          <div className={`text-xs font-semibold uppercase tracking-wide col-span-2 ${darkMode ? 'text-purple-500' : 'text-purple-400'}`}>
            Arduino Pin
          </div>
        </div>

        {wiringPins.map(pin => {
          const isError = errorPins.includes(pin.sensorPin);
          return (
            <div key={pin.sensorPin} className="grid grid-cols-3 gap-3 items-center">
              {/* Sensor pin */}
              <div className={`flex flex-col gap-0.5`}>
                <span className={`font-mono font-bold text-sm ${pinColors[pin.sensorPin] ?? (darkMode ? 'text-white' : 'text-slate-800')}`}>
                  {pin.sensorPin}
                </span>
                <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {pin.label}
                </span>
              </div>

              {/* Arrow + Select */}
              <div className="col-span-2 flex items-center gap-2">
                <span className={`text-lg ${darkMode ? 'text-purple-700' : 'text-purple-300'}`}>→</span>
                <div className="flex-1 relative">
                  <select
                    value={selections[pin.sensorPin]}
                    onChange={e => handleChange(pin.sensorPin, e.target.value)}
                    className={`w-full rounded-lg px-3 py-2 text-sm font-mono appearance-none cursor-pointer transition-all duration-200 outline-none border ${
                      isError
                        ? darkMode
                          ? 'bg-red-950/40 border-red-700/60 text-red-300 focus:border-red-500'
                          : 'bg-red-50 border-red-300 text-red-700 focus:border-red-500'
                        : darkMode
                          ? 'bg-dark-800 border-purple-900/50 text-white focus:border-purple-500 hover:border-purple-700'
                          : 'bg-white border-slate-200 text-slate-800 focus:border-purple-400 hover:border-purple-300'
                    }`}
                  >
                    <option value="">-- Pilih Pin --</option>
                    {ARDUINO_PINS.map(ap => (
                      <option key={ap} value={ap}>{ap}</option>
                    ))}
                  </select>
                  {isError && (
                    <XCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400 pointer-events-none" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Error alert */}
      {status === 'error' && (
        <div className={`mx-5 mb-3 rounded-lg p-3 flex items-start gap-2 ${
          darkMode ? 'bg-red-950/40 border border-red-900/60' : 'bg-red-50 border border-red-200'
        }`}>
          <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
          <div>
            <p className={`text-sm font-semibold ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
              Wiring salah!
            </p>
            <p className={`text-xs mt-0.5 ${darkMode ? 'text-red-500' : 'text-red-500'}`}>
              Pin <span className="font-mono font-bold">{errorPins.join(', ')}</span> tidak tepat. Periksa kembali datasheet.
            </p>
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="px-5 pb-5">
        <button
          onClick={checkWiring}
          disabled={wiringPins.some(p => !selections[p.sensorPin])}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:scale-[1.02] active:scale-95
            ${darkMode
              ? 'bg-gradient-to-r from-purple-700 to-purple-500 text-white hover:from-purple-600 hover:to-purple-400 disabled:hover:scale-100 neon-glow-purple'
              : 'bg-gradient-to-r from-purple-700 to-purple-500 text-white hover:from-purple-600 hover:to-purple-400 disabled:hover:scale-100 shadow-lg shadow-purple-200'
            }`}
        >
          Cek Wiring
        </button>
      </div>
    </div>
  );
}
