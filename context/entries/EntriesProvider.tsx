import { FC, ReactElement, useReducer, useEffect } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import entriesApi from '../../apis/entriesApi';

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

  //Update entries in the browser
  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<Entry[]>('/entries');
      dispatch({ type: 'RefreshEntries', payload: data });
    } catch (error: any) {
      console.log(error.response.data.message);
      return error;
    }
  };

  //Add new entry
  const createEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', {
        description,
      });
      dispatch({ type: 'CreateEntry', payload: data });
    } catch (error: any) {
      console.log(error.response.data.message);
      return error;
    }
  };

  //Update entry
  const updateEntry = async (entry: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, {
        description: entry.description,
        status: entry.status,
      });
      dispatch({ type: 'UpdateEntry', payload: data });
    } catch (error: any) {
      console.log(error.response.data.message);
      return error;
    }
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
/*
      const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, {
        description: entry.description,
        status: entry.status,
      });

      dispatch({ type: 'UpdateEntry', payload: data });
*/
