import { FC } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
} from '@mui/material';
import { Entry } from '../../interfaces/entry';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  return (
    <Card
      sx={{ marginBottom: 1 }}

      //Eventos de drag
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
