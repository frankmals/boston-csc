import { Header } from './components/Header'
import { Venue } from './components/Venue'
import { UpcomingEvents } from './components/UpcomingEvents'
import { FeaturedSwag } from './components/FeaturedSwag'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Venue Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Venue />
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            UPCOMING MATCHES
          </h2>
          <UpcomingEvents />
        </div>
      </section>

      {/* Swag Section */}
      <section className="py-12 bg-[#F4804E]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            SWAG
          </h2>
          <FeaturedSwag />
        </div>
      </section>
    </main>
  )
}
