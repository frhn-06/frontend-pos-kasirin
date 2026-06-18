import Link from "next/link"

const Report = () => {
    return (
        <div className="py-12 px-4 lg:px-8">
          <div className="flex min-h-24 rounded-2xl">
            <Link href="/owner/report/sales" className="min-h-full rounded-l-2xl flex-1 bg-white flex justify-center items-center hover:bg-blue-100 transition-all duration-500 shadow-[-1px_8px_8px_rgba(0,0,0,0.2)] active:translate-y-1">
              <p className="text-xl font-semibold">
                Laporan Pemasukan
              </p>
            </Link>
            <Link href="/owner/report/product" className="min-h-full rounded-r-2xl flex-1 bg-white flex justify-center items-center hover:bg-blue-100 transition-all duration-500 shadow-[1px_8px_8px_rgba(0,0,0,0.2)] active:translate-y-1">
              <p className="text-xl font-semibold">
                Laporan Produk / Menu
              </p>
            </Link>
          </div>
        </div>
    )
}

export default Report