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
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="w-full md:w-1/2 aspect-video relative bg-gray-200">
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
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-2xl font-bold mb-4">
          Join us at {venue.name},
        </h2>
        <p className="text-xl mb-6">
          {venue.address}, {venue.city}
        </p>
        <a
          href={venue.googleMapsUrl || `https://maps.google.com/?q=${venue.name}+${venue.address}+${venue.city}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Get Directions
        </a>
      </div>
    </div>
  )
} 