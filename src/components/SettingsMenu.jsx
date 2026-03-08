import { useState } from "react";
import SettingColorPicker from "../helper/SettingColorPicker";
import SettingRangeSlider from "../helper/SettingRangeSlider";
import { applyThemeToCSS } from "../helper/applyThemeToCSS";
import useTheme from "../hooks/useTheme";
import styles from "./SettingsMenu.module.css";

export default function SettingsMenu({ showMenu }) {
  const { themeState, dispatchTheme } = useTheme();
  const [draftTheme, setDraftTheme] = useState(
    themeState.themes[themeState.activeTheme],
  );

  const handleThemeSelect = (activeTheme) => {
    const theme = themeState.themes[activeTheme];

    dispatchTheme({
      type: "ACTIVATE_THEME",
      payload: { activeTheme: activeTheme },
    });

    setDraftTheme(theme);
    applyThemeToCSS(theme);
  };

  const handleChange = (key, value) => {
    setDraftTheme((prev) => {
      const updated = {
        ...prev,
        color: {
          ...prev.color,
          [key]: value,
        },
      };

      applyThemeToCSS(updated);
      return updated;
    });
  };

  const handleRange = (key, value) => {
    setDraftTheme((prev) => {
      const updated = {
        ...prev,
        effect: {
          ...prev.effect,
          [key]: {
            ...prev.effect[key],
            value,
          },
        },
      };

      applyThemeToCSS(updated);
      return updated;
    });
  };

  const resetTheme = () => {
    const theme = themeState.themes[themeState.activeTheme];
    setDraftTheme(theme);
    applyThemeToCSS(theme);
  };

  return (
    <div
      className={`${styles.settingsMenu} ${showMenu && styles.showSettingsMenu}`}
    >
      <div className={styles.heading}>Settings</div>
      <hr />
      <select
        value={themeState.activeTheme}
        onChange={(e) => handleThemeSelect(e.target.value)}
      >
        {Object.entries(themeState.themes).map(([key]) => {
          return (
            <option key={key} value={key}>
              {key}
            </option>
          );
        })}
      </select>
      <hr />
      <div className={styles.compartment}>
        <div className={styles.colorCompartment}>
          {Object.entries(draftTheme.color).map(([key, value]) => {
            if(key === "--bg-menu") return;
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
          {Object.entries(draftTheme.effect).map(([key, { type, value }]) => {
            return (
              <SettingRangeSlider
                key={key}
                label={key}
                value={value}
                changeId={key}
                type={type}
                onChange={handleRange}
              />
            );
          })}
        </div>
      </div>
      <hr />
      <div className={styles.footer}>
        <button className={styles.resetBtn} onClick={resetTheme}>
          reset
        </button>
        <button className={styles.saveBtn}>save</button>
      </div>
    </div>
  );
}
