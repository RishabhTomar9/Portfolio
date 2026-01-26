import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-zinc-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-zinc-50 text-zinc-900 hover:bg-zinc-50/90",
                destructive: "bg-red-500 text-zinc-50 hover:bg-red-500/90",
                outline: "border border-zinc-800 bg-zinc-950 hover:bg-zinc-800 hover:text-zinc-50",
                secondary: "bg-zinc-800 text-zinc-50 hover:bg-zinc-800/80",
                ghost: "hover:bg-zinc-800 hover:text-zinc-50",
                link: "text-zinc-50 underline-offset-4 hover:underline",
                neon: "bg-zinc-950 border border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)] hover:bg-purple-500 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all duration-300",
                glow: "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300"
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    )
})
Button.displayName = "Button"

export { Button, buttonVariants }
