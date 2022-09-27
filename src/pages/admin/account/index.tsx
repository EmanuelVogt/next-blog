import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { AdminLayout } from '../../../components/AdminLayout'
import { withSSRAuth } from '../../../utils/withSSRAuth'
import { AdminAccount } from '../../../components/Admin/Account'

const Account: NextPage = () => {
  return <AdminAccount />
}
// @ts-ignore
Account.getLayout = (page: React.ReactElement): React.ReactElement => (
  <AdminLayout>{page}</AdminLayout>
);

export default Account

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
