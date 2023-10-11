import { useState } from "react"
import { apiService } from "@/services/apiService"
import { Product } from "@/types"
import Link from "next/link"
import { Banner, Listing } from "@/components"

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

  return (
    <div className="container mx-auto mt-10">
      <Banner />
      <Listing products={products} setProducts={setProducts} />
    </div>
  )
}
