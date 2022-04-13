import { Box, TextareaAutosize, Typography } from "@mui/material";
import { Navbar } from "../layouts/Navbar";
import { useEffect, useState } from "react";
import { UploadFile } from "../components/UploadFile";
import { WalletServices } from "../utilities/wallet";

const MakeCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
  }, []);
  return (
    <div>
      <Navbar />
      <Box sx={{ px: { xs: 1, md: 10, lg: 22 }, py: 10, display: "flex", flexDirection: "column" }}>
        <input
          placeholder="Title of your course"
          style={{ outline: "none", border: "none", fontSize: 32, marginBottom: "3rem" }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextareaAutosize
          placeholder="Description of your course"
          style={{ outline: "none", border: "none", fontSize: 24, minHeight: "16rem", resize: "none" }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <UploadFile title={title} description={description} />
        </Box>
      </Box>
    </div>
  );
};

export default MakeCourse;
