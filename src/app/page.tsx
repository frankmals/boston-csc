import { Venue } from './components/Venue'
import { UpcomingEvents } from './components/UpcomingEvents'
import { FeaturedSwag } from './components/FeaturedSwag'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">
          BOSTON&apos;S 1 CELTIC SUPPORTER CLUB
        </h1>
        <p className="text-xl text-gray-600">
          Proudly representing Glasgow Celtic in Boston
        </p>
      </section>

      {/* Venue Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Venue />
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            UPCOMING MATCHES / EVENTS
          </h2>
          <UpcomingEvents />
        </div>
      </section>

      {/* Swag Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            SWAG
          </h2>
          <FeaturedSwag />
        </div>
      </section>
    </main>
  )
}
