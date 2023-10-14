import { useState } from "react"
import { Product } from "@/types"
import { MainBanner, Listing, LimitedTimeOffer } from "@/components"
import { ApiEnum } from "@/enums"
import Head from "next/head"

export async function getServerSideProps() {
  const res = await fetch(`${ApiEnum.BASE_PATH}/products?_page=1&_limit=4`)
  const products = await res.json()

  return { props: { data: products } }
}
interface HomeProps {
  data: Product[]
}

export default function Home({ data }: HomeProps) {
  const [products, setProducts] = useState<Product[]>(data)

  return (
    <>
      <Head>
        <title>Exclusive E-commerce</title>
        <meta name="keywords" content="Buy, Products, exclusive, Shopping" />
      </Head>
      <div className="container mx-auto mt-10 px-2 sm:px-0">
        <MainBanner />
        <Listing products={products} setProducts={setProducts} />
        <LimitedTimeOffer />
      </div>
    </>
  )
}
