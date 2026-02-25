import useBoard from "../hooks/useBoard";
import Stage from "./Stage";
import styles from "./Board.module.css";
import { useState } from "react";

export default function Board() {
  const { state } = useBoard();
  const [ darkMode, setDarkMode ] = useState(false);

  function renderStages() {
    return state.stageOrder.map((stageId) => {
      const stage = state.stages[stageId];
      const columns = state.columns;
      const cards = state.cards;

      return (
        <div key={stageId} className={styles.stage}>
          <label className={styles.heading}>{stage.title}</label>
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

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
    console.log(darkMode);
  }

  return (
    <div className={styles.boardBody}>
      <nav className={styles.title}>
        Kan-ban board
        <button onClick={toggleTheme}>Theme toggle</button>
      </nav>

      <div className={styles.stages}>{renderStages()}</div>
    </div>
  );
}
