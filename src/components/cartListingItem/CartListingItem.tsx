import { ApiEnum } from "@/enums"
import { StorageItem } from "@/types"
import Image from "next/image"

interface CartListingItemParams {
  product: StorageItem
}

export function CartListingItem({ product }: CartListingItemParams) {
  const imagePath = ApiEnum.BASE_PATH + product.imageUrl
  return (
    <tr className="px-10 py-6 grid grid-cols-4 grid-flow-row items-center rounded drop-shadow bg-white">
      <td className="relative">
        <Image
          loader={() => imagePath}
          src={imagePath}
          width={55}
          height={55}
          alt={product.productName}
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
      </td>
      <td className="text-center">$999</td>
      <td className="text-center">{product.quantity}</td>
      <td className="text-end">$100</td>
    </tr>
  )
}
