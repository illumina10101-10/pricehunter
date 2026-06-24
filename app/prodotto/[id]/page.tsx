import { notFound } from 'next/navigation'
import { getAllProducts, getProductById, getTotalPriceWithShipping, getSourceLabel, getDeliveryLabel } from '@/lib/products'
import DiscountBadge from '@/components/DiscountBadge'

interface Props {
  params: { id: string }
}

export async function generateStaticParams() {
  return getAllProducts().map(p => ({ id: p.id }))
}

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id)
  if (!product) notFound()

  const total = getTotalPriceWithShipping(product)
  const savings = product.originalPrice - product.currentPrice

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image placeholder */}
          <div className="md:w-80 aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-8xl shrink-0">
            🛍️
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{product.titleIT}</h1>
              <DiscountBadge discount={product.discount} size="lg" />
            </div>

            {/* Price block */}
            <div className="bg-brand-50 rounded-xl p-4 mb-6">
              <div className="text-4xl font-black text-brand-600 mb-1">
                €{total.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                Prezzo originale: <span className="line-through">€{product.originalPrice.toFixed(2)}</span>
                {' '}— risparmi <span className="text-green-600 font-semibold">€{savings.toFixed(2)}</span>
              </div>
              {product.shippingCost > 0 && (
                <div className="text-xs text-gray-400 mt-1">
                  Include €{product.shippingCost.toFixed(2)} di spedizione
                </div>
              )}
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-400 text-xs mb-1">Venditore</div>
                <div className="font-semibold">{getSourceLabel(product.source)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-400 text-xs mb-1">Spedizione</div>
                <div className="font-semibold">{getDeliveryLabel(product.estimatedDeliveryDays)}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-400 text-xs mb-1">Valutazione</div>
                <div className="font-semibold">⭐ {product.rating} ({product.reviewCount.toLocaleString('it-IT')} rec.)</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-gray-400 text-xs mb-1">Provenienza</div>
                <div className="font-semibold">{product.sourceCountry === 'CN' ? '🇨🇳 Cina' : '🇪🇺 Europa'}</div>
              </div>
            </div>

            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary w-full text-center text-base py-4 block"
            >
              🛒 Vai all'offerta su {getSourceLabel(product.source)} →
            </a>

            <p className="text-xs text-gray-400 mt-3 text-center">
              Link affiliato — i prezzi possono variare
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
