import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types'
import { getTotalPriceWithShipping, getSourceLabel, getDeliveryLabel } from '@/lib/products'
import DiscountBadge from '@/components/DiscountBadge'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const totalPrice = getTotalPriceWithShipping(product)
  const deliveryLabel = getDeliveryLabel(product.estimatedDeliveryDays)

  return (
    <div className="card group flex flex-col">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <div className="absolute top-2 left-2 z-10">
          <DiscountBadge discount={product.discount} />
        </div>
        <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">
          {/* Fallback emoji per immagini demo */}
          🛍️
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
          {product.titleIT}
        </p>

        {/* Prices */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black text-brand-600">
            €{totalPrice.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 line-through">
            €{product.originalPrice.toFixed(2)}
          </span>
        </div>

        {product.shippingCost > 0 && (
          <p className="text-xs text-gray-500">
            (di cui €{product.shippingCost.toFixed(2)} spediz.)
          </p>
        )}

        {/* Source + delivery */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
          <span className="bg-gray-100 rounded px-1.5 py-0.5">
            {getSourceLabel(product.source)}
          </span>
          <span>{deliveryLabel}</span>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span className="text-yellow-400">★</span>
          <span>{product.rating}</span>
          <span>({product.reviewCount.toLocaleString('it-IT')})</span>
        </div>

        {/* CTA */}
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="btn-primary text-center text-sm mt-1"
        >
          Vai all'offerta →
        </a>
      </div>
    </div>
  )
}
