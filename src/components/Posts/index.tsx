import React, { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CardPost from "./CardPost";
import { api } from "@/services/api";

export type Post = {
  id: string
  title: string
  description: string
  published: boolean
  content: string
  thumb: string
}

export default function Posts(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>()

  const getPosts = useCallback(async () => {
    const { data } = await api.get('/api/posts')
    setPosts(data)
  }, []);
  
  useEffect(() => {
    getPosts()
  }, [getPosts])

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {posts!.map((item) => (
        <Grid key={Math.random()} item xs={4} sm={4} md={4}>
          <CardPost post={item} />
        </Grid>
      ))}
    </Grid>
  );
}
