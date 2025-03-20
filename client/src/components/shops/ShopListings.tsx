import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { ShopWithProducts } from "@shared/schema";

function ShopCard({ shop }: { shop: ShopWithProducts }) {
  return (
    <Card className="overflow-hidden border border-gray-200 transition-all hover:shadow-md">
      <div className="h-44 bg-gray-100 overflow-hidden relative">
        {shop.imageUrl && (
          <img 
            src={shop.imageUrl} 
            alt={shop.name} 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
          <span className="text-white font-medium">{shop.location.name}</span>
        </div>
      </div>
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{shop.name}</h3>
          <Badge variant={shop.isOpen ? "success" : "danger"}>
            {shop.isOpen ? "Open Now" : "Closed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 mb-4">
        <div className="flex items-start">
          <MapPin className="text-gray-400 mt-1 mr-3 h-4 w-4" />
          <span className="text-gray-600">{shop.address}</span>
        </div>
        {shop.phone && (
          <div className="flex items-start">
            <Phone className="text-gray-400 mt-1 mr-3 h-4 w-4" />
            <span className="text-gray-600">{shop.phone}</span>
          </div>
        )}
        {shop.openingHours && (
          <div className="flex items-start">
            <Clock className="text-gray-400 mt-1 mr-3 h-4 w-4" />
            <span className="text-gray-600">{shop.openingHours}</span>
          </div>
        )}
        
        <div className="mt-4 flex flex-wrap gap-2">
          {shop.categories.map((category, index) => (
            <Badge key={index} variant="default" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/shops/${shop.id}`}>
          <Button className="w-full">View Shop Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function ShopListings() {
  const { data: shops, isLoading } = useQuery<ShopWithProducts[]>({
    queryKey: ["/api/shops/featured"],
  });

  return (
    <section id="shops" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Featured Shops</h2>
          <p className="mt-4 text-xl text-gray-600">Discover local tuck shops on our platform.</p>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-[400px] overflow-hidden animate-pulse">
                <div className="h-44 bg-gray-200" />
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="space-y-2 mt-6">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded" />
                    <div className="h-6 w-16 bg-gray-200 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shops?.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Link href="/waitlist">
            <Button className="gap-2">
              Join Waitlist to See More Shops
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
