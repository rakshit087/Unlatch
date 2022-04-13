import { useEffect, useState } from "react";
import { Badge, Button, ButtonGroup, CircularProgress } from "@mui/material";
import { FileServices } from "../utilities/file";
import SendIcon from "@mui/icons-material/Send";
import MiniAlert from "./MiniAlert";

export const UploadFile = (props) => {
  const [rawFiles, setRawFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    if (files.length == rawFiles.length && files.length > 0) {
      setUploading(false);
      setRawFiles([]);
      setAlert({ open: true, message: "Uploaded successfully", severity: "success" });
    }
  }, [files]);

  return (
    <div style={{ textAlign: "center" }}>
      <MiniAlert message={alert.message} severity={alert.severity} open={alert.open} setAlert={setAlert} />
      <input
        type="file"
        id="myfile"
        name="myfile"
        accept=".mp4"
        disabled={uploading}
        onChange={(event) => {
          event.preventDefault();
          const file = event.target.files[0];
          setRawFiles([...rawFiles, file]);
        }}
        style={{ width: "0.1rem", height: "0.1rem", opacity: "0", zIndex: "-1", position: "absolute" }}
      />
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button disabled={uploading}>
          <label for="myfile">Add a Video</label>
        </Button>
        <Button
          size="large"
          onClick={() => {
            if (props.title == "") {
              setAlert({
                open: true,
                message: "Please enter a title",
                severity: "error",
              });
            } else if (props.description == "") {
              setAlert({
                open: true,
                message: "Please enter a description",
                severity: "error",
              });
            } else if (rawFiles.length == 0) {
              setAlert({
                open: true,
                message: "Please add a video",
                severity: "error",
              });
            } else {
              setUploading(true);
              rawFiles.forEach((file) => {
                const reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = async (event) => {
                  const fileBuffer = event.target.result;
                  const cid = await FileServices.addFile(fileBuffer);
                  setFiles([...files, { fileName: file.name, cid: cid }]);
                  console.log(file.name, cid);
                };
              });
            }
          }}
        >
          <Badge badgeContent={uploading ? files.length : rawFiles.length} color="secondary">
            {uploading ? <CircularProgress color="secondary"></CircularProgress> : <SendIcon color="action" />}
          </Badge>
        </Button>
      </ButtonGroup>
    </div>
  );
};
