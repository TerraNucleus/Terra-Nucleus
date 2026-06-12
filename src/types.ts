export interface Country {
  type: string;
  id: string | number;
  properties: {
    name: string;
  };
  geometry: any;
}

export interface FlightRoute {
  id: string;
  fromName: string;
  toName: string;
  fromCoords: [number, number]; // [lng, lat]
  toCoords: [number, number];   // [lng, lat]
  progress: number;            // 0 to 1
  speed: number;               // speed factor
}

export interface Landmark {
  name: string;
  coords: [number, number]; // [lng, lat]
  type: 'city' | 'nature' | 'heritage' | 'custom';
  description: string;
}

export interface QuizState {
  isActive: boolean;
  targetCountry: { id: string | number; name: string } | null;
  score: number;
  highScore: number;
  streak: number;
  feedback: {
    type: 'success' | 'error' | 'neutral' | null;
    message: string;
  };
  options: string[]; // Multiple choice options to assist players
}

export interface AudioSettings {
  isEnabled: boolean;
  volume: number;       // 0 to 1
  isHumming: boolean;   // low orbital drone
  soundScale: 'pentatonic' | 'ambient' | 'harmonic_minor';
  reverb: boolean;
}

export interface AppState {
  projectionRotation: [number, number, number]; // [lambda, phi, gamma]
  zoomScale: number;
  selectedCountry: Country | null;
  hoveredCountry: Country | null;
  activeTab: 'explore' | 'flight' | 'quiz' | 'time' | 'audio' | 'post';
  autoRotate: boolean;
  autoRotateSpeed: number;
  flightRoutes: FlightRoute[];
  showBorders: boolean;
  showGraticule: boolean;
  showFlightArcs: boolean;
  showDayNight: boolean;
  simulationTime: number; // 0 to 24 representing local hour for solar terminator
  audioSettings: AudioSettings;
}

export interface PostReply {
  id: string;
  author: string;
  content: string;
  createdAt: number;
  isLocalExpert?: boolean;
}

export interface TravelPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: number;
  likes: number;
  replies: PostReply[];
  category: 'tip' | 'ask' | 'itinerary' | 'warning';
  assignedCountry?: string; // country name if any
  assignedLandmark?: string; // landmark name if any
  isLikedByUser?: boolean;
}

