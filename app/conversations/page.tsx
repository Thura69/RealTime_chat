'use client'
import React from 'react'
import { useConversation } from '../hooks/useConversation'
import { cn } from '@/utils/cn'
import { EmptyState } from '../components/EmptyState'


function Home() {
    const { isOpen } = useConversation();
  return (
      <div 
          className={cn(`
         lg:pl-80 
         h-[100svh]
         w-full
         lg:block
      `,
        isOpen?'block':'hidden'
          )}>
        <EmptyState/>
    </div>
  )
}

export default Home
