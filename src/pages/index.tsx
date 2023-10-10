import { useState, useEffect } from "react"
import { apiService } from "@/services/apiService"
import { Product } from "@/types"
import Link from "next/link"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [apiPage, setApiPage] = useState(1)

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    const fetchedProducts = await apiService.get(apiPage)

    if (apiPage === 1) {
      setProducts(fetchedProducts)
    } else {
      setProducts([...products, ...fetchedProducts])
    }

    setApiPage(apiPage + 1)
  }

  return (
    <div>
      {apiPage}
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              {product.id}
              <br />
              {product.name} - {product.price}
              <br />
              <Link className="text-sky-400" href={"/product/" + product.id}>
                página do produto
              </Link>
            </li>
          ))}
      </ul>
      <div>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow my-2"
          onClick={() => getProducts()}
        >
          Carregar mais
        </button>
      </div>
    </div>
  )
}
