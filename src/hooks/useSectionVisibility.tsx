// src/hooks/useSectionVisibility.ts (Simplified & Corrected)
import { useEffect, useRef } from "react";

/**
 * Observes an element and adds the 'section-visible' class when it intersects the viewport.
 * @param threshold - How much of the element should be visible (0.0 to 1.0). Default: 0.1 (10%).
 * @returns A ref object to attach to the target HTMLElement.
 */
export const useSectionVisibility = (threshold = 0.1) => {
  // Use HTMLElement for broader compatibility, can be cast if needed
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentElement = sectionRef.current; // Capture ref value

    // Ensure element exists and IntersectionObserver is supported
    if (!currentElement || typeof IntersectionObserver === "undefined") {
      // Optionally add 'section-visible' immediately if IntersectionObserver isn't supported
      // currentElement?.classList.add("section-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Destructure the first entry
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          // Stop observing this element once it has become visible
          observer.unobserve(entry.target);
        }
        // No 'else' needed if we only want it to trigger once
      },
      {
        threshold: threshold, // Use the threshold parameter
      },
    );

    observer.observe(currentElement);

    // Cleanup: Disconnect the observer when the component unmounts
    // or the element reference changes.
    return () => {
      observer.disconnect();
    };
    // Re-run the effect if the threshold changes (though unlikely for this use case)
  }, [threshold]); // Removed sectionRef from dependency array as its change doesn't require re-observing typically

  return sectionRef;
};
