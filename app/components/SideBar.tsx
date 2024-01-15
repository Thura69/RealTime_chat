import React, { FC, ReactNode } from 'react'
import { DesktopSideBar } from './sidebar/DesktopSideBar'
import { MobileFooter } from './sidebar/MobileFooter'
import { getCurrentUser } from '../actions/getCurrentUser'
import { User } from '@prisma/client'
import getSessionEmail from '../actions/session'
import { getServerSession } from 'next-auth'


interface SideBarProps{
    children:ReactNode
}

export const SideBar: FC<SideBarProps> = async ({ children }) => {
    const currentUser = await getCurrentUser();




  return (
      <div className='h-full'>
          <DesktopSideBar currentUser={currentUser!} />
          <MobileFooter/>
          <main className='lg:pl-20 h-full'>
              {children}
          </main>
      </div>
  )
}
