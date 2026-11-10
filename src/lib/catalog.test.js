import { describe, expect, it } from 'vitest'
import { filterProducts, sortProducts } from './catalog.js'
import { products } from '../data/products.js'

const sampleProducts = [
  { id: 'mug', name: 'Morrow Mug', category: 'Home', price: 28, rating: 4.9, stock: 4, description: 'Handmade ceramic for coffee', tags: ['stoneware'] },
  { id: 'lamp', name: 'Arc Lamp', category: 'Home', price: 86, rating: 4.6, stock: 0, description: 'Portable evening light', tags: ['lighting'] },
  { id: 'bag', name: 'Canvas Carryall', category: 'Apparel', price: 34, rating: 4.8, stock: 9, description: 'Recycled cotton tote', tags: ['travel'] },
]

describe('filterProducts', () => {
  it('searches case-insensitively across product names and tags', () => {
    expect(filterProducts(sampleProducts, { query: 'STONEWARE' }).map((product) => product.id)).toEqual(['mug'])
    expect(filterProducts(sampleProducts, { query: 'home' })).toHaveLength(2)
  })

  it('combines category, maximum price, and in-stock filters', () => {
    const result = filterProducts(sampleProducts, {
      category: 'Home',
      maxPrice: 50,
      inStockOnly: true,
    })
    expect(result.map((product) => product.id)).toEqual(['mug'])
  })

  it('trims a query and returns all products for a blank search', () => {
    expect(filterProducts(sampleProducts, { query: '   ' })).toHaveLength(3)
  })

  it('searches product descriptions and respects inclusive price boundaries', () => {
    expect(filterProducts(sampleProducts, { query: 'portable evening light' }).map((product) => product.id)).toEqual(['lamp'])
    expect(filterProducts(sampleProducts, { minPrice: 28, maxPrice: 34 }).map((product) => product.id)).toEqual(['mug', 'bag'])
  })

  it('combines search, category, minimum and maximum price, and stock filters', () => {
    const result = filterProducts(sampleProducts, {
      query: 'cotton',
      category: 'Apparel',
      minPrice: 30,
      maxPrice: 40,
      inStockOnly: true,
    })
    expect(result.map((product) => product.id)).toEqual(['bag'])
  })

  it('returns an empty result when no product matches', () => {
    expect(filterProducts(sampleProducts, { query: 'not here' })).toEqual([])
  })

  it('returns apparel products from the catalog category', () => {
    const apparelProducts = filterProducts(products, { category: 'Apparel' })
    expect(apparelProducts.map((product) => product.id)).toEqual([
      'everyday-cotton-tee',
      'weekend-sweatshirt',
      'linen-overshirt',
      'relaxed-pocket-tee',
      'soft-knit-hoodie',
      'linen-shirt',
    ])
  })

  it('returns tshirt products from the tshirts category', () => {
    const tshirtProducts = filterProducts(products, { category: 'T-Shirts' })
    expect(tshirtProducts.map((product) => product.id)).toEqual([
      'classic-crew-tee',
      'oversized-graphic-tee',
      'ribbed-tee',
    ])
  })

  it('returns pant products from the pants category', () => {
    const pantsProducts = filterProducts(products, { category: 'Pants' })
    expect(pantsProducts.map((product) => product.id)).toEqual([
      'zudio-stretch-pants',
      'everyday-tailored-pants',
      'street-cargo-pants',
    ])
  })

  it('returns jacket products from the jackets category', () => {
    const jacketProducts = filterProducts(products, { category: 'Jackets' })
    expect(jacketProducts.map((product) => product.id)).toEqual([
      'packable-field-jacket',
      'classic-bomber',
    ])
  })

  it('returns shoe products from the shoes category', () => {
    const shoeProducts = filterProducts(products, { category: 'Shoes' })
    expect(shoeProducts.map((product) => product.id)).toEqual([
      'street-runner-sneakers',
      'city-walk-oxford',
    ])
  })

  it('returns cap products from the caps category', () => {
    const capProducts = filterProducts(products, { category: 'Caps' })
    expect(capProducts.map((product) => product.id)).toEqual([
      'classic-six-panel-cap',
      'washed-cotton-cap',
    ])
  })

  it('returns shirt products from the shirts category', () => {
    const shirtProducts = filterProducts(products, { category: 'Shirts' })
    expect(shirtProducts.map((product) => product.id)).toEqual([
      'classic-button-shirt',
      'slub-overshirt',
    ])
  })

  it('returns watch products from the watches category', () => {
    const watchProducts = filterProducts(products, { category: 'Watches' })
    expect(watchProducts.map((product) => product.id)).toEqual([
      'heritage-watch',
      'sport-digital-watch',
    ])
  })

  it('returns accessory products from the accessories category', () => {
    const accessoryProducts = filterProducts(products, { category: 'Accessories' })
    expect(accessoryProducts.map((product) => product.id)).toEqual([
      'classic-leather-belt',
      'sun-glass-sunglasses',
    ])
  })

  it('does not return any non-apparel products when filtering the catalog', () => {
    const nonApparelProducts = filterProducts(products, { category: 'Home' })
    expect(nonApparelProducts).toEqual([])
  })
})

describe('sortProducts', () => {
  it('sorts prices both ways without mutating the source array', () => {
    const originalOrder = sampleProducts.map((product) => product.id)
    expect(sortProducts(sampleProducts, 'price-asc').map((product) => product.id)).toEqual(['mug', 'bag', 'lamp'])
    expect(sortProducts(sampleProducts, 'price-desc').map((product) => product.id)).toEqual(['lamp', 'bag', 'mug'])
    expect(sampleProducts.map((product) => product.id)).toEqual(originalOrder)
  })

  it('sorts highest ratings first and leaves featured order unchanged', () => {
    expect(sortProducts(sampleProducts, 'rating').map((product) => product.id)).toEqual(['mug', 'bag', 'lamp'])
    expect(sortProducts(sampleProducts, 'featured')).toEqual(sampleProducts)
  })

  it('keeps featured order for an unknown sort option without reusing the input array', () => {
    const sorted = sortProducts(sampleProducts, 'unknown')

    expect(sorted).toEqual(sampleProducts)
    expect(sorted).not.toBe(sampleProducts)
  })
})