import Image from 'next/image'
import MessengerLogo from '../../public/assets/messenger-svgrepo-com-3.svg';
import { Raleway } from 'next/font/google'
import { cn } from '@/utils/cn';
import Authform from './components/Authform';

const ralway = Raleway({ subsets: ['latin'] })


export default function Home() {
  return (
    <div 
          className={cn(ralway.className,
              'flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 '
          )}>
    <div className='sm:mx-auto  sm:w-full sm:max-w-md'>
        <Image
        alt='logo'
        height={100}
        width={100}
        className='mx-auto'
        src={MessengerLogo}
        />
        <h2 
          className='
          text-center
          mt-6
          text-2xl
          font-bold
          tracking-tight
          text-gray-900
          '>
        Sign in to your account
        </h2>
        <Authform/>
    </div>
  </div>
  )
}
