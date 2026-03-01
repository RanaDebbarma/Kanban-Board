import { useRef, useState } from "react";
import useBoard from "../hooks/useBoard";

export default function DraggableCard({ children, cardId, srcColumnId }) {
  const { dispatch } = useBoard();

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const isPointerDown = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handlePointerDown = (e) => {
    // Don't start drag on interactive elements
    const isInteractive = e.target.closest("button, input, textarea");
    if (isInteractive) return;
    
    isPointerDown.current = true;

    lastPoint.current = {
      x: e.clientX,
      y: e.clientY,
    };

    // e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isPointerDown.current) return;

    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;

    if (!isDragging) {
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 5) return;

      setIsDragging(true);
      setZIndex(999);
    }

    setPos((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    lastPoint.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handlePointerUp = (e) => {
    
    if (!isPointerDown.current) return;
    
    isPointerDown.current = false;

    // e.currentTarget.releasePointerCapture(e.pointerId);

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
          cardId: cardId,
          srcId: srcColumnId,
          dstId: destColumn.dataset.columnId,
        },
      });

      // console.log("source: ", srcColumnId);
      // console.log("destination: ", destColumn.dataset.columnId);
    }

    // Reset position
    setPos({ x: 0, y: 0 });
    setZIndex(0);
  };

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: "100%",
        transform: `
          translate(${pos.x}px, ${pos.y}px)
          ${isDragging ? "scale(1.05)" : "scale(1)"}
        `,

        zIndex: zIndex,
        touchAction: "none",

        transition: isDragging ? "none" : "transform 0.15s ease",

        ...(isDragging
          ? {
              boxShadow: "0px 4px 8px hsl(0, 0%, 0%, 0.5)",
              cursor: "grabbing",
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
}
