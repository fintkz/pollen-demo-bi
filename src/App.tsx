import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import React, { Suspense, lazy } from "react";

// Lazy-loaded components - MAIN SITE COMMENTED OUT
// const Index = lazy(() => import("./pages/Index"));
// const About = lazy(() => import("./pages/About"));
// const Product = lazy(() => import("./pages/Product"));
// const CaseStudies = lazy(() => import("./pages/CaseStudies"));
// const Security = lazy(() => import("./pages/Security"));
// const Privacy = lazy(() => import("./pages/Privacy"));
// const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Dashboard components
const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout").then(m => ({ default: m.DashboardLayout })));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DashboardAgent = lazy(() => import("./pages/DashboardAgent"));
const DashboardGeneration = lazy(() => import("./pages/DashboardGeneration"));
const DashboardReview = lazy(() => import("./pages/DashboardReview"));

// Inventory page
const Inventory = lazy(() => import("./pages/Inventory"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Main site routes - COMMENTED OUT */}
            {/* <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/security" element={<Security />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} /> */}
            
            {/* Inventory Management Route - Now the home page */}
            <Route path="/" element={<Inventory />} />
            <Route path="/inventory" element={<Inventory />} />
            
            {/* Dashboard Routes - Separate Layout (Notion-style) */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardAgent />} />
              <Route path="agents" element={<DashboardAgent />} />
              <Route path="preview" element={<DashboardGeneration />} />
              <Route path="marketplace" element={<DashboardReview />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
