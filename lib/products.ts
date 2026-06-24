import productsData from '@/data/products.json'
import { Product, CATEGORIES } from '@/lib/types'

const products: Product[] = productsData as Product[]

export function getAllProducts(): Product[] {
  return products.sort((a, b) => b.discount - a.discount)
}

export function getTopDeals(limit = 8): Product[] {
  return getAllProducts().slice(0, limit)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products
    .filter(p => p.category === categorySlug)
    .sort((a, b) => b.discount - a.discount)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.titleIT.toLowerCase().includes(q) ||
    p.category.includes(q)
  )
}

export function getCategoryInfo(slug: string) {
  return CATEGORIES.find(c => c.slug === slug)
}

export function getTotalPriceWithShipping(product: Product): number {
  return product.currentPrice + product.shippingCost
}

export function getSourceLabel(source: Product['source']): string {
  const labels: Record<Product['source'], string> = {
    amazon: 'Amazon',
    aliexpress: 'AliExpress',
    temu: 'Temu',
    shein: 'Shein',
    ebay: 'eBay',
  }
  return labels[source]
}

export function getDeliveryLabel(days: number, locale = 'it'): string {
  if (days <= 5) return locale === 'it' ? '⚡ Consegna rapida EU' : '⚡ Fast EU delivery'
  if (days <= 15) return locale === 'it' ? '✈️ ~2 settimane' : '✈️ ~2 weeks'
  return locale === 'it' ? '🚢 Dalla Cina (~' + days + 'gg)' : '🚢 From China (~' + days + 'd)'
}
