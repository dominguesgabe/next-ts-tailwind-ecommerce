import { useState, MouseEvent, ChangeEvent } from "react"
import { Product } from "@/types"
import { StorageObjectItem } from "@/factories"
import { StorageItem } from "@/types"
import { cartUtils } from "@/utils"
import { Breadcrumb } from "@/components"
import { ApiEnum } from "@/enums"
import Image from "next/image"

export async function getServerSideProps(context) {
  const productId = context.query.slug

  const response = await fetch(`http://localhost:3004/products?id=${productId}`)

  const product = await response.json()

  if (!product[0]) return { notFound: true }

  return { props: { product: product[0] } }
}
interface ProductPageParams {
  product: Product
}

export default function Product({ product }: ProductPageParams) {
  const [cartQuantity, setCartQuantity] = useState(1)
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
          newQuantity: cartQuantity,
        })
      } else {
        newCart = [
          ...actualCart,
          new StorageObjectItem(product.id, cartQuantity),
        ]
      }
    } else {
      newCart = [new StorageObjectItem(product.id, cartQuantity)]
    }

    localStorage.setItem("cart", JSON.stringify(newCart))
    setCartQuantity(1)
  }

  function handleChangeItemClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    const clickedButton = event.target as HTMLButtonElement
    const operator = clickedButton.innerText

    if (cartQuantity > 1 || operator !== "-") {
      setCartQuantity(eval(cartQuantity + operator + 1))
    }
  }

  return (
    <div className="container flex flex-col mx-auto">
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
            <div className="w-2/5 flex items-center font-medium">
              <button
                onClick={handleChangeItemClick}
                className="hover:text-white border border-neutral-400 hover:border-red-600 hover:bg-red-600 w-10 h-11 rounded-l text-lg"
              >
                -
              </button>
              <input
                value={cartQuantity}
                min={1}
                onChange={(event) =>
                  setCartQuantity(Number(event.target.value))
                }
                className="w-32 text-center border-y h-11 border-neutral-400"
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
  )
}
