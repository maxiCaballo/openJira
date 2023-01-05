import { createContext } from 'react';

interface ContextProps {
  sidebarOpenMenu: boolean;
  isAddingEntry: boolean;
  //Methods
  openSidebarMenu: () => void;
  closeSidebarMenu: () => void;
  setIsAddingEntry: (isAddingEntry: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
