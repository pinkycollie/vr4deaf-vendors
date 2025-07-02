"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Accessibility, EarOff, MapPin, MessageSquare, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import VuriAssistant from "./vuri-assistant"
import OfficeLocator from "./office-locator"
import AccessibilityOptions from "./accessibility-options"
import SpecialistDirectory from "./specialist-directory"

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const toggleWidget = () => {
    setIsOpen(!isOpen)
    if (isOpen) {
      setActiveTab(null)
    }
  }

  const openTab = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {activeTab === "vuri" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border"
          >
            <VuriAssistant onClose={() => setActiveTab(null)} />
          </motion.div>
        )}

        {activeTab === "locator" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border"
          >
            <OfficeLocator onClose={() => setActiveTab(null)} />
          </motion.div>
        )}

        {activeTab === "specialists" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border"
          >
            <SpecialistDirectory onClose={() => setActiveTab(null)} />
          </motion.div>
        )}

        {activeTab === "accessibility" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border"
          >
            <AccessibilityOptions onClose={() => setActiveTab(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 flex flex-col gap-2"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => openTab("vuri")}
                    size="icon"
                    className="h-12 w-12 rounded-full bg-texas-red-600 shadow-lg hover:bg-texas-red-700"
                  >
                    <MessageSquare className="h-6 w-6 text-white" />
                    <span className="sr-only">Chat with Vuri AI Assistant</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Chat with Vuri AI Assistant</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => openTab("locator")}
                    size="icon"
                    className="h-12 w-12 rounded-full bg-texas-blue-600 shadow-lg hover:bg-texas-blue-700"
                  >
                    <MapPin className="h-6 w-6 text-white" />
                    <span className="sr-only">Find VR Offices</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Find Vocational Rehabilitation Offices</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => openTab("specialists")}
                    size="icon"
                    className="h-12 w-12 rounded-full bg-orange-600 shadow-lg hover:bg-orange-700"
                  >
                    <Users className="h-6 w-6 text-white" />
                    <span className="sr-only">Specialist Directory</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Find Job & Business Specialists</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => openTab("accessibility")}
                    size="icon"
                    className="h-12 w-12 rounded-full bg-green-600 shadow-lg hover:bg-green-700"
                  >
                    <Accessibility className="h-6 w-6 text-white" />
                    <span className="sr-only">Accessibility Options</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Accessibility Options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={toggleWidget}
        size="icon"
        className={`h-14 w-14 rounded-full shadow-lg ${isOpen ? "bg-gray-800 hover:bg-gray-900" : "bg-gradient-to-r from-red-700 to-blue-700 hover:from-red-800 hover:to-blue-800"}`}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <EarOff className="h-6 w-6 text-white" />}
        <span className="sr-only">{isOpen ? "Close Accessibility Menu" : "Open Accessibility Menu"}</span>
      </Button>
    </div>
  )
}
