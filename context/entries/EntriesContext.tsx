import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
  entries: Entry[]; //TODO: Falta decalararle que tipo de dato va a contener el array.
}

export const EntriesContext = createContext({} as ContextProps);
