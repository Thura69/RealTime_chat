'use client'
import { useConversation } from '@/app/hooks/useConversation'
import axios from 'axios';
import React from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import {HiPhoto,HiPaperAirplane} from 'react-icons/hi2'
import { MessageInput } from './MessageInput';
import {CldUploadButton} from 'next-cloudinary'

export const Form = () => {
    const { conversationId } = useConversation();

    const {
        handleSubmit,
        register,
        setValue,
        formState: {
            errors
        }
     } = useForm<FieldValues>({
        defaultValues: {
            message:''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message','',{shouldValidate:true})
        axios.post('/api/messages', { ...data, conversationId })
    };

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId: conversationId
        })
    };


  return (
      <div className='py-4 px-4 bg-white border-t items-center flex item-center gap-2 lg:gap-4 w-full' >
          <CldUploadButton
              options={{ maxFiles: 1 }}
              onUpload={handleUpload}
              uploadPreset={'pwh4fffa'}
          >
                 <HiPhoto size={25} className='text-purple-500' />
          </CldUploadButton>
          <form onSubmit={handleSubmit(onSubmit)} className='flex  items-center gap-2 lg:gap-4 w-full'>
              <MessageInput
                  id="message"
                  register={register}
                  error={errors}
                  placeholder={"write a message!"}

              />
              <button type='submit' className=' rounded-full p-2 bg-purple-500 text-white cursor-pointer hover:bg-purple-600 transition'>
                  <HiPaperAirplane size={18}  className='text-white'/>
              </button>
          </form>
    </div>
  )
}
