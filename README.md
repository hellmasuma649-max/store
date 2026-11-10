# ZUDIO Commerce Explorer

A responsive React storefront for discovering everyday products. Vite serves and builds the app, Tailwind CSS is configured for utility styling, and Vitest covers catalog and cart rules.

## Architecture

```text
index.html
  └── src/main.jsx             React entry point and global styles
      └── src/App.jsx           Page composition and transient UI state
          ├── components/       Header, product cards, cart drawer
          ├── data/products.js  Local product catalog
          └── lib/              Pure, independently tested domain logic
              ├── catalog.js    Search, filtering, and sorting
              └── cart.js       Inventory-aware cart updates and totals

src/lib/*.test.js               Vitest logic tests
```

The UI owns search, filter, wishlist, and open/closed state. Catalog and cart operations stay in pure functions so business rules can be tested without rendering React or depending on a backend. Product data is currently local; checkout is a demo and cart state is session-only.

## Build plan

1. **Product discovery (complete):** responsive catalog, search, category/price/stock filters, sorting, and empty results.
2. **Cart foundations (complete):** add/update quantities, enforce inventory, and derive item count and subtotal.
3. **Logic verification (complete):** Vitest covers filter combinations and boundaries, sorting behavior, inventory limits, invalid quantities, and totals.
4. **Next:** add persistence and a real product/checkout API only when those integrations are in scope.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

## Logic coverage

- Search is case-insensitive across names, categories, descriptions, and tags.
- Category, inclusive price bounds, and in-stock filters combine.
- Sorting returns a copy and supports featured, price, and rating order.
- Cart additions and updates respect stock and integer quantities; zero removes a line.
- Item count and subtotal are derived from cart contents; removed product IDs are ignored in totals.
