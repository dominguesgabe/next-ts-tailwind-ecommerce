import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import { useState } from "react"
import { Product } from "@/types"
import { MainBanner, Listing, LimitedTimeOffer } from "@/components"
import { ApiEnum } from "@/enums"
import Head from "next/head"

export const getServerSideProps = (async () => {
  const response = await fetch(`${ApiEnum.BASE_PATH}/products?_page=1&_limit=4`)
  const products: Product[] = await response.json()

  return { props: { data: products } }
}) satisfies GetServerSideProps<{ data: Product[] }>

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [products, setProducts] = useState<Product[]>(data)

  return (
    <>
      <Head>
        <title>Exclusive E-commerce</title>
        <meta
          property="og:title"
          name="description"
          content="Buy, Products, exclusive, Shopping"
        />
      </Head>
      <div className="container mx-auto mt-10 px-2 sm:px-0">
        <MainBanner />
        <Listing products={products} setProducts={setProducts} />
        <LimitedTimeOffer />
      </div>
    </>
  )
}
