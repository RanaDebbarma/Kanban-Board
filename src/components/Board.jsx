import useBoard from "../hooks/useBoard";
import Stage from "./Stage";
import styles from "./Board.module.css";

export default function Board() {
  const { state } = useBoard();

  function renderStages() {
    return state.stageOrder.map((stageId) => {
      const stage = state.stages[stageId];
      return (
        <div key={stageId} className={styles.stage}>
          <label className={styles.heading}>{stage.title}</label>
          <div className={styles.stageBody}>
            <Stage key={stageId} stage={stage} />
          </div>
        </div>
      );
    });
  }

  return (
    <div className={styles.boardBody}>
      <nav className={styles.title}>Kan-ban board</nav>

      <div className={styles.stages}>{renderStages()}</div>
    </div>
  );
}