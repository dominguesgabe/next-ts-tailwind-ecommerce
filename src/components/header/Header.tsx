import { PreHeader, Logo } from "@/components"
import { cartUtils } from "@/utils"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export function Header() {
  const [isHome, setIsHome] = useState(false)
  const [cartItems, setcartItems] = useState(0)
  const router = useRouter()
  const [search, setSearch] = useState("")

  useEffect(() => {
    router.route === "/" ? setIsHome(true) : setIsHome(false)
  }, [router])

  //todo: fix
  useEffect(() => {
    const cartItems = cartUtils.getStorageCart()

    if (cartItems.length) {
      setcartItems(cartItems.length)
    }
  })

  return (
    <>
      <header className="border-b">
        <PreHeader />
        <div className="container mx-auto px-2 lg:px-0 pb-4 pt-10 flex justify-between gap-36">
          <div className="flex lg:w-2/4 xl:w-3/5 justify-between items-center">
            <h1>
              <Logo />
            </h1>
            <nav className="hidden lg:block">
              <ul className="flex gap-4 xl:gap-12">
                <li>
                  <Link
                    href="/"
                    className={`border-slate-300 ${isHome && "border-b"}`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:border-b border-slate-300">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:border-b border-slate-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:border-b border-slate-300">
                    Sign Up
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex lg:lg:w-2/4 xl:w-2/5 justify-between">
            <div className="relative w-72 hidden lg:block">
              <input
                className="peer h-full w-72 rounded py-2 px-5 bg-neutral-100 outline-0 relative text-sm"
                placeholder="What are you looking for?"
                value={search}
                onKeyUp={(event) => {
                  if (event.key === "Enter")
                    return router.push(`/search/${search}`)
                }}
                onChange={(event) => setSearch(event.target.value)}
              />
              <Link href={`/search/${search}`}>
                <Image
                  src={"/Search.svg"}
                  width={24}
                  height={24}
                  alt="Search for products"
                  className="absolute z-10 top-2/4 right-3 grid -translate-y-2/4 place-items-center hover:cursor-pointer"
                />
              </Link>
            </div>
            <div className=" flex justify-center items-center gap-5">
              <div className="block lg:hidden">
                <Image
                  src={"/Search.svg"}
                  width={32}
                  height={32}
                  alt="Search for products"
                  onClick={() => alert("should open search")}
                  className="bg-neutral-100 rounded"
                />
              </div>
              <a href="#" className="relative">
                <Image
                  src={"/Wishlist.svg"}
                  width={32}
                  height={32}
                  alt="See your Wishlist"
                />
                <div className="text-white bg-red-600 text-[0] w-2 h-2 lg:w-5 lg:h-5 lg:text-base top-0 right-0 rounded-full absolute lg:-top-1 lg:-right-1 z-10 flex justify-center items-center">
                  4
                </div>
              </a>
              <div className="relative">
                <Link href={"/cart"}>
                  <Image
                    src={"/Cart.svg"}
                    width={32}
                    height={32}
                    alt="See your cart"
                  />
                </Link>
                {cartItems > 0 && (
                  <div className="text-white bg-red-600 text-[0] w-2 h-2 lg:w-5 lg:h-5 lg:text-base top-0 right-0 rounded-full absolute lg:-top-1 lg:-right-1 z-10 flex justify-center items-center">
                    {cartItems}
                  </div>
                )}
              </div>
              <a href="#">
                <Image
                  src={"/User.svg"}
                  width={32}
                  height={32}
                  alt="See your Wishlist"
                  className="hover:bg-teal-400 hover:invert rounded-full"
                />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
