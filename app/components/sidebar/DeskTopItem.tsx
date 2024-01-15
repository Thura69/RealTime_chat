import { cn } from '@/utils/cn'
import Link from 'next/link'
import React, { FC } from 'react'
import { IconType } from 'react-icons'

interface DeskTopItemProps{
      key:string
      href:string
      label:string
      icon:IconType
      onClick?:()=>void,
      active:boolean | undefined
}

export const DeskTopItem: FC<DeskTopItemProps> = ({
    key,
    href,
    label,
    icon : Icon,
    onClick,
    active
}) => {

    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    };

  return (
    <li onClick={handleClick} className='w-full'>
          <Link href={href}
              className={cn(`
              group
              flex
              gap-x-3
              rounded-md
              p-3
              text-sm
             items-center
              justify-center
             leading-tight
             border
              font-semibold
              text-gray-500
              hover:text-black
              hover:bg-gray-100
          `)}
          >
              <Icon className='h-6 w-6 shrink-0'/>
              <span className='sr-only'>{label}</span>
          </Link>
          
    </li>
  )
}
