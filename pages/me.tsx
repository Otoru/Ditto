import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import type { NextPage } from 'next'
import Head from 'next/head'

import Profile from 'components/pages/me'

const Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>About me</title>
      </Head>
      <Profile />
    </div>
  )
}

export default Page

export const getServerSideProps = withPageAuthRequired()
