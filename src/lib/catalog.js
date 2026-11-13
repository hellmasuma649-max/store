export function filterProducts(products = [], filters = {}) {
  const {
    query = '',
    category = 'All items',
    minPrice = 0,
    maxPrice = Infinity,
    inStockOnly = false,
  } = filters ?? {}

  const normalizedQuery = String(query ?? '').trim().toLowerCase()
  const normalizedCategory = category ?? 'All items'
  const safeMinPrice = Number.isFinite(Number(minPrice)) ? Number(minPrice) : 0
  const safeMaxPrice = Number.isFinite(Number(maxPrice)) ? Number(maxPrice) : Infinity

  return (Array.isArray(products) ? products : []).filter((product) => {
    if (!product) return false

    const searchableText = [
      product.name,
      product.category,
      product.description,
      ...(product.tags ?? []),
    ].join(' ').toLowerCase()

    return (
      (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
      (normalizedCategory === 'All items' || product.category === normalizedCategory) &&
      Number(product.price) >= safeMinPrice &&
      Number(product.price) <= safeMaxPrice &&
      (!inStockOnly || Number(product.stock) > 0)
    )
  })
}

export function sortProducts(products = [], sortBy = 'featured') {
  const sorted = Array.isArray(products) ? [...products] : []

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'featured':
    default:
      return sorted
  }
}