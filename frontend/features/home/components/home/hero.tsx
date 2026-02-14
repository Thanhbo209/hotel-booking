import { Button } from "@/components/ui/button";
import { STATS } from "@/features/home/components/home/data/home-data";
import SearchFilter from "@/features/home/components/home/search-filter";
import { MapPin, Play } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden border-none">
      {/* Decorative elements */}

      <div className=" mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2  border border-border rounded-full px-4 py-2 shadow-sm">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                Explore the world with us
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span>Forget Busy Work,</span>
                <br />
                <span className="bg-linear-to-r from-primary to-destructive bg-clip-text text-transparent">
                  Start Next Vacation
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                We provide what you need to enjoy your holiday with family. Time
                to make another memorable moments.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/80  px-8 py-6 text-lg rounded-md shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
              >
                Show More
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-border hover:border-border/80 hover:bg-primary/20 px-8 py-6 text-lg rounded-md transition-all duration-300 group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {STATS.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div key={stat.id} className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.iconBg}`}
                      >
                        <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                      </div>
                    </div>

                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Images */}
          <div className="relative h-125 lg:h-150">
            {/* Main Image */}
            <div className="absolute top-0 right-0 w-[60%] h-[60%] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/luxurious-hotel-lobby.jpg"
                alt="Travel destination"
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Secondary Image */}
            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-3xl overflow-hidden shadow-2xl border-4 border-border">
              <Image
                src="/grand-bella-hotel.jpg"
                alt="Adventure moment"
                fill
                sizes="200"
                className="object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute top-1/4 left-[6.67%] bg-foreground rounded-2xl shadow-xl p-4 transform -translate-y-1/2 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-primary to-destructive rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-background" />
                </div>
                <div>
                  <div className="text-sm  text-background">Top Rated</div>
                  <div className="text-lg font-bold text-background">5.0★</div>
                </div>
              </div>
            </div>

            {/* Decorative circle */}
            <div className="absolute bottom-40 right-190 w-100 h-100 bg-primary rounded-xl opacity-20 blur-2xl" />
          </div>
        </div>
      </div>

      <SearchFilter />
    </div>
  );
};
