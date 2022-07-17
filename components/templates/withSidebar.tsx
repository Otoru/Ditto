import { Box, Flex, Container } from '@chakra-ui/react'
import React from 'react'

import { Navbar } from 'components/molecules'
import { Footer } from 'components/atoms'

interface Props {
  children: React.ReactNode
  sidebar: React.ReactNode
}

const WithSidebar: React.FC<Props> = ({ children, sidebar }) => {
  return (
    <Container px={0} h={'100vh'} size={'max'}>
      <Flex py={4} px={[4, 2]} h={'100%'}>
        <Box as={'aside'}>{sidebar}</Box>
        <Flex w={'100%'} direction={'column'}>
          <Navbar mx={[0, 4]} />
          <Box as={'main'} flexGrow={'1'}>
            {children}
          </Box>
          <Footer mx={[0, 4]} />
        </Flex>
      </Flex>
    </Container>
  )
}

export default WithSidebar
