import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Settings, 
  HelpCircle, 
  Tv, 
  Camera, 
  UserCheck, 
  BellRing, 
  TrendingUp, 
  Languages, 
  RefreshCw, 
  HelpCircle as HelpIcon,
  Smile,
  ShieldCheck,
  Zap,
  Activity,
  Heart
} from 'lucide-react';

import PhoneFrame from './components/PhoneFrame';
import Screens from './components/Screens';
import { DESKS, FLOORS, INITIAL_NOTIFICATIONS, INITIAL_USER } from './data';
import { Desk, AppNotification, ScreenId, Language } from './types';

export default function App() {
  // Lang & Screen states
  const [language, setLanguage] = useState<Language>('en');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Core application data synchronized live
  const [desks, setDesks] = useState<Desk[]>(DESKS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [selectedFloorId, setSelectedFloorId] = useState<string>('f0');
  
  // Start with Ground Floor Desk 12 selected for high-fidelity parity
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(DESKS[0]); 

  // Active Desk checked-in session state
  const [activeDeskSession, setActiveDeskSession] = useState<{
    deskId: string;
    startTime: Date;
    hasBelongingsTimer: boolean;
    timeLeftSec: number;
  } | null>(null);

  // Live Auto-simulation Traffic engine flag
  const [liveTrafficRunning, setLiveTrafficRunning] = useState<boolean>(false);
  const [aiLogFeed, setAiLogFeed] = useState<string[]>([
    '[AI Init] Computer vision overhead cameras initialized.',
    '[AI Sense] Model weight check: Yolov8-LibrarySpace loaded successfully.',
    '[AI Track] Ground Floor segment camera #1 mapped 7 targets.',
  ]);

  // Logging utility for user visual feedback
  const pushAiLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setAiLogFeed(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 10)]);
  };

  // 1. Live Countdown Timer effect for belongings timeout
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeDeskSession && activeDeskSession.hasBelongingsTimer) {
      interval = setInterval(() => {
        setActiveDeskSession(prev => {
          if (!prev) return null;
          if (prev.timeLeftSec <= 1) {
            // Releasing seat automatically when timer runs out
            pushAiLog(`[AI Timeout Release] Seat #${desks.find(d => d.id === prev.deskId)?.number} belongings timeout reached! Publicly released.`);
            
            // Release desk in the master array
            setDesks(currDesks => currDesks.map(d => {
              if (d.id === prev.deskId) {
                return { ...d, status: 'available' };
              }
              return d;
            }));

            // Push a warning notification
            const expireNotif: AppNotification = {
              id: `expire-${Date.now()}`,
              titleEn: '⚠️ Desk Reservation Expired!',
              titleTr: '⚠️ Masa Rezervasyonunuz Sonlandırıldı!',
              messageEn: `Desk #${desks.find(d => d.id === prev.deskId)?.number} has been released as you exceeded your 15 minutes absence allowance.`,
              messageTr: `${desks.find(d => d.id === prev.deskId)?.number} No'lu masa, 15 dakikalık maksimum ayrılma süresini aştığınız için serbest bırakılmıştır.`,
              time: 'Just now',
              type: 'alarm',
              read: false,
            };
            setNotifications(prevNotifs => [expireNotif, ...prevNotifs]);

            return null;
          }
          return {
            ...prev,
            timeLeftSec: prev.timeLeftSec - 1
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeDeskSession, desks]);

  // 2. Randomized Live Library traffic model simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (liveTrafficRunning) {
      interval = setInterval(() => {
        // Find a random desk
        const randomIndex = Math.floor(Math.random() * desks.length);
        const targetDesk = desks[randomIndex];
        const statusPool: ('available' | 'occupied' | 'belongings')[] = ['available', 'occupied', 'belongings'];
        
        // Pick new random status different from current
        const matchingStatuses = statusPool.filter(s => s !== targetDesk.status);
        const newStatus = matchingStatuses[Math.floor(Math.random() * matchingStatuses.length)];

        setDesks(curr => curr.map((d, index) => {
          if (index === randomIndex) {
            pushAiLog(`[Camera Detect] Mapped space status change on Desk #${d.number} (${FLOORS.find(f => f.id === d.floorId)?.nameEn}) -> ${newStatus.toUpperCase()}`);
            
            // Trigger student push alert if of interest
            if (newStatus === 'available') {
              const alertChance = Math.random() > 0.4;
              if (alertChance) {
                const liveNotif: AppNotification = {
                  id: `live-${Date.now()}`,
                  titleEn: `Desk #${d.number} is free! 🟢`,
                  titleTr: `${d.number} No'lu Masa Boşaldı! 🟢`,
                  messageEn: `AI camera noticed floor #${FLOORS.find(f => f.id === d.floorId)?.number} workspace #${d.number} is fully vacated.`,
                  messageTr: `Yapay zeka kat #${FLOORS.find(f => f.id === d.floorId)?.number} üzerinde bulunan ${d.number} No'lu masanın boşaldığını saptadı.`,
                  time: 'Just now',
                  type: 'alert',
                  read: false,
                };
                setNotifications(prev => [liveNotif, ...prev]);
              }
            }
            return { ...d, status: newStatus };
          }
          return d;
        }));
      }, 12000);
    }
    return () => clearInterval(interval);
  }, [liveTrafficRunning, desks]);

  // Handle setting a desk manually in the Control Center panel
  const handleModifyDeskStatus = (deskId: string, status: 'available' | 'occupied' | 'belongings' | 'out-of-service') => {
    setDesks(curr => curr.map(d => {
      if (d.id === deskId) {
        pushAiLog(`[Override] Desk #${d.number} status forced to ${status.toUpperCase()}`);
        return { ...d, status };
      }
      return d;
    }));
  };

  // Reset demo defaults helper
  const handleResetDemo = () => {
    setDesks(DESKS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActiveDeskSession(null);
    setSelectedDesk(DESKS[0]);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
    pushAiLog('[Demo Sync] Reset all desk coordinates & session logs to default.');
  };

  // Helper values for current floor
  const currentFloorDesks = desks.filter(d => d.floorId === selectedFloorId);
  const selectedFloorObj = FLOORS.find(f => f.id === selectedFloorId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-750 font-sans flex flex-col justify-between selection:bg-teal-400 selection:text-white">
      
      {/* Dynamic Desktop Header (Logo and Stats) - Styled for High Density Theme */}
      <header className="px-6 py-4 bg-white border-b border-slate-200 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 shadow-sm relative z-10 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-high-density-split rounded-xl flex items-center justify-center shadow-sm">
            <BookOpen className="text-white" size={20} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-tight text-sky-950">
                BookMyDesk <span className="text-teal-500 font-semibold">UniLib</span>
              </span>
              <span className="bg-[#E1EFFE] text-[#1E429F] font-mono text-[9px] px-1.5 py-0.5 rounded border border-[#BFDBFE] font-bold">CAMPUS AI v2.4</span>
            </div>
            <p className="text-xs text-slate-500">Computer Vision Library Desk Seat Status Monitor</p>
          </div>
        </div>

        {/* Global Stats indicators */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
          <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center space-x-2 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-teal-500 absolute" />
            <span className="text-slate-700">Live Mapped Desks: <b className="font-bold text-sky-950">{desks.length}</b></span>
          </div>

          <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center space-x-2 shadow-inner">
            <span className="text-slate-500">Library: </span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[9px]">Open</span>
          </div>

          <button
            onClick={handleResetDemo}
            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all text-xs font-bold border border-slate-200 shadow-sm"
            title="Reset simulation parameters"
          >
            <RefreshCw size={13} className="text-sky-950" />
            <span>Reset Demo</span>
          </button>
        </div>
      </header>

      {/* Main 3-Column Studio Grid Layout */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* COLUMN 1: INTRO & PRINCIPLES (Scope Discipline, Branding mood) */}
        <section className="lg:col-span-3 flex flex-col justify-between space-y-4">
          <div className="bg-[#D8DBEE] p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Camera size={18} className="text-teal-500 animate-pulse" />
              <h2 className="text-xs font-bold text-sky-950 uppercase tracking-wider">How BookMyDesk Works</h2>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p>
                Unlike traditional, tedious workspace reservation apps, 
                <span className="text-sky-950 font-bold"> BookMyDesk </span> does not require manually pre-booking slots hours in advance.
              </p>
              <p>
                Overhead computer vision sensor frameworks process real-time seating availability on building ceilings:
              </p>
              
              {/* Core states explanation list */}
              <div className="space-y-2 pt-1 font-sans text-[11px]">
                <div className="flex items-center space-x-3 bg-slate-50 border border-slate-100 p-2 rounded-xl">
                  <span className="w-3.5 h-3.5 rounded-full bg-teal-500 border border-white block shrink-0" />
                  <div>
                    <span className="text-teal-600 font-bold block">Available (Boş)</span>
                    <p className="text-slate-500 text-[10px] leading-tight">No objects or students detected. Fully free to study.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-50 border border-slate-100 p-2 rounded-xl">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500 border border-white block shrink-0" />
                  <div>
                    <span className="text-red-550 font-bold block" style={{ color: '#E53E3E' }}>Occupied (Dolu)</span>
                    <p className="text-slate-500 text-[10px] leading-tight">A student is currently seated studying.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-50 border border-slate-100 p-2 rounded-xl">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-white block shrink-0" />
                  <div>
                    <span className="text-amber-500 font-bold block">Belongings (Eşya Var)</span>
                    <p className="text-slate-500 text-[10px] leading-tight">Personal possessions detected, but student is away. Holds seat for 15m.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Quick UI Colors and Typography specs checklist */}
          <div className="bg-[#D8DBEE] p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 text-xs">
            <h3 className="text-xs font-bold text-sky-950 uppercase tracking-widest flex items-center space-x-2">
              <Zap size={14} className="text-purple-500 animate-pulse" />
              <span>Mobile Specifications</span>
            </h3>
            
            <ul className="space-y-1 text-[11px] text-slate-500 list-disc list-inside">
              <li>Navy Blue, Teal, Lilac palette</li>
              <li>Fully compliant Bottom Tab bar</li>
              <li>Dual Language English & Turkish mirroring</li>
              <li>Pre-seeded demo user: <i>Alex Rivers</i></li>
              <li>Accessible high-contrast settings</li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-sky-950 border border-slate-200 py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 transition-colors"
              >
                <Languages size={14} className="text-teal-500" />
                <span>Switch Language: {language === 'en' ? 'Türkçe 🇹🇷' : 'English 🇺🇸'}</span>
              </button>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 text-center uppercase tracking-widest pt-2 font-medium">
            BookMyDesk Library System
          </div>
        </section>

        {/* COLUMN 2: THE INTERACTIVE MOBILE APPLICATION */}
        <section className="lg:col-span-5 flex items-center justify-center">
          <div className="w-full max-w-sm">
            
            <div className="text-center mb-3">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-slate-800 text-teal-300 px-3 py-1 rounded-full border border-slate-700">
                Interactive mobile view
              </span>
            </div>

            {/* Smart chassis renderer */}
            <PhoneFrame>
              <Screens
                currentScreen={currentScreen}
                setCurrentScreen={setCurrentScreen}
                language={language}
                setLanguage={setLanguage}
                userProfile={INITIAL_USER}
                desks={desks}
                setDesks={setDesks}
                floors={FLOORS}
                notifications={notifications}
                setNotifications={setNotifications}
                selectedFloorId={selectedFloorId}
                setSelectedFloorId={setSelectedFloorId}
                selectedDesk={selectedDesk}
                setSelectedDesk={setSelectedDesk}
                activeDeskSession={activeDeskSession}
                setActiveDeskSession={setActiveDeskSession}
                isLoggedIn={isLoggedIn}
                onLogin={() => setIsLoggedIn(true)}
                onLogout={() => {
                  setIsLoggedIn(false);
                  setActiveDeskSession(null);
                }}
              />
            </PhoneFrame>

            <p className="text-center text-[10px] text-slate-500 mt-2">
              💡 Drag scroll or interactive tap inside app to test all 9 screens.
            </p>
          </div>
        </section>

        {/* COLUMN 3: SIMULATION CENTER & TESTBED (Override camera events, trigger notifications) */}
        <section className="lg:col-span-4 flex flex-col space-y-4">
          
          {/* AI Overhead Camera Live Feed simulation console */}
          <div className="bg-[#d8dbee] p-4 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
                <span className="text-xs font-bold text-sky-950 uppercase tracking-widest">AI Radar Event Log</span>
              </div>
              
              <button
                onClick={() => setLiveTrafficRunning(!liveTrafficRunning)}
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all shadow-sm ${
                  liveTrafficRunning 
                    ? 'bg-amber-400 text-sky-950 border border-amber-300' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {liveTrafficRunning ? '⏸ Stop Auto-Walk' : '▶ Start Auto-Walk'}
              </button>
            </div>

            {/* Simulated Live scrolling logs logs */}
            <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl h-24 overflow-y-auto font-mono text-[9px] text-slate-650 space-y-1 shadow-inner">
              {aiLogFeed.map((log, i) => (
                <div key={i} className="leading-tight break-words">
                  {log.startsWith('[Override]') || log.startsWith('[AI Timeout') ? (
                    <span className="text-amber-600 font-bold">{log}</span>
                  ) : log.includes('🟢') || log.includes('AVAILABLE') ? (
                    <span className="text-teal-600 font-bold">{log}</span>
                  ) : (
                    <span className="text-slate-600">{log}</span>
                  )}
                </div>
              ))}
            </div>
            
            <p className="text-[10px] text-slate-400">
              *The live mock traffic engine mimics library motion camera analysis feed changes.
            </p>
          </div>

          {/* Interactive Seed Editor: Live click states to update phone screen */}
          <div className="bg-[#D8DBEE] p-4 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 flex-1 flex flex-col">
            <span className="text-xs font-bold text-sky-950 uppercase tracking-wider block border-b border-slate-100 pb-2">
              Simulate Camera Occupancy overrides
            </span>

            <div className="text-xs text-slate-500 leading-relaxed">
              Manually trigger library occupancy status to test how BookMyDesk's floor summaries and map colors immediately adapt.
            </div>

            {/* List of desks for Selected Floor */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[290px] min-h-[200px]">
              <span className="text-[10px] text-slate-400 block uppercase tracking-widest font-bold">
                {selectedFloorObj ? (language === 'tr' ? selectedFloorObj.nameTr : selectedFloorObj.nameEn) : 'Section'} Desks:
              </span>

              {currentFloorDesks.map(desk => {
                return (
                  <div key={desk.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div className="font-mono">
                      <span className="font-bold text-sky-950">Masa #{desk.number}</span>
                      <p className="text-[10px] text-slate-400">{desk.type === 'quiet' ? 'Silent Study' : 'Group Block'}</p>
                    </div>

                    {/* Quick State Toggle Buttons */}
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleModifyDeskStatus(desk.id, 'available')}
                        className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold transition-colors ${
                          desk.status === 'available' ? 'bg-[#4FD1C5] text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                        title="Mark Available"
                      >
                        B
                      </button>
                      
                      <button
                        onClick={() => handleModifyDeskStatus(desk.id, 'occupied')}
                        className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold transition-colors ${
                          desk.status === 'occupied' ? 'bg-[#FC8181] text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                        title="Mark Occupied"
                      >
                        D
                      </button>
                      
                      <button
                        onClick={() => handleModifyDeskStatus(desk.id, 'belongings')}
                        className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold transition-colors ${
                          desk.status === 'belongings' ? 'bg-[#F6AD55] text-sky-950 font-black' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                        title="Mark Belongings (Reserv)"
                      >
                        E
                      </button>

                      <button
                        onClick={() => handleModifyDeskStatus(desk.id, 'out-of-service')}
                        className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold transition-colors ${
                          desk.status === 'out-of-service' ? 'bg-slate-450 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                        title="Mark Out of Service"
                      >
                        S
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick action triggers */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <button
                onClick={() => {
                  // Simulate baggage warning trigger on whichever desk they sit at or selected
                  const activeId = activeDeskSession?.deskId || 'd0-12';
                  const activeNo = desks.find(d => d.id === activeId)?.number || 12;
                  
                  // Alert student timer
                  setActiveDeskSession({
                    deskId: activeId,
                    startTime: new Date(),
                    hasBelongingsTimer: true,
                    timeLeftSec: 180 // quickly simulate timeout at 3 minutes remaining
                  });

                  // Modify desk map
                  setDesks(curr => curr.map(d => {
                    if (d.id === activeId) return { ...d, status: 'belongings' };
                    return d;
                  }));

                  // Change to MyDesk route
                  setCurrentScreen('mydesk');

                  const alertNotif: AppNotification = {
                    id: `bel-${Date.now()}`,
                    titleEn: `⚠️ Empty Desk Belongings Detected: Space #${activeNo}`,
                    titleTr: `⚠️ Masada Sadece Eşya Tespit Edildi: No #${activeNo}`,
                    messageEn: `AI cameras detected your belongings on Desk #${activeNo} has no occupant. Timer starting!`,
                    messageTr: `Kameralar ${activeNo} No\'lu masada yalnız eşyalarınızı saptadı. Eşya koruma geri sayımı başladı!`,
                    time: 'Just now',
                    type: 'alarm',
                    read: false,
                  };
                  setNotifications(prev => [alertNotif, ...prev]);
                  pushAiLog(`[AI Warning] Student left space #${activeNo}. Timed belongings hold initiated.`);
                }}
                className="w-full bg-[#1A365D] hover:bg-[#2D3748] text-white py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-sm"
              >
                <BellRing size={13} className="text-[#4FD1C5]" />
                <span>Simulate Absent Student leaving Bag</span>
              </button>
            </div>
          </div>

        </section>
      </div>

      {/* Modern Compact footer element - styled for High Density Theme */}
      <footer className="py-3.5 px-6 bg-white border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 shrink-0">
        <div className="flex items-center space-x-1.5 font-medium">
          <ShieldCheck size={14} className="text-teal-500" />
          <span>Real-time library maps computed securely using Edge Cloud computing principles.</span>
        </div>
        <div className="mt-2 md:mt-0 font-mono text-[10px] text-slate-400">
          BookMyDesk © 2026 • University Campus Intelligence Framework
        </div>
      </footer>
    </div>
  );
}
