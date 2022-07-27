import {
  Box,
  Hide,
  Show,
  Flex,
  Icon,
  HStack,
  Tooltip,
  BoxProps,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

import { Sun, Moon, User, Menu } from 'lib/icons'
import { Breadcrumb } from 'components/atoms'
import { useDashboard } from 'lib/dashboard'

const Navbar: React.FC<BoxProps> = (props) => {
  const background = useColorModeValue('gray.100', 'gray.900')
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()

  const { breadcrumb, drawer } = useDashboard()

  const label = colorMode === 'light' ? 'Turn off lights' : 'Turn on lights'

  const onClick = () => {
    router.push('/me')
    drawer.onClose()
  }

  return (
    <Box as={'nav'} {...props} bg={background} rounded={'md'} shadow={'lg'}>
      <Flex p={2} justify={'space-between'} align={'center'}>
        <Show above={'md'}>
          <Breadcrumb items={breadcrumb} />
        </Show>
        <Hide above={'md'}>
          <IconButton
            ref={drawer.ref}
            variant={'ghost'}
            onClick={drawer.onToggle}
            icon={<Icon as={Menu} />}
            aria-label={'Toogle menu'}
          />
        </Hide>
        <HStack spacing={2}>
          <Tooltip label={'About me'}>
            <IconButton
              onClick={onClick}
              variant={'ghost'}
              aria-label={'About me'}
              icon={<Icon as={User} />}
            />
          </Tooltip>
          <Tooltip label={label}>
            <IconButton
              variant={'ghost'}
              aria-label={label}
              onClick={toggleColorMode}
              icon={
                colorMode === 'light' ? <Icon as={Moon} /> : <Icon as={Sun} />
              }
            />
          </Tooltip>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar
