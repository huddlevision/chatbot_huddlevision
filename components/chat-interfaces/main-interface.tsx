"use client";

import { PromptForm } from '@/components/prompt-form';
import { ChatList } from '@/components/chat-list'
import { useUIState, useAIState } from 'ai/rsc'
import { UIState } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import { useState, useEffect } from 'react'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { ChatPanel } from '@/components/chat-panel'
import { nanoid } from 'nanoid'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconCopy } from '@/components/ui/icons'
import { UserMessage } from '@/components/stocks/message'
import { User } from 'lucide-react';

export interface MainInterfaceProps {
    input: string;
    setInput: (value: string) => void;
    session: Session|undefined;
}

export interface SideChatProps {
    input: string;
    setInput: (value: string) => void;
    messages: UIState;
}

export interface ToolResult {
    prompt: string;
    result: string;
}

export interface AIMessage {
    role: string;
    content: Array<{
        type: string;
        result: {
            userPrompt: string;
            queryAnswer: string;
        }
    }>;
}

export function SideChat({input, setInput, session}: MainInterfaceProps) {

    const [messages, _] = useUIState()
    const { messagesRef, isAtBottom, scrollToBottom } = useScrollAnchor()

    return (
        <div className="w-full relative overflow-none">
        <div ref={messagesRef} className="flex flex-col justify-between pb-[200px] pt-4 pl-2">
            <ButtonScrollToBottom
                isAtBottom={isAtBottom}
                scrollToBottom={scrollToBottom}
            />
            <ChatList messages={messages} session={session} isShared={false}/>
        </div>
        <div className="fixed inset-x-0 bottom-5 flex justify-center">
            <div className="w-11/12">
                <PromptForm 
                placeholder='Ask a follow up question...'
                input={input} 
                setInput={setInput} />
            </div>
        </div>
        </div>
    )
}

export function QueryResults () {

    const aiState = useAIState()
    const [toolResults, setToolResults] = useState<ToolResult[]>([]);

    useEffect(() => {
        const queryResults = []
        const toolMessages = aiState[0].messages.filter((message: AIMessage) => message.role === 'tool')
        if (!toolMessages) return
        
        for (const message of toolMessages) {
            for (const content of message.content) {
                if (content.type === 'tool-result') {
                    
                    queryResults.push({
                        prompt: content.result.userPrompt,
                        result: content.result.queryAnswer
                    })
                }
            }
        }

        if (queryResults.length > 0) {
            setToolResults([...queryResults])
        }

    }, [aiState])

    return (
        <div className="h-full border rounded-md rounded-md p-3 mb-3 overflow-y-scroll">
        <h3 className="text-sky-800 text-lg mb-4">Query Results</h3>
        <table className="w-full slate-500 rounded-md">
            <thead>
                <tr>
                    <th className="text-left w-1/3 text-md rounded-md p-1">Prompt</th>
                    <th className="text-left w-1/3 text-md rounded-md p-1">Response</th>
                    <th className="text-left w-1/3 text-md rounded-md p-1"></th>
                </tr>
            </thead>
            <tbody>
                {toolResults.map((data, index) => (
                    <tr key={index}>
                        <td className="text-left w-1/2 text-md p-1">
                        <div className=" rounded-md p-2">
                                <p className="text-zinc-600">{data?.prompt}</p>
                            </div></td>
                        <td className="text-left w-1/3 text-md p-1">
                            <div className=" rounded-md p-2">
                                <p className="text-zinc-600">{data?.result}</p>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export function MainInterface({input, setInput}: MainInterfaceProps) {

    const [messages] = useUIState()
    const [aiState] = useAIState()
    const { scrollRef } = useScrollAnchor()

    return (
        <div className="p-1 w-11/12 mx-auto flex flex-row x-divide">
            <SideChat 
                    session={aiState.session}
                    input={input}
                    setInput={setInput}
                />
        </div>
    )
}