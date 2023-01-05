import { UIState } from './';

type UIActionType =
  | { type: 'OpenSidebar' }
  | { type: 'CloseSidebar' }
  | { type: 'SetIsAddingEntry'; payload: boolean };

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
    case 'SetIsAddingEntry':
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    default:
      return state;
  }
};
