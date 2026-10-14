import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** A slide's frame: the full 1920×1080 canvas with the deck's padding. Lay content out inside it in pixels. */
export function Slide({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex size-full flex-col bg-background p-28 text-foreground', className)}>{children}</div>
}
