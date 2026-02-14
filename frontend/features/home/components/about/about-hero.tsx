import { Sparkles } from "lucide-react";

export default function AboutHero() {
  return (
    <div className="relative bg-linear-to-br from-primary to-destructive  overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96  rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96  rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">About Us</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl text-background font-bold mb-6 leading-tight">
            Redefining the way
            <br />
            <span className="bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              you book hotels
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-secondary mb-12 leading-relaxed">
            We&apos;re on a mission to make hotel booking simple, transparent,
            and delightful for everyone. Join millions of travelers who trust
            us.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">50K+</div>
              <div className="text-secondary text-sm lg:text-base">
                Hotels Listed
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">2M+</div>
              <div className="text-secondary text-sm lg:text-base">
                Happy Guests
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">150+</div>
              <div className="text-secondary text-sm lg:text-base">
                Countries
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="background"
          />
        </svg>
      </div>
    </div>
  );
}
