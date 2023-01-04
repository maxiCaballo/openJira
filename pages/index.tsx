import { NextPage } from 'next';
import { Grid, Card, CardHeader, CardContent } from '@mui/material';
import { Layouts } from '../components/layouts';

const HomePage: NextPage = () => {
  return (
    <Layouts title="Home openjira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pending" />
            <CardContent>
              {/* {Agregar una nueva tarea} */}
              {/* {Listado de entradas} */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="In progress" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layouts>
  );
};
export default HomePage;
