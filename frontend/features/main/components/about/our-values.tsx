// components/about/OurValues.tsx
import { Heart, Shield, Zap, Globe } from "lucide-react";

export default function OurValues() {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Every decision we make starts with our customers. Your satisfaction and trust are our top priorities.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description:
        "No hidden fees, no surprises. What you see is what you get. We believe in honest, transparent pricing.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We constantly innovate to make booking easier, faster, and more delightful for everyone.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Globe,
      title: "Global Community",
      description:
        "We're building a global community of travelers, hosts, and partners working together.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="py-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block border px-4 py-2 bg-card text-primary rounded-full text-sm font-semibold mb-6">
            Our Values
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold  mb-4">
            What drives us every day
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            These core values guide everything we do, from product development
            to customer support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-card border-2 border-border rounded-2xl p-8 hover:border-transparent hover:shadow-2xl transition-all duration-300"
            >
              {/* Gradient Border on Hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-linear-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity -z-10`}
                style={{ padding: "2px" }}
              >
                <div className="w-full h-full bg-card rounded-2xl" />
              </div>

              {/* Icon */}
              <div
                className={`w-16 h-16 bg-linear-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <value.icon className="w-8 h-8 text-card" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold  mb-4">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
