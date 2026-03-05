import { useReducer } from "react";
import { ThemeContext } from "./ThemeContext";
import themeReducer from "../reducers/themeReducer";

const initialState = {
  activeTheme: "default",

  themes: {
    default: {
      color: {
        "bg-stage": "#040506",
        "text-primary": "#e7ecee",
        "text-secondary": "#8596ab",
        "bg-main": "#0e0f12",
        "bg-column": "#111318",
        "bg-card": "#1a1d23",
        border: "#2b3140",
        accent: "#00ffbb",
        input: "#e86e30",
        wip: "#1a8cff",
        output: "#30e86e",
        alert: "#ff3333",
      },
      effects: {
        "bg-menu": "#00000080",
        "shadow-rgb": "0,0,0",
        "shadow-alpha": 0.4,
        "blur": "5px"
      }
    },
  },
};

export default function ThemeContextProvider({ children }) {
  const [themeState, dispatchTheme] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ themeState, dispatchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
