import styles from "./Board.module.css";
import Column from "./Column";
import Card from "./Card";

export default function Board() {
  return (
    <div className={styles.boardBody}>
      <nav className={styles.title}>Kan-ban baord</nav>

      <div className={styles.columnWrapper}>
        <div className={styles.input}>
          <label className={styles.heading}>Input</label>

          <div className={styles.columns}>
            <Column color="hsl(0, 50%, 85%)" 
              title="backlog"
              cards={<Card title ='test'/>}
            />
            <Column color="hsl(0, 50%, 85%)" 
              title="todo"
            />
          </div>
        </div>
        <div className={styles.wip}>
          <label className={styles.heading}>In progress</label>
          <div className={styles.columns}>

            <Column color="hsl(208, 50%, 85%)" 
              title="doing"
            />
          </div>
        </div>
        <div className={styles.output}>
          <label className={styles.heading}>Output</label>
          <div className={styles.columns}>

            <Column color="hsl(140, 50%, 85%)" 
              title="done"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
