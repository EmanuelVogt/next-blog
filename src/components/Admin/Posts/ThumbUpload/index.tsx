import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

type Props = {
  setImageUrl: any;
  imageUrl: string | null
};

export function ThumbUpload({ setImageUrl, imageUrl }: Props): JSX.Element {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);
  const [requestController, setRequestController] = useState<AbortController>(
    new AbortController()
  );
  const resetFileValue = (e: React.MouseEvent) => {
    
    (e.target as HTMLInputElement).value = null!;
  };

  const updateUploadProgresss = (event: any) => {
    const progress = Math.round((event.loaded * 100) / event.total);
    setuploadProgress(progress);
  };

  const handleFileChange = (e: any) => {
    const currentFile = e.target.files[0];
    if (!currentFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("arquivo", currentFile);
    formData.append("s3Path", `teams/awopjawd0daw/avatar`);

    axios
      .post("/api/upload", formData, {
        onUploadProgress: updateUploadProgresss,
        signal: requestController.signal,
      })
      .then(({ data }) => {
        setImageUrl(data.url);
      })
      .catch((_error) => {})
      .finally(() => setUploading(false));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          minWidth: 300,
          width: "100%",
        }}
      >
        <Box>
          <p>Thumb:</p>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <Stack direction="row" spacing={2}>
              {uploading ? (
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress
                    value={uploadProgress}
                    variant="determinate"
                  />
                </Box>
              ) : (
                <Avatar src={imageUrl!} sx={{ width: 200, height: 200 }} />
              )}
            </Stack>

            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileChange}
              onClick={resetFileValue}
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
