import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/search/SearchBar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Product } from "@shared/schema";

export default function ProductsPage() {
  const [location] = useLocation();
  const [searchParams, setSearchParams] = useState<URLSearchParams>();
  const [sortOption, setSortOption] = useState("price-low");

  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1]);
    setSearchParams(params);
  }, [location]);

  const searchTerm = searchParams?.get("search") || "";
  const categoryId = searchParams?.get("categoryId") || "";
  const locationId = searchParams?.get("locationId") || "";

  const queryString = new URLSearchParams();
  if (searchTerm) queryString.append("search", searchTerm);
  if (categoryId) queryString.append("categoryId", categoryId);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [`/api/products?${queryString.toString()}`],
    enabled: !!searchParams,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <SearchBar />
        
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                {searchTerm && (
                  <p className="text-gray-600 mt-2">
                    Search results for: <span className="font-medium">"{searchTerm}"</span>
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A-Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                      <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-100 overflow-hidden">
                      {product.imageUrl && (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <Badge variant="category">Category</Badge>
                      </div>
                      <p className="text-gray-500 text-sm">{product.description}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria to find what you're looking for.
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
