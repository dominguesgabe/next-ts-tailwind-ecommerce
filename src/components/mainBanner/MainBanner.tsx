import Image from "next/image"

export function MainBanner() {
  return (
    <div className="relative">
      <Image
        src={"/Banner.png"}
        width={1536}
        height={460}
        alt="Iphone 14 with 10% OFF"
      />
      <div className="absolute bottom-3 z-10 left-1/3 text-white flex justify-center space-x-2">
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-red-600 rounded-full border-2 b-white"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  )
}
