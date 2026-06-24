import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import { getProductsByCategory, getCategoryInfo } from '@/lib/products'
import { CATEGORIES } from '@/lib/types'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({ slug: cat.slug }))
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryInfo(params.slug)
  if (!category) notFound()

  const products = getProductsByCategory(params.slug)

  return (
    <div>
      <div className="bg-white border-b px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-black">
            {category.icon} {category.nameIT}
          </h1>
          <p className="text-gray-500 mt-1">{products.length} offerte trovate, ordinate per sconto</p>
        </div>
      </div>
      <ProductGrid products={products} />
    </div>
  )
}
