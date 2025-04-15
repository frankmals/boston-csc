import { StructureBuilder } from 'sanity/desk'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      // Venue (The Kinsale)
      S.listItem()
        .title('Venue')
        .child(
          S.document()
            .schemaType('venue')
            .documentId('kinsale-pub')
        ),

      // Matches & Events
      S.listItem()
        .title('Matches & Events')
        .child(
          S.documentList()
            .title('Matches & Events')
            .filter('_type == "event"')
            .defaultOrdering([{ field: 'date', direction: 'asc' }])
        ),

      // Products (T-Shirts)
      S.listItem()
        .title('Products')
        .child(
          S.documentList()
            .title('Products')
            .filter('_type == "product"')
        ),
    ])
