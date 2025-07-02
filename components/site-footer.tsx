import Link from "next/link"
import { Icons } from "./icons"
import { cn } from "@/lib/utils"

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t bg-background text-muted-foreground mt-auto", className)}>
      <div className="container flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Icons.logo className="h-5 w-5 text-primary" />
          <span>&copy; {new Date().getFullYear()} 360 Business Magician</span>
        </div>

        <nav className="flex gap-4 text-sm">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
