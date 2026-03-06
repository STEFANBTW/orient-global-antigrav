import React from 'react';

export interface ScrollContextType {
  scrollContainerRef: React.RefObject<HTMLDivElement> | null;
  activeSectionId: string | null;
  setActiveSectionId: (id: string | null) => void;
}

export const ScrollContext = React.createContext<ScrollContextType>({
  scrollContainerRef: null,
  activeSectionId: null,
  setActiveSectionId: () => {},
});
