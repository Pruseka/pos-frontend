import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './routes'
import { AuthProvider } from './lib/contexts/auth-context'
import { NotificationsProvider } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { SWRConfig } from 'swr'
import { swrConfig } from './lib/constants/config'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
   <React.StrictMode>
      <SWRConfig value={swrConfig}>
         <MantineProvider withGlobalStyles withNormalizeCSS>
            <ModalsProvider>
               <NotificationsProvider>
                  <AuthProvider>
                     <RouterProvider router={router} />
                  </AuthProvider>
               </NotificationsProvider>
            </ModalsProvider>
         </MantineProvider>
      </SWRConfig>
   </React.StrictMode>
)
