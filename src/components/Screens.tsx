import React, { useState, useEffect } from 'react';
import {
  Search,
  Map,
  Home,
  MapPin,
  User,
  Bell,
  Battery,
  Wind,
  Printer,
  Trash,
  LogIn,
  ArrowRight,
  ArrowLeft,
  Filter,
  BookOpen,
  Clock,
  Heart,
  Sliders,
  Check,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  Power,
  Eye,
  EyeOff,
  LogOut,
  ChevronRight,
  ShieldAlert,
  Compass,
  Smile,
  VolumeX,
  Volume2,
  CalendarDays
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Desk, Floor, AppNotification, FilterOptions, Language, ScreenId } from '../types';
import { FAQS } from '../data';

interface ScreensProps {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  userProfile: any;
  desks: Desk[];
  setDesks: React.Dispatch<React.SetStateAction<Desk[]>>;
  floors: Floor[];
  notifications: AppNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<AppNotification[]>>;
  selectedFloorId: string;
  setSelectedFloorId: (id: string) => void;
  selectedDesk: Desk | null;
  setSelectedDesk: (desk: Desk | null) => void;
  activeDeskSession: { deskId: string; startTime: Date; hasBelongingsTimer: boolean; timeLeftSec: number } | null;
  setActiveDeskSession: React.Dispatch<React.SetStateAction<{ deskId: string; startTime: Date; hasBelongingsTimer: boolean; timeLeftSec: number } | null>>;
  onLogin: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

export default function Screens({
  currentScreen,
  setCurrentScreen,
  language,
  setLanguage,
  userProfile,
  desks,
  setDesks,
  floors,
  notifications,
  setNotifications,
  selectedFloorId,
  setSelectedFloorId,
  selectedDesk,
  setSelectedDesk,
  activeDeskSession,
  setActiveDeskSession,
  onLogin,
  onLogout,
  isLoggedIn
}: ScreensProps) {

  // Search queries and filters
  const [filters, setFilters] = useState<FilterOptions>({
    quietArea: false,
    groupArea: false,
    powerOutlet: false,
    windowSide: false,
    accessible: false,
  });
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Local state for FAQs
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Local user settings
  const [enableSound, setEnableSound] = useState(true);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [notifPreferences, setNotifPreferences] = useState({
    seatAlerts: true,
    warnings: true,
    staffMails: true,
  });

  // Navigation simulated steps
  const [navStep, setNavStep] = useState(0);

  // Translations
  const t = {
    en: {
      loginTitle: 'Sign In',
      loginSub: 'Plan your study space in seconds, maximize your focus productivity.',
      emailPlaceholder: 'Student Email (e.g., student@uni.edu)',
      idPlaceholder: 'Student Number / ID',
      passPlaceholder: 'Password',
      continueUni: 'Continue with University Account',
      rememberMe: 'Remember Me',
      forgotPass: 'Forgot Password?',
      loginBtn: 'Sign In',
      noAccount: 'Don\'t have an account?',
      register: 'Sign Up',
      deskAvailable: 'Available Desks',
      floorsAvailable: 'Floor Space',
      findDesk: 'Find Desk',
      viewFloors: 'Floor Selection',
      myDesk: 'My Desk',
      openingHrs: 'Library Opening Hours',
      notifications: 'Notifications',
      profile: 'Profile',
      quickActions: 'Quick Actions',
      available: 'Available',
      occupied: 'Occupied',
      belongings: 'Temporarily Unavailable',
      outOfService: 'Out of Service',
      quiet: 'Quiet Area',
      group: 'Group Work Area',
      outlet: 'Power Outlet',
      window: 'Window View',
      accessible: 'Accessible',
      settings: 'Settings',
      language: 'Language',
      helpFaq: 'Help & FAQ',
      release: 'Release Desk',
      absentWarning: 'Do not leave your belongings empty for over 15 minutes!',
      timerTitle: 'Active Desk Timer',
      occupiedBy: 'Occupied by',
      navigate: 'Navigate to Desk',
      stepByStep: 'Indoor Navigation Steps',
      estTime: 'Est. walking time',
      fromEntrance: 'From Ground Floor Lobby Entrance',
      floorRoute: 'Route to Floor',
      activeNotifications: 'Active Alerts',
      emptyStateNotif: 'All caught up! No new notifications.',
      save: 'Apply',
      clear: 'Clear',
      filterTitle: 'Filter Spaces',
      areaType: 'Area Type',
      features: 'Features',
      deskDetails: 'Desk Details',
      deskNo: 'Desk No',
      nearbyFac: 'Nearby Facilities',
      leavesBtn: 'I am leaving temporarily',
      returningTimer: 'Temporary Absence Timer',
      absentText: 'The camera detected only your belongings. Return before the slot is made available to others.',
      privacyMode: 'Privacy Guaranteed: Computer vision analyzes frames inside the camera and instantly deletes video feed.',
      welcomeBack: 'Welcome back,',
      occupancyText: 'Library Occupancy',
      mediumDensity: 'Medium Density',
      highDensity: 'High Density',
      lowDensity: 'Low Density',
      openBad: 'Open Now',
      allFloor: 'All Floors',
      back: 'Back',
      sound: 'Alert Sound Effects',
      highColorContrast: 'Accessibility High Contrast Mode',
      contactSupport: 'Need physical assistance? Ask support staff near desk #1.',
      staffAnnounce: 'Messages from Library Staff'
    },
    tr: {
      loginTitle: 'Giriş Yap',
      loginSub: 'Çalışma alanınızı önceden ayırtın, zamanınızı verimli kullanın.',
      emailPlaceholder: 'Öğrenci Numarası / E-posta',
      idPlaceholder: 'Öğrenci Numarası / ID',
      passPlaceholder: 'Şifre',
      continueUni: 'Tek Tıkla Üniversite Hesabıyla Bağlan',
      rememberMe: 'Beni Hatırla',
      forgotPass: 'Şifremi Unuttum?',
      loginBtn: 'Giriş Yap',
      noAccount: 'Hesabınız yok mu?',
      register: 'Kayıt Ol',
      deskAvailable: 'Boş Masa Sayısı',
      floorsAvailable: 'Masa Bul',
      findDesk: 'Masa Bul',
      viewFloors: 'Kat Seçimi',
      myDesk: 'Masam',
      openingHrs: 'Kütüphane Çalışma Saatleri',
      notifications: 'Bildirimler',
      profile: 'Profil',
      quickActions: 'Hızlı İşlemler',
      available: 'Boş',
      occupied: 'Dolu',
      belongings: 'Rezerve (Eşya Var)',
      outOfService: 'Servis Dışı',
      quiet: 'Sessiz Çalışma Alanı',
      group: 'Grup Çalışma Alanı',
      outlet: 'Priz',
      window: 'Pencere Kenarı',
      accessible: 'Engelli Dostu',
      settings: 'Ayarlar',
      language: 'Dil',
      helpFaq: 'Yardım & Destek',
      release: 'Masayı Serbest Bırak',
      absentWarning: 'Masayı boş bırakırsanız sistem eşyalarınızı algılayıp geri sayım başlatır!',
      timerTitle: 'Masa Kullanım Süresi',
      occupiedBy: 'Kullanan',
      navigate: 'Seç ve Yol Tarifi Al',
      stepByStep: 'Adım Adım Yol Tarifi',
      estTime: 'Tahmini yürüme süresi',
      fromEntrance: 'Zemin Kat Giriş Turnikelerinden Itibaren',
      floorRoute: 'Kattaki Güzergahı',
      activeNotifications: 'Aktif Uyarılar',
      emptyStateNotif: 'Yeni bildiriminiz bulunmuyor!',
      save: 'Uygula',
      clear: 'Temizle',
      filterTitle: 'Filtrele',
      areaType: 'Alan Türü',
      features: 'Özellikler',
      deskDetails: 'Masa Detayı',
      deskNo: 'Masa No',
      nearbyFac: 'Yakındaki Özellikler',
      leavesBtn: 'Geçici Olarak Ayrılıyorum',
      returningTimer: 'Geçici Ayrılış Sayacı',
      absentText: 'Kamera masada yalnızca eşyalar tespit etti. Masa boşa çıkarılmadan önce geri dönmelisiniz.',
      privacyMode: 'Gizlilik Garantisi: Kameralar görüntüleri anlık işler ve video kaydetmez.',
      welcomeBack: 'Merhaba,',
      occupancyText: 'Kütüphane Doluluk Durumu',
      mediumDensity: 'Orta Yoğunluk',
      highDensity: 'Yüksek Yoğunluk',
      lowDensity: 'Düşük Yoğunluk',
      openBad: 'Açık',
      allFloor: 'Kütüphane Geneli',
      back: 'Geri',
      sound: 'Bildirim Ses Efektleri',
      highColorContrast: 'Yüksek Karşıtlık Modu (Erişilebilirlik)',
      contactSupport: 'Fiziksel yardıma mı ihtiyacınız var? Görevli masasına başvurun.',
      staffAnnounce: 'Kütüphane Yönetiminden Mesajlar'
    }
  };

  const currText = t[language];

  // Auto-login handler for easy demo flow
  const handleAutoLogin = () => {
    setLoginEmail('beyza@example.com');
    setStudentId('2021123456');
    setLoginPassword('password123');
    onLogin();
    setCurrentScreen('dashboard');
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError(language === 'tr' ? 'Lütfen tüm alanları doldurun.' : 'Please fill in all fields.');
      return;
    }
    onLogin();
    setCurrentScreen('dashboard');
  };

  // Live filtered desks
  const filteredDesks = desks.filter((desk) => {
    if (selectedFloorId && desk.floorId !== selectedFloorId) return false;
    if (filters.quietArea && desk.type !== 'quiet') return false;
    if (filters.groupArea && desk.type !== 'group') return false;
    if (filters.powerOutlet && !desk.hasPower) return false;
    if (filters.windowSide && !desk.hasWindow) return false;
    return true;
  });

  // Progress logic per floor
  const getFloorStats = (floorId: string) => {
    const floorDesks = desks.filter((d) => d.floorId === floorId);
    const total = floorDesks.length || 1;
    const available = floorDesks.filter((d) => d.status === 'available').length;
    const occupied = floorDesks.filter((d) => d.status === 'occupied').length;
    const belongings = floorDesks.filter((d) => d.status === 'belongings').length;
    const out = floorDesks.filter((d) => d.status === 'out-of-service').length;
    return {
      total,
      available,
      occupied,
      belongings,
      out,
      percentage: Math.round(((total - available) / total) * 100)
    };
  };

  // General library stats
  const totalDesks = desks.length;
  const occupiedDesksCount = desks.filter((d) => d.status === 'occupied' || d.status === 'belongings').length;
  const generalAvailability = desks.filter((d) => d.status === 'available').length;
  const generalPercentage = Math.round((occupiedDesksCount / totalDesks) * 100);

  // Sound triggering simulation helper
  const triggerNotificationSound = () => {
    if (!enableSound) return;
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, context.currentTime); // D5
      osc.frequency.setValueAtTime(880, context.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.08, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(context.destination);
      osc.start();
      osc.stop(context.currentTime + 0.4);
    } catch (e) {
      // Audio auto-play safeguards
    }
  };

  // Toggle dynamic notification sound when notifications tab loaded or clicked
  useEffect(() => {
    if (currentScreen === 'notifications') {
      const hasUnread = notifications.some(n => !n.read);
      if (hasUnread) {
        triggerNotificationSound();
      }
    }
  }, [currentScreen]);

  return (
    <div className={`w-full h-full flex flex-col justify-between ${accessibilityMode ? 'high-contrast-mode' : ''}`}>
      
      {/* Top Header Navigation (Shown inside App frames once logged in) */}
      {isLoggedIn && currentScreen !== 'login' && (
        <header className="px-5 pt-10 pb-4 bg-sky-950 text-white flex justify-between items-center relative z-20 shadow-md">
          <div className="flex items-center space-x-2">
            {currentScreen !== 'dashboard' ? (
              <button
                id="back_btn"
                onClick={() => {
                  if (currentScreen === 'detail') setCurrentScreen('map');
                  else if (currentScreen === 'navigation') setCurrentScreen('detail');
                  else setCurrentScreen('dashboard');
                }}
                className="p-1.5 hover:bg-sky-900 rounded-full transition-colors text-teal-400"
              >
                <ArrowLeft size={18} />
              </button>
            ) : (
              <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-300 font-bold border border-teal-500/20">
                BMD
              </div>
            )}
            <div>
              <h1 className="text-sm font-semibold tracking-wide">
                {currentScreen === 'dashboard' && 'BookMyDesk'}
                {currentScreen === 'floors' && currText.viewFloors}
                {currentScreen === 'map' && currText.findDesk}
                {currentScreen === 'detail' && currText.deskDetails}
                {currentScreen === 'navigation' && currText.navigate}
                {currentScreen === 'mydesk' && currText.myDesk}
                {currentScreen === 'notifications' && currText.notifications}
                {currentScreen === 'profile' && currText.profile}
              </h1>
              {currentScreen === 'dashboard' && (
                <p className="text-[10px] text-teal-300">Merkez Kütüphane / Central Library</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Language Toggle */}
            <button
              id="lang_toggle_quick"
              onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
              className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-teal-300 border border-teal-500/30 font-mono"
              title="Change Language"
            >
              {language === 'en' ? 'TR 🇹🇷' : 'EN 🇺🇸'}
            </button>

            {/* Notification alert count dot */}
            <button
              id="header_bell"
              onClick={() => setCurrentScreen('notifications')}
              className="relative p-1.5 hover:bg-sky-900 rounded-full text-slate-200 transition-colors"
            >
              <Bell size={18} />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full animate-ping" />
              )}
            </button>
          </div>
        </header>
      )}

      {/* Main Screen Scroll Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative">
        <AnimatePresence mode="wait">
          
          {/* SCREEN 1: LOGIN & SIGN UP */}
          {!isLoggedIn || currentScreen === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="min-h-full flex flex-col justify-between"
            >
              {/* Cover Background Photo */}
              <div 
                className="h-44 relative bg-cover bg-center flex flex-col justify-end p-5"
                style={{ 
                  backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80')` 
                }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/30">
                    <BookOpen size={24} className="animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white font-sans tracking-wide">BookMyDesk</h2>
                    <span className="text-[10px] text-teal-300 uppercase tracking-widest font-semibold">AI Camera Library Sense</span>
                  </div>
                </div>
                <p className="text-xs text-slate-200">{currText.loginSub}</p>
              </div>

              {/* Form Input fields */}
              <div className="bg-white rounded-t-3xl p-6 -mt-4 shadow-2xl flex-1 flex flex-col justify-between">
                <form onSubmit={handleManualLogin} className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">{currText.loginTitle}</h3>
                  
                  {loginError && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs flex items-center space-x-2">
                      <AlertTriangle size={14} />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1" htmlFor="email-input">
                      {currText.emailPlaceholder}
                    </label>
                    <input
                      id="email-input"
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder-slate-400"
                      placeholder="e.g., beyza@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1" htmlFor="student-id-input">
                      {currText.idPlaceholder}
                    </label>
                    <input
                      id="student-id-input"
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder-slate-400"
                      placeholder="Student ID (e.g. 2021123456)"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1" htmlFor="password-input">
                      {currText.passPlaceholder}
                    </label>
                    <div className="relative">
                      <input
                        id="password-input"
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder-slate-400 pr-10"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        id="show_pass_btn"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember and Forgot options */}
                  <div className="flex justify-between items-center text-xs">
                    <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                      <input id="remember-me-checkbox" type="checkbox" className="rounded text-teal-600 focus:ring-teal-500" defaultChecked />
                      <span>{currText.rememberMe}</span>
                    </label>
                    <a href="#reset" onClick={(e) => e.preventDefault()} className="text-purple-600 font-semibold hover:underline">
                      {currText.forgotPass}
                    </a>
                  </div>

                  {/* Universal Login Action */}
                  <div className="space-y-2 pt-3">
                    <button
                      type="submit"
                      id="submit_login"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all text-sm flex items-center justify-center space-x-2"
                    >
                      <span>{currText.loginBtn}</span>
                    </button>

                    <button
                      type="button"
                      id="uni_login_btn"
                      onClick={handleAutoLogin}
                      className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-medium py-2.5 rounded-xl transition-all text-xs flex items-center justify-center space-x-1"
                    >
                      <Smile size={14} className="text-indigo-600" />
                      <span className="font-semibold text-slate-700">{currText.continueUni} (Single Sign-On)</span>
                    </button>
                  </div>
                </form>

                {/* Simulated Registration Foot */}
                <div className="text-center pt-6 text-xs text-slate-500 border-t border-slate-100 mt-6">
                  <span>{currText.noAccount} </span>
                  <button
                    id="register_toggle"
                    type="button"
                    onClick={() => {
                      setLoginEmail('student@academy.edu');
                      setStudentId('20249987');
                      setLoginPassword('studentPass!');
                    }}
                    className="text-teal-600 font-bold hover:underline"
                  >
                    {currText.register}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : null}

          {/* SCREEN 2: HOME DASHBOARD */}
          {isLoggedIn && currentScreen === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 space-y-4"
            >
              {/* Welcome Banner */}
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center space-x-3">
                  <img
                    src={userProfile.avatarUrl}
                    alt={userProfile.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-400"
                  />
                  <div>
                    <div className="text-xs text-slate-500">{currText.welcomeBack}</div>
                    <div className="font-bold text-slate-900 text-base">{userProfile.name} 👋</div>
                    <div className="text-[10px] text-purple-600 font-mono font-medium">{language === 'tr' ? userProfile.departmentTr : userProfile.departmentEn}</div>
                  </div>
                </div>
              </div>

              {/* AI Camera Space Status Card. Shows overall occupied library percentage */}
              <div className="bg-gradient-to-br from-sky-950 to-slate-900 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
                {/* Visual Backdrop pattern */}
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                  <MapPin size={180} className="-mr-10 -mb-10" />
                </div>
                
                <h3 className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-1">
                  {currText.occupancyText}
                </h3>
                
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 flex justify-center">
                    {/* Ring Progress Indicator */}
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="absolute w-full h-full transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="rgba(20, 184, 166, 0.1)"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="#14b8a6"
                          strokeWidth="6"
                          strokeDasharray={2 * Math.PI * 32}
                          strokeDashoffset={2 * Math.PI * 32 * (1 - generalPercentage / 100)}
                          strokeLinecap="round"
                          fill="none"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <span className="text-base font-extrabold text-white">{generalPercentage}%</span>
                    </div>
                  </div>

                  <div className="col-span-8 space-y-1">
                    <div className="text-sm font-bold text-slate-100">
                      {occupiedDesksCount} / {totalDesks} {language === 'tr' ? 'masa dolu' : 'desks filled'}
                    </div>
                    <p className="text-xs text-slate-300">
                      {generalAvailability} {language === 'tr' ? 'boş çalışma masası mevcut.' : 'free study desks ready.'}
                    </p>
                    <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 text-[10px] space-x-1">
                      <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping" />
                      <span>{currText.mediumDensity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning Alert if Student has active warning */}
              {activeDeskSession?.hasBelongingsTimer && (
                <div 
                  onClick={() => setCurrentScreen('mydesk')}
                  className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-r-xl flex items-start space-x-3 cursor-pointer animate-pulse"
                >
                  <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={16} />
                  <div className="text-xs">
                    <span className="font-bold text-yellow-800">
                      {language === 'tr' ? 'Eşya Tespit Edildi!' : 'Belongings Timer Active!'}
                    </span>
                    <p className="text-yellow-700">
                      {language === 'tr' 
                        ? `Masadan ayrıldınız. ${Math.floor(activeDeskSession.timeLeftSec / 60)}:${(activeDeskSession.timeLeftSec % 60).toString().padStart(2, '0')} saniye kala serbest kalacaktır.`
                        : `Absent detected. Your seat will clear in ${Math.floor(activeDeskSession.timeLeftSec / 60)}:${(activeDeskSession.timeLeftSec % 60).toString().padStart(2, '0')}.`}
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Actions Panel */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{currText.quickActions}</h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    id="find_desk_btn"
                    onClick={() => {
                      setSelectedFloorId('f0'); // Default ground
                      setCurrentScreen('map');
                    }}
                    className="p-3 bg-white text-slate-800 rounded-2xl flex flex-col items-center text-center space-y-2 shadow-sm border border-slate-100 hover:border-indigo-400 transition-all"
                  >
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                      <Search size={22} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{currText.findDesk}</div>
                      <span className="text-[10px] text-slate-400">Ground/Floors</span>
                    </div>
                  </button>

                  <button
                    id="view_floors_btn"
                    onClick={() => setCurrentScreen('floors')}
                    className="p-3 bg-white text-slate-800 rounded-2xl flex flex-col items-center text-center space-y-2 shadow-sm border border-slate-100 hover:border-amber-400 transition-all"
                  >
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                      <Sliders size={22} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{currText.viewFloors}</div>
                      <span className="text-[10px] text-slate-400">{floors.length} Floors</span>
                    </div>
                  </button>

                  <button
                    id="my_desk_btn"
                    onClick={() => setCurrentScreen('mydesk')}
                    className="p-3 bg-white text-slate-800 rounded-2xl flex flex-col items-center text-center space-y-2 shadow-sm border border-slate-100 hover:border-emerald-400 transition-all"
                  >
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                      <Smile size={22} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{currText.myDesk}</div>
                      <span className="text-[10px] text-slate-400">
                        {activeDeskSession ? '# ' + desks.find(d => d.id === activeDeskSession.deskId)?.number : 'Inactive'}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Core Library opening hours */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{currText.openingHrs}</h4>
                    <p className="text-xs text-slate-500 font-mono">Weekdays: 08:00 - 23:00</p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded text-[10px] uppercase font-sans tracking-wide">
                  {currText.openBad}
                </span>
              </div>

              {/* Recent Notifications Quick Glimpse */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>{currText.staffAnnounce}</span>
                  <button id="view_all_notifs" onClick={() => setCurrentScreen('notifications')} className="text-purple-600 font-semibold hover:underline capitalize">
                    {language === 'tr' ? 'Tümü' : 'All'}
                  </button>
                </div>
                
                <div className="space-y-2">
                  {notifications.slice(0, 2).map((notif) => (
                    <div 
                      key={notif.id}
                      onClick={() => setCurrentScreen('notifications')}
                      className="bg-white p-3 rounded-xl shadow-xs border border-slate-100 flex items-start space-x-3 hover:border-slate-200 transition-all cursor-pointer"
                    >
                      <div className={`p-1.5 rounded-lg text-white ${
                        notif.type === 'alarm' ? 'bg-red-500' :
                        notif.type === 'alert' ? 'bg-orange-500' : 'bg-slate-500'
                      }`}>
                        {notif.type === 'alarm' ? <AlertTriangle size={14} /> : <Bell size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {language === 'tr' ? notif.titleTr : notif.titleEn}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {language === 'tr' ? notif.messageTr : notif.messageEn}
                        </p>
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono shrink-0 whitespace-nowrap">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy statement to prevent camera worry */}
              <div className="bg-slate-100 p-3 rounded-xl border border-dashed border-slate-200 text-[10px] text-slate-500 text-center">
                🛡️ {currText.privacyMode}
              </div>

            </motion.div>
          )}

          {/* SCREEN 3: LIBRARY FLOOR SELECTION */}
          {isLoggedIn && currentScreen === 'floors' && (
            <motion.div
              key="floors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 space-y-4"
            >
              {/* Header with active Filter triggers */}
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800">
                  {currText.viewFloors}
                </h3>
                <button
                  id="open_filter_modal"
                  onClick={() => setShowFilterModal(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 border transition-all ${
                    Object.values(filters).some(v => v)
                      ? 'bg-purple-100 text-purple-700 border-purple-300 ring-2 ring-purple-100'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Filter size={14} />
                  <span>{language === 'tr' ? 'Filtrele' : 'Filters'}</span>
                  {Object.values(filters).some(v => v) && (
                    <span className="w-2 h-2 rounded-full bg-purple-600 block" />
                  )}
                </button>
              </div>

              {/* Display showing selected filters */}
              {Object.values(filters).some(v => v) && (
                <div className="flex flex-wrap gap-1.5 p-2 bg-purple-50/50 rounded-xl border border-purple-100">
                  {filters.quietArea && <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-medium">{currText.quiet}</span>}
                  {filters.groupArea && <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-medium">{currText.group}</span>}
                  {filters.powerOutlet && <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-medium">{currText.outlet}</span>}
                  {filters.windowSide && <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-medium">{currText.window}</span>}
                  <button
                    id="clear_filters"
                    onClick={() => setFilters({
                      quietArea: false,
                      groupArea: false,
                      powerOutlet: false,
                      windowSide: false,
                      accessible: false,
                    })}
                    className="text-[10px] text-purple-600 hover:underline font-bold pl-2"
                  >
                    {currText.clear}
                  </button>
                </div>
              )}

              {/* Floors statistics & List */}
              <div className="space-y-3">
                {floors.map((floor) => {
                  const stats = getFloorStats(floor.id);
                  const titleStr = language === 'tr' ? floor.nameTr : floor.nameEn;
                  
                  return (
                    <div
                      key={floor.id}
                      onClick={() => {
                        setSelectedFloorId(floor.id);
                        setCurrentScreen('map');
                      }}
                      className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-base font-extrabold text-slate-800">{titleStr}</h4>
                          <span className="text-[10px] text-indigo-600 uppercase tracking-wider font-semibold font-mono">
                            {floor.number === 0 ? 'Entrance level' : `Level ${floor.number}`}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-slate-900">{stats.available}</span>
                          <span className="text-xs text-slate-400"> / {stats.total} {language === 'tr' ? 'boş' : 'free'}</span>
                        </div>
                      </div>

                      {/* Custom themed progress bar layout: Green is available, Red occupies, Yellow belongs */}
                      <div className="w-full h-2.5 bg-slate-100 rounded-full flex overflow-hidden mb-3">
                        <div 
                          className="bg-teal-500 transition-all duration-500" 
                          style={{ width: `${(stats.available / stats.total) * 100}%` }} 
                        />
                        <div 
                          className="bg-red-500 transition-all duration-500" 
                          style={{ width: `${(stats.occupied / stats.total) * 100}%` }} 
                        />
                        <div 
                          className="bg-amber-400 transition-all duration-500" 
                          style={{ width: `${(stats.belongings / stats.total) * 100}%` }} 
                        />
                      </div>

                      {/* Micro Legend labels beneath bar */}
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
                          <span>{stats.available} {currText.available}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                          <span>{stats.occupied} {currText.occupied}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                          <span>{stats.belongings} {language === 'tr' ? 'Eşya var' : 'With物品'}</span>
                        </span>
                      </div>

                      {/* Chevron overlay indicator */}
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 p-2 pointer-events-none text-slate-300">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Filter Backdrop Dialog modal */}
              {showFilterModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl w-full max-w-sm p-6 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <h4 className="text-base font-bold text-slate-800">{currText.filterTitle}</h4>
                      <button onClick={() => setShowFilterModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                    </div>

                    <div className="space-y-4">
                      {/* Area type checkboxes */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{currText.areaType}</span>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3 text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                              checked={filters.quietArea}
                              onChange={(e) => setFilters({ ...filters, quietArea: e.target.checked, groupArea: false })}
                            />
                            <span className="text-sm">{currText.quiet}</span>
                          </label>

                          <label className="flex items-center space-x-3 text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                              checked={filters.groupArea}
                              onChange={(e) => setFilters({ ...filters, groupArea: e.target.checked, quietArea: false })}
                            />
                            <span className="text-sm">{currText.group}</span>
                          </label>
                        </div>
                      </div>

                      {/* Feature Checklist */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{currText.features}</span>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3 text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                              checked={filters.powerOutlet}
                              onChange={(e) => setFilters({ ...filters, powerOutlet: e.target.checked })}
                            />
                            <span className="text-sm">{currText.outlet}</span>
                          </label>

                          <label className="flex items-center space-x-3 text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                              checked={filters.windowSide}
                              onChange={(e) => setFilters({ ...filters, windowSide: e.target.checked })}
                            />
                            <span className="text-sm">{currText.window}</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex space-x-3">
                      <button
                        id="reset_filters_btn"
                        onClick={() => {
                          setFilters({
                            quietArea: false,
                            groupArea: false,
                            powerOutlet: false,
                            windowSide: false,
                            accessible: false,
                          });
                          setShowFilterModal(false);
                        }}
                        className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-250 rounded-xl"
                      >
                        {currText.clear}
                      </button>
                      
                      <button
                        id="save_filters_btn"
                        onClick={() => setShowFilterModal(false)}
                        className="flex-1 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-750 rounded-xl"
                      >
                        {currText.save}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* SCREEN 4: INTERACTIVE DESK MAP */}
          {isLoggedIn && currentScreen === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 space-y-4"
            >
              {/* Floor Switcher Tabs selector header */}
              <div className="flex space-x-1.5 overflow-x-auto pb-1">
                {floors.map((floor) => (
                  <button
                    key={floor.id}
                    id={`tab_floor_${floor.number}`}
                    onClick={() => setSelectedFloorId(floor.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedFloorId === floor.id
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                        : 'bg-white text-slate-700 border border-slate-150 hover:bg-slate-50'
                    }`}
                  >
                    {language === 'tr' ? floor.nameTr : floor.nameEn}
                  </button>
                ))}
              </div>

              {/* Main Floor Blueprint Visual canvas container */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-3 relative">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 uppercase tracking-widest font-mono text-[9px]">Live Camera Mapping View</span>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-600 font-bold font-sans text-[10px]">{language === 'tr' ? 'Yapay Zeka Aktif' : 'AI Analysis Live'}</span>
                  </div>
                </div>

                {/* Simulated Map Layout Grid */}
                <div className="relative border border-slate-100 rounded-xl bg-slate-50 p-6 min-h-[220px] flex items-center justify-center">
                  <div className="absolute top-2 left-3 text-[10px] text-slate-400 font-bold border-r pr-2 shrink-0">W: North Window Side</div>
                  <div className="absolute bottom-2 right-3 text-[10px] text-slate-400 font-bold border-l pl-2 shrink-0">🚪 Hall Entrance</div>

                  {/* Silent section divider line representation */}
                  <div className="absolute inset-y-8 left-1/3 border-r border-dashed border-slate-350 flex items-center justify-center">
                    <span className="rotate-90 text-[8px] text-slate-400 uppercase font-mono tracking-widest bg-slate-50 px-2 leading-none whitespace-nowrap">
                      {language === 'tr' ? 'Sessiz Bölge' : 'Quiet Area Div'}
                    </span>
                  </div>

                  {/* Interactive Nodes Grouped */}
                  <div className="grid grid-cols-4 gap-4 w-full">
                    {filteredDesks.length === 0 ? (
                      <div className="col-span-4 py-12 text-center text-xs text-slate-500">
                        No desks match active filters on this Floor.
                      </div>
                    ) : (
                      filteredDesks.map((desk) => {
                        const isSelected = selectedDesk?.id === desk.id;
                        let statusColor = 'bg-teal-500 border-teal-600 hover:bg-teal-400 text-white';
                        if (desk.status === 'occupied') statusColor = 'bg-red-500 border-red-650 hover:bg-red-400 text-white';
                        if (desk.status === 'belongings') statusColor = 'bg-amber-400 border-amber-500 hover:bg-amber-350 text-slate-900';
                        if (desk.status === 'out-of-service') statusColor = 'bg-slate-300 border-slate-400 hover:bg-slate-200 text-slate-500';

                        return (
                          <button
                            key={desk.id}
                            id={`desk_node_${desk.number}`}
                            onClick={() => setSelectedDesk(desk)}
                            className={`p-2.5 rounded-xl border-b-4 transition-all flex flex-col items-center justify-center relative font-mono text-xs font-bold leading-none ${statusColor} ${
                              isSelected ? 'ring-4 ring-offset-2 ring-indigo-500 scale-105' : ''
                            }`}
                          >
                            <span>#{desk.number}</span>
                            
                            {/* Special icon markers on the desk nodes */}
                            <div className="flex space-x-0.5 mt-1">
                              {desk.hasPower && <Battery size={8} className="shrink-0" />}
                              {desk.hasWindow && <Wind size={8} className="shrink-0" />}
                            </div>

                            {/* Green selector glow */}
                            {isSelected && (
                              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[8px] font-sans">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Simple Map Legend matching design requirements exactly */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center pt-2 border-t border-slate-100 text-[10px] text-slate-650">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-teal-500 border border-teal-600 inline-block" />
                    <span>{currText.available}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-red-500 border border-red-600 inline-block" />
                    <span>{currText.occupied}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-amber-400 border border-amber-500 inline-block" />
                    <span>{language === 'tr' ? 'Eşya Tespit Edildi (Rezerve)' : currText.belongings}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-slate-300 border border-slate-400 inline-block" />
                    <span>{currText.outOfService}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Bottom Selected Desk Quick Summary Drawer */}
              {selectedDesk ? (
                <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-800 space-y-3 relative overflow-hidden animate-slideUp">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">
                        {language === 'tr' ? `${selectedDesk.number} No\'lu Masa` : `Desk #${selectedDesk.number}`}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {language === 'tr' ? 'Sessiz Çalışma Alanı' : selectedDesk.section}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedDesk.status === 'available' ? 'bg-teal-400/20 text-teal-300' :
                      selectedDesk.status === 'occupied' ? 'bg-red-400/20 text-red-300' :
                      selectedDesk.status === 'belongings' ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-400/20 text-slate-300'
                    }`}>
                      {selectedDesk.status === 'available' && currText.available}
                      {selectedDesk.status === 'occupied' && currText.occupied}
                      {selectedDesk.status === 'belongings' && (language === 'tr' ? 'Sadece Eşya Var (Rezerve)' : 'Belongings Detected')}
                      {selectedDesk.status === 'out-of-service' && currText.outOfService}
                    </span>
                  </div>

                  {/* Estimated Availability information as requested */}
                  <div className="text-xs text-slate-300 flex items-center space-x-2 bg-slate-800 p-2 rounded-lg">
                    <Clock size={14} className="text-teal-400" />
                    <span>
                      {selectedDesk.status === 'available' && (language === 'tr' ? 'Oturmak için tamamen boş.' : 'Ready to use now.')}
                      {selectedDesk.status === 'occupied' && (language === 'tr' ? 'Meşgul - Ortalama kullanım süresi 2 saat.' : 'Occupied. Avg duration 2 hours.')}
                      {selectedDesk.status === 'belongings' && (language === 'tr' ? `AI Geri sayım sayacı: Geri dönüş ${selectedDesk.estimatedReturnTime} içinde bekleniyor.` : `AI countdown: occupant expected back in ${selectedDesk.estimatedReturnTime}.`)}
                      {selectedDesk.status === 'out-of-service' && (language === 'tr' ? 'Bakım çalışması devam ediyor.' : 'Under maintenance.')}
                    </span>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      id="view_details_btn"
                      onClick={() => setCurrentScreen('detail')}
                      className="flex-1 py-2 text-xs font-semibold rounded-xl text-center border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200"
                    >
                      {language === 'tr' ? 'Tüm Özellikleri Gör' : 'View Details'}
                    </button>
                    {selectedDesk.status === 'available' && (
                      <button
                        id="auto_reserve_simulate"
                        onClick={() => {
                          // Simulate occupant taking seat
                          const updated = desks.map(d => {
                            if (d.id === selectedDesk.id) {
                              return { ...d, status: 'occupied' as const, occupantName: userProfile.name };
                            }
                            return d;
                          });
                          setDesks(updated);
                          
                          // Establish Session
                          setActiveDeskSession({
                            deskId: selectedDesk.id,
                            startTime: new Date(),
                            hasBelongingsTimer: false,
                            timeLeftSec: 900 // 15 mins for temporary leaves
                          });
                          
                          setCurrentScreen('mydesk');
                        }}
                        className="flex-1 py-2 text-xs font-bold rounded-xl text-center bg-indigo-600 hover:bg-indigo-750 text-white flex items-center justify-center space-x-1"
                      >
                        <Smile size={12} />
                        <span>{language === 'tr' ? 'Buraya Otur' : 'Sit at this Desk'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-100 p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-500">
                  {language === 'tr' ? 'Detayları görmek için masaya veya numaraya dokunun.' : 'Tap any desk number node on the map to inspect live properties.'}
                </div>
              )}
            </motion.div>
          )}

          {/* SCREEN 5: DESK DETAIL */}
          {isLoggedIn && currentScreen === 'detail' && selectedDesk && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-4 space-y-4"
            >
              {/* Cover Photo representation */}
              <div 
                className="h-44 rounded-2xl relative bg-cover bg-center overflow-hidden flex flex-col justify-end p-4 border border-slate-200 shadow-sm"
                style={{ 
                  backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.1), rgba(15,23,42,0.85)), url(${
                    selectedDesk.type === 'quiet' 
                      ? 'https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=600&auto=format&fit=crop&q=80'
                      : 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80'
                  })` 
                }}
              >
                {/* Visual Label overlay */}
                <div className="absolute top-3 left-3 bg-indigo-600 text-white font-mono font-bold px-2 py-1 rounded text-xs">
                  {currText.deskNo} {selectedDesk.number}
                </div>

                <div className="flex justify-between items-center text-white">
                  <div>
                    <h3 className="text-base font-extrabold text-white">
                      {language === 'tr' ? `${selectedDesk.number} No'lu Çalışma Alanı` : `Desk Block #${selectedDesk.number}`}
                    </h3>
                    <p className="text-xs text-slate-300">
                      Zemin Kat - {selectedDesk.type === 'quiet' ? currText.quiet : currText.group}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status card block */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">AI detection status</span>
                  <div className="flex items-center space-x-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      selectedDesk.status === 'available' ? 'bg-teal-500' :
                      selectedDesk.status === 'occupied' ? 'bg-red-500' : 'bg-amber-400'
                    }`} />
                    <span className="text-xs font-bold text-slate-800">
                      {selectedDesk.status === 'available' && currText.available}
                      {selectedDesk.status === 'occupied' && currText.occupied}
                      {selectedDesk.status === 'belongings' && (language === 'tr' ? 'Eşya Var (Boş)' : 'Belongings Detected')}
                    </span>
                  </div>
                </div>
                
                <p className="text-xs text-slate-600 pt-1 border-t border-slate-50">
                  {selectedDesk.status === 'available' && (language === 'tr' ? 'Bu masa tamamen boş duruyor. Doğrudan oturabilirsiniz.' : 'The library desk is currently completely empty and available for seating.')}
                  {selectedDesk.status === 'occupied' && (language === 'tr' ? 'Masa şu anda dolu. Diğer masalara bakın.' : 'The desk is occupied. Walking here might be fruitless.')}
                  {selectedDesk.status === 'belongings' && (language === 'tr' ? `Masadaki çanta/eşyalar AI tarafından fark edildi. Son ${selectedDesk.estimatedReturnTime} içinde gelinmezse boşaltılacaktır.` : `No student present, but study items detected. Active timeout counts down. Slot frees in ${selectedDesk.estimatedReturnTime}.`)}
                </p>
              </div>

              {/* Facilities grid as requested */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{currText.nearbyFac}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className={`p-3 rounded-xl flex items-center space-x-3 text-xs border ${selectedDesk.hasPower ? 'bg-teal-50/50 text-teal-900 border-teal-150' : 'bg-slate-50 text-slate-400 border-slate-150'}`}>
                    <Battery size={16} className={selectedDesk.hasPower ? 'text-teal-600' : 'text-slate-300'} />
                    <span>{currText.outlet}</span>
                  </div>

                  <div className={`p-3 rounded-xl flex items-center space-x-3 text-xs border ${selectedDesk.hasWindow ? 'bg-teal-50/50 text-teal-900 border-teal-150' : 'bg-slate-50 text-slate-400 border-slate-150'}`}>
                    <Wind size={16} className={selectedDesk.hasWindow ? 'text-teal-600' : 'text-slate-300'} />
                    <span>{currText.window}</span>
                  </div>

                  <div className={`p-3 rounded-xl flex items-center space-x-3 text-xs border ${selectedDesk.hasPrinterClose ? 'bg-teal-50/50 text-teal-900 border-teal-150' : 'bg-slate-50 text-slate-400 border-slate-150'}`}>
                    <Printer size={16} className={selectedDesk.hasPrinterClose ? 'text-teal-600' : 'text-slate-300'} />
                    <span>Printer Close</span>
                  </div>

                  <div className={`p-3 rounded-xl flex items-center space-x-3 text-xs border ${selectedDesk.hasRestroomClose ? 'bg-teal-50/50 text-teal-900 border-teal-150' : 'bg-slate-50 text-slate-400 border-slate-150'}`}>
                    <User size={16} className={selectedDesk.hasRestroomClose ? 'text-teal-600' : 'text-slate-300'} />
                    <span>Restroom 15m</span>
                  </div>
                </div>
              </div>

              {/* Primary action buttons */}
              <div className="pt-2 space-y-2">
                <button
                  id="navigate_btn_action"
                  onClick={() => {
                    setNavStep(0);
                    setCurrentScreen('navigation');
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-750 text-white font-bold py-3 rounded-xl shadow-md transition-all text-sm flex items-center justify-center space-x-2"
                >
                  <MapPin size={16} />
                  <span>{currText.navigate}</span>
                </button>

                {selectedDesk.status === 'available' && (
                  <button
                    id="direct_occupy_detail"
                    onClick={() => {
                      const updated = desks.map(d => {
                        if (d.id === selectedDesk.id) return { ...d, status: 'occupied' as const, occupantName: userProfile.name };
                        return d;
                      });
                      setDesks(updated);
                      setActiveDeskSession({
                        deskId: selectedDesk.id,
                        startTime: new Date(),
                        hasBelongingsTimer: false,
                        timeLeftSec: 900
                      });
                      setCurrentScreen('mydesk');
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center space-x-2"
                  >
                    <span>{language === 'tr' ? 'Masayı Sahiplen (Ben buradayım)' : 'Claim Desk (I am here now)'}</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* SCREEN 6: INDOOR NAVIGATION */}
          {isLoggedIn && currentScreen === 'navigation' && selectedDesk && (
            <motion.div
              key="navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 space-y-4"
            >
              {/* Header stats route summary */}
              <div className="bg-sky-950 text-white p-4 rounded-2xl shadow-sm border border-slate-800 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Selected Destination</span>
                  <h4 className="text-sm font-extrabold text-slate-100">Desk #{selectedDesk.number} ({selectedDesk.section})</h4>
                  <p className="text-xs text-slate-400">Section G — Ground Floor East Wing</p>
                </div>
                <div className="bg-slate-800/80 px-3 py-2 rounded-xl text-center shrink-0 border border-slate-700">
                  <div className="text-sm font-extrabold text-teal-300 font-mono">1 min</div>
                  <span className="text-[9px] text-slate-400 font-sans">{currText.estTime}</span>
                </div>
              </div>

              {/* Simple Step indicator view */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-4 relative">
                {/* Visual Route Pulse animation */}
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-50">
                  <Compass className="text-indigo-600 animate-spin" size={16} />
                  <span className="text-xs font-bold text-slate-700">{currText.stepByStep}</span>
                </div>

                <div className="relative pl-6 space-y-4 border-l-2 border-dashed border-indigo-100">
                  {/* Step 1 */}
                  <div className={`relative ${navStep === 0 ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                    <span className={`absolute -left-[30px] top-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${navStep >= 0 ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                      1
                    </span>
                    <div className="text-xs">
                      {language === 'tr' 
                        ? 'Ana Giriş turnikelerinden içeri girin ve sol kısımdaki danışma sırasını geçin.'
                        : 'Walk past the main entrance barrier and head left of the checkout desk.'}
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className={`relative ${navStep === 1 ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                    <span className={`absolute -left-[30px] top-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${navStep >= 1 ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                      2
                    </span>
                    <div className="text-xs">
                      {language === 'tr'
                        ? 'Sessiz Çalışma tabelalarını takip edin. Oda bölmesini solunuzda görün.'
                        : 'Follow the ceiling "Quiet Zone" signs. Keep the visual barrier to your left.'}
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className={`relative ${navStep === 2 ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
                    <span className={`absolute -left-[30px] top-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${navStep >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                      3
                    </span>
                    <div className="text-xs font-sans">
                      {language === 'tr'
                        ? `Aradığınız Masa ${selectedDesk.number}, pencere kenarında bilgisayarlı görü kamerasının tam altında sizi beklemektedir.`
                        : `Desk #${selectedDesk.number} is right ahead, positioned beneath the low-mount ceiling computer vision scanner.`}
                    </div>
                  </div>
                </div>

                {/* Simulated Step Buttons */}
                <div className="flex gap-2 pt-2 border-t border-slate-50">
                  <button
                    disabled={navStep === 0}
                    onClick={() => setNavStep(prev => Math.max(0, prev - 1))}
                    className="flex-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-250 disabled:opacity-50 text-slate-700"
                  >
                    {language === 'tr' ? 'Önceki' : 'Previous'}
                  </button>
                  
                  <button
                    disabled={navStep === 2}
                    onClick={() => setNavStep(prev => Math.min(2, prev + 1))}
                    className="flex-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-750 text-white disabled:opacity-50"
                  >
                    {language === 'tr' ? 'Sonraki Adım' : 'Next Step'}
                  </button>
                </div>
              </div>

              {/* Map view schematic snippet */}
              <div className="bg-slate-100 p-4 rounded-2xl text-center space-y-2 border border-slate-200">
                <span className="text-xs font-bold text-slate-800 flex items-center justify-center space-x-1">
                  <Map size={14} className="text-indigo-600" />
                  <span>2D Schematic Overview</span>
                </span>
                
                {/* Visual representation of current navigation target */}
                <div className="w-full bg-white h-24 rounded-xl relative overflow-hidden flex items-center justify-center border">
                  <div className="absolute w-2.5 h-2.5 bg-indigo-600 rounded-full animate-ping left-1/4 top-1/2" />
                  <div className="absolute w-2 h-2 bg-indigo-600 rounded-full left-1/4 top-1/2" />
                  
                  <div className="absolute left-1/4 top-1/2 w-20 border-b border-indigo-600 h-1 border-dashed" />
                  
                  <div className="absolute w-3 h-3 bg-teal-500 rounded-xl left-2/3 top-1/2 flex items-center justify-center text-[7px] text-white font-mono font-bold">
                    #{selectedDesk.number}
                  </div>
                  
                  <span className="text-[10px] text-slate-400 absolute bottom-2 font-mono">Simulating walking route...</span>
                </div>
              </div>

              {/* Quick simulator arrival trigger */}
              <button
                id="simulate_arrival_btn"
                onClick={() => {
                  // Sit student auto
                  const updated = desks.map(d => {
                    if (d.id === selectedDesk.id) return { ...d, status: 'occupied' as const, occupantName: userProfile.name };
                    return d;
                  });
                  setDesks(updated);
                  setActiveDeskSession({
                    deskId: selectedDesk.id,
                    startTime: new Date(),
                    hasBelongingsTimer: false,
                    timeLeftSec: 900
                  });
                  setCurrentScreen('mydesk');
                }}
                className="w-full bg-slate-900 text-teal-300 font-bold py-2.5 rounded-xl text-xs flex justify-center items-center space-x-2"
              >
                <span>🚀 Quick Simulate Arrival at Seat</span>
              </button>
            </motion.div>
          )}

          {/* SCREEN 7: MY DESK */}
          {isLoggedIn && currentScreen === 'mydesk' && (
            <motion.div
              key="mydesk"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 space-y-4"
            >
              {activeDeskSession ? (
                <>
                  {/* Detailed active desk card */}
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4 relative overflow-hidden">
                    {/* Status accent glow */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-indigo-500" />

                    <div className="flex justify-between items-start pt-2">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">CURRENTLY CLAIMED SPACE</span>
                        <h4 className="text-xl font-extrabold text-slate-900">
                          {language === 'tr' ? `${desks.find(d => d.id === activeDeskSession.deskId)?.number} No'lu Masa` : `Desk #${desks.find(d => d.id === activeDeskSession.deskId)?.number}`}
                        </h4>
                        <p className="text-xs text-slate-550">
                          Ground Floor - Quiet Zone Block A
                        </p>
                      </div>
                      <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl text-xs font-bold border border-indigo-100 shadow-xs">
                        {currText.openBad}
                      </div>
                    </div>

                    {/* Active Timer showing occupation time */}
                    <div className="bg-slate-55 flex flex-col items-center justify-center py-5 rounded-2xl border border-slate-150">
                      <span className="text-xs text-slate-500 font-medium mb-1">{currText.timerTitle}</span>
                      <div className="text-3xl font-extrabold text-slate-950 font-mono tracking-wider flex items-center space-x-1">
                        <Clock className="text-slate-400 animate-pulse" size={24} />
                        <span>01:14:48</span>
                      </div>
                    </div>

                    {/* Occupancy details */}
                    <div className="text-xs space-y-2 text-slate-600">
                      <div className="flex justify-between">
                        <span>Seat Claimant:</span>
                        <span className="font-bold text-slate-800">{userProfile.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SSO Number:</span>
                        <span className="font-bold text-slate-800 font-mono">{userProfile.studentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AI Camera State:</span>
                        <span className="text-teal-600 font-bold">🟢 Active Frame Synced</span>
                      </div>
                    </div>
                  </div>

                  {/* Warnings alert explanation */}
                  <div className="bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 flex items-start space-x-3 text-xs">
                    <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={16} />
                    <p>{currText.absentWarning}</p>
                  </div>

                  {/* Temporary leave simulator options as requested */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">AI Vision Override (Temporary Break)</h4>
                      <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-[9px] font-bold">15 MIN CAP</span>
                    </div>
                    
                    <p className="text-xs text-slate-600 leading-snug">
                      Leaving for a short print job, water run or restroom break? Let the camera AI check for your belongings so other students don't take your seat.
                    </p>

                    {activeDeskSession.hasBelongingsTimer ? (
                      <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-200">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-yellow-800 flex items-center space-x-1">
                            <Clock size={12} className="animate-spin" />
                            <span>{currText.returningTimer}</span>
                          </span>
                          <span className="font-mono font-bold text-yellow-850">
                            {Math.floor(activeDeskSession.timeLeftSec / 60)}:{(activeDeskSession.timeLeftSec % 60).toString().padStart(2, '0')} left
                          </span>
                        </div>
                        <p className="text-[10px] text-yellow-700 mt-1">
                          {currText.absentText}
                        </p>
                      </div>
                    ) : (
                      <button
                        id="leave_temp_btn"
                        onClick={() => {
                          setActiveDeskSession(prev => prev ? {
                            ...prev,
                            hasBelongingsTimer: true,
                            timeLeftSec: 900 // 15 mins start
                          } : null);

                          // Update desk data to show "belongings" on floor map
                          const updated = desks.map(d => {
                            if (d.id === activeDeskSession.deskId) {
                              return { ...d, status: 'belongings' as const };
                            }
                            return d;
                          });
                          setDesks(updated);
                        }}
                        className="w-full bg-slate-100 hover:bg-slate-205 text-slate-800 font-semibold py-2 rounded-xl transition-all text-xs flex items-center justify-center space-x-1"
                      >
                        <AlertTriangle size={14} className="text-amber-500" />
                        <span>{currText.leavesBtn}</span>
                      </button>
                    )}
                  </div>

                  {/* Primary Release Seat button */}
                  <button
                    id="release_desk_action"
                    onClick={() => {
                      // Free up desk status map
                      const updated = desks.map(d => {
                        if (d.id === activeDeskSession.deskId) {
                          return { ...d, status: 'available' as const, occupantName: undefined };
                        }
                        return d;
                      });
                      setDesks(updated);
                      setActiveDeskSession(null);
                      setSelectedDesk(null);
                      setCurrentScreen('dashboard');
                    }}
                    className="w-full bg-red-650 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center space-x-2 transition-all shadow-md"
                  >
                    <Trash size={16} />
                    <span>{currText.release}</span>
                  </button>
                </>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center border border-dashed border-slate-300">
                    <MapPin size={24} />
                  </div>
                  <div className="max-w-xs space-y-1">
                    <h4 className="text-sm font-bold text-slate-800">You are not checked in to any desk</h4>
                    <p className="text-xs text-slate-500">
                      Choose an available green desk from the floor map, seat yourself, and click "Sit at this desk" to sync camera state.
                    </p>
                  </div>
                  <button
                    id="goto_find_desk_empty"
                    onClick={() => setCurrentScreen('map')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-750 text-white font-bold rounded-xl text-xs"
                  >
                    {currText.findDesk}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* SCREEN 8: NOTIFICATIONS */}
          {isLoggedIn && currentScreen === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 space-y-4"
            >
              {/* Alert list filters and quick triggers */}
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-500 uppercase tracking-widest">{currText.activeNotifications}</span>
                <button
                  id="mark_all_read_btn"
                  onClick={() => {
                    const updated = notifications.map(n => ({ ...n, read: true }));
                    setNotifications(updated);
                  }}
                  className="text-purple-600 font-bold hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              <div className="space-y-2">
                {notifications.length === 0 ? (
                  <div className="py-8 bg-white rounded-2xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                    {currText.emptyStateNotif}
                  </div>
                ) : (
                  notifications.map((notif) => {
                    const titleText = language === 'tr' ? notif.titleTr : notif.titleEn;
                    const descText = language === 'tr' ? notif.messageTr : notif.messageEn;

                    return (
                      <div
                        key={notif.id}
                        className={`p-3.5 rounded-2xl border relative transition-all ${
                          notif.read ? 'bg-white border-slate-100 opacity-75' : 'bg-purple-50/60 border-purple-150 ring-1 ring-purple-100'
                        }`}
                      >
                        {/* Red unread marker dot */}
                        {!notif.read && (
                          <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-purple-500" />
                        )}

                        <div className="flex items-start space-x-3 pr-4">
                          <div className={`p-1.5 rounded-xl ${
                            notif.type === 'alarm' ? 'bg-red-100 text-red-700' :
                            notif.type === 'alert' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {notif.type === 'alarm' ? <AlertTriangle size={16} /> : <Bell size={16} />}
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-slate-900 leading-snug">{titleText}</h4>
                            <p className="text-[11px] text-slate-600 leading-relaxed">{descText}</p>
                            <span className="text-[9px] text-slate-400 font-mono block pt-1">{notif.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* simulated notification push warning trigger helpful to show UI */}
              <div className="bg-slate-100 rounded-xl p-3 text-center border">
                <span className="text-[10px] text-slate-550 block font-bold mb-1">PROTOTYPE SIMULATOR ASSIST:</span>
                <button
                  id="trigger_simulate_notif"
                  onClick={() => {
                    const newAlert: AppNotification = {
                      id: `n-${Date.now()}`,
                      titleEn: '⚠️ Desk #12 Timeout Releasing!',
                      titleTr: '⚠️ Masa 12 Rezerve Zaman Aşımı!',
                      messageEn: 'Your empty seat belongings reservation has expired. Returning soon recommended.',
                      messageTr: 'Boş bıraktığınız masanın eşya süresi dolmak üzere. Kısa sürede dönmeniz önerilir.',
                      time: 'Just now',
                      type: 'alarm',
                      read: false,
                    };
                    setNotifications([newAlert, ...notifications]);
                    triggerNotificationSound();
                  }}
                  className="px-3 py-1 bg-white hover:bg-slate-50 border rounded-lg text-[10px] font-bold text-slate-700"
                >
                  ⚡ Simulate Incoming Absence Timeout Alert
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 9: PROFILE AND SETTINGS */}
          {isLoggedIn && currentScreen === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 space-y-4"
            >
              {/* Profile card block */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-indigo-600"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{userProfile.name}</h3>
                  <p className="text-xs text-slate-550 font-mono">ID: {userProfile.studentId}</p>
                  <span className="bg-purple-100 text-purple-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {language === 'tr' ? userProfile.departmentTr : userProfile.departmentEn}
                  </span>
                </div>
              </div>

              {/* Language selection as requested */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{currText.language}</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="lang_en_btn"
                    onClick={() => setLanguage('en')}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 border transition-all ${
                      language === 'en'
                        ? 'bg-slate-900 border-slate-950 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>🇺🇸 English</span>
                    {language === 'en' && <Check size={12} />}
                  </button>

                  <button
                    id="lang_tr_btn"
                    onClick={() => setLanguage('tr')}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 border transition-all ${
                      language === 'tr'
                        ? 'bg-slate-900 border-slate-950 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>🇹🇷 Türkçe</span>
                    {language === 'tr' && <Check size={12} />}
                  </button>
                </div>
              </div>

              {/* Preferences checklist settings */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{currText.settings}</span>
                
                <div className="space-y-3 text-xs text-slate-700">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium">Camera Watch Alert Push Messages</span>
                    <input
                      type="checkbox"
                      className="rounded text-teal-650 h-4 w-4 focus:ring-teal-500"
                      checked={notifPreferences.seatAlerts}
                      onChange={(e) => setNotifPreferences({ ...notifPreferences, seatAlerts: e.target.checked })}
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium">Absence Timeout Seat Recovery Warnings</span>
                    <input
                      type="checkbox"
                      className="rounded text-teal-650 h-4 w-4 focus:ring-teal-500"
                      checked={notifPreferences.warnings}
                      onChange={(e) => setNotifPreferences({ ...notifPreferences, warnings: e.target.checked })}
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <span>{currText.sound}</span>
                    <button
                      id="sound_toggle_btn"
                      onClick={() => setEnableSound(!enableSound)}
                      className="p-1 rounded bg-slate-100 hover:bg-slate-200"
                    >
                      {enableSound ? <Volume2 size={16} className="text-indigo-600" /> : <VolumeX size={16} className="text-slate-400" />}
                    </button>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer pt-1 border-t border-slate-50">
                    <span className="text-slate-900 font-bold">{currText.highColorContrast}</span>
                    <input
                      type="checkbox"
                      className="rounded text-indigo-650 h-4 w-4 focus:ring-indigo-500"
                      checked={accessibilityMode}
                      onChange={(e) => setAccessibilityMode(e.target.checked)}
                    />
                  </label>
                </div>
              </div>

              {/* FAQs Accordion support section */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{currText.helpFaq}</span>
                
                <div className="space-y-2">
                  {FAQS.map((faq, index) => {
                    const isExpanded = expandedFaq === index;
                    const question = language === 'tr' ? faq.qTr : faq.qEn;
                    const answer = language === 'tr' ? faq.aTr : faq.aEn;

                    return (
                      <div key={index} className="border-b border-slate-100 pb-2 last:border-b-0 last:pb-0">
                        <button
                          type="button"
                          id={`faq_toggle_${index}`}
                          onClick={() => setExpandedFaq(isExpanded ? null : index)}
                          className="w-full text-left flex justify-between items-center text-xs font-bold text-slate-800 hover:text-indigo-600 py-1"
                        >
                          <span>{question}</span>
                          <span className="font-mono text-slate-400 text-sm leading-none pl-1">{isExpanded ? '−' : '+'}</span>
                        </button>
                        {isExpanded && (
                          <p className="text-[11px] text-slate-600 pt-1 leading-relaxed animate-fadeIn">
                            {answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                  {currText.contactSupport}
                </div>
              </div>

              {/* Sign out */}
              <button
                id="sign_out_btn"
                onClick={() => {
                  onLogout();
                  setCurrentScreen('login');
                }}
                className="w-full py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all"
              >
                <LogOut size={14} />
                <span>{language === 'tr' ? 'Çıkış Yap' : 'Sign Out Profile'}</span>
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Bottom Sticky Mobile Platform Navigation Bar */}
      {isLoggedIn && currentScreen !== 'login' && (
        <nav className="bg-white border-t border-slate-100 px-4 py-2.5 flex justify-between items-center relative z-10 shadow-lg shrink-0">
          <button
            id="nav_item_dashboard"
            onClick={() => setCurrentScreen('dashboard')}
            className={`flex flex-col items-center flex-1 transition-all ${
              currentScreen === 'dashboard' ? 'text-indigo-600 scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Home size={20} />
            <span className="text-[9px] font-medium mt-1">
              {language === 'tr' ? 'Ana Sayfa' : 'Home'}
            </span>
          </button>

          <button
            id="nav_item_map"
            onClick={() => {
              setSelectedFloorId('f0');
              setCurrentScreen('map');
            }}
            className={`flex flex-col items-center flex-1 transition-all ${
              currentScreen === 'map' || currentScreen === 'detail' || currentScreen === 'navigation' ? 'text-indigo-600 scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <MapPin size={20} />
            <span className="text-[9px] font-medium mt-1">
              {language === 'tr' ? 'Masa Bul' : 'Find Desk'}
            </span>
          </button>

          <button
            id="nav_item_mydesk"
            onClick={() => setCurrentScreen('mydesk')}
            className={`flex flex-col items-center flex-1 transition-all ${
              currentScreen === 'mydesk' ? 'text-indigo-600 scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <CalendarDays size={20} />
            <span className="text-[9px] font-medium mt-1">
              {language === 'tr' ? 'Masam' : 'My Desk'}
            </span>
          </button>

          <button
            id="nav_item_profile"
            onClick={() => setCurrentScreen('profile')}
            className={`flex flex-col items-center flex-1 transition-all ${
              currentScreen === 'profile' ? 'text-indigo-600 scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <User size={20} />
            <span className="text-[9px] font-medium mt-1">
              {language === 'tr' ? 'Profil' : 'Profile'}
            </span>
          </button>
        </nav>
      )}
    </div>
  );
}
