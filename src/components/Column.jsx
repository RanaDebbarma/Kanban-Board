import { useEffect, useRef, useState } from "react";
import useBoard from "../hooks/useBoard";
import Card from "./Card";
import Counter from "../helper/counter";
import styles from "./Column.module.css";

export default function Column({ column, cards }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const { state, dispatch } = useBoard();

  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowColumnMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function renderCards() {
    return column.cardIds.map((cardId) => {
      const card = cards[cardId];
      return <Card key={cardId} card={card} />;
    });
  }

  const deleteColumn = () => {
    dispatch({
      type: "REMOVE_COLUMN",
      payload: { columnId: column.id },
    });
  };

  const handleBlur = () => {
    saveTitle();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveTitle();
    }

    if (e.key === "Escape") {
      setTitle(column.title);
      setIsEditing(false);
    }
  };

  const saveTitle = () => {
    if (title.trim() === "") return;
    dispatch({
      type: "UPDATE_COLUMN",
      payload: { columnId: column.id, newTitle: title.trim() },
    });
    setTitle(title.trim());
    setIsEditing(false);
  };

  const addCard = () => {
    dispatch({
      type: "ADD_CARDS",
      payload: { columnId: column.id },
    });
  };

  const updateCardLimit = (operation) => {
    dispatch({
      type: "UPDATE_COLUMN",
      payload: { columnId: column.id, operation: operation },
    });
  };

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsActive((prev) => !prev);
    }, 600);

    return () => clearInterval(intervalId);
  }, [state.hoveredColumn]);

  return (
    <div
      className={`
        ${styles.column} 
        
        ${state.hoveredColumn === column.id ? styles.columnGlow : ""}
        
        ${
          isActive && state.hoveredColumn === column.id
            ? styles.columnBreath
            : ""
        }
      `}
      style={{
        ...(column.cardLimit * 0.8 <= column.cardIds.length
          ? {
              "--glow": "var(--alert)",
            }
          : {}),
      }}
      data-column-id={column.id}
    >
      <div className={styles.heading}>
        <div
          className={styles.columnMenuBtn}
          onClick={() => setShowColumnMenu(true)}
        >
          <svg
            className={styles.columnMenuBtn}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
          </svg>
          {/* Menu */}
          <div
            ref={menuRef}
            className={`${styles.columnMenu} ${showColumnMenu ? styles.showColumnMenu : ""}`}
          >
            <div className={styles.wipLimitBtn} onClick={updateCardLimit}>
              <label htmlFor="cardLimit">card limit</label>
              <Counter
                cardLimit={column.cardLimit}
                changeCardLimit={updateCardLimit}
              />
            </div>
            <hr />
            <div className={styles.deleteColumnBtn} onClick={deleteColumn}>
              DELETE COLUMN
            </div>
          </div>
        </div>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
        ) : (
          <div
            className={styles.title}
            onDoubleClick={() => setIsEditing(true)}
          >
            {column.title}
          </div>
        )}
      </div>
      <div className={styles.columnBody}>
        <div
          className={styles.progressBar}
          style={{
            ...(column.cardLimit * 0.8 <= column.cardIds.length
              ? {
                  "--stage-color": "var(--alert)",
                }
              : {}),
          }}
        >
          <div
            className={styles.cardProgressBar}
            style={{
              "--progress": `${(column.cardIds.length / column.cardLimit) * 100}%`,
            }}
          />
          <div className={styles.cardNumber}>
            {column.cardIds.length}/{column.cardLimit}
          </div>
        </div>
        <button className={styles.addCardBtn} onClick={addCard}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#e3e3e3"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          ADD CARD
        </button>
        <div className={styles.cards}>{renderCards()}</div>
      </div>
    </div>
  );
}
