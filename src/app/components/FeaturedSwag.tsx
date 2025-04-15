import { sanityFetch } from '@/lib/sanityFetch'

interface Product {
  _id: string
  name: string
  price: number
  image?: {
    asset: {
      url: string
    }
  }
}

export async function FeaturedSwag() {
  // Fetch up to 4 products
  const query = `*[_type == "product"][0...4]{
    _id,
    name,
    price,
    image {
      asset->{
        url
      }
    }
  }`
  const products = await sanityFetch<Product[]>({ query })

  if (!products.length) {
    return <div>No swag available at the moment.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product._id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          {product.image?.asset.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image.asset.url} alt={product.name} className="w-32 h-32 object-contain mb-2" />
          )}
          <div className="font-bold">{product.name}</div>
          <div className="text-green-700">${product.price.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
} 