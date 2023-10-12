import { useState, useEffect } from "react"
import { Breadcrumb, CartEmpty, CartListingItem } from "@/components"
import { Product, StorageItem } from "@/types"
import Link from "next/link"

export default function Cart() {
  const [cartEmpty, setCartEmpty] = useState(false)
  const [cartItems, setCartItems] = useState<StorageItem[]>([])

  useEffect(() => {
    const storageCart = localStorage.getItem("cart")

    if (!storageCart) {
      setCartEmpty(true)
    }

    const actualCart: StorageItem[] = JSON.parse(storageCart as string)
    setCartItems(actualCart)
  }, [])

  if (cartEmpty) return <CartEmpty />

  return (
    <div className="container mx-auto">
      <Breadcrumb page="cart" path="Cart" />
      <table className="w-full flex flex-wrap flex-col">
        <thead>
          <tr className="px-10 py-6 grid grid-cols-4 grid-flow-row rounded drop-shadow bg-white">
            <th className="text-left">Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th className="text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody className="space-y-10 mt-10">
          {cartItems.map((cartItem) => (
            <CartListingItem product={cartItem} key={cartItem.productId} />
          ))}
        </tbody>
      </table>
      <div className="mt-6 flex justify-between">
        <Link
          href={"/"}
          className="py-4 px-12 bg-white border rounded hover:border-gray-900 font-medium"
        >
          Return To Shop
        </Link>
        <button className="py-4 px-12 bg-white border rounded hover:border-gray-900 font-medium">
          Update Cart
        </button>
      </div>
      <div className="mt-20 flex justify-between">
        <div className="flex h-14 gap-x-4">
          <input
            className="py-4 px-6 border rounded"
            type="text"
            placeholder="Coupon Code"
          />
          <button className="py-4 px-12 text-white bg-red-600 rounded enabled:hover:bg-red-500">
            Apply Coupon
          </button>
        </div>
        <div className="w-2/4 max-w-2xl px-6 py-8 border border-black rounded flex items-center flex-col flex-wrap">
          <div className="w-full font-medium text-xl">Cart Total</div>
          <div className="w-full mt-6 flex wrap flex-col divide-y">
            <div className="w-full flex justify-between py-4">
              <span>Subtotal</span>
              <span>TROCAR</span>
            </div>
            <div className="w-full flex justify-between items-center py-4">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="w-full flex justify-between items-center py-4">
              <span>Total:</span>
              <span>TROCAR</span>
            </div>
          </div>
          <button className="w-64 py-4 text-white bg-red-600 rounded enabled:hover:bg-red-500">
            Process to checkout
          </button>
        </div>
      </div>
    </div>
  )
}
