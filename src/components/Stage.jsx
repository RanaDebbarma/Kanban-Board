import useBoard from "../hooks/useBoard";
import Column from "./Column";
import styles from "./Stage.module.css";

export default function Stage({ stage, columns, cards }) {
  const { dispatch } = useBoard();

  function renderColumns() {
    return stage.columnIds.map((colId) => {
      const column = columns[colId];
      return (
        <Column
          key={colId}
          stage={stage}
          column={column}
          cards={cards}
        ></Column>
      );
    });
  }

  const handleClick = () => {
    dispatch({
      type: "ADD_COLUMN",
      payload: {
        stageId: stage.id,
      },
    });
  };

  return (
    <>
      <div className={styles.columns}>
        {renderColumns()}
        <button className={styles.addColumnBtn} onClick={handleClick}> + </button>
      </div>
    </>
  );
}
