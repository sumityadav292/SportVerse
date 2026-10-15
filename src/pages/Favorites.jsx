import { useQuery } from "@tanstack/react-query";
import EmptyState from "../components/ui/EmptyState";
import LeagueCard from "../components/match/LeagueCard";
import MatchCard from "../components/match/MatchCard";
import { useFavorites } from "../hooks/useFavorites";
import { sportsApi } from "../services/sportsApi";

export default function Favorites() {
  const { favorites } = useFavorites();
  const { data: matches = [] } = useQuery({ queryKey: ["matches"], queryFn: () => sportsApi.getMatches() });
  const { data: leagues = [] } = useQuery({ queryKey: ["leagues"], queryFn: () => sportsApi.getLeagues() });

  const favMatches = matches.filter((m) => favorites.matches.includes(m.id));
  const favLeagues = leagues.filter((l) => favorites.leagues.includes(l.id));
  const empty = !favMatches.length && !favLeagues.length && !favorites.teams.length;

  if (empty) {
    return <EmptyState title="No favorites yet" copy="Pin live matches, clubs, and leagues to build your personal broadcast board." />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl">Favorites</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {favMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {favLeagues.map((league) => (
          <LeagueCard key={league.id} league={league} />
        ))}
      </div>
    </div>
  );
}
