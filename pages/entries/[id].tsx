import { useState, ChangeEvent, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';

import { dbEntries } from '../../database';

import {
  capitalize,
  Card,
  CardHeader,
  Grid,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { EntriesContext } from '../../context/entries/EntriesContext';
import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';

//interface
interface Props {
  entry: Entry;
}

//Valid status
const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

//Siempre voy a recibir una entry porque sino nisiquiera se renderiza el componente.
const EntryPage: FC<Props> = ({ entry }) => {
  //Form states
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  //Context
  const { updateEntry } = useContext(EntriesContext);

  console.log(entry);

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setStatus(selectedValue as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    updateEntry({
      ...entry,
      description: inputValue,
      status,
    });
  };

  return (
    <Layout title="Entry Page">
      <>
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardHeader title="Entry" subheader={`recently created`} />
              <CardContent>
                <TextField
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth
                  placeholder="New entry"
                  autoFocus
                  multiline
                  label="New entry"
                  value={inputValue}
                  onChange={onInputValueChange}
                  onBlur={() => setTouched(true)}
                  helperText={
                    inputValue.length <= 0 && touched && 'Enter a value'
                  }
                  error={inputValue.length <= 0 && touched}
                />
                <FormControl>
                  <FormLabel>Estado:</FormLabel>
                  <RadioGroup row value={status} onChange={onStatusChanged}>
                    {validStatus.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<SaveOutlinedIcon />}
                  variant="contained"
                  fullWidth
                  onClick={onSave}
                  disabled={inputValue.length <= 0}
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <IconButton
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark',
          }}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </>
    </Layout>
  );
};

//You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  //Si no encuentra entrada en la db entonces nisiquiera renderizo la page sinó que redirecciono a la home
  if (!entry)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
