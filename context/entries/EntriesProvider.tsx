import { FC, ReactElement, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';

type Props = {
  children: ReactElement;
};

export interface EntriesState {
  entries: [];
}
const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  return (
    <EntriesContext.Provider value={{ ...state }}>
      {children}
    </EntriesContext.Provider>
  );
};
