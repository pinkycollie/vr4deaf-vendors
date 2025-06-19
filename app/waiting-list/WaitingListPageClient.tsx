"use client"

import { useState } from "react"

import { WaitingListForm } from "@/components/waiting-list-form"
import { NotificationPopup } from "@/components/notification-popup"
import { Toaster } from "@/components/ui/toaster"

export default function WaitingListPageClient() {
  const [showNotification, setShowNotification] = useState(false)

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Join Our Waiting List</h1>

      <WaitingListForm />

      {/* Toast notification will be rendered by the Toaster component */}
      <Toaster />

      {/* Alternative standalone notification */}
      <NotificationPopup
        show={showNotification}
        title="Successfully Added to Waiting List!"
        message="Thank you for joining our waiting list. You will be notified when space becomes available."
        type="success"
        onClose={() => setShowNotification(false)}
      />
    </div>
  )
}
