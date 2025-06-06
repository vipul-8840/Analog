import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  const digitalTime = time.toLocaleTimeString();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Analog Clock */}
      <div className="relative w-64 h-64 border-4 border-white rounded-full flex items-center justify-center">
        {/* Clock center */}
        <div className="absolute w-3 h-3 bg-white rounded-full z-50" />

        {/* Hour hand */}
        <div
          className="absolute w-2 h-20 bg-white origin-bottom"
          style={{ transform: `rotate(${hourDeg}deg)` }}
        />

        {/* Minute hand */}
        <div
          className="absolute w-1.5 h-28 bg-blue-400 origin-bottom"
          style={{ transform: `rotate(${minuteDeg}deg)` }}
        />

        {/* Second hand */}
        <div
          className="absolute w-1 h-32 bg-red-500 origin-bottom"
          style={{ transform: `rotate(${secondDeg}deg)` }}
        />

        {/* Clock numbers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i + 1) * 30;
          const x = 100 * Math.sin((angle * Math.PI) / 180);
          const y = -100 * Math.cos((angle * Math.PI) / 180);
          return (
            <div
              key={i}
              className="absolute text-white font-semibold"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>

      {/* Digital Clock */}
      <div className="mt-8 text-4xl font-mono">{digitalTime}</div>
    </div>
  );
};

export default Clock;
