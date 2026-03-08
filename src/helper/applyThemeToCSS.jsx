export function applyThemeToCSS(theme) {
  const root = document.documentElement;

  Object.entries(theme.color).forEach(([key, value]) => {
    root.style.setProperty(`${key}`, value);
  });

  Object.entries(theme.effect).forEach(([key, { type, value }]) => {
    root.style.setProperty(
      `${key}`,
      type === "thickness" ? `${value}px` : value
    );
  });
}