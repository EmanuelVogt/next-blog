import type { GetServerSideProps, NextPage } from "next";
import { ReactElement } from "react";
import HomeLayout from "../components/HomeLayout";

import { withSSRGuest } from "../utils/withSSRGuest";
import { NextPageWithLayout } from "./_app";

const Home: NextPage = () => {
  return (
    <h1></h1>
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
