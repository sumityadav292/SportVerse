import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MatchTimeline from "../components/match/MatchTimeline";
import MomentumChart from "../components/match/MomentumChart";
import ScoreCounter from "../components/match/ScoreCounter";
import StatBar from "../components/match/StatBar";
import TeamLogo from "../components/match/TeamLogo";
import GlassCard from "../components/ui/GlassCard";
import LiveBadge from "../components/ui/LiveBadge";
import Loader from "../components/ui/Loader";
import { sportsApi } from "../services/sportsApi";
import { displayName } from "../utils/format";

const tabs = ["Overview", "Statistics", "Lineups", "Head-to-Head", "Highlights"];

export default function MatchDetails() {
  const { id } = useParams();
  const [tab, setTab] = useState("Overview");
  const { data: match, isLoading } = useQuery({
    queryKey: ["match", id],
    queryFn: () => sportsApi.getMatch(id),
    refetchInterval: 15000,
  });

  if (isLoading || !match) return <Loader />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <GlassCard glow={match.status === "live"} className="text-center">
        <div className="mb-4 flex justify-center">
          <LiveBadge status={match.status} />
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          {match.league?.name} · {match.venue} · {match.referee}
        </p>
        <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <TeamLogo team={match.home} size="lg" name={displayName(match, "home", match.home)} />
            <h2 className="font-display text-xl">{displayName(match, "home", match.home)}</h2>
          </div>
          <div className="flex items-center gap-4 font-body text-5xl">
            <ScoreCounter value={match.homeScore} />
            <span className="text-white/20">:</span>
            <ScoreCounter value={match.awayScore} />
          </div>
          <div className="flex flex-col items-center gap-3">
            <TeamLogo team={match.away} size="lg" name={displayName(match, "away", match.away)} />
            <h2 className="font-display text-xl">{displayName(match, "away", match.away)}</h2>
          </div>
        </div>
        {match.status === "live" && (
          <div className="mx-auto mt-6 h-1.5 max-w-md overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full bg-live" animate={{ width: `${match.minute}%` }} />
          </div>
        )}
      </GlassCard>

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest ${tab === item ? "bg-live text-studio" : "border border-white/10 text-white/50"}`}
          >
            {item}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-6">
          {tab === "Overview" && <MatchTimeline events={match.timeline} />}
          {tab === "Statistics" && (
            <GlassCard className="space-y-5">
              <StatBar label="Possession" home={match.stats.possession[0]} away={match.stats.possession[1]} />
              <StatBar label="Shots" home={match.stats.shots[0]} away={match.stats.shots[1]} />
              <StatBar label="Passes" home={match.stats.passes[0]} away={match.stats.passes[1]} />
            </GlassCard>
          )}
          {tab === "Lineups" && (
            <div className="grid gap-4 md:grid-cols-2">
              {["home", "away"].map((side) => (
                <GlassCard key={side}>
                  <h3 className="mb-3 font-display">{side}</h3>
                  <ul className="space-y-1 text-sm text-white/70">
                    {match.lineups[side].map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          )}
          {tab === "Head-to-Head" && <p className="text-white/50">Last five meetings split 3-2 toward home.</p>}
          {tab === "Highlights" && <MomentumChart data={match.momentum} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
