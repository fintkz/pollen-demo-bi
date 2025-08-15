import { useState, useEffect, useRef } from "react";

const useSimpleInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state based on intersection status
        setIsInView(entry.isIntersecting);
      },
      { threshold: options?.threshold ?? 0.1, ...options },
    ); // Use threshold from options

    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.threshold]); // Re-run if threshold changes

  return [ref, isInView];
};

export default useSimpleInView;
