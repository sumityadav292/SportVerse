import { useQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { useParams } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import Loader from "../components/ui/Loader";
import { sportsApi } from "../services/sportsApi";

function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numeric = Number(value) || 0;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const start = performance.now();
    const frame = (now) => {
      const t = Math.min(1, (now - start) / 900);
      setShown(numeric * t);
      if (t < 1) requestAnimationFrame(frame);
    };
    const id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [inView, numeric]);

  const label = Number.isInteger(numeric) ? Math.round(shown) : shown.toFixed(1);
  return <span ref={ref}>{label}</span>;
}

export default function PlayerProfile() {
  const { id } = useParams();
  const { data: player, isLoading } = useQuery({
    queryKey: ["player", id],
    queryFn: () => sportsApi.getPlayer(id),
  });
  if (isLoading || !player) return <Loader />;
  const chart = Object.entries(player.stats).map(([k, v]) => ({ k, v: Number(v) || 0 }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <GlassCard>
        <p className="text-xs uppercase tracking-[0.3em] text-cyan">{player.position}</p>
        <h1 className="mt-2 font-display text-4xl">{player.name}</h1>
        <p className="text-white/50">{player.team?.name}</p>
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {Object.entries(player.stats).map(([key, value]) => (
            <div key={key}>
              <p className="font-display text-3xl text-live">
                <Counter value={value} />
              </p>
              <p className="text-xs uppercase tracking-widest text-white/40">{key}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 h-52">
          <ResponsiveContainer>
            <BarChart data={chart}>
              <XAxis dataKey="k" stroke="#ffffff40" />
              <Bar dataKey="v" fill="#00FF87" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
