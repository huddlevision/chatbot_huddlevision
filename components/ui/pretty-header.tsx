import * as React from "react"

function PrettyHeader ({content}: {content: string}) {
    return (
    <p 
        className="ml-3 text-center bg-gradient-to-r 
            from-sky-950 from-10% 
            via-sky-800 via-40%
            to-sky-950 
            bg-clip-text 
            py-3 
            text-2xl 
            font-medium 
            leading-none 
            tracking-tighter 
            text-transparent 
            sm:text-3xl
            sm:text-left 
            ">
        { content }
    </p>
)}

PrettyHeader.displayName = "PrettyHeader"

export { PrettyHeader }