import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

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
    <Button
      aria-label="Toggle light mode"
      className="px-2 py-1"
      variant="ghost"
      onClick={() => setLight((v) => !v)}
    >
      {light ? "🌞" : "🌙"}
    </Button>
  );
}
