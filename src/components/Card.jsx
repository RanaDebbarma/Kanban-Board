import { useEffect, useRef, useState } from "react";
import useBoard from "../hooks/useBoard";
import DraggableCard from "./DraggableCard";
import styles from "./Card.module.css";

export default function Card({ card }) {
  const { dispatch } = useBoard();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [titleDraft, setTitleDraft] = useState("");
  const [descriptionDraft, setDescriptionDraft] = useState("");

  const textAreaRef = useRef(null);

  const [showCardMenu, setShowCardMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowCardMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // reset
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [isEditingDescription, descriptionDraft]);

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
        newTitle: titleDraft.trim(),
      },
    });
    setTitleDraft(titleDraft.trim());
    setIsEditingTitle(false);
  };

  const saveDescription = () => {
    dispatch({
      type: "UPDATE_CARD",
      payload: {
        cardId: card.id,
        newDescription: descriptionDraft.trim(),
      },
    });
    setDescriptionDraft(descriptionDraft.trim());
    setIsEditingDescription(false);
  };

  const deleteCard = () => {
    dispatch({
      type: "REMOVE_CARD",
      payload: { cardId: card.id, columnId: card.columnId },
    });
  };

  const changeCardColor = (newColorValue) => {
    dispatch({
      type: "UPDATE_CARD",
      payload: {
        cardId: card.id,
        newColor: newColorValue,
      },
    });
  };

  return (
    <DraggableCard cardId={card.id} srcColumnId={card.columnId}>
      <div className={styles.cardBody} style={{backgroundColor: card.color}}>
        <div className={styles.cardHeader}>
          <div className={styles.cardStatus}>STATUS: {card.status}</div>
          <button
            className={styles.cardMenuBtn}
            onClick={() => setShowCardMenu(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
            </svg>
            <div
              ref={menuRef}
              className={`${styles.cardMenu} ${showCardMenu ? styles.showCardMenu : ""}`}
            >
              <div className={styles.CardPriorityBtn}>card menu</div>
              <hr />
              <div className={styles.deleteCardBtn} onClick={deleteCard}>
                DELETE CARD
              </div>
            </div>
          </button>
        </div>
        <hr />
        {/* TITLE */}
        <div className={styles.heading}>
          <div className={styles.title}>
            {isEditingTitle ? (
              <input
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                onBlur={saveTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveTitle();
                  if (e.key === "Escape") setIsEditingTitle(false);
                }}
                autoFocus
              />
            ) : (
              <div onClick={startTitleEdit}>{card.title}</div>
            )}
          </div>
        </div>
        {/* DESCRIPTION */}
        <div className={styles.description}>
          {isEditingDescription ? (
            <textarea
              ref={textAreaRef}
              value={descriptionDraft}
              onChange={(e) => setDescriptionDraft(e.target.value)}
              onBlur={saveDescription}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsEditingDescription(false);
              }}
              rows={1}
              spellCheck="false"
              autoFocus
              onFocus={(e) =>
                e.target.setSelectionRange(
                  e.target.value.length,
                  e.target.value.length,
                )
              }
            />
          ) : (
            <div onClick={startDescriptionEdit}>
              {card.description || "Add description..."}
            </div>
          )}
        </div>
        <hr />
        <div className={styles.cardFooter}>
          <div className={styles.cardDate}>{card.date}</div>
          <input
            type="color"
            name=""
            id=""
            value={card.color}
            onChange={(e) => changeCardColor(e.target.value)}
          />
        </div>
      </div>
    </DraggableCard>
  );
}
