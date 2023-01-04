import { createContext } from 'react';

interface ContextProps {
  sidebarOpenMenu: boolean;
  //Methods
  openSidebarMenu: () => void;
  closeSidebarMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);
