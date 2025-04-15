import { createClient } from 'next-sanity'

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