import { Alert, Snakbar } from "@mui/material";

const MiniAlert = (props) => {
  const { message, severity } = props;
  const [open, setOpen] = useState(true);
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default MiniAlert;
