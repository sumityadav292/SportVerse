import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import FixtureCard from "../components/match/FixtureCard";
import FilterTabs from "../components/ui/FilterTabs";
import Loader from "../components/ui/Loader";
import { sportsApi } from "../services/sportsApi";

export default function Fixtures() {
  const [status, setStatus] = useState("upcoming");
  const [date, setDate] = useState("");
  const { data: matches = [], isLoading } = useQuery({
    queryKey: ["fixtures", status, date],
    queryFn: () => sportsApi.getMatches({ status, date }),
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-4xl">Fixtures & results</h1>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <FilterTabs
          options={[
            { value: "upcoming", label: "Upcoming" },
            { value: "ft", label: "Results" },
          ]}
          value={status}
          onChange={setStatus}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-6 space-y-3">
          {matches.map((match) => (
            <FixtureCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
