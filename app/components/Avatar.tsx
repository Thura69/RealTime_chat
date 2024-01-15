import { User } from '@prisma/client'
import Image from 'next/image'
import React, { FC } from 'react'
import PlaceHolder from '../../public/assets/placeholder.jpg';
import activeUserList from '../hooks/useActiveList';

interface AvatarProps {
    user:User
}

export const Avatar: FC<AvatarProps> = ({ user }) => {

  const { members } = activeUserList();
  const isActive = members.indexOf(user!.email!) !== -1;

  return (
    <div className='relative'>
          <div
              className='
            relative
             inline-block
             rounded-full
             h-9
             w-9
             overflow-hidden
             md:h-10
             md:w-10
              '
          >
         <Image  alt='avater' fill  src={user?.image || PlaceHolder}/>
      </div>
      {
        isActive && (
   <span
              className='
             absolute
             block
             rounded-full
             bg-green-500
             ring-2
             ring-white
             top-0
             right-0
             h-2
             w-2
             md:h-3
             md:w-3
          '></span>
        )
      }
       
    </div>
  )
}
