import ThemeContextProvider from "./context/ThemeContextProvider";
import BoardContextProvider from "./context/BoardContextProvider";
import Board from "./components/Board";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

function App() {
  return (
    <>
      <ThemeContextProvider>
        <BoardContextProvider>
          <Board />
        </BoardContextProvider>
      </ThemeContextProvider>
      <Analytics />
    </>
  );
}

export default App;
