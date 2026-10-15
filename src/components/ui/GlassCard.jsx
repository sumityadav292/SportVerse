import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

export default function GlassCard({ className, children, glow }) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-5",
        glow && "shadow-glow",
        className,
      )}
    >
      {children}
    </div>
  );
}

GlassCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  glow: PropTypes.bool,
};
