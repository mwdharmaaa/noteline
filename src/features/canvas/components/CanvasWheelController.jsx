import { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";
import { useCanvasSettingsStore } from "@/features/settings/store/canvasSettingsStore";
import { persistViewport } from "@/features/canvas/store/canvasPersistence";

const CanvasWheelController = () => {
  const { getViewport, setViewport } = useReactFlow();
  useEffect(() => {
    const container = document.querySelector(".react-flow");
    if (!container) return;

    let touchPinch = null;

    const handleWheel = (e) => {
      const target = e.target;
      if (target?.closest("input, textarea, select, [data-no-wheel]")) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const viewport = getViewport();
      const {
        scrollSpeed,
        invertScroll,
        wheelZoomSpeed,
        trackpadPinchSpeed,
        invertZoom,
        wheelMode
      } = useCanvasSettingsStore.getState().settings;

      const isZoomGesture = wheelMode === "zoom"
        ? !e.shiftKey
        : (e.ctrlKey || e.metaKey || e.altKey);

      if (isZoomGesture) {
        const rawDelta = e.deltaMode === 1 ? e.deltaY * 18 : e.deltaMode === 2 ? e.deltaY * 50 : e.deltaY;
        const isDiscreteWheel = Math.abs(rawDelta) >= 80;
        const basePinchVelocity = 0.12 * trackpadPinchSpeed;
        const baseDiscreteStep = 0.85 * wheelZoomSpeed;
        const stepDelta = isDiscreteWheel
          ? Math.sign(rawDelta) * baseDiscreteStep
          : Math.sign(rawDelta) * Math.min(Math.abs(rawDelta) * basePinchVelocity, 1.25);
        const normalizedDelta = invertZoom ? -stepDelta : stepDelta;
        const factor = Math.exp(-normalizedDelta);
        const nextZoom = Math.min(Math.max(viewport.zoom * factor, 0.15), 2.5);

        if (Math.abs(nextZoom - viewport.zoom) < 1e-4) {
          return;
        }

        const rect = container.getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const cursorY = e.clientY - rect.top;
        const newX = cursorX - (cursorX - viewport.x) * (nextZoom / viewport.zoom);
        const newY = cursorY - (cursorY - viewport.y) * (nextZoom / viewport.zoom);

        const nextVp = { x: newX, y: newY, zoom: nextZoom };
        setViewport(nextVp);
        persistViewport(nextVp);
        return;
      }
      const effectiveScrollSpeed = scrollSpeed * (invertScroll ? -1 : 1);
      let dx = 0;
      let dy = 0;
      if (Math.abs(e.deltaX) > 0) {
        dx = -e.deltaX * effectiveScrollSpeed;
        dy = -e.deltaY * effectiveScrollSpeed;
      } else {
        if (e.shiftKey) {
          dx = -e.deltaY * effectiveScrollSpeed;
        } else {
          dy = -e.deltaY * effectiveScrollSpeed;
        }
      }
      const nextVp = {
        x: viewport.x + dx,
        y: viewport.y + dy,
        zoom: viewport.zoom
      };
      setViewport(nextVp);
      persistViewport(nextVp);
    };

    const handleTouchStart = (e) => {
      if (e.target?.closest("input, textarea, select, [data-no-wheel]")) {
        return;
      }
      if (e.touches.length === 2) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const midX = (t1.clientX + t2.clientX) / 2;
        const midY = (t1.clientY + t2.clientY) / 2;
        touchPinch = {
          dist,
          midX,
          midY,
          vp: getViewport()
        };
      } else {
        touchPinch = null;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && touchPinch && touchPinch.dist > 5) {
        e.preventDefault();
        e.stopPropagation();

        const { touchPinchExponent, invertZoom } = useCanvasSettingsStore.getState().settings;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const baseRatio = currentDist / touchPinch.dist;
        const ratio = invertZoom ? (1 / Math.max(baseRatio, 0.001)) : baseRatio;

        const factor = Math.pow(ratio, touchPinchExponent);

        const baseVp = touchPinch.vp;
        const nextZoom = Math.min(Math.max(baseVp.zoom * factor, 0.15), 2.5);

        if (Math.abs(nextZoom - baseVp.zoom) < 1e-4) {
          return;
        }

        const rect = container.getBoundingClientRect();
        const cursorX = touchPinch.midX - rect.left;
        const cursorY = touchPinch.midY - rect.top;
        const currentMidX = (t1.clientX + t2.clientX) / 2;
        const currentMidY = (t1.clientY + t2.clientY) / 2;
        const panX = currentMidX - touchPinch.midX;
        const panY = currentMidY - touchPinch.midY;

        const newX = cursorX - (cursorX - baseVp.x) * (nextZoom / baseVp.zoom) + panX;
        const newY = cursorY - (cursorY - baseVp.y) * (nextZoom / baseVp.zoom) + panY;

        const nextVp = { x: newX, y: newY, zoom: nextZoom };
        setViewport(nextVp);
        persistViewport(nextVp);
      }
    };

    const handleTouchEnd = (e) => {
      if (e.touches.length < 2) {
        touchPinch = null;
      }
    };

    const preventWindowOverscroll = (e) => {
      if (e.target?.closest("input, textarea, select, [data-no-wheel], .overflow-y-auto, .overflow-auto")) {
        return;
      }
      e.preventDefault();
    };

    window.addEventListener("wheel", preventWindowOverscroll, { passive: false });
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", preventWindowOverscroll);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [getViewport, setViewport]);
  return null;
};
export {
  CanvasWheelController
};
