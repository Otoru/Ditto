import {
  Box,
  Icon,
  Flex,
  BreadcrumbLink,
  BreadcrumbItem,
  useColorModeValue,
  Breadcrumb as DefaultBreadcrumb,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

import { useDashboard } from 'lib/dashboard'
import { Chevron } from 'lib/icons'

interface Item {
  href: string
  label: string
  isCurrentPage: boolean
}

interface Props {
  items: Item[]
}

const Breadcrumb: React.FC<Props> = ({ items }) => {
  const { color } = useDashboard()
  const primary = useColorModeValue(`${color}.600`, `${color}.200`)

  return (
    <Box w={'100%'}>
      <Flex justify={'space-between'} align={'center'} px={4}>
        <DefaultBreadcrumb
          color={primary}
          separator={<Icon display={'flex'} h={4} w={4} as={Chevron} />}
        >
          {items.map(({ href, label, isCurrentPage }, index) => (
            <BreadcrumbItem key={index} isCurrentPage={isCurrentPage}>
              <NextLink href={href} passHref>
                <BreadcrumbLink>{label}</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
          ))}
        </DefaultBreadcrumb>
      </Flex>
    </Box>
  )
}

export default Breadcrumb
