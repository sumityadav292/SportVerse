import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import Loader from "../components/ui/Loader";
import TeamLogo from "../components/match/TeamLogo";
import { useFavorites } from "../hooks/useFavorites";
import { sportsApi } from "../services/sportsApi";

export default function Teams() {
  const { data: teams = [], isLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: () => sportsApi.getTeams(),
  });
  const { has, toggle } = useFavorites();
  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl">Teams</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {teams.map((team) => (
          <GlassCard key={team.id} className="flex items-center justify-between">
            <Link to={`/teams/${team.id}`} className="flex items-center gap-4">
              <TeamLogo team={team} />
              <div>
                <p className="font-display text-lg">{team.name}</p>
                <p className="text-xs uppercase tracking-widest text-white/40">{team.form.join(" ")}</p>
              </div>
            </Link>
            <button type="button" onClick={() => toggle("teams", team.id)} className={has("teams", team.id) ? "text-crimson" : "text-white/30"}>
              <Heart className="h-4 w-4" fill={has("teams", team.id) ? "currentColor" : "none"} />
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
