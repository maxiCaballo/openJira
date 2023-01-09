import { FC, ReactElement, useReducer, useEffect } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import {
  entriesApi_getAll,
  entriesApi_create,
  entriesApi_update,
} from '../../apis/entriesApi';

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

  useEffect(() => {
    refreshEntries();
  }, []);

  //*Methods:

  //Add new entry
  const createEntry = async (description: string) => {
    const { data } = await entriesApi_create(description);
    dispatch({ type: 'CreateEntry', payload: data });
  };

  //Update entry
  const updateEntry = async (entry: Entry) => {
    const { data } = await entriesApi_update(entry);

    dispatch({ type: 'UpdateEntry', payload: data });
  };

  //Update entries in the browser
  const refreshEntries = async () => {
    const { data } = await entriesApi_getAll();
    dispatch({ type: 'RefreshEntries', payload: data });
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
