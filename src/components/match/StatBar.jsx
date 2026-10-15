import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function StatBar({ label, home, away }) {
  const total = home + away || 1;
  const homePct = (home / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-white/60">
        <span>{home}</span>
        <span className="uppercase tracking-widest">{label}</span>
        <span>{away}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-live to-cyan"
          initial={{ width: 0 }}
          animate={{ width: `${homePct}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  );
}

StatBar.propTypes = {
  label: PropTypes.string,
  home: PropTypes.number,
  away: PropTypes.number,
};
