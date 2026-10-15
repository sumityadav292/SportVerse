import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import GlassCard from "../ui/GlassCard";

export default function PlayerCard({ player }) {
  return (
    <Link to={`/players/${player.id}`}>
      <GlassCard>
        <p className="text-[11px] uppercase tracking-[0.2em] text-cyan">{player.position}</p>
        <h3 className="mt-2 font-display text-xl">{player.name}</h3>
        <p className="text-sm text-white/45">{player.team?.name}</p>
      </GlassCard>
    </Link>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.object.isRequired,
};
