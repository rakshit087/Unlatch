import { Box } from "@mui/material";
import { Navbar } from "../layouts/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { WalletServices } from "../utilities/wallet";
const Courses = () => {
  const router = useRouter();
  useEffect(() => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
    } else {
      WalletServices.isConnected().then((con) => {
        if (!con) {
          router.push({
            pathname: "/",
          });
        }
      });
    }
  });
  return (
    <div>
      <Navbar />
      <Box sx={{ px: { xs: 1, md: 10, lg: 22 }, py: 10 }}>
        <p>This is the Courses page</p>
      </Box>
    </div>
  );
};

export default Courses;
