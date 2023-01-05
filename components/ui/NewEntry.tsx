import React, { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import SaveEntryIcon from '@mui/icons-material/SaveOutlined';
import AddEntryIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewEntry = () => {
  //Context
  const { createEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  //TextFieldState
  const [inputValue, setInputValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const handleChangeTextField = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleClickIsAddingEntry = (isAdding: boolean): void => {
    setIsAddingEntry(isAdding);
  };
  const onSave = () => {
    if (inputValue.length === 0) return;
    else {
      createEntry(inputValue);
      setIsAddingEntry(false);
      setInputValue('');
      setIsFocus(false);
    }
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ margin: '15px 0' }}
            autoFocus
            multiline
            label="New entry"
            error={inputValue.length <= 0 && isFocus}
            helperText={inputValue.length <= 0 && isFocus && 'Enter a value'}
            value={inputValue}
            onChange={handleChangeTextField}
            onBlur={() => setIsFocus(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="text"
              color="primary"
              onClick={() => handleClickIsAddingEntry(false)}
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              endIcon={<SaveEntryIcon />}
              variant="outlined"
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddEntryIcon />}
          fullWidth
          variant="outlined"
          onClick={() => handleClickIsAddingEntry(true)}
        >
          Add task
        </Button>
      )}
    </Box>
  );
};
