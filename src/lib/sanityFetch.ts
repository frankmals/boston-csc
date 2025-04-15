import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-19', // use current date YYYY-MM-DD
  useCdn: process.env.NODE_ENV === 'production',
});

interface SanityFetchProps {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
}

export async function sanityFetch<T>({ query, params = {}, tags = [] }: SanityFetchProps): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      tags,
    },
  });
} 