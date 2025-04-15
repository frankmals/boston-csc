import Image from 'next/image'
import { client } from '@/lib/sanity'
import { venueQuery } from '@/lib/queries'

async function getVenue() {
  return await client.fetch(venueQuery)
}

export async function Venue() {
  const venue = await getVenue()

  if (!venue) return null

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
      <div className="w-full md:w-1/2">
        <div className="aspect-[4/3] relative bg-gray-200 rounded-lg overflow-hidden">
          {venue.imageUrl ? (
            <Image
              src={venue.imageUrl}
              alt={venue.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Join us at {venue.name},
        </h2>
        <p className="text-2xl mb-6">
          {venue.address}
        </p>
        <a
          href={venue.googleMapsUrl || `https://maps.google.com/?q=${venue.name}+${venue.address}+${venue.city}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          Get Directions
        </a>
      </div>
    </div>
  )
} 