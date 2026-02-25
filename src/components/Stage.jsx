import useBoard from "../hooks/useBoard";
import Column from "./Column";
import styles from "./Stage.module.css";

export default function Stage({ stage }) {
  const { state, dispatch } = useBoard();

  function renderColumns() {
    return stage.columnIds.map((colId) => {
      const column = state.columns[colId];
      return <Column key={colId} column={column}></Column>;
    });
  }

  const handleClick = () => {
    dispatch({
      type: "ADD_COLUMN",
      payload: {
        stageId: stage.id,
        title: 'New Column',
      }
    })
  }

  return (
    <>
      <div className={styles.columns}>
        {renderColumns()}
        <button onClick={handleClick}> + </button>
      </div>
    </>
  );
}
