import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/search/SearchBar";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import ProductShowcase from "@/components/products/ProductShowcase";
import ShopListings from "@/components/shops/ShopListings";
import MapSection from "@/components/map/MapSection";
import ComparisonTable from "@/components/comparison/ComparisonTable";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <SearchBar />
        <Features />
        <HowItWorks />
        <ProductShowcase />
        <ShopListings />
        <MapSection />
        <ComparisonTable />
      </main>
      <Footer />
    </div>
  );
}
