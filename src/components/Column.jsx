import useBoard from "../hooks/useBoard";
import Card from "./Card";
import styles from "./Column.module.css";

export default function Column({ column }) {
  const { state, dispatch } = useBoard();

  function renderCards() {
    return column.cardIds.map((cardId) => {
      const card = state.cards[cardId];
      return <Card key={cardId} card={card} />;
    });
  }

  const deleteColumn = () => {
    dispatch({
      type: "REMOVE_COLUMN",
      payload: { columnId: column.id },
    });
  };

  return (
    <div
      className={styles.column}
      style={{
        backgroundColor: state.stages[column.stageId].color,
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
          x
        </button>
        {column.title}
      </div>
      <div className={styles.cards}>{renderCards()}</div>
    </div>
  );
}
