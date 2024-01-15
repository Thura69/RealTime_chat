import React, { FC } from 'react'
import Modal from './Modal';
import Image from 'next/image';

 interface ImageModalProps {
     isOpen: boolean,
     onClose: () => void,
     src:string | null
}

export const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
    if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className='w-80 h-80'>
            <Image alt="kd" fill className=' object-cover' src={src}/>
        </div>
    </Modal>
  )
}
