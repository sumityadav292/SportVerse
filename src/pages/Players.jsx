import { useQuery } from "@tanstack/react-query";
import PlayerCard from "../components/match/PlayerCard";
import Loader from "../components/ui/Loader";
import { sportsApi } from "../services/sportsApi";

export default function Players() {
  const { data: players = [], isLoading } = useQuery({
    queryKey: ["players"],
    queryFn: () => sportsApi.getPlayers(),
  });
  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl">Players</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
