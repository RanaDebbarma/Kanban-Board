import styles from "./Counter.module.css";

export default function Counter({ cardLimit, changeCardLimit }) {
  return (
    <div className={styles.counterWrapper}>
      <div
        className={styles.decreaseBtn}
        onClick={() => changeCardLimit("decrease")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M200-440v-80h560v80H200Z" />
        </svg>
      </div>
      {cardLimit}
      <div
        className={styles.increaseBtn}
        onClick={() => changeCardLimit("increase")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </div>
    </div>
  );
}
