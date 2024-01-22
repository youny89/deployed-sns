
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/sidebar/sidebar'
import Followbar from '@/components/followbar/followbar'
import ModalProvider from '@/providers/modal-provider'
import AuthProvider from '@/providers/auth-provider'
import ToasterProvder from '@/providers/toast-provder'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider />
          <ToasterProvder />
          
          <div className='h-screen bg-black'>
            <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
              <div className='grid grid-cols-4 h-full'>
                <Sidebar />
                <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>
                  {children}
                </div>
                <Followbar />
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
