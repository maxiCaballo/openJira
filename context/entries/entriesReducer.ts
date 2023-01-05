import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | { type: 'CreateEntry'; payload: Entry }
  | { type: 'DeleteEntry' }
  | { type: 'UpdateEntry' };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case 'CreateEntry':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    // case 'DeleteEntry':
    // case 'UpdateEntry':
    default:
      return state;
  }
};
