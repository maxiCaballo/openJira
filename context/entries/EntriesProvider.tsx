import { FC, ReactElement, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  children: ReactElement;
};

export interface EntriesState {
  entries: Entry[];
}
const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  //Add new entry
  const createEntry = (description: string) => {
    const entry: Entry = {
      _id: uuidv4(),
      description,
      createAt: Date.now(),
      status: 'pending',
    };
    dispatch({ type: 'CreateEntry', payload: entry });
  };
  //Update entries
  const updateEntry = (entry: Entry) => {
    dispatch({ type: 'UpdateEntry', payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //Methods:
        createEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
