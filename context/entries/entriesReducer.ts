import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | { type: 'CreateEntry'; payload: Entry }
  | { type: 'DeleteEntry'; payload: Entry } //Se podria haber llamado al refresh entry pero preferí implementar el metodo.
  | { type: 'UpdateEntry'; payload: Entry }
  | { type: 'RefreshEntries'; payload: Entry[] };

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
            //Solo actualizo lo necesario y no mando el objeto entero por seguridad
            entry.description = action.payload.description;
            entry.status = action.payload.status;
          }
          return entry;
        }),
      };
    case 'RefreshEntries':
      return {
        ...state,
        entries: [...action.payload],
      };
    case 'DeleteEntry':
      const updatedEntries: Entry[] = state.entries.filter(
        (entry) => entry._id !== action.payload._id
      );
      return {
        ...state,
        entries: updatedEntries,
      };
    default:
      return state;
  }
};
