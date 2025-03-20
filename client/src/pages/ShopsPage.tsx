import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";
import type { Shop } from "@shared/schema";

export default function ShopsPage() {
  const [location] = useLocation();
  const [locationId, setLocationId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1]);
    setLocationId(params.get("locationId"));
  }, [location]);

  const queryString = locationId ? `?locationId=${locationId}` : "";

  const { data: shops, isLoading } = useQuery<Shop[]>({
    queryKey: [`/api/shops${queryString}`],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Explore Local Shops</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Browse through our curated list of local tuck shops and find the best options near you.
            </p>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">All Shops</h2>
              {locationId && (
                <p className="text-gray-600 mt-2">
                  Filtering by location ID: {locationId}
                </p>
              )}
            </div>
            
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-44 bg-gray-200" />
                    <CardContent className="p-6">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : shops && shops.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shops.map((shop) => (
                  <Card key={shop.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-all">
                    <div className="h-44 bg-gray-100 overflow-hidden relative">
                      {shop.imageUrl && (
                        <img 
                          src={shop.imageUrl} 
                          alt={shop.name} 
                          className="w-full h-full object-cover"
                        />
                      )}
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
                      
                      <div className="mt-6">
                        <Button className="w-full">View Shop Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No shops found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria to find shops in your area.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
