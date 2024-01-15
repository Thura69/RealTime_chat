import { cn } from '@/utils/cn'
import Link from 'next/link'
import React, { FC } from 'react'
import { IconType } from 'react-icons'


interface MobileItemProps{
      key:string
      href:string
      label:string
      icon:IconType
      onClick?:()=>void,
      active:boolean | undefined
}

export const MobileItem: FC<MobileItemProps> = (
    {
        key,
        href,
        label,
        icon:Icon,
        onClick,
        active
    }
) => {
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    };

  return (
      <Link onClick={onClick} href={href} className={cn(`
       group
       flex
       gap-x-3
       text-sm
       leading-6
        font-semibold
        w-full
         justify-center
         p-4
         text-gray-500
         hover:text-black
         hover:bg-text-gray-100
         border
      `,
      active && 'bg-gray-100 text-purple-500'
      )}>
       <Icon className='h-6 w-6 shrink-0'/>   
    </Link>
  )
}
