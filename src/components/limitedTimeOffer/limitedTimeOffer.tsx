import Image from "next/image"

export function LimitedTimeOffer() {
  return (
    <div className="mt-20 relative">
      <Image
        src={"/BoomboxBanner.png"}
        width={1536}
        height={500}
        alt="Buy this limited time offer"
      />
      <div className="space-y-8 absolute top-0 bottom-0 left-14 m-auto h-96">
        <span className="text-green-500">Categories</span>
        <div className=" font-semibold text-5xl text-white max-w-md">
          Enhance Your Music Experience
        </div>
        <div className="flex justify-between max-w-xs ">
          <div className="w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center">
            <div className="font-semibold text-lg">23</div>
            <div className="text-xs">Hours</div>
          </div>
          <div className="w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center">
            <div className="font-semibold text-lg">05</div>
            <div className="text-xs">Days</div>
          </div>
          <div className="w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center">
            <div className="font-semibold text-lg">59</div>
            <div className="text-xs">Miutes</div>
          </div>
          <div className="w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center">
            <div className="font-semibold text-lg">29</div>
            <div className="text-xs">Seconds</div>
          </div>
        </div>
        <button className="py-4 px-12 text-white bg-green-500 rounded enabled:hover:bg-green-400 ">
          Buy now!
        </button>
      </div>
    </div>
  )
}
