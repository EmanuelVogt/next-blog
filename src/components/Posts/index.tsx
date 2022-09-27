import * as React from "react";
import Grid from "@mui/material/Grid";
import CardPost from "./CardPost";

const posts = [
  {
    id: 1,
    title: "aaaa",
    date: "aaaaaaa",
    description: "aaaaaaaa",
    thumb:
      "https://assets.thehansindia.com/h-upload/2021/07/31/1092805-tech.jpg",
  },
  {
    id: 2,
    title: "aaaa",
    date: "aaaaaaa",
    description: "aaaaaaaa",
    thumb:
      "https://assets.thehansindia.com/h-upload/2021/07/31/1092805-tech.jpg",
  },
  {
    id: 3,
    title: "aaaa",
    date: "aaaaaaa",
    description: "aaaaaaaa",
    thumb:
      "https://assets.thehansindia.com/h-upload/2021/07/31/1092805-tech.jpg",
  },
  {
    id: 4,
    title: "aaaa",
    date: "aaaaaaa",
    description: "aaaaaaaa",
    thumb:
      "https://assets.thehansindia.com/h-upload/2021/07/31/1092805-tech.jpg",
  },
];

export default function Posts(): JSX.Element {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {posts.map((item) => (
        <Grid key={Math.random()} item xs={4} sm={4} md={4}>
          <CardPost post={item} />
        </Grid>
      ))}
    </Grid>
  );
}
