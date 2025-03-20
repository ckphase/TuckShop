import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for categories
  app.get("/api/categories", async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.get("/api/categories/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    
    const category = await storage.getCategory(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    res.json(category);
  });

  // API routes for locations
  app.get("/api/locations", async (req, res) => {
    const locations = await storage.getLocations();
    res.json(locations);
  });

  app.get("/api/locations/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid location ID" });
    }
    
    const location = await storage.getLocation(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    
    res.json(location);
  });

  // API routes for shops
  app.get("/api/shops", async (req, res) => {
    const locationId = req.query.locationId ? parseInt(req.query.locationId as string) : undefined;
    
    if (locationId) {
      if (isNaN(locationId)) {
        return res.status(400).json({ message: "Invalid location ID" });
      }
      
      const shops = await storage.getShopsByLocation(locationId);
      return res.json(shops);
    }
    
    const shops = await storage.getShops();
    res.json(shops);
  });

  app.get("/api/shops/featured", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
    const featuredShops = await storage.getFeaturedShops(limit);
    res.json(featuredShops);
  });

  app.get("/api/shops/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid shop ID" });
    }
    
    const shop = await storage.getShop(id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    
    res.json(shop);
  });

  app.get("/api/shops/:id/products", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid shop ID" });
    }
    
    const shop = await storage.getShopWithProducts(id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    
    res.json(shop);
  });

  // API routes for products
  app.get("/api/products", async (req, res) => {
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
    const searchTerm = req.query.search as string | undefined;
    
    if (searchTerm) {
      const products = await storage.searchProducts(searchTerm, categoryId);
      return res.json(products);
    }
    
    if (categoryId) {
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const products = await storage.getProductsByCategory(categoryId);
      return res.json(products);
    }
    
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/popular", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
    const popularProducts = await storage.getPopularProducts(limit);
    res.json(popularProducts);
  });

  app.get("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    
    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
  });

  app.get("/api/products/:id/prices", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    
    const product = await storage.getProductWithPrices(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
  });

  // API route for comparison
  app.get("/api/comparison/products", async (req, res) => {
    const productIds = req.query.ids as string;
    
    if (!productIds) {
      return res.status(400).json({ message: "No product IDs provided" });
    }
    
    try {
      const ids = productIds.split(",").map(id => parseInt(id));
      const products = await storage.compareProducts(ids);
      res.json(products);
    } catch (error) {
      res.status(400).json({ message: "Invalid product IDs" });
    }
  });

  app.get("/api/comparison/shops", async (req, res) => {
    const shopIds = req.query.ids as string;
    
    if (!shopIds) {
      return res.status(400).json({ message: "No shop IDs provided" });
    }
    
    try {
      const ids = shopIds.split(",").map(id => parseInt(id));
      const shops = await storage.compareShops(ids);
      res.json(shops);
    } catch (error) {
      res.status(400).json({ message: "Invalid shop IDs" });
    }
  });

  // API route for waitlist
  app.post("/api/waitlist", async (req, res) => {
    try {
      const waitlistData = insertWaitlistSchema.parse(req.body);
      const entry = await storage.createWaitlistEntry(waitlistData);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid waitlist data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
