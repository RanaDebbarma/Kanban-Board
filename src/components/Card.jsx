import { useState } from "react";
import useBoard from "../hooks/useBoard";
import styles from "./Card.module.css";

export default function Card({ card }) {
  const { dispatch } = useBoard();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [titleDraft, setTitleDraft] = useState("");
  const [descriptionDraft, setDescriptionDraft] = useState("");

  const startTitleEdit = () => {
    setTitleDraft(card.title);
    setIsEditingTitle(true);
  };

  const startDescriptionEdit = () => {
    setDescriptionDraft(card.description);
    setIsEditingDescription(true);
  };

  const saveTitle = () => {
    dispatch({
      type: "UPDATE_CARD",
      payload: {
        cardId: card.id,
        newTitle: titleDraft,
      },
    });
    setIsEditingTitle(false);
  };

  const saveDescription = () => {
    dispatch({
      type: "UPDATE_CARD",
      payload: {
        cardId: card.id,
        newDescription: descriptionDraft,
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
            value={titleDraft}
            autoFocus
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveTitle();
              if (e.key === "Escape") setIsEditingTitle(false);
            }}
          />
        ) : (
          <div onClick={startTitleEdit}>
            {card.title}
          </div>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className={styles.description}>
        {isEditingDescription ? (
          <textarea
            value={descriptionDraft}
            autoFocus
            onChange={(e) => setDescriptionDraft(e.target.value)}
            onBlur={saveDescription}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsEditingDescription(false);
            }}
          />
        ) : (
          <div onClick={startDescriptionEdit}>
            {card.description || "Add description..."}
          </div>
        )}
      </div>

    </div>
  );
}