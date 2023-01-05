import { NextPage } from 'next';
import { Grid, Card, CardHeader, CardContent } from '@mui/material';
import { Layouts } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';

const HomePage: NextPage = () => {
  return (
    <Layouts title="Home openjira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pending" />

            {/* {Agregar una nueva tarea} */}
            {/* {Listado de entradas} */}
            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="In progress" />

            {/* {Agregar una nueva tarea} */}
            {/* {Listado de entradas} */}
            <EntryList status="in-progress" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="finished" />

            {/* {Agregar una nueva tarea} */}
            {/* {Listado de entradas} */}
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layouts>
  );
};
export default HomePage;
