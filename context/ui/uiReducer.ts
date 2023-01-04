import { UIState } from './';

type UIActionType = { type: 'OpenSidebar' } | { type: 'CloseSidebar' };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'OpenSidebar':
      return {
        ...state,
        sidebarOpenMenu: true,
      };
    case 'CloseSidebar':
      return {
        ...state,
        sidebarOpenMenu: false,
      };
    default:
      return state;
  }
};
