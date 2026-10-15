import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

export default function FilterTabs({ options, value, onChange, layoutId = "filter-pill" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide",
              active ? "text-studio" : "text-white/60 hover:text-white",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-live"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

FilterTabs.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  layoutId: PropTypes.string,
};
