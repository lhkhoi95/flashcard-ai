'use client';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

function ContactForm() {
  const [state, handleSubmit] = useForm('xnnazlwq');
  if (state.succeeded) {
    return <p>Your message has been sent successfully</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="grid gap-3 w-[90%] md:w-96">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" placeholder="Email" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Message</Label>
        <Textarea
          type="message"
          id="message"
          name="message"
          placeholder="Message"
          className="h-36"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <Button type="submit" disabled={state.submitting} className="mt-4">
        Submit
      </Button>
    </form>
  );
}

function App() {
  return (
    <div className="flex flex-col items-center pt-36 mb-96">
      <h1 className="text-4xl font-semibold mb-8">Contact</h1>
      <ContactForm />
    </div>
  );
}

export default App;
