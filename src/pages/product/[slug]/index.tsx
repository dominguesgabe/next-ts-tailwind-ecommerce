import { useState, useEffect, MouseEvent } from "react"
import { apiService } from "@/services"
import { Product } from "@/types"
import { StorageObjectItem } from "@/factories"
import { StorageItem } from "@/types"
import { cartUtils } from "@/utils"

export async function getServerSideProps(context) {
  const productId = context.query.slug

  const response = await fetch(`http://localhost:3004/products?id=${productId}`)

  const product = await response.json()

  if (!product[0]) return { notFound: true }

  return { props: { data: product[0] } }
}
interface ProductPageProps {
  product: Product
}

export default function Product({ product }: ProductPageProps) {
  const [addCartQuantity, setAddCartQuantity] = useState(1)

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
    <main className={`flex min-h-screen flex-col items-center p-24`}>
      <p>product name: {product.name}</p>
      <p>product description: {product.description}</p>
      <p>product price: {product.price}</p>
      <img
        className="w-60"
        src={"http://localhost:3004" + product.image_url}
        alt={product.name}
      />
      {/* <div>
          <button onClick={handleChangeItem}>-</button>
          <input name="inputQuantity" value={addCartQuantity} type="number" />
          <button onClick={handleChangeItem}>+</button>
        </div> */}
      <button onClick={addToCart}>Add to cart</button>
    </main>
  )
}
