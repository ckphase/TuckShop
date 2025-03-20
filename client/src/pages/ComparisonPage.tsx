import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import type { Product, ProductWithPrice } from "@shared/schema";

export default function ComparisonPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  // Fetch all products for selection
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  // Fetch comparison data when products are selected
  const { data: comparisonData, isLoading: comparisonLoading } = useQuery<ProductWithPrice[]>({
    queryKey: [`/api/comparison/products?ids=${selectedProducts.join(",")}`],
    enabled: selectedProducts.length > 0,
  });
  
  // Format price from cents to dollars
  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };
  
  // Find the shop with the best price for a product
  const getBestDealShop = (product: ProductWithPrice) => {
    if (!product.prices.length) return null;
    
    return product.prices.reduce(
      (best, current) => current.price < best.price ? current : best,
      product.prices[0]
    ).shop;
  };
  
  // Add a product to comparison
  const addProductToComparison = (productId: string) => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  
  // Remove a product from comparison
  const removeProductFromComparison = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };
  
  // Get unique shop names from all products in comparison
  const shopNames = comparisonData && comparisonData.length > 0
    ? Array.from(new Set(comparisonData.flatMap(p => p.prices.map(price => price.shop.name))))
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Compare Products</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Select products to compare prices across different shops.
            </p>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="mb-8">
              <CardHeader>
                <h2 className="text-xl font-bold">Select Products to Compare</h2>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Select 
                      onValueChange={addProductToComparison}
                      disabled={productsLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Add a product to compare" />
                      </SelectTrigger>
                      <SelectContent>
                        {products?.map(product => (
                          <SelectItem 
                            key={product.id} 
                            value={product.id.toString()}
                            disabled={selectedProducts.includes(product.id.toString())}
                          >
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedProducts.map(productId => {
                      const product = products?.find(p => p.id.toString() === productId);
                      return product ? (
                        <Badge 
                          key={productId}
                          variant="outline"
                          className="px-3 py-1 cursor-pointer"
                          onClick={() => removeProductFromComparison(productId)}
                        >
                          {product.name} ✕
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {selectedProducts.length > 0 ? (
              comparisonLoading ? (
                <Card className="animate-pulse">
                  <CardContent className="p-8">
                    <div className="h-[400px] bg-gray-200 rounded" />
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-bold">Comparison Results</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
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
                          {comparisonData?.map((product) => {
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
                  </CardContent>
                </Card>
              )
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500">
                    Select products to compare their prices across different shops.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
