import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

export default function LiveBadge({ status }) {
  if (status !== "live") {
    return (
      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/50">
        {status === "ft" ? "FT" : "Soon"}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-live/40 bg-live/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-live">
      <span className="relative h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-crimson" />
        <span className="absolute inset-0 rounded-full bg-live" />
      </span>
      Live
    </span>
  );
}

LiveBadge.propTypes = {
  status: PropTypes.string,
};

export function liveClass(status) {
  return cn(status === "live" && "glow-live");
}
