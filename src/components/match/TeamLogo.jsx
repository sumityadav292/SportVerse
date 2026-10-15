import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

export default function TeamLogo({ team, size = "md", name }) {
  const label = name ?? team?.short ?? "?";
  const color = team?.color ?? "#00FF87";
  const dim = size === "lg" ? "h-16 w-16 text-lg" : size === "sm" ? "h-8 w-8 text-[10px]" : "h-11 w-11 text-xs";

  return (
    <div
      className={cn(
        "grid place-items-center rounded-full border border-white/15 font-display font-bold",
        dim,
      )}
      style={{ background: `${color}22`, color }}
    >
      {String(label).slice(0, 3).toUpperCase()}
    </div>
  );
}

TeamLogo.propTypes = {
  team: PropTypes.object,
  size: PropTypes.string,
  name: PropTypes.string,
};
