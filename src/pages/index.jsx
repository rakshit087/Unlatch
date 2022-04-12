import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ConnectButton from "../components/ConnectButton";
import { Space } from "../components/Space";
import { WalletServices } from "../utilities/wallet";

const LandingPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
    } else {
      WalletServices.isConnected().then((con) => {
        if (con) {
          router.push({
            pathname: "/courses",
          });
        }
      });
    }
  });
  return (
    <div>
      <Box sx={{ height: "100vh", width: "100%", display: "flex" }}>
        <Box
          sx={{
            height: "100vh",
            width: "60%",
            pl: "4rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom color={"primary"}>
            Welcome to
          </Typography>
          <Typography variant="h1" component="h1" gutterBottom color={"secondary"} fontWeight="bold">
            UNLATCH
          </Typography>
          <ConnectButton />
        </Box>
        <Box sx={{ height: "100vh", bgcolor: "#392C5D", flexGrow: "1" }}>
          <Space />
        </Box>
      </Box>
    </div>
  );
};

export default LandingPage;
