export default function boardReducer(state, action) {
  switch (action.type) {
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
      return {
        ...state,

        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            title: newTitle,
          },
        },
      };
    }

    case "ADD_CARDS": {
      const { columnId } = action.payload;
      const newId = crypto.randomUUID();

      return {
        ...state,

        cards: {
          ...state.cards,
          [newId]: {
            id: newId,
            title: "New-card",
            description: "",
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
