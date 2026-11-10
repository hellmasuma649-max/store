export function addToCart(cart, product, amount = 1) {
  if (!product || product.stock <= 0 || !Number.isInteger(amount) || amount <= 0) return cart

  const currentLine = cart.find((line) => line.productId === product.id)
  const currentQuantity = currentLine?.quantity ?? 0
  const nextQuantity = Math.min(currentQuantity + amount, product.stock)

  if (currentLine) {
    return cart.map((line) => (
      line.productId === product.id ? { ...line, quantity: nextQuantity } : line
    ))
  }

  return [...cart, { productId: product.id, quantity: nextQuantity }]
}

export function updateCartQuantity(cart, product, quantity) {
  if (!product) return cart

  if (!Number.isInteger(quantity)) return cart
  if (quantity <= 0 || product.stock <= 0) {
    return cart.filter((line) => line.productId !== product.id)
  }

  const nextQuantity = Math.min(quantity, product.stock)
  return cart.map((line) => (
    line.productId === product.id ? { ...line, quantity: nextQuantity } : line
  ))
}

export function getCartCount(cart) {
  return cart.reduce((total, line) => total + line.quantity, 0)
}

export function getCartTotal(cart, products) {
  const productById = new Map(products.map((product) => [product.id, product]))
  return cart.reduce((total, line) => {
    const product = productById.get(line.productId)
    return total + (product ? product.price * line.quantity : 0)
  }, 0)
}