import React, {
  createContext,
  useContext,
  useState,
  useRef,
  RefObject,
} from 'react'
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
  ref?: RefObject<HTMLButtonElement>
}

interface Sidebar {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}

export type colors =
  | 'blue'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'purple'
  | 'pink'

interface Context {
  drawer: Drawer
  color: colors
  sidebar: Sidebar
  breadcrumb: Breadcrumb[]
  setColor: React.Dispatch<React.SetStateAction<colors>>
  setBreadcrumb: React.Dispatch<React.SetStateAction<Breadcrumb[]>>
}

const defaultValues: Context = {
  breadcrumb: [],
  color: 'blue',
  setColor: () => ({}),
  setBreadcrumb: () => ({}),
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
}

interface Props {
  children: React.ReactNode
}

const context = createContext<Context>(defaultValues)

export const DashboardProvider: React.FC<Props> = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState<Breadcrumb[]>([])
  const [color, setColor] = useState<colors>('purple')

  const props = useDisclosure({ defaultIsOpen: true })
  const ref = useRef()

  const value = {
    color,
    setColor,
    breadcrumb,
    setBreadcrumb,
    drawer: useDisclosure(),
    sidebar: { ref, ...props },
  }

  return <context.Provider value={value}>{children}</context.Provider>
}

export const useDashboard = () => {
  const result = useContext(context)
  return result
}
