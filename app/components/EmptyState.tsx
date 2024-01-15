'use client'
import React from 'react'
import { Raleway } from 'next/font/google'
import { cn } from '@/utils/cn'
import Lottie from "lottie-react";
import Chat from '../../public/assets/Animation - 1705139851535.json';

const ralway = Raleway({ subsets: ['latin'] })


export const EmptyState = () => {
  return (
      <div
          className='
          px-4
          py-10
          sm:px-6
          lg:px-8
          h-full
          flex
          justify-center
          items-center
          bg-gray-100
          '
      >
          <div
              className='
              text-center
              item-center
              flex
              flex-col
              '
          >
        <Lottie
        animationData={Chat}
        className="flex w-[350px] justify-center items-center"
        loop={true}
      />
              <h3 className={cn(ralway.className, `
              font-medium
              text-lg
              text-gray-900
             `)}>Selected a chat or start conversation!</h3> 
          </div>
      </div>
  )
}
