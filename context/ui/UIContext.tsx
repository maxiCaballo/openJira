import { createContext } from 'react';

interface ContextProps {
  sidebarOpenMenu: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  //Methods
  openSidebarMenu: () => void;
  closeSidebarMenu: () => void;
  setIsAddingEntry: (isAddingEntry: boolean) => void;
  setIsDragging: (isDraggin: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
