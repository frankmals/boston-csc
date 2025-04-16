import Image from 'next/image'
import { sanityFetch } from '@/lib/sanity'

interface Venue {
  name: string
  address: string
  city: string
  image?: {
    asset: {
      url: string
    }
  }
  googleMapsUrl?: string
}

async function getVenue() {
  const query = `*[_type == "venue"][0]{
    name,
    address,
    city,
    image {
      asset->{
        url
      }
    },
    googleMapsUrl
  }`
  return await sanityFetch<Venue>({ query })
}

export async function Venue() {
  const venue = await getVenue()
  if (!venue) return null

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
      <div className="w-full md:w-1/2">
        {venue.image?.asset.url ? (
          <Image
            src={venue.image.asset.url}
            alt={venue.name}
            width={800}
            height={600}
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
        ) : (
          <div>No image available</div>
        )}
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