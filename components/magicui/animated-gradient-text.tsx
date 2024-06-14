import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/[0.8] px-4 py-1.5 text-sm font-medium shadow-md backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-lg",
        className,
      )}
    >
      <div
        className={`absolute inset-0 block h-full w-full bg-gradient-to-r from-sky-950 to-sky-300 bg-clip-text text-transparent ${className}`}
      />

      {children}
    </div>
  );
}
