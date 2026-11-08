const STORAGE_KEY = "mindcraft_active_canvas_v1";
const VIEWPORT_STORAGE_KEY = "noteline_active_viewport_v1";

function loadPersistedCanvas() {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.nodes) && Array.isArray(parsed.edges)) {
      return {
        nodes: parsed.nodes,
        edges: parsed.edges,
        selectedNodeId: parsed.selectedNodeId || null
      };
    }
  } catch {
  }
  return null;
}

let saveTimer = null;
function persistCanvas(nodes, edges, selectedNodeId = null) {
  if (typeof window === "undefined") return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        nodes,
        edges,
        selectedNodeId,
        savedAt: Date.now()
      }));
    } catch {
    }
  }, 300);
}

function clearPersistedCanvas() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(VIEWPORT_STORAGE_KEY);
  } catch {
  }
}

function loadPersistedViewport() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const raw = localStorage.getItem(VIEWPORT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.x === "number" &&
      typeof parsed?.y === "number" &&
      typeof parsed?.zoom === "number"
    ) {
      return { x: parsed.x, y: parsed.y, zoom: parsed.zoom };
    }
  } catch {}
  return null;
}

let viewportSaveTimer = null;
function persistViewport(viewport) {
  if (typeof window === "undefined" || !window.localStorage || !viewport) return;
  if (viewportSaveTimer) clearTimeout(viewportSaveTimer);
  viewportSaveTimer = setTimeout(() => {
    try {
      localStorage.setItem(
        VIEWPORT_STORAGE_KEY,
        JSON.stringify({ x: viewport.x, y: viewport.y, zoom: viewport.zoom, timestamp: Date.now() })
      );
    } catch {}
  }, 150);
}

function persistViewportSync(viewport) {
  if (typeof window === "undefined" || !window.localStorage || !viewport) return;
  if (viewportSaveTimer) clearTimeout(viewportSaveTimer);
  try {
    localStorage.setItem(
      VIEWPORT_STORAGE_KEY,
      JSON.stringify({ x: viewport.x, y: viewport.y, zoom: viewport.zoom, timestamp: Date.now() })
    );
  } catch {}
}

function clearPersistedViewport() {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    localStorage.removeItem(VIEWPORT_STORAGE_KEY);
  } catch {}
}

export {
  STORAGE_KEY,
  VIEWPORT_STORAGE_KEY,
  clearPersistedCanvas,
  loadPersistedCanvas,
  persistCanvas,
  loadPersistedViewport,
  persistViewport,
  persistViewportSync,
  clearPersistedViewport
};
