import { ApiEnum } from "@/enums"
import { StorageItem } from "@/types"
import Image from "next/image"

interface CartListingItemParams {
  product: StorageItem
}

export function CartListingItem({ product }: CartListingItemParams) {
  const imagePath = ApiEnum.BASE_PATH + product.image_url
  const subtotal = (product.price * product.quantity).toFixed(2)
  return (
    <tr className="px-10 py-6 grid grid-cols-4 grid-flow-row items-center rounded drop-shadow bg-white">
      <td className="flex gap-x-4 items-center">
        <div className="relative">
          <Image
            loader={() => imagePath}
            src={imagePath}
            width={38}
            height={28}
            alt={product.name}
          />
          {product.quantity === 1 && (
            <Image
              src={"/CancelItem.svg"}
              width={28}
              height={28}
              alt="Remove product"
              className="absolute -top-2 -left-2 hover:cursor-pointer"
              onClick={() => alert("remove item")}
            />
          )}
        </div>
        <div>{product.name}</div>
      </td>
      <td className="text-center">${product.price}</td>
      <td className="flex justify-center">
        <div className="relative w-16">
          <input
            className="border rounded w-16 py-2 pl-4 pr-5"
            type="text"
            defaultValue={product.quantity}
          />
          <div className="h-8 w-6 absolute top-0 bottom-0 right-0 m-auto">
            <Image
              src={"/DropUpSmall.svg"}
              width={16}
              height={16}
              alt="Increase product quantity"
              className="rounded hover:bg-gray-100 cursor-pointer"
            />
            <Image
              src={"/DropDownSmall.svg"}
              width={16}
              height={16}
              alt="Decrease product quantity"
              className="rounded hover:bg-gray-100 cursor-pointer"
            />
          </div>
        </div>
      </td>
      <td className="text-end">${subtotal}</td>
    </tr>
  )
}
