import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { displayShort } from "../../utils/format";
import GlassCard from "../ui/GlassCard";
import TeamLogo from "./TeamLogo";
import LiveBadge from "../ui/LiveBadge";

export default function FixtureCard({ match }) {
  return (
    <Link to={`/match/${match.id}`}>
      <GlassCard className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TeamLogo team={match.home} size="sm" name={displayShort(match, "home", match.home)} />
          <span className="text-sm">{displayShort(match, "home", match.home)}</span>
          <span className="text-white/30">vs</span>
          <TeamLogo team={match.away} size="sm" name={displayShort(match, "away", match.away)} />
          <span className="text-sm">{displayShort(match, "away", match.away)}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-white/50">
          <span>{match.date}</span>
          <LiveBadge status={match.status} />
        </div>
      </GlassCard>
    </Link>
  );
}

FixtureCard.propTypes = {
  match: PropTypes.object.isRequired,
};
