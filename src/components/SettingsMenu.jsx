import { useEffect, useState } from "react";
import SettingColorPicker from "../helper/SettingColorPicker";
import SettingRangeSlider from "../helper/SettingRangeSlider";
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
      },
    }));
  };

  const handleRaneg = (key, value) => {
    setDraftTheme((prev) => ({
      ...prev,
      effect: {
        ...prev.effect,
        [key]: {
          ...prev.effect[key],
          value: value,
        },
      },
    }));
  };

  useEffect(() => {
    Object.entries(draftTheme.color).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [draftTheme.color]);

  useEffect(() => {
    Object.entries(draftTheme.effect).forEach(([key, {type, value}]) => {
      if(type === "thickness") {
        document.documentElement.style.setProperty(`--${key}`, `${value}px`);
      } else {
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    });
  }, [draftTheme.effect]);

  return (
    <div
      className={`${styles.settingsMenu} ${showMenu && styles.showSettingsMenu}`}
    >
      <div className={styles.heading}>Settings</div>
      <hr />
      <div className={styles.compartment}>
        <div className={styles.colorCompartment}>
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
        <div className={styles.effectCompartment}>
          {Object.entries(draftTheme.effect).map(([key, {type, value}]) => {
            return (
              <SettingRangeSlider
                key={key}
                label={key}
                value={value}
                changeId={key}
                type={type}
                onChange={handleRaneg}
              />
            );
          })}
        </div>
      </div>
      <hr />
      <div className={styles.footer}>
        <button className={styles.resetBtn}>reset</button>
        <button className={styles.saveBtn}>save</button>
      </div>
    </div>
  );
}
