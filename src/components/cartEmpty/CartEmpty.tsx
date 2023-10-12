import Link from "next/link"

export function CartEmpty() {
  return (
    <div className="h-[600px] font-medium text-lg container flex mx-auto justify-center items-center flex-col gap-4">
      Your cart is empty.
      <Link
        href={"/"}
        className="py-4 px-12 text-base bg-white border rounded hover:border-gray-900 font-medium"
      >
        Return To Shop
      </Link>
    </div>
  )
}
