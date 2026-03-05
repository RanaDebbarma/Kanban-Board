import { useState } from "react";
import useBoard from "../hooks/useBoard";
import Stage from "./Stage";
import SettingsMenu from "./SettingsMenu";
import styles from "./Board.module.css";

export default function Board() {
  const { state, dispatch } = useBoard();
  const [showMenu, setShowMenu] = useState(false);

  function renderStages() {
    return state.stageOrder.map((stageId) => {
      const stage = state.stages[stageId];
      const columns = state.columns;
      const cards = state.cards;

      const borderMap = {
        input: "var(--input)",
        wip: "var(--wip)",
        output: "var(--output)",
      };

      return (
        <div
          key={stageId}
          className={styles.stage}
          style={{
            "--stage-color": borderMap[stage.id],
          }}
        >
          <div className={styles.StageHeading}>{stage.title}</div>
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

  return (
    <div className={styles.boardBody}>
      <div className={styles.navBar}>
        <div className={styles.navHeading}>Kanban-board</div>
        <div
          className={styles.settingsMenu}
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </div>
      </div>
      <div className={styles.workingAreaWrapper}>
        <SettingsMenu showMenu={showMenu}/>
        <div className={styles.workingArea}>
          <div className={styles.heading}>
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
          </div>
          <div className={styles.stages}>{renderStages()}</div>
        </div>
      </div>
    </div>
  );
}
