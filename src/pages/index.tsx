import type { GetServerSideProps, NextPage } from "next";
import { ReactElement } from "react";
import HomeLayout from "@components/HomeLayout";
import Posts from "@components/Posts";

import { withSSRGuest } from "@utils/withSSRGuest";

const Home: NextPage = () => {
  return (
    <Posts />
  );
};
// @ts-ignore
Home.getLayout = (page: ReactElement): ReactElement => (
  <HomeLayout>
    {page}
  </HomeLayout>
)

export default Home;

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
