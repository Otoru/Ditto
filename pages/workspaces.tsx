import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import type { NextPage } from 'next'
import Head from 'next/head'

import Workspaces from 'components/pages/workspaces'

const Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Workspaces</title>
      </Head>
      <Workspaces />
    </div>
  )
}

export default Page

export const getServerSideProps = withPageAuthRequired()
