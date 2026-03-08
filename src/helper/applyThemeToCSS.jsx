export function applyThemeToCSS(theme) {
  const root = document.documentElement;

  function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }

  Object.entries(theme.color).forEach(([key, value]) => {
    root.style.setProperty(`${key}`, value);
    if (key === "--bg-menu-rgb") {
      root.style.setProperty("--bg-menu-rgb", hexToRGB(value));
    };
    if (key === "--accent") {
      root.style.setProperty("--accent-rgb", hexToRGB(value));
    }
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
