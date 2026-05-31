import { useState, useEffect, useCallback } from 'react';

export interface ProgressState {
  completedSensors: number[];
  unlockedSensors: number[];
}

const STORAGE_KEY = 'mekatronika_progress_v1';

function getInitialProgress(): ProgressState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ProgressState;
      if (Array.isArray(parsed.completedSensors) && Array.isArray(parsed.unlockedSensors)) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return { completedSensors: [], unlockedSensors: [1] };
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(getInitialProgress);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const completeSensor = useCallback((sensorId: number) => {
    setProgress(prev => {
      if (prev.completedSensors.includes(sensorId)) return prev;
      const nextId = sensorId + 1;
      const newUnlocked = prev.unlockedSensors.includes(nextId)
        ? prev.unlockedSensors
        : [...prev.unlockedSensors, nextId];
      return {
        completedSensors: [...prev.completedSensors, sensorId],
        unlockedSensors: newUnlocked,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({ completedSensors: [], unlockedSensors: [1] });
  }, []);

  const isCompleted = useCallback((sensorId: number) => {
    return progress.completedSensors.includes(sensorId);
  }, [progress]);

  const isUnlocked = useCallback((sensorId: number) => {
    return progress.unlockedSensors.includes(sensorId);
  }, [progress]);

  return { progress, completeSensor, resetProgress, isCompleted, isUnlocked };
}
