import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../utils/format";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(rootRef) {
  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [rootRef]);
}
