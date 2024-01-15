'use client'
import React, { FC, cloneElement, useCallback, useEffect, useMemo } from 'react'
import { cn } from '@/utils/cn';
import { FullConversationType } from '@/app/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/app/components/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { format } from "date-fns";
import { AvatarGroup } from '@/app/components/AvatarGroup';

interface ConversationBoxProps{
    item: FullConversationType,
    selected:boolean
}

export const ConversationBox: FC<ConversationBoxProps> = ({ item, selected }) => {


    const otherUser =  useOtherUser(item);

    const session = useSession();


    const router = useRouter();

    useEffect(() => {
    },[item])


    const handleClick = useCallback(() => {
        router.push(`/conversations/${item.id}`)
    }, [item.id, router]);

    const lastMessage = useMemo(() => {

        
        const messages = item.messages || [];

        return messages[messages.length - 1];

    }, [item]);


    const userEmail = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false
        }
        const seenArray = lastMessage.seen || [];

        if (!userEmail) {
            return false;
        }

        return seenArray.filter((user)=>user.email === userEmail).length !== 0

    }, [lastMessage, userEmail])


    const lastMessageText = useMemo(() => {

        if (lastMessage?.image) {
            return 'Sent an Image';
        }

        if (lastMessage?.body) {
            return lastMessage.body
        };

        return "Started a conversation!"
    }, [lastMessage])



  return (
      <div
          onClick={handleClick}
          className={cn(`
          w-full
          relative
          flex
          items-center
          space-x-3
          hover:bg-neutral-100
          rounded-lg
          p-3
           transition
           cursor-pointer
          `,selected? ' bg-neutral-100':'bg-white')}
      
      >
          {
              item.isGroup ? (
                  <AvatarGroup users={item.user} />
              ): <Avatar user={otherUser} />
          }
     
      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
            <div className='flex justify-start items-center gap-3 mb-1'>
                      <p className='text-md font-medium  text-gray-800'>{item.name || otherUser.name}</p>
                      {
                          lastMessage?.createdAt && (
                              <p className='text-sm text-gray-500'>
                                  {format(new Date(lastMessage.createdAt),"p")}
                              </p>
                          )
                      }
                  </div>
                  <p
                      className={cn(`
                  text-sm
                  text-gray-400
                  font-light
                      `, hasSeen? 'text-gray-500': "text-black font-medium")}
                  >{lastMessageText}</p>
        </div>
      </div>
      </div>
  )
}
