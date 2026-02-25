import { BoardContext } from "./BoardContext";
import { useReducer } from "react";
import boardReducer from "../reducers/boardReducer";

const initialState = {
  stages: {
    input: {
      id: "input",
      title: "Input",
      color: "hsl(0, 50%, 85%)",
      columnIds: ["backlog",],
    },
    wip: {
      id: "wip",
      title: "In progress",
      color: "hsl(208, 50%, 85%)",
      columnIds: ["doing"],
    },
    output: {
      id: "output",
      title: "Output",
      color: "hsl(140, 50%, 85%)",
      columnIds: ["done"],
    },
  },

  columns: {
    backlog: {
      id: "backlog",
      title: "Backlog",
      stageId: "input",
      cardIds: ["test"],
    },
    // todo: {
    //   id: "todo",
    //   title: "Todo",
    //   stageId: "input",
    //   cardIds: [],
    // },
    doing: {
      id: "doing",
      title: "Doing",
      stageId: "wip",
      cardIds: [],
    },
    done: {
      id: "done",
      title: "Done",
      stageId: "output",
      cardIds: [],
    },
  },

  cards: {
    test: {
      id: "test",
      title: "Test-title",
      description: "description",
    },
  },
  stageOrder: ["input", "wip", "output"],
};

export default function BoardContextProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}
