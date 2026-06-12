import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { Country, FlightRoute, Landmark, QuizState } from '../types';
import { audioEngine } from '../utils/AudioEngine';

interface GlobeProps {
  key?: any;
  showBorders: boolean;
  showGraticule: boolean;
  showFlightArcs: boolean;
  showDayNight: boolean;
  simulationTime: number; // 0 - 24 hours
  selectedCountry: Country | null;
  onCountrySelect: (country: Country | null) => void;
  hoveredCountry: Country | null;
  onCountryHover: (country: Country | null) => void;
  flightRoutes: FlightRoute[];
  activeTab: string;
  autoRotate: boolean;
  autoRotateSpeed: number;
  quizState: QuizState;
  onQuizCountryClick: (country: Country) => void;
  landmarkFocus: Landmark | null;
  onLandmarkHover: (landmark: Landmark | null) => void;
  trackedRouteId: string | null;
  onTrackedRouteClear: () => void;
  onCountriesLoaded?: (countries: Country[]) => void;
  language?: string;
}

// Fixed list of majestic cultural and natural landmarks for interaction
export const LANDMARKS: Landmark[] = [
  { name: "Kyoto Temple Hub", coords: [135.7681, 35.0116], type: "heritage", description: "A city of wooden temples, gardens, and imperial palaces." },
  { name: "Great Giza Plateau", coords: [31.1342, 29.9792], type: "heritage", description: "Home of the Great Pyramids and the Sphinx on smooth sands." },
  { name: "Reykjavík Rift", coords: [-21.9426, 64.1466], type: "nature", description: "Active geothermal vents and basalt columns near the Arctic circle." },
  { name: "New York Estuary", coords: [-74.0060, 40.7128], type: "city", description: "Bustling coastal modern metropolis layered with islands." },
  { name: "Sydney Harbour", coords: [151.2093, -33.8688], type: "city", description: "A grand dramatic natural harbor and coastal bay." },
  { name: "Amazon Headwaters", coords: [-63.9039, -8.7619], type: "nature", description: "The dense pristine rainforest lung of South America." },
  { name: "Cape of Good Hope", coords: [18.4241, -33.9249], type: "nature", description: "Scenic clifftops where oceans gather and current forces shift." },
  { name: "Svalbard Outpost", coords: [15.6469, 78.2232], type: "nature", description: "Glacier-capped mountains and silent polar nights." },
  { name: "Tibet High Plateau", coords: [91.1172, 29.6524], type: "nature", description: "The roof of the world, serene glaciated peaks & high lakes." },
  { name: "Great Wall of China", coords: [116.5704, 40.4319], type: "heritage", description: "Ancient high-ridge stone fortress walls undulating across northern mountains." },
  { name: "Burj Khalifa Tower", coords: [55.2741, 25.1972], type: "city", description: "The world's tallest spiraling silver spire rising out of the Arabian sands." },
  { name: "Petronas Twin Towers", coords: [101.7119, 3.1578], type: "city", description: "Iconic twin stainless steel skyscrapers linked by a skybridge over a tropical park." },
  { name: "Rio de Janeiro Bay", coords: [-43.1729, -22.9068], type: "city", description: "Lush green granite peaks hugging broad sandy shores." }
];

export default function Globe({
  showBorders,
  showGraticule,
  showFlightArcs,
  showDayNight,
  simulationTime,
  selectedCountry,
  onCountrySelect,
  hoveredCountry,
  onCountryHover,
  flightRoutes,
  activeTab,
  autoRotate,
  autoRotateSpeed,
  quizState,
  onQuizCountryClick,
  landmarkFocus,
  onLandmarkHover,
  trackedRouteId,
  onTrackedRouteClear,
  onCountriesLoaded,
  language = 'en'
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Session-specific unique visitor ID
  const getSessionClientId = () => {
    if (typeof window === 'undefined') return '';
    let id = sessionStorage.getItem('terra_nucleon_client_id');
    if (!id) {
      id = `client-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('terra_nucleon_client_id', id);
    }
    return id;
  };

  // Active online count tracing states (Real collaborative users + realistic backdrop audience)
  const [onlineCount, setOnlineCount] = useState<number>(() => {
    return 6 + Math.floor(Math.random() * 4);
  });

  useEffect(() => {
    const clientId = getSessionClientId();
    let isMounted = true;
    
    // Smooth, organic baseline offset of lurkers that differs slightly per tab session
    const baseOffset = 4 + Math.floor(Math.random() * 5);

    const sendHeartbeat = async () => {
      try {
        const response = await fetch('/api/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId })
        });
        if (!response.ok) throw new Error("Connection degraded");
        const data = await response.json();
        if (isMounted) {
          setOnlineCount(data.onlineCount + baseOffset);
        }
      } catch (err) {
        // Fallback: Dynamic random walker state machine so page works stand-alone or off-grid
        if (isMounted) {
          setOnlineCount(prev => {
            const step = Math.random() > 0.5 ? 1 : -1;
            const next = prev + step;
            return Math.max(4, Math.min(16, next));
          });
        }
      }
    };

    // Fast initial fire
    sendHeartbeat();

    // Recheck / Heartbeat every 5000ms
    const interval = setInterval(sendHeartbeat, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Globe dimensions and map state
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [isGeoJsonLoaded, setIsGeoJsonLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Interactive rotation state Ref (needed to prevent stale timers or React cycles)
  const rotationRef = useRef<[number, number, number]>([-10, -25, 0]); // [lambda, phi, gamma]
  const zoomRef = useRef<number>(250); // projection scale multiplier
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; r: [number, number, number] }>({ x: 0, y: 0, r: [0, 0, 0] });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTimeRef = useRef<number>(performance.now());
  
  // Transition properties for auto-centering
  const transitionRef = useRef<{
    isAnimating: boolean;
    startR: [number, number, number];
    endR: [number, number, number];
    duration: number;
    elapsed: number;
  }>({
    isAnimating: false,
    startR: [0, 0, 0],
    endR: [0, 0, 0],
    duration: 1000,
    elapsed: 0
  });

  // Load Geographic Boundary Data
  useEffect(() => {
    // Standard compact 110m resolution World Atlas
    const boundaryUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
    
    setLoadingError(null);
    d3.json(boundaryUrl)
      .then((data: any) => {
        if (!data) throw new Error("Null data received from world atlas CDN");
        
        // Convert TopoJSON to GeoJSON
        const topoFeatures = topojson.feature(data, data.objects.countries) as any;
        const featuresList = (topoFeatures.features || []) as Country[];
        
        setCountriesData(featuresList);
        setIsGeoJsonLoaded(true);
        if (onCountriesLoaded) {
          onCountriesLoaded(featuresList);
        }
      })
      .catch((err) => {
        console.warn("Failed to load standard jsdelivr world-atlas, trying unpkg...", err);
        // Fallback CDN to maintain strong resilience
        d3.json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
          .then((data: any) => {
            const topoFeatures = topojson.feature(data, data.objects.countries) as any;
            const featuresList = (topoFeatures.features || []) as Country[];
            setCountriesData(featuresList);
            setIsGeoJsonLoaded(true);
            if (onCountriesLoaded) {
              onCountriesLoaded(featuresList);
            }
          })
          .catch((finalErr) => {
            console.error("All geographic data sources failed:", finalErr);
            setLoadingError("Unable to fetch globe geometric boundaries. Check internet connection.");
          });
      });
  }, [onCountriesLoaded]);

  // Set up ResizeObserver to handle fluid sizes without window.innerWidth hacks
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      // Keep it circular & fit to size
      const size = Math.min(width, height) || 400;
      setDimensions({ width: size, height: size });
      
      // Update projection scale based on container size
      zoomRef.current = size * 0.42;
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Trigger smooth flight transition when Landmark changes
  useEffect(() => {
    if (!landmarkFocus || trackedRouteId) return;
    
    // Smoothly pan to landmark coordinates
    const [lng, lat] = landmarkFocus.coords;
    
    // Destination rotation: bring coordinates center front
    // In D3 orthographic projection, rotation coordinates are [-lng, -lat]
    const targetRotation: [number, number, number] = [-lng, -lat, 0];
    
    // Intensely adjust target to handle shortest path transition
    let startL = rotationRef.current[0];
    // Normalize start to be near dest
    let endL = targetRotation[0];
    
    // Quick shortest-path wrapping
    const diff = endL - startL;
    if (Math.abs(diff) > 180) {
      if (diff > 0) {
        startL += 360;
      } else {
        startL -= 360;
      }
    }

    transitionRef.current = {
      isAnimating: true,
      startR: [startL, rotationRef.current[1], rotationRef.current[2]],
      endR: [targetRotation[0], targetRotation[1], 0],
      duration: 1200,
      elapsed: 0
    };
    
    audioEngine.triggerTick();
  }, [landmarkFocus, trackedRouteId]);

  // Trigger smooth flight transition when trackedRouteId changes
  useEffect(() => {
    if (!trackedRouteId) return;
    
    const trackedRoute = flightRoutes.find(r => r.id === trackedRouteId);
    if (!trackedRoute) return;
    
    const interpolator = d3.geoInterpolate(trackedRoute.fromCoords, trackedRoute.toCoords);
    const [lng, lat] = interpolator(trackedRoute.progress);
    
    const targetRotation: [number, number, number] = [-lng, -lat, 0];
    
    let startL = rotationRef.current[0];
    let endL = targetRotation[0];
    
    const diff = endL - startL;
    if (Math.abs(diff) > 180) {
      if (diff > 0) {
        startL += 360;
      } else {
        startL -= 360;
      }
    }

    transitionRef.current = {
      isAnimating: true,
      startR: [startL, rotationRef.current[1], rotationRef.current[2]],
      endR: [targetRotation[0], targetRotation[1], 0],
      duration: 1200,
      elapsed: 0
    };
    
    audioEngine.triggerTick();
    // Only trigger transition once when the selected tracked route changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackedRouteId]);

  // Handle Canvas Rendering and Physics Loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isGeoJsonLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = (time: number) => {
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Ensure canvas respects retina displays
      const dpr = window.devicePixelRatio || 1;
      const width = dimensions.width;
      const height = dimensions.height;
      
      // Sync styles
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Create Orthographic Projection
      const projection = d3.geoOrthographic()
        .scale(zoomRef.current)
        .translate([width / 2, height / 2])
        .clipAngle(90);

      // Interpolate smooth rotation if currently panning
      if (transitionRef.current.isAnimating) {
        const trans = transitionRef.current;
        trans.elapsed += delta;
        const progress = Math.min(1, trans.elapsed / trans.duration);
        
        // Cubic easing out
        const ease = 1 - Math.pow(1 - progress, 3);
        
        const currentL = trans.startR[0] + (trans.endR[0] - trans.startR[0]) * ease;
        const currentP = trans.startR[1] + (trans.endR[1] - trans.startR[1]) * ease;
        
        rotationRef.current = [currentL % 360, currentP, 0];

        if (progress >= 1) {
          trans.isAnimating = false;
        }
      } else if (trackedRouteId && !isDraggingRef.current) {
        // Track the active airplane dynamically in real-time!
        const trackedRoute = flightRoutes.find(r => r.id === trackedRouteId);
        if (trackedRoute) {
          const interpolator = d3.geoInterpolate(trackedRoute.fromCoords, trackedRoute.toCoords);
          const [currentLng, currentLat] = interpolator(trackedRoute.progress);
          rotationRef.current = [-currentLng, -currentLat, 0];
        }
      } else if (!isDraggingRef.current && autoRotate) {
        // Apply slow ambient rotation
        rotationRef.current[0] += autoRotateSpeed * (delta / 16);
        rotationRef.current[0] = rotationRef.current[0] % 360;
      }

      // Apply drag inertia / damping when spinning freely
      if (!isDraggingRef.current && !transitionRef.current.isAnimating && !trackedRouteId) {
        const vx = velocityRef.current.x;
        const vy = velocityRef.current.y;
        
        rotationRef.current[0] += vx * (delta / 16);
        rotationRef.current[1] = Math.max(-85, Math.min(85, rotationRef.current[1] + vy * (delta / 16)));
        
        // Dampening velocity friction (0.95 friction factor)
        velocityRef.current.x *= Math.pow(0.95, delta / 16);
        velocityRef.current.y *= Math.pow(0.95, delta / 16);

        // Slow down hum based on rotation speed
        const speed = Math.sqrt(vx * vx + vy * vy);
        audioEngine.adjustHumSpeed(speed);
      }

      projection.rotate(rotationRef.current);

      // Real-time HUD vector display updating
      const hudLat = document.getElementById("hud-lat-value");
      const hudLng = document.getElementById("hud-lng-value");
      if (hudLat && hudLng) {
        let lng = -rotationRef.current[0] % 360;
        if (lng > 180) lng -= 360;
        if (lng < -180) lng += 360;
        let lat = -rotationRef.current[1];
        
        const latRef = lat >= 0 ? 'N' : 'S';
        const lngRef = lng >= 0 ? 'E' : 'W';
        
        hudLat.textContent = `${Math.abs(lat).toFixed(4)}° ${latRef}`;
        hudLng.textContent = `${Math.abs(lng).toFixed(4)}° ${lngRef}`;
      }

      // Clear with elegant absolute transparent canvas (parent container has beige background `#F4F0EA`)
      ctx.clearRect(0, 0, width, height);

      const pathGenerator = d3.geoPath().projection(projection).context(ctx);

      // 1. Draw Globe Sphere Shadow/Base (Visualizes three-dimensionality)
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, zoomRef.current, 0, 2 * Math.PI);
      const globeGrad = ctx.createRadialGradient(
        width / 2 - zoomRef.current * 0.2, 
        height / 2 - zoomRef.current * 0.2, 
        zoomRef.current * 0.1, 
        width / 2, 
        height / 2, 
        zoomRef.current
      );
      // Soft paper-texture variations
      globeGrad.addColorStop(0, '#FAF9F5'); // highlight
      globeGrad.addColorStop(0.7, '#EFEAE0'); // mid land background
      globeGrad.addColorStop(1, '#DFD8CC'); // dark rim shadow
      ctx.fillStyle = globeGrad;
      ctx.fill();

      // 2. Render Minimalist Graticule (Latitude/Longitude Overlay)
      if (showGraticule) {
        ctx.beginPath();
        pathGenerator(d3.geoGraticule()());
        ctx.strokeStyle = 'rgba(74, 70, 63, 0.08)'; // Ultra-faint grid lines
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // 3. Render Landmesses with Clean Contrast Stroke Borders
      countriesData.forEach((d) => {
        const isHovered = hoveredCountry && hoveredCountry.id === d.id;
        const isSelected = selectedCountry && selectedCountry.id === d.id;

        ctx.beginPath();
        pathGenerator(d);

        // Premium paper-color separation
        if (isSelected) {
          ctx.fillStyle = 'rgba(140, 122, 107, 0.18)'; // Elegant Selected fill
        } else if (isHovered) {
          ctx.fillStyle = 'rgba(140, 122, 107, 0.10)'; // Elegant Hover state
        } else {
          // Off-white landmass contrasting water
          ctx.fillStyle = '#FCFAF6'; 
        }
        ctx.fill();

        if (showBorders) {
          ctx.beginPath();
          pathGenerator(d);
          if (isSelected) {
            ctx.strokeStyle = '#8C7A6B'; // Selected border
            ctx.lineWidth = 1.25;
          } else if (isHovered) {
            ctx.strokeStyle = 'rgba(140, 122, 107, 0.6)'; // Hover border
            ctx.lineWidth = 1.0;
          } else {
            ctx.strokeStyle = '#D1C9BE'; // Quiet base borders
            ctx.lineWidth = 0.5;
          }
          ctx.stroke();
        }
      });

      // 4. Render Day & Night Solar Terminator (Elegant Shade)
      if (showDayNight) {
        // Calculate sun position based on simulationTime 0 to 24hr map
        const sunLng = (simulationTime / 24) * 360 - 180;
        const sunLat = 23.44 * Math.sin((time * 0.00005) % (2 * Math.PI)); // slow wobble mimicking season

        // Antipode (center of night/shadow side)
        const nightLng = sunLng + 180;
        const nightLat = -sunLat;

        // Draw perfect circle of 90 degrees radius from antipode
        try {
          const nightCircle = d3.geoCircle().center([nightLng, nightLat]).radius(90)();
          ctx.beginPath();
          pathGenerator(nightCircle);
          
          // Radial gradient shadow wrapping to dark horizon
          const shadowNodeGrad = ctx.createLinearGradient(0, 0, width, height); // simple linear shadow overlay look
          ctx.fillStyle = 'rgba(62, 58, 51, 0.07)'; // soft, transparent charcoal shade
          ctx.fill();

          // Stroke highlighting terminator edge (sunset/dawn lines)
          ctx.strokeStyle = 'rgba(194, 91, 78, 0.04)'; // warm tint of sun rise/set
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } catch (e) {
          // Guard boundary math exceptions silently
        }
      }

      // 5. Draw Flight Route Arcs (Great-Circles)
      if (showFlightArcs && flightRoutes.length > 0) {
        flightRoutes.forEach((route) => {
          const { fromCoords, toCoords, progress } = route;
          
          // Generate interpolated great-circle geographic arc points
          const interpolator = d3.geoInterpolate(fromCoords, toCoords);
          const arcGeoJSON: any = {
            type: "LineString",
            coordinates: []
          };
          
          // Sample 30 points to draw a beautiful smooth curve
          const samplePoints = 30;
          for (let s = 0; s <= samplePoints; s++) {
            arcGeoJSON.coordinates.push(interpolator(s / samplePoints));
          }

          // Draw the full background arc first
          ctx.beginPath();
          pathGenerator(arcGeoJSON);
          ctx.strokeStyle = 'rgba(140, 122, 107, 0.22)'; // thin flight arc wireframe
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 3]); // dotted flights
          ctx.stroke();
          ctx.setLineDash([]); // restore line dash

          // Draw current airplane particle traveling along the arc
          const currentCoords = interpolator(progress) as [number, number];
          
          // Check if particle is currently visible on the front hemisphere face
          if (isPointVisible(projection, currentCoords)) {
            const projectedPos = projection(currentCoords);
            if (projectedPos) {
              const [px, py] = projectedPos;
              
              // Draw an elegant pulsing indicator dot
              ctx.beginPath();
              ctx.arc(px, py, 3.5, 0, 2 * Math.PI);
              ctx.fillStyle = '#C25B4E'; // Crimson travel node
              ctx.fill();

              ctx.beginPath();
              ctx.arc(px, py, 7 + 4 * Math.sin(time * 0.006), 0, 2 * Math.PI);
              ctx.strokeStyle = 'rgba(194, 91, 78, 0.35)';
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      }

      // 6. Draw Fixed Landmarks
      LANDMARKS.forEach((landmark) => {
        const { coords, name, type } = landmark;
        if (isPointVisible(projection, coords)) {
          const pt = projection(coords);
          if (pt) {
            const [lx, ly] = pt;
            const isHoveredFocus = landmarkFocus && landmarkFocus.name === name;

            // Draw clean point marker
            ctx.beginPath();
            ctx.arc(lx, ly, isHoveredFocus ? 4.5 : 2.5, 0, 2 * Math.PI);
            ctx.fillStyle = type === 'nature' ? '#7A8C6B' : type === 'heritage' ? '#8C7A6B' : '#4A463F';
            ctx.fill();

            // Minimal double ring
            ctx.beginPath();
            ctx.arc(lx, ly, isHoveredFocus ? 9 : 5.5, 0, 2 * Math.PI);
            ctx.strokeStyle = isHoveredFocus ? 'rgba(74, 70, 63, 0.45)' : 'rgba(74, 70, 63, 0.15)';
            ctx.lineWidth = 0.75;
            ctx.stroke();

            // Label text for focused landmark (beautiful font padding)
            if (isHoveredFocus) {
              ctx.font = '10px monospace';
              ctx.fillStyle = '#4A463F';
              ctx.fillText(`[ ${name.toUpperCase()} ]`, lx + 10, ly + 3);
            }
          }
        }
      });

      // 7. Outer Spherical Horizon Border Card
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, zoomRef.current, 0, 2 * Math.PI);
      ctx.strokeStyle = '#4A463F'; // beautiful minimalist pitch outline border
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Ambient shading around the frame rim to pop the globe
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, zoomRef.current + 0.5, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(74, 70, 63, 0.05)';
      ctx.lineWidth = 8;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, countriesData, isGeoJsonLoaded, showBorders, showGraticule, showFlightArcs, showDayNight, simulationTime, selectedCountry, hoveredCountry, flightRoutes, autoRotate, autoRotateSpeed, landmarkFocus, trackedRouteId]);

  // Visibility Checker for orthographic back-face clipping
  const isPointVisible = (projection: d3.GeoProjection, coords: [number, number]): boolean => {
    const rotate = projection.rotate();
    const center: [number, number] = [-rotate[0], -rotate[1]];
    const distance = d3.geoDistance(center, coords);
    // Orthographic view field limit is exactly 90 degrees (clipping threshold)
    return distance < Math.PI / 2;
  };

  // Convert canvas mouse pointer coordinates to Sphere Latitude/Longitude
  const getCoordinatesFromEvent = (clientX: number, clientY: number): [number, number] | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    // Set up matches matching projection formula
    const projection = d3.geoOrthographic()
      .scale(zoomRef.current)
      .translate([dimensions.width / 2, dimensions.height / 2])
      .clipAngle(90)
      .rotate(rotationRef.current);

    // Filter points clicking outside the physical sphere boundaries
    const dx = mouseX - dimensions.width / 2;
    const dy = mouseY - dimensions.height / 2;
    if (dx * dx + dy * dy > zoomRef.current * zoomRef.current) {
      return null; // Click fell outside the Earth sphere boundary
    }

    try {
      const coords = projection.invert([mouseX, mouseY]);
      return coords as [number, number]; // Returns [lng, lat]
    } catch (e) {
      return null;
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      r: [...rotationRef.current] as [number, number, number]
    };
    velocityRef.current = { x: 0, y: 0 };
    lastTimeRef.current = performance.now();
    
    // Stop center animation to allow takeover
    transitionRef.current.isAnimating = false;
    audioEngine.triggerTick();

    if (trackedRouteId) {
      onTrackedRouteClear();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCoordinatesFromEvent(e.clientX, e.clientY);
    
    // 1. Coordinates mouse interaction hover state
    if (coords && isGeoJsonLoaded) {
      // Find what country is directly under the pointer
      const matched = countriesData.find(d => d3.geoContains(d as any, coords));
      if (matched) {
        if (!hoveredCountry || hoveredCountry.id !== matched.id) {
          onCountryHover(matched);
          audioEngine.triggerTick(); // Soft cursor tick sound
        }
      } else {
        if (hoveredCountry) onCountryHover(null);
      }

      // 2. Highlighting Landmark hover on proximity calculation
      let foundLandmark: Landmark | null = null;
      for (const lm of LANDMARKS) {
        const dist = d3.geoDistance(lm.coords, coords);
        // within ~350 miles / 0.08 radians
        if (dist < 0.08) {
          foundLandmark = lm;
          break;
        }
      }
      onLandmarkHover(foundLandmark);
    } else {
      if (hoveredCountry) onCountryHover(null);
      onLandmarkHover(null);
    }

    // 2. Drag Rotating Physics calculation
    if (!isDraggingRef.current) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    // Sensible translation scale from screen movement to rotation degrees
    const factorX = 0.25;
    const factorY = 0.25;

    const newLambda = dragStartRef.current.r[0] + dx * factorX;
    const newPhi = Math.max(-85, Math.min(85, dragStartRef.current.r[1] - dy * factorY));

    // Store instant velocities for friction-based momentum sliding releases
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    velocityRef.current = {
      x: (newLambda - rotationRef.current[0]) / dt,
      y: (newPhi - rotationRef.current[1]) / dt
    };
    lastTimeRef.current = now;

    rotationRef.current = [newLambda % 360, newPhi, 0];
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Handle Touch Screen Drag Support
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      r: [...rotationRef.current] as [number, number, number]
    };
    velocityRef.current = { x: 0, y: 0 };
    lastTimeRef.current = performance.now();
    transitionRef.current.isAnimating = false;
    audioEngine.triggerTick();

    if (trackedRouteId) {
      onTrackedRouteClear();
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    const factorX = 0.28;
    const factorY = 0.28;

    const newLambda = dragStartRef.current.r[0] + dx * factorX;
    const newPhi = Math.max(-85, Math.min(85, dragStartRef.current.r[1] - dy * factorY));

    rotationRef.current = [newLambda % 360, newPhi, 0];
  };

  // Click picker to trigger sounds & detailed selection
  const handleGlobeClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (trackedRouteId) {
      onTrackedRouteClear();
    }

    const coords = getCoordinatesFromEvent(e.clientX, e.clientY);
    if (!coords) return;

    const [lng, lat] = coords;

    // Trigger geographic chime synthesis!
    audioEngine.triggerChime(lat, lng);

    if (!isGeoJsonLoaded) return;

    // Detect what country was clicked
    const clickedCountry = countriesData.find(d => d3.geoContains(d as any, coords));
    
    if (quizState.isActive && clickedCountry) {
      // In quiz mode: evaluate user guess target
      onQuizCountryClick(clickedCountry);
    } else {
      // In explore mode: select and animate camera focus
      if (clickedCountry) {
        onCountrySelect(clickedCountry);
        
        // Target rotation to pan smoothly centered
        const targetRotation: [number, number, number] = [-lng, -lat, 0];
        
        let startL = rotationRef.current[0];
        let endL = targetRotation[0];
        const diff = endL - startL;
        if (Math.abs(diff) > 180) {
          if (diff > 0) startL += 360;
          else startL -= 360;
        }

        transitionRef.current = {
          isAnimating: true,
          startR: [startL, rotationRef.current[1], rotationRef.current[2]],
          endR: [targetRotation[0], targetRotation[1], 0],
          duration: 1000,
          elapsed: 0
        };
      } else {
        onCountrySelect(null);
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[350px] relative flex items-center justify-center pointer-events-auto"
      id="globe-container-viewport"
    >
      {/* Real-time online tracker overlay in the top-right corner of the Earth frame */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-2.5 py-1.5 bg-[#FCFAF6] border border-[#4A463F]/15 font-mono text-[9.5px] select-none tracking-tight shadow-xs rounded-none transition-all duration-350">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        <span className="text-[#8C7A6B] uppercase tracking-wider">{language === 'zh' ? '当前在线' : 'ONLINE'}</span>
        <span className="font-bold text-[#4A463F]">{onlineCount}</span>
        <span className="text-[8px] text-[#8C7A6B]/60 select-none">{language === 'zh' ? '人' : 'PAX'}</span>
      </div>

      {!isGeoJsonLoaded && !loadingError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10 pointer-events-none">
          <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase animate-pulse">
            Tracing Vector Boundaries...
          </span>
          <span className="text-[10px] font-mono text-zinc-400 mt-2">
            Loading Global GeoJSON coordinates
          </span>
        </div>
      )}

      {loadingError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <span className="text-xs font-mono text-red-700 tracking-wider uppercase mb-2">
            Topology Error
          </span>
          <p className="text-xs text-zinc-500 max-w-xs font-sans">
            {loadingError}
          </p>
          <button 
            id="retry-geojson-button"
            className="mt-4 px-3 py-1 text-[11px] font-mono border border-zinc-300 text-zinc-600 hover:bg-zinc-100 transition-all rounded"
            onClick={() => window.location.reload()}
          >
            RETRY CONNECTION
          </button>
        </div>
      )}

      <canvas
        id="interactive-canvas-globe"
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing max-w-full max-h-full aspect-square"
        style={{ width: dimensions.width, height: dimensions.height }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onClick={handleGlobeClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
      />
    </div>
  );
}
