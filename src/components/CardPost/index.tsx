import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/router";

type Post = {
  id: number
  title: string;
  thumb: string;
  description: string;
  date: string;
};

type Props = {
  post: Post;
};

export default function CardPost({ post }: Props) {
  const { push } = useRouter();
  const handleNavigate = (id: number) => {
    push(`/post/${id}`);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => handleNavigate(post.id)}>
        <CardHeader title={post.title} subheader={post.date} />
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
