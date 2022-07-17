import { Flex, Container } from '@chakra-ui/react'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Default: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Flex p={[4, 2]} direction={'column'} h={'100vh'} w={'100vw'}>
        <Container as={'main'} flexGrow={'1'} px={0} size={'lg'}>
          {children}
        </Container>
      </Flex>
    </div>
  )
}

export default Default
