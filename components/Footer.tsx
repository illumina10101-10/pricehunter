import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">🔥 PriceHunter</h3>
            <p className="text-sm">Aggregatore di offerte da Amazon, AliExpress, Temu e altri. Prezzi aggiornati ogni 6 ore.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Categorie</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/categoria/elettronica" className="hover:text-white">📱 Elettronica</Link></li>
              <li><Link href="/categoria/moda" className="hover:text-white">👗 Moda</Link></li>
              <li><Link href="/categoria/casa-cucina" className="hover:text-white">🏠 Casa & Cucina</Link></li>
              <li><Link href="/categoria/sport" className="hover:text-white">⚽ Sport</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Info</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/cookie" className="hover:text-white">Cookie Policy</Link></li>
              <li><Link href="/affiliate" className="hover:text-white">Disclosure Affiliate</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-xs text-center">
          <p>© 2026 PriceHunter. I prezzi e la disponibilità possono variare. PriceHunter partecipa al Programma Affiliazione di Amazon EU, AliExpress e altri merchant.</p>
        </div>
      </div>
    </footer>
  )
}
