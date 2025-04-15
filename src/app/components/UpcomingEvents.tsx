import { sanityFetch } from '@/lib/sanity'
import { upcomingEventsQuery } from '@/lib/queries'

interface Event {
  _id: string
  title: string
  date: string
  isWatchParty: boolean
  venue?: string
}

interface SanityError {
  message: string
}

async function getUpcomingEvents() {
  try {
    const events = await sanityFetch<Event[]>({ query: upcomingEventsQuery })
    return events
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}

export async function UpcomingEvents() {
  try {
    const events = await getUpcomingEvents()

    return (
      <div className="max-w-3xl mx-auto">
        {!events?.length ? (
          <div className="text-center text-gray-500 py-8">
            No upcoming events scheduled
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full border-collapse bg-white text-left">
              <tbody>
                {events.map((event) => {
                  const eventDate = new Date(event.date)
                  const formattedDate = eventDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })
                  const formattedTime = eventDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })

                  return (
                    <tr
                      key={event._id}
                      className="border-b border-gray-200 last:border-0"
                    >
                      <td className="py-4 px-6 font-medium" style={{ width: '30%' }}>
                        {formattedDate}
                      </td>
                      <td className="py-4 px-6 font-medium" style={{ width: '40%' }}>
                        {event.title}
                      </td>
                      <td className="py-4 px-6" style={{ width: '30%' }}>
                        {event.isWatchParty ? (
                          <span className="font-medium">Watch Party</span>
                        ) : (
                          formattedTime
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  } catch (error) {
    const sanityError = error as SanityError
    return (
      <div className="text-center text-red-500 py-8">
        Error loading events: {sanityError.message || 'Unknown error'}
      </div>
    )
  }
} 