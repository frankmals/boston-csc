import { type SchemaTypeDefinition } from 'sanity'

import eventType from './eventType'
import productType from './productType'
import venueType from './venueType'
import siteSettings from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  eventType,
  productType,
  venueType,
  siteSettings,
]
