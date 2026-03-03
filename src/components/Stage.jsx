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
        <button className={styles.addColumnBtn} onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button>
      </div>
    </>
  );
}
