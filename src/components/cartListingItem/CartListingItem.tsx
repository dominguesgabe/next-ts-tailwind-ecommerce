import {
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react"
import { ApiEnum } from "@/enums"
import { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { cartUtils } from "@/utils"
import { NextRouter } from "next/router"

interface CartListingItemParams {
  product: Product
  cartItems: Product[]
  setCartItems: Dispatch<SetStateAction<Product[]>>
}

export function CartListingItem({
  product,
  cartItems,
  setCartItems,
}: CartListingItemParams) {
  const imagePath = ApiEnum.BASE_PATH + product.image_url
  const subtotal = (product.price * product.quantity).toFixed(2)
  const [productQuantity, setProductQuantity] = useState(product.quantity)

  useEffect(() => {
    if (!productQuantity) return

    const updatedItem = cartUtils.modifyItemQuantity({
      product: product,
      newQuantity: productQuantity,
    })
    const updatedCart = cartUtils.replaceExistingItem({
      cart: cartItems,
      item: updatedItem,
    })

    setCartItems(updatedCart)
  }, [productQuantity])

  function handleChangeCartItem(event: ChangeEvent<HTMLInputElement>) {
    const newQuantity = Number(event.target.value)

    if (newQuantity > 0) {
      setProductQuantity(newQuantity)
    }
  }

  function handleRemoveCartItem() {
    const updatedCart = cartUtils.removeExistingItem({
      cart: cartItems,
      item: product,
    })

    setCartItems(updatedCart)
  }

  return (
    <tr className="px-10 py-6 grid grid-cols-4 grid-flow-row items-center rounded drop-shadow bg-white">
      <td className="flex gap-x-4 items-center">
        <div className="relative">
          <Link href={`/product/${product.id}`} className="cursor-pointer">
            <Image
              loader={() => imagePath}
              src={imagePath}
              width={38}
              height={28}
              alt={product.name}
            />
          </Link>
          {product.quantity === 1 && (
            <Image
              src={"/CancelItem.svg"}
              width={28}
              height={28}
              alt="Remove product"
              className="absolute -top-2 -left-2 hover:cursor-pointer"
              onClick={handleRemoveCartItem}
            />
          )}
        </div>
        <div>{product.name}</div>
      </td>
      <td className="text-center">${product.price}</td>
      <td className="flex justify-center">
        <div className="relative w-16">
          <input
            className="border rounded w-16 py-2 pl-4 pr-5"
            min={1}
            onChange={handleChangeCartItem}
            value={productQuantity}
          />
          <div className="h-8 w-6 absolute top-0 bottom-0 right-0 m-auto">
            <Image
              src={"/DropUpSmall.svg"}
              width={16}
              height={16}
              alt="Increase product quantity"
              className="rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => setProductQuantity(productQuantity + 1)}
            />
            <Image
              src={"/DropDownSmall.svg"}
              width={16}
              height={16}
              alt="Decrease product quantity"
              className="rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                if (productQuantity - 1 > 0) {
                  setProductQuantity(productQuantity - 1)
                }
              }}
            />
          </div>
        </div>
      </td>
      <td className="text-end">${subtotal}</td>
    </tr>
  )
}
