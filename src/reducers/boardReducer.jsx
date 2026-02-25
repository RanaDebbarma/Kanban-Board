export default function boardReducer(state, action) {
  switch (action.type) {
    case "ADD_COLUMN": {
      const { stageId, title } = action.payload;
      const newId = crypto.randomUUID();
      return {
        ...state,

        columns: {
          ...state.columns,
          [newId]: {
            id: newId,
            title,
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

    default:
      return state;
  }
}
