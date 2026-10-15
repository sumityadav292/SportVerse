import { Heart } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import GlassCard from "../ui/GlassCard";

export default function LeagueCard({ league }) {
  const { has, toggle } = useFavorites();
  const fav = has("leagues", league.id);

  return (
    <GlassCard className="flex items-center justify-between">
      <Link to="/leagues" className="flex items-center gap-4">
        <span className="text-2xl">{league.flag}</span>
        <div>
          <p className="font-display text-lg">{league.name}</p>
          <p className="text-xs uppercase tracking-widest text-white/40">
            {league.country} · {league.matches} matches
          </p>
        </div>
      </Link>
      <button type="button" onClick={() => toggle("leagues", league.id)} className={fav ? "text-crimson" : "text-white/30"}>
        <Heart className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
      </button>
    </GlassCard>
  );
}

LeagueCard.propTypes = {
  league: PropTypes.object.isRequired,
};
