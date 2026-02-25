// import useBoard from "../hooks/useBoard";
import styles from "./Card.module.css";

export default function Card({ card }) {
  // const { dispatch } = useBoard();
  return (
    <div className={styles.cardBody}>
      <div className={styles.title}>{card.title}</div>
      <div className={styles.description}>
        {card.description}
      </div>
    </div>
  );
}
