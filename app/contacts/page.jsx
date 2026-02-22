import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const Contacts = () => {
  return (
    <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl bg-red-700">
          <div className='mb-8'>
            <Link href={'/'}>
              <Button variant='outline' size='sm' className={'mb-4 bg-transparent'}>Back to form</Button>
            </Link>
          </div>
          <ContactList />
        </div>
    </div>
  )
};

export default Contacts;