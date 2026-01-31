import Link from "next/link";

export default function Header() {
  return (
    <Link href='/'>
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="relative group cursor-pointer">
            <div className="text-7xl font-black tracking-tighter text-primary">
              Blade
            </div>
          </div>
        </div>
      </header>
    </Link>
  )
}
