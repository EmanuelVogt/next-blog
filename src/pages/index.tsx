import type { GetServerSideProps, NextPage } from 'next'
import { withSSRGuest } from '../utils/withSSRGuest'

const Home: NextPage = () => {
  return (
    <h1>a</h1>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})