import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ContractService } from "../utilities/contract";
import { WalletServices } from "../utilities/wallet";
import { Navbar } from "../layouts/Navbar";
import { Box, Card, Typography, Grid, CardContent } from "@mui/material";
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
        <Box sx={{ px: { xs: 1, md: 10, lg: 22 }, py: 10, alignItems: "flex-start" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <ReactPlayer
                width="100%"
                height="auto"
                style={{ display: "flex" }}
                url={"https://crustwebsites.net/ipfs/" + currentlyPlaying.cid}
                controls
              />
              <Typography variant="h5" marginY={2} noWrap>
                {currentlyPlaying.name}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card elevation={3} sx={{ border: 1, height: "100%", px: 2 }}>
                <CardContent>
                  <Typography variant="h6" marginBottom={8} noWrap>
                    Continue Course
                  </Typography>
                  {videos.length == 1 ? (
                     <Card>
                     <CardContent>
                     <Typography variant="body2">You have reached the end of the course.</Typography>
                     </CardContent>
                   </Card>
                   
                  ) : (
                    videos
                      .filter((video, index) => index !== currentlyPlaying.id)
                      .map((video, index) => (
                        <Card>
                          <CardContent>
                            <Typography variant="body2">{video.name}</Typography>
                          </CardContent>
                        </Card>
                      ))
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
};

export default Course;
