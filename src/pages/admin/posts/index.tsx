import React from "react";

import { GetServerSideProps, NextPage } from "next";
import { AdminLayout } from "@components/AdminLayout";
import { withSSRAuth } from "@utils/withSSRAuth";
import { AdminPosts } from "@components/Admin/Posts";

const Posts: NextPage = () => {
  return <AdminPosts />;
};
// @ts-ignore
Posts.getLayout = (page: React.ReactElement): React.ReactElement => (
  <AdminLayout>{page}</AdminLayout>
);

export default Posts;

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
