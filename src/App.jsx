import Board from "./components/Board";
import BoardContextProvider from "./context/BoardContextProvider";
import "./App.css";

function App() {
  return (
    <>
      <BoardContextProvider>
        <Board />
      </BoardContextProvider>
    </>
  );
}

export default App;
