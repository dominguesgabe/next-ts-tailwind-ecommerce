import { PreHeader } from "@/components"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <>
      <PreHeader />
      <header className="w-screen border-b">
        <div className="container mx-auto pt-10 pb-4 flex justify-between gap-36">
          <div className="flex w-3/5 justify-between items-center">
            <h1>
              <Image src={"Logo.svg"} width={128} height={24} alt="Exclusive" />
            </h1>
            <nav>
              <ul className="flex gap-12">
                <li>
                  <a href="#" className="border-b border-slate-300">
                    Home
                  </a>
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
                src={"Search.svg"}
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
            <div className=" flex justify-center items-center gap-4">
              <a href="#" className="relative">
                <Image
                  src={"Wishlist.svg"}
                  width={32}
                  height={32}
                  alt="See your Wishlist"
                />
                <span className="text-white bg-red-600 block w-4 h-4 rounded-full text-center absolute top-0 right-0 z-10">
                  4
                </span>
              </a>
              <Link href={"/cart"}>
                <Image
                  src={"Cart.svg"}
                  width={32}
                  height={32}
                  alt="See your cart"
                />
              </Link>
              <a href="#">
                <Image
                  src={"User.svg"}
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
