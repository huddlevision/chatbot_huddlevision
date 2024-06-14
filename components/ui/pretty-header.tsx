import * as React from "react"
import { cn } from "@/lib/utils"

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const PrettyHeader = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({ className, ...props}, ref) => {
        return (
            <p 
            className={cn("bg-gradient-to-r from-sky-950 from-10% via-sky-800 via-40% to-sky-950 bg-clip-text font-medium leading-none tracking-tighter text-transparent", className)}
            ref={ref}
            {...props}
            >
                { props.children }
            </p>
        )
    }
)

PrettyHeader.displayName = 'PrettyHeader';

export { PrettyHeader }