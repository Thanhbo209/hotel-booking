import Image from "next/image";
import { Calendar, Users, Award, TrendingUp } from "lucide-react";

export default function OurStory() {
  return (
    <div className="py-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-card text-primary rounded-full text-sm font-semibold mb-6">
              Our Story
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold  mb-6 leading-tight">
              Started with a simple idea in 2018
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              It all began when our founders struggled to find transparent,
              trustworthy hotel booking options during their travels. They
              realized millions of people faced the same frustration.
            </p>

            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              So they built a platform that puts travelers first—no hidden fees,
              no confusing pricing, just honest recommendations and seamless
              booking experiences. Today, we&apos;re proud to serve millions of
              guests worldwide.
            </p>

            {/* Timeline */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold  mb-1">2018 - Founded</h3>
                  <p className="text-muted-foreground">
                    Started with just 100 hotels in 5 cities
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold  mb-1">2020 - 1M Users</h3>
                  <p className="text-muted-foreground">
                    Reached our first million happy travelers
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold  mb-1">2022 - Best Platform</h3>
                  <p className="text-muted-foreground">
                    Won &quot;Best Travel Platform&quot; award
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold  mb-1">2024 - Global Growth</h3>
                  <p className="text-muted-foreground">
                    Expanded to 150+ countries worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Images */}
          <div className="relative">
            <div className="relative z-10">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-100 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-100 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
