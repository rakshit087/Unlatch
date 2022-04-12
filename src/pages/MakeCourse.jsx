import { Box, Typography } from "@mui/material";
import { Navbar } from "../layouts/Navbar";
import { useEffect, useState } from "react";
import { FileServices } from "../utilities/file";

const MakeCourse = () => {
  const [buffer, setBuffer] = useState(null);
  return (
    <div>
      <Navbar />
      <Box sx={{ px: { xs: 1, md: 10, lg: 22 }, py: 10 }}>
        <input placeholder="Title of your course" style={{ outline: "none", border: "none", fontSize: 32 }} />
      </Box>
      <input
        type="file"
        id="myfile"
        name="myfile"
        accept=".mp4"
        onChange={(event) => {
          event.preventDefault();
          const file = event.target.files[0];
          const reader = new window.FileReader();
          reader.readAsArrayBuffer(file);
          reader.onloadend = () => {
            setBuffer(reader.result);
          };
        }}
      ></input>
      <button
        type="button"
        onClick={() => {
          console.log(buffer);
          FileServices.addFile(buffer);
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default MakeCourse;
