import React, { useState, useEffect } from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const [time, setTime] = useState('');

  // Update mock status bar clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const minStr = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minStr}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto w-[360px] h-[760px] bg-slate-950 rounded-[50px] p-3.5 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.6)] border-4 border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden">
      
      {/* Speaker and Camera Sensor Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center space-x-1.5">
        <div className="w-12 h-1 bg-slate-800 rounded-full" />
        <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-800" />
      </div>

      {/* Internal Phone Workspace */}
      <div className="relative flex-1 bg-slate-50 rounded-[38px] overflow-hidden flex flex-col shadow-inner select-none">
        
        {/* Absolute Floating Fake Hardware Status Bar */}
        <div className="absolute top-2 inset-x-5 flex justify-between items-center text-[11px] font-sans font-bold text-slate-800 z-40 select-none pointer-events-none mix-blend-difference">
          <span className="text-white drop-shadow-xs">{time || '09:41'}</span>
          <div className="flex items-center space-x-1.5 text-white drop-shadow-xs">
            {/* WiFi Wave icon */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 21l-12-12c4.14-4.14 10.86-4.14 15 0l4.5 4.5c.39.39.39 1.02 0 1.41s-1.02.39-1.41 0l-3.09-3.09c-3.12-3.12-8.19-3.12-11.31 0s-3.12 8.19 0 11.31l11.31 11.31-3 3z" />
            </svg>
            {/* Cellular Bars */}
            <div className="flex space-x-0.5 items-end h-2.5">
              <div className="w-0.5 h-1 bg-current" />
              <div className="w-0.5 h-1.5 bg-current" />
              <div className="w-0.5 h-2 bg-current" />
              <div className="w-0.5 h-2.5 bg-current" />
            </div>
            {/* Battery block */}
            <div className="w-5 h-2.5 border border-current rounded-sm p-0.5 flex items-center pr-0.5">
              <div className="h-full w-full bg-current rounded-2xs" style={{ width: '85%' }} />
              <div className="w-0.5 h-1 bg-current -mr-0.5 rounded-r-3xs shrink-0" />
            </div>
          </div>
        </div>

        {/* Dynamic Nested Screen Component */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {/* Floating Home indicator bar at bottom */}
        <div className="absolute bottom-1 bg-slate-800/20 hover:bg-slate-800/40 w-28 h-1 rounded-full left-1/2 -translate-x-1/2 z-40 cursor-default transition-all" />
      </div>
    </div>
  );
}
