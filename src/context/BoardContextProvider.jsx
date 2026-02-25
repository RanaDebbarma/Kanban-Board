import { BoardContext } from "./BoardContext";
import { useReducer } from "react";
import boardReducer from "../reducers/boardReducer";

const initialState = {
    column: [],
    cards: [],
};

export default function BoardContextProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}
