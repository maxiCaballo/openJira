import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | { type: 'CreateEntry'; payload: Entry }
  | { type: 'DeleteEntry' }
  | { type: 'UpdateEntry'; payload: Entry };

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
    case 'UpdateEntry':
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.description = action.payload.description;
            entry.status = action.payload.status;
          }
          return entry;
        }),
      };
    // case 'UpdateEntry':
    default:
      return state;
  }
};
