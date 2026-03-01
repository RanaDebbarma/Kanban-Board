import useBoard from "../hooks/useBoard";
import Stage from "./Stage";
import styles from "./Board.module.css";
// import { useState } from "react";

export default function Board() {
  const { state, dispatch } = useBoard();
  // const [ darkMode, setDarkMode ] = useState(false);

  function renderStages() {
    return state.stageOrder.map((stageId) => {
      const stage = state.stages[stageId];
      const columns = state.columns;
      const cards = state.cards;

      return (
        <div key={stageId} className={styles.stage}>
          <label className={styles.StageHeading}>{stage.title}</label>
          <div className={styles.stageBody}>
            <Stage
              key={stageId}
              stage={stage}
              columns={columns}
              cards={cards}
            />
          </div>
        </div>
      );
    });
  }

  // const toggleTheme = () => {
  //   setDarkMode(prev => !prev);
  //   console.log(darkMode);
  // }

  return (
    <div className={styles.boardBody}>
      <div className={styles.navBar}>
        <div className={styles.navHeading}>
          Kanban-board
        </div>
        <div> contact </div>
      </div>
      <div className={styles.workingArea}>
        <nav className={styles.heading}>
          <input
            className={styles.title}
            type="text"
            value={state.title}
            style={{ width: `${state.title?.length + 1 || 1}ch` }}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_TITLE",
                payload: { newTitle: e.target.value },
              })
            }
            onBlur={(e) =>
              dispatch({
                type: "UPDATE_TITLE",
                payload: { newTitle: e.target.value.trim() },
              })
            }
          />
        </nav>
        <div className={styles.stages}>{renderStages()}</div>
      </div>
    </div>
  );
}
