import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity'
import { featuredProductsQuery } from '@/lib/queries'

interface Product {
  _id: string
  name: string
  slug: string
  imageUrl?: string
  price: number
}

async function getFeaturedProducts() {
  return sanityFetch<Product[]>({ query: featuredProductsQuery })
}

export async function FeaturedSwag() {
  const products = await getFeaturedProducts()

  if (!products?.length) {
    return (
      <div className="text-center text-white py-8">
        No featured products available
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {products.map((product) => (
        <Link
          key={product._id}
          href={`/shop/${product.slug}`}
          className="block bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
        >
          <div className="aspect-square relative bg-gray-50 mb-4 rounded overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>
          <h3 className="text-xl font-medium mb-2">T-Shirt</h3>
          <p className="text-xl font-bold text-[#006B25]">
            ${product.price.toFixed(2)}
          </p>
        </Link>
      ))}
    </div>
  )
} 