import React from 'react';

interface TimerProps {
  seconds: number;
}

const Timer: React.FC<TimerProps> = ({ seconds }) => {
  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    // NTA displays usually simplified, but here's strict HH:MM:SS
    // Note: NTA usually shows "Time Left: 180:00" or similar.
    // We will use strict digital format.
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-white font-bold text-lg">
      Time Left: <span className="bg-black/20 px-2 py-1 rounded">{formatTime(seconds)}</span>
    </div>
  );
};

export default Timer;