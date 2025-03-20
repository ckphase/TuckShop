import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user schema (from the existing schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Categories for products
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  description: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Locations for shops
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
});

export const insertLocationSchema = createInsertSchema(locations).pick({
  name: true,
  description: true,
});

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;

// Shops schema
export const shops = pgTable("shops", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  address: text("address").notNull(),
  locationId: integer("location_id").notNull(),
  phone: text("phone"),
  openingHours: text("opening_hours"),
  isOpen: boolean("is_open").default(true),
  categories: text("categories").array(),
  imageUrl: text("image_url"),
});

export const insertShopSchema = createInsertSchema(shops).pick({
  name: true,
  description: true,
  address: true,
  locationId: true,
  phone: true,
  openingHours: true,
  isOpen: true,
  categories: true,
  imageUrl: true,
});

export type InsertShop = z.infer<typeof insertShopSchema>;
export type Shop = typeof shops.$inferSelect;

// Products schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  categoryId: integer("category_id").notNull(),
  imageUrl: text("image_url"),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  categoryId: true,
  imageUrl: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Product prices in shops
export const productPrices = pgTable("product_prices", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  shopId: integer("shop_id").notNull(),
  price: integer("price").notNull(), // In cents
  inStock: boolean("in_stock").default(true),
});

export const insertProductPriceSchema = createInsertSchema(productPrices).pick({
  productId: true,
  shopId: true,
  price: true,
  inStock: true,
});

export type InsertProductPrice = z.infer<typeof insertProductPriceSchema>;
export type ProductPrice = typeof productPrices.$inferSelect;

// Waitlist entries
export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  locationId: integer("location_id").notNull(),
  receiveUpdates: boolean("receive_updates").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWaitlistSchema = createInsertSchema(waitlist).pick({
  name: true,
  email: true,
  locationId: true,
  receiveUpdates: true,
});

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlist.$inferSelect;

// ProductWithPrice type combining product with price info
export type ProductWithPrice = Product & {
  prices: (ProductPrice & { shop: Shop })[];
  category: Category;
};

// ShopWithProducts type combining shop with product info
export type ShopWithProducts = Shop & {
  location: Location;
  products: (ProductPrice & { product: Product })[];
};
