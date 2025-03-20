import {
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  locations, type Location, type InsertLocation,
  shops, type Shop, type InsertShop,
  products, type Product, type InsertProduct,
  productPrices, type ProductPrice, type InsertProductPrice,
  waitlist, type Waitlist, type InsertWaitlist,
  type ProductWithPrice, type ShopWithProducts
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryByName(name: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Locations
  getLocations(): Promise<Location[]>;
  getLocation(id: number): Promise<Location | undefined>;
  getLocationByName(name: string): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  
  // Shops
  getShops(): Promise<Shop[]>;
  getShopsByLocation(locationId: number): Promise<Shop[]>;
  getShop(id: number): Promise<Shop | undefined>;
  createShop(shop: InsertShop): Promise<Shop>;
  getShopWithProducts(id: number): Promise<ShopWithProducts | undefined>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  getProductWithPrices(id: number): Promise<ProductWithPrice | undefined>;
  searchProducts(searchTerm: string, categoryId?: number): Promise<Product[]>;
  
  // Product Prices
  getProductPrices(): Promise<ProductPrice[]>;
  getProductPrice(id: number): Promise<ProductPrice | undefined>;
  getProductPricesByProduct(productId: number): Promise<(ProductPrice & { shop: Shop })[]>;
  getProductPricesByShop(shopId: number): Promise<(ProductPrice & { product: Product })[]>;
  createProductPrice(productPrice: InsertProductPrice): Promise<ProductPrice>;
  
  // Waitlist
  getWaitlistEntries(): Promise<Waitlist[]>;
  createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist>;
  
  // Comparison
  compareProducts(productIds: number[]): Promise<ProductWithPrice[]>;
  compareShops(shopIds: number[]): Promise<ShopWithProducts[]>;
  
  // Additional convenience methods
  getPopularProducts(limit?: number): Promise<ProductWithPrice[]>;
  getFeaturedShops(limit?: number): Promise<ShopWithProducts[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private locations: Map<number, Location>;
  private shops: Map<number, Shop>;
  private products: Map<number, Product>;
  private productPrices: Map<number, ProductPrice>;
  private waitlistEntries: Map<number, Waitlist>;
  
  private userIdCounter: number;
  private categoryIdCounter: number;
  private locationIdCounter: number;
  private shopIdCounter: number;
  private productIdCounter: number;
  private productPriceIdCounter: number;
  private waitlistIdCounter: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.locations = new Map();
    this.shops = new Map();
    this.products = new Map();
    this.productPrices = new Map();
    this.waitlistEntries = new Map();
    
    this.userIdCounter = 1;
    this.categoryIdCounter = 1;
    this.locationIdCounter = 1;
    this.shopIdCounter = 1;
    this.productIdCounter = 1;
    this.productPriceIdCounter = 1;
    this.waitlistIdCounter = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // Initialize sample data for development
  private initializeSampleData() {
    // Add sample categories
    const beverages = this.createCategory({ name: "Beverages", description: "Drinks and refreshments" });
    const snacks = this.createCategory({ name: "Snacks", description: "Light food items" });
    const groceries = this.createCategory({ name: "Groceries", description: "Essential food items" });
    const household = this.createCategory({ name: "Household", description: "Home and cleaning items" });
    
    // Add sample locations
    const north = this.createLocation({ name: "North Area", description: "Northern district of the city" });
    const south = this.createLocation({ name: "South Area", description: "Southern district of the city" });
    const east = this.createLocation({ name: "East Area", description: "Eastern district of the city" });
    const west = this.createLocation({ name: "West Area", description: "Western district of the city" });
    
    // Add sample shops
    const cornerShop = this.createShop({
      name: "Corner Shop",
      description: "Your friendly neighborhood shop",
      address: "123 Main Street, North District",
      locationId: north.id,
      phone: "(123) 456-7890",
      openingHours: "8:00 AM - 10:00 PM",
      isOpen: true,
      categories: ["Snacks", "Beverages", "Groceries"],
      imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a"
    });
    
    const marketExpress = this.createShop({
      name: "Market Express",
      description: "Fast service, great products",
      address: "456 Oak Avenue, East District",
      locationId: east.id,
      phone: "(234) 567-8901",
      openingHours: "7:00 AM - 11:00 PM",
      isOpen: true,
      categories: ["Snacks", "Beverages", "Household"],
      imageUrl: "https://images.unsplash.com/photo-1534723452862-4c874018d66d"
    });
    
    const sunshineStore = this.createShop({
      name: "Sunshine Store",
      description: "Brightening your day with great deals",
      address: "789 Pine Street, South District",
      locationId: south.id,
      phone: "(345) 678-9012",
      openingHours: "9:00 AM - 9:00 PM",
      isOpen: false,
      categories: ["Snacks", "Groceries", "Household"],
      imageUrl: "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2"
    });
    
    // Add sample products
    const cola = this.createProduct({
      name: "Cola Bottle",
      description: "A refreshing cola beverage in a convenient bottle",
      categoryId: beverages.id,
      imageUrl: "https://images.unsplash.com/photo-1560008581-09826d1de69e"
    });
    
    const chips = this.createProduct({
      name: "Potato Chips",
      description: "Crispy potato chips with sea salt flavor",
      categoryId: snacks.id,
      imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b"
    });
    
    const chocolate = this.createProduct({
      name: "Chocolate Bar",
      description: "Creamy milk chocolate in a convenient bar",
      categoryId: snacks.id,
      imageUrl: "https://images.unsplash.com/photo-1607920592519-bab36e9cde60"
    });
    
    // Add product prices
    this.createProductPrice({
      productId: cola.id,
      shopId: cornerShop.id,
      price: 199, // $1.99
      inStock: true
    });
    
    this.createProductPrice({
      productId: cola.id,
      shopId: marketExpress.id,
      price: 229, // $2.29
      inStock: true
    });
    
    this.createProductPrice({
      productId: cola.id,
      shopId: sunshineStore.id,
      price: 249, // $2.49
      inStock: false
    });
    
    this.createProductPrice({
      productId: chips.id,
      shopId: cornerShop.id,
      price: 149, // $1.49
      inStock: true
    });
    
    this.createProductPrice({
      productId: chips.id,
      shopId: marketExpress.id,
      price: 199, // $1.99
      inStock: true
    });
    
    this.createProductPrice({
      productId: chips.id,
      shopId: sunshineStore.id,
      price: 179, // $1.79
      inStock: true
    });
    
    this.createProductPrice({
      productId: chocolate.id,
      shopId: cornerShop.id,
      price: 229, // $2.29
      inStock: true
    });
    
    this.createProductPrice({
      productId: chocolate.id,
      shopId: marketExpress.id,
      price: 189, // $1.89
      inStock: true
    });
    
    this.createProductPrice({
      productId: chocolate.id,
      shopId: sunshineStore.id,
      price: 219, // $2.19
      inStock: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryByName(name: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.name.toLowerCase() === name.toLowerCase()
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Location methods
  async getLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }

  async getLocation(id: number): Promise<Location | undefined> {
    return this.locations.get(id);
  }

  async getLocationByName(name: string): Promise<Location | undefined> {
    return Array.from(this.locations.values()).find(
      (location) => location.name.toLowerCase() === name.toLowerCase()
    );
  }

  async createLocation(insertLocation: InsertLocation): Promise<Location> {
    const id = this.locationIdCounter++;
    const location: Location = { ...insertLocation, id };
    this.locations.set(id, location);
    return location;
  }

  // Shop methods
  async getShops(): Promise<Shop[]> {
    return Array.from(this.shops.values());
  }

  async getShopsByLocation(locationId: number): Promise<Shop[]> {
    return Array.from(this.shops.values()).filter(
      (shop) => shop.locationId === locationId
    );
  }

  async getShop(id: number): Promise<Shop | undefined> {
    return this.shops.get(id);
  }

  async createShop(insertShop: InsertShop): Promise<Shop> {
    const id = this.shopIdCounter++;
    const shop: Shop = { ...insertShop, id };
    this.shops.set(id, shop);
    return shop;
  }

  async getShopWithProducts(id: number): Promise<ShopWithProducts | undefined> {
    const shop = await this.getShop(id);
    if (!shop) return undefined;

    const location = await this.getLocation(shop.locationId);
    if (!location) return undefined;

    const productPrices = await this.getProductPricesByShop(id);

    return {
      ...shop,
      location,
      products: productPrices
    };
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId
    );
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getProductWithPrices(id: number): Promise<ProductWithPrice | undefined> {
    const product = await this.getProduct(id);
    if (!product) return undefined;

    const category = await this.getCategory(product.categoryId);
    if (!category) return undefined;

    const prices = await this.getProductPricesByProduct(id);

    return {
      ...product,
      category,
      prices
    };
  }

  async searchProducts(searchTerm: string, categoryId?: number): Promise<Product[]> {
    const term = searchTerm.toLowerCase();
    let products = Array.from(this.products.values());
    
    // Filter by search term
    products = products.filter(
      (product) => 
        product.name.toLowerCase().includes(term) || 
        (product.description && product.description.toLowerCase().includes(term))
    );
    
    // Filter by category if provided
    if (categoryId) {
      products = products.filter(
        (product) => product.categoryId === categoryId
      );
    }
    
    return products;
  }

  // ProductPrice methods
  async getProductPrices(): Promise<ProductPrice[]> {
    return Array.from(this.productPrices.values());
  }

  async getProductPrice(id: number): Promise<ProductPrice | undefined> {
    return this.productPrices.get(id);
  }

  async getProductPricesByProduct(productId: number): Promise<(ProductPrice & { shop: Shop })[]> {
    const productPrices = Array.from(this.productPrices.values()).filter(
      (price) => price.productId === productId
    );
    
    const result: (ProductPrice & { shop: Shop })[] = [];
    
    for (const price of productPrices) {
      const shop = await this.getShop(price.shopId);
      if (shop) {
        result.push({
          ...price,
          shop
        });
      }
    }
    
    return result;
  }

  async getProductPricesByShop(shopId: number): Promise<(ProductPrice & { product: Product })[]> {
    const productPrices = Array.from(this.productPrices.values()).filter(
      (price) => price.shopId === shopId
    );
    
    const result: (ProductPrice & { product: Product })[] = [];
    
    for (const price of productPrices) {
      const product = await this.getProduct(price.productId);
      if (product) {
        result.push({
          ...price,
          product
        });
      }
    }
    
    return result;
  }

  async createProductPrice(insertProductPrice: InsertProductPrice): Promise<ProductPrice> {
    const id = this.productPriceIdCounter++;
    const productPrice: ProductPrice = { ...insertProductPrice, id };
    this.productPrices.set(id, productPrice);
    return productPrice;
  }

  // Waitlist methods
  async getWaitlistEntries(): Promise<Waitlist[]> {
    return Array.from(this.waitlistEntries.values());
  }

  async createWaitlistEntry(insertWaitlist: InsertWaitlist): Promise<Waitlist> {
    const id = this.waitlistIdCounter++;
    const waitlistEntry: Waitlist = { 
      ...insertWaitlist, 
      id, 
      createdAt: new Date() 
    };
    this.waitlistEntries.set(id, waitlistEntry);
    return waitlistEntry;
  }

  // Comparison methods
  async compareProducts(productIds: number[]): Promise<ProductWithPrice[]> {
    const result: ProductWithPrice[] = [];
    
    for (const id of productIds) {
      const product = await this.getProductWithPrices(id);
      if (product) {
        result.push(product);
      }
    }
    
    return result;
  }

  async compareShops(shopIds: number[]): Promise<ShopWithProducts[]> {
    const result: ShopWithProducts[] = [];
    
    for (const id of shopIds) {
      const shop = await this.getShopWithProducts(id);
      if (shop) {
        result.push(shop);
      }
    }
    
    return result;
  }

  // Additional convenience methods
  async getPopularProducts(limit = 3): Promise<ProductWithPrice[]> {
    const products = await this.getProducts();
    const popularProducts: ProductWithPrice[] = [];
    
    // For simplicity, just take the first 'limit' products
    // In a real system, this would be based on analytics/sales data
    for (let i = 0; i < Math.min(limit, products.length); i++) {
      const product = await this.getProductWithPrices(products[i].id);
      if (product) {
        popularProducts.push(product);
      }
    }
    
    return popularProducts;
  }

  async getFeaturedShops(limit = 3): Promise<ShopWithProducts[]> {
    const shops = await this.getShops();
    const featuredShops: ShopWithProducts[] = [];
    
    // For simplicity, just take the first 'limit' shops
    // In a real system, this would be based on partnerships/featured status
    for (let i = 0; i < Math.min(limit, shops.length); i++) {
      const shop = await this.getShopWithProducts(shops[i].id);
      if (shop) {
        featuredShops.push(shop);
      }
    }
    
    return featuredShops;
  }
}

export const storage = new MemStorage();
