'use client'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { FC, useCallback, useState } from 'react'
import { Avatar } from './Avatar'
import { LoadingModal } from './loading/LoadingModal'

interface UserBoxProps {
    item:User
}

export const UserBox: FC<UserBoxProps> = ({ item }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/conversations', {
            userId:item.id
        }).then((data) => {
            router.push(`/conversations/${data.data.id}`);
        }).finally(()=>setIsLoading(false))
        
    }, [item, router]);
    
  return (
    <>
      {
        isLoading && (<LoadingModal/>)
      }
     <div
      onClick={handleClick}    
      className='
      w-full
      realtive
      flex
      items-center
    justify-start
      space-x-3
    bg-white
      p-2
    hover:bg-neutral-100
      rounded-lg
     cursor-pointer
      '>
     <Avatar user={item}/>
     <div className='min-w-0 flex-1'>
      <div className=' focus:outline-none'>
       <div
         className='
          flex
           justify-start
            items-center
            mb-1
         '
       >
        <p className='
         text-sm
         font-medium
         text-gray-900
        '>
        {item.name}
        </p>
       </div>
      </div>  
     </div>
      </div>
    </>
  )
}
