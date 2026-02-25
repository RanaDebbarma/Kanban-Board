import useBoard from "../hooks/useBoard";
import Card from "./Card";
import styles from "./Column.module.css";

export default function Column({ column }) {
  const { state } = useBoard();

  function renderCards() {
    return column.cardIds.map((cardId) => {
      const card = state.cards[cardId];
      return <Card key={cardId} card={card} />;
    });
  }

  const deleteColumn = () => {

  }

  return (
    <div
      className={styles.column}
      style={{
        backgroundColor: state.stages[column.stageId].color,
      }}
    >
      <div className={styles.heading}>
        <button onClick={deleteColumn}> - </button>
        {column.title}
      </div>
      <div className={styles.cards}>{renderCards()}</div>
    </div>
  );
}
