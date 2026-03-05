import { useEffect } from "react";
import useTheme from "../hooks/useTheme";
import styles from "./Settings.module.css";

export default function SettingsMenu({ showMenu }) {
  const { themeState } = useTheme();

  useEffect(() => {
    const theme = themeState.themes[themeState.activeTheme];

    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });

  }, [themeState]);

  return (
    <div
      className={`${styles.settingsMenu} ${showMenu && styles.showSettingsMenu}`}
    >
      <div className={styles.heading}>
        Settings
      </div>
      <hr />
      <div className={styles.compartment}>
        compartment
      </div>
      <hr />
      <div className={styles.footer}>
        <button className={styles.resetBtn}>
          reset
        </button>
        <button className={styles.saveBtn}>
          save
        </button>
      </div>
    </div>
  );
}
