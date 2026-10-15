import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LeagueCard from "../components/match/LeagueCard";
import LiveScoreTicker from "../components/match/LiveScoreTicker";
import MatchCard from "../components/match/MatchCard";
import PlayerCard from "../components/match/PlayerCard";
import ParticleBackground from "../components/three/ParticleBackground";
import SportsBall3D from "../components/three/SportsBall3D";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { sportsApi } from "../services/sportsApi";
import { prefersReducedMotion } from "../utils/format";

export default function Home() {
  const root = useRef(null);
  const headline = useRef(null);
  useGsapReveal(root);

  const { data: matches = [] } = useQuery({
    queryKey: ["home-matches"],
    queryFn: () => sportsApi.getMatches(),
  });
  const { data: leagues = [] } = useQuery({
    queryKey: ["leagues"],
    queryFn: () => sportsApi.getLeagues(),
  });
  const { data: players = [] } = useQuery({
    queryKey: ["players"],
    queryFn: () => sportsApi.getPlayers(),
  });

  useEffect(() => {
    if (!headline.current || prefersReducedMotion()) return undefined;
    const words = headline.current.querySelectorAll("span");
    const ctx = gsap.context(() => {
      gsap.from(words, {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
      });
    });
    return () => ctx.revert();
  }, []);

  const featured = matches.filter((m) => m.status === "live").slice(0, 3);
  const upcoming = matches.filter((m) => m.status === "upcoming").slice(0, 3);

  return (
    <div ref={root}>
      <section className="relative min-h-[100svh] overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0">
          <SportsBall3D />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-24 pt-10">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-cyan">Broadcast studio</p>
          <h1 ref={headline} className="max-w-4xl font-display text-5xl font-extrabold leading-[0.95] md:text-7xl">
            {"Every Match. Every Second. Live.".split(" ").map((word, i) => (
              <span key={`${word}-${i}`} className="mr-3 inline-block">
                {word}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-lg text-white/60">
            Cinematic live scores, momentum graphs, and match intelligence for football, cricket, basketball, and tennis.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/live" className="rounded-full bg-live px-6 py-3 font-display text-sm font-semibold text-studio shadow-glow">
              Enter live desk
            </Link>
            <Link to="/fixtures" className="rounded-full border border-white/15 px-6 py-3 text-sm">
              View fixtures
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <LiveScoreTicker matches={matches} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20" data-reveal>
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl">Featured live</h2>
          <Link to="/live" className="text-sm text-live">
            All scores
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((match, i) => (
            <motion.div key={match.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <MatchCard match={match} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12" data-reveal>
        <h2 className="mb-8 font-display text-3xl">Upcoming fixtures</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {upcoming.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12" data-reveal>
        <h2 className="mb-8 font-display text-3xl">Popular leagues</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {leagues.map((league) => (
            <LeagueCard key={league.id} league={league} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12" data-reveal>
        <h2 className="mb-8 font-display text-3xl">Top players</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {players.slice(0, 5).map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>
    </div>
  );
}
