
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import Call from "./pages/Call";
import ReportIssue from "./pages/ReportIssue";
import ReportDetails from "./pages/ReportDetails";
import ReportConfirmation from "./pages/ReportConfirmation";
import MyReports from "./pages/MyReports";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import HowToUse from "./pages/HowToUse";
import NotFound from "./pages/NotFound";

// Had to create a query client for React Query - makes data fetching so much easier!
const queryClient = new QueryClient();

// This fixes that annoying scroll issue when changing pages
// Hate when a new page opens and you're halfway down the scroll position!
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// All my app routes - added them all here so they're easy to find
const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/call" element={<Call />} />
      <Route path="/report-issue" element={<ReportIssue />} />
      <Route path="/report-details" element={<ReportDetails />} />
      <Route path="/report-confirmation" element={<ReportConfirmation />} />
      <Route path="/my-reports" element={<MyReports />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/how-to-use" element={<HowToUse />} />
      {/* TODO: Add more routes above this line if needed */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

// Main app with all those fancy providers wrapped around everything
// Quite a few providers but each one has its purpose!
const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
