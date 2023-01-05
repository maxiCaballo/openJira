import { FC, ReactElement, useReducer } from 'react';
import { UIContext, uiReducer } from './';

type Props = {
  children: ReactElement;
};

export interface UIState {
  sidebarOpenMenu: boolean;
  isAddingEntry: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidebarOpenMenu: false,
  isAddingEntry: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSidebarMenu = () => {
    dispatch({ type: 'OpenSidebar' });
  };
  const closeSidebarMenu = () => {
    dispatch({ type: 'CloseSidebar' });
  };
  const setIsAddingEntry = (isAddingEntry: boolean) => {
    dispatch({ type: 'SetIsAddingEntry', payload: isAddingEntry });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        //Methods
        openSidebarMenu,
        closeSidebarMenu,
        setIsAddingEntry,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
