import { useState, useEffect, MouseEvent } from "react"
import { useRouter } from "next/router"
import { apiService } from "@/services"
import { Product } from "@/types"

interface StorageItem {
  productId: string
  quantity: string
}
export default function Product() {
  const [product, setProduct] = useState<Product>()
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
    const storedCart = localStorage.getItem("cart")

    if (storedCart) {
      const parsedStoredCart: StorageItem[] = JSON.parse(storedCart)
      const isItemAlreadyInCart = parsedStoredCart.some(
        (item) => item.productId == product?.id
      )

      if (isItemAlreadyInCart) {
        const newCart = parsedStoredCart.map((item) => {
          if (item.productId === product?.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }

          return item
        })

        console.log(newCart)
      }
      // const newItem = { productId: product?.id, quantity: 1 }

      // const newCart = JSON.stringify([...storedCartObject, , newItem])

      // localStorage.setItem("cart", newCart)
    }
  }

  function handleAddToCart(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    addToCart()
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
        <button onClick={handleAddToCart}>Add to cart</button>
      </main>
    )
  )
}
