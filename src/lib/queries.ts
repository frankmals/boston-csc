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
  "venue": venue->name
}[0...5]`

// Featured products query
export const featuredProductsQuery = `*[_type == "product" && featured == true] {
  _id,
  name,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  price
}[0...3]` 