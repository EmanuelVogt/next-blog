/* eslint-disable react/display-name */
import { Box, TextField, Button } from "@mui/material";

import { useState } from "react";
import { Editor } from "../Editor";
import { ThumbUpload } from "../ThumbUpload";

export const NewPost = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  console.log(value)
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
