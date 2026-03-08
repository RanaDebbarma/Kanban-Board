import { useEffect, useReducer } from "react";
import { ThemeContext } from "./ThemeContext";
import themeReducer from "../reducers/themeReducer";
import { applyThemeToCSS } from "../helper/applyThemeToCSS";

const initialState = {
  activeTheme: "defaultLight",

  themes: {
    defaultDark: {
      color: {
        isDefault: true,
        /* -----------------------------Menu------------------------------- */
        // "--bg-menu": "rgba(0, 0, 0, 0.5)",
        "--menu-text-primary": "#e7ecee",
        "--bg-menu-rgb": "#000000",

        /* ----------------------------NavBar------------------------------- */
        "--bg-navBar": "#040506",
        "--navBar-font-color": "#00ffbb",
        "--navBar-menu-color": "#e7ecee",

        /* -----------------------------main------------------------------- */
        "--bg-main": "#0e0f12",
        "--main-font-color": "#e7ecee",
        "--accent": "#00ffbb",
        "--alert": "#ff3333",
        "--border": "#2b3140",

        /* -----------------------------Stage------------------------------ */
        "--bg-stage": "#040506",
        "--stage-btn-color": "#8596ab",

        /* -----------------------------column----------------------------- */
        "--bg-column": "#111318",
        "--column-btn-color": "#8596ab",

        /*Dynamic (--stage-color)*/
        "--input": "#e86e30",
        "--wip": "#1a8cff",
        "--output": "#30e86e",

        /* -----------------------------card------------------------------- */
        "--bg-card": "#1a1d24",
        "--card-text-primary": "#e7ecee",
        "--card-text-secondary": "#8596ab",
        "--card-hr": "#2b3140",
      },

      effect: {
        "--shadow-alpha": {
          type: "alpha",
          value: 0.4,
        },
        "--progress-bar-thickness": {
          type: "thickness",
          value: 1,
        },
        "--blur": {
          type: "blur",
          value: 5,
        },
        "--bg-menu-alpha": {
          type: "alpha",
          value: 0.5,
        },
      },
    },

    defaultLight: {
      isDefault: true,
      color: {
        /* -----------------------------Menu------------------------------- */
        "--menu-text-primary": "#c3cbe5",
        "--bg-menu-rgb": "#243352",

        /* ----------------------------NavBar------------------------------- */
        "--bg-navBar": "#243352",
        "--navBar-font-color": "#00ffbb",
        "--navBar-menu-color": "#7c97a2",

        /* -----------------------------main------------------------------- */
        "--bg-main": "#485b89",
        "--main-font-color": "#7ad9ff",
        "--accent": "#00ffbb",
        "--alert": "#ff3333",
        "--border": "#65769f",

        /* -----------------------------Stage------------------------------ */
        "--bg-stage": "#96a8bb",
        "--stage-btn-color": "#485b89",

        /* -----------------------------column----------------------------- */
        "--bg-column": "#485b89",
        "--column-btn-color": "#70b0ff",

        /*Dynamic (--stage-color)*/
        "--input": "#e86e30",
        "--wip": "#1a8cff",
        "--output": "#30e86e",

        /* -----------------------------card------------------------------- */
        "--bg-card": "#c4c4c4",
        "--card-text-primary": "#000000",
        "--card-text-secondary": "#194376",
        "--card-hr": "#c4c4c4",
      },

      effect: {
        "--shadow-alpha": {
          type: "alpha",
          value: 0.4,
        },
        "--progress-bar-thickness": {
          type: "thickness",
          value: 2,
        },
        "--blur": {
          type: "blur",
          value: 5,
        },
        "--bg-menu-alpha": {
          type: "alpha",
          value: 0.75,
        },
      },
    },
  },
};

function init(initialState) {
  const storedTheme = localStorage.getItem("activeTheme");

  if (!storedTheme) return initialState;

  return {
    ...initialState,
    activeTheme: storedTheme,
  };
}

export default function ThemeContextProvider({ children }) {
  const [themeState, dispatchTheme] = useReducer(
    themeReducer,
    initialState,
    init,
  );

  useEffect(() => {
    localStorage.setItem("activeTheme", themeState.activeTheme);
  }, [themeState.activeTheme]);

  useEffect(() => {
    const theme = themeState.themes[themeState.activeTheme];
    applyThemeToCSS(theme);
  }, [themeState.activeTheme, themeState.themes]);

  return (
    <ThemeContext.Provider value={{ themeState, dispatchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
