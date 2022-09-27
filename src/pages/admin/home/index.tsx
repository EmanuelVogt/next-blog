import React from 'react'

import { GetServerSideProps, NextPage } from 'next'
import { AdminLayout } from '../../../components/AdminLayout'
import { withSSRAuth } from '../../../utils/withSSRAuth'

const Home: NextPage = () => {

  return (
   <h1>Home</h1>
  )
}
// @ts-ignore
Home.getLayout = (page: React.ReactElement): React.ReactElement => (
  <AdminLayout>{page}</AdminLayout>
);

export default Home

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
