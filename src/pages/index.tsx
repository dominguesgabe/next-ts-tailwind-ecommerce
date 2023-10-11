import { useState } from "react"
import { apiService } from "@/services/apiService"
import { Product } from "@/types"
import Link from "next/link"

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3004/products?_page=1&_limit=4")
  const products = await res.json()

  return { props: { data: products } }
}
interface HomeProps {
  data: Product[]
}

export default function Home({ data }: HomeProps) {
  const [products, setProducts] = useState<Product[]>(data)
  const [nextApiPage, setNextApiPage] = useState(2)

  async function getProducts() {
    const fetchedProducts = await apiService.get(nextApiPage)

    if (nextApiPage === 1) {
      setProducts(fetchedProducts)
    } else {
      setProducts([...products, ...fetchedProducts])
    }

    setNextApiPage(nextApiPage + 1)
  }

  return (
    <div>
      {nextApiPage}
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
