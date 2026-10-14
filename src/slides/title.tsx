import { Slide } from '@/deck/slide'

export function Title() {
  return (
    <Slide className="justify-end">
      <p className="text-3xl text-muted-foreground">October 2026</p>
      <h1 className="mt-6 max-w-[1400px] text-[140px] leading-[0.95] font-semibold tracking-tight">Your presentation title</h1>
      <p className="mt-10 max-w-[1100px] text-5xl leading-tight text-muted-foreground">A one-line subtitle that says what this deck is about.</p>
    </Slide>
  )
}
