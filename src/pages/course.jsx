import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ContractService } from "../utilities/contract";
import { WalletServices } from "../utilities/wallet";
import { Navbar } from "../layouts/Navbar";
import { Box, Typography } from "@mui/material";

const Course = () => {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState({
    name: "",
    cid: "",
  });
  useEffect(() => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
    } else {
      WalletServices.isConnected().then((con) => {
        if (!con) {
          router.push({
            pathname: "/",
          });
        } else {
          if (!router.isReady) return;
          const id = parseInt(router.query.id);
          console.log(id);
          ContractService.getVideos(id).then((v) => {
            setVideos(v);
            setCurrentlyPlaying(v[0]);
          });
        }
      });
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Box sx={{ px: { xs: 1, md: 10, lg: 22 }, py: 5 }}>
        <Box>
          <Typography variant="h4" marginBottom={8} noWrap>
            {currentlyPlaying.name}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Course;
