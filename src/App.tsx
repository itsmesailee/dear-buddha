
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Wisdom from "./pages/Wisdom";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has completed onboarding
    const intent = localStorage.getItem('hoiphat_intent');
    setHasCompletedOnboarding(!!intent);
  }, []);

  // Show loading state while checking onboarding status
  if (hasCompletedOnboarding === null) {
    return (
      <div className="h-screen flex items-center justify-center bg-sage-50">
        <div className="lotus-loader text-4xl">🪷</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={hasCompletedOnboarding ? <Home /> : <Navigate to="/onboarding" replace />} />
            <Route path="/onboarding" element={hasCompletedOnboarding ? <Navigate to="/" replace /> : <Onboarding />} />
            <Route path="/wisdom" element={<Wisdom />} />
            <Route path="/library" element={<Library />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
