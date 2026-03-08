export default function themeReducer(state, action) {
  switch (action.type) {
    case "ACTIVATE_THEME": {
      const { activeTheme } = action.payload;
      return {
        ...state,
        activeTheme: activeTheme,
      };
    }

    case "CREATE_THEME": {
      const { newThemeName, newThemeState } = action.payload;
      if (newThemeName === "" || state.themes[newThemeName]) return state;
      return {
        ...state,
        themes: {
          ...state.themes,
          [newThemeName]: {
            ...structuredClone(newThemeState),
            isDefault: false,
          },
        },
      };
    }

    case "DELETE_THEME": {
      const { themeName } = action.payload;

      if (state.themes[themeName]?.isDefault) return state;

      const { [themeName]: _, ...remainingThemes } = state.themes;

      const newActiveTheme =
        state.activeTheme === themeName
          ? Object.keys(remainingThemes)[0]
          : state.activeTheme;

      return {
        ...state,
        activeTheme: newActiveTheme,
        themes: remainingThemes,
      };
    }

    case "UPDATE_THEME": {
      const { newThemeState } = action.payload;

      if (state.themes[state.activeTheme]?.isDefault) {
        alert("can't modify default theme")
        return state
      };

      return {
        ...state,
        themes: {
          ...state.themes,
          [state.activeTheme]: {
            ...newThemeState,
            isDefault: state.themes[state.activeTheme].isDefault,
          },
        },
      };
    }

    default:
      return state;
  }
}
