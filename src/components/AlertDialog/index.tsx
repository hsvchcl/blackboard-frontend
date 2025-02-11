import { useAlertDialogStore } from "@common/hooks/useAlertDialogStore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const AlertDialog = () => {
  const { setOpen, open, actionComponent } = useAlertDialogStore(
    (state) => state
  );
  const handleClose = () => {
    setOpen(false, <></>);
  };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      {actionComponent && <DialogActions>{actionComponent}</DialogActions>}
    </Dialog>
  );
};
