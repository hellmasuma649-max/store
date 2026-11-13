import { describe, expect, it } from 'vitest'
import { addToCart, getCartCount, getCartTotal, updateCartQuantity } from './cart.js'

const mug = { id: 'mug', price: 28, stock: 3 }
const lamp = { id: 'lamp', price: 86, stock: 2 }

describe('cart operations', () => {
  it('adds products and increments an existing line', () => {
    const first = addToCart([], mug)
    expect(first).toEqual([{ productId: 'mug', quantity: 1 }])
    expect(addToCart(first, mug, 2)).toEqual([{ productId: 'mug', quantity: 3 }])
  })

  it('does not exceed inventory and ignores unavailable products', () => {
    expect(addToCart([{ productId: 'mug', quantity: 2 }], mug, 5)).toEqual([{ productId: 'mug', quantity: 3 }])
    expect(addToCart([], { ...lamp, stock: 0 })).toEqual([])
  })

  it('keeps additions within stock across repeated attempts', () => {
    const cart = [{ productId: 'mug', quantity: 2 }]
    const fullCart = addToCart(cart, mug)

    expect(fullCart).toEqual([{ productId: 'mug', quantity: 3 }])
    expect(addToCart(fullCart, mug)).toEqual(fullCart)
  })

  it('ignores non-integer add amounts and quantity updates', () => {
    const cart = [{ productId: 'mug', quantity: 1 }]
    expect(addToCart(cart, mug, 1.5)).toBe(cart)
    expect(addToCart(cart, mug, Number.NaN)).toBe(cart)
    expect(updateCartQuantity(cart, mug, 2.5)).toBe(cart)
    expect(updateCartQuantity(cart, mug, Number.NaN)).toBe(cart)
  })

  it('ignores zero and negative add amounts', () => {
    const cart = [{ productId: 'mug', quantity: 1 }]

    expect(addToCart(cart, mug, 0)).toBe(cart)
    expect(addToCart(cart, mug, -1)).toBe(cart)
  })

  it('updates quantities, clamps to stock, and removes zero-count lines', () => {
    const cart = [{ productId: 'mug', quantity: 1 }, { productId: 'lamp', quantity: 1 }]
    expect(updateCartQuantity(cart, mug, 8)[0].quantity).toBe(3)
    expect(updateCartQuantity(cart, mug, 0)).toEqual([{ productId: 'lamp', quantity: 1 }])
  })

  it('does not add a line when updating a product that is not in the cart', () => {
    expect(updateCartQuantity([], mug, 2)).toEqual([])
  })

  it('removes a line when its product becomes unavailable', () => {
    const cart = [{ productId: 'lamp', quantity: 1 }]
    expect(updateCartQuantity(cart, { ...lamp, stock: 0 }, 1)).toEqual([])
  })

  it('derives item count and subtotal from current cart lines', () => {
    const cart = [{ productId: 'mug', quantity: 2 }, { productId: 'lamp', quantity: 1 }]
    expect(getCartCount(cart)).toBe(3)
    expect(getCartTotal(cart, [mug, lamp])).toBe(142)
  })

  it('does not mutate the existing cart when adding or updating', () => {
    const cart = [{ productId: 'mug', quantity: 1 }]
    addToCart(cart, mug)
    updateCartQuantity(cart, mug, 2)
    expect(cart).toEqual([{ productId: 'mug', quantity: 1 }])
  })

  it('ignores stale product IDs when calculating subtotal', () => {
    expect(getCartTotal([{ productId: 'removed', quantity: 2 }], [mug])).toBe(0)
  })

  it('handles missing cart and product payloads defensively', () => {
    expect(addToCart(undefined, mug, 1)).toEqual([{ productId: 'mug', quantity: 1 }])
    expect(updateCartQuantity(undefined, mug, 2)).toEqual([])
    expect(getCartCount(undefined)).toBe(0)
    expect(getCartTotal(undefined, [mug])).toBe(0)
    expect(addToCart([{ productId: 'mug', quantity: 1 }], { ...mug, stock: 0 }, 1)).toEqual([])
  })
})