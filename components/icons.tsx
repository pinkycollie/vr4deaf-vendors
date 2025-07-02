import * as React from "react"
import { Accessibility, type LightbulbIcon as LucideProps } from "lucide-react"

/**
 * Central place to collect brand / UI icons.
 * Extend this object as you add more icons across your app.
 */
export const Icons = {
  /**
   * Primary brand mark (placeholder).
   * Replace with your own SVG or Lucide icon as needed.
   */
  logo: React.forwardRef<SVGSVGElement, LucideProps>(function Logo(props, ref) {
    return <Accessibility ref={ref} aria-label="360 Business Magician logo" {...props} />
  }),
}
