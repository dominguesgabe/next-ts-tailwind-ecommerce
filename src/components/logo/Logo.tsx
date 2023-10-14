import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps = { className: "" }) {
  return (
    <Link href={"/"}>
      <Image
        src={"/Logo.svg"}
        width={128}
        height={24}
        alt="Exclusive E-commerce"
        className={className}
      />
    </Link>
  )
}
