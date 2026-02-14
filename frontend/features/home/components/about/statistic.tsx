import { Building2, MapPin, Star, Users } from "lucide-react";

export default function Statistics() {
  const stats = [
    {
      icon: Building2,
      number: "50,000+",
      label: "Hotels Worldwide",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: MapPin,
      number: "150+",
      label: "Countries Covered",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Users,
      number: "2M+",
      label: "Active Users",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Star,
      number: "4.8/5",
      label: "Average Rating",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold  mb-4">
            Trusted by millions worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our numbers speak for themselves. We&apos;re growing every day
            thanks to travelers like you.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
