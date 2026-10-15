import PropTypes from "prop-types";
import { displayShort } from "../../utils/format";

export default function LiveScoreTicker({ matches }) {
  const live = matches.filter((match) => match.status === "live");
  const items = live.length ? live : matches.slice(0, 8);
  const line = items
    .map(
      (match) =>
        `${displayShort(match, "home", match.home)} ${match.homeScore}-${match.awayScore} ${displayShort(match, "away", match.away)}`,
    )
    .join("   ·   ");

  return (
    <div className="overflow-hidden border-y border-white/10 bg-black/40 py-2">
      <div className="flex animate-[ticker_28s_linear_infinite] whitespace-nowrap text-xs uppercase tracking-[0.25em] text-live">
        <span className="px-8">{line}   ·   {line}</span>
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[ticker_28s_linear_infinite\\] { animation: none; }
        }
      `}</style>
    </div>
  );
}

LiveScoreTicker.propTypes = {
  matches: PropTypes.array,
};
