export function statusLabel(status) {
  if (status === "live") return "LIVE";
  if (status === "ft") return "FT";
  return "UPCOMING";
}

export function displayName(match, side, team) {
  if (match.sport === "tennis") {
    return side === "home" ? match.homeName : match.awayName;
  }
  return team?.name ?? "TBD";
}

export function displayShort(match, side, team) {
  if (match.sport === "tennis") {
    return side === "home" ? match.homeName : match.awayName;
  }
  return team?.short ?? "TBD";
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isMobileViewport() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}
