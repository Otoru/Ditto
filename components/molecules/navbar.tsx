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
import React from 'react'

import { Sun, Moon, LogOut, Menu } from 'lib/icons'
import { Breadcrumb } from 'components/atoms'
import { useDashboard } from 'lib/dashboard'

const Navbar: React.FC<BoxProps> = (props) => {
  const background = useColorModeValue('gray.100', 'gray.900')
  const { colorMode, toggleColorMode } = useColorMode()

  const { breadcrumb, drawer } = useDashboard()

  const label = colorMode === 'light' ? 'Turn off lights' : 'Turn on lights'

  return (
    <Box as={'nav'} {...props} bg={background} rounded={'md'} shadow={'lg'}>
      <Flex py={2} px={4} justify={'space-between'} align={'center'}>
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
        <HStack>
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
          <Tooltip label={'Logout'}>
            <IconButton
              as={'a'}
              variant={'ghost'}
              aria-label={'Logout'}
              href={'/api/auth/logout'}
              icon={<Icon as={LogOut} />}
            />
          </Tooltip>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar
