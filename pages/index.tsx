import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import type { NextPage } from 'next'
import Head from 'next/head'

import Home from 'components/pages/home'

const Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Ditto</title>
      </Head>
      <Home />
    </div>
  )
}

export default Page

export const getServerSideProps = withPageAuthRequired()
