import { createClient, type QueryParams } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-19',
  useCdn: true, // Enable CDN caching
  perspective: 'published',
  stega: false,
  token: process.env.SANITY_API_TOKEN, // Add token for authenticated requests
})

// Create an image URL builder
const builder = imageUrlBuilder(client)

// Helper function to handle image URLs
export const urlFor = (source: SanityImageSource | undefined) => {
  if (!source) return undefined
  return builder.image(source).auto('format').url()
}

// Type-safe fetch function with cache busting
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string
  params?: QueryParams
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(
    query,
    params,
    {
      cache: 'no-store', // Disable caching at the fetch level
      next: { revalidate: 0 } // Force revalidation on every request
    }
  )
} 