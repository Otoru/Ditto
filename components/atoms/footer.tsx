import { Box, Text, BoxProps, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Footer: React.FC<BoxProps> = (props) => {
  const gray = useColorModeValue('gray.400', 'gray.500')
  return (
    <Box as={'footer'} {...props}>
      <Text fontSize={'xs'} textAlign={'end'} color={gray}>
        © 2022 Vitoru LTDA. All rights reserved
      </Text>
    </Box>
  )
}

export default Footer
