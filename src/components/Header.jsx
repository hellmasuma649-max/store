import { ArrowUpRight, Search, ShoppingBag } from 'lucide-react'

export default function Header({ cartCount, onOpenCart, query, onQueryChange }) {
  return (
    <>
      <div className="announcement-bar">
        <span>Good things, made to last.</span>
        <span className="announcement-link">Free shipping on orders over $75 <ArrowUpRight size={13} /></span>
      </div>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Old Gold Outfitters home">OLD GOLD OUTFITTERS</a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#collection">Shop all</a>
            <a href="#collection">New arrivals</a>
            <a href="#collection">Our approach</a>
        </nav>
        <div className="header-actions">
          <label className="header-search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search products</span>
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search the shop"
              type="search"
            />
          </label>
          <button className="bag-button" onClick={onOpenCart} aria-label={`Open bag, ${cartCount} items`}>
            <ShoppingBag size={19} strokeWidth={1.7} />
            <span className="bag-label">Bag</span>
            <span className="bag-count">{cartCount}</span>
          </button>
        </div>
      </header>
    </>
  )
}