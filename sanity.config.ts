'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'

export default defineConfig({
  name: 'boston-csc',
  title: 'Boston Celtic Supporters Club',
  projectId: 'kx6djh0i',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    deskTool({
      structure
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
