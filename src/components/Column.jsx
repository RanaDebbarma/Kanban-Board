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
      payload: { columnId: column.id, newTitle: title },
    });
    setIsEditing(false);
  };

  const addCard = () => {
    dispatch({
      type: "ADD_CARDS",
      payload: {columnId: column.id},
    })
  };

  return (
    <div
      className={styles.column}
      style={{
        backgroundColor: stage.color,
      }}
    >
      <div className={styles.heading}>
        <button
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
          <div
            className={styles.title}
            onDoubleClick={() => setIsEditing(true)}
          >
            {column.title}
          </div>
        )}
      </div>
      <div className={styles.cards}>
        <button onClick={addCard}> + </button>
        {renderCards()}
      </div>
    </div>
  );
}
