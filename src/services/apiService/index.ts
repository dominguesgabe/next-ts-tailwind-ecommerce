import { ApiEnum } from "@/enums"
import { Product } from "@/types"

const apiBasePath = `${ApiEnum.BASE_PATH}/products`

async function getRequestCore(queryParams: string): Promise<Product[]> {
  const data = await fetch(apiBasePath + queryParams)
  return await data.json()
}

function get(page: number): Promise<Product[]> {
  const queryParams = `?_page=${page}&_limit=4`
  return getRequestCore(queryParams)
}

async function show(page: number): Promise<Product[]> {
  const queryParams = `?id=${page}`
  return getRequestCore(queryParams)
}

export const apiService = {
  get,
  show,
}
