// Web Audio API Synthesizer for Minimalist Globe Audio Feedback

class MinimalAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayGain: GainNode | null = null;
  
  // Humming drone resources
  private humOsc1: OscillatorNode | null = null;
  private humOsc2: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  
  // Status
  private isMuted: boolean = false;
  private droneVolume: number = 0.15;
  private activeScaleName: 'pentatonic' | 'ambient' | 'harmonic_minor' = 'pentatonic';

  // Musical Scales
  private scales = {
    pentatonic: [146.83, 164.81, 196.00, 220.00, 293.66, 329.63, 392.00, 440.00, 587.33, 659.25, 783.99, 880.00], // D Major Pentatonic
    ambient: [110.00, 165.00, 220.00, 275.00, 330.00, 440.00, 495.00, 550.00, 660.00, 770.00, 880.00, 990.00],    // A Quintal / Grounded Perfect 5ths
    harmonic_minor: [116.54, 130.81, 146.83, 155.56, 185.00, 196.00, 220.00, 233.08, 277.18, 311.13, 392.00, 440.00] // D Harmonic Minor
  };

  constructor() {
    // Initialized lazily on first user interaction to bypass browser Autoplay policy
  }

  private init() {
    if (this.ctx) return;
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Create recursive soft echo filter
      this.delayNode = this.ctx.createDelay(2.0);
      this.delayGain = this.ctx.createGain();
      
      this.delayNode.delayTime.setValueAtTime(0.6, this.ctx.currentTime);
      this.delayGain.gain.setValueAtTime(0.4, this.ctx.currentTime); // feed back level

      // Node wiring
      this.masterGain.connect(this.delayNode);
      this.delayNode.connect(this.delayGain);
      this.delayGain.connect(this.delayNode); // loopback
      this.delayGain.connect(this.ctx.destination); // send to master out

      this.startDrone();
    } catch (e) {
      console.warn("Web Audio API is not fully supported or restricted:", e);
    }
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(vol: number) {
    this.init();
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime + 0.1);
    }
  }

  setScale(scale: 'pentatonic' | 'ambient' | 'harmonic_minor') {
    this.activeScaleName = scale;
  }

  // Dual detuned low frequency oscs create a soft spinning spatial hum
  private startDrone() {
    if (!this.ctx || !this.masterGain) return;

    try {
      this.humGain = this.ctx.createGain();
      this.humGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.humGain.connect(this.masterGain);

      // Low rumble 1
      this.humOsc1 = this.ctx.createOscillator();
      this.humOsc1.type = 'triangle';
      this.humOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1

      // Low rumble 2 (slightly detuned to create dynamic phase motion)
      this.humOsc2 = this.ctx.createOscillator();
      this.humOsc2.type = 'sine';
      this.humOsc2.frequency.setValueAtTime(55.3, this.ctx.currentTime);

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(90, this.ctx.currentTime);

      this.humOsc1.connect(lowpass);
      this.humOsc2.connect(lowpass);
      lowpass.connect(this.humGain);

      this.humOsc1.start();
      this.humOsc2.start();

      // Fade in drone smoothly
      this.humGain.gain.linearRampToValueAtTime(this.droneVolume, this.ctx.currentTime + 2.0);
    } catch (e) {
      console.error("Drone failed to start", e);
    }
  }

  setHumming(enabled: boolean) {
    this.resume();
    if (!this.ctx || !this.humGain) return;
    const targetVal = enabled ? this.droneVolume : 0;
    this.humGain.gain.linearRampToValueAtTime(targetVal, this.ctx.currentTime + 1.0);
  }

  adjustHumSpeed(speed: number) {
    if (!this.ctx || !this.humOsc1 || !this.humOsc2) return;
    const baseFreq = 55 + Math.min(40, speed * 25);
    this.humOsc1.frequency.exponentialRampToValueAtTime(baseFreq, this.ctx.currentTime + 0.5);
    this.humOsc2.frequency.exponentialRampToValueAtTime(baseFreq + 0.3, this.ctx.currentTime + 0.5);
  }

  // Geographically mapped synth bell triggers
  triggerChime(lat: number, lng: number) {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const scale = this.scales[this.activeScaleName];
      // Map latitude (-90 to 90) to scale index (0 to length-1)
      const latNormalized = (lat + 90) / 180;
      const noteIndex = Math.floor(latNormalized * scale.length);
      const frequency = scale[Math.max(0, Math.min(scale.length - 1, noteIndex))];

      const now = this.ctx.currentTime;

      // Create synthetic sine/bell pair
      const osc = this.ctx.createOscillator();
      const oscMod = this.ctx.createOscillator();
      const modGain = this.ctx.createGain();
      const chimeGain = this.ctx.createGain();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      // FM Bell synthesis sound characteristics
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, now);

      oscMod.type = 'sine';
      oscMod.frequency.setValueAtTime(frequency * 1.5, now);
      modGain.gain.setValueAtTime(frequency * 0.8, now);
      modGain.gain.linearRampToValueAtTime(0, now + 0.4);

      // Simple routing: oscMod -> modGain -> osc.frequency (frequency modulation)
      oscMod.connect(modGain);
      modGain.connect(osc.frequency);

      // Stereo panning based on longitude (-180 to 180 mapped to -1 to 1)
      const panVal = Math.max(-1, Math.min(1, lng / 180));
      if (panner) {
        panner.pan.setValueAtTime(panVal, now);
        osc.connect(chimeGain);
        chimeGain.connect(panner);
        panner.connect(this.masterGain);
      } else {
        osc.connect(chimeGain);
        chimeGain.connect(this.masterGain);
      }

      // Bell envelope (instant attack, long decay)
      chimeGain.gain.setValueAtTime(0, now);
      chimeGain.gain.linearRampToValueAtTime(0.18, now + 0.005);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.start(now);
      oscMod.start(now);
      osc.stop(now + 1.9);
      oscMod.stop(now + 1.9);
    } catch (e) {
      console.error("Failed to trig bell chime", e);
    }
  }

  // Page-turn, mechanical spin or scroll click tick (very short noise brush)
  triggerTick() {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const tickGain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2000, now);
      // Swept frequency down fast mimics a wooden block tick
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.03);

      tickGain.gain.setValueAtTime(0, now);
      tickGain.gain.linearRampToValueAtTime(0.04, now + 0.002);
      tickGain.gain.linearRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(tickGain);
      tickGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch (e) {
      // Ignored gracefully
    }
  }

  // Trigger feedback sound for interactive quiz
  triggerSuccess() {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // Soft minor/major chord progression chime
      const notes = [329.63, 440.00, 523.25, 659.25]; // Am chord arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gainNode.gain.setValueAtTime(0, now + idx * 0.08);
        gainNode.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.004);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);

        osc.connect(gainNode);
        gainNode.connect(this.masterGain!);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.9);
      });
    } catch (e) {}
  }

  triggerFailure() {
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [196.00, 185.00]; // descending melancholy interval
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);

        gainNode.gain.setValueAtTime(0, now + idx * 0.15);
        gainNode.gain.linearRampToValueAtTime(0.10, now + idx * 0.15 + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.15 + 0.4);

        osc.connect(gainNode);
        gainNode.connect(this.masterGain!);

        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 0.5);
      });
    } catch (e) {}
  }
}

export const audioEngine = new MinimalAudioEngine();
