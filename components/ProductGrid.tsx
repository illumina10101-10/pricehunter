import ProductCard from '@/components/ProductCard'
import { Product } from '@/lib/types'

interface Props {
  products: Product[]
  title?: string
}

export default function ProductGrid({ products, title }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {title && (
        <h2 className="text-2xl font-black text-gray-900 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
