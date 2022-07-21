import React, { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'

import { WithSidebar } from 'components/templates'
import { Sidebar } from 'components/molecules'
import { useDashboard } from 'lib/dashboard'

const Home: React.FC = () => {
  const { setBreadcrumb } = useDashboard()

  useEffect(() => {
    setBreadcrumb([
      {
        href: '/',
        label: 'Dashboard',
        isCurrentPage: false,
      },
      {
        href: '/me',
        label: 'About me',
        isCurrentPage: true,
      },
    ])
  }, [setBreadcrumb])

  return (
    <WithSidebar sidebar={<Sidebar />}>
      <Flex p={4} align={'center'} justify={'center'} h={'100%'} w={'100%'}>
        <h1>Welcome to Ditto!</h1>
      </Flex>
    </WithSidebar>
  )
}

export default Home
