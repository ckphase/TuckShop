import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import Home from "@/pages/Home";
import ProductsPage from "@/pages/ProductsPage";
import ShopsPage from "@/pages/ShopsPage";
import ComparisonPage from "@/pages/ComparisonPage";
import WaitlistPage from "@/pages/WaitlistPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/shops" component={ShopsPage} />
      <Route path="/comparison" component={ComparisonPage} />
      <Route path="/waitlist" component={WaitlistPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
