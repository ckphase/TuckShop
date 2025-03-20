import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WaitlistForm from "@/components/waitlist/WaitlistForm";

export default function WaitlistPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section id="waitlist" className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Join Our Waitlist</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Be the first to know when ShopCompare launches in your area. 
                Get early access and exclusive deals from local shops.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <WaitlistForm />
              
              <div className="mt-8 text-center text-gray-400 text-sm">
                <p>
                  By joining our waitlist, you agree to our{" "}
                  <a href="#" className="text-primary hover:text-blue-400">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:text-blue-400">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
