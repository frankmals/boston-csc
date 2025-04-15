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
  console.log('Executing query:', upcomingEventsQuery)
  try {
    const events = await sanityFetch<Event[]>({ query: upcomingEventsQuery })
    console.log('Raw events data:', JSON.stringify(events, null, 2))
    return events
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}

export async function UpcomingEvents() {
  try {
    const events = await getUpcomingEvents()
    console.log('Events in component:', events?.length, 'events found')

    // Debug view - always show this during development
    return (
      <div>
        <div className="bg-yellow-100 p-4 mb-4 rounded">
          <h3 className="font-bold">Debug Info:</h3>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(events, null, 2)}
          </pre>
        </div>

        {!events?.length ? (
          <div className="text-center text-gray-500 py-8">
            No upcoming events scheduled
          </div>
        ) : (
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