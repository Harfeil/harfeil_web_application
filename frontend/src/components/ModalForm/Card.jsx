import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

export default function FormDialog({ buttonName, fields = [], onSubmit, initialValues = {}, open: controlledOpen, setOpen }) {
  const [open, setLocalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined && setOpen;

  const handleClickOpen = () => isControlled ? setOpen(true) : setLocalOpen(true);
  const handleClose = () => isControlled ? setOpen(false) : setLocalOpen(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    if (onSubmit) onSubmit(formJson);
    handleClose();
  };

  const dialogOpen = isControlled ? controlledOpen : open;

  return (
    <React.Fragment>
      {!isControlled && (
        <Button variant="outlined" onClick={handleClickOpen}>
          {buttonName}
        </Button>
      )}
      <Dialog open={dialogOpen} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 500, m: 1 } }}>
        <DialogTitle>{buttonName}</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            {fields.map((field) =>
              field.type === 'select' ? (
                <TextField
                  key={field.key}
                  select
                  margin="dense"
                  id={field.key}
                  name={field.key}
                  label={field.label}
                  fullWidth
                  required={field.required}
                  defaultValue={initialValues[field.key] ?? field.defaultValue ?? ''}
                  variant="standard"
                >
                  {field.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  key={field.key}
                  margin="dense"
                  id={field.key}
                  name={field.key}
                  label={field.label}
                  type={field.type || 'text'}
                  fullWidth
                  required={field.required}
                  defaultValue={initialValues[field.key] ?? field.defaultValue ?? ''}
                  variant="standard"
                />
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{buttonName}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

