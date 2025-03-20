import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    setLocation(path);
  };

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" onClick={() => handleNavigation("/")} className="flex items-center">
              <span className="text-primary text-2xl font-bold">ShopCompare</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/#features" 
              onClick={() => handleNavigation("/#features")}
              className="text-gray-600 hover:text-primary transition-colors">
              Features
            </Link>
            <Link 
              href="/#how-it-works" 
              onClick={() => handleNavigation("/#how-it-works")}
              className="text-gray-600 hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link 
              href="/#shops" 
              onClick={() => handleNavigation("/#shops")}
              className="text-gray-600 hover:text-primary transition-colors">
              Shops
            </Link>
            <Link 
              href="/waitlist" 
              onClick={() => handleNavigation("/waitlist")}
              className="text-gray-600 hover:text-primary transition-colors">
              Join Waitlist
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="text-gray-500 hover:text-gray-700 focus:outline-none px-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/#features" 
              onClick={() => handleNavigation("/#features")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              Features
            </Link>
            <Link 
              href="/#how-it-works" 
              onClick={() => handleNavigation("/#how-it-works")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              How It Works
            </Link>
            <Link 
              href="/#shops" 
              onClick={() => handleNavigation("/#shops")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              Shops
            </Link>
            <Link 
              href="/waitlist" 
              onClick={() => handleNavigation("/waitlist")}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
