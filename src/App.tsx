import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  Compass, 
  MapPin, 
  Plane, 
  Award, 
  Sun, 
  Volume2, 
  VolumeX, 
  RotateCw, 
  Sliders, 
  Info,
  ChevronRight,
  Anchor,
  Sparkles,
  Play,
  Pause,
  Plus,
  RefreshCw,
  Clock,
  Map,
  Menu,
  X,
  ChevronDown,
  Languages
} from 'lucide-react';
import Globe, { LANDMARKS } from './components/Globe';
import { Country, FlightRoute, Landmark, QuizState } from './types';
import { getCountryMeta, COUNTRY_DETAILS_DB, getFlagEmoji } from './data';
import { audioEngine } from './utils/AudioEngine';
import { TRANSLATIONS, LANGUAGE_OPTIONS, Language } from './translations';
import { LandmarkDetailsModal } from './components/LandmarkDetailsModal';
import { LANDMARK_DETAILS_DB } from './components/LandmarkArt';
import { TravelForum } from './components/TravelForum';
import { MessageSquare, LogIn, LogOut } from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabaseClient';


// Initial global flight channels (faster default bases)
const INITIAL_ROUTES: FlightRoute[] = [
  { id: 'f-1', fromName: 'Kyoto Temple Hub', toName: 'Paris Estuary', fromCoords: [135.7681, 35.0116], toCoords: [2.3522, 48.8566], progress: 0.1, speed: 0.005 },
  { id: 'f-2', fromName: 'Great Giza Plateau', toName: 'Sydney Harbour', fromCoords: [31.1342, 29.9792], toCoords: [151.2093, -33.8688], progress: 0.45, speed: 0.004 },
  { id: 'f-3', fromName: 'Reykjavík Rift', toName: 'New York Estuary', fromCoords: [-21.9426, 64.1466], toCoords: [-74.0060, 40.7128], progress: 0.8, speed: 0.006 }
];

// Geodetic Distance computation (Great-Circle path using Spherical Law of Cosines or Haversine)
const calculateGeodeticDistance = (coords1: [number, number], coords2: [number, number]): number => {
  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

export default function App() {
  // Multilingual State Settings
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('terra_globe_language') as Language) || 'en';
  });
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Auth State (Supabase login/logout)
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Billboard Ad State - shows a real uploaded ad image when one is active in Supabase,
  // otherwise falls back to the default "contact us for ads" banner below.
  const [activeAd, setActiveAd] = useState<{ image_url: string; link_url: string | null; advertiser_name: string | null } | null>(null);

  useEffect(() => {
    supabase
      .from('billboard_ad')
      .select('image_url, link_url, advertiser_name')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error loading billboard ad:', error);
          return;
        }
        if (data && data.length > 0) {
          setActiveAd(data[0]);
        }
      });
  }, []);

  const t = TRANSLATIONS[language];

  // Navigation Tabs
  const [activeTab, setActiveTab ] = useState<'explore' | 'flight' | 'quiz' | 'time' | 'audio' | 'post'>('explore');


  // Visualization States
  const [showBorders, setShowBorders] = useState(true);
  const [showGraticule, setShowGraticule] = useState(true);
  const [showFlightArcs, setShowFlightArcs] = useState(true);
  const [showDayNight, setShowDayNight] = useState(true);
  const [simulationTime, setSimulationTime] = useState(12); // Hour of the day: 00:00 to 24:00
  const [isTimeFlowing, setIsTimeFlowing] = useState(false);

  // Globe Mechanics
  const [autoRotate, setAutoRotate] = useState(true);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(0.2);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
  const [landmarkFocus, setLandmarkFocus] = useState<Landmark | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [flightSpeedMultiplier, setFlightSpeedMultiplier] = useState(3.0); // Defaults to a snappy 3x speed multiplier

  // Landmark details overlay state
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);

  // Flight Route Simulator States
  const [flightRoutes, setFlightRoutes] = useState<FlightRoute[]>(INITIAL_ROUTES);
  const [trackedRouteId, setTrackedRouteId ] = useState<string | null>(null);
  const [globeResetKey, setGlobeResetKey] = useState(0);
  const [fromLandmarkIdx, setFromLandmarkIdx] = useState(0);
  const [toLandmarkIdx, setToLandmarkIdx] = useState(1);
  const [flightPlannerMode, setFlightPlannerMode] = useState<'beacons' | 'countries'>('beacons');
  const [fromCountryKey, setFromCountryKey] = useState("Japan");
  const [toCountryKey, setToCountryKey] = useState("Egypt");
  const [loadedCountries, setLoadedCountries] = useState<Country[]>([]);

  // Dynamically compile the set of selectable countries (merging 195+ countries)
  const selectableCountries = useMemo(() => {
    if (loadedCountries.length === 0) {
      return Object.keys(COUNTRY_DETAILS_DB);
    }
    // Pull names from GeoJSON and merge with hand-curated keys, sort alphabetically
    const allNames = Array.from(new Set([
      ...loadedCountries.map(c => c.properties?.name).filter(Boolean),
      ...Object.keys(COUNTRY_DETAILS_DB)
    ])).sort((a, b) => a.localeCompare(b));
    return allNames as string[];
  }, [loadedCountries]);

  // General resolver for dynamic coordinates & custom attributes
  const getCountryDetail = useCallback((name: string) => {
    const foundGeom = loadedCountries.find(c => c.properties?.name === name);
    let coords: [number, number] = [0, 0];
    if (foundGeom) {
      // Calculate geometric centroid dynamically with D3
      coords = d3.geoCentroid(foundGeom);
    } else if (COUNTRY_DETAILS_DB[name]) {
      coords = COUNTRY_DETAILS_DB[name].coords;
    }
    const meta = getCountryMeta(name, language);
    return {
      ...meta,
      coords
    };
  }, [loadedCountries, language]);

  // Audio Configuration
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.35);
  const [isHumming, setIsHumming] = useState(true);
  const [selectedScale, setSelectedScale] = useState<'pentatonic' | 'ambient' | 'harmonic_minor'>('pentatonic');

  // Quiz Game State (Geo Scavenger hunt)
  const [quiz, setQuiz] = useState<QuizState>({
    isActive: false,
    targetCountry: null,
    score: 0,
    highScore: Number(localStorage.getItem('terra_globe_highscore') || '0'),
    streak: 0,
    feedback: { type: null, message: 'Explore coordinates or press Start to test your global bearings.' },
    options: []
  });

  // Sound enablement helper (helps users click to fulfill autoplay policy)
  const enableAudioFeedback = useCallback(() => {
    if (!audioInitialized) {
      audioEngine.resume();
      audioEngine.setVolume(masterVolume);
      audioEngine.setHumming(isHumming);
      audioEngine.setScale(selectedScale);
      setAudioInitialized(true);
    }
    setAudioEnabled(true);
    audioEngine.triggerTick();
  }, [audioInitialized, masterVolume, isHumming, selectedScale]);

  const disableAudioFeedback = useCallback(() => {
    setAudioEnabled(false);
    audioEngine.setVolume(0);
  }, []);

  // Update volume engine when state slider changes
  useEffect(() => {
    if (audioInitialized) {
      audioEngine.setVolume(audioEnabled ? masterVolume : 0);
    }
  }, [masterVolume, audioEnabled, audioInitialized]);

  // Adjust background hum
  useEffect(() => {
    if (audioInitialized) {
      audioEngine.setHumming(audioEnabled && isHumming);
    }
  }, [isHumming, audioEnabled, audioInitialized]);

  // Map scale selection
  useEffect(() => {
    audioEngine.setScale(selectedScale);
  }, [selectedScale]);

  // Loop for Flight Path motion progress animation
  useEffect(() => {
    let animationId: number;

    const animateFlights = () => {
      setFlightRoutes((prevRoutes) =>
        prevRoutes.map((route) => {
          let nextProgress = route.progress + route.speed * flightSpeedMultiplier;
          if (nextProgress >= 1) {
            nextProgress = 0; // Seamless loop restarts flight
          }
          return { ...route, progress: nextProgress };
        })
      );
      animationId = requestAnimationFrame(animateFlights);
    };

    animationId = requestAnimationFrame(animateFlights);
    return () => cancelAnimationFrame(animationId);
  }, [flightSpeedMultiplier]);

  // Solar day/night timeline clock stepper
  useEffect(() => {
    if (!isTimeFlowing) return;

    const interval = setInterval(() => {
      setSimulationTime((prev) => {
        let nextTime = prev + 0.1;
        if (nextTime >= 24) nextTime = 0;
        return Number(nextTime.toFixed(1));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isTimeFlowing]);

  // Curated list of large recognizable countries in 110m TopoJSON
  const QUIZ_COUNTRIES = useMemo(() => [
    "Japan", "Egypt", "Iceland", "Australia", "Brazil", "Canada", 
    "South Africa", "France", "China", "India", "Greenland", "Madagascar"
  ], []);

  // Generate Multiple Choice Quiz Scenario
  const initiateQuizQuestion = useCallback((scoreOverride?: number, streakOverride?: number) => {
    const currentScore = scoreOverride !== undefined ? scoreOverride : quiz.score;
    const currentStreak = streakOverride !== undefined ? streakOverride : quiz.streak;

    // Pick random target
    const randomName = QUIZ_COUNTRIES[Math.floor(Math.random() * QUIZ_COUNTRIES.length)];

    // Pick 3 options that are not the correct one to assist
    const otherCountries = QUIZ_COUNTRIES.filter(c => c !== randomName);
    const shuffledOthers = [...otherCountries].sort(() => 0.5 - Math.random());
    const finalOptions = [randomName, shuffledOthers[0], shuffledOthers[1], shuffledOthers[2]]
      .sort(() => 0.5 - Math.random());

    // Localized target name
    const localizedTarget = getCountryMeta(randomName, language).name;

    setQuiz(prev => ({
      ...prev,
      isActive: true,
      targetCountry: { id: randomName, name: randomName },
      score: currentScore,
      streak: currentStreak,
      feedback: {
        type: 'neutral',
        message: t.quizNeutralMsg
      },
      options: finalOptions
    }));

    // Soft chime notifying the question
    if (audioEnabled) {
      audioEngine.triggerTick();
    }
  }, [QUIZ_COUNTRIES, quiz.score, quiz.streak, audioEnabled, language, t]);

  // Handle Answer Selection or Direct Map Clicking
  const handleCountryGuess = useCallback((countryName: string) => {
    if (!quiz.targetCountry) return;

    const isCorrect = countryName.toLowerCase() === quiz.targetCountry.name.toLowerCase();

    if (isCorrect) {
      const nextScore = quiz.score + 100 + (quiz.streak * 20);
      const nextStreak = quiz.streak + 1;
      const nextHighScore = Math.max(quiz.highScore, nextScore);
      
      localStorage.setItem('terra_globe_highscore', String(nextHighScore));

      if (audioEnabled) {
        audioEngine.triggerSuccess();
      }

      const targetLocalized = getCountryMeta(quiz.targetCountry.name, language).name;

      setQuiz(prev => ({
        ...prev,
        score: nextScore,
        streak: nextStreak,
        highScore: nextHighScore,
        feedback: {
          type: 'success',
          message: t.quizSuccessMsg
            .replace("{target}", targetLocalized)
            .replace("{streak}", String(nextStreak))
            .replace("{pts}", String(100 + (nextStreak - 1) * 20))
        }
      }));

      // Delay briefly to show achievement before rotating to a new question
      setTimeout(() => {
        initiateQuizQuestion(nextScore, nextStreak);
      }, 2500);

    } else {
      if (audioEnabled) {
        audioEngine.triggerFailure();
      }

      const correctLocalized = getCountryMeta(quiz.targetCountry.name, language).name;
      const clickedLocalized = getCountryMeta(countryName, language).name;

      setQuiz(prev => ({
        ...prev,
        streak: 0,
        feedback: {
          type: 'error',
          message: t.quizIncorrectMsg
            .replace("{clicked}", clickedLocalized)
            .replace("{target}", correctLocalized)
        }
      }));
    }
  }, [quiz, audioEnabled, initiateQuizQuestion, language, t]);

  const handleGlobeCountryClick = (clickedCountry: Country) => {
    const name = clickedCountry.properties?.name || "Unknown Land";
    
    if (quiz.isActive && quiz.targetCountry) {
      // Evaluate direct map click
      handleCountryGuess(name);
    } else {
      // Normal click behavior
      setSelectedCountry(clickedCountry);
    }
  };

  // Switch Quiz state on/off
  const toggleQuizMode = () => {
    audioEngine.triggerTick();
    if (quiz.isActive) {
      setQuiz(prev => ({ ...prev, isActive: false, feedback: { type: null, message: "Quiz ended. Return to free coordinate exploration." } }));
    } else {
      initiateQuizQuestion(0, 0); // start new game
    }
  };

  // Custom User Flight Route Creator
  const establishCustomFlight = () => {
    const fromLm = LANDMARKS[fromLandmarkIdx];
    const toLm = LANDMARKS[toLandmarkIdx];

    if (fromLm.name === toLm.name) {
      alert(t.alertDifferentHubs);
      return;
    }

    const newRoute: FlightRoute = {
      id: `custom-${Date.now()}`,
      fromName: fromLm.name,
      toName: toLm.name,
      fromCoords: fromLm.coords,
      toCoords: toLm.coords,
      progress: 0.0,
      // Random delicate speed to cycle naturally
      speed: 0.003 + Math.random() * 0.0025
    };

    setFlightRoutes(prev => [newRoute, ...prev.slice(0, 10)]); // cap routes to 11 to protect drawing load
    audioEngine.triggerTick();
    
    // Lock track camera target on the newly created flight
    setLandmarkFocus(null);
    setTrackedRouteId(newRoute.id);
  };

  // Custom Country to Country Flight Creator
  const establishCustomCountryFlight = () => {
    const fromMeta = getCountryDetail(fromCountryKey);
    const toMeta = getCountryDetail(toCountryKey);

    if (!fromMeta || !toMeta) return;

    if (fromCountryKey === toCountryKey) {
      alert(language === 'zh' ? "请选择不同的出发国家和目的国家。" : "Please select different departure and destination countries.");
      return;
    }

    const firstWord = (str: string) => str.split(/[\s,，]+/)[0];

    const newRoute: FlightRoute = {
      id: `custom-country-${Date.now()}`,
      fromName: firstWord(fromMeta.name),
      toName: firstWord(toMeta.name),
      fromCoords: fromMeta.coords,
      toCoords: toMeta.coords,
      progress: 0.0,
      speed: 0.003 + Math.random() * 0.0022
    };

    setFlightRoutes(prev => [newRoute, ...prev.slice(0, 10)]); 
    audioEngine.triggerTick();

    // Lock track camera target on the newly created flight
    setLandmarkFocus(null);
    setTrackedRouteId(newRoute.id);
  };

  const fromCountryDetail = getCountryDetail(fromCountryKey);
  const toCountryDetail = getCountryDetail(toCountryKey);
  
  const geodeticDistance = useMemo(() => {
    if (!fromCountryDetail || !toCountryDetail) return 0;
    return calculateGeodeticDistance(fromCountryDetail.coords, toCountryDetail.coords);
  }, [fromCountryDetail, toCountryDetail]);

  const geodeticDistanceNm = useMemo(() => {
    return Math.round(geodeticDistance * 0.539957);
  }, [geodeticDistance]);

  // Clean formatted text parser
  const selectedMeta = selectedCountry 
    ? getCountryMeta(selectedCountry.properties?.name || "Unknown", language)
    : null;

  // Landmark click handler to launch detailed sketching metadata
  const handleLandmarkClick = (lm: Landmark) => {
    audioEngine.triggerTick();
    setTrackedRouteId(null);
    setLandmarkFocus(lm);
    setSelectedLandmark(lm);
  };

  const handleFocusGlobeFromModal = (lm: Landmark) => {
    audioEngine.triggerTick();
    setTrackedRouteId(null);
    setLandmarkFocus(lm);
  };

  const handleSetFlightOriginFromModal = (lm: Landmark) => {
    audioEngine.triggerTick();
    setActiveTab('flight');
    setFlightPlannerMode('beacons');
    const index = LANDMARKS.findIndex(l => l.name === lm.name);
    if (index !== -1) {
      setFromLandmarkIdx(index);
    }
  };

  return (
    <div id="root-theme-wrapper" className="h-screen max-h-screen bg-[#F4F0EA] flex flex-col text-[#4A463F] overflow-hidden antialiased relative">
      
      {/* Background Graticule/Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#4A463F" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Corner Index */}
      <div className="absolute bottom-0 left-0 p-4 z-0 pointer-events-none">
        <div className="text-[120px] font-serif font-black opacity-[0.03] leading-none select-none">01</div>
      </div>

      {/* 1. Autoplay audio consent overlay */}
      {!audioEnabled && (
        <div id="audio-consent-alert" className="relative z-20 bg-[#EAE5DC] border-b border-[#4A463F]/10 px-6 py-2.5 flex items-center justify-between text-xs font-serif tracking-wide transition-all duration-300">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-[#8C7A6B] animate-pulse" />
            <span className="italic font-light">{t.audioConsentText}</span>
          </div>
          <button 
            id="enable-audio-hud-btn"
            onClick={enableAudioFeedback}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#4A463F] text-[#F4F0EA] rounded-none text-[10px] font-mono tracking-widest uppercase hover:bg-[#5C564E] active:scale-95 transition-all text-nowrap cursor-pointer"
          >
            <Volume2 size={11} /> {t.enableAudio}
          </button>
        </div>
      )}

      {/* 2. Top Header Navigation Banner */}
      <header id="app-top-header" className="relative z-30 border-b border-[#4A463F]/15 px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl tracking-tighter leading-none text-[#4A463F] flex items-baseline gap-2">
            TERRA <span className="font-normal italic text-[#8C7A6B]">NUCLEUS</span> 
            <span className="text-[9px] font-mono font-medium tracking-widest border border-[#4A463F]/20 px-1.5 py-0.5 rounded-none uppercase ml-2 bg-[#FCFAF6]/40">
              V4.0
            </span>
          </h1>
          <p className="text-[10px] sm:text-xs font-mono text-[#8C857B] tracking-[0.16em] uppercase">
            {language === 'zh' ? "地球模拟器" : "Earth Simulator"}
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="lang-selector-btn"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 border border-[#4A463F]/15 rounded-none bg-[#FCFAF6] text-[10px] font-mono text-[#4A463F] hover:bg-[#F4F0EA] transition-all uppercase tracking-wider cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-[#8C7A6B]" />
              <span className="font-semibold text-stone-700">{LANGUAGE_OPTIONS.find(o => o.key === language)?.label || language}</span>
              <ChevronDown className={`w-3 h-3 text-[#4A463F]/50 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)} />
                <div 
                  className="absolute right-0 mt-1.5 w-44 border border-[#4A463F]/15 rounded-none bg-[#FAF8F5] shadow-lg z-50 py-1 font-mono text-[10px] max-h-64 overflow-y-auto"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => {
                        setLanguage(option.key);
                        localStorage.setItem('terra_globe_language', option.key);
                        setIsLangDropdownOpen(false);
                        audioEngine.triggerTick();
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#F4F0EA] transition-all flex items-center justify-between cursor-pointer ${
                        language === option.key ? 'text-[#FAF8F5] bg-[#4A463F]' : 'text-[#4A463F]'
                      }`}
                    >
                      <span>{option.label}</span>
                      {language === option.key && (
                        <span className="text-[7px] border border-current px-1 font-sans leading-none opacity-80">ACTIVE</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="hidden lg:flex items-center gap-4 px-3 py-1.5 border border-[#4A463F]/10 rounded-none bg-[#FCFAF6] text-[10px] font-mono text-[#736B60]">
            <div>
              <span className="opacity-50">{t.fps}:</span> <span className="font-medium text-[#4A463F]">60/60</span>
            </div>
            <div className="w-px h-3 bg-[#4A463F]/10" />
            <div>
              <span className="opacity-50">{t.latency}:</span> <span className="font-medium text-[#4A463F]">NATIVE_CANVAS</span>
            </div>
            <div className="w-px h-3 bg-[#4A463F]/10" />
            <div>
              <span className="opacity-50">{t.chimes}:</span> <span className="font-medium text-[#4A463F]">{selectedScale.toUpperCase()}</span>
            </div>
          </div>

          {/* Quick Sound Mute Toggle */}
          <button
            id="global-audio-mute-toggle"
            onClick={audioEnabled ? disableAudioFeedback : enableAudioFeedback}
            title={audioEnabled ? "Mute chimes" : "Unmute chimes"}
            className={`p-2 rounded-none border transition-all cursor-pointer ${
              audioEnabled 
                ? 'bg-[#E3DCCE] border-[#4A463F]/30 text-[#4A463F]' 
                : 'bg-transparent border-[#4A463F]/15 text-[#4A463F]/40 hover:bg-zinc-100'
            }`}
          >
            {audioEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          {/* Core Autorotate Toggle */}
          <button
            id="global-rotation-toggle"
            onClick={() => {
              setAutoRotate(!autoRotate);
              audioEngine.triggerTick();
            }}
            title="Toggle Continuous Rotation"
            className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-none text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
              autoRotate 
                ? 'bg-[#4A463F] text-[#FAF8F5] border-[#4A463F]' 
                : 'bg-transparent border-[#4A463F]/20 text-[#4A463F] hover:bg-black/5'
            }`}
          >
            <RotateCw size={11} className={autoRotate ? "animate-spin" : ""} style={{ animationDuration: '6s' }} />
            <span>{autoRotate ? t.spinning : t.standby}</span>
          </button>

          {/* Auth Status / Login Button */}
          {user ? (
            <button
              id="global-logout-btn"
              onClick={signOut}
              title={user.email || ''}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#4A463F]/20 rounded-none text-[10px] font-mono tracking-widest uppercase text-[#4A463F] hover:bg-black/5 transition-all cursor-pointer"
            >
              <LogOut size={11} />
              <span className="max-w-[120px] truncate hidden sm:inline">{user.email}</span>
            </button>
          ) : (
            <button
              id="global-login-btn"
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4A463F] text-[#FAF8F5] border border-[#4A463F] rounded-none text-[10px] font-mono tracking-widest uppercase hover:bg-[#3a3730] transition-all cursor-pointer"
            >
              <LogIn size={11} />
              <span>{language === 'zh' ? '登录' : 'Log In'}</span>
            </button>
          )}
        </div>
      </header>

      {/* 3. Main Dashboard Workspace Layout */}
      <main id="app-workspace-area" className="relative z-10 flex-1 overflow-hidden h-full w-full bg-[#FAF8F5] flex flex-row">
        
        {/* LEFT PANEL: Controls & Interactive Tabs (Structural Flex-Row Layout) */}
        <section 
          id="sidebar-controls" 
          className={`relative border-r border-[#4A463F]/15 flex-shrink-0 flex flex-col bg-[#FCFAF6]/98 h-full z-40 transition-all duration-300 shadow-2xl ${
            isSidebarOpen ? 'w-full sm:w-[440px]' : 'w-0 overflow-hidden border-r-0 pb-0 pt-0 border-b-0'
          }`}
        >
          
          {/* Tab Selector Buttons */}
          <nav id="sidebar-tabs" className="grid grid-cols-6 border-b border-[#4A463F]/10 bg-[#FAF8F5] text-xs font-mono flex-shrink-0 relative z-20">
            {[
              { id: 'explore', icon: Compass, label: t.tabExplore },
              { id: 'flight', icon: Plane, label: t.tabFlight },
              { id: 'post', icon: MessageSquare, label: language === 'zh' ? "社区" : "BOARD" },
              { id: 'quiz', icon: Award, label: t.tabQuiz },
              { id: 'time', icon: Sun, label: t.tabSolar },
              { id: 'audio', icon: Sliders, label: t.tabAudio }
            ].map((tab) => {
              const IconComp = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  id={`tab-select-${tab.id}`}
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    audioEngine.triggerTick();
                  }}
                  className={`flex flex-col items-center justify-center py-4 px-1 border-b-2 gap-1.5 transition-all text-[9px] tracking-tight cursor-pointer ${
                    isSelected 
                      ? 'border-[#4A463F] text-[#4A463F] font-bold bg-[#FCFAF6] italic' 
                      : 'border-transparent text-[#4A463F]/40 hover:text-[#4A463F] hover:bg-[#FAF8F5]/60'
                  }`}
                >
                  <IconComp size={12} className={isSelected ? 'text-[#4A463F]' : 'text-[#4A463F]/40'} />
                  <span className="truncate w-full text-center">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Active Tab Container */}
          <div className="p-6 flex-1 flex flex-col justify-between gap-6 relative z-10 overflow-y-auto min-h-0" style={{ scrollbarWidth: 'thin' }}>

            {/* TAB CONTENT: EXPLORE & COORDINATES */}
            {activeTab === 'explore' && (
              <div id="tab-content-explore" className="space-y-6 animate-fade-in font-sans">
                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-xl tracking-tight text-[#4A463F] flex items-center gap-2">
                    <Compass size={16} className="text-[#8C7A6B]" />
                    {t.exploreTitle}
                  </h3>
                  <p className="text-xs text-[#4A463F]/75 leading-relaxed italic">
                    {t.exploreDesc}
                  </p>
                </div>

                {/* Selected Country Cards */}
                <div id="selected-destination-panel" className="border border-[#4A463F]/15 rounded-none p-5 bg-[#FCFAF6] relative overflow-hidden transition-all duration-300">
                  
                  {selectedMeta ? (
                    <div id="country-data-sheet" className="space-y-4">
                      <div className="flex items-start justify-between border-b border-[#4A463F]/10 pb-3 gap-2">
                        <div className="flex items-center gap-3">
                          {selectedMeta.flagCode ? (
                            <div className="flex-shrink-0 relative group">
                              <img 
                                src={`https://flagcdn.com/w160/${selectedMeta.flagCode}.png`}
                                alt={`${selectedMeta.name} Flag`}
                                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                className="w-12 h-8 object-cover border border-[#4A463F]/15 shadow-xs transition-transform duration-300"
                              />
                              <span className="absolute -bottom-1 -right-1 text-xs bg-[#FCFAF6]/90 border border-[#4A463F]/10 px-0.5 rounded shadow-xs font-mono leading-none">
                                {getFlagEmoji(selectedMeta.flagCode)}
                              </span>
                            </div>
                          ) : (
                            <div className="w-12 h-8 bg-[#4A463F]/5 border border-dashed border-[#4A463F]/20 flex items-center justify-center text-lg select-none">
                              🌐
                            </div>
                          )}
                          <div>
                            <span className="text-[9px] font-mono text-[#8C7A6B] uppercase tracking-wider block mb-0.5">{t.selectedLabel}</span>
                            <h4 className="font-serif text-lg font-bold tracking-tight text-[#4A463F] line-clamp-1">{selectedMeta.name}</h4>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 border border-[#4A463F]/20 text-[9px] font-mono text-[#4A463F]/70 rounded-none bg-[#F4F0EA] self-start mt-1">
                          {selectedMeta.continent}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="bg-[#FAF8F5] p-2 border border-[#4A463F]/10 rounded-none">
                          <span className="text-[#4A463F]/40 text-[9px] block mb-0.5 uppercase tracking-wider">{t.capitalLabel}</span>
                          <span className="text-[#4A463F] font-semibold truncate block">{selectedMeta.capital}</span>
                        </div>
                        <div className="bg-[#FAF8F5] p-2 border border-[#4A463F]/10 rounded-none">
                          <span className="text-[#4A463F]/40 text-[9px] block mb-0.5 uppercase tracking-wider">{t.latLongLabel}</span>
                          <span className="text-[#4A463F] font-semibold text-[11px] truncate block">
                            {selectedMeta.coords[1].toFixed(1)}°N, {selectedMeta.coords[0].toFixed(1)}°E
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <h5 className="font-mono text-[9px] text-[#8C7A6B] uppercase tracking-wider flex items-center gap-1.5">
                          <Info size={11} className="text-[#8C7A6B]" />
                          {t.geoChronicle}
                        </h5>
                        <p className="text-[#4A463F]/80 leading-relaxed font-serif font-light text-[13px]">
                          {selectedMeta.trivia}
                        </p>
                      </div>

                      {/* Geological Structure Section / 地貌特征 */}
                      {selectedMeta.geoStructure && (
                        <div className="space-y-1 text-xs border-t border-[#4A463F]/10 pt-3">
                          <h5 className="font-mono text-[9px] text-[#8C7A6B] uppercase tracking-wider flex items-center gap-1.5">
                            <Map size={11} className="text-[#8C7A6B]" />
                            {t.geoStructure}
                          </h5>
                          <p className="text-[#4A463F]/80 leading-relaxed font-serif font-light text-[12.5px]">
                            {selectedMeta.geoStructure}
                          </p>
                        </div>
                      )}

                      {/* Cultural Characteristics Section / 民族特色 */}
                      {selectedMeta.ethnicCulture && (
                        <div className="space-y-1 text-xs border-t border-[#4A463F]/10 pt-3">
                          <h5 className="font-mono text-[9px] text-[#8C7A6B] uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles size={11} className="text-[#8C7A6B]" />
                            {t.ethnicCulture}
                          </h5>
                          <p className="text-[#4A463F]/80 leading-relaxed font-serif font-light text-[12.5px]">
                            {selectedMeta.ethnicCulture}
                          </p>
                        </div>
                      )}

                      <button
                        id="deselect-focus-country-btn"
                        onClick={() => {
                          setSelectedCountry(null);
                          audioEngine.triggerTick();
                        }}
                        className="w-full py-1.5 border border-dashed border-[#4A463F]/35 hover:border-[#4A463F] text-[10px] font-mono text-[#4A463F]/60 hover:text-[#4A463F] rounded-none uppercase tracking-widest transition-all cursor-pointer bg-[#F4F0EA]/30"
                      >
                        {t.resetBtn}
                      </button>
                    </div>
                  ) : (
                    <div id="no-selection-fallback-info" className="py-6 text-center space-y-3">
                      <Anchor size={24} className="mx-auto text-[#4A463F]/25 stroke-1 animate-bounce" style={{ animationDuration: '3s' }} />
                      <p className="text-[10px] text-[#4A463F]/60 font-mono tracking-widest uppercase">
                        {t.noSelectionTitle}
                      </p>
                      <p className="text-xs text-[#4A463F]/50 max-w-xs mx-auto px-4 leading-normal font-serif italic">
                        {t.noSelectionDesc}
                      </p>
                    </div>
                  )}
                </div>

                {/* Cultural Nature Landmarks List */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#8C7A6B] uppercase tracking-wider block mb-1">
                    {t.beaconsLabel} ({LANDMARKS.length}) — <span className="font-serif italic font-light lowercase">{t.beaconsDesc}</span>
                  </span>
                  <div className="grid grid-cols-2 gap-2 h-[210px] overflow-y-auto pr-1">
                    {LANDMARKS.map((lm, idx) => {
                      const isFocused = landmarkFocus?.name === lm.name;
                      return (
                        <button
                          id={`landmark-navigate-${idx}`}
                          key={lm.name}
                          onClick={() => handleLandmarkClick(lm)}
                          onMouseEnter={() => setLandmarkFocus(lm)}
                          onMouseLeave={() => setLandmarkFocus(null)}
                          className={`p-2.5 border rounded-none text-left text-xs transition-all flex flex-col justify-between gap-1 h-20 cursor-pointer ${
                            isFocused 
                              ? 'border-[#4A463F] bg-[#FCFAF6] shadow-sm' 
                              : 'border-[#4A463F]/10 bg-[#FAF8F5]/80 hover:bg-[#F4F0EA]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-serif font-medium text-[#4A463F] line-clamp-1 truncate block text-[13px]">{lm.name}</span>
                            <ChevronRight size={10} className="text-[#4A463F]/40 shrink-0" />
                          </div>
                          <span className={`text-[8px] font-mono px-1 py-0.5 rounded-none w-max uppercase ${
                            lm.type === 'nature' ? 'bg-[#7A8C6B]/10 text-[#546247]' : 'bg-[#8C7A6B]/10 text-[#6B5A4B]'
                          }`}>
                            {lm.type}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: TRAVEL QA COMMUNITY DISCUSSION FORUM */}
            {activeTab === 'post' && (
              <div id="tab-content-post" className="space-y-6 animate-fade-in">
                <TravelForum
                  language={language}
                  selectedCountry={selectedCountry}
                  landmarkFocus={landmarkFocus}
                  onFocusCountry={(countryName) => {
                    const found = loadedCountries.find(
                      c => c.properties?.name?.toLowerCase() === countryName.toLowerCase()
                    );
                    if (found) {
                      setSelectedCountry(found);
                      const centroid = d3.geoCentroid(found);
                      setLandmarkFocus({
                        name: found.properties.name,
                        coords: centroid,
                        type: 'custom',
                        description: getCountryMeta(found.properties.name, language).trivia
                      });
                    }
                  }}
                  onFocusLandmark={(lm) => {
                    setSelectedCountry(null);
                    setLandmarkFocus(lm);
                  }}
                  availableLandmarks={LANDMARKS}
                  triggerAudioTick={() => audioEngine.triggerTick()}
                  onRequireLogin={() => setIsAuthModalOpen(true)}
                />
              </div>
            )}

            {/* TAB CONTENT: FLIGHT PATH SIMULATION */}
            {activeTab === 'flight' && (
              <div id="tab-content-flight" className="space-y-6 animate-fade-in font-sans">
                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-xl tracking-tight text-[#4A463F] flex items-center gap-1.5">
                    <Plane size={16} className="text-[#8C7A6B]" />
                    {t.flightTitle}
                  </h3>
                  <p className="text-xs text-[#4A463F]/75 leading-relaxed italic">
                    {t.flightDesc}
                  </p>
                </div>

                {/* Flight Simulation Speed controller */}
                <div className="border border-[#4A463F]/15 rounded-none p-4 bg-[#FCFAF6] space-y-3 font-mono">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-bold text-[#4A463F] uppercase tracking-wider">
                      {language === 'zh' ? "⚡ 飞行模拟速度" : "⚡ FLIGHT SIMULATION SPEED"}
                    </span>
                    <span className="text-xs font-serif font-black text-[#C25B4E]">
                      {flightSpeedMultiplier.toFixed(1)}x
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] text-[#8C7A6B]">1x</span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={flightSpeedMultiplier}
                      onChange={(e) => {
                        setFlightSpeedMultiplier(parseFloat(e.target.value));
                        audioEngine.triggerTick();
                      }}
                      className="flex-1 accent-[#C25B4E] cursor-pointer h-1.5 bg-[#EBEAE4] appearance-none rounded-none outline-none"
                    />
                    <span className="text-[9px] text-[#8C7A6B]">10x</span>
                  </div>
                  <div className="text-[9.5px] font-sans text-[#4A463F]/60 italic leading-none">
                    {language === 'zh' 
                      ? "加速/减速大圆空中航线的流动周期" 
                      : "Accelerate or decelerate geodesic airliner cycle velocities"}
                  </div>
                </div>

                {/* Planner Mode Selector Switch */}
                <div className="grid grid-cols-2 gap-2 border border-[#4A463F]/15 p-1 bg-[#FAF8F5]">
                  <button
                    id="flight-mode-btn-beacons"
                    onClick={() => {
                      setFlightPlannerMode('beacons');
                      audioEngine.triggerTick();
                    }}
                    className={`py-2 text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                      flightPlannerMode === 'beacons'
                        ? 'bg-[#4A463F] text-[#F4F0EA]'
                        : 'text-[#4A463F]/60 hover:text-[#4A463F] hover:bg-[#F4F0EA]/50'
                    }`}
                  >
                    {language === 'zh' ? "地标航灯 (BEACONS)" : "CULTURAL BEACONS"}
                  </button>
                  <button
                    id="flight-mode-btn-countries"
                    onClick={() => {
                      setFlightPlannerMode('countries');
                      audioEngine.triggerTick();
                    }}
                    className={`py-2 text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                      flightPlannerMode === 'countries'
                        ? 'bg-[#4A463F] text-[#F4F0EA]'
                        : 'text-[#4A463F]/60 hover:text-[#4A463F] hover:bg-[#F4F0EA]/50'
                    }`}
                  >
                    {language === 'zh' ? "主权测地线 (COUNTRIES)" : "GEODETIC COMPASS"}
                  </button>
                </div>

                {flightPlannerMode === 'beacons' ? (
                  /* Option A: PREDEFINED BEACONS BUILDER */
                  <div className="border border-[#4A463F]/15 rounded-none p-5 bg-[#FCFAF6] space-y-4 animate-fade-in">
                    <h4 className="font-serif text-[15px] font-medium text-[#4A463F] flex items-center gap-1.5 pb-2 border-b border-[#4A463F]/10">
                      <Plus size={14} className="text-[#8C7A6B]" />
                      {t.customBridge}
                    </h4>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-[#4A463F]/50 uppercase tracking-wider block">{t.departureHub}</label>
                        <select 
                          id="departure-hub-select"
                          value={fromLandmarkIdx} 
                          onChange={(e) => {
                            setFromLandmarkIdx(parseInt(e.target.value));
                            audioEngine.triggerTick();
                          }}
                          className="w-full p-2 bg-[#FCFAF6] border border-[#4A463F]/20 rounded-none font-serif text-xs focus:border-[#4A463F] outline-none text-[#4A463F] cursor-pointer"
                        >
                          {LANDMARKS.map((lm, i) => (
                            <option key={lm.name} value={i}>{lm.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-[#4A463F]/50 uppercase tracking-wider block">{t.destinationHub}</label>
                        <select 
                          id="destination-hub-select"
                          value={toLandmarkIdx} 
                          onChange={(e) => {
                            setToLandmarkIdx(parseInt(e.target.value));
                            audioEngine.triggerTick();
                          }}
                          className="w-full p-2 bg-[#FCFAF6] border border-[#4A463F]/20 rounded-none font-serif text-xs focus:border-[#4A463F] outline-none text-[#4A463F] cursor-pointer"
                        >
                          {LANDMARKS.map((lm, i) => (
                            <option key={lm.name} value={i}>{lm.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      id="establish-flight-route-btn"
                      onClick={establishCustomFlight}
                      className="w-full py-2.5 bg-[#4A463F] hover:bg-[#5C564E] text-[#F4F0EA] rounded-none font-mono text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.99]"
                    >
                      <MapPin size={11} /> {t.sparkBeaconBtn}
                    </button>
                  </div>
                ) : (
                  /* Option B: DETAILED GEODETIC INTER-COUNTRY DIALECTICS */
                  <div className="border border-[#4A463F]/15 rounded-none p-5 bg-[#FCFAF6] space-y-4 animate-fade-in">
                    <h4 className="font-serif text-[15px] font-medium text-[#4A463F] flex items-center gap-1.5 pb-2 border-b border-[#4A463F]/10">
                      <Sliders size={14} className="text-[#8C7A6B]" />
                      {language === 'zh' ? "设立国家测地线飞行廊道" : "Formulate Geodetic Air Corridor"}
                    </h4>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-[#4A463F]/50 uppercase tracking-wider block">
                          {language === 'zh' ? "起飞国家" : "DEPARTURE COUNTRY"}
                        </label>
                        <select 
                          id="departure-country-select"
                          value={fromCountryKey} 
                          onChange={(e) => {
                            setFromCountryKey(e.target.value);
                            audioEngine.triggerTick();
                          }}
                          className="w-full p-2 bg-[#FCFAF6] border border-[#4A463F]/20 rounded-none font-serif text-xs focus:border-[#4A463F] outline-none text-[#4A463F] cursor-pointer"
                        >
                          {selectableCountries.map((key) => {
                            const meta = getCountryDetail(key);
                            return (
                              <option key={key} value={key}>
                                {getFlagEmoji(meta.flagCode || "")} {meta.name}
                              </option>
                            );
                          })}
                        </select>
                        
                        {fromCountryDetail && (
                          <div className="text-[8.5px] font-mono text-[#8C7A6B] pt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                            {fromCountryDetail.coords[1].toFixed(2)}°{fromCountryDetail.coords[1] >= 0?'N':'S'}, {fromCountryDetail.coords[0].toFixed(2)}°{fromCountryDetail.coords[0] >= 0?'E':'W'}
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-[#4A463F]/50 uppercase tracking-wider block">
                          {language === 'zh' ? "降落国家" : "DESTINATION COUNTRY"}
                        </label>
                        <select 
                          id="destination-country-select"
                          value={toCountryKey} 
                          onChange={(e) => {
                            setToCountryKey(e.target.value);
                            audioEngine.triggerTick();
                          }}
                          className="w-full p-2 bg-[#FCFAF6] border border-[#4A463F]/20 rounded-none font-serif text-xs focus:border-[#4A463F] outline-none text-[#4A463F] cursor-pointer"
                        >
                          {selectableCountries.map((key) => {
                            const meta = getCountryDetail(key);
                            return (
                              <option key={key} value={key}>
                                {getFlagEmoji(meta.flagCode || "")} {meta.name}
                              </option>
                            );
                          })}
                        </select>

                        {toCountryDetail && (
                          <div className="text-[8.5px] font-mono text-[#8C7A6B] pt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                            {toCountryDetail.coords[1].toFixed(2)}°{toCountryDetail.coords[1] >= 0?'N':'S'}, {toCountryDetail.coords[0].toFixed(2)}°{toCountryDetail.coords[0] >= 0?'E':'W'}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Geodetic Computer Grid Panel */}
                    <div className="bg-[#FAF8F5] border border-[#4A463F]/10 p-3.5 space-y-2.5">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[9px] font-mono text-[#8C7A6B] uppercase tracking-wider">
                          {language === 'zh' ? "测地大圆空间高精距离" : "GREAT-CIRCLE GEODETIC DISTANCE"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 border-t border-[#4A463F]/5 pt-2">
                        <div>
                          <div className="text-[15px] font-serif font-black text-[#C25B4E] tracking-tight">
                            {geodeticDistance.toLocaleString()} <span className="text-[10px] font-mono font-normal text-[#4A463F]/50">KM</span>
                          </div>
                          <div className="text-[9px] font-mono text-[#4A463F]/40 uppercase tracking-wider">
                            {language === 'zh' ? "公制公里" : "METRIC KILOMETERS"}
                          </div>
                        </div>

                        <div>
                          <div className="text-[15px] font-serif font-black text-[#8C7A6B] tracking-tight">
                            {geodeticDistanceNm.toLocaleString()} <span className="text-[10px] font-mono font-normal text-[#4A463F]/50">NM</span>
                          </div>
                          <div className="text-[9px] font-mono text-[#4A463F]/40 uppercase tracking-wider">
                            {language === 'zh' ? "航海海里" : "NAUTICAL MILES"}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-[#4A463F]/5 pt-2 space-y-1 text-[9.5px] font-serif text-[#4A463F]/80">
                        <div className="flex justify-between">
                          <span>{language === 'zh' ? "🛩️ 常规亚音速客机单程程 (Mach 0.8)" : "🛩️ Subsonic airliner voyage (Mach 0.8)"}:</span>
                          <span className="font-mono font-semibold text-[#4A463F]">
                            {geodeticDistance === 0 ? "0.0" : (geodeticDistance / 850).toFixed(1)} {language === 'zh' ? "小时" : "hrs"}
                          </span>
                        </div>
                        <div className="flex justify-between text-[#C25B4E]">
                          <span>{language === 'zh' ? "⚡ 传奇航线双倍音速巡航 (Mach 2.0)" : "⚡ Supersonic Cruise duration (Mach 2.0)"}:</span>
                          <span className="font-mono font-semibold">
                            {geodeticDistance === 0 ? "0.0" : (geodeticDistance / 2124).toFixed(1)} {language === 'zh' ? "小时" : "hrs"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      id="establish-country-flight-route-btn"
                      onClick={establishCustomCountryFlight}
                      className="w-full py-2.5 bg-[#4A463F] hover:bg-[#5C564E] text-[#F4F0EA] rounded-none font-mono text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.99]"
                    >
                      <Plane size={11} className="animate-pulse" /> 
                      <span>{language === 'zh' ? "架设跨国空中走廊" : "LAUNCH COUNTRY AIR CORRIDOR"}</span>
                    </button>
                  </div>
                )}

                {/* List of active paths */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-[#8C7A6B] uppercase tracking-wider block">
                    {t.telemetriesLabel} ({flightRoutes.length})
                  </span>
                  
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {flightRoutes.map((route) => (
                      <div 
                        key={route.id} 
                        onClick={() => {
                          if (trackedRouteId === route.id) {
                            setTrackedRouteId(null);
                          } else {
                            setTrackedRouteId(route.id);
                            setLandmarkFocus(null);
                          }
                          audioEngine.triggerTick();
                        }}
                        className={`bg-[#FCFAF6] border p-3.5 rounded-none text-xs flex flex-col gap-2.5 relative overflow-hidden group cursor-pointer transition-all ${
                          trackedRouteId === route.id
                            ? 'border-[#C25B4E] ring-1 ring-[#C25B4E]/30 bg-[#FFFDFB]'
                            : 'border-[#4A463F]/10 hover:border-[#4A463F]/30 hover:bg-[#FAF8F5]'
                        }`}
                      >
                        {/* Dynamic progress bar backing fill */}
                        <div 
                          className="absolute top-0 left-0 bottom-0 bg-[#C25B4E]/3 transition-all duration-300 pointer-events-none" 
                          style={{ width: `${route.progress * 100}%` }}
                        />

                        <div className="flex items-center justify-between relative z-10">
                          <span className="font-serif font-medium text-[#4A463F] max-w-[40%] truncate">{route.fromName}</span>
                          <span className="px-1.5 py-0.5 font-mono text-[9px] bg-[#C25B4E]/10 text-[#C25B4E] uppercase tracking-wider rounded-none">
                            {Math.floor(route.progress * 100)}% {t.transitLabel}
                          </span>
                          <span className="font-serif font-medium text-[#4A463F] max-w-[40%] text-right truncate">{route.toName}</span>
                        </div>

                        {/* Progress slider visually mapping flight track */}
                        <div className="w-full bg-[#EBEAE4] h-[3px] rounded-none relative z-10 overflow-hidden">
                          <div 
                            className="bg-[#C25B4E] h-full rounded-none transition-all duration-300"
                            style={{ width: `${route.progress * 100}%` }}
                          />
                        </div>

                        {/* Tracking metadata and action row */}
                        <div className="flex items-center justify-between text-[10px] font-mono mt-0.5 relative z-10">
                          <span className="text-[#8C7A6B]/70 uppercase tracking-widest text-[8.5px]">
                            {route.id.includes('country') ? (language === 'zh' ? '跨国大圆航线' : 'COUNTRY GEODETIC') : (language === 'zh' ? '地标飞行走廊' : 'BEACON CORRIDOR')}
                          </span>
                          <span className={`flex items-center gap-1 font-bold uppercase tracking-wider text-[9px] ${
                            trackedRouteId === route.id ? 'text-[#C25B4E] animate-pulse font-semibold' : 'text-[#4A463F]/50 group-hover:text-[#4A463F]'
                          }`}>
                            <Compass size={11} className={trackedRouteId === route.id ? 'animate-spin' : ''} style={{ animationDuration: '6s' }} />
                            {trackedRouteId === route.id 
                              ? (language === 'zh' ? '正在跟踪视角' : 'TRACKING') 
                              : (language === 'zh' ? '点击跟踪视角' : 'TRACK FLIGHT')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: GEOGRAPHY TRIVIA CHALLENGE */}
            {activeTab === 'quiz' && (
              <div id="tab-content-quiz" className="space-y-6 animate-fade-in flex-1 flex flex-col justify-between font-sans">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-serif font-semibold text-xl tracking-tight text-[#4A463F] flex items-center gap-1.5">
                      <Award size={16} className="text-[#8C7A6B]" />
                      {t.quizTitle}
                    </h3>
                    <p className="text-xs text-[#4A463F]/75 leading-relaxed italic">
                      {t.quizDesc}
                    </p>
                  </div>

                  {/* Score dashboard */}
                  <div className="grid grid-cols-3 gap-3 border border-[#4A463F]/15 rounded-none p-4 bg-[#FCFAF6] text-center font-mono">
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#4A463F]/50 block uppercase tracking-wider">{t.streakLabel}</span>
                      <span className="text-base font-bold text-[#8C7A6B]">x{quiz.streak}</span>
                    </div>
                    <div className="space-y-1 border-x border-[#4A463F]/10">
                      <span className="text-[9px] text-[#4A463F]/50 block uppercase tracking-wider">{t.scoreLabel}</span>
                      <span className="text-base font-bold text-[#C25B4E]">{quiz.score}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#4A463F]/50 block uppercase tracking-wider">{t.recordLabel}</span>
                      <span className="text-base font-bold text-[#4A463F]/70">{quiz.highScore}</span>
                    </div>
                  </div>

                  {/* Game Status Panel */}
                  <div className="border border-dashed border-[#4A463F]/25 rounded-none p-5 bg-[#FCFAF6] text-center space-y-4">
                    {quiz.isActive && quiz.targetCountry ? (
                      <div className="space-y-4">
                        <span className="text-[9px] font-mono text-[#C25B4E] tracking-widest uppercase block animate-pulse font-semibold">
                          {t.activeTarget}
                        </span>
                        
                        <div className="p-4 bg-[#FCFAF6] border border-[#4A463F]/15 rounded-none text-left relative overflow-hidden group">
                          {/* A small elegant indicator badge */}
                          <div className="flex items-center justify-between border-b border-[#4A463F]/10 pb-2 mb-3">
                            <span className="text-[8.5px] font-mono tracking-widest text-[#8C7A6B] uppercase font-bold flex items-center gap-1">
                              <Sparkles size={10} className="text-[#C25B4E] animate-pulse" />
                              {language === 'zh' ? "神秘国家特色印记 / HERITAGE CLUE" : "MYSTERY HERITAGE PROFILE"}
                            </span>
                            <span className="text-[9px] font-mono text-[#4A463F]/40">
                              ID: {getCountryMeta(quiz.targetCountry.name, language).id || "???"}
                            </span>
                          </div>
                          
                          <p className="font-serif text-[13px] sm:text-[13.5px] leading-relaxed text-[#4A463F] font-light italic">
                            "{getCountryMeta(quiz.targetCountry.name, language).ethnicCulture}"
                          </p>
                        </div>

                        <div className="p-3.5 bg-[#FAF8F5] border border-[#4A463F]/10 rounded-none text-xs leading-normal font-serif italic text-[#4A463F]/80 text-left">
                          <Info size={13} className="text-[#8C7A6B] inline mr-1.5 shrink-0 align-text-bottom" />
                          <span>{quiz.feedback.message}</span>
                        </div>

                        {/* Assistants Option buttons */}
                        <div className="space-y-2 pt-2">
                          <span className="text-[9.5px] font-mono text-[#8C7A6B] uppercase tracking-wider block text-left">
                            {t.assistancePrefix}
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {quiz.options.map((opt) => (
                              <button
                                id={`quiz-option-${opt}`}
                                key={opt}
                                onClick={() => handleCountryGuess(opt)}
                                className="p-2.5 bg-white border border-[#4A463F]/15 hover:border-[#4A463F] text-[11px] font-serif rounded-none text-left hover:bg-[#FAF8F5] transition-all text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer active:scale-[0.99] text-[#4A463F]"
                              >
                                • {getCountryMeta(opt, language).name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 space-y-3">
                        <Compass className="mx-auto text-[#4A463F]/20 stroke-1 animate-spin" style={{ animationDuration: '30s' }} size={28} />
                        <h4 className="font-serif text-lg italic text-[#4A463F]">{t.readyTitle}</h4>
                        <p className="text-xs text-[#4A463F]/60 leading-normal max-w-xs mx-auto font-sans font-light">
                          {t.readyDesc}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    id="trigger-start-quiz-toggle"
                    onClick={toggleQuizMode}
                    className={`w-full py-3 h-11 rounded-none text-[10px] font-mono tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                      quiz.isActive 
                        ? 'bg-rose-50/50 border border-rose-300 text-rose-900 hover:bg-rose-100/60' 
                        : 'bg-[#4A463F] hover:bg-[#5C564E] text-[#F4F0EA]'
                    }`}
                  >
                    {quiz.isActive ? (
                      <>
                        <Pause size={11} /> {t.abandonQuizBtn}
                      </>
                    ) : (
                      <>
                        <Play size={11} /> {t.initiateQuizBtn}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SOLAR TIMELINE & DAY NIGHT */}
            {activeTab === 'time' && (
              <div id="tab-content-solar" className="space-y-6 animate-fade-in font-sans">
                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-xl tracking-tight text-[#4A463F] flex items-center gap-1.5">
                    <Sun size={16} className="text-[#8C7A6B]" />
                    {t.solarTitle}
                  </h3>
                  <p className="text-xs text-[#4A463F]/75 leading-relaxed italic">
                    {t.solarDesc}
                  </p>
                </div>

                {/* Day Night Settings Card */}
                <div className="border border-[#4A463F]/15 rounded-none p-5 bg-[#FCFAF6] space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-[#4A463F]/10">
                    <span className="text-xs font-mono font-medium text-[#4A463F] uppercase tracking-wider">{t.shadowControl}</span>
                    <button
                      id="toggle-solar-shading-switch"
                      onClick={() => {
                        setShowDayNight(!showDayNight);
                        audioEngine.triggerTick();
                      }}
                      className={`px-3 py-1 text-[10px] font-mono border rounded-none uppercase transition-all cursor-pointer ${
                        showDayNight 
                          ? 'bg-[#4A463F] text-[#FAF8F5] border-[#4A463F]' 
                          : 'bg-transparent text-[#4A463F]/40 border-[#4A463F]/15 hover:bg-black/5'
                      }`}
                    >
                      {showDayNight ? t.activeBtn : t.shadowsOffBtn}
                    </button>
                  </div>

                  {/* Active Simulator Hour clock display */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif italic text-[#4A463F]/60 flex items-center gap-1">
                      <Clock size={12} />
                      {t.solarTimeLabel}
                    </span>
                    <span className="text-lg font-mono font-bold text-[#4A463F]">
                      {Math.floor(simulationTime).toString().padStart(2, '0')}:{(Math.floor((simulationTime % 1) * 60)).toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Slider bar */}
                  <div className="space-y-1.5">
                    <input
                      id="solar-time-slider"
                      type="range"
                      min={0}
                      max={24}
                      step={0.1}
                      value={simulationTime}
                      onChange={(e) => {
                        setSimulationTime(parseFloat(e.target.value));
                        if (!audioEnabled) {
                          audioEngine.resume();
                        }
                      }}
                      className="w-full accent-[#8C7A6B] cursor-pointer"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-[#4A463F]/45 uppercase tracking-wider">
                      <span>{t.dawn}</span>
                      <span>{t.midday}</span>
                      <span>{t.dusk}</span>
                    </div>
                  </div>

                  {/* Play auto time evolution */}
                  <button
                    id="solar-auto-play-btn"
                    onClick={() => {
                      setIsTimeFlowing(!isTimeFlowing);
                      audioEngine.triggerTick();
                    }}
                    className={`w-full py-2 border rounded-none font-mono text-[10px] tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isTimeFlowing 
                        ? 'bg-[#4A463F] text-[#FAF8F5] border-[#4A463F]' 
                        : 'border-[#4A463F]/20 hover:bg-black/5 text-[#4A463F]'
                    }`}
                  >
                    {isTimeFlowing ? (
                      <>
                        <Pause size={11} /> {t.haltDiurnalBtn}
                      </>
                    ) : (
                      <>
                        <Play size={11} /> {t.activateDiurnalBtn}
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-[#FCFAF6]/60 border border-[#4A463F]/10 p-4 rounded-none flex items-start gap-2.5 text-xs">
                  <Info size={14} className="text-[#8C7A6B] shrink-0 mt-0.5" />
                  <p className="text-[#4A463F]/75 leading-normal font-serif italic">
                    {t.solarExplanation}
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: FM SYNTH ENGINE PARAMETERS */}
            {activeTab === 'audio' && (
              <div id="tab-content-audio" className="space-y-6 animate-fade-in font-sans">
                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-xl tracking-tight text-[#4A463F] flex items-center gap-1.5">
                    <Sliders size={16} className="text-[#8C7A6B]" />
                    {t.audioTitle}
                  </h3>
                  <p className="text-xs text-[#4A463F]/75 leading-relaxed italic">
                    {t.audioDesc}
                  </p>
                </div>

                {/* Synth settings */}
                <div className="border border-[#4A463F]/15 rounded-none p-5 bg-[#FCFAF6] space-y-5">
                  
                  {/* Master volume control */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#4A463F]/50 uppercase tracking-wider">{t.synthVolumeLabel} ({Math.round(masterVolume * 100)}%)</span>
                      <Volume2 size={12} className="text-[#4A463F]/40" />
                    </div>
                    <input
                      id="synth-gain-slider"
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={masterVolume}
                      onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                      className="w-full accent-[#8C7A6B] cursor-pointer"
                    />
                  </div>

                  {/* Scale selection */}
                  <div className="space-y-2 border-t border-[#4A463F]/10 pt-3.5">
                    <span className="text-[9px] font-mono text-[#4A463F]/50 uppercase tracking-wider block">
                      {t.acousticScaleLabel}
                    </span>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { id: 'pentatonic', label: language === 'zh' ? 'D大调五声音阶' : 'D Major Pentatonic', desc: language === 'zh' ? '悠扬、幽雅的东方星宿调（温暖）' : 'Airy, peaceful, oriental celestial theme (warm)' },
                        { id: 'ambient', label: language === 'zh' ? 'A纯五度音阶（全谐和）' : 'A Quintal (Perfect Fifths)', desc: language === 'zh' ? '纯净空灵的三维景深空间共振（辽阔）' : 'Pristine spatial resonance chords (spacious)' },
                        { id: 'harmonic_minor', label: language === 'zh' ? 'D和声小调' : 'D Harmonic Minor', desc: language === 'zh' ? '忧郁、古老神秘的大陆戈壁地貌调（神秘）' : 'Melancholy, ancient Egyptian desert theme (mystic)' }
                      ].map((sc) => {
                        const isChosen = selectedScale === sc.id;
                        return (
                          <button
                            id={`scale-select-${sc.id}`}
                            key={sc.id}
                            onClick={() => {
                              setSelectedScale(sc.id as any);
                              audioEngine.triggerTick();
                            }}
                            className={`p-3 border rounded-none text-left text-xs transition-all cursor-pointer flex flex-col gap-0.5 ${
                              isChosen 
                                ? 'border-[#4A463F] bg-[#FCFAF6] shadow-sm font-semibold' 
                                : 'border-[#4A463F]/10 bg-[#FCFAF6]/60 hover:bg-[#F4F0EA]/40'
                            }`}
                          >
                            <span className="font-serif font-semibold text-[#4A463F] text-[13px]">{sc.label}</span>
                            <span className="text-[10px] text-[#4A463F]/50 font-sans italic font-light">{sc.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Continuous humming drone */}
                  <div className="flex items-center justify-between border-t border-[#4A463F]/10 pt-3.5">
                    <div className="flex flex-col">
                      <span className="text-xs font-serif font-medium text-[#4A463F] italic">{t.resonanceTitle}</span>
                      <span className="text-[9px] font-mono text-[#4A463F]/40 uppercase tracking-widest">{t.resonanceDesc}</span>
                    </div>
                    
                    <button
                      id="toggle-humming-drone-selector"
                      onClick={() => {
                        setIsHumming(!isHumming);
                        audioEngine.triggerTick();
                      }}
                      className={`px-3 py-1 text-[10px] font-mono border rounded-none uppercase transition-all cursor-pointer ${
                        isHumming 
                          ? 'bg-[#4A463F] text-[#FAF8F5] border-[#4A463F] font-bold' 
                          : 'bg-transparent text-[#4A463F]/40 border-[#4A463F]/15 hover:bg-black/5'
                      }`}
                    >
                      {isHumming ? t.activeBtn : (language === 'zh' ? "已静音" : "MUTED")}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-[#FCFAF6]/60 border border-dashed border-[#4A463F]/20 rounded-none text-[9.5px] font-mono leading-relaxed text-[#4A463F]/60">
                  <span>{t.audioExplanation}</span>
                </div>
              </div>
            )}

            {/* SHARED MINI FOOTPAD (Static footer inside left panel) */}
            <div id="left-panel-footer" className="pt-4 border-t border-[#4A463F]/10 mt-auto text-[9px] font-mono text-[#4A463F]/40 flex items-center justify-between uppercase tracking-wider">
              <span>DESIGNED BY BUILD CONVENTIONS</span>
              <span>2026 UTC</span>
            </div>
          </div>
        </section>

        {/* FULLSCREEN GLOBE DISPLAY ARENA */}
        <section 
          id="globe-display-arena" 
          className="flex-1 relative flex flex-col justify-between p-6 select-none z-10 h-full min-w-0"
        >
          
          {/* Layer 1: Display Toggles (Top bar of sandbox) */}
          <div className="flex flex-wrap items-center justify-between gap-3 z-10">
            <div className="flex flex-wrap items-center gap-2">
              {/* Dynamic sidebar toggle button integrated seamlessly in controls row */}
              <button
                id="sidebar-toggle-trigger"
                onClick={() => {
                  setIsSidebarOpen(!isSidebarOpen);
                  audioEngine.triggerTick();
                }}
                className="px-3 py-1.5 h-[29px] bg-[#FCFAF6]/95 border border-[#4A463F]/20 hover:border-[#4A463F] hover:bg-[#FAF8F5]/80 text-[#4A463F] font-mono text-[9.5px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                {isSidebarOpen ? <X size={10} className="text-[#C25B4E]" /> : <Menu size={10} className="text-[#8C7A6B]" />}
                <span className="font-bold">{isSidebarOpen ? (language === 'zh' ? "关闭面板" : "CLOSE MENU") : (language === 'zh' ? "展开面板" : "OPEN MENU")}</span>
              </button>

              {/* View Customizer switches */}
              <div className="flex flex-wrap items-center gap-1 p-1 border border-[#4A463F]/15 rounded-none bg-[#FCFAF6]/90 text-[9.5px] font-mono min-h-[29px]">
              {[
                { label: language === 'zh' ? "国界线" : "BORDERS", active: showBorders, toggle: () => setShowBorders(!showBorders) },
                { label: language === 'zh' ? "经纬网" : "GRATICULE", active: showGraticule, toggle: () => setShowGraticule(!showGraticule) },
                { label: language === 'zh' ? "航线弧" : "AIR ARCS", active: showFlightArcs, toggle: () => setShowFlightArcs(!showFlightArcs) },
                { label: language === 'zh' ? "昼夜影" : "SOLAR TERM", active: showDayNight, toggle: () => setShowDayNight(!showDayNight) }
              ].map((sw) => (
                <button
                  id={`view-toggle-${sw.label.replace(/\s+/g, '-').toLowerCase()}`}
                  key={sw.label}
                  onClick={() => {
                    sw.toggle();
                    audioEngine.triggerTick();
                  }}
                  className={`px-2 py-1 rounded-none transition-all cursor-pointer ${
                    sw.active 
                      ? 'bg-[#4A463F] text-[#FAF8F5] font-bold' 
                      : 'text-[#4A463F]/55 hover:text-[#4A463F]'
                  }`}
                >
                  {sw.label}
                </button>
              ))}
            </div>
          </div>

            {/* Quick help button */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FAF8F5] border border-[#4A463F]/15 rounded-none text-[9px] font-mono text-[#8C7A6B]">
              <Sparkles size={10} /> 
              <span>
                {language === 'zh' 
                  ? "托拽转换视野 • 滚轮缩放缩距" 
                  : "DRAG TO REVOLVE • SCROLL TO EXTEND PERSPECTIVE"
                }
              </span>
            </div>
          </div>

          {/* Layer 2: Main center globe container (with min-h-0 to avoid overflow pushing the bottom layout coordinates out of screen) */}
          <div className="flex-1 min-h-0 flex items-center justify-center p-2 relative">
            
            {/* Soft decorative background radial texture */}
            <div className="absolute w-[80%] aspect-square rounded-full bg-gradient-to-tr from-stone-200/10 via-transparent to-transparent pointer-events-none filter blur-2xl" />

            {/* RENDER D3 GLOBE */}
            <Globe
              key={globeResetKey}
              showBorders={showBorders}
              showGraticule={showGraticule}
              showFlightArcs={showFlightArcs}
              showDayNight={showDayNight}
              simulationTime={simulationTime}
              selectedCountry={selectedCountry}
              onCountrySelect={setSelectedCountry}
              hoveredCountry={hoveredCountry}
              onCountryHover={setHoveredCountry}
              flightRoutes={flightRoutes}
              activeTab={activeTab}
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
              quizState={quiz}
              onQuizCountryClick={handleGlobeCountryClick}
              landmarkFocus={landmarkFocus}
              onLandmarkHover={setLandmarkFocus}
              trackedRouteId={trackedRouteId}
              onTrackedRouteClear={() => setTrackedRouteId(null)}
              onCountriesLoaded={setLoadedCountries}
              language={language}
            />
          </div>

          {/* Layer 3: Bottom Coordinates & Live HUD reads */}
          <div className="relative z-10 w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#FCFAF6] border border-[#4A463F]/15 rounded-none p-4 md:py-3 md:px-5 font-mono shadow-none">
            
            {/* Focus indicator / Hover status readout */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-none bg-[#F4F0EA] text-[#4A463F]">
                <Map size={16} className="animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-[#8C7A6B] block uppercase tracking-wider">
                  {hoveredCountry 
                    ? (language === 'zh' ? "扫描信号中" : "Scanning Sector") 
                    : (language === 'zh' ? "锁定位置" : "Selected Center")
                  }
                </span>
                <span className="text-[13px] font-serif font-bold italic text-[#4A463F]">
                  {hoveredCountry 
                    ? (getCountryMeta(hoveredCountry.properties?.name || "", language).name || "").toUpperCase() 
                    : (selectedCountry 
                        ? (getCountryMeta(selectedCountry.properties?.name || "", language).name || "").toUpperCase() 
                        : (language === 'zh' ? "浩瀚太空" : "COSMIC SPACE"))}
                </span>
              </div>
            </div>

            {/* Position coordinate values */}
            <div className="flex flex-col items-stretch md:items-end gap-1.5 text-xs max-w-full md:max-w-[60%]">
              <div className="grid grid-cols-2 md:flex items-center gap-4 w-full md:justify-end">
                <div className="space-y-0.5 md:text-right bg-[#FAF8F5] md:bg-transparent p-2 md:p-0 border md:border-y-0 md:border-x border-dashed border-[#4A463F]/10 px-2 rounded-none">
                  <span className="text-[9px] text-[#4A463F]/45 block uppercase tracking-wider font-mono font-medium">
                    {language === 'zh' ? "纬度基准" : "LAT VECTOR"}
                  </span>
                  <span id="hud-lat-value" className="font-semibold text-[#4A463F] font-mono">
                    {selectedMeta ? selectedMeta.coords[1].toFixed(4) : "0.0000"}° N
                  </span>
                </div>
                <div className="space-y-0.5 md:text-right bg-[#FAF8F5] md:bg-transparent p-2 md:p-0 border-dashed border-[#4A463F]/10 rounded-none">
                  <span className="text-[9px] text-[#4A463F]/45 block uppercase tracking-wider font-mono font-medium">
                    {language === 'zh' ? "经度基准" : "LNG VECTOR"}
                  </span>
                  <span id="hud-lng-value" className="font-semibold text-[#4A463F] font-mono">
                    {selectedMeta ? selectedMeta.coords[0].toFixed(4) : "0.0000"}° E
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Reset Settings Button */}
            <button
              id="factory-reset-configuration-btn"
              onClick={() => {
                setShowBorders(true);
                setShowGraticule(true);
                setShowFlightArcs(true);
                setShowDayNight(true);
                setSimulationTime(12);
                setAutoRotate(true);
                setSelectedCountry(null);
                setLandmarkFocus(null);
                setFlightRoutes(INITIAL_ROUTES);
                setGlobeResetKey(prev => prev + 1);
                audioEngine.triggerTick();
              }}
              title="Reset configuration defaults"
              className="p-1.5 border border-[#4A463F]/20 hover:border-[#4A463F] rounded-none hover:bg-black/5 transition-all flex items-center justify-center text-[10px] text-[#4A463F]/60 hover:text-[#4A463F] gap-1 cursor-pointer"
            >
              <RefreshCw size={11} />
              <span>{language === 'zh' ? "重置视图" : "DEFAULT VIEW"}</span>
            </button>
          </div>

          {/* Layer 2.5: Globe Metropolis Interactive Ad Billboard (Exactly same length, width & card contour style as bottom HUD) */}
          {activeAd ? (
            <a
              href={activeAd.link_url || undefined}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="relative z-10 w-full block border border-[#4A463F]/15 rounded-none overflow-hidden bg-[#FCFAF6] group"
              title={activeAd.advertiser_name || undefined}
            >
              <img
                src={activeAd.image_url}
                alt={activeAd.advertiser_name || 'Advertisement'}
                className="w-full h-auto object-cover max-h-[120px] group-hover:opacity-90 transition-opacity"
              />
              <span className="absolute top-1 right-1.5 text-[7px] font-mono uppercase tracking-widest bg-black/40 text-white px-1.5 py-0.5 rounded-none select-none">
                {language === 'zh' ? '广告' : 'Ad'}
              </span>
            </a>
          ) : (
          <div className="relative z-10 w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#FCFAF6] border border-[#4A463F]/15 rounded-none p-4 md:py-3.5 md:px-5 font-mono text-[#4A463F] shadow-none select-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-none bg-[#C25B4E]/10 text-[#C25B4E] border border-dashed border-[#C25B4E]/30 animate-pulse shrink-0">
                <Sparkles size={14} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-[#C25B4E] block uppercase tracking-widest font-black">
                  {language === 'zh' ? "⚡ 特惠黄金广告牌" : "⚡ EXCLUSIVE BILLBOARD"}
                </span>
                <span className="text-[12px] font-serif font-black italic text-[#4A463F] leading-none">
                  {language === 'zh' ? "地信探索与寰宇地缘推广渠道计划" : "Terra Nucleus Global Advertising Station"}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-[11px] font-mono">
              <div className="bg-[#FAF8F5] px-2.5 py-1.5 border border-[#4A463F]/10 flex items-center gap-1.5 rounded-none">
                <span className="text-[#8C7A6B] text-[9px] font-bold uppercase tracking-wider">
                  {language === 'zh' ? '合作 / 广告 / 支持:' : 'COLLAB / ADS / SUPPORT:'}
                </span>
                <a 
                  href="mailto:terranucleus@gmail.com" 
                  className="underline font-bold text-[#C25B4E] hover:text-[#4A463F] transition-all"
                >
                  terranucleus@gmail.com
                </a>
              </div>
            </div>
          </div>
          )}

          {/* Simple caption text containing the official contact email below the billboard */}
          <div className="relative z-10 w-full text-center mt-1.5 font-mono text-[10px] text-[#4A463F]/50 select-text pb-1">
            <span>
              {language === 'zh' ? '广告与支持 / Ads & Support: ' : 'Ads & Support: '}
            </span>
            <a 
              href="mailto:terranucleus@gmail.com" 
              className="font-bold underline text-[#C25B4E] hover:text-[#4A463F] transition-colors ml-1"
            >
              terranucleus@gmail.com
            </a>
          </div>
        </section>

      </main>

      {/* 4. Interactive Majestic Landmark Architectural Sketch Detail Modal Overlay */}
      <LandmarkDetailsModal
        landmark={selectedLandmark}
        onClose={() => setSelectedLandmark(null)}
        onFocusGlobe={handleFocusGlobeFromModal}
        onSetFlightOrigin={handleSetFlightOriginFromModal}
        language={language}
      />

      {/* 5. Login / Sign Up Modal */}
      {isAuthModalOpen && (
        <AuthModal language={language} onClose={() => setIsAuthModalOpen(false)} />
      )}
    </div>
  );
}
