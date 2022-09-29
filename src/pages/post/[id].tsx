import type { GetServerSideProps, NextPage } from "next";
import { ReactElement } from "react";
import HomeLayout from "@components/HomeLayout";

import { withSSRGuest } from "@utils/withSSRGuest";

const Post: NextPage = () => {
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
