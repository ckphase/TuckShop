import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { ProductWithPrice } from "@shared/schema";

function ProductCard({ product }: { product: ProductWithPrice }) {
  // Find the best price (lowest) among all shops
  const bestPrice = product.prices.reduce(
    (lowest, current) => 
      current.price < lowest.price ? current : lowest,
    product.prices[0]
  );

  // Format price from cents to dollars
  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden border border-gray-200 transition-all hover:shadow-md">
      <div className="h-48 overflow-hidden">
        {product.imageUrl && (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <Badge variant="category">{product.category.name}</Badge>
        </div>
        <p className="text-gray-500 text-sm mt-2">{product.description}</p>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <div className="border-t border-gray-100 pt-4">
          <h4 className="font-medium text-sm text-gray-600 mb-2">Price Comparison</h4>
          <div className="space-y-2">
            {product.prices.map((price) => (
              <div 
                key={price.id} 
                className="flex justify-between items-center p-2 bg-gray-50 rounded"
              >
                <span className="font-medium">{price.shop.name}</span>
                <span className={`text-lg font-bold ${price.id === bestPrice.id ? 'text-primary' : ''}`}>
                  {formatPrice(price.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/products/${product.id}`} className="inline-flex items-center text-sm font-medium text-primary hover:text-blue-700">
          View All Shops <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function ProductShowcase() {
  const [sortOption, setSortOption] = useState("popular");
  
  const { data: products, isLoading } = useQuery<ProductWithPrice[]>({
    queryKey: ["/api/products/popular"],
  });
  
  // Sort products based on the selected option
  const sortedProducts = [...(products || [])].sort((a, b) => {
    if (sortOption === "price-low") {
      const aLowestPrice = Math.min(...a.prices.map(p => p.price));
      const bLowestPrice = Math.min(...b.prices.map(p => p.price));
      return aLowestPrice - bLowestPrice;
    } else if (sortOption === "price-high") {
      const aLowestPrice = Math.min(...a.prices.map(p => p.price));
      const bLowestPrice = Math.min(...b.prices.map(p => p.price));
      return bLowestPrice - aLowestPrice;
    }
    return 0; // Default to original order (popular)
  });

  return (
    <section id="product-showcase" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Popular Products</h2>
            <p className="mt-2 text-lg text-gray-600">See how our platform helps you compare products across shops.</p>
          </div>
          <div className="hidden md:block">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-[400px] overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-6" />
                  <div className="space-y-2 mt-6">
                    <div className="h-6 bg-gray-200 rounded w-full" />
                    <div className="h-6 bg-gray-200 rounded w-full" />
                    <div className="h-6 bg-gray-200 rounded w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Link href="/waitlist">
            <Button className="gap-2">
              Join Waitlist to Explore More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
