import React from 'react';
import { Sparkles, MapPin, Navigation, X, Anchor, ArrowRight } from 'lucide-react';
import { Landmark } from '../types';
import { LANDMARK_DETAILS_DB, LandmarkArt } from './LandmarkArt';

interface LandmarkDetailsModalProps {
  landmark: Landmark | null;
  onClose: () => void;
  onFocusGlobe: (landmark: Landmark) => void;
  onSetFlightOrigin: (landmark: Landmark) => void;
  language: 'en' | 'zh';
}

export const LandmarkDetailsModal: React.FC<LandmarkDetailsModalProps> = ({
  landmark,
  onClose,
  onFocusGlobe,
  onSetFlightOrigin,
  language
}) => {
  if (!landmark) return null;

  // Find extended details map from dictionary
  const details = LANDMARK_DETAILS_DB[landmark.name] || {
    id: "unknown",
    nameEn: landmark.name,
    nameZh: landmark.name,
    countryEn: "Global Sector",
    countryZh: "全球区域",
    coords: landmark.coords,
    type: landmark.type,
    descEn: landmark.description,
    descZh: landmark.description,
    chronicleEn: "No historical records compiled back in archive systems yet.",
    chronicleZh: "档案库目前未编撰对应历史考证文本说明。",
    terrainEn: "Standard geographic terrain at high resolution coordinates.",
    terrainZh: "具备精细坐标的常规地表地势地貌分布区域。",
    cultureEn: "Local communities inherit deep values and rich folk traditions.",
    cultureZh: "当地社区保留有宝贵的人文习俗与世代流传的人文生活传统。"
  };

  const name = language === 'zh' ? details.nameZh : details.nameEn;
  const country = language === 'zh' ? details.countryZh : details.countryEn;
  const description = language === 'zh' ? details.descZh : details.descEn;
  const chronicle = language === 'zh' ? details.chronicleZh : details.chronicleEn;
  const terrain = language === 'zh' ? details.terrainZh : details.terrainEn;
  const culture = language === 'zh' ? details.cultureZh : details.cultureEn;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm transition-all duration-300 animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="landmark-details-panel"
        className="relative bg-[#F4F0EA] border-2 border-[#4A463F] max-w-[520px] w-full max-h-[85vh] overflow-y-auto rounded-none shadow-2xl p-6 md:p-7 space-y-6 animate-scale-up text-[#4A463F] font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          id="close-landmark-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 border border-[#4A463F]/20 hover:border-[#4A463F] text-[#4A463F]/60 hover:text-[#4A463F] rounded-none hover:bg-black/5 transition-all cursor-pointer"
        >
          <X size={14} />
        </button>

        {/* Top Header Label */}
        <div className="space-y-1.5 border-b border-[#4A463F]/15 pb-4">
          <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#8C7A6B] uppercase font-bold">
            <Sparkles size={11} className="text-[#C25B4E] animate-pulse" />
            <span>{language === 'zh' ? "古地质与文明航标遥测" : "MAJESTIC STRUCTURAL TELEMETRY"}</span>
          </div>
          
          <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-tight tracking-tight mt-1 text-[#4A463F]">
            {name}
          </h2>
          
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] md:text-xs font-mono text-[#8C7A6B] pt-1">
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-[#C25B4E]" />
              {country}
            </span>
            <span>•</span>
            <span className="uppercase px-1.5 py-0.5 bg-[#4A463F]/5 text-[#4A463F] font-semibold">
              {landmark.type}
            </span>
            <span>•</span>
            <span className="text-[#4A463F]/60">
              {landmark.coords[1].toFixed(4)}° {landmark.coords[1] >= 0 ? "N" : "S"}, {landmark.coords[0].toFixed(4)}° {landmark.coords[0] >= 0 ? "E" : "W"}
            </span>
          </div>
        </div>

        {/* 2D Minimalist Architectural Sketch Base */}
        <div className="bg-[#FCFAF6] border border-[#4A463F]/20 p-4 relative flex flex-col items-center justify-center overflow-hidden">
          {/* Aesthetic Drafting marks */}
          <div className="absolute top-1 left-2 text-[7px] font-mono text-[#4A463F]/35">SKETCH_REF_ID: // {details.id.toUpperCase()}</div>
          <div className="absolute bottom-1 right-2 text-[7px] font-mono text-[#4A463F]/35">SCALE 1 : 12,000,000</div>
          
          <LandmarkArt id={details.id} />
        </div>

        {/* Description brief */}
        <p className="font-serif text-sm italic text-[#4A463F]/95 leading-relaxed bg-[#FCFAF6]/60 p-3.5 border border-dashed border-[#4A463F]/10">
          "{description}"
        </p>

        {/* Detailed Encyclopedias Tabs / Accordion style text flow */}
        <div className="space-y-4 text-xs leading-relaxed font-serif">
          {/* Section 1: Chronicle */}
          <div className="space-y-1">
            <h4 className="font-mono text-[9.5px] font-bold text-[#8C7A6B] uppercase tracking-wider flex items-center gap-1 border-b border-[#4A463F]/10 pb-1">
              <Anchor size={9} />
              {language === 'zh' ? "历史变迁 / GENESIS CHRONICLE" : "GENESIS & ARCHITECTURAL CHRONICLE"}
            </h4>
            <p className="text-[#4A463F]/85 font-light text-left pl-3.5 pt-1.5">
              {chronicle}
            </p>
          </div>

          {/* Section 2: Terrain */}
          <div className="space-y-1">
            <h4 className="font-mono text-[9.5px] font-bold text-[#8C7A6B] uppercase tracking-wider flex items-center gap-1 border-b border-[#4A463F]/10 pb-1">
              <Navigation size={9} />
              {language === 'zh' ? "地块结构与地形 / TOPOGRAPHY LOG" : "TOPOGRAPHY & LAND STRUCTURE"}
            </h4>
            <p className="text-[#4A463F]/85 font-light text-left pl-3.5 pt-1.5">
              {terrain}
            </p>
          </div>

          {/* Section 3: Cultural */}
          <div className="space-y-1">
            <h4 className="font-mono text-[9.5px] font-bold text-[#8C7A6B] uppercase tracking-wider flex items-center gap-1 border-b border-[#4A463F]/10 pb-1">
              <Sparkles size={9} />
              {language === 'zh' ? "人文遗产民俗 / ETHNIC HERITAGE" : "CULTURAL HERITAGE & FOLKWAYS"}
            </h4>
            <p className="text-[#4A463F]/85 font-light text-left pl-3.5 pt-1.5">
              {culture}
            </p>
          </div>
        </div>

        {/* Interactive Command Control row */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#4A463F]/15">
          <button
            id={`action-modal-focus-${details.id}`}
            onClick={() => {
              onFocusGlobe(landmark);
              onClose();
            }}
            className="py-2.5 bg-[#4A463F] hover:bg-[#5C564E] text-[#F4F0EA] rounded-none font-mono text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
          >
            <Navigation size={11} className="rotate-45" />
            <span>{language === 'zh' ? "定位地球仪" : "FOCUS GLOBE"}</span>
          </button>

          <button
            id={`action-modal-flight-${details.id}`}
            onClick={() => {
              onSetFlightOrigin(landmark);
              onClose();
            }}
            className="py-2.5 border border-[#4A463F] hover:bg-black/5 text-[#4A463F] rounded-none font-mono text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>{language === 'zh' ? "设立飞行航线" : "FLIGHT BRIDGE"}</span>
            <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
};
