import { useState, Dispatch, SetStateAction } from "react"
import { Product } from "@/types"
import { apiService } from "@/services"
import { ListingItem, ListingTitle } from "@/components"

interface ListingParams {
  products: Product[]
  setProducts: Dispatch<SetStateAction<Product[]>>
}
export function Listing({ products, setProducts }: ListingParams) {
  const [nextApiPage, setNextApiPage] = useState(2)

  async function getProducts() {
    const fetchedProducts = await apiService.get(nextApiPage)

    setProducts([...products, ...fetchedProducts])
    setNextApiPage(nextApiPage + 1)
  }
  return (
    <section className="mt-36">
      <ListingTitle />
      <div className="mt-16">
        <ul className="flex justify-between flex-wrap">
          {products.map((product) => (
            <ListingItem product={product} key={product.id} />
          ))}
        </ul>
      </div>
      <div className="mt-6 pb-10 border-b text-center">
        <button
          disabled={nextApiPage > 3}
          className="py-4 px-12 text-white bg-red-600 rounded enabled:hover:bg-red-500 disabled:bg-red-300"
          onClick={() => getProducts()}
        >
          See more
        </button>
      </div>
    </section>
  )
}
