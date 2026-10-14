import { Slide } from '@/deck/slide'

const POINTS = [
  { title: 'One idea per slide', body: 'Say the point in the heading; the rest supports it.' },
  { title: 'Big type', body: 'Body text no smaller than 40px, so it reads from the back of the room.' },
  { title: 'Room to breathe', body: 'Leave space empty rather than filling it.' },
]

export function Points() {
  return (
    <Slide>
      <h2 className="text-8xl font-semibold tracking-tight">Three things to know</h2>
      <ol className="mt-auto grid grid-cols-3 gap-16">
        {POINTS.map((point, i) => (
          <li key={point.title} className="flex flex-col gap-6 border-t-2 pt-10">
            <span className="text-4xl text-muted-foreground tabular-nums">0{i + 1}</span>
            <span className="text-5xl font-medium">{point.title}</span>
            <span className="text-4xl leading-snug text-muted-foreground">{point.body}</span>
          </li>
        ))}
      </ol>
    </Slide>
  )
}
