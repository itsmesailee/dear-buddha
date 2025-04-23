
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
import SplashScreen from "./pages/SplashScreen";
import DeveloperNotes from "./pages/DeveloperNotes";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);

  useEffect(() => {
    // Set default intent if not exists
    if (!localStorage.getItem('hoiphat_intent')) {
      localStorage.setItem('hoiphat_intent', 'calm');
    }
  }, []);

  // Handler for splash screen completion
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <div style={{ display: showSplash ? 'none' : 'block' }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/onboarding" element={<Navigate to="/" replace />} />
              <Route path="/wisdom" element={<Wisdom />} />
              <Route path="/library" element={<Library />} />
              <Route path="/dev-notes" element={<DeveloperNotes />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
