/* eslint-disable react/display-name */
import { AuthContext } from "@/contexts/AuthContext";
import { Box, TextField, Button } from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { Editor } from "../Editor";
import { ThumbUpload } from "../ThumbUpload";

export const NewPost = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    console.log(user)
  }, [])
  return (
    <Box
      sx={{
        m: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box />
        <Button variant="contained" sx={{ marginTop: 2 }}>
          Publicar Post
        </Button>
      </Box>
      <ThumbUpload setImageUrl={setImageUrl} imageUrl={imageUrl} />
      <TextField
        required
        fullWidth
        label="Title"
        id="fullWidth"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        required
        id="outlined-multiline-flexible"
        fullWidth
        label="Description"
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Editor setValue={setValue} />
    </Box>
  );
};
