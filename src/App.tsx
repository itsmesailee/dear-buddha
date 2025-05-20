
import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Wisdom from "./pages/Wisdom";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import SplashScreen from "./pages/SplashScreen";
import DeveloperNotes from "./pages/DeveloperNotes";
import WelcomeScreen from "./pages/WelcomeScreen";
import ReflectionInput from "./pages/ReflectionInput";
import CompanionResponse from "./pages/CompanionResponse";
import WisdomInbox from "./pages/WisdomInbox";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

const App: React.FC = () => {
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
        <BrowserRouter>
          {showSplash ? (
            <SplashScreen onComplete={handleSplashComplete} />
          ) : (
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/home" element={<Home />} />
              <Route path="/reflect" element={<ReflectionInput />} />
              <Route path="/companion" element={<CompanionResponse />} />
              <Route path="/wisdom-inbox" element={<WisdomInbox />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/onboarding" element={<Navigate to="/" replace />} />
              <Route path="/wisdom" element={<Wisdom />} />
              <Route path="/library" element={<Library />} />
              <Route path="/dev-notes" element={<DeveloperNotes />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
