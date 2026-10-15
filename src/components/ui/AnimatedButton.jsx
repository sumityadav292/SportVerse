import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

export default function AnimatedButton({
  children,
  loading,
  className,
  type = "button",
  ...props
}) {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-live px-5 py-3 font-display text-sm font-semibold text-studio shadow-glow",
        className,
      )}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </motion.button>
  );
}

AnimatedButton.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
};
