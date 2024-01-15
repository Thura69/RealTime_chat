'use client'
import { useConversation } from '@/app/hooks/useConversation'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { FC, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from './Modal'
import {FiAlertTriangle} from 'react-icons/fi'
import { Dialog } from '@headlessui/react'
import { Button } from '@/app/components/Button'

interface ConfirmModalProps{
    isOpen?: boolean,
    onClose:()=>void
}

export const ConfirmModal: FC<ConfirmModalProps> = (
    {
        isOpen,
        onClose
    }
) => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        setIsLoading(true);
        axios.delete(`/api/conversations/${conversationId}`)
        .then(()=>{
            onClose();
            router.push(`/conversations`);
            router.refresh()
        })
        .catch(()=>toast.error('Something went wrong!'))
        .finally(()=>setIsLoading(false))

    }, [conversationId, onClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
       <div className='sm:flex items-start  sm:items-start'>
       <div 
        className='mx-auto flex h-12 w-12 border-[1px]  justify-center flex-shrink-0 items-center rounded-lg bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <FiAlertTriangle width={28} className='h-6 w-6 text-red-600' /> 
        </div>
         <div className=' text-center sm:ml-4 sm:text-left'>
            <Dialog.Title as={'h3'} className={'text-base font-semi-bold leading-6 text-gray-900'}>
                Delete Conversation
            </Dialog.Title>
            <p className='mt-2 text-sm text-gray-500'>
                Are you sure you want to delete this conversation? This action can not be undone.
            </p>
         </div>
          </div> 
            <div className='mt-5 gap-2 sm:mt-4 sm:flex sm:flex-row-reverse'>
            <Button disabled={isLoading} onClick={onDelete} danger>
                Delete
            </Button>
            <Button disabled={isLoading} onClick={onClose} secondary>
                Cancel
            </Button>
         </div>
    </Modal>
  )
}
