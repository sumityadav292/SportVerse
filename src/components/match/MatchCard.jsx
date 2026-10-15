import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { displayShort } from "../../utils/format";
import { useFavorites } from "../../hooks/useFavorites";
import GlassCard from "../ui/GlassCard";
import LiveBadge from "../ui/LiveBadge";
import TeamLogo from "./TeamLogo";
import ScoreCounter from "./ScoreCounter";

export default function MatchCard({ match }) {
  const { has, toggle } = useFavorites();
  const fav = has("matches", match.id);

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 320, damping: 24 }}>
      <GlassCard className="relative overflow-hidden" glow={match.status === "live"}>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
            {match.league?.name} · {match.kickoff}
          </p>
          <div className="flex items-center gap-2">
            <LiveBadge status={match.status} />
            <button
              type="button"
              aria-label="Favorite match"
              onClick={() => toggle("matches", match.id)}
              className={fav ? "text-crimson" : "text-white/30"}
            >
              <Heart className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
        <Link to={`/match/${match.id}`} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex items-center gap-3">
            <TeamLogo team={match.home} name={displayShort(match, "home", match.home)} />
            <span className="font-display text-sm">{displayShort(match, "home", match.home)}</span>
          </div>
          <div className="flex items-center gap-2 font-body">
            <ScoreCounter value={match.homeScore} />
            <span className="text-white/30">:</span>
            <ScoreCounter value={match.awayScore} />
          </div>
          <div className="flex items-center justify-end gap-3">
            <span className="font-display text-sm">{displayShort(match, "away", match.away)}</span>
            <TeamLogo team={match.away} name={displayShort(match, "away", match.away)} />
          </div>
        </Link>
        {match.status === "live" && (
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-live"
              animate={{ width: `${Math.min(match.minute, 90)}%` }}
            />
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}

MatchCard.propTypes = {
  match: PropTypes.object.isRequired,
};
