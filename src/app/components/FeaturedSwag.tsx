import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { featuredProductsQuery } from '@/lib/queries'

async function getFeaturedProducts() {
  return await client.fetch(featuredProductsQuery)
}

export async function FeaturedSwag() {
  const products = await getFeaturedProducts()

  if (!products?.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        No featured products available
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product: any) => (
        <Link
          key={product._id}
          href={`/shop/${product.slug}`}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-square relative bg-gray-100">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">{product.name}</h3>
              <p className="text-green-600 font-bold">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 