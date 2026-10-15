import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FixtureCard from "../components/match/FixtureCard";
import PlayerCard from "../components/match/PlayerCard";
import TeamLogo from "../components/match/TeamLogo";
import GlassCard from "../components/ui/GlassCard";
import Loader from "../components/ui/Loader";
import { sportsApi } from "../services/sportsApi";

export default function TeamProfile() {
  const { id } = useParams();
  const { data: team, isLoading } = useQuery({
    queryKey: ["team", id],
    queryFn: () => sportsApi.getTeam(id),
  });
  if (isLoading || !team) return <Loader />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <GlassCard className="flex items-center gap-6">
        <TeamLogo team={team} size="lg" />
        <div>
          <h1 className="font-display text-4xl">{team.name}</h1>
          <p className="text-sm text-white/45">{team.league?.name} · form {team.form.join(" ")}</p>
        </div>
      </GlassCard>
      <h2 className="mt-10 font-display text-2xl">Squad</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {team.squad.map((player) => (
          <PlayerCard key={player.id} player={{ ...player, team }} />
        ))}
      </div>
      <h2 className="mt-10 font-display text-2xl">Fixtures</h2>
      <div className="mt-4 space-y-3">
        {team.fixtures.map((match) => (
          <FixtureCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
