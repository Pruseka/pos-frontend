import { createContext, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

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
   openDrawer: () => void
   closeDrawer: () => void
   signIn: (token: string) => void
   signOut: () => void
}

const AuthContext = createContext<AuthContextInterface | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [openedDrawer, setOpenedDrawer] = useState(false)
   const [openedBurger, setOpenedBurger] = useState(false)
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

   const openDrawer = () => {
      setOpenedBurger(true)
      setOpenedDrawer(true)
   }

   const closeDrawer = () => {
      setOpenedBurger(false)
      setOpenedDrawer(false)
   }

   useEffect(() => {
      if (token.length > 0) {
         const user: User | null = jwtDecode(token)
         setUser(user)
         return
      }
      setUser(null)
   }, [token])

   const authCtx = { token, openedBurger, openedDrawer, openDrawer, closeDrawer, user, signIn, signOut }

   return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
   const context = useContext(AuthContext)
   if (context === null) {
      throw new Error('useAuth must be used within a AuthProvider')
   }
   return context
}
