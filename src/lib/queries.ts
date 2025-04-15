// Venue query
export const venueQuery = `*[_type == "venue"][0] {
  name,
  address,
  city,
  "imageUrl": image.asset->url,
  googleMapsUrl,
  description
}`

// Events query - get upcoming events sorted by date
export const upcomingEventsQuery = `*[_type == "event" && dateTime(date) >= dateTime(now())] | order(date asc) {
  _id,
  title,
  date,
  isWatchParty,
  venue
}`

// Featured products query
export const featuredProductsQuery = `*[_type == "product" && featured == true] {
  _id,
  name,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  price
}[0...3]`

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    title,
    subtitle,
    "logoUrl": logo.asset->url
  }
` 