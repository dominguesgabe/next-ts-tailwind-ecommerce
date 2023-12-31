import type { InferGetServerSidePropsType, GetServerSideProps } from "next"
import { useState, MouseEvent } from "react"
import { Product } from "@/types"
import { cartUtils } from "@/utils"
import { Breadcrumb } from "@/components"
import { ApiEnum } from "@/enums"
import Image from "next/image"
import Head from "next/head"
import { useRouter } from "next/router"

export const getServerSideProps = (async (context) => {
  const productId = context.query.slug

  const response = await fetch(`${ApiEnum.BASE_PATH}/products?id=${productId}`)
  const product = await response.json()

  if (!product[0]) return { notFound: true }

  return { props: { product: product[0] } }
}) satisfies GetServerSideProps<{ product: Product }>

export default function Product({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [newQuantity, setNewQuantity] = useState(1)
  const imagePath = ApiEnum.BASE_PATH + product.image_url
  const router = useRouter()

  function handleAddToCart() {
    const actualCart = cartUtils.getStorageCart()

    let newCart: Product[]

    if (actualCart.length) {
      const actualItemInCart = actualCart.find((item) => item.id === product.id)

      if (actualItemInCart) {
        const newItem = cartUtils.addQuantityToItem({
          item: actualItemInCart,
          newQuantity,
        })

        newCart = cartUtils.replaceExistingItem({
          cart: actualCart,
          item: newItem,
        })
      } else {
        newCart = [
          ...actualCart,
          {
            ...product,
            quantity: newQuantity,
          },
        ]
      }
    } else {
      newCart = [
        {
          ...product,
          quantity: newQuantity,
        },
      ]
    }

    cartUtils.setStorageCart(newCart)
    setNewQuantity(1)
    router.push(`/product/${product.id}`)
  }

  function handleChangeItemClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    const clickedButton = event.target as HTMLButtonElement
    const operator = clickedButton.innerText

    if (newQuantity > 1 || operator !== "-") {
      setNewQuantity(eval(newQuantity + operator + 1))
    }
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta
          property="og:title"
          name={product.name}
          content="Buy, Products, exclusive, Shopping"
        />
        <meta name="description" content={product.description} />
      </Head>
      <div className="container flex flex-col mx-auto px-2 sm:px-0">
        <Breadcrumb page={"product"} path={product.name} />
        <div className="w-full flex justify-between flex-col xl:flex-row gap-20 xl:gap-28">
          <div className="bg-neutral-100 w-full xl:w-3/5 h-[600px] aspect-square rounded flex justify-center items-center">
            <Image
              loader={() => imagePath}
              src={imagePath}
              width={370}
              height={500}
              alt={product.name}
            />
          </div>
          <div className="w-full xl:w-2/5">
            <h1 className="mt-0 xl:mt-16 font-semibold text-2xl">
              {product.name}
            </h1>
            <div className="text-2xl mt-14">${product.price}</div>
            <div className="mt-6 text-sm pb-6 border-b border-neutral-400">
              {product.description}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center font-medium">
                <button
                  onClick={handleChangeItemClick}
                  className="hover:text-white border border-neutral-400 hover:border-red-600 hover:bg-red-600 w-10 h-11 rounded-l text-lg"
                >
                  -
                </button>
                <input
                  value={newQuantity}
                  min={1}
                  onChange={(event) =>
                    setNewQuantity(Number(event.target.value))
                  }
                  className="w-20 text-center border-y h-11 border-neutral-400"
                />
                <button
                  onClick={handleChangeItemClick}
                  className=" hover:text-white border border-neutral-400 hover:border-red-600 hover:bg-red-600 w-10 h-11 rounded-r text-lg"
                >
                  +
                </button>
              </div>
              <div className="w-2/5">
                <button
                  onClick={handleAddToCart}
                  className="w-full h-11 bg-red-600 text-white hover:bg-red-400 rounded"
                >
                  Add to cart
                </button>
              </div>
              <div>
                <Image
                  src={"/ProductPageWishlistButton.svg"}
                  width={42}
                  height={42}
                  alt="Add to your Wishlist"
                  className="hover:cursor-pointer hover:opacity-80"
                />
              </div>
            </div>
            <div className="mt-10 w-full rounded divide-y divide-neutral-400 border border-neutral-400 ">
              <div className="px-4 py-6 flex  items-center gap-x-4">
                <Image
                  src={"/Delivery.svg"}
                  width={40}
                  height={40}
                  alt="Free delivery"
                  className=""
                />
                <div className="font-medium">
                  <div>Free Delivery</div>
                  <div className="underline text-xs">
                    Enter your postal code for Delivery Availability
                  </div>
                </div>
              </div>
              <div className="px-4 py-6 flex  items-center gap-x-4">
                <Image
                  src={"/ReturnDelivery.svg"}
                  width={40}
                  height={40}
                  alt="Free delivery"
                  className=""
                />
                <div className="font-medium">
                  <div>Return Delivery</div>
                  <div className="text-xs">
                    Free 30 Days Delivery Returns.{" "}
                    <span className="underline">Details</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
