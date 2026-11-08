import { DEFAULT_CANVAS_SETTINGS, SETTINGS_STORAGE_KEY } from "../types/settings.types.js";

export const loadCanvasSettings = () => {
  if (typeof window === "undefined" || !window.localStorage) {
    return { ...DEFAULT_CANVAS_SETTINGS };
  }

  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_CANVAS_SETTINGS };
    const parsed = JSON.parse(raw);
    return {
      scrollSpeed: typeof parsed.scrollSpeed === "number" ? parsed.scrollSpeed : DEFAULT_CANVAS_SETTINGS.scrollSpeed,
      invertScroll: Boolean(parsed.invertScroll),
      wheelZoomSpeed: typeof parsed.wheelZoomSpeed === "number" ? parsed.wheelZoomSpeed : DEFAULT_CANVAS_SETTINGS.wheelZoomSpeed,
      trackpadPinchSpeed: typeof parsed.trackpadPinchSpeed === "number" ? parsed.trackpadPinchSpeed : DEFAULT_CANVAS_SETTINGS.trackpadPinchSpeed,
      touchPinchExponent: typeof parsed.touchPinchExponent === "number" ? parsed.touchPinchExponent : DEFAULT_CANVAS_SETTINGS.touchPinchExponent,
      invertZoom: Boolean(parsed.invertZoom),
      wheelMode: parsed.wheelMode === "zoom" ? "zoom" : "pan"
    };
  } catch {
    return { ...DEFAULT_CANVAS_SETTINGS };
  }
};

export const saveCanvasSettings = (settings) => {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Graceful degradation when quota exceeded
  }
};

export const clearCanvasSettings = () => {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.removeItem(SETTINGS_STORAGE_KEY);
  } catch {
    // Graceful fallback
  }
};
