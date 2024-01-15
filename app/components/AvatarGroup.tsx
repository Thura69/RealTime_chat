import { User } from '@prisma/client'
import Image from 'next/image';
import React, { FC } from 'react'
import PlaceHolder from '../../public/assets/placeholder.jpg';

interface AvaterGroupProps{
    users:User[]
}

export const AvatarGroup: FC<AvaterGroupProps> = ({ users }) => {
    
    const slicedUser = users.slice(0,3);

    const positionMap = {
        0: "top-0 left-[12px]",
        1: 'bottom-0',
        2:'bottom-0 right-0'
    }


  return (
      <div className='relative h-11 w-11'>
          {
              slicedUser.map((user, index) => (
                  <div key={user.id} className={` absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${positionMap[index as keyof typeof positionMap]}`}>
                      <Image alt='avatar' fill src={user?.image || PlaceHolder }/>
                  </div>
              ))
          }
    </div>
  )
}
