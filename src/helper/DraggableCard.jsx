import { useRef, useState } from "react";
import useBoard from "../hooks/useBoard";

export default function DraggableCard({ children, cardId, srcColumnId }) {
  const { dispatch } = useBoard();

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(0);

  const lastPoint = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const cardRef = useRef(null);

  const handlePointerDown = (e) => {
    // Don't start drag on interactive elements
    const isInteractive = e.target.closest("button, input, textarea");
    if (isInteractive) return;

    isDragging.current = true;
    lastPoint.current = {
      x: e.clientX,
      y: e.clientY,
    };

    setZIndex(999);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;

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
    if (!isDragging.current) return;
    
    isDragging.current = false;
    
    e.currentTarget.releasePointerCapture(e.pointerId);
    
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
    setPos({
      x: 0,
      y: 0,
    });

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
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        zIndex: zIndex,

        backgroundColor: "white",
      }}
    >
      {children}
    </div>
  );
}
