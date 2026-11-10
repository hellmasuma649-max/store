export function filterProducts(products, filters = {}) {
  const {
    query = '',
    category = 'All items',
    minPrice = 0,
    maxPrice = Infinity,
    inStockOnly = false,
  } = filters
  const normalizedQuery = query.trim().toLowerCase()

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.category,
      product.description,
      ...(product.tags ?? []),
    ].join(' ').toLowerCase()

    return (
      (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
      (category === 'All items' || product.category === category) &&
      product.price >= minPrice &&
      product.price <= maxPrice &&
      (!inStockOnly || product.stock > 0)
    )
  })
}

export function sortProducts(products, sortBy = 'featured') {
  const sorted = [...products]

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