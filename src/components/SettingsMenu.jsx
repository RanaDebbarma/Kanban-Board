import { useState } from "react";
import SettingColorPicker from "../helper/SettingColorPicker";
import SettingRangeSlider from "../helper/SettingRangeSlider";
import { applyThemeToCSS } from "../helper/applyThemeToCSS";
import useTheme from "../hooks/useTheme";
import styles from "./SettingsMenu.module.css";

export default function SettingsMenu({ showMenu }) {
  const { themeState, dispatchTheme } = useTheme();
const [draftTheme, setDraftTheme] = useState(
  themeState.themes[themeState.activeTheme]
);
  const [newTheme, setNewTheme] = useState("");

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

  const createNewTheme = (e) => {
    e.preventDefault();

    if (newTheme.trim() === "") return;

    if (themeState.themes[newTheme]) {
      alert("Theme already exists");
      return;
    }

    dispatchTheme({
      type: "CREATE_THEME",
      payload: {
        newThemeName: newTheme.trim(),
        newThemeState: draftTheme,
      },
    });

    dispatchTheme({
      type: "ACTIVATE_THEME",
      payload: { activeTheme: newTheme },
    });

    setNewTheme("");
  };

  const saveTheme = () => {
    dispatchTheme({
      type: "UPDATE_THEME",
      payload: {
        newThemeState: draftTheme,
      },
    });
  }

  const deleteTheme = () => {
    dispatchTheme({
      type: "DELETE_THEME",
      payload: {
        themeName: themeState.activeTheme
      },
    });
  }

  return (
    <div
      className={`${styles.settingsMenu} ${showMenu && styles.showSettingsMenu}`}
    >
      <div className={styles.heading}>Settings</div>
      <hr />
      <div className={styles.themeSelector}>
        <form
          action=""
          className={styles.createNewTheme}
          onSubmit={createNewTheme}
        >
          <input
            type="text"
            name="newThemeName"
            value={newTheme}
            onChange={(e) => setNewTheme(e.target.value)}
          />
          <button type="submit" className={styles.createThemeBtn}>
            create
          </button>
        </form>
        <div className={styles.themeSelect}>
          <select
            name="themeSelector"
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
          <button className={styles.deleteThemeBtn} onClick={deleteTheme}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#e3e3e3"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </div>
      </div>
      <hr />
      <div className={styles.compartment}>
        <div className={styles.colorCompartment}>
          {draftTheme?.color && Object.entries(draftTheme.color).map(([key, value]) => {
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
          {draftTheme?.effect && Object.entries(draftTheme.effect).map(([key, { type, value }]) => {
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
        <button className={styles.saveBtn} onClick={saveTheme}>save</button>
      </div>
    </div>
  );
}
