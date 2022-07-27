import {
  Box,
  Icon,
  Flex,
  Show,
  Link,
  Drawer,
  VStack,
  Button,
  Tooltip,
  Divider,
  StackProps,
  IconButton,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import React from 'react'

import { Left, Right, Home, Workspaces } from 'lib/icons'
import { Brand, Profile } from 'components/atoms'
import { useDashboard } from 'lib/dashboard'

interface Item {
  icon: React.ReactElement
  label: string
  href: string
}

interface Props extends StackProps {
  withDetails: boolean
  items: Item[]
}

const Items: React.FC<Props> = ({ withDetails, items, ...props }) => {
  const { drawer } = useDashboard()
  const router = useRouter()

  const onClick = (href: string) => {
    return () => {
      router.push(href)
      drawer.onClose()
    }
  }

  return (
    <VStack spacing={2} {...props}>
      {items.map(({ icon, label, href }) => {
        if (withDetails) {
          return (
            <Button
              as={Link}
              w={'100%'}
              key={href}
              leftIcon={icon}
              variant={'ghost'}
              onClick={onClick(href)}
              justifyContent={'start'}
            >
              {label}
            </Button>
          )
        } else {
          return (
            <Tooltip key={href} label={label}>
              <IconButton
                as={Link}
                key={href}
                icon={icon}
                variant={'ghost'}
                aria-label={label}
                onClick={onClick(href)}
              />
            </Tooltip>
          )
        }
      })}
    </VStack>
  )
}

const Sidebar: React.FC = () => {
  const background = useColorModeValue('gray.100', 'gray.900')

  const { drawer, sidebar } = useDashboard()

  const menu = [
    { icon: <Icon as={Home} />, label: 'Home', href: '/' },
    {
      icon: <Icon as={Workspaces} />,
      label: 'Workspaces',
      href: '/workspaces',
    },
  ]
  return (
    <>
      <Show above={'md'}>
        <motion.div
          layout
          hidden={false}
          initial={sidebar.isOpen}
          transition={{ type: 'tween' }}
          animate={{ width: sidebar.isOpen ? 280 : 64 }}
          style={{
            width: '280px',
            height: '100%',
          }}
        >
          <Flex
            h={'100%'}
            shadow={'lg'}
            rounded={'md'}
            align={'start'}
            bg={background}
            direction={'column'}
            justify={'space-between'}
          >
            <Box w={'100%'}>
              <Flex
                p={4}
                w={'100%'}
                align={'center'}
                justify={sidebar.isOpen ? 'space-between' : 'center'}
              >
                <motion.div
                  animate={
                    sidebar.isOpen
                      ? { opacity: 1 }
                      : { display: 'none', opacity: 0 }
                  }
                >
                  <Brand />
                </motion.div>
                <IconButton
                  variant={'ghost'}
                  onClick={sidebar.onToggle}
                  aria-label={'Toogle navbar state'}
                  icon={<Icon as={sidebar.isOpen ? Left : Right} />}
                />
              </Flex>
              <Items
                p={4}
                w={'100%'}
                items={menu}
                withDetails={sidebar.isOpen}
              />
            </Box>
            <Box w={'100%'}>
              <Divider />
              <Profile p={4} withDetails={sidebar.isOpen} />
            </Box>
          </Flex>
        </motion.div>
      </Show>
      <Drawer
        placement={'left'}
        isOpen={drawer.isOpen}
        onClose={drawer.onToggle}
        finalFocusRef={drawer.ref}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Brand />
          </DrawerHeader>
          <DrawerBody px={0}>
            <Items p={4} w={'100%'} items={menu} withDetails={true} />
          </DrawerBody>
          <Divider />
          <DrawerFooter w={'100%'}>
            <Profile w={'100%'} withDetails />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Sidebar
