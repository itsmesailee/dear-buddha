
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import OnboardingNew from "./pages/OnboardingNew";
import Journal from "./pages/Journal";
import WisdomResult from "./pages/WisdomResult";
import Wisdom from "./pages/Wisdom";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Force onboarding completion status to true
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Set default intent if not exists
    if (!localStorage.getItem('hoiphat_intent')) {
      localStorage.setItem('hoiphat_intent', 'calm');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main routes */}
            <Route path="/" element={<OnboardingNew />} />
            <Route path="/home" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/wisdom-result/:entryId" element={<WisdomResult />} />
            <Route path="/onboarding" element={<OnboardingNew />} />
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
