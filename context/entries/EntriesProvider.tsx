import { FC, ReactElement, useReducer, useEffect } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import entriesApi from '../../apis/entriesApi';

import { OptionsObject, SnackbarKey, useSnackbar } from 'notistack';

type Props = {
  children: ReactElement;
};

export interface EntriesState {
  entries: Entry[];
}
const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

//User notificacion objet
const notiSnack: OptionsObject = {
  autoHideDuration: 2000,
  variant: 'success',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    refreshEntries();
  }, []);

  //*Start-Methods:
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
  const updateEntry = async (entry: Entry, showNotiSnack: boolean = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, {
        description: entry.description,
        status: entry.status,
      });
      dispatch({ type: 'UpdateEntry', payload: data });

      //User notification

      if (showNotiSnack) {
        enqueueSnackbar('Entry updated', notiSnack);
      }
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      console.log(errorMessage);

      enqueueSnackbar('Error', { ...notiSnack, variant: 'error' });
      return error;
    }
  };
  //Delete entry
  const deleteEntry = async ({ _id }: Entry) => {
    try {
      const { data } = await entriesApi.delete(`/entries/${_id}`);
      dispatch({ type: 'DeleteEntry', payload: data.entry });
      enqueueSnackbar('Entry deleted', { ...notiSnack, variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Error', { ...notiSnack, variant: 'error' });
      return error;
    }
  };
  //*End-Methods

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //Methods:
        createEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
