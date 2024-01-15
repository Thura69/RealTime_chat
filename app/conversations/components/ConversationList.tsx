'use client'
import { useConversation } from '@/app/hooks/useConversation'
import { cn } from '@/utils/cn'
import { Conversation, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { FC, useEffect, useMemo, useState } from 'react'
import {MdOutlineGroupAdd} from 'react-icons/md'
import { ConversationBox } from './ConversationBox'
import { FullConversationType } from '@/app/types'
import { GroupChatModal } from './GroupChatModal'
import getSessionEmail from '@/app/actions/session'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/app/libs/pusher'
import { find } from 'lodash'
interface ConversationProps{
  initialItems: FullConversationType[],
  users:User[]
}

export const ConversationList: FC<ConversationProps> = ({ initialItems, users }) => {
    const session = useSession();
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

  const { conversationId, isOpen } = useConversation();
  
  const pusherKey = useMemo(() => {
    return session?.data?.user?.email
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      console.log("kdkdkdkdkd", conversation)
    
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      })
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages:conversation.messages
          }
        }
         return currentConversation
      }))
      
    };

    const removeHanlder = (conversation: FullConversationType) => {
      
      setItems((current) => {
        return [...current.filter((conovo) => conovo.id !== conversation.id)]
      });

      if (conversationId === conversation.id) {
        router.push('/conversations');
      }
    };

    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:remove', removeHanlder);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new');
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:remove');

    }
  },[pusherKey])




  return (
    <>
      <GroupChatModal users={users} isOpen={isModalOpen}  onClose={()=>setIsModalOpen(false)} />
   <aside
    className={cn(`
    fixed
    inset-y-0
    lg:pb-20
    lg:left-20
    lg:w-80
    lg:block
     overflow-y-auto
     border-r
      border-gray-200
   `,
   isOpen?'hidden':'block w-full left-0' 
   )}
   >
    <div className='px-5'>
    <div className='flex justify-between items-center mb-4 pt-4'>
     <div className='
      text-2xl
      font-bold
     text-neutral-800
     '>
        Messages
    </div> 
    <div onClick={()=>setIsModalOpen(true)} className='
     rounded-full
     p-2
     bg-gray-100
     text-gray-600
      cursor-pointer
      hover:opacity-75
      transition
    '>
    <MdOutlineGroupAdd className='h-6 w-6 shrink-0'/>    
    </div>  
    </div>
    {
        items.map((item)=>(
            <ConversationBox key={item.id} item={item} selected={conversationId == item.id} />
        ))
    }
    </div>
   </aside>
    </>
  )
}
