import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
const UserAvatar = () => {
  return (
    <Avatar sx={{ bgcolor: "primary.main" }}>
      <PersonIcon />
    </Avatar>
  );
};

export default UserAvatar;
