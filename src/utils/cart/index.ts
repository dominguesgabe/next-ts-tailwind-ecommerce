import { Product } from "@/types"

//esse método está mudaddo a quantidade e montando novo carrinho, deve ser quebrado
// interface QuantityModifierInputParams {
//   cart: Product[]
//   newQuantity: number
//   targetProductId: number
// }

// function quantityModifier({
//   cart,
//   newQuantity,
//   targetProductId,
// }: QuantityModifierInputParams): Product[] {
//   return cart.map((cartItem) => {
//     if (cartItem.id === targetProductId) {
//       return {
//         ...cartItem,
//         quantity: cartItem.quantity + newQuantity,
//       }
//     }

//     return cartItem
//   })
// }

function getStorageCart(): Product[] {
  const storageCart = localStorage.getItem("cart") ?? "[]"
  return JSON.parse(storageCart)
}

interface AddQuantityToItemProps {
  item: Product
  newQuantity: number
}

function addQuantityToItem({
  item,
  newQuantity,
}: AddQuantityToItemProps): Product {
  return {
    ...item,
    quantity: item.quantity + newQuantity,
  }
}

interface ReplaceExistingItemParams {
  cart: Product[]
  item: Product
}

function replaceExistingItem({
  cart,
  item,
}: ReplaceExistingItemParams): Product[] {
  return cart.map((cartItem) => {
    if (cartItem.id === item.id) {
      return item
    }
    return cartItem
  })
}

export const cartUtils = {
  getStorageCart,
  addQuantityToItem,
  replaceExistingItem,
}
