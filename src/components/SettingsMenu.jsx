import styles from "./Settings.module.css";

export default function SettingsMenu({ showMenu }) {
  return (
    <div
      className={`${styles.settingsMenu} ${showMenu && styles.showSettingsMenu}`}
    >
      Settings
      <hr />
    </div>
  );
}
