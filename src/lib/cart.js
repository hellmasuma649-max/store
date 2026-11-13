export function addToCart(cart = [], product, amount = 1) {
  const safeCart = cart ?? []
  if (!Array.isArray(safeCart)) return []
  if (!product) return safeCart

  if (product.stock <= 0) {
    return safeCart.filter((line) => line.productId !== product.id)
  }

  if (!Number.isInteger(amount) || amount <= 0) return cart

  const currentLine = safeCart.find((line) => line.productId === product.id)
  const currentQuantity = currentLine?.quantity ?? 0
  const nextQuantity = Math.min(currentQuantity + amount, product.stock)

  if (currentLine) {
    return safeCart.map((line) => (
      line.productId === product.id ? { ...line, quantity: nextQuantity } : line
    ))
  }

  return [...safeCart, { productId: product.id, quantity: nextQuantity }]
}

export function updateCartQuantity(cart = [], product, quantity) {
  const safeCart = cart ?? []
  if (!Array.isArray(safeCart)) return []
  if (!product) return safeCart

  if (!Number.isInteger(quantity)) return safeCart
  if (quantity <= 0 || product.stock <= 0) {
    return safeCart.filter((line) => line.productId !== product.id)
  }

  const nextQuantity = Math.min(quantity, product.stock)
  return safeCart.map((line) => (
    line.productId === product.id ? { ...line, quantity: nextQuantity } : line
  ))
}

export function getCartCount(cart = []) {
  const safeCart = cart ?? []
  if (!Array.isArray(safeCart)) return 0
  return safeCart.reduce((total, line) => total + (Number.isFinite(line.quantity) ? line.quantity : 0), 0)
}

export function getCartTotal(cart = [], products = []) {
  const safeCart = cart ?? []
  const safeProducts = products ?? []
  if (!Array.isArray(safeCart) || !Array.isArray(safeProducts)) return 0

  const productById = new Map(safeProducts.map((product) => [product.id, product]))
  return safeCart.reduce((total, line) => {
    const product = productById.get(line.productId)
    const quantity = Number.isFinite(line.quantity) ? line.quantity : 0
    return total + (product ? product.price * quantity : 0)
  }, 0)
}