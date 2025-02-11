import { useModalStore } from "@common/hooks/useModalStore";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

export const Modal = () => {
  const { open, handleClose, title, modalComponent } = useModalStore(
    (state) => state
  );
  return (
    <Dialog
      fullWidth={true}
      onClose={handleClose}
      open={open}
      slotProps={{
        root: {
          style: {
            backdropFilter: "blur(15px)",
          },
        },
      }}
    >
      <DialogTitle fontWeight={900}>{title}</DialogTitle>
      <br />
      {modalComponent}
    </Dialog>
  );
};
