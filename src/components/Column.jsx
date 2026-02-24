import styles from "./Column.module.css";

export default function Column({ color, title, cards }) {
  return (
    <div
      className={styles.column}
      style={{
        backgroundColor: color,
      }}
    >
      <div className={styles.heading}>{title}</div>
      <div className={styles.cards}>{cards}</div>
    </div>
  );
}
