import HeroBanner from '@/components/HeroBanner'
import ProductGrid from '@/components/ProductGrid'
import { getTopDeals, getAllProducts } from '@/lib/products'
import { CATEGORIES } from '@/lib/types'
import Link from 'next/link'

export default function HomePage() {
  const topDeals = getTopDeals(8)
  const allProducts = getAllProducts()

  return (
    <>
      <HeroBanner />

      {/* Top deals */}
      <ProductGrid products={topDeals} title="🔥 Top Offerte del Momento" />

      {/* Categories showcase */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <h2 className="text-2xl font-black text-gray-900 mb-6">📂 Tutte le Categorie</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => {
            const count = allProducts.filter(p => p.category === cat.slug).length
            return (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="card p-6 text-center hover:border-brand-500 border border-transparent group"
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-gray-800 group-hover:text-brand-600">{cat.nameIT}</div>
                <div className="text-xs text-gray-400 mt-1">{count} offerte</div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Affiliate disclosure */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <p className="text-xs text-gray-400 bg-gray-100 rounded-lg p-3">
          ℹ️ <strong>Disclosure:</strong> PriceHunter partecipa a programmi di affiliazione. Cliccando sui link potremmo ricevere una commissione senza costi aggiuntivi per te. I prezzi sono aggiornati automaticamente ma potrebbero variare.
        </p>
      </div>
    </>
  )
}
