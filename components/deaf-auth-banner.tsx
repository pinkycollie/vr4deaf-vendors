import { Info } from "lucide-react"
import Link from "next/link"

export function DeafAuthBanner() {
  return (
    <div className="bg-primary/10 border-b border-primary/20 py-2">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 px-4 text-center sm:text-left">
        <div className="flex items-center gap-2 text-sm">
          <Info className="h-4 w-4 text-primary" />
          <span>
            <strong>DeafAuth</strong> with <strong>PinkSync</strong> and <strong>FibonRoseTrust</strong> integration is
            now available
          </span>
        </div>
        <Link href="/auth/register" className="text-sm font-medium text-primary hover:underline">
          Create your secure account →
        </Link>
      </div>
    </div>
  )
}
