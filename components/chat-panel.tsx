import * as React from 'react';

import { shareChat } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { PromptForm } from '@/components/prompt-form';
import { IconShare } from '@/components/ui/icons';
import { ChatShareDialog } from '@/components/chat-share-dialog';
import { useAIState, useActions, useUIState } from 'ai/rsc';
import type { AI } from '@/lib/chat/actions';
import { nanoid } from 'nanoid';
import { UserMessage } from './stocks/message';
import { SeparatorVertical } from 'lucide-react';
import { ExternalLink } from '@/components/external-link';
import { IconOpenAI, IconUser } from '@/components/ui/icons';
import { AnimatedBeam } from './magicui/animated-beam';
import { cn } from "@/lib/utils";


export interface ChatPanelProps {
  id?: string;
  title?: string;
  input: string;
  setInput: (value: string) => void;
  position?: string;
}

export interface CachedMessage {
  heading: string;
  subheading: string;
  message: string;
  // cached should be an object
  cached?: any;
}

const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const div1Ref = React.useRef<HTMLDivElement>(null);
  const div2Ref = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden bg-background p-10"
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row justify-between">
          <Circle ref={div1Ref}>
            <Icons.user />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.openai />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={10}
        endYOffset={10}
        curvature={-20}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        startYOffset={-10}
        endYOffset={-10}
        curvature={20}
        reverse
      />
    </div>
  );
}

AnimatedBeamDemo.displayName = "AnimatedBeamDemo";

const Icons = {
  openai: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  user: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
    <ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 8V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 15V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
  ),
};


export function ChatPanel({
  id,
  title,
  input,
  setInput,
  position
}: ChatPanelProps) {
  const [aiState] = useAIState();
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);

  let cachedMessages = [
    {
      heading: 'What is',
      subheading: "Dak Prescott's EPA per play in 2023?",
      message: "What is Dak Prescott's EPA per play in 2023?",
      cached: {
        queryResponse: "Dak Prescott's EPA per play in 2023 is 0.2.",
        querySummary: "Dak Prescott's EPA per play in 2023 is 0.2."
      }
    },
    {
      heading: "What is Brock Purdy's",
      subheading: "EPA per play when targeting Brandon Aiyuk?",
      message: "What is Brock Purdy's EPA per play when targeting Brandon Aiyuk?"
    },
    {
      heading: "What is the Philadelphia Eagles'",
      subheading: "4th and short success rate in 2023?",
      message: "What is the Philadelphia Eagles' 4th and short success rate in 2023?"
    },
    {
      heading: "What is Christian McCaffrey's",
      subheading: "EPA per rush?",
      message: "What is Christian McCaffrey's EPA per rush?"
    },
    {
      heading: "What is the most effective offense",
      subheading: "in the Redzone by EPA per play?",
      message: "What is the most effective offense in the Redzone by EPA per play?"
    },
    {
      heading: "What is Justin Jefferson's",
      subheading: "average yards per reception in 2023?",
      message: "What is Justin Jefferson's average yards per reception in 2023?"
    },
    {
      heading: "What is the Kansas City Chiefs'",
      subheading: "3rd down conversion rate in 2023?",
      message: "What is the Kansas City Chiefs' 3rd down conversion rate in 2023?"
    },
    {
      heading: "What is the most effective defense",
      subheading: "on 3rd down by EPA per play?",
      message: "What is the most effective defense on 3rd down by EPA per play?"
    },
    {
      heading: "What is Patrick Mahomes' EPA",
      subheading: "when throwing for 10+ air yards against the Raiders?",
      message: "What is Patrick Mahomes' average EPA per play when throwing for 10+ air yards against the Raiders (over the course of his whole career)?"
    },
    {
      heading: "What is the average",
      subheading: "yards per play for the San Francisco 49ers in 2023?",
      message: "What is the average yards per play for the San Francisco 49ers in 2023?"
    },
    {
      heading: "What is the New England Patriots'",
      subheading: "defensive success rate against the run in 2023?",
      message: "What is the New England Patriots' defensive success rate against the run in 2023?"
    },
    {
      heading: "What is Lamar's",
      subheading: "CPOE when targeting OBJ?",
      message: "What is Lamar's CPOE when targeting OBJ?"
    }
  ];

  return (
    <div className="inset-x-0 w-full pb-12 m-auto h-full relative">
      <div className={`w-11/12 m-auto ${position} px-4 sm:px-6 lg:px-8`}>
        <PromptForm input={input} setInput={setInput} />
      </div>
      {messages.length === 0 ? (
        <div className="mx-auto sm:px-4">
          <div className="mb-4 gap-2 px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-11/12 m-auto">
            {cachedMessages.map((cached, index) => (
              <div
                key={index}
                className="mt-4 cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50"
                onClick={async () => {
                  setMessages(currentMessages => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{cached.message}</UserMessage>
                    }
                  ]);

                  const responseMessage = await submitUserMessage(
                    cached.message
                  );

                  setMessages(currentMessages => [
                    ...currentMessages,
                    responseMessage
                  ]);
                }}
              >
                <h3 className="text-sm font-semibold">{cached.heading}</h3>
                <p className="text-sm text-sky-500">{cached.subheading}</p>
              </div>
            ))}
          </div>
          <div className="w-11/12 mx-auto text-left mt-20 sm:mt-40">
            <div className="flex flex-row">
              <IconUser className="w-20 h-10 mr-3" />
              <p className="text-xl sm:text-3xl">{"What is Dak Prescott's EPA per dropback when trailing by more than one possession in the 4th quarter in 2023?"}</p>
            </div>  
              <div className="flex flex-col mb-5">
                <div className="flex-col">
                <div
                    className="p-4 mb-2 bg-white w-full transition-shadow duration-300 flex flex-row items-center"
                >
                    <img 
                        className="w-1/2 sm:w-1/4 object-cover rounded-md border mr-4" 
                        src={"https://static.www.nfl.com/image/private/f_auto,q_auto/league/knx0jxponzfkusnyvjkn"} 
                        alt={`${"Dak Prescott"}`} />
                    <div className="p-2 w-1/2 sm:w-3/4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{"Dak Prescott"}</h3>
                        <p className="text-md text-gray-600 mb-1">Team: Dallas Cowboys</p>
                        <p className="text-md text-gray-600 mb-1">Position: QB</p>
                        <p className="text-md text-gray-600 mb-1">Height: {"6'2"}</p>
                        <p className="text-md text-gray-600 mb-1">Weight: 210</p>
                        <p className="text-md text-gray-600 mb-1">College: Mississipi State</p>
                    </div>
                </div>
                </div>
                <div className="mb-3 flex flex-col">
                    <p className="text-xl font-semibold flex flex-row items-center">
                    <span className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border border-muted shadow-sm">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </span>
                    <span className="ml-2">Answer</span>
                    </p>
                    <p className="mb-3 mt-1">{0.0461}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xl font-semibold flex flex-row items-center">
                  <span className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border border-muted shadow-sm">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.42503 3.44136C10.0561 3.23654 10.7837 3.2402 11.3792 3.54623C12.7532 4.25224 13.3477 6.07191 12.7946 8C12.5465 8.8649 12.1102 9.70472 11.1861 10.5524C10.262 11.4 8.98034 11.9 8.38571 11.9C8.17269 11.9 8 11.7321 8 11.525C8 11.3179 8.17644 11.15 8.38571 11.15C9.06497 11.15 9.67189 10.7804 10.3906 10.236C10.9406 9.8193 11.3701 9.28633 11.608 8.82191C12.0628 7.93367 12.0782 6.68174 11.3433 6.34901C10.9904 6.73455 10.5295 6.95946 9.97725 6.95946C8.7773 6.95946 8.0701 5.99412 8.10051 5.12009C8.12957 4.28474 8.66032 3.68954 9.42503 3.44136ZM3.42503 3.44136C4.05614 3.23654 4.78366 3.2402 5.37923 3.54623C6.7532 4.25224 7.34766 6.07191 6.79462 8C6.54654 8.8649 6.11019 9.70472 5.1861 10.5524C4.26201 11.4 2.98034 11.9 2.38571 11.9C2.17269 11.9 2 11.7321 2 11.525C2 11.3179 2.17644 11.15 2.38571 11.15C3.06497 11.15 3.67189 10.7804 4.39058 10.236C4.94065 9.8193 5.37014 9.28633 5.60797 8.82191C6.06282 7.93367 6.07821 6.68174 5.3433 6.34901C4.99037 6.73455 4.52948 6.95946 3.97725 6.95946C2.7773 6.95946 2.0701 5.99412 2.10051 5.12009C2.12957 4.28474 2.66032 3.68954 3.42503 3.44136Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                  </span>
                  <span className="ml-2">Query Summary</span>  
                  </p>
                  <p className="mt-1">{"Dak Prescott's EPA (Expected Points Added) per dropback when trailing by more than one possession in the 4th quarter during the 2023 regular season is approximately 0.046. This metric indicates how effective he is in such critical situations, contributing positively to his team's chances of scoring."}</p>
                </div>
                <div className="bg-gray-600/[0.5] w-full h-[1px] my-5"></div>
                <div className="flex flex-row mb-3 items-center">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={45} height={45} color={"#000"} fill={"none"} opacity={0.8}>
                    <ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 8V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8 15V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg> */}
                

                
                </div>
                <div className="flex flex-col sm:flex-row items-center">
                <div className="flex flex-col w-full sm:w-1/2">
                <div className="flex flex-row items-center mb-5 w-full">
                <IconOpenAI className="w-10 h-10" />
                <p className="ml-3 text-left text-balance 
                bg-gradient-to-br 
                from-black from-30% 
                to-black/60 bg-clip-text py-3 text-3xl font-medium leading-none tracking-tighter text-transparent sm:text-3xl md:text-3xl lg:text-3xl">LLMs connected to sports databases</p>
                </div>
                <p className="text-md text-left text-gray-600">We give LLMs access to sports databases, allowing you to query with natural language and get back advanced analytics. We currently support the OpenAI GPT-4 and GPT-4o as a model provider, with upcoming support for Anthropic&apos;s Claude, Llama-3, and more.</p>
                </div>
                <div className="w-full sm:w-1/2 ml-3">  
                  <AnimatedBeamDemo /> 
                </div>
                </div>
              </div>
          </div>
          <div className="inset-x-0 w-full pb-12 m-auto h-full relative text-center mt-20 sm:mt-40">
            <div className="flex flex-col m-auto w-11/12 space-around mt-30 mb-20 mx-auto p-5">
                {/* <p className="text-left text-balance mb-5 font-medium text-sky-600">SUPPORTED</p> */}
                <div className="flex flex-col sm:flex-row justify-start mb-5">
                  <div className="flex-col p-5 border border-rounded w-full sm:w-1/3 rounded-md text-left  mb-3 sm:mb-0">
                  <div>
                  <div className="flex flex-row">
                   <svg className="mb-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="rgb(14, 165, 233)" fill="none">
                      <path d="M21.3006 6.05187C21.1484 5.22701 20.7411 4.45623 20.1372 3.85008C19.5309 3.24641 18.7599 2.83927 17.9348 2.68704C13.7379 1.98816 9.32857 3.26088 6.29895 6.28553C3.27 9.30951 1.9905 13.7155 2.68454 17.9122C2.83679 18.7371 3.24405 19.5079 3.84791 20.114C4.45425 20.7177 5.22527 21.1248 6.0504 21.2771C10.2213 22.0738 14.6996 20.7027 17.6917 17.6794C20.7496 14.6729 22.0291 10.2497 21.3006 6.05187Z" stroke="currentColor" stroke-width="1.5" />
                      <path d="M4 20L20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M9 12L12 15M12 9L15 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p className="ml-2 font-bold text-sky-500">IN BETA TESTING</p>
                  </div>
                    <div className="mb-5">
                    <ExternalLink href="">
                      <span className="text-left text-xl">nflfastR</span>
                    </ExternalLink>
                    </div>
                  </div>
                    <p className="text-gray-600 text-left">NFLfastR, as a database, offers a comprehensive and organized repository of NFL play-by-play data. It also includes roster data, historical game outcomes, and contract data, all accessible through our natural language interface.</p>
                   </div>
                  <div className="flex-col bg-gray-100 p-5 border border-rounded w-full sm:w-1/3 rounded-md text-left ml-0 sm:ml-3 mb-3 sm:mb-0">
                  <div>
                  <div className="flex flex-row">
                  <svg className="mb-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color="rgb(107, 114, 128)" fill={"none"}>
                      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M2 12C4.28031 14.4289 7.91083 16 12 16C16.0892 16 19.7197 14.4289 22 12" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5.1556 5C4.77388 6.5 5.04007 9 6.56621 11C8.1708 13.1028 9.18243 16 5.36932 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M18.8444 5C19.2261 6.5 18.9599 9 17.4338 11C15.8292 13.1028 14.8176 16 18.6307 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="ml-2 font-bold text-gray-500">UPCOMING</p>
                  </div>
                    <div className="mb-5">
                    <ExternalLink href="">
                      <span className="text-left text-xl">NBA API</span>
                    </ExternalLink>
                    </div>
                  </div>
                    <p className="text-gray-600 text-left">The NBA API provides access to a vast database of NBA statistics, player and team performance metrics, game logs, and other basketball-related data.</p>
                   </div>
                   <div className="flex-col bg-gray-100 p-5 border border-rounded w-full sm:w-1/3 rounded-md text-left ml-0 sm:ml-3  mb-3 sm:mb-0">
                  <div>
                  <div className="flex flex-row">
                  <svg className="mb-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="rgb(107, 114, 128)" fill="none">
                      <path d="M14.6341 16.5168L22 3M17.5475 3L12.3738 12.7865C11.7391 13.9871 11.3456 14.149 10.0348 13.749C8.36082 13.2381 5.01415 11.4686 3.34756 12.2423C1.6805 13.0162 1.54011 18.1781 3.03845 19.2361C4.71629 20.4208 9.68674 19.9937 11.7961 19.5103" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M8 13L6 20" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                      <path d="M12 19C12 17.3453 12.3453 17 14 17H18C19.6547 17 20 17.3453 20 19C20 20.6547 19.6547 21 18 21H14C12.3453 21 12 20.6547 12 19Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p className="ml-2 font-bold text-gray-500">UPCOMING</p>
                  </div>
                    <div className="mb-5">
                    <ExternalLink href="">
                      <span className="text-left text-xl">NHL API</span>
                    </ExternalLink>
                    </div>
                  </div>
                    <p className="text-gray-600 text-left">The NHL API offers comprehensive access to a wide array of hockey data, including game statistics, player and team performance metrics, schedules, and play-by-play details.</p>
                   </div>
                </div>
                <div className="bg-gray-600/[0.5] w-full h-[1px] mb-5"></div>
                <div className="flex flex-row mb-3 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={45} height={45} color={"#000"} fill={"none"} opacity={0.8}>
                    <ellipse cx="12" cy="5" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M20 12C20 13.6569 16.4183 15 12 15C7.58172 15 4 13.6569 4 12" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M20 5V19C20 20.6569 16.4183 22 12 22C7.58172 22 4 20.6569 4 19V5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 8V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8 15V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p className="ml-3 text-left text-balance 
                bg-gradient-to-br 
                from-black from-30% 
                to-black/60 bg-clip-text py-3 text-3xl font-medium leading-none tracking-tighter text-transparent sm:text-3xl md:text-3xl lg:text-3xl">Supported Databases</p>
                </div>
                
                <p className="text-md text-left text-gray-600 w-full sm:w-1/2">We currently support the <ExternalLink href="">nflfastR</ExternalLink> database. With upcoming support for NBA, association football, ice hockey, and baseball datasets.</p>
            </div>
            {/* export interface Player {
                playerName: string;
                playerId: string;
                team: string;
                position: string;
                height: string;
                weight: string;
                college: string;
                image: string;
                dob: string;
                idScore: number;
              }

              export interface NERResults {
                players: Array<Player>
              } */}
          
          </div>
        </div>
      ) : null}
      {messages?.length >= 2 ? (
        <div className="flex justify-center space-x-2 p-4">
          {id && title ? (
            <>
              <Button
                variant="outline"
                onClick={() => setShareDialogOpen(true)}
              >
                <IconShare className="mr-2" />
                Share
              </Button>
              <ChatShareDialog
                open={shareDialogOpen}
                onOpenChange={setShareDialogOpen}
                onCopy={() => setShareDialogOpen(false)}
                shareChat={shareChat}
                chat={{
                  id,
                  title,
                  messages: aiState.messages
                }}
              />
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
