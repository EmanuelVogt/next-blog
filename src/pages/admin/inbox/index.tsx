import React from 'react'

import { GetServerSideProps, NextPage } from 'next'
import { AdminLayout } from '../../../components/AdminLayout'
import { withSSRAuth } from '../../../utils/withSSRAuth'

const Inbox: NextPage = () => {

  return (
   <h1>Inbox</h1>
  )
}
// @ts-ignore
Inbox.getLayout = (page: React.ReactElement): React.ReactElement => (
  <AdminLayout>{page}</AdminLayout>
);

export default Inbox

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
