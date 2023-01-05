import { useContext, FC, useMemo } from 'react';
import { List, Paper } from '@mui/material';

import { EntryCard } from './';
import { EntriesContext } from '../../context/entries';
import { EntryStatus } from '../../interfaces/entry';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entrie) => entrie.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries]
  );

  return (
    //TODO: aquí haremos drop
    <div>
      <Paper
        sx={{
          height: 'calc(100vh - 180px)',
          //   overflow: 'scroll',
          backgroundColor: 'transparent',
          padding: 1,
        }}
      >
        {/*Todo: cambiará dependiendo si estoy haciendo drag o no*/}
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
