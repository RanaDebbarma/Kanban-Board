export default function boardReducer(state, action) {
  switch (action.type) {
    case "UPDATE_TITLE": {
      const { newTitle } = action.payload;

      return {
        ...state,

        title: newTitle,
      };
    }

    case "ADD_COLUMN": {
      const { stageId } = action.payload;
      const newId = crypto.randomUUID();
      return {
        ...state,

        columns: {
          ...state.columns,
          [newId]: {
            id: newId,
            title: "new column",
            stageId,
            cardIds: [],
            cardLimit: 5,
            isDefault: false,
          },
        },

        stages: {
          ...state.stages,
          [stageId]: {
            ...state.stages[stageId],
            columnIds: [...state.stages[stageId].columnIds, newId],
          },
        },
      };
    }

    case "REMOVE_COLUMN": {
      const { columnId } = action.payload;

      const column = state.columns[columnId];

      if (column.isDefault) {
        alert("Can't delete default column!");
        return state;
      }

      const stageId = column.stageId;

      const newColumns = { ...state.columns };
      delete newColumns[columnId];

      return {
        ...state,

        columns: newColumns,

        stages: {
          ...state.stages,
          [stageId]: {
            ...state.stages[stageId],
            columnIds: state.stages[stageId].columnIds.filter(
              (id) => id !== columnId,
            ),
          },
        },
      };
    }

    case "UPDATE_COLUMN": {
      const { columnId, newTitle, operation } = action.payload;

      // updating card status
      const column = state.columns[columnId];
      const newCards = { ...state.cards };

      column.cardIds.forEach((cardId) => {
        newCards[cardId] = {
          ...newCards[cardId],
          ...(newTitle !== undefined && { status: newTitle }),
        };
      });

      const currentLimit = Number(column.cardLimit);

      const newLimit =
        operation === "increase"
          ? currentLimit + 1
          : operation === "decrease"
            ? Math.max(0, currentLimit - 1)
            : column.cardLimit;

      return {
        ...state,

        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            ...(newTitle !== undefined && { title: newTitle }),
            ...(operation && { cardLimit: newLimit }),
          },
        },

        // updating card status
        cards: newCards,
      };
    }

    case "ADD_CARDS": {
      const { columnId } = action.payload;
      const newId = crypto.randomUUID();
      const currentDate = new Date();
      const date = currentDate.toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const root = document.documentElement;
      const columnColor = getComputedStyle(root)
        .getPropertyValue("--bg-column")
        .trim();

      return {
        ...state,

        cards: {
          ...state.cards,
          [newId]: {
            id: newId,
            title: "New-card",
            description: "",
            date: date,
            status: state.columns[columnId].title,
            columnId: columnId,
            color: columnColor,
            fill: false,
          },
        },

        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            cardIds: [newId, ...state.columns[columnId].cardIds],
          },
        },
      };
    }

    case "REMOVE_CARD": {
      const { cardId, columnId } = action.payload;
      const newCards = { ...state.cards };
      delete newCards[cardId];

      return {
        ...state,

        cards: newCards,

        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            cardIds: state.columns[columnId].cardIds.filter(
              (id) => id !== cardId,
            ),
          },
        },
      };
    }

    case "UPDATE_CARD": {
      const { cardId, newTitle, newColor, fill, newDescription } =
        action.payload;

      return {
        ...state,

        cards: {
          ...state.cards,
          [cardId]: {
            ...state.cards[cardId],
            ...(newTitle !== undefined && { title: newTitle }),
            ...(newDescription !== undefined && {
              description: newDescription,
            }),
            ...(newColor !== undefined && { color: newColor }),
            ...(fill !== undefined && { fill: fill }),
          },
        },
      };
    }

    case "MOVE_CARD": {
      const { cardId, srcId, dstId, moveToId, insertAfter } = action.payload;

      if (srcId === dstId) return state;

      const dstCardIds = [...state.columns[dstId].cardIds];
      const srcCardIds = state.columns[srcId].cardIds.filter(
        (id) => id !== cardId,
      );

      if (!moveToId) {
        // fallback to top
        dstCardIds.unshift(cardId);
      } else {
        const index = dstCardIds.indexOf(moveToId);
        dstCardIds.splice(index + (insertAfter ? 1 : 0), 0, cardId);
      }

      return {
        ...state,
        columns: {
          ...state.columns,
          [srcId]: {
            ...state.columns[srcId],
            cardIds: srcCardIds,
          },
          [dstId]: {
            ...state.columns[dstId],
            cardIds: dstCardIds,
          },
        },
        cards: {
          ...state.cards,
          [cardId]: {
            ...state.cards[cardId],
            columnId: dstId,
            status: state.columns[dstId].title,
          },
        },
      };
    }

    case "dnd_sort": {
      const { moveFromId, moveToId, insertAfter, columnId } = action.payload;

      if (!moveToId) return state;

      const newCardIds = [...state.columns[columnId].cardIds];
      const fromIndex = newCardIds.indexOf(moveFromId);
      const toIndex = newCardIds.indexOf(moveToId);

      if (fromIndex === -1 || toIndex === -1) return state;

      newCardIds.splice(fromIndex, 1);
      newCardIds.splice(toIndex + (insertAfter ? 1 : 0), 0, moveFromId);

      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            cardIds: newCardIds,
          },
        },
      };
    }

    default:
      return state;
  }
}
