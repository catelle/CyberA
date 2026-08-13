import { Howl, Howler } from "howler";

// Unlock AudioContext on first user interaction — Howler handles this
// automatically, but we also call ctx.resume() defensively.
function unlock() {
  try { Howler.ctx?.resume(); } catch { /* ignore */ }
}
if (typeof window !== "undefined") {
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
}

const SAMPLE_RATE = 22050;

function encodeWav(buffer: Float32Array, sampleRate: number): string {
  const frameCount = buffer.length;
  const wavBuffer = new ArrayBuffer(44 + frameCount * 2);
  const view = new DataView(wavBuffer);
  const write = (offset: number, str: string) =>
    [...str].forEach((c, i) => view.setUint8(offset + i, c.charCodeAt(0)));
  write(0, "RIFF");
  view.setUint32(4, 36 + frameCount * 2, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, frameCount * 2, true);
  for (let i = 0; i < frameCount; i++) {
    view.setInt16(44 + i * 2, Math.max(-1, Math.min(1, buffer[i])) * 0x7fff, true);
  }

  return URL.createObjectURL(new Blob([wavBuffer], { type: "audio/wav" }));
}

function synth(frequencies: number[], durations: number[], delays: number[]): Howl {
  // Build a tiny WAV in memory using Web Audio API offline rendering,
  // then hand it to Howler as a blob URL.
  const totalDuration = Math.max(
    ...frequencies.map((_, i) => (delays[i] ?? 0) + (durations[i] ?? 0.3))
  );
  const frameCount = Math.ceil(SAMPLE_RATE * totalDuration);
  const buffer = new Float32Array(frameCount);

  frequencies.forEach((freq, i) => {
    const startFrame = Math.floor((delays[i] ?? 0) * SAMPLE_RATE);
    const endFrame = Math.min(
      startFrame + Math.floor((durations[i] ?? 0.3) * SAMPLE_RATE),
      frameCount
    );
    for (let f = startFrame; f < endFrame; f++) {
      const t = (f - startFrame) / SAMPLE_RATE;
      const env = Math.exp(-t * 6);
      buffer[f] += Math.sin(2 * Math.PI * freq * t) * 0.22 * env;
    }
  });

  return new Howl({ src: [encodeWav(buffer, SAMPLE_RATE)], format: ["wav"], volume: 0.7 });
}

const AMBIENT_LOOP_SECONDS = 8;
const AMBIENT_VOLUME = 0.13;

function synthAmbientLoop(frequencies: number[], durationSeconds: number, volume: number): Howl {
  const frameCount = Math.ceil(SAMPLE_RATE * durationSeconds);
  const buffer = new Float32Array(frameCount);

  frequencies.forEach((freq) => {
    // Snap each voice so it completes a whole number of cycles within the loop
    // duration — this keeps the loop boundary phase-continuous, so it repeats
    // seamlessly with no click or gap, no fade needed.
    const cycles = Math.max(1, Math.round(freq * durationSeconds));
    const adjustedFreq = cycles / durationSeconds;
    for (let f = 0; f < frameCount; f++) {
      const t = f / SAMPLE_RATE;
      buffer[f] += Math.sin(2 * Math.PI * adjustedFreq * t) * 0.11;
    }
  });

  return new Howl({ src: [encodeWav(buffer, SAMPLE_RATE)], format: ["wav"], loop: true, volume });
}

// Lazily created so they only render in the browser
let _correct: Howl | null = null;
let _wrong: Howl | null = null;
let _open: Howl | null = null;
let _celebrate: Howl | null = null;
let _coach: Howl | null = null;

export function playCorrect() {
  if (typeof window === "undefined") return;
  _correct ??= synth([523, 659, 784], [0.15, 0.15, 0.25], [0, 0.12, 0.24]);
  _correct.play();
}

export function playWrong() {
  if (typeof window === "undefined") return;
  _wrong ??= synth([220, 180], [0.14, 0.22], [0, 0.12]);
  _wrong.play();
}

export function playLessonOpen() {
  if (typeof window === "undefined") return;
  _open ??= synth([440, 554, 659], [0.12, 0.12, 0.22], [0, 0.11, 0.22]);
  _open.play();
}

export function playCoachAppear() {
  if (typeof window === "undefined") return;
  _coach ??= synth([784, 988], [0.1, 0.18], [0, 0.09]);
  _coach.play();
}

export function playCelebrate() {
  if (typeof window === "undefined") return;
  _celebrate ??= synth(
    [523, 659, 784, 1047, 1319],
    [0.18, 0.18, 0.18, 0.18, 0.32],
    [0, 0.12, 0.24, 0.36, 0.5]
  );
  _celebrate.play();
}

// Soft, low, sustained C-E-G pad — a gentle background bed for lesson screens.
let _ambient: Howl | null = null;

function getAmbient(): Howl {
  _ambient ??= synthAmbientLoop([130.81, 164.81, 196.0], AMBIENT_LOOP_SECONDS, AMBIENT_VOLUME);
  return _ambient;
}

export function startAmbientLoop() {
  if (typeof window === "undefined") return;
  const ambient = getAmbient();
  if (ambient.playing()) return;
  ambient.volume(0);
  ambient.play();
  ambient.fade(0, AMBIENT_VOLUME, 700);
}

export function stopAmbientLoop() {
  if (typeof window === "undefined" || !_ambient || !_ambient.playing()) return;
  _ambient.fade(_ambient.volume(), 0, 400);
  window.setTimeout(() => _ambient?.stop(), 420);
}

const MUTE_STORAGE_KEY = "cybera:soundMuted";

export function isSoundMuted(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(MUTE_STORAGE_KEY) === "1";
}

export function setSoundMuted(muted: boolean) {
  if (typeof window === "undefined") return;
  Howler.mute(muted);
  window.localStorage.setItem(MUTE_STORAGE_KEY, muted ? "1" : "0");
}

// Apply any persisted mute preference as soon as this module loads in the browser.
if (typeof window !== "undefined") {
  Howler.mute(isSoundMuted());
}
