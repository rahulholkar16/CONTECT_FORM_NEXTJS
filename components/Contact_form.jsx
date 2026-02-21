'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { createContact } from '@/actions';
import toast from 'react-hot-toast';

const Contact_form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    console.log(formData);
    const res = await createContact(formData);
    if (res.success) {
      toast.success("Message sent successfully");
      const form = document.getElementById("contact-form");
      form.reset();
    } else {
      toast.error("Error: failed to send message.");
    }
    setIsSubmitting(false);
  };

  return (
    <Card className={'w-full max-w-2xl mx-auto'}>
      <CardHeader>
        <CardTitle>Contact us</CardTitle>
      </CardHeader>
      <CardContent>
        <form id='contact-form' action={onSubmit} className='space-y-6'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" required disabled={isSubmitting} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required disabled={isSubmitting} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" type="text" required disabled={isSubmitting} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required disabled={isSubmitting} className="min-h-[120px]" />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
};

export default Contact_form;