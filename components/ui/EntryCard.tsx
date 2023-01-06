import { DragEvent, FC, useContext } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
} from '@mui/material';
import { UIContext } from '../../context/ui/UIContext';
import { Entry } from '../../interfaces/entry';

//Interfaces
interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { setIsDragging } = useContext(UIContext);

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('entryId', entry._id);
    setIsDragging(true);
    //todo: modificar el estado, para indicar que estoy haciendo drag
  };
  const onDragEnd = () => {
    setIsDragging(false);
  };
  return (
    <Card
      sx={{ marginBottom: 1 }}
      //Eventos de drag
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="body2">Since 30 minutes</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
