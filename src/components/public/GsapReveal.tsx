"use client";

import { type ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type GsapRevealProps = {
  children: ReactNode;
  className?: string;
};

export function GsapReveal({ children, className }: GsapRevealProps) {
  const scope = useRef<HTMLDivElement>(null);
  const scopedClassName = className ? `pb-gsap-scope ${className}` : "pb-gsap-scope";

  useGSAP(
    () => {
      if (!scope.current) {
        return;
      }

      const select = gsap.utils.selector(scope);
      const revealTargets = select("[data-reveal]");
      const imageTargets = select("[data-image-reveal]");
      const parallaxTargets = select("[data-parallax]");
      const mm = gsap.matchMedia(scope.current);

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const allTargets = [...revealTargets, ...imageTargets, ...parallaxTargets];
        if (allTargets.length) {
          gsap.set(allTargets, {
            opacity: 1,
            visibility: "visible",
            clearProps: "clipPath,transform"
          });
        }
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (revealTargets.length) {
          gsap.set(revealTargets, { opacity: 0, y: 28 });
        }
        if (imageTargets.length) {
          gsap.set(imageTargets, {
            autoAlpha: 0,
            clipPath: "inset(12% 0% 12% 0%)",
            scale: 1.03
          });
        }

        revealTargets.forEach((target) => {
          gsap.to(target, {
            opacity: 1,
            y: 0,
            duration: 0.82,
            ease: "power3.out",
            scrollTrigger: {
              trigger: target,
              start: "top 94%",
              once: true
            }
          });
        });

        imageTargets.forEach((target) => {
          gsap.to(target, {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: target,
              start: "top 94%",
              once: true
            }
          });
        });
      });

      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        parallaxTargets.forEach((target) => {
          gsap.to(target, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: target.parentElement ?? target,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      const refreshFrame = window.requestAnimationFrame(refresh);
      window.addEventListener("load", refresh, { once: true });

      return () => {
        window.cancelAnimationFrame(refreshFrame);
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope }
  );

  return (
    <div className={scopedClassName} ref={scope}>
      {children}
    </div>
  );
}
