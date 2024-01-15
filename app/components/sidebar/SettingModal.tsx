'use client'
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import Modal from '@/app/conversations/[conversationId]/components/Modal'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Input from '../input/Input'
import Image from 'next/image'
import PlaceHolder from '../../../public/assets/placeholder.jpg';
import { CldUploadButton } from 'next-cloudinary'
import { Button } from '../Button'

interface SettingModalProps{
    isOpen: boolean,
    onClose: () => void,
    currentUser:User
}

export const SettingModal: FC<SettingModalProps> = ({ isOpen, onClose,currentUser }) => {
    
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
            name: currentUser.name,
            image: currentUser.image
        }
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post(`/api/settings`, data)
            .then(() => { router.refresh(); onClose() })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false))
    };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className=' space-y-12'>
                <div className='border-b border-gray-900/10 pb-12'>
                      <h2 className='text-base font-semibold leading-7 text-gray-900'>Profile</h2>
                      <p className='mt-1 text-ms leading-6 text-gray-600'>Edit your public information.</p>
                      <div className='mt-10 flex flex-col gap-y-8'>
                          <Input register={register!} disabled={isLoading} label='Name'  id="name" error={errors} />
                      </div>
                      <label className='block text-sm mt-3 font-medium leading-6 text-gray-900'>
                          Photo
                      </label>
                      <div className='mt-1 flex items-center gap-x-3'>
                          <Image width={48} height={48} className=' rounded-full' alt='image' src={image || currentUser.image || PlaceHolder} />
                          <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset='pwh4fffa'>
                              <Button disabled={isLoading} secondary type='button'>Change</Button>
                          </CldUploadButton>
                      </div>

                </div>
                
                  <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <Button disabled={isLoading} secondary onClick={onClose}>Cancel</Button>
                    <Button disabled={isLoading} type='submit'>Save</Button>
                  </div>
                  
              </div>
              
        </form>
    </Modal>
  )
}
