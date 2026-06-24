interface Props {
  discount: number
  size?: 'sm' | 'lg'
}

export default function DiscountBadge({ discount, size = 'sm' }: Props) {
  const base = size === 'lg'
    ? 'text-base font-black px-3 py-1'
    : 'text-xs font-bold px-2 py-0.5'
  return (
    <span className={`${base} bg-red-500 text-white rounded-full`}>
      -{discount}%
    </span>
  )
}
