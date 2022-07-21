import {
  Box,
  Text,
  Icon,
  Flex,
  Link,
  HStack,
  VStack,
  Avatar,
  Tooltip,
  Heading,
  BoxProps,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import React from 'react'

import { useDashboard } from 'lib/dashboard'
import { ExternalLink } from 'lib/icons'

interface Props extends BoxProps {
  withDetails: boolean
}

const Profile: React.FC<Props> = ({ withDetails, ...props }) => {
  const { drawer } = useDashboard()
  const { user } = useUser()
  const router = useRouter()

  const onClick = () => {
    router.push('/me')
    drawer.onClose()
  }

  const primary = useColorModeValue('blue.600', 'blue.200')
  const gray = useColorModeValue('gray.400', 'gray.500')

  const avatar = user?.picture ? user?.picture : undefined
  return (
    <Box {...props}>
      <Flex justify={'space-between'} align={'center'}>
        <HStack spacing={withDetails ? 4 : 0}>
          <Avatar src={avatar} size={'sm'} />
          {withDetails && (
            <VStack spacing={0} align={'start'}>
              <Heading color={primary} size={'sm'}>
                {user?.name}
              </Heading>
              <Text fontSize={'xs'} color={gray}>
                {user?.email}
              </Text>
            </VStack>
          )}
        </HStack>
        {withDetails && (
          <Tooltip label={'About me'}>
            <IconButton
              as={Link}
              size={'sm'}
              rounded={'full'}
              variant={'ghost'}
              onClick={onClick}
              aria-label={'About me'}
              icon={<Icon as={ExternalLink} />}
            />
          </Tooltip>
        )}
      </Flex>
    </Box>
  )
}

export default Profile
