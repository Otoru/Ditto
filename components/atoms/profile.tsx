import {
  Box,
  Text,
  Icon,
  Stack,
  HStack,
  VStack,
  Avatar,
  Tooltip,
  Heading,
  BoxProps,
  IconButton,
  SkeletonText,
  SkeletonCircle,
  useColorModeValue,
} from '@chakra-ui/react'
import { useUser } from '@auth0/nextjs-auth0'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { LogOut } from 'lib/icons'

interface Props extends BoxProps {
  withDetails: boolean
}

const Profile: React.FC<Props> = ({ withDetails, ...props }) => {
  const [avatarLoaded, setAvatarLoaded] = useState(false)
  const { user, isLoading } = useUser()

  const primary = useColorModeValue('blue.600', 'blue.200')
  const gray = useColorModeValue('gray.400', 'gray.500')

  const avatar = user?.picture ? user?.picture : undefined

  return (
    <Box {...props}>
      <Stack
        spacing={4}
        align={'center'}
        justify={'space-between'}
        direction={withDetails ? 'row' : 'column'}
      >
        <HStack spacing={withDetails ? 4 : 0}>
          <SkeletonCircle size={'32px'} isLoaded={avatarLoaded}>
            <Avatar
              size={'sm'}
              src={avatar}
              onLoad={() => setAvatarLoaded(true)}
            />
          </SkeletonCircle>
          <VStack
            spacing={0}
            as={motion.div}
            align={'start'}
            animate={
              withDetails ? { opacity: 1 } : { display: 'none', opacity: 0 }
            }
          >
            <SkeletonText noOfLines={2} spacing={2} isLoaded={!isLoading}>
              <Heading color={primary} size={'sm'}>
                {user ? user.name : 'loading'}
              </Heading>
              <Text fontSize={'xs'} color={gray}>
                {user ? user.email : 'loading'}
              </Text>
            </SkeletonText>
          </VStack>
        </HStack>
        <Tooltip label={'Logout'}>
          <IconButton
            as={'a'}
            variant={'ghost'}
            aria-label={'Logout'}
            href={'/api/auth/logout'}
            icon={<Icon as={LogOut} />}
          />
        </Tooltip>
      </Stack>
    </Box>
  )
}

export default Profile
