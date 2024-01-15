'use client'
import { useConversation } from '@/app/hooks/useConversation'
import { Message } from '@prisma/client'
import React, { FC, useEffect, useRef, useState } from 'react'
import { MessageBox } from './MessageBox'
import { FullMessageType } from '@/app/types'
import axios from 'axios'
import { pusherClient } from '@/app/libs/pusher'
import { find } from 'lodash'


interface BodyProps{
  initialMessages:FullMessageType[]
}

export const Body: FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, []);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView();

    const messageHanlder = (message: FullMessageType) => {
        axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current
        }

        return [...current,message]
      });

       bottomRef.current?.scrollIntoView();


    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentmessage) => {
     if (currentmessage.id === newMessage.id) {
      return newMessage;
     }
        return currentmessage;
      }) )
    }

    pusherClient.bind('messages:new', messageHanlder);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHanlder);
      pusherClient.unbind('message:update', updateMessageHandler);
    }


  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message,i) => (
        <MessageBox isLast={i=== messages.length - 1} key={message.id} message={message!} />
      ))}
      <div ref={bottomRef} className='pt-24 '></div>
    </div>
  )
}
