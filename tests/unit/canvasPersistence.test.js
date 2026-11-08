import { describe, test, expect } from "./testRunner.js";
import {
  loadPersistedViewport,
  persistViewportSync,
  clearPersistedViewport,
  loadPersistedCanvas
} from "../../src/features/canvas/store/canvasPersistence.js";
import { calculateDagreLayout } from "../../src/features/layout/algorithms/dagreTreeLayout.js";
import { getViewportForBounds } from "@xyflow/system";

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

  test("getViewportForBounds centers a single user card with maxZoom clamped to 1.0", () => {
    const screenWidth = 1200;
    const screenHeight = 800;
    const singleNodeBounds = { x: 500, y: 250, width: 220, height: 110 };

    const vp = getViewportForBounds(singleNodeBounds, screenWidth, screenHeight, 0.15, 1.0, 0.2);
    expect(vp.zoom).toBe(1.0);

    const screenCenterX = (singleNodeBounds.x + singleNodeBounds.width / 2) * vp.zoom + vp.x;
    const screenCenterY = (singleNodeBounds.y + singleNodeBounds.height / 2) * vp.zoom + vp.y;

    expect(Math.round(screenCenterX)).toBe(screenWidth / 2);
    expect(Math.round(screenCenterY)).toBe(screenHeight / 2);
  });

  test("getViewportForBounds centers a collection of user cards across canvas", () => {
    const screenWidth = 1200;
    const screenHeight = 800;
    // Bounding box of a tree or cluster of cards created by the user
    const clusterBounds = { x: 150, y: 100, width: 900, height: 500 };

    const vp = getViewportForBounds(clusterBounds, screenWidth, screenHeight, 0.15, 1.0, 0.2);
    const screenCenterX = (clusterBounds.x + clusterBounds.width / 2) * vp.zoom + vp.x;
    const screenCenterY = (clusterBounds.y + clusterBounds.height / 2) * vp.zoom + vp.y;

    expect(Math.round(screenCenterX)).toBe(screenWidth / 2);
    expect(Math.round(screenCenterY)).toBe(screenHeight / 2);
  });
});
