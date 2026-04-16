const preferencesScript = `
(() => {
  const root = document.documentElement;

  try {
    const raw = window.localStorage.getItem("genecode-settings");
    if (!raw) return;

    const parsed = JSON.parse(raw);
    const state = parsed && typeof parsed === "object" ? parsed.state : null;

    if (!state || typeof state !== "object") return;

    const theme = state.theme;
    const language = state.language;

    const resolvedTheme =
      theme === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : (theme === "dark" ? "dark" : "light");

    root.classList.toggle("dark", resolvedTheme === "dark");
    root.dataset.theme = resolvedTheme;

    if (language === "ar") {
      root.lang = "ar";
      root.dir = "rtl";
    } else {
      root.lang = "en";
      root.dir = "ltr";
    }
  } catch {
    root.lang = root.lang || "en";
    root.dir = root.dir || "ltr";
  }
})();
`;

export function PreferencesScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: preferencesScript }}
    />
  );
}
