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
        <div className="container mx-auto pt-10 pb-4 flex justify-between gap-36">
          <div className="flex w-3/5 justify-between items-center">
            <h1>
              <Logo />
            </h1>
            <nav>
              <ul className="flex gap-12">
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
          <div className="flex w-2/5 justify-between">
            <div className="relative w-72">
              <Image
                src={"/Search.svg"}
                width={24}
                height={24}
                alt="Search for products"
                className="absolute z-10 top-2/4 right-3 grid -translate-y-2/4 place-items-center"
              />
              <input
                className="peer h-full w-72 rounded py-2 px-5 bg-neutral-100 outline-0 relative text-sm"
                placeholder="What are you looking for?"
              />
            </div>
            <div className=" flex justify-center items-center gap-5">
              <a href="#" className="relative">
                <Image
                  src={"/Wishlist.svg"}
                  width={32}
                  height={32}
                  alt="See your Wishlist"
                />
                <div className="text-white bg-red-600 w-5 h-5 rounded-full absolute -top-1 -right-1 z-10 flex justify-center items-center">
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
                {cartItems && (
                  <div className="text-white bg-red-600 w-5 h-5 rounded-full absolute -top-1 -right-1 z-10 flex justify-center items-center">
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
