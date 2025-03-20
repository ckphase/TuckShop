import { 
  Tags, 
  MapPin, 
  Search, 
  Store, 
  SortDesc, 
  CheckCircle 
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

function Feature({ icon, title, description, color }: FeatureProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function Features() {
  const features: FeatureProps[] = [
    {
      icon: <Tags className="text-primary text-2xl" />,
      title: "Price Comparison",
      description: "Compare prices across different tuck shops to find the best deals on your favorite products.",
      color: "bg-blue-100"
    },
    {
      icon: <MapPin className="text-secondary text-2xl" />,
      title: "Location Filtering",
      description: "Find shops near you with our location-based filtering to save time and travel costs.",
      color: "bg-green-100"
    },
    {
      icon: <Search className="text-orange-500 text-2xl" />,
      title: "Smart Search",
      description: "Quickly find exactly what you're looking for with our powerful search functionality.",
      color: "bg-orange-100"
    },
    {
      icon: <Store className="text-purple-600 text-2xl" />,
      title: "Shop Profiles",
      description: "View detailed profiles of local tuck shops including contact information and business hours.",
      color: "bg-purple-100"
    },
    {
      icon: <SortDesc className="text-yellow-600 text-2xl" />,
      title: "Sort & Filter",
      description: "Sort products by price, filter by category, and find exactly what you need efficiently.",
      color: "bg-yellow-100"
    },
    {
      icon: <CheckCircle className="text-red-500 text-2xl" />,
      title: "Availability Tracking",
      description: "Check if items are in stock before visiting a shop to avoid wasted trips.",
      color: "bg-red-100"
    }
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose ShopCompare?</h2>
          <p className="mt-4 text-xl text-gray-600">Save time and money by comparing products across different shops.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
