import ContactList from '@/components/ContactList';
import ContactStats from '@/components/ContactStats';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

export const metadata = {
  title: "All messages",
  description: "Get touch with me.",
};

const Contacts = () => {
  return (
    <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className='mb-8'>
            <Link href={'/'}>
              <Button variant='outline' size='sm' className={'mb-4 bg-transparent'}>Back to form</Button>
            </Link>
          </div>
          <ContactStats />
          <ContactList />
        </div>
    </div>
  )
};

export default Contacts;