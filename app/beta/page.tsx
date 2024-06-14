'use client'

import { PrettyHeader } from "@/components/ui/pretty-header"
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("mvoeewjd");

  if (state.succeeded) {
    // toast success message
    return (
    <div className="my-auto"><PrettyHeader content="Thanks for joining the waitlist!"/>
    <p className="text-gray-500 text-lg max-w-[400px] text-center">We will be in touch soon - currently rolling out access over the next 2 months, with a full release by the start of the upcoming NFL season.</p>
    </div>)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 space-y-3 my-auto h-1/2"
    >
      <div className="w-full flex-1 rounded-lg border bg-white px-6 pb-4 pt-8 shadow-md md:w-96">
      <PrettyHeader className="text-3xl text-center text-balance">
        Join the huddlechat waitlist
      </PrettyHeader>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
              htmlFor="message"
            >
              Message (Optional)
            </label>
            <div className="relative">
              <textarea
                className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500"
                id="message"
                name="message"
                placeholder="Enter your message"
              />
              <ValidationError 
                prefix="Message (Optional)" 
                field="message"
                errors={state.errors}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={state.submitting}
          className="mt-4 w-full rounded-md bg-sky-900 hover:bg-sky-800 hover:ring-sky-800 border px-4 py-2 text-white font-semibold"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default function BetaPage() {

  return (
    <main className="flex flex-col items-center p-4 w-full sm:w-1/2 sm:mx-auto">
      <ContactForm/>
    </main>
  )
}