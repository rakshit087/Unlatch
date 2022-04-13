import { Box, Card, Typography, Grid, CardContent } from "@mui/material";
import { Navbar } from "../layouts/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { WalletServices } from "../utilities/wallet";
import { ContractService } from "../utilities/contract";
const Courses = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
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
          ContractService.getCourses().then((courses) => {
            //filter courses with empty title
            setCourses(courses.filter((course) => course.title !== ""));
          });
        }
      });
    }
  });
  return (
    <div>
      <Navbar />
      <Box sx={{ px: { xs: 1, md: 10, lg: 22 }, py: 10 }}>
        <Typography variant="h4" marginBottom={8} noWrap>
          Latest Courses
        </Typography>
        <Grid container columnSpacing={6} rowSpacing={3}>
          {courses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  minHeight: "12rem",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  marginBottom: "1rem",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={() => {
                  router.push({
                    pathname: "/course",
                    query: {
                      id: course.id,
                    },
                  });
                }}
              >
                <Box bgcolor="primary.main" px={2} py={1}>
                  <Typography variant="h6" fontWeight="bold" color="white" noWrap>
                    {course.title}
                  </Typography>
                </Box>
                <CardContent>
                  <Typography variant="body2">{course.description.slice(0, 100)}...</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Courses;
