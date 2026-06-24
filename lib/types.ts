export interface Product {
  id: string
  title: string
  titleIT: string
  titleEN: string
  titleDE: string
  titleFR: string
  titleES: string
  category: string
  originalPrice: number
  currentPrice: number
  shippingCost: number
  currency: string
  discount: number          // percentuale sconto es. 65
  imageUrl: string
  affiliateUrl: string
  source: 'amazon' | 'aliexpress' | 'temu' | 'shein' | 'ebay'
  sourceCountry: string    // 'CN' | 'IT' | 'DE' | 'US' ecc.
  estimatedDeliveryDays: number
  rating: number
  reviewCount: number
  updatedAt: string        // ISO date
}

export interface Category {
  slug: string
  nameIT: string
  nameEN: string
  nameDE: string
  nameFR: string
  nameES: string
  icon: string
}

export const CATEGORIES: Category[] = [
  { slug: 'elettronica', nameIT: 'Elettronica', nameEN: 'Electronics', nameDE: 'Elektronik', nameFR: 'Électronique', nameES: 'Electrónica', icon: '📱' },
  { slug: 'moda', nameIT: 'Moda', nameEN: 'Fashion', nameDE: 'Mode', nameFR: 'Mode', nameES: 'Moda', icon: '👗' },
  { slug: 'casa-cucina', nameIT: 'Casa & Cucina', nameEN: 'Home & Kitchen', nameDE: 'Haus & Küche', nameFR: 'Maison & Cuisine', nameES: 'Hogar & Cocina', icon: '🏠' },
  { slug: 'sport', nameIT: 'Sport', nameEN: 'Sport', nameDE: 'Sport', nameFR: 'Sport', nameES: 'Deporte', icon: '⚽' },
  { slug: 'bellezza', nameIT: 'Bellezza', nameEN: 'Beauty', nameDE: 'Schönheit', nameFR: 'Beauté', nameES: 'Belleza', icon: '💄' },
  { slug: 'giocattoli', nameIT: 'Giocattoli', nameEN: 'Toys', nameDE: 'Spielzeug', nameFR: 'Jouets', nameES: 'Juguetes', icon: '🧸' },
  { slug: 'animali', nameIT: 'Animali', nameEN: 'Pets', nameDE: 'Haustiere', nameFR: 'Animaux', nameES: 'Mascotas', icon: '🐾' },
  { slug: 'auto-moto', nameIT: 'Auto & Moto', nameEN: 'Auto & Moto', nameDE: 'Auto & Motorrad', nameFR: 'Auto & Moto', nameES: 'Auto & Moto', icon: '🚗' },
]
