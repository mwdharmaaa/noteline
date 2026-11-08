import { describe, test, expect } from "./testRunner.js";
import { DEFAULT_CANVAS_SETTINGS, SETTINGS_STORAGE_KEY } from "../../src/features/settings/types/settings.types.js";
import { loadCanvasSettings, saveCanvasSettings, clearCanvasSettings } from "../../src/features/settings/services/settingsStorage.js";

// Mock localStorage for Node environment
const mockStorage = new Map();
global.window = {
  localStorage: {
    getItem: (key) => mockStorage.get(key) || null,
    setItem: (key, val) => mockStorage.set(key, String(val)),
    removeItem: (key) => mockStorage.delete(key),
    clear: () => mockStorage.clear()
  }
};

describe("Canvas Settings Contracts & Storage", () => {
  test("DEFAULT_CANVAS_SETTINGS provides calibrated baselines", () => {
    expect(DEFAULT_CANVAS_SETTINGS.scrollSpeed).toBe(1.5);
    expect(DEFAULT_CANVAS_SETTINGS.touchPinchExponent).toBe(2.0);
    expect(DEFAULT_CANVAS_SETTINGS.wheelZoomSpeed).toBe(1.0);
    expect(DEFAULT_CANVAS_SETTINGS.trackpadPinchSpeed).toBe(1.0);
    expect(DEFAULT_CANVAS_SETTINGS.invertScroll).toBe(false);
    expect(DEFAULT_CANVAS_SETTINGS.invertZoom).toBe(false);
    expect(DEFAULT_CANVAS_SETTINGS.wheelMode).toBe("pan");
    expect(SETTINGS_STORAGE_KEY).toBe("noteline_canvas_navigation_settings");
  });

  test("loadCanvasSettings falls back to defaults when empty", () => {
    mockStorage.clear();
    const settings = loadCanvasSettings();
    expect(settings.scrollSpeed).toBe(1.5);
    expect(settings.touchPinchExponent).toBe(2.0);
    expect(settings.wheelMode).toBe("pan");
  });

  test("saveCanvasSettings and loadCanvasSettings persist roundtrip cleanly", () => {
    mockStorage.clear();
    const custom = {
      scrollSpeed: 2.2,
      invertScroll: true,
      wheelZoomSpeed: 1.4,
      trackpadPinchSpeed: 1.8,
      touchPinchExponent: 2.75,
      invertZoom: true,
      wheelMode: "zoom"
    };

    saveCanvasSettings(custom);
    const loaded = loadCanvasSettings();

    expect(loaded.scrollSpeed).toBe(2.2);
    expect(loaded.invertScroll).toBe(true);
    expect(loaded.wheelZoomSpeed).toBe(1.4);
    expect(loaded.trackpadPinchSpeed).toBe(1.8);
    expect(loaded.touchPinchExponent).toBe(2.75);
    expect(loaded.invertZoom).toBe(true);
    expect(loaded.wheelMode).toBe("zoom");
  });

  test("loadCanvasSettings sanitizes corrupted or partial payload safely", () => {
    mockStorage.set(SETTINGS_STORAGE_KEY, "invalid-json-content{");
    const corruptedFallback = loadCanvasSettings();
    expect(corruptedFallback.scrollSpeed).toBe(1.5);

    mockStorage.set(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({ scrollSpeed: "not-a-number", wheelMode: "unknown-action" })
    );
    const partialFallback = loadCanvasSettings();
    expect(partialFallback.scrollSpeed).toBe(1.5);
    expect(partialFallback.wheelMode).toBe("pan");
  });

  test("clearCanvasSettings purges storage correctly", () => {
    mockStorage.set(SETTINGS_STORAGE_KEY, JSON.stringify({ scrollSpeed: 3.0 }));
    clearCanvasSettings();
    expect(mockStorage.has(SETTINGS_STORAGE_KEY)).toBeFalsy();
  });
});
