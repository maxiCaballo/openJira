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
  entries: [
    {
      _id: uuidv4(),
      description: 'Pending-Example1',
      status: 'pending',
      createAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'In-Progress Example2',
      status: 'in-progress',
      createAt: Date.now() - 100000,
    },
    {
      _id: uuidv4(),
      description: 'Finished-Example3',
      status: 'finished',
      createAt: Date.now() - 1000000,
    },
  ],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  return (
    <EntriesContext.Provider value={{ ...state }}>
      {children}
    </EntriesContext.Provider>
  );
};
