import React, { createContext, useContext, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'

interface Breadcrumb {
  href: string
  label: string
  isCurrentPage: boolean
}

interface Drawer {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}

interface Sidebar {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}

interface Context {
  drawer: Drawer
  sidebar: Sidebar
  breadcrumb: Breadcrumb[]
  setBreadcrumb: React.Dispatch<React.SetStateAction<Breadcrumb[]>>
}

const defaultValues = {
  breadcrumb: [],
  drawer: {
    isOpen: false,
    onClose: () => undefined,
    onToggle: () => undefined,
  },
  sidebar: {
    isOpen: false,
    onClose: () => undefined,
    onToggle: () => undefined,
  },
  setBreadcrumb: () => ({}),
}

interface Props {
  children: React.ReactNode
}

const context = createContext<Context>(defaultValues)

export const DashboardProvider: React.FC<Props> = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState<Breadcrumb[]>([])

  const value = {
    breadcrumb,
    setBreadcrumb,
    drawer: useDisclosure(),
    sidebar: useDisclosure(),
  }

  return <context.Provider value={value}>{children}</context.Provider>
}

export const useDashboard = () => {
  const result = useContext(context)
  return result
}
