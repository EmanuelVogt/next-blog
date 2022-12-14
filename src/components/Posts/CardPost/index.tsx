import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import { Post } from "..";

type Props = {
  post: Post;
};

export default function CardPost({ post }: Props) {
  const { push } = useRouter();
  const handleNavigate = (id: string) => {
    push(`/post/${id}`);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => handleNavigate(post.id)}>
        <Typography  overflow="hidden" textOverflow="ellipsis">
          {post.title}
        </Typography>
        <CardMedia
          component="img"
          height="194"
          image={post.thumb}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
