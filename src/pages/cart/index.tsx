import { useState, useEffect } from "react"
import { Breadcrumb, CartEmpty, CartListingItem } from "@/components"
import { Product } from "@/types"
import Link from "next/link"
import { cartUtils } from "@/utils"
import Head from "next/head"
import { useRouter } from "next/router"

export default function Cart() {
  const [cartEmpty, setCartEmpty] = useState(true)
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const storageCart = cartUtils.getStorageCart()

    if (storageCart && storageCart.length) {
      setCartEmpty(false)
      setCartItems(storageCart)
    }
  }, [])

  useEffect(() => {
    const initialValue = 0
    const subtotal = cartItems.reduce(
      (accumulator, cartItem) =>
        accumulator + cartItem.price * cartItem.quantity,
      initialValue
    )

    setSubtotal(Number(subtotal.toFixed(2)))

    cartUtils.setStorageCart(cartItems)
    router.push("/cart")
  }, [cartItems])

  if (cartEmpty) return <CartEmpty />

  return (
    <>
      <Head>
        <title>Exclusive - Cart</title>
        <meta name="keywords" content="Shopping cart" />
      </Head>
      <div className="container mx-auto px-2 sm:px-0">
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
              <CartListingItem
                product={cartItem}
                cartItems={cartItems}
                setCartItems={setCartItems}
                key={cartItem.id}
              />
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
        <div className="mt-20 flex flex-col md:flex-row justify-between">
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
          <div className="w-full md:w-2/4 max-w-2xl px-6 py-8 border border-black rounded flex items-center flex-col flex-wrap mt-10 md:mt-0">
            <div className="w-full font-medium text-xl">Cart Total</div>
            <div className="w-full mt-6 flex wrap flex-col divide-y">
              <div className="w-full flex justify-between py-4">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="w-full flex justify-between items-center py-4">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="w-full flex justify-between items-center py-4">
                <span>Total:</span>
                <span>${subtotal}</span>
              </div>
            </div>
            <button className="w-64 py-4 text-white bg-red-600 rounded enabled:hover:bg-red-500">
              Process to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
