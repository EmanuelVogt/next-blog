import type { GetServerSideProps, NextPage } from "next";
import { ReactElement, useCallback, useEffect, useState } from "react";
import HomeLayout from "@/components/HomeLayout";

import { withSSRGuest } from "@/utils/withSSRGuest";
import { Post } from "@/components/Posts";
import { api } from "@/services/api";

const Post: NextPage = () => {
  const [post, setPost] = useState<Post>()

  const getPosts = useCallback(async () => {
    const { data } = await api.get('/api/post')
    setPost(data)
  }, []);
  
  useEffect(() => {
    getPosts()
  }, [getPosts])
  
  return (
    <h1> aaawad</h1>
  );
};

// @ts-ignore
Post.getLayout = (page: ReactElement): ReactElement => (
  <HomeLayout>
    {page}
  </HomeLayout>
)

export default Post;

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
