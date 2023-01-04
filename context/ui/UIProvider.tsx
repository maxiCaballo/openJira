import { FC, ReactElement, useReducer } from 'react';
import { UIContext, uiReducer } from './';

type Props = {
  children: ReactElement;
};

export interface UIState {
  sidebarOpenMenu: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidebarOpenMenu: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSidebarMenu = () => {
    dispatch({ type: 'OpenSidebar' });
  };
  const closeSidebarMenu = () => {
    dispatch({ type: 'CloseSidebar' });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        //Methods
        openSidebarMenu,
        closeSidebarMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
