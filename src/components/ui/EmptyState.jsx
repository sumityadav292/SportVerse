import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import PropTypes from "prop-types";

export default function EmptyState({ title, copy }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mb-6 grid h-20 w-20 place-items-center rounded-full border border-live/30 bg-live/10"
      >
        <Sparkles className="h-8 w-8 text-live" />
      </motion.div>
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-white/60">{copy}</p>
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
};
