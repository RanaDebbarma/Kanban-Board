import { useRef, useState } from "react";
import useBoard from "../hooks/useBoard";

export default function DraggableCard({ children, cardId, srcColumnId }) {
  const { dispatch } = useBoard();

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const holdTimeout = useRef(null);
  const isPointerDown = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);

  /* -------------------- POINTER DOWN -------------------- */

  const handlePointerDown = (e) => {
    if (e.target.closest("button, input, textarea")) return;

    lastPoint.current = { x: e.clientX, y: e.clientY };

    if (e.pointerType === "touch") {
      holdTimeout.current = setTimeout(() => {
        isPointerDown.current = true;
        setIsActive(true);

        if (navigator.vibrate) navigator.vibrate(10);
      }, 500);
    } else {
      isPointerDown.current = true;
    }
  };

  /* -------------------- POINTER MOVE -------------------- */

  const handlePointerMove = (e) => {
    if (!isPointerDown.current) {
      const dx = e.clientX - lastPoint.current.x;
      const dy = e.clientY - lastPoint.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 15 && holdTimeout.current) {
        clearTimeout(holdTimeout.current);
        holdTimeout.current = null;
      }

      return;
    }

    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;

    if (!isDragging) {
      const distance = Math.hypot(dx, dy);
      if (distance < 5) return;

      setIsDragging(true);
      setZIndex(999);
    }

    setPos((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    lastPoint.current = { x: e.clientX, y: e.clientY };

    // Detect hovered column
    cardRef.current.style.pointerEvents = "none";
    const element = document.elementFromPoint(e.clientX, e.clientY);
    const destColumn = element?.closest("[data-column-id]");
    cardRef.current.style.pointerEvents = "auto";

    if (destColumn) {
      dispatch({
        type: "SET_HOVERED_COLUMN",
        payload: {
          hoverColumnId: destColumn.dataset.columnId,
        },
      });
    }
  };

  /* -------------------- POINTER UP -------------------- */

  const handlePointerUp = (e) => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }

    setIsActive(false);

    if (!isPointerDown.current) return;
    isPointerDown.current = false;

    if (!isDragging) return;

    setIsDragging(false);

    cardRef.current.style.pointerEvents = "none";
    const element = document.elementFromPoint(e.clientX, e.clientY);
    const destColumn = element?.closest("[data-column-id]");
    cardRef.current.style.pointerEvents = "auto";

    if (destColumn) {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          cardId,
          srcId: srcColumnId,
          dstId: destColumn.dataset.columnId,
        },
      });
    }

    dispatch({
      type: "SET_HOVERED_COLUMN",
      payload: { hoverColumnId: null },
    });

    setPos({ x: 0, y: 0 });
    setZIndex(0);
  };

  /* -------------------- RENDER -------------------- */

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: "100%",
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${isActive || isDragging ? 1.09 : 1})`,
        zIndex,
        touchAction: "none",
        transition: isDragging ? "none" : "transform 0.15s ease",
        ...(isDragging && {
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          cursor: "grabbing",
        }),
      }}
    >
      {children}
    </div>
  );
}