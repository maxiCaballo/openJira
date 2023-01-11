import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
  entries: Entry[];
  //Methods:
  createEntry: (description: string) => void;
  updateEntry: (entry: Entry, showNotiSnack?: boolean | undefined) => void;
  deleteEntry: (entry: Entry) => void;
}

export const EntriesContext = createContext({} as ContextProps);
