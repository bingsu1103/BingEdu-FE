import React from "react";
import { useInView } from "@/hooks/useInView";

interface StaggeredAnimationProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}

const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  className = "",
  staggerDelay = 100,
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`transform transition-all duration-700 ease-out ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggeredAnimation;
