'use client'
import { cn } from '@/utils/cn';
import React, { FC } from 'react'
import { 
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form';

interface InputProps{
    label: string,
    id: string,
    type?: string,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    error?: FieldErrors,
    disabled?:boolean
}
const Input:FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    error,
    disabled
}) =>{
  return (
    <div>
          <label
              className='
                 block
                 text-sm
                 font-medium
                 leading-6
                 text-gray-900
              '
              htmlFor={id}>
              {label}
          </label>
          <div className="mt-1">
              <input
                  id={id}
                  type={type}
                  autoComplete={id}
                  disabled={disabled}
                  {...register(id, { required })}
                  className={cn(`
                   form-input
                   block
                   rounded-md
                   w-full
                   border-none
                   py-1.5
                   text-gray-900
                   shadow-sm
                   ring-1
                   ring-inset
                   ring-gray-300
                   placeholder:text-gray-300
                   focus:ring-2
                   focus:ring-inset
                   focus:ring-sky-600
                   sm:text-sm
                   sm:leading-6
                  `,
                  error![id] && "focus:ring-rose-600",
                  disabled && "opacity-50 cursor-default"
                  )}
                  placeholder='Email'
              />
          </div>
    </div>
  )
}

export default Input