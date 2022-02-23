import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { WORDINGS } from 'common/constants';

interface ConfirmationDialogProps {
  id: string;
  open: boolean;
  title: string;
  confirmationMessage: string;
  onClose(): void;
  onConfirm(): void;
}

function ConfirmationDialog({
  id,
  open,
  title,
  confirmationMessage,
  onClose,
  onConfirm,
}: ConfirmationDialogProps) {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog
      id={id}
      open={open}
      maxWidth="xs"
      sx={{ '& .MuiDialog-paper': { width: '80%' } }}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{confirmationMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          {WORDINGS.CANCEL}
        </Button>
        <Button onClick={handleConfirm}>{WORDINGS.CONFIRM}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
