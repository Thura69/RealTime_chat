'use client'
import { Avatar } from '@/app/components/Avatar'
import { AvatarGroup } from '@/app/components/AvatarGroup'
import { ProfileDrawer } from '@/app/components/ProfileDrawer'
import activeUserList from '@/app/hooks/useActiveList'
import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { FC, useMemo, useState } from 'react'
import {HiChevronLeft,HiDotsHorizontal} from 'react-icons/hi'

interface HeaderProps{
    conversation: Conversation & {
        user:User[]
    }
}

export const Header: FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { members } = activeUserList();

    const isActive = members.indexOf(otherUser?.email!) !== -1;

    
    const statusText = useMemo(() => {
        if (conversation.isGroup) {
           return `${conversation.user.length} members`
        } 


        return isActive ?'Active':"Offline"
        
    },[conversation,isActive])


  return (
      <>
          <ProfileDrawer
              data={conversation}
              isOpen={drawerOpen}
              onClose={() => setDrawerOpen(false)} />
        <div className='
       bg-white
       w-full
       flex
       border
       border-b-[1px]
       sm:px-4
       py-3
       px-4
       lg:px-6
        justify-between
         items-center
          shadow-sm
      '>
          <div className='flex gap-3 items-center'>
              <Link
                  className='lg:hidden block text-purple-500 hover:text-purple-600'
                  href={`/conversations`}>
                  <HiChevronLeft className={'h-6 w-6 '} />
                  </Link>
                  {
                      conversation.isGroup ? (
                      <AvatarGroup users={conversation.user}/>
                      ):<Avatar user={otherUser} />
                  }
              
              <div className='flex flex-col '>
                  <div >
                      {conversation.name || otherUser.name}
                  </div>
                  <div className='text-xs font-light  text-neutral-500'>
                     {statusText} 
                  </div>
              </div>
          </div>
          <HiDotsHorizontal  onClick={()=>{setDrawerOpen(true)}} className='text-purple-500 cursor-pointer hover:text-purple-600'/>
      </div>
      </>
  )
}
