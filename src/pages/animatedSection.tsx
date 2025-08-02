import React from "react";
import { useInView } from "@/hooks/useInView";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "fadeIn" | "scaleIn";
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const animationClasses = {
    fadeInUp: isInView
      ? "translate-y-0 opacity-100"
      : "translate-y-8 opacity-0",
    fadeInLeft: isInView
      ? "translate-x-0 opacity-100"
      : "-translate-x-8 opacity-0",
    fadeInRight: isInView
      ? "translate-x-0 opacity-100"
      : "translate-x-8 opacity-0",
    fadeIn: isInView ? "opacity-100" : "opacity-0",
    scaleIn: isInView ? "scale-100 opacity-100" : "scale-95 opacity-0",
  };

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${animationClasses[animation]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
