import ProductGrid from '@/components/ProductGrid'
import { searchProducts } from '@/lib/products'

interface Props {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: Props) {
  const query = searchParams.q || ''
  const results = query ? searchProducts(query) : []

  return (
    <div>
      <div className="bg-white border-b px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">
            {query ? `Risultati per "${query}"` : 'Cerca prodotti'}
          </h1>
          {query && (
            <p className="text-gray-500 mt-1">
              {results.length} risultati trovati
            </p>
          )}
        </div>
      </div>
      {results.length > 0 ? (
        <ProductGrid products={results} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-400">
          {query ? `Nessun risultato per "${query}"` : 'Inserisci un termine di ricerca'}
        </div>
      )}
    </div>
  )
}
