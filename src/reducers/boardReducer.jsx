export default function boardReducer(state, action) {
  switch (action.type) {
    case "UPDATE_TITLE": {
      const { newTitle } = action.payload;

      return {
        ...state,

        title: newTitle,
      }
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
            title: "New column",
            stageId,
            cardIds: [],
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

      if (column.isDefault) return state;

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

    case "UPDATE_COLUMN_TITLE": {
      const { columnId, newTitle } = action.payload;

      // updating card status
      const column = state.columns[columnId];
      const newCards = { ...state.cards };

      column.cardIds.forEach((cardId) => {
        newCards[cardId] = {
          ...newCards[cardId],
          status: newTitle,
        };
      });

      return {
        ...state,

        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            title: newTitle,
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
          },
        },

        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            cardIds: [...state.columns[columnId].cardIds, newId],
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
      const { cardId, newTitle, newDescription } = action.payload;

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
          },
        },
      };
    }

    default:
      return state;
  }
}
