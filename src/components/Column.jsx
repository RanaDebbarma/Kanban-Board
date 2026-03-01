import { useState } from "react";
import useBoard from "../hooks/useBoard";
import Card from "./Card";
import styles from "./Column.module.css";

export default function Column({ stage, column, cards }) {
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

  const borderMap = {
    input: "2px solid var(--input)",
    wip: "2px solid var(--wip)",
    output: "2px solid var(--output)",
  }

  return (
    <div
      className={styles.column}
      data-column-id={column.id}
      style={{
        border: borderMap[stage.id] || `2px solid var(--accent)`,
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
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <div className={styles.title} onClick={() => setIsEditing(true)}>
            {column.title}
          </div>
        )}
      </div>
      <div className={styles.columnBody}>
        <button  className={styles.addCardBtn} onClick={addCard}> + </button>
        <div className={styles.cards}>{renderCards()}</div>
      </div>
    </div>
  );
}
