import { useReducer } from "react";
import { ThemeContext } from "./ThemeContext";
import themeReducer from "../reducers/themeReducer";

const initialState = {
  bgMain: "#0e0f12",
  bgColumn: "hsl(220, 17%, 8%)",
  bgCard: "hsl(224, 14%, 12%)",
  textPrimary: "hsl(197, 18%, 92%)",
  textSecondary: "#8596ab",
  accent: "#00ffbb",
  border: "hsl(223, 20%, 21%)",
  shadow: "0 4px 12px rgba(0,0,0,0.4)",
  bgStage: "hsl(220, 17%, 2%)",
  bgMenu: "rgba(0, 0, 0, 0.5)",
  blur: "blur(5px)",
  input: "hsl(20, 80%, 55%)",
  wip: "hsl(210, 100%, 55%)",
  output: "hsl(140, 80%, 55%)",
  glow: "hsl(164, 100%, 50%, 0.6)",
  alert: "hsl(0, 100%, 60%)",
  scrollbarColor: "var(--bg-card)",
};

export default function ThemeContextProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}
