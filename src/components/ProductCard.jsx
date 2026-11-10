import { Heart, Plus, Star } from 'lucide-react'

export default function ProductCard({ product, isWishlisted, onToggleWishlist, onAdd, onBuyNow }) {
  const soldOut = product.stock === 0

  return (
    <article className="product-card">
      <div className="product-image-wrap" style={{ backgroundColor: product.color }}>
        <img className="product-image" src={product.image} alt={product.imageAlt} loading="lazy" />
        {product.badge && <span className={`product-badge ${soldOut ? 'badge-muted' : ''}`}>{product.badge}</span>}
        <button
          className={`wishlist-button ${isWishlisted ? 'is-wishlisted' : ''}`}
          aria-label={`${isWishlisted ? 'Remove from' : 'Add to'} wishlist: ${product.name}`}
          aria-pressed={isWishlisted}
          onClick={() => onToggleWishlist(product.id)}
        >
          <Heart size={17} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        <button
          className="quick-add"
          aria-label={soldOut ? `${product.name} is sold out` : `Add ${product.name} to bag`}
          disabled={soldOut}
          onClick={() => onAdd(product)}
        >
          {soldOut ? 'Sold out' : <><Plus size={16} /> Add to bag</>}
        </button>
        <button
          className="buy-now-button"
          aria-label={soldOut ? `${product.name} is sold out` : `Buy ${product.name} now`}
          disabled={soldOut}
          onClick={() => onBuyNow(product)}
        >
          {soldOut ? 'Sold out' : 'Buy now'}
        </button>
      </div>
      <div className="product-info">
        <div className="product-title-row">
          <h3>{product.name}</h3>
          <span className="product-price">${product.price}</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span>{product.category}</span>
          <span className="rating"><Star size={13} fill="currentColor" /> {product.rating} <span className="review-count">({product.reviews})</span></span>
        </div>
      </div>
    </article>
  )
}