export default function HeroBanner() {
  return (
    <div className="bg-gradient-to-r from-brand-500 to-orange-400 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          🔥 Offerte Incredibili
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-6">
          I prezzi più bassi da Amazon, AliExpress, Temu e altri.<br/>
          Aggiornati ogni 6 ore.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
          <div className="bg-white/20 rounded-full px-4 py-2">✅ 100% Link Ufficiali</div>
          <div className="bg-white/20 rounded-full px-4 py-2">✈️ Spedizione dalla Cina</div>
          <div className="bg-white/20 rounded-full px-4 py-2">💰 Fino all'86% di Sconto</div>
        </div>
      </div>
    </div>
  )
}
