'use client'
import React, { FC, useState } from 'react'
import useRoutes from '../../hooks/useRoutes'
import { DeskTopItem } from './DeskTopItem';
import { User } from '@prisma/client';
import { Avatar } from '../Avatar';
import { SettingModal } from './SettingModal';

interface DeskTopSideBarProps{
    currentUser?:User
}

export const DesktopSideBar:FC<DeskTopSideBarProps> = ({currentUser}) => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);


  return (
      <>
      {
        <SettingModal isOpen={isOpen} onClose={()=>setIsOpen(false)} currentUser={currentUser!}></SettingModal>
      }
        <div
          className='
          hidden
          lg:fixed
          lg:inset-y-0
          lg:left-0
          lg:z-40
          lg:w-30
          xl:px-2
          lg:overflow-y-auto
          lg:bg-white
          lg:border-r-[1px]
          lg:pb-4
          lg:flex
          lg:flex-col
           justify-between

          '>
          <nav
           className='
            mt-4
            flex-col
            flex
            justify-between
           '
          >
              <ul role='list'
                  className='
                  flex
                  flex-col
                  justify-center
                  items-center
                  space-y-1
                  '
              >
              {
                routes.map((item)=>(
                    <DeskTopItem
                        key={item.label}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        onClick={item.onClick}
                        active={item.active}
                    />
                ))
              }
              </ul>   
          </nav>
          <nav className='
          mt-4
          flex
          flex-col
          justify-between
          items-start
          '>
              <div
                  onClick={() => setIsOpen(true)}
                  className='
                   cursor-pointer
                   hover:opacity-75
                   transition
                  '
              >
                  <Avatar user={currentUser!} />
              </div>  
          </nav>
    </div>
      </>
  )
}
