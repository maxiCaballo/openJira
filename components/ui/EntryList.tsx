import { useContext, FC, useMemo, DragEvent } from 'react';
import { List, Paper } from '@mui/material';

import { EntryCard } from './';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import { EntryStatus, Entry } from '../../interfaces/entry';

import styles from '../ui/EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, setIsDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entrie) => entrie.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries]
  );
  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const entryId = e.dataTransfer.getData('entryId');
    const entry = entries.find((e) => e._id === entryId)!;

    entry.status = status;
    updateEntry(entry);
    setIsDragging(false);
  };

  return (
    //TODO: aquí haremos drop
    <div
      onDragOver={allowDrop}
      onDrop={onDropEntry}
      className={isDragging ? styles.isDragging : ''}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 180px)',
          //   overflow: 'scroll',
          backgroundColor: 'transparent',
          padding: 1,
        }}
      >
        {/*Todo: cambiará dependiendo si estoy haciendo drag o no*/}
        <List sx={{ opacity: isDragging ? 0.5 : 1, transition: 'all .3s' }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
