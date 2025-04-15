import { sanityFetch } from '@/lib/sanity'
import { upcomingEventsQuery } from '@/lib/queries'

interface Event {
  _id: string
  title: string
  date: string
  isWatchParty: boolean
  venue?: string
}

async function getUpcomingEvents() {
  return sanityFetch<Event[]>({ query: upcomingEventsQuery })
}

export async function UpcomingEvents() {
  const events = await getUpcomingEvents()

  if (!events?.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        No upcoming events scheduled
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <tbody>
          {events.map((event) => {
            const eventDate = new Date(event.date)
            const formattedDate = eventDate.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'long',
              day: 'numeric',
            })
            const formattedTime = eventDate.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })

            return (
              <tr
                key={event._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-left">{formattedDate}</td>
                <td className="py-4 px-4 text-left font-medium">
                  {event.title}
                </td>
                <td className="py-4 px-4 text-left">
                  {formattedTime}
                  {event.isWatchParty && ' (Watch Party)'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
} 