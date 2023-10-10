import { useState, useEffect, MouseEvent } from "react"
import { useRouter } from "next/router"
import { apiService } from "@/services"
import { Product } from "@/types"
import { StorageObjectItem } from "@/factories"
import { StorageItem } from "@/types"
import { cartUtils } from "@/utils"

export default function Product() {
  const [product, setProduct] = useState<Product>()
  const [addCartQuantity, setAddCartQuantity] = useState(1)
  const router = useRouter()

  useEffect(() => {
    const productId = Number(router.query.slug)
    if (productId && !isNaN(productId)) {
      apiService.show(productId).then((productArray) => {
        setProduct(productArray[0])
      })
    }
  }, [router.query])

  function addToCart() {
    const storageCart = localStorage.getItem("cart") ?? "[]"
    const actualCart: StorageItem[] = JSON.parse(storageCart)

    let newCart: StorageItem[]

    if (actualCart.length) {
      const isItemAlreadyInCart = actualCart.some(
        (item) => item.productId === product?.id
      )

      if (isItemAlreadyInCart) {
        newCart = cartUtils.quantityModifier({
          cart: actualCart,
          targetProductId: product?.id ?? 1,
          newQuantity: 1,
        }) //targetProductId can cause bugs, todo fix
      } else {
        newCart = [...actualCart, new StorageObjectItem(product!.id, 1)]
      }
    } else {
      newCart = [new StorageObjectItem(product!.id, 1)]
    }

    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  function handleChangeItem(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
  }

  return (
    product && (
      <main className={`flex min-h-screen flex-col items-center p-24`}>
        <p>url id: {router.query.slug}</p>
        <p>product name: {product.name}</p>
        <p>product description: {product.description}</p>
        <p>product price: {product.price}</p>
        <img
          className="w-60"
          src={"http://localhost:3004" + product.image_url}
          alt={product.name}
        />
        <div>
          <button onClick={handleChangeItem}>-</button>
          <input name="inputQuantity" value={addCartQuantity} type="number" />
          <button onClick={handleChangeItem}>+</button>
        </div>
        <button onClick={addToCart}>Add to cart</button>
      </main>
    )
  )
}
