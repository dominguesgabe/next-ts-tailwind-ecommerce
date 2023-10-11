import { useState, MouseEvent } from "react"
import type { GetServerSideProps } from "next"
import { Product } from "@/types"
import { StorageObjectItem } from "@/factories"
import { StorageItem } from "@/types"
import { cartUtils } from "@/utils"
import { Breadcrumb } from "@/components"
import Image from "next/image"
import { ApiEnum } from "@/enums"

export async function getServerSideProps(context) {
  const productId = context.query.slug

  const response = await fetch(`http://localhost:3004/products?id=${productId}`)

  const product = await response.json()

  if (!product[0]) return { notFound: true }

  return { props: { product: product[0] } }
}
interface ProductPageProps {
  product: Product
}

export default function Product({ product }: ProductPageProps) {
  const [addCartQuantity, setAddCartQuantity] = useState(1)
  const imagePath = ApiEnum.BASE_PATH + product.image_url

  function addToCart() {
    const storageCart = localStorage.getItem("cart") ?? "[]"
    const actualCart: StorageItem[] = JSON.parse(storageCart)

    let newCart: StorageItem[]

    if (actualCart.length) {
      const isItemAlreadyInCart = actualCart.some(
        (item) => item.productId === product.id
      )

      if (isItemAlreadyInCart) {
        newCart = cartUtils.quantityModifier({
          cart: actualCart,
          targetProductId: product.id,
          newQuantity: 1,
        })
      } else {
        newCart = [...actualCart, new StorageObjectItem(product.id, 1)]
      }
    } else {
      newCart = [new StorageObjectItem(product.id, 1)]
    }

    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  function handleChangeItem(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
  }

  return (
    <div className={`container flex flex-col mx-auto`}>
      <Breadcrumb page={"product"} path={product.name} />
      <div className="w-full flex justify-between gap-28">
        <div className="bg-neutral-100 relative w-3/5 h-[600px] aspect-square rounded flex justify-center items-center">
          <Image
            loader={() => imagePath}
            src={imagePath}
            width={500}
            height={500}
            alt={product.name}
          />
        </div>
        <div className="w-2/5 ">
          <h1 className="mt-16 font-semibold text-2xl">{product.name}</h1>
          <div className="text-2xl mt-14">${product.price}</div>
          <div className="mt-6 text-sm pb-6 border-b border-neutral-400">
            {product.description}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="w-2/5 flex items-center">
              <button className="hover:text-white border border-neutral-400 hover:border-red-600 hover:bg-red-600 w-10 h-11 rounded-l text-lg">
                -
              </button>
              <input
                type="number"
                className="w-32 text-center border-y h-11 border-neutral-400"
              />
              <button className=" hover:text-white border border-neutral-400 hover:border-red-600 hover:bg-red-600 w-10 h-11 rounded-r text-lg">
                +
              </button>
            </div>
            <div className="w-2/5">
              <button
                onClick={addToCart}
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
                className="hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
