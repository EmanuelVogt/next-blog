/* eslint-disable react/display-name */
import { AuthContext } from "@/contexts/AuthContext";
import { api } from "@/services/api";
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

  const handleAddPost = async () => {
    const data = {
      title,
      description,
      content: Buffer.from(value).toString('base64'),
      published: true,
      thumb: imageUrl,
      user: user?.id,
    };
    await api.post("/api/post", data);
  };

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
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleAddPost}
        >
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
