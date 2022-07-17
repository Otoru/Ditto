import React, { useEffect } from 'react'
import { Flex, VStack } from '@chakra-ui/react'

import { WithSidebar } from 'components/templates'
import { Sidebar } from 'components/molecules'
import { ColorPicker } from 'components/atoms'
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
        <Flex align={'center'} justify={'center'} h={'100%'} flexGrow={1}>
          <h1>Welcome to Ditto!</h1>
        </Flex>
        <VStack h={'100%'} w={'320px'}>
          <ColorPicker w={'100%'} />
        </VStack>
      </Flex>
    </WithSidebar>
  )
}

export default Home
