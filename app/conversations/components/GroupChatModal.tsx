'use client'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Modal from '../[conversationId]/components/Modal'
import Input from '@/app/components/input/Input'
import Select from '@/app/components/input/Select'
import { Button } from '@/app/components/Button'

interface GroupChatModalInterface{
    isOpen: boolean,
    onClose: () => void,
    users:User[]
}

export const GroupChatModal: FC<GroupChatModalInterface> = ({ isOpen, onClose, users }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: [],
            
        }
    });

    const memebers = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post(`/api/conversations`, {
            ...data,
            isGroup: true,
        })
            .then(() => { router.refresh(); onClose() })
            .catch(() => toast.error("Something went wrong!"))
        .finally(()=>setIsLoading(false))
    };




  return (
      <Modal isOpen={isOpen} onClose={onClose}>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className=' space-y-12'>
                <div className='border-b border-gray-900/10 pb-10'>
                    <h2 className=' text-base font-semibold leading-6 text-gray-900'>
                        Create a group chat
                      </h2>
                      <p className='mt-1 text-sm leading-6 text-gray-600'>Create a chat with more than 2 people.</p>
                      <div className='mt-10 flex flex-col gap-y-78'>
                          <Input register={register} label={"Name"} id={"name"} required error={errors} />
                          <Select
                          disabled={isLoading}
                          label="Members" 
                          options={users.map((user)=>({value:user.id,label:user.name}))}
                          onChange={(value)=>setValue('members',value,{shouldValidate:true})}
                          value={memebers}
                          />
                      </div>
                </div>
              </div>
              <div className='mt-6 flex  items-center justify-end  gap-x-6 '>
                  <Button disabled={isLoading} onClick={onClose} secondary>Cancel</Button>
                  <Button disabled={isLoading} type='submit'>Create</Button>
              </div>
          </form>
    </Modal>
  )
}
