import { Avatar } from '@/app/components/Avatar'
import { FullMessageType } from '@/app/types'
import { cn } from '@/utils/cn'
import { Message } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { FC, useState } from 'react'
import {format} from 'date-fns'
import Image from 'next/image'
import { ImageModal } from './ImageModal'

interface MessageBoxProps{
    message: FullMessageType,
    isLast:boolean
}



export const MessageBox: FC<MessageBoxProps> =  ({ message, isLast }) => {
    const session = useSession();
    
    const [imageOpen, setImageOpen] = useState(false);



    const isOwn = session?.data?.user?.email === message.sender.email;


    const seenList = (message.seen || [])
        .filter((user) => user.email !== message.sender.email)
        .map((user) => user.name)
        .join(',')
    
    const conatiner = cn(`flex gap-3 p-4`, isOwn && ' justify-end ');

    const avater = cn(isOwn && "order-2");

    const body = cn("flex flex-col gap-2", isOwn && "items-end");

    const messaged = cn(
        "text-sm w-fit overflow-hidden",
        isOwn ? 'bg-purple-500 text-white' : 'bg-gray-100',
        message.image ? "rounded-md p-0" : 'rounded-full py-2 px-3')
    
    



  return (
    <div className={conatiner}>
        <div className={avater}>
            <Avatar user={message.sender}/>
        </div>
        <div className={body}>
            <div className={'flex items-center gap-1'}>
                  <div className='text-sm text-gray-500'>
                    {message.sender.name}  
                </div>
                  <div className='text-sm text-gray-400'>
                    {format(new Date(message.createdAt),'p')}  
                </div>
            </div>
              <div className={messaged}>
                  <ImageModal src={message.image} isOpen={imageOpen} onClose={()=>setImageOpen(false)} />
                   {
                      message.image ? (
                          <Image onClick={()=>setImageOpen(true)} className=' object-cover cursor-pointer hover:scale-110 transition' src={message.image} alt='Image' width={288} height={288}/>
                      ) : <p>{message.body}</p>
                   }
            </div>
            {
                  isLast && isOwn && seenList.length > 0 && (
                      <div className='text-gray-500 text-xs font-light'>{`seen by ${seenList}`}</div>
                )
            }
        </div>
    </div>
  )
}
