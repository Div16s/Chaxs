import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='h-screen flex items-center justify-center flex-col'>
        <Image 
            src="/images/404.png"
            alt="404 Not Found"
            width={500}
            height={500}
            className='w-1/2 h-1/2 object-cover'
        />
        <Link href="/" className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
            <Button>
                Go to Home
            </Button>
        </Link>
    </div>
  )
}

export default NotFound