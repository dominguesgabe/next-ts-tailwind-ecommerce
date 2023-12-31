import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import { ListingItem } from "@/components"
import { ApiEnum } from "@/enums"
import { Product } from "@/types"
import Link from "next/link"
import Head from "next/head"

export const getServerSideProps = (async (context) => {
  const query = context.query.name_like

  const response = await fetch(
    `${ApiEnum.BASE_PATH}/products?name_like=${query}`
  )
  const products: Product[] = await response.json()

  return { props: { products } }
}) satisfies GetServerSideProps<{ products: Product[] }>

export default function Search({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Search products</title>
        <meta name="keywords" content="Buy, Products, exclusive, Shopping" />
      </Head>
      <div className="container mx-auto px-2 sm:px-0 mt-10 flex flex-col gap-4">
        <div className="min-h-[600px]">
          <h1 className="text-xl font-medium">
            We found {products.length} result{products.length !== 1 ? "s" : ""}{" "}
            for your search.
          </h1>
          <ul className="flex flex-wrap w-full gap-x-9 mt-10">
            {products.map((product) => (
              <ListingItem product={product} key={product.id} />
            ))}
          </ul>
        </div>
        <div>
          <Link
            href={"/"}
            className="py-4 px-12 bg-white border rounded hover:border-gray-900 font-medium"
          >
            Return To Shop
          </Link>
        </div>
      </div>
    </>
  )
}
