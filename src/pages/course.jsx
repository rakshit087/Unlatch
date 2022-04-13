import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ContractService } from "../utilities/contract";
import { WalletServices } from "../utilities/wallet";
import { Navbar } from "../layouts/Navbar";
import { Box, Typography } from "@mui/material";
import ReactPlayer from "react-player";

const Course = () => {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
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
            console.log(v);
            setVideos(v);
            setCurrentlyPlaying(v[0]);
          });
        }
      });
    }
  }, [router.isReady]);
  if (currentlyPlaying === null) {
    return (
      <div>
        <Navbar />
        <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
          <Typography variant="h4">Loading...</Typography>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <Box sx={{ px: { xs: 1, md: 10, lg: 22 }, py: 5 }}>
          <Box>
            <Typography variant="h4" marginBottom={8} noWrap>
              {currentlyPlaying.name}
            </Typography>
            <ReactPlayer url={"https://crustwebsites.net/ipfs/" + currentlyPlaying.cid} controls />
          </Box>
        </Box>
      </div>
    );
  }
};

export default Course;
