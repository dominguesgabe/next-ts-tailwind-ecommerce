import { ApiEnum } from "@/enums"
import { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"

interface ListingItemParams {
  product: Product
}

export function ListingItem({ product }: ListingItemParams) {
  const imagePath = ApiEnum.BASE_PATH + product.image_url
  return (
    <li className="mb-8">
      <Link href={`/product/${product.id}`}>
        <div className="bg-neutral-100 relative w-60 md:w-72 2xl:w-80 h-80 aspect-square rounded flex justify-center items-center hover:opacity-90">
          <Image
            loader={() => imagePath}
            src={imagePath}
            width={190}
            height={180}
            alt={product.name}
          />
          <div className="absolute top-3 right-3 z-10 space-y-2">
            <Image
              src={"/FillHeart.svg"}
              width={34}
              height={34}
              alt="Add to your favorites"
            />
            <Image
              src={"/FillEye.svg"}
              width={34}
              height={34}
              alt="See details"
            />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="font-medium">{product.name}</div>
          <div className="space-x-3">
            <span className="text-red-600">${product.price}</span>
            <span className="text-gray-600 line-through">${product.price}</span>
          </div>
          <div className="flex items-end">
            <Image
              src={"/FiveStar.svg"}
              width={105}
              height={25}
              alt="See details"
              className="inline-block"
            />
            <span className="text-gray-600 ml-2 text-sm">(65)</span>
          </div>
        </div>
      </Link>
    </li>
  )
}
