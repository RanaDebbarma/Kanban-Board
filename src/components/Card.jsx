import styles from "./Card.module.css";

export default function Card({ title, description }) {
  return (
    <div className={styles.cardBody}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
        dolor blanditiis impedit nihil incidunt, pariatur odio nesciunt
        obcaecati! Vitae beatae cumque sed perspiciatis, officia reiciendis vero
        adipisci accusamus saepe voluptate?
      </div>
    </div>
  );
}
