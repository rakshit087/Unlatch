import { Box, Typography } from "@mui/material";
import { Navbar } from "../layouts/Navbar";

export const MakeCourse = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ px: { xs: 1, md: 10, lg: 22 }, py: 10 }}>
        <input placeholder="Title of your course" style={{ outline: "none", border: "none", fontSize: 32 }} />
      </Box>
      <input type="file" id="myfile" name="myfile"></input>
    </>
  );
};
