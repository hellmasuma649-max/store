import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { getCartCount, getCartTotal } from '../lib/cart.js'

export default function CartDrawer({ cart, products, onClose, onQuantityChange }) {
  const lines = cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId)
    return product ? [{ ...line, product }] : []
  })
  const itemCount = getCartCount(cart)
  const subtotal = getCartTotal(cart, products)

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer-heading">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2 id="cart-title">Shopping bag <span>({itemCount})</span></h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close bag"><X size={20} /></button>
        </div>
        {lines.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-cart-icon"><ShoppingBag size={24} /></span>
            <h3>Your bag is taking a breather.</h3>
            <p>Find something lovely for your everyday.</p>
            <button className="text-action" onClick={onClose}>Explore the collection <span>→</span></button>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map(({ product, quantity }) => (
                <div className="cart-line" key={product.id}>
                  <img src={product.image} alt={product.imageAlt} />
                  <div className="cart-line-copy">
                    <p className="cart-line-category">{product.category}</p>
                    <h3>{product.name}</h3>
                    <span>${product.price}</span>
                    <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                      <button aria-label={`Decrease ${product.name} quantity`} onClick={() => onQuantityChange(product, quantity - 1)}><Minus size={13} /></button>
                      <span>{quantity}</span>
                      <button aria-label={`Increase ${product.name} quantity`} onClick={() => onQuantityChange(product, quantity + 1)}><Plus size={13} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
              <p>Shipping and any applicable taxes are calculated at checkout.</p>
              <button className="checkout-button" onClick={() => window.alert('Thanks for exploring OLD GOLD OUTFITTERS. Checkout is a demo.')}> 
                Continue to checkout <span>→</span>
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}