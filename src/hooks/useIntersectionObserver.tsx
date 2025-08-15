import { useEffect, useState, RefObject } from "react";

interface UseIntersectionObserverProps {
  ref: RefObject<HTMLElement>;
  threshold?: number | number[];
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  ref,
  threshold = 0.1,
  rootMargin = "0px",
  freezeOnceVisible = true,
}: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;

        // Update state
        setIsIntersecting(isElementIntersecting);

        // Unobserve once element is visible
        if (isElementIntersecting && freezeOnceVisible && ref.current) {
          observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold, rootMargin, freezeOnceVisible]);

  return isIntersecting;
}
