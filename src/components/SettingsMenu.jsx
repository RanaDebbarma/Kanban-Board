import { useEffect, useState } from "react";
import SettingColorPicker from "./SettingColorPicker";
import useTheme from "../hooks/useTheme";
import styles from "./SettingsMenu.module.css";

export default function SettingsMenu({ showMenu }) {
  const { themeState } = useTheme();
  const [draftTheme, setDraftTheme] = useState(
    themeState.themes[themeState.activeTheme],
  );

  const handleChange = (key, value) => {
    setDraftTheme((prev) => ({
      ...prev,
      color: {
        ...prev.color,
        [key]: value,
      }
    }));
  };

  useEffect(() => {
    Object.entries(draftTheme.color).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [draftTheme.color]);

  return (
    <div
      className={`${styles.settingsMenu} ${showMenu && styles.showSettingsMenu}`}
    >
      <div className={styles.heading}>Settings</div>
      <hr />
      <div className={styles.compartment}>
        {Object.entries(draftTheme.color).map(([key, value]) => {
          return (
            <SettingColorPicker
              key={key}
              label={key}
              value={value}
              changeId={key}
              onChange={handleChange}
            />
          );
        })}
      </div>
      <hr />
      <div className={styles.footer}>
        <button className={styles.resetBtn}>reset</button>
        <button className={styles.saveBtn}>save</button>
      </div>
    </div>
  );
}
