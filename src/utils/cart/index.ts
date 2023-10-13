import { StorageObjectItem } from "@/factories"
import { Product, StorageItem } from "@/types"

//esse método está mudaddo a quantidade e montando novo carrinho, deve ser quebrado
interface QuantityModifierInputParams {
  cart: StorageItem[]
  newQuantity: number
  targetProductId: number
}

function quantityModifier({
  cart,
  newQuantity,
  targetProductId,
}: QuantityModifierInputParams): StorageItem[] {
  return cart.map((cartItem) => {
    if (cartItem.id === targetProductId) {
      return {
        ...cartItem,
        quantity: cartItem.quantity + newQuantity,
      }
    }

    return cartItem
  })
}

function getStorageCart(): StorageItem[] {
  const storageCart = localStorage.getItem("cart") ?? "[]"
  return JSON.parse(storageCart)
}

export const cartUtils = {
  quantityModifier,
  getStorageCart,
}
