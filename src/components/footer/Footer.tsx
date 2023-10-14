import { Logo } from "@/components"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-36 pt-20 pb-6">
      <div className="container flex-col sm:flex-row flex-wrap xl:flex-nowrap mx-auto px-2 md:px-0 flex justify-between gap-y-5">
        <div className="w-2/4">
          <Logo className="invert" />
          <h2 className="font-medium my-6 text-xl">Subscribe</h2>
          <div className="w-56">
            <label htmlFor="subscribe">Get 10% off your first order</label>

            <div className="relative">
              <Image
                src={"/IconSend.svg"}
                width={24}
                height={24}
                alt="Search for products"
                className="absolute z-10 top-0 bottom-0 right-3 grid translate-y-6 place-items-center"
              />
              <input
                name="subscribe"
                type="text"
                placeholder="Enter your email"
                className="peer h-full mt-4 w-56 rounded py-2 px-5 bg-black border border-white outline-0 relative text-sm"
              />
            </div>
          </div>
        </div>
        <div className="w-2/4">
          <h2 className="font-medium mb-6 text-xl">Support</h2>
          <ul className="space-y-4">
            <li>
              111 Bijoy sarani, Dhaka,
              <br />
              DH 1515, Bangladesh.
            </li>
            <li>exclusive@gmail.com</li>
            <li>+88015-88888-9999</li>
          </ul>
        </div>
        <div className="w-2/4 mt-4 lg:mt-0">
          <h2 className="font-medium mb-6 text-xl">Account</h2>
          <ul className="space-y-4">
            <li>
              <a href="#">My Account</a>
            </li>
            <li>
              <a href="#">Login / Register</a>
            </li>
            <li>
              <a href="#">Cart</a>
            </li>
            <li>
              <a href="#">Wishlist</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
          </ul>
        </div>
        <div className="w-2/4 mt-4 lg:mt-0">
          <h2 className="font-medium mb-6 text-xl">Quick Link</h2>
          <ul className="space-y-4">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms Of Use</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="w-2/4 mt-4 lg:mt-0">
          <h2 className="mb-6">Download App</h2>
          <span className="text-xs text-gray-400">
            Save $3 with App New User Only
          </span>
          <div className="mt-2 grid grid-cols-[40%,60%] grid-rows-2 gap-x-2 lg:mt-4">
            <Image
              src={"/DownloadQR.svg"}
              width={80}
              height={80}
              alt="Scan QR code to download app"
              className="col-span-1 row-span-2"
            />
            <Image
              src={"/GooglePlayBadge.svg"}
              width={110}
              height={40}
              alt="Available on Google Play"
              className="col-span-1 row-span-1"
            />
            <Image
              src={"/AppStoreBadge.svg"}
              width={110}
              height={40}
              alt="Available on App Store"
              className="col-span-1 row-span-1"
            />
          </div>
          <ul className="mt-6 flex space-x-6">
            <li>
              <a href="#">
                <Image
                  src={"/SocialFacebook.svg"}
                  width={24}
                  height={24}
                  alt="Visit our Facebook"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <Image
                  src={"/SocialTwitter.svg"}
                  width={24}
                  height={24}
                  alt="Visit our Twitter"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <Image
                  src={"/SocialInstagram.svg"}
                  width={24}
                  height={24}
                  alt="Visit our Instagram"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <Image
                  src={"/SocialLinkedin.svg"}
                  width={24}
                  height={24}
                  alt="Visit our Linkedin"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-14">
        <div className="text-center border-t pt-4 border-gray-900">
          <small className="text-gray-400">
            &copy; Copyright Rimel 2022. All right reserved
          </small>
        </div>
      </div>
    </footer>
  )
}
