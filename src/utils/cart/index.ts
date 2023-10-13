import { StorageItem } from "@/types"

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

export const cartUtils = {
  quantityModifier,
}
