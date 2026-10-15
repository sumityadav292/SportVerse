import { Moon } from "lucide-react";

export default function ThemeButton() {
  return (
    <button
      type="button"
      aria-label="Broadcast studio theme"
      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5"
    >
      <Moon className="h-4 w-4 text-cyan" />
    </button>
  );
}
