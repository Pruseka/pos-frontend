import { createContext, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useDisclosure } from '@mantine/hooks'

type User = {
   userId: string
   name: string
   role: string
   iat: number
}

interface AuthContextInterface {
   token: string
   openedDrawer: boolean
   openedBurger: boolean
   user: User | null
   openNavigation: () => void
   closeNavigation: () => void
   signIn: (token: string) => void
   signOut: () => void
}

const AuthContext = createContext<AuthContextInterface | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [openedDrawer, { open: openDrawer, close: closeDrawer }] = useDisclosure(false)
   const [openedBurger, { open: openBurger, close: closeBurger }] = useDisclosure(false)
   const [token, setToken] = useState(localStorage.getItem('token') || '')
   const [user, setUser] = useState<User | null>(null)

   const setAccessToken = (token: string) => {
      localStorage.setItem('token', token)
      setToken(token)
   }

   const signIn = (token: string) => {
      setAccessToken(token)
      const user: User = jwtDecode(token)
      setUser(user)
   }

   const signOut = () => {
      setToken('')
      setUser(null)
      localStorage.removeItem('token')
   }

   const openNavigation = () => {
      openDrawer()
      openBurger()
   }

   const closeNavigation = () => {
      closeDrawer()
      closeBurger()
   }

   useEffect(() => {
      if (token.length > 0) {
         const user: User | null = jwtDecode(token)
         setUser(user)
         return
      }
      setUser(null)
   }, [token])

   const authCtx = {
      token,
      openedBurger,
      openedDrawer,
      openNavigation,
      closeNavigation,
      user,
      signIn,
      signOut,
   }

   return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
   const context = useContext(AuthContext)
   if (context === null) {
      throw new Error('useAuth must be used within a AuthProvider')
   }
   return context
}
