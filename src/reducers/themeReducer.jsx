export default function themeReducer(state, action) {
  switch(action.type) {

    case "ACTIVATE_THEME": {
      const { activeTheme } = action.payload;
      return {
        ...state,
        activeTheme: activeTheme,
      }
    }

    default: 
      return state;
  }
}
