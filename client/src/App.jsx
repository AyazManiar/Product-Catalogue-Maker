// ...existing code...
import { useState, useMemo } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(0)

  const [productList, setProductList] = useState([
    {
      id: 1,
      name: "Balloon Set – Red",
      imgUrl: null,
      info: {
        color: "Red",
        size: "Medium",
        pack: "10 pieces"
      },
      category: 1
    },
    {
      id: 2,
      name: "Birthday Banner – Gold",
      imgUrl: null,
      info: {
        material: "Foil",
        length: "2 meters"
      },
      category: 1
    },
    {
      id: 3,
      name: "Party Hat – Glitter Blue",
      imgUrl: null,
      info: {
        color: "Blue",
        size: "Universal"
      },
      category: 2
    },
    {
      id: 4,
      name: "Cake Topper – Happy Birthday",
      imgUrl: null,
      info: {
        material: "Acrylic",
        color: "Gold"
      },
      category: 3
    }
  ]);

  const [categoryList, setCategoryList] = useState([
    { id: 0, name: "All" },
    { id: 1, name: "Decorations" },
    { id: 2, name: "Accessories" },
    { id: 3, name: "Cake Toppers" }
  ])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return productList.filter(p => {
      const inCategory = selectedCategory === 0 || p.category === selectedCategory
      const inSearch = !q || p.name.toLowerCase().includes(q) || Object.values(p.info).join(' ').toLowerCase().includes(q)
      return inCategory && inSearch
    })
  }, [productList, search, selectedCategory])

  const getCategoryName = (id) => categoryList.find(c => c.id === id)?.name || 'Unknown'

  return (
    <div className="App">
      <header className="site-header">
        <div className="brand">
          <h1>Product Catalogue Maker</h1>
        </div>
        <div className="header-actions">
          <button className="btn primary">Add product</button>
        </div>
      </header>

      <main className="container">
        <aside className="sidebar">
          <div className="search">
            <label className="sr-only" htmlFor="search">Search products</label>
            <input
              id="search"
              placeholder="Search products, color, size..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="categories">
            <h3>Categories</h3>
            <ul>
              {categoryList.map(cat => (
                <li key={cat.id}>
                  <button
                    className={`chip ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="stats">
            <p className="muted">Showing <strong>{filtered.length}</strong> of <strong>{productList.length}</strong> products</p>
          </div>
        </aside>

        <section className="content">
          <div className="grid">
            {filtered.map(product => (
              <article className="card" key={product.id}>
                <div className="card-media">
                  {product.imgUrl ? (
                    <img src={product.imgUrl} alt={product.name} />
                  ) : (
                    <div className="placeholder" aria-hidden>
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="4" fill="var(--accent)"/>
                        <path d="M7 14l3-3 2 2 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>

                <div className="card-body">
                  <div className="card-header">
                    <h4>{product.name}</h4>
                    <span className="badge">{getCategoryName(product.category)}</span>
                  </div>

                  <ul className="product-info">
                    {Object.entries(product.info).map(([k, v]) => (
                      <li key={k}><strong>{k}:</strong> <span>{v}</span></li>
                    ))}
                  </ul>

                  <div className="card-actions">
                    <button className="btn subtle">Edit</button>
                    <button className="btn outline">Duplicate</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty">
              <p>No products match your search. Try another term or select a different category.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
// ...existing code...