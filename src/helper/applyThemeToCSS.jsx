export function applyThemeToCSS(theme) {
  const root = document.documentElement;

  Object.entries(theme.color).forEach(([key, value]) => {
    root.style.setProperty(`${key}`, value);
  });

  Object.entries(theme.effect).forEach(([key, { type, value }]) => {
    const unitMap = {
      alpha: value,
      thickness: `${value}px`,
      blur: `blur(${value}px)`,
    };

    root.style.setProperty(`${key}`, unitMap[type]);
  });
}
