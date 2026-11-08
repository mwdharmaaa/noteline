import { describe, test, expect } from "./testRunner.js";
import {
  loadPersistedViewport,
  persistViewportSync,
  clearPersistedViewport,
  loadPersistedCanvas
} from "../../src/features/canvas/store/canvasPersistence.js";
import { calculateDagreLayout } from "../../src/features/layout/algorithms/dagreTreeLayout.js";

const mockStorage = new Map();
global.window = {
  localStorage: {
    getItem: (key) => mockStorage.get(key) || null,
    setItem: (key, val) => mockStorage.set(key, String(val)),
    removeItem: (key) => mockStorage.delete(key),
    clear: () => mockStorage.clear()
  }
};
global.localStorage = global.window.localStorage;

describe("Canvas Persistence & Empty Layout Contracts", () => {
  test("persists and restores viewport state synchronously", () => {
    mockStorage.clear();
    const testViewport = { x: 340.5, y: -120.25, zoom: 0.85 };

    persistViewportSync(testViewport);
    const restored = loadPersistedViewport();

    expect(!!restored).toBe(true);
    expect(restored.x).toBe(340.5);
    expect(restored.y).toBe(-120.25);
    expect(restored.zoom).toBe(0.85);
  });

  test("clearPersistedViewport clears the saved viewport entry", () => {
    mockStorage.clear();
    persistViewportSync({ x: 100, y: 100, zoom: 1 });
    clearPersistedViewport();

    const restored = loadPersistedViewport();
    expect(restored).toBe(null);
  });

  test("loadPersistedCanvas accepts empty nodes array without discarding user deletion", () => {
    mockStorage.clear();
    mockStorage.set(
      "mindcraft_active_canvas_v1",
      JSON.stringify({ nodes: [], edges: [], selectedNodeId: null, savedAt: Date.now() })
    );

    const loaded = loadPersistedCanvas();
    expect(!!loaded).toBe(true);
    expect(Array.isArray(loaded.nodes)).toBe(true);
    expect(loaded.nodes.length).toBe(0);
    expect(loaded.edges.length).toBe(0);
  });

  test("calculateDagreLayout handles empty nodes gracefully without exceptions", () => {
    const result = calculateDagreLayout([], [], "LR");
    expect(result.nodes.length).toBe(0);
    expect(result.edges.length).toBe(0);
  });
});
