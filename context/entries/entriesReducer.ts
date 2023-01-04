import { EntriesState } from './';

type EntriesActionType =
  | { type: 'CreateEntrie' }
  | { type: 'DeleteEntrie' }
  | { type: 'UpdateEntrie' };

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case 'CreateEntrie':
    case 'DeleteEntrie':
    case 'UpdateEntrie':
    default:
      return state;
  }
};
