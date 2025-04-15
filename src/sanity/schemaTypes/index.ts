import { type SchemaTypeDefinition } from 'sanity'

import event from './eventType'
import venue from './venueType'
import product from './productType'

export const schemaTypes: SchemaTypeDefinition[] = [
  event,
  venue,
  product,
]
