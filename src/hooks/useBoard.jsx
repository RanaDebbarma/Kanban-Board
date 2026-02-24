import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";

export default function useBoard() {
    const context = useContext(BoardContext);

    if(!context) {
        throw new Error("must be used inside BoardContextProvider")
    }

    return context
}