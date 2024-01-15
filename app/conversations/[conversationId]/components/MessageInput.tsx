'use client'

interface MessageInputProps{
    placeholder?: string,
    id: string,
    type?: string,
    requried?: boolean,
    register: UseFormRegister<FieldValues>,
    error:FieldErrors
}

import React, { FC } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

export const MessageInput: FC<MessageInputProps> = ({
    placeholder,
    id,
    type,
    requried,
    register,
    error
}) => {
  return (
      <div className=' relative w-full'>
          <input id={id} type={type} autoComplete={id}  {...register(id, { required: requried })} placeholder={placeholder} className='
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100
          w-full
          rounded-full
          focus:outline-none
          '/> 
    </div>
  )
}
