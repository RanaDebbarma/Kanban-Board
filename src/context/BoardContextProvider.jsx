import { BoardContext } from "./BoardContext";
import { useReducer } from "react";

const initialState = [];

function reducer(state, action) {
    switch(action.type) {
        case 'ADD_COLUMN':
            return state;
    }
}

export default function BoardContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}
