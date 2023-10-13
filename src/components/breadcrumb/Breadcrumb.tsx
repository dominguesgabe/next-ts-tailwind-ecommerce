interface BreadcrumbParams {
  page: "product" | "cart"
  path: string
}
export function Breadcrumb({ page, path }: BreadcrumbParams) {
  const base = page === "product" ? "Account / Category /" : "Home /"
  return (
    <div className="py-20 text-neutral-500 text tracking-wider">
      {base} <span className="text-black">{path}</span>
    </div>
  )
}
