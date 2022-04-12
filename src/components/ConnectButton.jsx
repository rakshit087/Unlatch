import { Button } from "@mui/material";
import { WalletServices } from "../utilities/wallet";
const ConnectButton = () => {
  return (
    <Button
      color="primary"
      variant="contained"
      size="large"
      sx={{ width: "16rem", zIndex: 100 }}
      onClick={() => {
        WalletServices.connect().then((con) => {
          if (con) {
            window.location.href = "/courses";
          }
        });
      }}
    >
      Connect ⚡
    </Button>
  );
};

export default ConnectButton;
