import { createClient, type QueryParams } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-19', // use current date
  useCdn: process.env.NODE_ENV === 'production',
})

interface SanityImage {
  asset: {
    _ref: string
  }
}

// Helper function to handle image URLs
export const urlFor = (source: SanityImage | undefined) => {
  if (!source?.asset?._ref) return undefined
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${source.asset._ref}`
}

// Type-safe fetch function
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string
  params?: QueryParams
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params)
} 