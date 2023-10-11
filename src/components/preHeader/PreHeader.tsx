import Image from "next/image"

export function PreHeader() {
  return (
    <div className=" bg-black text-white mx-auto py-3 flex justify-center">
      <div className="container relative">
        <div className="text-center">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <a href="#" className="font-bold underline decoration-solid ml-2">
            ShopNow
          </a>
        </div>
        <div className="absolute right-0 top-0 bottom-0 m-auto">
          <button>
            English{" "}
            <Image
              src={"/DropDown.svg"}
              width={24}
              height={24}
              alt="Language"
              className="inline-block"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
