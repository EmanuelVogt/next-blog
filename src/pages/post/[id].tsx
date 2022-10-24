import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ReactElement, useCallback, useEffect, useState } from "react";
import HomeLayout from "@/components/HomeLayout";
import { withSSRGuest } from "@/utils/withSSRGuest";
import { Post } from "@/components/Posts";
import { api } from "@/services/api";

const Post: NextPage = () => {
  const [post, setPost] = useState<Post>();
  const [postId, setPostId] = useState<any>()
  const { isReady, query } = useRouter();
  const [content, setContent] = useState('')
  
  const getPosts = useCallback(async () => {
    const { data } = await api.get(`/api/post/${postId}`);
    data.content && setContent(Buffer.from(data.content, 'base64').toString('utf-8'))
    setPost(data);
  }, [postId]);

  useEffect(() => {
    if(isReady) {
      setPostId(query.id)
      getPosts();
    }
  }, [getPosts, isReady, query]);

  return (
    <div dangerouslySetInnerHTML={{__html: content}} />
  );
};

// @ts-ignore
Post.getLayout = (page: ReactElement): ReactElement => (
  <HomeLayout>{page}</HomeLayout>
);

export default Post;

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
