import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveEntryIcon from '@mui/icons-material/SaveOutlined';
import AddEntryIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewEntry = () => {
  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      <Button startIcon={<AddEntryIcon />} fullWidth variant="outlined">
        Add task
      </Button>
      <TextField
        fullWidth
        sx={{ margin: '15px 0' }}
        autoFocus
        multiline
        label="New entry "
      />
      <Box display="flex" justifyContent="space-between">
        <Button variant="text" color="primary">
          Cancel
        </Button>
        <Button
          color="secondary"
          endIcon={<SaveEntryIcon />}
          variant="outlined"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
