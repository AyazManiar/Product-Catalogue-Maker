import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [productList, setProductList] = useState([
    {id: 1, name: 'Sample Product', imgUrl: 'sample.jpg', info: {}, category: 1}
  ])
  const [categoryList, setCategoryList] = useState([])

  return (
    <div className="App">
      <header>
        <h1>Product Catalogue Maker</h1>
      </header>
      <main>
        
      </main>
    </div>
  )
}

export default App
