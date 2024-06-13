'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { MainInterface } from '@/components/chat-interfaces/main-interface'
import { LandingPage } from '@/components/landing-page'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Footer } from '@/components/footer'
import { Pricing } from '@/components/pricing'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()

  const [_, setNewChatId] = useLocalStorage('newChatId', id)

  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
      }
    }
  }, [id, path, session?.user, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  return (
      <div className="flex flex-col w-full h-full">
      {messages.length ? (
        <MainInterface 
        session={session} 
        input={input} 
        setInput={setInput} />
        ) : (
          <div style={{borderTop: 'none', borderBottom: 'none'}} className="group border lg:w-8/12 md:w-8/12 sm:w-11/12 m-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
          <div className={cn('pt-4 md:pt-10', className)}>
              <LandingPage />
              <ChatPanel
              id={id}
              input={input}
              setInput={setInput}
            />
            <Footer />
          </div>
          
          </div>
        )}
        
      </div>
  )
}
