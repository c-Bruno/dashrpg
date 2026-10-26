import { useCallback, useEffect, useRef, useState } from 'react';

import { ColorVariant } from 'common/enums';
import { socket } from 'common/libs';
import { randomUUID } from 'node:crypto';

export interface DiceRollEvent {
  character_id: number;
  character_name: string;
  roll: { number: string; description?: string; color: ColorVariant };
  id: string;
  timestamp: number;
}

const MAX_HISTORY = 50;

const useDiceRollSocket = () => {
  const [lastRoll, setLastRoll] = useState<DiceRollEvent | null>(null);
  const [rollHistory, setRollHistory] = useState<DiceRollEvent[]>([]);
  const historyRef = useRef<DiceRollEvent[]>([]);

  useEffect(() => {
    const handleDiceRoll = (event: DiceRollEvent) => {
      const rollEvent: DiceRollEvent = {
        ...event,
        id: event.id ?? `${Date.now()}-${randomUUID()}`,
        timestamp: event.timestamp ?? Date.now(),
      };

      setLastRoll(rollEvent);

      historyRef.current = [rollEvent, ...historyRef.current].slice(0, MAX_HISTORY);
      setRollHistory(historyRef.current);
    };

    socket.on('dice_roll', handleDiceRoll);

    return () => {
      socket.off('dice_roll', handleDiceRoll);
    };
  }, []);

  const clearHistory = useCallback(() => {
    historyRef.current = [];
    setRollHistory([]);
    setLastRoll(null);
  }, []);

  return { lastRoll, rollHistory, clearHistory };
};

export default useDiceRollSocket;
