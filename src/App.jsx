import { useState } from 'react'
import { ArrowDown, ArrowUpRight, SlidersHorizontal, X } from 'lucide-react'
import Header from './components/Header.jsx'
import ProductCard from './components/ProductCard.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import { products } from './data/products.js'
import { filterProducts, sortProducts } from './lib/catalog.js'
import { addToCart, getCartCount, updateCartQuantity } from './lib/cart.js'

const categories = ['All items', 'Apparel', 'T-Shirts', 'Shirts', 'Pants', 'Jackets', 'Shoes', 'Caps', 'Watches', 'Accessories']
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
]

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All items')
  const [sortBy, setSortBy] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(150)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [cart, setCart] = useState([])
  const [wishlisted, setWishlisted] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const visibleProducts = sortProducts(filterProducts(products, {
    query,
    category,
    minPrice: 0,
    maxPrice,
    inStockOnly,
  }), sortBy)

  function toggleWishlist(productId) {
    setWishlisted((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId])
  }

  function clearFilters() {
    setQuery('')
    setCategory('All items')
    setMaxPrice(150)
    setInStockOnly(false)
  }

  const filters = (
    <>
      <div className="filter-group">
        <h3>Category</h3>
        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-option ${category === item ? 'active' : ''}`}
              onClick={() => { setCategory(item); setMobileFiltersOpen(false) }}
            >
              <span>{item}</span>
              {category === item && <span className="category-check">•</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group price-filter">
        <div className="filter-title-row"><h3>Price range</h3><span>Up to ${maxPrice}</span></div>
        <label className="sr-only" htmlFor="price-range">Maximum price</label>
        <input id="price-range" type="range" min="20" max="150" step="1" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
        <div className="range-labels"><span>$20</span><span>$150+</span></div>
      </div>
      <label className="stock-toggle">
        <input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} />
        <span className="toggle-track" aria-hidden="true"><span /></span>
        <span>In stock only</span>
      </label>
      <button className="clear-filters" onClick={clearFilters}>Clear all filters <X size={13} /></button>
    </>
  )

  return (
    <div id="top" className="app-shell">
      <Header cartCount={getCartCount(cart)} onOpenCart={() => setCartOpen(true)} query={query} onQueryChange={setQuery} />
      <main>
        <section id="collection" className="collection-section">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">The OLD GOLD OUTFITTERS edit / Spring 2025</p>
              <h2>Find your <em>everyday.</em></h2>
            </div>
            <p className="collection-note">Useful by nature. Loved for longer.</p>
          </div>
          <div className="collection-toolbar">
            <div className="results-label"><span className="result-dot" /> Showing <strong>{visibleProducts.length}</strong> of {products.length} pieces</div>
            <div className="toolbar-controls">
              <button className="mobile-filter-button" onClick={() => setMobileFiltersOpen(true)}><SlidersHorizontal size={15} /> Filters</button>
              <label className="sort-control"><span>Sort by</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products">
                {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select></label>
            </div>
          </div>
          <div className="catalog-layout">
            <aside className="filter-sidebar" aria-label="Product filters">{filters}</aside>
            <div className="catalog-main">
              {visibleProducts.length ? (
                <div className="product-grid">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlisted.includes(product.id)}
                      onToggleWishlist={toggleWishlist}
                      onAdd={(item) => setCart((current) => addToCart(current, item))}
                      onBuyNow={(item) => {
                        setCart((current) => addToCart(current, item))
                        setCartOpen(true)
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <span className="no-results-mark">Z.</span>
                  <h3>Nothing on this shelf.</h3>
                  <p>Try a different search or loosen your filters.</p>
                  <button className="text-action" onClick={clearFilters}>Clear filters <span>→</span></button>
                </div>
              )}
              <div className="collection-footer"><span>Thoughtful by design, made to be used.</span><span>Showing {visibleProducts.length} of {products.length} objects</span></div>
            </div>
          </div>
        </section>
        <section className="promise-strip">
          <span>Less, but better.</span><span>Made with intention.</span><span>Here for the long run.</span>
        </section>
      </main>
      <footer className="site-footer"><a className="wordmark" href="#top">OLD GOLD OUTFITTERS</a><span>Objects for everyday living.</span><span>© 2025 OLD GOLD OUTFITTERS</span></footer>

      {cartOpen && <CartDrawer cart={cart} products={products} onClose={() => setCartOpen(false)} onQuantityChange={(product, quantity) => setCart((current) => updateCartQuantity(current, product, quantity))} />}
      {mobileFiltersOpen && <div className="mobile-filter-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setMobileFiltersOpen(false)}>
        <aside className="mobile-filter-panel" aria-label="Product filters">
          <div className="mobile-filter-heading"><h2>Filters</h2><button className="icon-button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters"><X size={19} /></button></div>
          {filters}
        </aside>
      </div>}
    </div>
  )
}