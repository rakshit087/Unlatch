import { Alert, Snackbar } from "@mui/material";
const MiniAlert = (props) => {
  const { message, severity } = props;
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={2000}
      onClose={() => {
        props.setAlert({ open: false, message: "", severity: "error" });
      }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default MiniAlert;
