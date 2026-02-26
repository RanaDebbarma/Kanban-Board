import { useState, useEffect } from "react";
import useBoard from "../hooks/useBoard";
import styles from "./Card.module.css";

export default function Card({ card }) {
  const { dispatch } = useBoard();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);

  // Keep local state in sync if global state changes
  useEffect(() => {
    setTitle(card.title);
  }, [card.title]);

  useEffect(() => {
    setDescription(card.description);
  }, [card.description]);

  const saveTitle = () => {
    if (title.trim() === "") return;

    dispatch({
      type: "UPDATE_CARD",
      payload: {
        cardId: card.id,
        newTitle: title,
      },
    });

    setIsEditingTitle(false);
  };

  const saveDescription = () => {
    dispatch({
      type: "UPDATE_CARD",
      payload: {
        cardId: card.id,
        newDescription: description,
      },
    });

    setIsEditingDescription(false);
  };

  return (
    <div className={styles.cardBody}>
      
      {/* TITLE */}
      <div className={styles.title}>
        {isEditingTitle ? (
          <input
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveTitle();
              if (e.key === "Escape") {
                setTitle(card.title);
                setIsEditingTitle(false);
              }
            }}
          />
        ) : (
          <div onClick={() => setIsEditingTitle(true)}>
            {card.title}
          </div>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className={styles.description}>
        {isEditingDescription ? (
          <textarea
            value={description}
            autoFocus
            onChange={(e) => setDescription(e.target.value)}
            onBlur={saveDescription}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setDescription(card.description);
                setIsEditingDescription(false);
              }
            }}
          />
        ) : (
          <div onClick={() => setIsEditingDescription(true)}>
            {card.description || "Add description..."}
          </div>
        )}
      </div>

    </div>
  );
}