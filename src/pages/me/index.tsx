import { GetServerSideProps, NextPage } from "next";
import { ReactElement } from "react";
import HomeLayout from "@/components/HomeLayout";
import ProfileHome from "@/components/ProfileHome";
import { withSSRGuest } from "@/utils/withSSRGuest";

const Me: NextPage = () => {
  return (
    <ProfileHome />
  );
}

// @ts-ignore
Me.getLayout = (page: ReactElement): ReactElement => (
  <HomeLayout>
    {page}
  </HomeLayout>
)

export default Me;


export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
