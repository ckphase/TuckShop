import { Link } from "wouter";
import { ArrowRight, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MapSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Find Shops Near You</h2>
          <p className="mt-4 text-xl text-gray-600">Our platform helps you locate the nearest tuck shops.</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gray-200 h-96 rounded-lg relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Map className="text-gray-400 h-16 w-16 mb-4 mx-auto" />
                <p className="text-gray-500 font-medium">Map view showing local shops will appear here</p>
                <p className="text-gray-400 text-sm mt-2">Coming soon with our full release</p>
              </div>
            </div>
            
            {/* Sample map markers */}
            <div className="absolute left-1/4 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                <span className="text-sm">1</span>
              </div>
            </div>
            
            <div className="absolute left-2/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                <span className="text-sm">2</span>
              </div>
            </div>
            
            <div className="absolute right-1/4 bottom-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                <span className="text-sm">3</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Link href="/waitlist">
              <Button className="gap-2">
                Join Waitlist for Map Access
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

