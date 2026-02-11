import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border  py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          {/* Logo and Tagline */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              Hotel<span className="font-bold text-primary">Hub</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs">
              We kaboom your beauty holiday instantly and memorable.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-xl font-medium">Become hotel Owner</p>
            <Button className="text-md">Register Now</Button>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-border pt-6">
          <p className="text-center text-sm ">
            Copyright 2026 • All rights reserved • Thanh Pham
          </p>
        </div>
      </div>
    </footer>
  );
}
