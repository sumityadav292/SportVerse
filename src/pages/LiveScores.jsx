import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import FilterTabs from "../components/ui/FilterTabs";
import Loader from "../components/ui/Loader";
import MatchCard from "../components/match/MatchCard";
import { sportsApi } from "../services/sportsApi";

const sports = [
  { value: "all", label: "All" },
  { value: "football", label: "Football" },
  { value: "cricket", label: "Cricket" },
  { value: "basketball", label: "Basketball" },
  { value: "tennis", label: "Tennis" },
];

const statuses = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "upcoming", label: "Upcoming" },
  { value: "ft", label: "Completed" },
];

export default function LiveScores() {
  const [sport, setSport] = useState("all");
  const [status, setStatus] = useState("all");
  const [leagueId, setLeagueId] = useState("all");
  const [date, setDate] = useState("");

  const { data: matches = [], isLoading } = useQuery({
    queryKey: ["matches", sport, status, leagueId, date],
    queryFn: () => sportsApi.getMatches({ sport, status, leagueId, date }),
    refetchInterval: 15000,
  });
  const { data: leagues = [] } = useQuery({
    queryKey: ["leagues"],
    queryFn: () => sportsApi.getLeagues(),
  });

  const leagueOptions = useMemo(
    () => [{ value: "all", label: "Leagues" }, ...leagues.map((l) => ({ value: l.id, label: l.name }))],
    [leagues],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-display text-4xl">Live scores</h1>
      <p className="mt-2 text-white/50">Auto-refresh every 15 seconds from the mock feed.</p>
      <div className="mt-8 space-y-4">
        <FilterTabs options={sports} value={sport} onChange={setSport} layoutId="sport-pill" />
        <FilterTabs options={statuses} value={status} onChange={setStatus} layoutId="status-pill" />
        <div className="flex flex-wrap gap-3">
          <select
            value={leagueId}
            onChange={(e) => setLeagueId(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
          >
            {leagueOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-studio">
                {o.label}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
          />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
