import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import type { ProductWithPrice } from "@shared/schema";

export default function ComparisonTable() {
  const { data: products, isLoading } = useQuery<ProductWithPrice[]>({
    queryKey: ["/api/products/popular"],
  });

  // Format price from cents to dollars
  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  // Find the shop with the best price for each product
  const getBestDealShop = (product: ProductWithPrice) => {
    if (!product.prices.length) return null;
    
    return product.prices.reduce(
      (best, current) => current.price < best.price ? current : best,
      product.prices[0]
    ).shop;
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>
          
          <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-x-auto animate-pulse">
            <div className="h-[400px] bg-gray-100" />
          </div>
        </div>
      </section>
    );
  }

  // Get unique shop names from all products
  const shopNames = products && products.length > 0
    ? Array.from(new Set(products.flatMap(p => p.prices.map(price => price.shop.name))))
    : [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Price Comparison Example</h2>
          <p className="mt-4 text-xl text-gray-600">See how our platform helps you save money.</p>
        </div>
        
        <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[180px]">Product</TableHead>
                <TableHead>Category</TableHead>
                {shopNames.map((shopName) => (
                  <TableHead key={shopName}>{shopName}</TableHead>
                ))}
                <TableHead>Best Deal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => {
                const bestDealShop = getBestDealShop(product);
                
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {product.imageUrl && (
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full overflow-hidden mr-4">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="category">{product.category.name}</Badge>
                    </TableCell>
                    
                    {shopNames.map((shopName) => {
                      const priceInfo = product.prices.find(p => p.shop.name === shopName);
                      
                      return (
                        <TableCell key={`${product.id}-${shopName}`}>
                          {priceInfo ? (
                            <div className="flex items-center">
                              <span className={`font-medium ${priceInfo.shop.name === bestDealShop?.name ? 'font-bold text-primary' : 'text-gray-900'}`}>
                                {formatPrice(priceInfo.price)}
                              </span>
                              <Badge 
                                variant={priceInfo.inStock ? "success" : "danger"}
                                className="ml-2 text-xs px-1.5 py-0.5"
                              >
                                {priceInfo.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                            </div>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </TableCell>
                      );
                    })}
                    
                    <TableCell>
                      {bestDealShop && (
                        <div className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded font-semibold">
                          {bestDealShop.name}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/waitlist">
            <Button className="gap-2">
              Join Waitlist for Full Comparison Access
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
