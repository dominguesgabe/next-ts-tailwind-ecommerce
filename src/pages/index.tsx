import { useState } from "react"
import { Product } from "@/types"
import { MainBanner, Listing, LimitedTimeOffer } from "@/components"

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
      <MainBanner />
      <Listing products={products} setProducts={setProducts} />
      <LimitedTimeOffer />
    </div>
  )
}
