import Board from "./components/Board";
import BoardContextProvider from "./context/BoardContextProvider";
import { Analytics } from '@vercel/analytics/react';
import "./App.css";

function App() {
  return (
    <>
      <BoardContextProvider>
        <Board />
      </BoardContextProvider>
      <Analytics />
    </>
  );
}

export default App;
