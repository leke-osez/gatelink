import { useEffect, useRef, useState } from "react";

type UseHideOnScrollOptions = {
  /**
   * Minimum upward scroll distance before showing nav again
   */
  showAfter?: number;
  /**
   * Scroll offset after which hiding is allowed
   */
  hideAfter?: number;
};

export function useHideOnScroll({
  showAfter = 60,
  hideAfter = 20,
}: UseHideOnScrollOptions = {}) {
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);
  const accumulatedUpScroll = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;

        // scrolling down
        if (delta > 0 && currentScrollY > hideAfter) {
          accumulatedUpScroll.current = 0;
          setVisible(false);
        }

        // scrolling up
        if (delta < 0) {
          accumulatedUpScroll.current += Math.abs(delta);

          if (accumulatedUpScroll.current >= showAfter) {
            setVisible(true);
          }
        }

        if (currentScrollY < 30) {
          setVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [hideAfter, showAfter]);

  return visible;
}