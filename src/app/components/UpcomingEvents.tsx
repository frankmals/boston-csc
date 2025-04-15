import { sanityFetch } from '@/lib/sanityFetch'

interface Event {
  _id: string
  title: string
  date: string
  description?: string
}

export async function UpcomingEvents() {
  // Fetch the next 3 upcoming events, sorted by date
  const query = `*[_type == "event" && date >= now()] | order(date asc)[0...3]{
    _id,
    title,
    date,
    description
  }`
  const events = await sanityFetch<Event[]>({ query })

  if (!events.length) {
    return <div>No upcoming events.</div>
  }

  return (
    <ul className="space-y-4">
      {events.map(event => (
        <li key={event._id} className="p-4 border rounded-lg shadow">
          <div className="font-bold text-lg">{event.title}</div>
          <div className="text-gray-600">{new Date(event.date).toLocaleString()}</div>
          {event.description && <div className="mt-2">{event.description}</div>}
        </li>
      ))}
    </ul>
  )
} 