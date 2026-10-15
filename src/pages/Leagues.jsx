import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import LeagueCard from "../components/match/LeagueCard";
import PlayerCard from "../components/match/PlayerCard";
import GlassCard from "../components/ui/GlassCard";
import Loader from "../components/ui/Loader";
import { sportsApi } from "../services/sportsApi";

export default function Leagues() {
  const [leagueId, setLeagueId] = useState("epl");
  const { data: leagues = [], isLoading } = useQuery({
    queryKey: ["leagues"],
    queryFn: () => sportsApi.getLeagues(),
  });
  const { data: table = [] } = useQuery({
    queryKey: ["standings", leagueId],
    queryFn: () => sportsApi.getStandings(leagueId),
  });
  const { data: players = [] } = useQuery({
    queryKey: ["players"],
    queryFn: () => sportsApi.getPlayers(),
  });

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl">Leagues</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {leagues.map((league) => (
          <button key={league.id} type="button" onClick={() => setLeagueId(league.id)} className="text-left">
            <LeagueCard league={league} />
          </button>
        ))}
      </div>
      <GlassCard className="mt-10 overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-white/40">
            <tr>
              <th className="px-4 py-3">Club</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => (
              <motion.tr
                key={row.teamId}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="border-t border-white/5"
              >
                <td className="px-4 py-3">{row.team?.name}</td>
                <td>{row.played}</td>
                <td>{row.won}</td>
                <td>{row.draw}</td>
                <td>{row.lost}</td>
                <td>{row.gd}</td>
                <td className="font-semibold text-live">{row.pts}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
      <h2 className="mt-12 font-display text-2xl">Top performers</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {players.slice(0, 5).map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
