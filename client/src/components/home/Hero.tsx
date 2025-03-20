import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 bg-gradient-to-r from-blue-900 to-gray-900"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the Best Deals Across Local Shops</h1>
          <p className="text-xl mb-8">Compare prices, check availability, and discover local tuck shops all in one place.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/waitlist">
              <Button size="lg" className="w-full sm:w-auto">
                Join the Waitlist
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white hover:bg-gray-100 text-gray-800">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
