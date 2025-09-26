import { useEffect, useState } from "preact/hooks";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    try {
      const pref = localStorage.getItem("techstore_light_mode");
      if (pref) setLight(pref === "true");
      // apply initial class
      document.documentElement.classList.toggle("light", light);
    } catch (_e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("techstore_light_mode", String(light));
    } catch (_e) {
      // ignore
    }
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  return (
    <button
      type="button"
      aria-label="Toggle light mode"
      class="px-2 py-1 rounded bg-slate-700 text-slate-100"
      onClick={() => setLight((v) => !v)}
    >
      {light ? "🌞" : "🌙"}
    </button>
  );
}
