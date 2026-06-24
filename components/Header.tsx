'use client'
import Link from 'next/link'
import { useState } from 'react'
import { CATEGORIES } from '@/lib/types'

export default function Header() {
  const [search, setSearch] = useState('')

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-black text-brand-500">🔥 PriceHunter</span>
          </Link>

          {/* Search */}
          <form action="/cerca" method="get" className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                name="q"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cerca prodotti..."
                className="w-full border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-500">
                🔍
              </button>
            </div>
          </form>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link href="/offerte" className="text-brand-500 hover:text-brand-700">🔥 Offerte</Link>
            <Link href="/categorie" className="text-gray-600 hover:text-brand-500">Categorie</Link>
          </nav>
        </div>

        {/* Categories bar */}
        <div className="flex gap-3 mt-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="shrink-0 text-xs bg-gray-100 hover:bg-brand-50 hover:text-brand-600 rounded-full px-3 py-1 transition-colors"
            >
              {cat.icon} {cat.nameIT}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
