'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useActions, useUIState } from 'ai/rsc'

import { UserMessage } from './stocks/message'
import { type AI } from '@/lib/chat/actions'
import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'

export function PromptForm({
  input,
  setInput,
  placeholder,
  disabled
}: {
  input: string
  setInput: (value: string) => void
  placeholder?: string,
  disabled?: boolean
}) {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState<typeof AI>()

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault()

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target['message']?.blur()
        }

        const value = input.trim()
        setInput('')
        if (!value) return

        // Optimistically add user message UI
        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>
          }
        ])

        // Submit and get response message
        const responseMessage = await submitUserMessage(value)
        setMessages(currentMessages => [...currentMessages, responseMessage])
      }}
    >
      <div className="relative flex my-6 max-h-60 w-full grow flex-col overflow-hidden rounded-md">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder={placeholder ? placeholder : 'Ask me anything about NFL stats.'}
          className="
          min-h-[60px] 
          w-full 
          text-sky-900 
          border 
          border-sky-300 
          rounded-md 
          resize-none 
          bg-white 
          px-4 py-[1.3rem] 
          focus-within:outline-none 
          sm:text-md"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={disabled}
        />
        <div className="absolute right-[8px] top-[15px] lg:right-[8px] md:right-[8px] sm:right-[40px]">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" disabled={input === '' || disabled}>
                <IconArrowElbow />
                <span className="sr-only">Ask me anything about NFL stats.</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ask me anything about NFL stats.</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
