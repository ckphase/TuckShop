interface StepProps {
  number: number;
  title: string;
  description: string;
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function HowItWorks() {
  const steps: StepProps[] = [
    {
      number: 1,
      title: "Search for Products",
      description: "Enter what you're looking for or browse through categories to find specific products."
    },
    {
      number: 2,
      title: "Compare Prices",
      description: "View price comparisons across different tuck shops to find the best deals."
    },
    {
      number: 3,
      title: "Visit Shop or Order",
      description: "Get contact info for the shop with the best prices and availability for your needs."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600">Finding the best deals has never been easier.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Step key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
