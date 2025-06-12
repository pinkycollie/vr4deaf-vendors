import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Users, Award, Heart } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Vocational Rehabilitation
                <span className="text-blue-600 block">For Deaf Communities</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Empowering deaf individuals with culturally responsive vocational rehabilitation services, assessments,
                and career development resources designed by and for the deaf community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-lg px-8 py-4">
                <Link href="/assessment">
                  Start Your Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Deaf Individuals Served</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">85%</div>
                <div className="text-sm text-gray-600">Employment Success Rate</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Culturally Responsive</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-8 shadow-2xl">
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">DEAF FIRST</h3>
                  <p className="text-gray-600">Built by the deaf community, for the deaf community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
