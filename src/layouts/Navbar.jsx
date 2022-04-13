import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserAvatar from "../components/UserAvatar";
export const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", px: { xs: 1, md: 10, lg: 20 }, pt: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>
        {/*Logo*/}
        <Box>
          <Typography variant="h5" noWrap>
            UNLATCH
          </Typography>
        </Box>
        {/* Login, Signup and Links */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link href="/courses" sx={{ textDecoration: "none", mr: 4 }} variant="body2" color={"textPrimary"}>
              Courses
            </Link>
            <Link href="/makecourse" sx={{ textDecoration: "none", mr: 4 }} variant="body2" color={"textPrimary"}>
              Add Your Course
            </Link>
            <Link href="/" sx={{ textDecoration: "none", mr: 4 }} variant="body2" color={"textPrimary"}>
              How it Works
            </Link>
          </Box>
          <UserAvatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
