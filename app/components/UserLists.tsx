import { User } from '@prisma/client'
import React, { FC } from 'react'
import { UserBox } from './UserBox'

interface UserListsProps{
    items:User[]
}

export const UserLists:FC<UserListsProps> = ({items}) => {
  return (
      <aside
      className='
      fixed
      inset-y-0
      pb-20
      lg:pb-0
      lg:left-20
      lg:w-80
    bg-white
      lg:block
      overflow-y-auto
      border-r
      w-full
      border-gray-200
      '>
      <div className='px-2'>
        <div className='flex-col'>
            <div className=' text-2xl font-bold text-neutral-800 py-4'>
                People
            </div>
        </div>
        {
            items.map((item)=>(
                <UserBox key={item.id} item={item!}/>
            ))
        }
      </div>
    </aside>
  )
}
