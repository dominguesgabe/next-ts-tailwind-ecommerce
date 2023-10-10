import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { apiService } from "@/services"
import { Product } from "@/types"

export default function Product() {
  const [product, setProduct] = useState<Product>()
  const router = useRouter()

  useEffect(() => {
    const productId = Number(router.query.slug)

    if (productId && !isNaN(productId)) {
      apiService
        .show(productId)
        .then((productArray) => {
          setProduct(productArray[0])
        })
        .catch((error) => console.log(error))
      console.log(product)
    }
  }, [router.query])

  return (
    product && (
      <main className={`flex min-h-screen flex-col items-center p-24`}>
        <p>url id: {router.query.slug}</p>
        <p>product name: {product.name}</p>
        <p>product description: {product.description}</p>
        <p>product price: {product.price}</p>
        <img
          className="h-12"
          src={"http://localhost:3004" + product.image_url}
          alt={product.name}
        />
        <button onClick={handleAddToCart}>Add to cart</button>
      </main>
    )
  )
}
