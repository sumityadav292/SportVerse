import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

export default function ScoreCounter({ value }) {
  const prev = useRef(value);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (prev.current !== value) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 700);
      prev.current = value;
      return () => clearTimeout(t);
    }
    return undefined;
  }, [value]);

  return (
    <motion.span
      key={value}
      animate={
        flash
          ? { scale: [1, 1.28, 1], x: [0, -3, 3, 0], textShadow: "0 0 18px #00FF87" }
          : { scale: 1 }
      }
      className="inline-block font-body text-3xl font-bold tabular-nums"
    >
      {value}
    </motion.span>
  );
}

ScoreCounter.propTypes = {
  value: PropTypes.number,
};
