import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/app/Dashboard";
import Organisasjoner from "./pages/app/Organisasjoner";
import Klienter from "./pages/app/Klienter";
import Datasett from "./pages/app/Datasett";
import Analyse from "./pages/app/modules/Analyse";
import Saldoliste from "./pages/app/modules/Saldoliste";
import Import from "./pages/app/modules/Import";
import NotFound from "./pages/NotFound";

// Layouts
import { AppLayout } from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrer" element={<Register />} />

          {/* App routes */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="organisasjoner" element={<Organisasjoner />} />
            <Route path="organisasjoner/:orgId/klienter" element={<Klienter />} />
            <Route path="organisasjoner/:orgId/klienter/:klientId/datasett" element={<Datasett />} />
            <Route path="organisasjoner/:orgId/klienter/:klientId/datasett/import" element={<Import />} />
            <Route path="organisasjoner/:orgId/klienter/:klientId/datasett/:datasettId/analyse" element={<Analyse />} />
            <Route path="organisasjoner/:orgId/klienter/:klientId/datasett/:datasettId/analyse/saldoliste" element={<Saldoliste />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
