import { BoardContext } from "./BoardContext";
import { useEffect, useReducer } from "react";
import boardReducer from "../reducers/boardReducer";

const date = () => {
  const currentDate = new Date();
  const date = currentDate.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return date;
};

const initialState = {
  title: "Kan-ban board",

  stages: {
    input: {
      id: "input",
      title: "Input",
      color: "hsl(0, 50%, 85%)",
      columnIds: ["backlog"],
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
      isDefault: true,
    },
    doing: {
      id: "doing",
      title: "Doing",
      stageId: "wip",
      cardIds: [],
      isDefault: true,
    },
    done: {
      id: "done",
      title: "Done",
      stageId: "output",
      cardIds: [],
      isDefault: true,
    },
  },

  cards: {
    test: {
      id: "test",
      status: "Backlog",
      title: "Your-title",
      description: "Add description...",
      columnId: "backlog",
      date: date(),
    },
  },
  stageOrder: ["input", "wip", "output"],
};

const init = (initialState) => {
  const storedState = localStorage.getItem("kanbanBoard");
  return storedState ? JSON.parse(storedState) : initialState;
};

export default function BoardContextProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("kanbanBoard", JSON.stringify(state));
  }, [state]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}
