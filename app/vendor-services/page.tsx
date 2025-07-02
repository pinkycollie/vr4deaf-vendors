import type { Metadata } from "next"
import VRVendorServices from "@/components/vr-vendor-services"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "VR Vendor Services | VR4DEAF",
  description: "Comprehensive vendor services for VR agencies and workforce development partners",
}

export default function VendorServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <VRVendorServices />
      </main>
      <Footer />
    </div>
  )
}
