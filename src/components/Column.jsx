import { useState } from "react";
import useBoard from "../hooks/useBoard";
import Card from "./Card";
import styles from "./Column.module.css";

export default function Column({ column, cards }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const { dispatch } = useBoard();

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
      type: "UPDATE_COLUMN_TITLE",
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

  return (
    <div
      className={styles.column}
      data-column-id={column.id}
      style={{
        border: `1px solid var(--border)`,
      }}
    >
      <div className={styles.heading}>
        <button
          className={styles.deleteColumnBtn}
          onClick={deleteColumn}
          style={{
            ...(column.isDefault && {
              visibility: "hidden",
            }),
          }}
        >
          ✕
        </button>
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
            <span className={styles.cardCount}>
              {/* ({column.cardIds.length}) */}
            </span>
          </div>
        )}
      </div>
      <div className={styles.columnBody}>
        <button className={styles.addCardBtn} onClick={addCard}>
          + Add card
        </button>
        <div className={styles.cards}>{renderCards()}</div>
      </div>
    </div>
  );
}
