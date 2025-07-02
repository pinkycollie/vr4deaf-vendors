import { Bot, CuboidIcon as Cube, Globe, HeadphonesIcon, LayoutDashboard, Layers3Icon as Layers3D } from "lucide-react"

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Platform Features</h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform is designed specifically for deaf users with cutting-edge technology.
          </p>
        </div>

        <div className="grid gap-16">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 mb-4">
                <Layers3D className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">3D Interactive Interface</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Our platform features a headless CMS with 3D pop-out layers for interactive accessibility, making
                navigation intuitive for deaf users.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary p-1 rounded-full">
                    <Cube className="h-4 w-4" />
                  </span>
                  <span>Interactive 3D elements for intuitive navigation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary p-1 rounded-full">
                    <Globe className="h-4 w-4" />
                  </span>
                  <span>Fully accessible design optimized for deaf users</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 relative h-[300px] rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <div className="absolute inset-0 flex items-center justify-center perspective-1000">
                <div className="relative w-full h-full max-w-sm">
                  {/* Layer 3 - Background */}
                  <div className="absolute inset-4 bg-gradient-to-br from-texas-blue-400 to-texas-blue-600 rounded-xl shadow-lg transform rotate-6 hover:rotate-12 transition-transform duration-500 opacity-60">
                    <div className="p-4 text-white">
                      <div className="w-8 h-8 bg-white/20 rounded-lg mb-2"></div>
                      <div className="h-2 bg-white/30 rounded mb-1"></div>
                      <div className="h-2 bg-white/20 rounded w-3/4"></div>
                    </div>
                  </div>

                  {/* Layer 2 - Middle */}
                  <div className="absolute inset-2 bg-gradient-to-br from-texas-red-400 to-texas-red-600 rounded-xl shadow-xl transform -rotate-3 hover:rotate-3 transition-transform duration-500 opacity-80">
                    <div className="p-4 text-white">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-white/30 rounded-full"></div>
                        <div className="h-2 bg-white/40 rounded flex-1"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-white/30 rounded"></div>
                        <div className="h-2 bg-white/20 rounded w-4/5"></div>
                        <div className="h-2 bg-white/25 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>

                  {/* Layer 1 - Front */}
                  <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border border-gray-200 dark:border-gray-700">
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-texas-red-500 to-texas-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-1"></div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        </div>
                      </div>

                      <div className="space-y-3 flex-1">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <div className="h-8 bg-gradient-to-r from-texas-red-500 to-texas-red-600 rounded flex-1"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-texas-blue-500 rounded-full animate-bounce shadow-lg"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-texas-red-500 rounded-full animate-pulse shadow-lg"></div>

                  {/* Interactive Indicators */}
                  <div className="absolute top-4 left-4 flex gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Overlay Text */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Interactive 3D Interface Demo
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  {/* Widget Header */}
                  <div className="bg-gradient-to-r from-texas-red-600 to-texas-blue-600 text-white p-3 rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                          </svg>
                        </div>
                        <span className="font-medium text-sm">ASL Support</span>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Widget Content */}
                  <div className="p-4 space-y-4">
                    {/* ASL Video Area */}
                    <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative">
                      <div className="text-white text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="text-xs">ASL Interpreter</div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                        LIVE
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-texas-red-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-texas-red-700 transition-colors">
                        Request ASL
                      </button>
                      <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-3 rounded text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        Text Chat
                      </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Quick Actions:</div>
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-texas-blue-100 text-texas-blue-800 px-2 py-1 rounded-full text-xs">
                          VR Info
                        </span>
                        <span className="bg-texas-red-100 text-texas-red-800 px-2 py-1 rounded-full text-xs">
                          Job Help
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Forms</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Online</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-texas-red-500/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-texas-blue-500/20 rounded-full animate-bounce"></div>

              {/* Overlay Text */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  ASL Support Widget Demo
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <HeadphonesIcon className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">ASL Support Widget</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Our AI-powered ASL support widget provides real-time communication assistance for deaf users navigating
                the platform.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary p-1 rounded-full">
                    <Bot className="h-4 w-4" />
                  </span>
                  <span>AI-powered ASL interpretation and assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary p-1 rounded-full">
                    <LayoutDashboard className="h-4 w-4" />
                  </span>
                  <span>Integrated with all platform features for seamless experience</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 mb-4">
                <LayoutDashboard className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Integrated Workforce Platform</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Our platform seamlessly integrates with Workforce Centers and provides real-time job market data
                tailored to deaf professionals.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary p-1 rounded-full">
                    <Bot className="h-4 w-4" />
                  </span>
                  <span>Automated geolocation-based task tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 text-primary p-1 rounded-full">
                    <Globe className="h-4 w-4" />
                  </span>
                  <span>Resume upload and certification management</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 relative h-[300px] rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-lg">
                  {/* Central Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-texas-red-500 to-texas-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Bot className="h-8 w-8 text-white" />
                  </div>

                  {/* Automation Nodes */}
                  <div className="absolute top-8 left-8 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-md animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  <div className="absolute top-8 right-8 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-md animate-bounce delay-100">
                    <LayoutDashboard className="h-6 w-6 text-white" />
                  </div>

                  <div className="absolute bottom-8 left-8 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-md animate-bounce delay-200">
                    <Globe className="h-6 w-6 text-white" />
                  </div>

                  <div className="absolute bottom-8 right-8 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-md animate-bounce delay-300">
                    <Cube className="h-6 w-6 text-white" />
                  </div>

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#dc2626" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>

                    {/* Animated connection lines */}
                    <path
                      d="M 80 80 Q 200 150 320 80"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                    <path
                      d="M 80 220 Q 200 150 320 220"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse delay-100"
                    />
                    <path
                      d="M 80 80 Q 150 200 80 220"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse delay-200"
                    />
                    <path
                      d="M 320 80 Q 250 200 320 220"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse delay-300"
                    />
                  </svg>

                  {/* Data Flow Indicators */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-100"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-200"></div>
                  </div>

                  {/* Process Labels */}
                  <div className="absolute top-2 left-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                    VR Integration
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                    Job Matching
                  </div>
                  <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                    Workforce API
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                    AI Processing
                  </div>
                </div>
              </div>

              {/* Overlay Text */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Automated System Integration
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
