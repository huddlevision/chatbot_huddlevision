'use client'

import { UIState } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import { useState, useEffect } from 'react'
import { IconPlus, IconClose } from './ui/icons'

export interface ChatList {
  messages: UIState
  session?: Session
  isShared: boolean
}

export function ChatList({ messages, session, isShared }: ChatList) {

  return (
    <div className="w-11/12 mr-auto">
      {messages.map((message, index) => {
        return (
        <div key={message.id}>
          {message.display}
          {index < messages.length - 1 && <div className="my-4" />}
        </div>
      )})}
    </div>
  )
}
