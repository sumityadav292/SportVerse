import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function MatchTimeline({ events }) {
  if (!events?.length) {
    return <p className="text-sm text-white/40">Timeline updates when events fire.</p>;
  }

  return (
    <ol className="space-y-3">
      {events.map((event, index) => (
        <motion.li
          key={`${event.minute}-${index}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
        >
          <span className="w-10 font-body text-sm text-live">{event.minute}'</span>
          <span className="text-xs uppercase tracking-widest text-white/40">{event.type}</span>
          <span>{event.player}</span>
        </motion.li>
      ))}
    </ol>
  );
}

MatchTimeline.propTypes = {
  events: PropTypes.array,
};
