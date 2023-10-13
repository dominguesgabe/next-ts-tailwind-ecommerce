import { Product } from "@/types"

function getStorageCart(): Product[] {
  const storageCart = localStorage.getItem("cart") ?? "[]"
  return JSON.parse(storageCart)
}

function setStorageCart(cart: Product[]) {
  localStorage.setItem("cart", JSON.stringify(cart))
}

interface AddQuantityToItemParams {
  item: Product
  newQuantity: number
}

function addQuantityToItem({
  item,
  newQuantity,
}: AddQuantityToItemParams): Product {
  return {
    ...item,
    quantity: item.quantity + newQuantity,
  }
}

interface ModifyItemQuantityParams {
  product: Product
  newQuantity: number
}

function modifyItemQuantity({
  product,
  newQuantity,
}: ModifyItemQuantityParams): Product {
  return {
    ...product,
    quantity: newQuantity,
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

interface RemoveExistingItemParams {
  cart: Product[]
  item: Product
}

function removeExistingItem({
  cart,
  item,
}: RemoveExistingItemParams): Product[] {
  return cart.filter((cartItem) => cartItem.id !== item.id)
}

export const cartUtils = {
  getStorageCart,
  setStorageCart,
  addQuantityToItem,
  modifyItemQuantity,
  replaceExistingItem,
  removeExistingItem,
}
