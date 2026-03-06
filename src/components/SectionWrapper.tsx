import React, { useContext, useEffect, useRef } from 'react';
import { ScrollContext } from '../ScrollContext';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children, className }) => {
  const { activeSectionId, setActiveSectionId } = useContext(ScrollContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSectionId(id);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [id, setActiveSectionId]);

  const isActive = activeSectionId === id;

  // Recursively add isActive prop to all children that are Reveal components
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type && (child.type as any).name === 'Reveal') {
      return React.cloneElement(child, { isActive } as any);
    }
    return child;
  });

  return (
    <div ref={ref} id={id} className={className}>
      {childrenWithProps}
    </div>
  );
};
