'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'boston-csc',
  title: 'Boston Celtic Supporters Club',
  projectId: 'kx6djh0i',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Venue')
              .child(
                S.document()
                  .schemaType('venue')
                  .documentId('kinsale-pub')
              ),
            S.listItem()
              .title('Events')
              .child(
                S.documentList()
                  .title('Events')
                  .filter('_type == "event"')
                  .defaultOrdering([{ field: 'date', direction: 'asc' }])
              ),
            S.listItem()
              .title('Products')
              .child(
                S.documentList()
                  .title('Products')
                  .filter('_type == "product"')
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
